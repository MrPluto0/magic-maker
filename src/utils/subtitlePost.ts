/**
 * 转写结果 → 字幕段的中文后处理（W6 纯函数，Vitest 锁定）。
 *
 * 第 0 步 繁→简（opencc-js 懒加载，W6 修：whisper 中文输出是繁体）：
 *    转写原文先整体转简体再进规则管线；
 * 三条规则（docs/BIG_ITERATION_PLAN §3.4）：
 * ① 按标点合并 <2s 碎段：短且不以句末标点收尾的碎段向前并；
 * ② >8s 长段在逗号处二次切分：时间按字符占比线性内插；
 * ③ 最小段宽 0.6s：过窄段并入前邻，避免字幕闪烁。
 */

export interface RawSegment {
	text: string;
	startSec: number;
	endSec: number;
}

export interface TimedSegment {
	text: string;
	startFrame: number;
	endFrame: number;
}

/** 碎段阈值：短于该时长且未成句 → 并入前段 */
export const MERGE_FRAGMENT_SEC = 2;
/** 长段阈值：超过该时长在逗号处二次切分 */
export const MAX_SEGMENT_SEC = 8;
/** 最小段宽：低于该时长的段并入前邻 */
export const MIN_SEGMENT_SEC = 0.6;

const SENTENCE_END = /[。！？!?…」』"”』】)）]$/;
const CLAUSE_BREAK = /[，,、；;：:]/;
const CJK = /[\u4e00-\u9fff\u3040-\u30ff]/;

/* ---------------- 简繁转换（W6 修：whisper 中文输出繁体） ---------------- */

/** 繁→简转换器单例（opencc-js/t2cn 纯 JS，动态 import 不进主包） */
let t2sConvert: ((text: string) => string) | null = null;

async function getT2s(): Promise<(text: string) => string> {
	if (!t2sConvert) {
		// t2cn 子集构建：只含繁→简词典（约 109KB），比 full（1.2MB）小一个量级
		const OpenCC = await import("opencc-js/t2cn");
		t2sConvert = OpenCC.Converter({ from: "t", to: "cn" });
	}
	return t2sConvert;
}

/**
 * 转写原文 繁→简（单段文本）。无 CJK 的文本原样返回；
 * opencc-js 加载失败（理论上不可能——已随构建打包）时退回原文。
 */
export async function toSimplifiedText(text: string): Promise<string> {
	if (!CJK.test(text)) return text;
	try {
		return (await getT2s())(text);
	} catch {
		return text;
	}
}

/** 转写段落批量 繁→简（时间码不动，仅文本） */
export async function toSimplifiedSegments(
	segs: RawSegment[],
): Promise<RawSegment[]> {
	if (!segs.some((s) => CJK.test(s.text))) return segs;
	const convert = await getT2s();
	return segs.map((s) =>
		CJK.test(s.text) ? { ...s, text: convert(s.text) } : s,
	);
}

/** 中文口播参考语速（字/秒），用于时间戳塌缩重建 */
export const SPEECH_CPS = 6;
/** 字/秒 超过该值判定时间戳塌缩（whisper 首 chunk 常见：长文本压进极短时长） */
export const COLLAPSE_CPS = 12;

/**
 * 时间戳塌缩重建：whisper-base 首窗常把几十秒的长文本压进一个极短 chunk
 * （如 90 字塞进 2s）。按参考语速重建时长，并钳制到下一句起点，
 * 交由规则②的逗号切分接手。
 */
export function fixCollapsedTimestamps(
	segs: RawSegment[],
	cps = SPEECH_CPS,
	collapseAt = COLLAPSE_CPS,
): RawSegment[] {
	return segs.map((seg, i) => {
		const dur = seg.endSec - seg.startSec;
		const density = seg.text.length / Math.max(dur, 0.1);
		if (density <= collapseAt) return seg;
		const nextStart = segs[i + 1]?.startSec;
		const rebuilt = seg.text.length / cps;
		const capped =
			nextStart !== undefined
				? Math.min(rebuilt, Math.max(nextStart - seg.startSec, dur))
				: rebuilt;
		return { ...seg, endSec: seg.startSec + Math.max(capped, dur) };
	});
}

export function cleanText(text: string): string {
	return text.replace(/\s+/g, " ").trim();
}

/** 规则①：合并 <2s 且不成句的碎段（时间取并集，文本按中英拼接习惯连接） */
export function mergeFragments(
	segs: RawSegment[],
	threshold = MERGE_FRAGMENT_SEC,
): RawSegment[] {
	const out: RawSegment[] = [];
	for (const seg of segs) {
		const last = out[out.length - 1];
		const dur = seg.endSec - seg.startSec;
		if (
			last &&
			dur < threshold &&
			!SENTENCE_END.test(last.text) &&
			seg.startSec - last.endSec < 1.5
		) {
			const joiner = CJK.test(last.text) || CJK.test(seg.text) ? "" : " ";
			last.text = `${last.text}${joiner}${seg.text}`;
			last.endSec = Math.max(last.endSec, seg.endSec);
			continue;
		}
		out.push({ ...seg });
	}
	return out;
}

/** 规则②：>8s 的段在逗号处切分，时间按字符占比线性内插 */
export function splitLongSegments(
	segs: RawSegment[],
	max = MAX_SEGMENT_SEC,
): RawSegment[] {
	const out: RawSegment[] = [];
	for (const seg of segs) {
		const dur = seg.endSec - seg.startSec;
		if (dur <= max) {
			out.push({ ...seg });
			continue;
		}
		const chars = [...seg.text];
		const total = chars.length || 1;
		const timeAt = (idx: number) => seg.startSec + (dur * idx) / total;

		// 逗号候选边界（切在标点之后）
		const bounds: number[] = [];
		for (let i = 0; i < chars.length; i++) {
			if (CLAUSE_BREAK.test(chars[i])) bounds.push(i + 1);
		}
		bounds.push(chars.length);

		let pieceStart = 0;
		let pieceStartSec = seg.startSec;
		for (const bound of bounds) {
			const pieceSec = timeAt(bound);
			// 候选点不足最短可读长度（≥1s）时攒到下一刀
			const isLast = bound === chars.length;
			if (!isLast && pieceSec - pieceStartSec < 1) continue;
			const text = cleanText(chars.slice(pieceStart, bound).join(""));
			if (text) {
				out.push({
					text,
					startSec: pieceStartSec,
					endSec: isLast ? seg.endSec : pieceSec,
				});
			}
			pieceStart = bound;
			pieceStartSec = pieceSec;
		}
	}
	return out;
}

/** 规则③：最小段宽兜底（<0.6s 并入前邻；无前邻则并入后邻） */
export function enforceMinWidth(
	segs: RawSegment[],
	min = MIN_SEGMENT_SEC,
): RawSegment[] {
	const out: RawSegment[] = [];
	for (const seg of segs) {
		const last = out[out.length - 1];
		if (last && seg.endSec - seg.startSec < min) {
			const joiner = CJK.test(last.text) || CJK.test(seg.text) ? "" : " ";
			last.text = `${last.text}${joiner}${seg.text}`;
			last.endSec = Math.max(last.endSec, seg.endSec);
			continue;
		}
		out.push({ ...seg });
	}
	if (out.length >= 2 && out[0].endSec - out[0].startSec < min) {
		const [first, second, ...rest] = out;
		const joiner = CJK.test(first.text) || CJK.test(second.text) ? "" : " ";
		out[0] = {
			text: `${first.text}${joiner}${second.text}`,
			startSec: first.startSec,
			endSec: Math.max(first.endSec, second.endSec),
		};
		out.splice(1, 1, ...rest);
	}
	return out;
}

/** 秒 → 帧（与命令层 resolveTimePoint 同口径：round） */
export function secToFrame(sec: number, fps: number): number {
	return Math.round(sec * fps);
}

/** 完整后处理管线：清洗 → 排序 → ①②③ → 帧化（保证 endFrame > startFrame） */
export function postprocessTranscription(
	raw: RawSegment[],
	fps: number,
): TimedSegment[] {
	const cleaned = raw
		.map((s) => ({
			text: cleanText(s.text),
			startSec: s.startSec,
			endSec: s.endSec,
		}))
		.filter((s) => s.text.length > 0 && Number.isFinite(s.startSec))
		.map((s) => ({ ...s, endSec: Math.max(s.endSec, s.startSec + 0.05) }))
		.sort((a, b) => a.startSec - b.startSec);

	// 塌缩时间戳重建 → 碎段合并 → 长段切分 → 最小段宽
	const merged = enforceMinWidth(
		splitLongSegments(mergeFragments(fixCollapsedTimestamps(cleaned))),
	);

	return merged.map((s) => {
		const startFrame = secToFrame(s.startSec, fps);
		const endFrame = Math.max(secToFrame(s.endSec, fps), startFrame + 1);
		return { text: s.text, startFrame, endFrame };
	});
}

/** 段落全文（带时间码，mm:ss.s-mm:ss.s 文本），供 transcribe 工具回喂 LLM */
export function formatTranscript(
	segs: Array<{ text: string; startFrame: number; endFrame: number }>,
	fps: number,
): string {
	const fmt = (frame: number) => {
		const sec = frame / fps;
		const m = Math.floor(sec / 60);
		const s = sec - m * 60;
		return `${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
	};
	return segs
		.map((s) => `[${fmt(s.startFrame)}-${fmt(s.endFrame)}] ${s.text}`)
		.join("\n");
}
