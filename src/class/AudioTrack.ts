import { baseFps, UnitFrame2μs } from "@/data/track";
import { OffscreenSprite } from "@webav/av-cliper";
import type { AudioResource } from "@/types/resource";
import type { BaseTrack, TrackType } from "@/types/track";
import { nanoid } from "nanoid";
import { decoder } from "./Decoder";

/**
 * 默认的音频设置，⚠️ 不要变更它的值 ⚠️
 */
const DEFAULT_AUDIO_CONF = {
	sampleRate: 48000,
	channelCount: 2,
	codec: "mp4a.40.2",
} as const;

export interface ISubtitle {
	show: boolean;
	fontSize: number;
	fontColor: string;
	strokeSize: number;
	strokeColor: string;
	bottomOffset: number;
	fontFamily: string;
}

export class AudioTrack implements BaseTrack {
	id: string;
	resource: AudioResource;
	type: TrackType = "audio";
	name: string;
	format: string;
	frameCount: number;
	start: number;
	end: number;
	offsetL: number;
	offsetR: number;
	volume = 1;
	mute = false;
	loading = false;
	subtitle: ISubtitle = {
		show: false,
		fontSize: 40,
		fontColor: "#ffffff",
		strokeSize: 2,
		strokeColor: "#fffff00",
		bottomOffset: 30,
		fontFamily: "Noto Sans SC",
	};

	constructor(resource: AudioResource, curFrame: number, volume: number = 1) {
		this.id = nanoid();
		this.resource = resource;

		// 获取文件信息
		this.name = resource.name;
		this.format = resource.format;
		this.volume = volume;

		// 获取音频时长，转换为frameCount
		this.frameCount = resource.duration * baseFps;
		this.start = curFrame;
		this.end = this.start + this.frameCount;

		// 设置裁剪信息
		this.offsetL = 0;
		this.offsetR = 0;
	}

	// 绘制音频对应的字幕
	// async draw(
	//   ctx: OffscreenCanvasRenderingContext2D,
	//   width: number,
	//   height: number,
	//   frameIndex: number
	// ) {
	//   const time =
	//     Math.max(frameIndex - this.start + this.offsetL, 1) * UnitFrame2μs;
	//   const { video } = await this.#subtitleClip.tick(time);
	//   if (video) {
	//     ctx.drawImage(video, 0, 0, width, height, 0, 0, width, height);
	//     video?.close();
	//   }
	// }

	// 播放音频数据
	async play(ctx: AudioContext, frameIndex: number) {
		if (this.mute) {
			return null;
		}
		const frame = frameIndex - this.start;
		const { audio: pcm } = await decoder.tick(this, frame);

		const [chan0Buf, chan1Buf] = pcm;
		if (chan0Buf == null) return;
		if (chan0Buf.length <= 0) return;

		const buf = ctx.createBuffer(
			2,
			chan0Buf.length,
			DEFAULT_AUDIO_CONF.sampleRate,
		);
		// @ts-expect-error
		buf.copyToChannel(chan0Buf, 0);
		// @ts-expect-error
		buf.copyToChannel(chan1Buf ?? chan0Buf, 1);
		const audioSource = ctx.createBufferSource();
		audioSource.buffer = buf;

		return audioSource;
	}

	// 生成合成对象
	async combine() {
		const clip = await decoder.split(this);
		const spr = new OffscreenSprite(clip);
		spr.time = {
			offset: this.start * UnitFrame2μs,
			duration: (this.end - this.start) * UnitFrame2μs,
		};

		return spr;
	}
}
