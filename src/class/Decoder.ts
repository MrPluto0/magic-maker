import { AudioClip, ImgClip, MP4Clip } from "@webav/av-cliper";
import { UnitFrame2μs } from "@/data/track";
import type { VideoResource } from "@/types/resource";
import type { Track } from "@/types/track";
import { getGridPixel } from "@/utils/canvasUtil";
import { readFileFromOPFS } from "@/utils/file";
import { splitClipBoundaries } from "@/utils/track";
import { AudioTrack } from "./AudioTrack";
import { ImageTrack } from "./ImageTrack";
import { VideoTrack } from "./VideoTrack";

interface DecodedData {
	video?: VideoFrame | ImageBitmap;
	audio?: Float32Array[];
}

class Decoder {
	private clipMap = new Map<string, ImgClip | MP4Clip | AudioClip>();
	private lastVFrame = new Map<string, VideoFrame>();
	private lastAFrameIdx = new Map<string, number>();

	getClip(track: Track) {
		return this.clipMap.get(track.resource.id);
	}

	clear() {
		this.clipMap.clear();
	}

	async decode(
		track: Track,
		force = false,
	): Promise<ImgClip | MP4Clip | AudioClip> {
		const resourceId = track.resource.id;

		if (this.clipMap.has(resourceId)) {
			const clip = this.clipMap.get(resourceId);
			if (force) {
				clip.destroy();
				this.clipMap.delete(resourceId);
			} else {
				return clip;
			}
		}

		const file = await readFileFromOPFS(resourceId);
		const stream = await file.stream();

		let clip: ImgClip | MP4Clip | AudioClip;

		if (track instanceof ImageTrack) {
			clip = new ImgClip({ stream, type: track.resource.format as any });
		} else if (track instanceof AudioTrack) {
			clip = new AudioClip(stream, { volume: track.volume });
		} else if (track instanceof VideoTrack) {
			clip = new MP4Clip(stream);
		}

		// 旧版 EmbedSubtitlesClip 字幕嵌入链路已于 W6 正式废弃删除（不复活）：
		// 字幕渲染走专用字幕行 TextTrack（subtitleStore → subtitleView 同步）。

		await clip.ready;
		this.clipMap.set(resourceId, clip);

		return clip;
	}

	async tick(track: Track, frameIndex: number): Promise<DecodedData> {
		const resourceId = track.resource.id;
		const clip = this.clipMap.get(resourceId);
		if (!clip) {
			throw new Error("Clip not decoded");
		}

		// 记录上一次的音频数据，如果声音往后跳跃到3s内，则提前重置
		if (track instanceof AudioTrack) {
			const lastAIdx = this.lastAFrameIdx.get(resourceId);
			if (lastAIdx && frameIndex - lastAIdx > 2) {
				const time = (frameIndex - 1) * UnitFrame2μs;
				await clip.tick(time);
			}
			this.lastAFrameIdx.set(resourceId, frameIndex);
		}

		const time = frameIndex * UnitFrame2μs;
		const data = (await clip.tick(time)) as DecodedData;

		// 如果获取不到，取出上一帧（上一帧需要重新存储，因为每次使用后会关闭该帧）
		if (track instanceof VideoTrack) {
			if (data.video) {
				this.lastVFrame.get(resourceId)?.close();
				this.lastVFrame.set(resourceId, new VideoFrame(data.video));
			} else {
				const lastFrame = this.lastVFrame.get(resourceId);
				if (lastFrame) {
					data.video = new VideoFrame(lastFrame);
				}
			}
		}

		return data;
	}

	async thumbnails(track: Track, scale) {
		const clip = this.clipMap.get(track.resource.id);
		if (!(clip instanceof MP4Clip)) return [];

		const unitWidth = getGridPixel(scale, track.frameCount);
		const imgCount = Math.ceil(unitWidth / 50);
		// MP4Clip 只会来自视频轨
		const step = Math.ceil(
			((track.resource as VideoResource).duration * 1e6) / imgCount,
		);
		return clip.thumbnails(100, { step });
	}

	async split(track: Track) {
		const { offsetL, offsetR, frameCount } = track;
		const originClip = this.clipMap.get(track.resource.id);

		if (offsetL === 0 && offsetR === 0) {
			return originClip;
		}
		const { startUs, endUs } = splitClipBoundaries(
			offsetL,
			offsetR,
			frameCount,
		);
		// 使用start裁剪视频（取分割后的右半段）
		const clip =
			startUs === 0 ? originClip : (await originClip.split(startUs))[1];

		// 使用end裁剪收尾（取第二次分割后的左半段），否则右半段时长超出
		// end-start，导出时 Combinator 报 "time" out of bounds
		const trimmed = offsetR === 0 ? clip : (await clip.split(endUs))[0];
		await trimmed.ready;
		return trimmed;
	}
}

export const decoder = new Decoder();
