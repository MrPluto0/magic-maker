import { readFileFromOPFS } from "@/utils/file";

/**
 * PCM 提取管线（W6，docs/BIG_ITERATION_PLAN §3.4）：
 * OPFS 原文件 → decodeAudioData（Chrome 可直接解 mp4/m4a/wav/mp3 等含音频容器）
 * → OfflineAudioContext 重采样 16k 单声道 → Float32Array（可 transfer 零拷贝入 worker）。
 *
 * 不依赖 AudioContext 运行态（autoplay 限制），全程 OfflineAudioContext。
 */

/** whisper 采样率 */
export const WHISPER_SAMPLE_RATE = 16000;

export async function extractPcm16kMono(
	resourceKey: string,
): Promise<Float32Array> {
	const file = await readFileFromOPFS(resourceKey);
	const buffer = await file.arrayBuffer();

	// decodeAudioData 在 OfflineAudioContext 上同样可用（不需要用户手势）
	const decodeCtx = new OfflineAudioContext(1, 1, 48000);
	const decoded = await decodeCtx.decodeAudioData(buffer);

	// 重采样 + 下混单声道：1 声道目标上下文自动把多声道按 speakers 规则下混
	const length = Math.max(1, Math.ceil(decoded.duration * WHISPER_SAMPLE_RATE));
	const offline = new OfflineAudioContext(1, length, WHISPER_SAMPLE_RATE);
	const source = offline.createBufferSource();
	source.buffer = decoded;
	source.connect(offline.destination);
	source.start();
	const rendered = await offline.startRendering();

	// getChannelData 返回内部 buffer 的视图，slice 出独立 buffer 才能安全 transfer
	return rendered.getChannelData(0).slice();
}
