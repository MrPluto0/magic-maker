import { uniqueId } from "lodash-es";
import type { BaseTrackItem, TrackType } from "./Base";
import { baseFps, UnitFrame2μs } from "@/data/trackConfig";
import { audioDecoder, splitClip, subtitleDecoder } from "@/utils/webcodecs";
import { IClip, OffscreenSprite } from "@webav/av-cliper";
import { Resource } from "@/types/resource";

/**
 * 默认的音频设置，⚠️ 不要变更它的值 ⚠️
 */
const DEFAULT_AUDIO_CONF = {
  sampleRate: 48000,
  channelCount: 2,
  codec: "mp4a.40.2",
} as const;

export interface ISubtitle {
  fontSize: number;
  fontColor: string;
  strokeSize: number;
  strokeColor: string;
  bottomOffset: number;
}

export class AudioTrack implements BaseTrackItem {
  id: string;
  type: TrackType = "audio";
  source: Resource;
  name: string;
  format: string;
  frameCount: number;
  start: number;
  end: number;
  offsetL: number;
  offsetR: number;
  audio: HTMLAudioElement | null = null;
  volume = 1;
  drawSub: boolean = true;
  mute = false;
  loading = false;
  subtitle: ISubtitle = {
    fontSize: 40,
    fontColor: "#ffffff",
    strokeSize: 2,
    strokeColor: "#fffff00",
    bottomOffset: 30,
  };

  constructor(source: Resource, curFrame: number, volume: number = 1) {
    // 设置ID
    this.id = uniqueId();
    // 设置音频信息
    this.source = source;
    // 获取文件名称
    this.name = source.name;
    // 获取文件类型
    this.format = source.format;
    // 音频配置
    this.volume = volume;

    // 获取音频时长，转换为frameCount
    this.frameCount = source.duration * baseFps;
    this.start = curFrame;
    this.end = this.start + this.frameCount;

    // 设置裁剪信息
    this.offsetL = 0;
    this.offsetR = 0;
  }
  async draw(
    ctx: OffscreenCanvasRenderingContext2D,
    width: number,
    height: number,
    frameIndex: number
  ) {
    if (!this.source.subtitle || !this.drawSub) return;
    const frame = Math.max(frameIndex - this.start + this.offsetL, 1); // 默认展示首帧
    const vf = await subtitleDecoder.getFrame(this.id, frame);
    if (vf) {
      ctx.drawImage(vf, 0, 0, width, height, 0, 0, width, height);
      vf?.close();
    }
  }
  async render(ctx: AudioContext, frameIndex: number) {
    if (this.mute) {
      return null;
    }
    const frame = frameIndex - this.start;
    const pcm = await audioDecoder.getPCM(this.id, frame);
    const [chan0Buf, chan1Buf] = pcm;
    if (chan0Buf == null) return;
    if (chan0Buf.length <= 0) return;

    const buf = ctx.createBuffer(
      2,
      chan0Buf.length,
      DEFAULT_AUDIO_CONF.sampleRate
    );
    buf.copyToChannel(chan0Buf, 0);
    buf.copyToChannel(chan1Buf ?? chan0Buf, 1);
    const audioSource = ctx.createBufferSource();
    audioSource.buffer = buf;
    return audioSource;
  }
  // 生成合成对象
  async combine(target: "audio" | "subtitle" = "audio") {
    let clip: IClip;
    if (target === "audio") {
      clip = await audioDecoder.decode(this);
    } else {
      clip = await subtitleDecoder.decode(this);
    }
    clip = await splitClip(clip, {
      offsetL: this.offsetL,
      offsetR: this.offsetR,
      frameCount: this.frameCount,
    });
    if (!clip) {
      throw new Error("clip is not ready");
    }
    const spr = new OffscreenSprite(clip);
    // TODO：需要支持裁剪
    spr.time = {
      offset: this.start * UnitFrame2μs,
      duration: (this.end - this.start) * UnitFrame2μs,
    };

    return spr;
  }
}
