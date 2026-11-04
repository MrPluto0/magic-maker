/**
 * whisper Worker 的主线程客户端（W6）。
 *
 * - Worker 生命周期：懒创建（new Worker(new URL(...), { type: 'module' })），
 *   cancel 在推理卡死时可 terminate 重建；
 * - 模型源探测：huggingface.co 大陆直连大概率不通，先探官方再探
 *   hf-mirror.com（也可在设置里钉死），探测结果会话内缓存；
 * - WebGPU：requestAdapter 成功才请求 webgpu，失败自动回退 wasm（worker 内兜底）。
 */

export type WhisperModel = "base" | "small";
export type WhisperLang = "zh" | "auto";

export interface RawSegment {
	text: string;
	startSec: number;
	endSec: number;
}

export interface WhisperProgress {
	phase: "download" | "transcribe";
	value: number;
	note?: string;
}

type HfEndpointMode = "auto" | "official" | "mirror";

const OFFICIAL = "https://huggingface.co/";
const MIRROR = "https://hf-mirror.com/";
const PROBE_PATH = "api/models/onnx-community/whisper-base";
/** 探测结果缓存（localStorage，24h TTL——网络环境可能切换，不永久钉死） */
const HOST_CACHE_KEY = "whisper_hf_host";
const HOST_CACHE_TTL = 24 * 3600 * 1000;

let cachedHost: string | null = null;

function readCachedHost(): string | null {
	try {
		const raw = localStorage.getItem(HOST_CACHE_KEY);
		if (!raw) return null;
		const { host, ts } = JSON.parse(raw) as { host?: string; ts?: number };
		if (!host || !host.startsWith("https://") || !ts) return null;
		if (Date.now() - ts > HOST_CACHE_TTL) return null;
		return host;
	} catch {
		return null;
	}
}

function writeCachedHost(host: string) {
	try {
		localStorage.setItem(
			HOST_CACHE_KEY,
			JSON.stringify({ host, ts: Date.now() }),
		);
	} catch {
		/* 私密模式等写入失败不影响主链路 */
	}
}

async function probeHost(host: string): Promise<boolean> {
	try {
		const res = await fetch(`${host}${PROBE_PATH}`, {
			signal: AbortSignal.timeout(6000),
		});
		return res.ok;
	} catch {
		return false;
	}
}

/**
 * 解析可用的模型源。auto：官方 → 镜像 依次探测，全不通抛错；
 * official/mirror：直接使用（加载失败由调用方报错）。
 */
export async function resolveWhisperEndpoint(
	mode: HfEndpointMode = "auto",
	force = false,
): Promise<string> {
	if (mode === "official") return OFFICIAL;
	if (mode === "mirror") return MIRROR;
	if (!force && cachedHost) return cachedHost;
	if (!force) {
		const cached = readCachedHost();
		if (cached) {
			cachedHost = cached;
			return cached;
		}
	}
	for (const host of [OFFICIAL, MIRROR]) {
		if (await probeHost(host)) {
			cachedHost = host;
			writeCachedHost(host);
			return host;
		}
	}
	throw new Error(
		"huggingface.co 与 hf-mirror.com 均不可达，无法下载 whisper 模型",
	);
}

/** ORT wasm 同源自托管路径（vite 插件服务 /ort/），随部署 base 自动适配 */
function ortWasmPaths(): string {
	return new URL("ort/", document.baseURI).href;
}

/** WebGPU 可用性（headless Chrome 不稳，探测失败即走 wasm） */
export async function detectWebgpu(): Promise<boolean> {
	try {
		const gpu = (navigator as { gpu?: { requestAdapter(): Promise<unknown> } })
			.gpu;
		if (!gpu) return false;
		return (await gpu.requestAdapter()) != null;
	} catch {
		return false;
	}
}

type PendingResolve = {
	resolve: () => void;
	reject: (error: Error) => void;
};

class WhisperClient {
	private worker: Worker | null = null;
	private pending: PendingResolve | null = null;
	private progressCb: ((p: WhisperProgress) => void) | null = null;
	private segmentsResolve: ((segs: RawSegment[]) => void) | null = null;
	private segmentsReject: ((error: Error) => void) | null = null;
	loadedModel: WhisperModel | null = null;

	private ensureWorker(): Worker {
		if (this.worker) return this.worker;
		const worker = new Worker(
			new URL("../workers/whisper.worker.ts", import.meta.url),
			{
				type: "module",
			},
		);
		worker.onmessage = (event: MessageEvent) => this.onMessage(event.data);
		worker.onerror = (event) => {
			this.failAll(
				new Error(`whisper worker 异常：${event.message ?? "unknown"}`),
			);
		};
		this.worker = worker;
		return worker;
	}

	private onMessage(msg: Record<string, unknown>) {
		if (msg.type === "progress") {
			this.progressCb?.(msg as unknown as WhisperProgress);
			return;
		}
		if (msg.type === "fetch") {
			// 模型下载代理：worker 内直连 hf-mirror 的 CDN 会被边缘断连
			// （net::ERR_FAILED 无响应），主线程 fetch 正常——在此代取回传
			void this.proxyFetch(
				msg as unknown as {
					id: number;
					url: string;
					method?: string;
					headers?: Record<string, string>;
				},
			);
			return;
		}
		if (msg.type === "loaded") {
			// load 成功确认（worker 侧 pipeline 就绪）
			this.pending?.resolve();
			this.pending = null;
			return;
		}
		if (msg.type === "segments") {
			const segs = (msg.segments as RawSegment[]) ?? [];
			this.segmentsResolve?.(segs);
			this.segmentsResolve = null;
			this.segmentsReject = null;
			this.pending?.resolve();
			this.pending = null;
			return;
		}
		if (msg.type === "error") {
			const err = new Error(
				String(msg.message ?? "whisper worker 错误"),
			) as Error & {
				code?: string;
			};
			err.code = String(msg.code ?? "");
			// 转写阶段的错误回拒 transcribe promise；否则回拒 load promise
			if (this.segmentsReject) {
				this.segmentsReject(err);
				this.segmentsResolve = null;
				this.segmentsReject = null;
			} else if (this.pending) {
				this.pending.reject(err);
				this.pending = null;
			}
		}
	}

	private failAll(error: Error) {
		this.pending?.reject(error);
		this.segmentsReject?.(error);
		this.pending = null;
		this.segmentsResolve = null;
		this.segmentsReject = null;
	}

	/** worker 的模型下载经主线程代取（transferable 回传 body） */
	private async proxyFetch(req: {
		id: number;
		url: string;
		method?: string;
		headers?: Record<string, string>;
	}) {
		try {
			const init: RequestInit = {};
			if (req.method) init.method = req.method;
			if (req.headers) init.headers = req.headers;
			const res = await fetch(req.url, init);
			const body = await res.arrayBuffer();
			const headers: Record<string, string> = {};
			res.headers.forEach((v, k) => {
				headers[k] = v;
			});
			this.worker?.postMessage(
				{
					type: "fetch-result",
					id: req.id,
					ok: true,
					status: res.status,
					headers,
					body,
				},
				[body],
			);
		} catch (error) {
			this.worker?.postMessage({
				type: "fetch-result",
				id: req.id,
				ok: false,
				error: error instanceof Error ? error.message : String(error),
			});
		}
	}

	/** 加载模型（已加载同款时秒回）。进度经 onProgress 回传。 */
	async load(
		model: WhisperModel,
		endpointMode: HfEndpointMode,
		onProgress?: (p: WhisperProgress) => void,
	): Promise<void> {
		if (this.loadedModel === model && this.worker) return;
		this.progressCb = onProgress ?? null;
		const endpoint = await resolveWhisperEndpoint(endpointMode);
		const device = (await detectWebgpu()) ? "webgpu" : "wasm";
		const worker = this.ensureWorker();
		await new Promise<void>((resolve, reject) => {
			this.pending = { resolve, reject };
			worker.postMessage({
				type: "load",
				model,
				device,
				endpoint,
				wasmPaths: ortWasmPaths(),
			});
		});
		this.loadedModel = model;
	}

	/** 转写（pcm 为 16k mono Float32Array，所有权转移给 worker） */
	async transcribe(
		pcm: Float32Array,
		opts: {
			lang?: WhisperLang;
			onProgress?: (p: WhisperProgress) => void;
		} = {},
	): Promise<RawSegment[]> {
		if (!this.worker || !this.loadedModel) {
			throw new Error("whisper 模型未加载");
		}
		this.progressCb = opts.onProgress ?? null;
		return await new Promise<RawSegment[]>((resolve, reject) => {
			this.segmentsResolve = resolve;
			this.segmentsReject = reject;
			this.worker!.postMessage({ type: "asr", pcm, lang: opts.lang ?? "zh" }, [
				pcm.buffer as ArrayBuffer,
			]);
		});
	}

	/** 取消：先软取消（窗口间检查点生效）；卡死时可 force 重建 worker */
	cancel(force = false) {
		this.worker?.postMessage({ type: "cancel" });
		if (force) {
			this.worker?.terminate();
			this.worker = null;
			this.loadedModel = null;
			this.failAll(new Error("whisper worker 已强制终止"));
		}
	}

	/**
	 * 协议级自检（无头回归用）：真起一个 worker，asr 先于 load 发送，
	 * 预期收到 E_NOT_LOADED 错误回包——验证 worker 文件可加载、消息双向可达。
	 */
	async selfTest(): Promise<{ ok: boolean; code?: string; message?: string }> {
		const worker = new Worker(
			new URL("../workers/whisper.worker.ts", import.meta.url),
			{
				type: "module",
			},
		);
		try {
			return await new Promise((resolve, reject) => {
				const timer = setTimeout(
					() => reject(new Error("whisper worker 协议自检超时")),
					8000,
				);
				worker.onmessage = (event: MessageEvent) => {
					const msg = event.data as Record<string, unknown>;
					if (msg.type === "error") {
						clearTimeout(timer);
						resolve({
							ok: true,
							code: String(msg.code ?? ""),
							message: String(msg.message ?? ""),
						});
					}
				};
				worker.onerror = (e) => {
					clearTimeout(timer);
					reject(new Error(`worker 启动失败：${e.message}`));
				};
				worker.postMessage({
					type: "asr",
					pcm: new Float32Array(16000),
					lang: "zh",
				});
			});
		} finally {
			worker.terminate();
		}
	}
}

export const whisperClient = new WhisperClient();
