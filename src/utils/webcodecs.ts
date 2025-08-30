import { baseFps } from "@/data/track";
import {
	MP4Clip,
	AudioClip,
	ImgClip,
	type IClip,
	EmbedSubtitlesClip,
} from "@webav/av-cliper";
import { UnitFrame2μs } from "@/data/track";
import type { Track } from "@/types/track";
import type { AudioTrack } from "@/class/AudioTrack";
import { trimPunctuation } from "./common";
import { usePlayerState } from "@/stores/player";
import { readFileFromOPFS } from "./file";

class VideoDecoder {
	#decoderMap = new Map<string, MP4Clip>();
	#lastVideoFrame = new Map<string, VideoFrame>();

	#thumbnailsMap = new Map<
		string,
		{
			img: Blob;
			ts: number;
		}[]
	>();

	// 解码视频
	async decode(track: Track) {
		if (this.#decoderMap.has(track.id)) {
			return this.#decoderMap.get(track.id);
		}

		const file = await readFileFromOPFS(track.resource.id);
		const stream = await file.stream();

		const clip = new MP4Clip(stream);

		await clip.ready;

		this.#decoderMap.set(track.id, clip);

		return clip;
	}

	// 直接从文件流解码，用于资源创建
	async decodeFromStream(stream: ReadableStream, id: string) {
		if (this.#decoderMap.has(id)) {
			return this.#decoderMap.get(id);
		}

		const clip = new MP4Clip(stream);
		await clip.ready;

		this.#decoderMap.set(id, clip);
		return clip;
	}

	// 获取缩略图
	async thumbnails(track: Track, scale: number, step = 1e6) {
		const key = track.id + "-" + scale;
		if (this.#thumbnailsMap.has(key)) {
			return this.#thumbnailsMap.get(key);
		}
		const clip = await this.decode(track);

		if (!clip) {
			throw new Error("clip is not ready");
		}

		const thumbnails = await clip.thumbnails(100, { step });

		this.#thumbnailsMap.set(key, thumbnails);

		return thumbnails;
	}

	// 获取帧数据（由于时长过短，不能加锁）
	async getFrame(id: string, frameIndex: number, fps = baseFps) {
		const clip = this.#decoderMap.get(id);

		// 通过帧数去计算对应微秒级时间（以30FPS为标准）
		let time: number;
		time = Math.round(frameIndex * UnitFrame2μs);
		const { video, audio } = await clip.tick(time);

		// 如果获取不到，取出上一帧，注意：上一帧需要重新存储，因为每次使用后会关闭该帧
		const lastFrame = this.#lastVideoFrame.get(id);
		if (video) {
			lastFrame?.close();
			this.#lastVideoFrame.set(id, new VideoFrame(video));
			return { video, audio };
		} else {
			this.#lastVideoFrame.set(id, new VideoFrame(lastFrame));
			return { video: lastFrame, audio };
		}
	}
}

class ImageDecoder {
	#decoderMap = new Map<string, ImgClip>();

	async decode(track: Track, type?: string) {
		if (this.#decoderMap.has(track.id)) {
			return this.#decoderMap.get(track.id);
		}

		const file = await readFileFromOPFS(track.resource.id);
		const stream = await file.stream();

		//@ts-expect-error
		const clip = new ImgClip({ stream, type });

		// 存储解析后的帧
		this.#decoderMap.set(track.id, clip);

		return clip;
	}

	// 直接从文件流解码，用于资源创建
	async decodeFromStream(stream: ReadableStream, id: string, type?: string) {
		if (this.#decoderMap.has(id)) {
			return this.#decoderMap.get(id);
		}

		//@ts-expect-error
		const clip = new ImgClip({ stream, type });
		await clip.ready;

		this.#decoderMap.set(id, clip);
		return clip;
	}

	async getFrame(id: string, frameIndex: number) {
		const clip = this.#decoderMap.get(id);
		const time = frameIndex * UnitFrame2μs;

		const frame = await clip.tick(time);
		return frame.video;
	}
}

class AudioDecoder {
	#decoderMap = new Map<string, AudioClip>();
	#lastFrameMap = new Map<string, number>();

	async decode(track: AudioTrack) {
		if (this.#decoderMap.has(track.id)) {
			return this.#decoderMap.get(track.id);
		}

		const file = await readFileFromOPFS(track.resource.id);
		const stream = await file.stream();

		const clip = new AudioClip(stream, { volume: track.volume });

		await clip.ready;

		this.#decoderMap.set(track.id, clip);
		this.#lastFrameMap.set(track.id, 0);

		return clip;
	}

	// 直接从文件流解码，用于资源创建
	async decodeFromStream(stream: ReadableStream, id: string) {
		if (this.#decoderMap.has(id)) {
			return this.#decoderMap.get(id);
		}

		const clip = new AudioClip(stream);
		await clip.ready;

		this.#decoderMap.set(id, clip);
		this.#lastFrameMap.set(id, 0);
		return clip;
	}
	async getPCM(id: string, frameIndex: number) {
		const clip = this.#decoderMap.get(id);
		const lastFrame = this.#lastFrameMap.get(id);

		// 记录上一次的帧数，如果跳越帧数，则提前重置
		if (frameIndex - lastFrame > 2) {
			const time = (frameIndex - 1) * UnitFrame2μs;
			await clip.tick(time);
		}

		// 返回上次与当前时刻差对应的音频 PCM 数据；
		const time = frameIndex * UnitFrame2μs;
		const { audio } = await clip.tick(time);

		this.#lastFrameMap.set(id, frameIndex);

		return audio;
	}
	async updateVolume(track: AudioTrack, volume: number) {
		const file = await readFileFromOPFS(track.resource.id);
		const stream = await file.stream();

		const clip = new AudioClip(stream, { volume });

		this.#decoderMap.set(track.id, clip);
	}
}

class SubtitleDecoder {
	#decoderMap = new Map<string, EmbedSubtitlesClip>();
	#audioMap = new Map<string, AudioTrack>();

	async refresh(track?: AudioTrack) {
		if (track) {
			await this.decode(track, undefined, true);
		} else {
			// 刷新全部
			for (const [_, track] of this.#audioMap.entries()) {
				await this.decode(track, undefined, true);
			}
		}
	}

	async decode(track: AudioTrack, url?: string, force = false) {
		if (this.#decoderMap.has(track.id) && !force) {
			return this.#decoderMap.get(track.id);
		}

		const file = await readFileFromOPFS(track.resource.id, url);
		const text = await file.text();
		const playerStore = usePlayerState();
		const trimedText = trimPunctuation(text);

		const clip = new EmbedSubtitlesClip(trimedText, {
			videoWidth: playerStore.playerWidth,
			videoHeight: playerStore.playerHeight,
			fontSize: track.subtitle.fontSize,
			fontFamily: "Noto Sans SC",
			color: track.subtitle.fontColor,
			strokeStyle: track.subtitle.strokeColor,
			bottomOffset: track.subtitle.bottomOffset,
			lineWidth: track.subtitle.strokeSize,
		});

		await clip.ready;

		this.#decoderMap.set(track.id, clip);
		this.#audioMap.set(track.id, track);

		return clip;
	}

	async getFrame(id: string, frameIndex: number) {
		const clip = this.#decoderMap.get(id);
		const time = frameIndex * UnitFrame2μs;

		const frame = await clip.tick(time);

		return frame.video;
	}
}

export const videoDecoder = new VideoDecoder();

export const imageDecoder = new ImageDecoder();

export const audioDecoder = new AudioDecoder();

export const subtitleDecoder = new SubtitleDecoder();

export const splitClip = async (
	source: IClip,
	{
		offsetL,
		offsetR,
		frameCount,
	}: { offsetL: number; offsetR: number; frameCount: number },
) => {
	if (offsetL === 0 && offsetR === 0) {
		return source;
	}
	const start = offsetL * UnitFrame2μs;
	// 使用start裁剪视频
	const clip = offsetL === 0 ? source : (await source.split(start))[1];
	const end = (frameCount - offsetR - offsetL) * UnitFrame2μs;

	// return offsetR === 0 ? clip : (await clip.split(end))[0];
	return clip;
};
