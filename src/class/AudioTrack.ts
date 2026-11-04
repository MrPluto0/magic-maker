import { OffscreenSprite } from "@webav/av-cliper";
import { nanoid } from "nanoid";
import { baseFps, UnitFrame2μs } from "@/data/track";
import type { AudioResource } from "@/types/resource";
import type { BaseTrack, TrackType } from "@/types/track";
import { decoder } from "./Decoder";

/**
 * 默认的音频设置，⚠️ 不要变更它的值 ⚠️
 */
const DEFAULT_AUDIO_CONF = {
	sampleRate: 48000,
	channelCount: 2,
	codec: "mp4a.40.2",
} as const;

// 旧版 AudioTrack.subtitle: ISubtitle 字幕配置已于 W6 删除：
// 字幕唯一事实源是 subtitleStore（segments + 全局 SubtitleStyle），
// 渲染走专用字幕行 TextTrack（src/class/subtitleView.ts），不留两份事实。

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
		buf.copyToChannel(chan0Buf, 0);
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
