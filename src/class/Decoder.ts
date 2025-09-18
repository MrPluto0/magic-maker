import { ImgClip, MP4Clip, AudioClip } from "@webav/av-cliper";
import { readFileFromOPFS } from "@/utils/file";
import type { Track } from "@/types/track";
import { AudioTrack } from "./AudioTrack";
import { VideoTrack } from "./VideoTrack";
import { UnitFrame2μs } from "@/data/track";
import { ImageTrack } from "./ImageTrack";
import { getGridPixel } from "@/utils/canvasUtil";

class Decoder {
	private clipMap = new Map<string, ImgClip | MP4Clip | AudioClip>();

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

		// 重新构建字幕切片
		// const { subtitle, id } = this.resource;
		// if (subtitle) {
		//   const file = await readFileFromOPFS(id + "_s", subtitle);
		//   const text = await file.text();
		//   const playerStore = usePlayerState();
		//   const trimText = trimPunctuation(text);

		//   const subtitleClip = new EmbedSubtitlesClip(trimText, {
		//     videoWidth: playerStore.playerWidth,
		//     videoHeight: playerStore.playerHeight,
		//     ...this.subtitle,
		//   });
		//   await subtitleClip.ready;
		//   this.#subtitleClip = subtitleClip;
		// }

		await clip.ready;
		this.clipMap.set(resourceId, clip);

		return clip;
	}

	async tick(track: Track, frameIndex: number) {
		const clip = this.clipMap.get(track.resource.id);
		if (!clip) {
			throw new Error("Clip not decoded");
		}

		// 如果获取不到，取出上一帧，注意：上一帧需要重新存储，因为每次使用后会关闭该帧
		// if (video) {
		//   this.#lastFrame?.close();
		//   this.#lastFrame = new VideoFrame(video);
		//   return video;
		// } else {
		//   const lastFrame = this.#lastFrame;
		//   this.#lastFrame = new VideoFrame(lastFrame);
		//   return this.#lastFrame;
		// }

		// 记录上一次的音频数据，如果跳跃，则提前重置
		// if (frameIndex - this.#lastFrame > 2) {
		//   const time = (frameIndex - 1) * UnitFrame2μs;
		//   await this.#clip.tick(time);
		// }

		const time = frameIndex * UnitFrame2μs;
		return clip.tick(time) as Promise<{
			video?: VideoFrame;
			audio?: Float32Array[];
		}>;
	}

	async thumbnails(track: Track, scale) {
		const clip = this.clipMap.get(track.resource.id);
		if (!(clip instanceof MP4Clip)) return [];

		const unitWidth = getGridPixel(scale, track.frameCount);
		const imgCount = Math.ceil(unitWidth / 50);
		const step = Math.ceil((track.resource.duration * 1e6) / imgCount);
		return clip.thumbnails(100, { step });
	}

	async split(track: Track) {
		const { offsetL, offsetR, frameCount } = track;
		const originClip = this.clipMap.get(track.resource.id);

		if (offsetL === 0 && offsetR === 0) {
			return originClip;
		}
		// 使用start裁剪视频
		const start = offsetL * UnitFrame2μs;
		const clip =
			offsetL === 0 ? originClip : (await originClip.split(start))[1];

		// const end = (frameCount - offsetR - offsetL) * UnitFrame2μs;
		// return offsetR === 0 ? clip : (await clip.split(end))[0];
		await clip.ready;
		return clip;
	}
}

export const decoder = new Decoder();
