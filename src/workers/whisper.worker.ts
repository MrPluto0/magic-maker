/// <reference lib="webworker" />
/**
 * whisper 转写 Worker（W6，docs/BIG_ITERATION_PLAN §3.4）。
 *
 * 消息协议（与主线程 src/class/whisperClient.ts 配对）：
 *   主线程 → Worker：{ type: 'load',   model: 'base'|'small', device?: 'webgpu'|'wasm',
 *                      endpoint: string, wasmPaths: string }
 *                    { type: 'asr',    pcm: Float32Array(16k mono), lang?: 'zh'|'auto' }
 *                    { type: 'cancel' }
 *                    { type: 'fetch-result', id, ok, status?, headers?, body?, error? }
 *   Worker → 主线程：{ type: 'progress', phase: 'download'|'transcribe', value: 0..1, note? }
 *                    { type: 'loaded', device }
 *                    { type: 'segments', segments: { text, startSec, endSec }[] }
 *                    { type: 'error',    message, code? }
 *                    { type: 'fetch', id, url, method?, headers? }  ← 模型下载代理
 *
 * - 模型走 transformers.js（onnx-community/whisper-{base,small}），首次下载经
 *   Cache API 浏览器缓存，之后离线可用；
 * - 中国网络三道保障：①endpoint 由主线程探测后传入（huggingface.co /
 *   hf-mirror.com），不硬编死单一端点；②模型下载经主线程 fetch 代理——实测
 *   hf-mirror 的 CDN 边缘对 worker 直发请求会直接断连（net::ERR_FAILED、无响
 *   应），主线程请求正常；③ORT wasm 走同源自托管 /ort/（vite 插件），同源请
 *   求 worker 内直连无碍；
 * - 转写按 30s 窗口切片推进：每个窗口是一个进度/取消检查点。
 */

import { env, pipeline } from "@huggingface/transformers";

/** 自动语音识别管道（transformers.pipeline 的调用面收窄） */
type AsrPipeline = (
	pcm: Float32Array,
	options: Record<string, unknown>,
) => Promise<{
	chunks?: Array<{ timestamp: [number | null, number | null]; text: string }>;
	text?: string;
}>;

interface LoadMessage {
	type: "load";
	model: "base" | "small";
	device?: "webgpu" | "wasm";
	/** 模型仓库源（含尾斜杠的 origin），主线程已探测 */
	endpoint: string;
	/** ORT wasm 同源路径前缀（vite 插件自托管） */
	wasmPaths: string;
}

interface AsrMessage {
	type: "asr";
	pcm: Float32Array;
	lang?: "zh" | "auto";
}

type InMessage =
	| LoadMessage
	| AsrMessage
	| { type: "cancel" }
	| {
			type: "fetch-result";
			id: number;
			ok: boolean;
			status?: number;
			headers?: Record<string, string>;
			body?: ArrayBuffer;
			error?: string;
	  };

type OutMessage =
	| {
			type: "progress";
			phase: "download" | "transcribe";
			value: number;
			note?: string;
	  }
	| { type: "loaded"; device: "webgpu" | "wasm" }
	| {
			type: "segments";
			segments: Array<{ text: string; startSec: number; endSec: number }>;
	  }
	| { type: "error"; message: string; code?: string }
	| {
			type: "fetch";
			id: number;
			url: string;
			method?: string;
			headers?: Record<string, string>;
	  };

const MODEL_REPO: Record<"base" | "small", string> = {
	base: "onnx-community/whisper-base",
	small: "onnx-community/whisper-small",
};

/** 30s 一窗（whisper 训练窗口长度），窗间不重叠——边界词可能被切，后处理合并兜底 */
const WINDOW_SEC = 30;

let asr: AsrPipeline | null = null;
let loadedKey = "";
let cancelled = false;
let busy = false;

function post(msg: OutMessage) {
	self.postMessage(msg);
}

/* ------------------- 模型下载代理（经主线程 fetch） ------------------- */

let bridgeSeq = 0;
const bridgeWaiting = new Map<
	number,
	{ resolve: (res: Response) => void; reject: (err: Error) => void }
>();

function handleBridgeResult(msg: Extract<InMessage, { type: "fetch-result" }>) {
	const waiter = bridgeWaiting.get(msg.id);
	if (!waiter) return;
	bridgeWaiting.delete(msg.id);
	if (!msg.ok) {
		waiter.reject(new Error(msg.error ?? "主线程 fetch 代理失败"));
		return;
	}
	waiter.resolve(
		new Response(msg.body ?? new ArrayBuffer(0), {
			status: msg.status ?? 200,
			headers: msg.headers ?? {},
		}),
	);
}

/** 把 transformers.js 的模型请求改道主线程（外部 https 才代理；同源请求直连） */
function installFetchBridge() {
	env.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
		const url =
			typeof input === "string"
				? input
				: input instanceof URL
					? input.href
					: input.url;
		if (!/^https?:\/\//.test(url)) {
			return globalThis.fetch(input, init);
		}
		const id = ++bridgeSeq;
		return await new Promise<Response>((resolve, reject) => {
			// 单文件 10 分钟兜底（最大档 small ~250MB 慢速网络）
			const timer = setTimeout(
				() => {
					bridgeWaiting.delete(id);
					reject(new Error(`主线程 fetch 代理超时：${url}`));
				},
				10 * 60 * 1000,
			);
			bridgeWaiting.set(id, {
				resolve: (res) => {
					clearTimeout(timer);
					resolve(res);
				},
				reject: (err) => {
					clearTimeout(timer);
					reject(err);
				},
			});
			const headers: Record<string, string> = {};
			if (init?.headers) {
				new Headers(init.headers).forEach((v, k) => {
					headers[k] = v;
				});
			}
			post({ type: "fetch", id, url, method: init?.method, headers });
		});
	}) as typeof env.fetch;
}

/* ---------------------------- 模型加载 ---------------------------- */

function downloadProgressAdapter() {
	const files = new Map<string, { loaded: number; total: number }>();
	return (data: {
		status: string;
		file?: string;
		progress?: number;
		loaded?: number;
		total?: number;
	}) => {
		if (data.status === "progress" && data.file && data.total) {
			files.set(data.file, { loaded: data.loaded ?? 0, total: data.total });
			let loaded = 0;
			let total = 0;
			for (const f of files.values()) {
				loaded += f.loaded;
				total += f.total;
			}
			if (total > 0) {
				post({
					type: "progress",
					phase: "download",
					value: Math.min(loaded / total, 1),
				});
			}
		} else if (data.status === "done" && data.file && files.has(data.file)) {
			// 单文件完成：按满额计入
			const f = files.get(data.file)!;
			files.set(data.file, { loaded: f.total, total: f.total });
		}
	};
}

async function buildPipeline(msg: LoadMessage, device: "webgpu" | "wasm") {
	// WebGPU：fp32 encoder + fp16 decoder（onnx-community 仓库可用的文件组合）；
	// wasm：q8 量化（base 约 40-80MB，下载最快）
	const dtype =
		device === "webgpu"
			? { encoder_model: "fp32", decoder_model_merged: "fp16" }
			: "q8";
	return pipeline("automatic-speech-recognition", MODEL_REPO[msg.model], {
		device,
		dtype: dtype as never,
		progress_callback: downloadProgressAdapter() as never,
	}) as Promise<AsrPipeline>;
}

async function handleLoad(msg: LoadMessage) {
	const key = `${msg.model}@${msg.endpoint}`;
	if (asr && loadedKey === key) {
		post({ type: "progress", phase: "download", value: 1, note: "已缓存" });
		post({
			type: "loaded",
			device: (msg.device ?? "wasm") as "webgpu" | "wasm",
		});
		return;
	}
	env.allowLocalModels = false;
	env.remoteHost = msg.endpoint;
	installFetchBridge();

	// ORT 的 env 单例挂在 onnxruntime-web/webgpu 模块上（transformers.js 与之
	// 共享同一实例），且只在 wasmPaths 未设置时才落 jsdelivr 默认——这里抢先
	// 设成同源自托管 /ort/，保证大陆网络下 wasm 后端不依赖 cdn.jsdelivr.net
	try {
		const ort = (await import("onnxruntime-web/webgpu")) as unknown as {
			env?: { wasm?: { wasmPaths?: string } };
		};
		if (ort.env?.wasm) {
			ort.env.wasm.wasmPaths = msg.wasmPaths;
		}
	} catch {
		/* ORT 模块不可用时交给 transformers.js 默认路径 */
	}

	const device = msg.device ?? "wasm";
	let finalDevice: "webgpu" | "wasm" = device;
	try {
		asr = await buildPipeline(msg, device);
	} catch (error) {
		if (device !== "webgpu") throw error;
		post({
			type: "progress",
			phase: "download",
			value: 0,
			note: "WebGPU 初始化失败，回退 wasm",
		});
		finalDevice = "wasm";
		asr = await buildPipeline(msg, "wasm");
	}
	loadedKey = key;
	post({ type: "progress", phase: "download", value: 1 });
	post({ type: "loaded", device: finalDevice });
}

/* ------------------------------ 转写 ------------------------------ */

async function handleAsr(msg: AsrMessage) {
	if (!asr) {
		post({
			type: "error",
			message: "模型尚未加载（先发 load 消息）",
			code: "E_NOT_LOADED",
		});
		return;
	}
	cancelled = false;
	const sampleRate = 16000;
	const windowLen = WINDOW_SEC * sampleRate;
	const windows = Math.max(1, Math.ceil(msg.pcm.length / windowLen));
	const all: Array<{ text: string; startSec: number; endSec: number }> = [];

	for (let w = 0; w < windows; w++) {
		if (cancelled) {
			post({ type: "error", message: "转写已取消", code: "E_CANCELLED" });
			return;
		}
		const start = w * windowLen;
		const slice = msg.pcm.subarray(
			start,
			Math.min(start + windowLen, msg.pcm.length),
		);
		if (slice.length < sampleRate * 0.2) break; // <0.2s 的尾巴不送
		const offsetSec = start / sampleRate;
		const output = await asr(slice, {
			return_timestamps: true,
			task: "transcribe",
			...(msg.lang === "auto" ? {} : { language: msg.lang ?? "zh" }),
		});
		const chunks = output.chunks ?? [];
		if (chunks.length === 0 && output.text && output.text.trim()) {
			// 无时间戳回退：整窗一段
			all.push({
				text: output.text.trim(),
				startSec: offsetSec,
				endSec: offsetSec + slice.length / sampleRate,
			});
		}
		let prevEnd = offsetSec;
		for (const chunk of chunks) {
			const text = chunk.text?.trim();
			if (!text) continue;
			const s = (chunk.timestamp[0] ?? prevEnd) + offsetSec;
			// whisper 尾 chunk 的 end 常为 null：用下一窗起点或 +2s 兜底，后处理再收敛
			const e =
				(chunk.timestamp[1] ?? (chunk.timestamp[0] ?? 0) + 2) + offsetSec;
			prevEnd = e;
			all.push({ text, startSec: s, endSec: Math.max(e, s + 0.05) });
		}
		post({ type: "progress", phase: "transcribe", value: (w + 1) / windows });
	}
	post({ type: "segments", segments: all });
}

/* ------------------------------ 入口 ------------------------------ */

self.onmessage = async (event: MessageEvent<InMessage>) => {
	const msg = event.data;
	if (msg.type === "fetch-result") {
		handleBridgeResult(msg);
		return;
	}
	if (msg.type === "cancel") {
		cancelled = true;
		return;
	}
	if (busy) {
		post({ type: "error", message: "worker 正忙", code: "E_BUSY" });
		return;
	}
	busy = true;
	try {
		if (msg.type === "load") {
			await handleLoad(msg);
		} else if (msg.type === "asr") {
			await handleAsr(msg);
		}
	} catch (error) {
		const stack =
			error instanceof Error && error.stack
				? `\n${error.stack.slice(0, 400)}`
				: "";
		post({
			type: "error",
			message: `${error instanceof Error ? error.message : String(error)}${stack}`,
		});
	} finally {
		busy = false;
	}
};
