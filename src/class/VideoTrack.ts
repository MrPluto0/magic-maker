import { uniqueId } from "lodash-es";
import type { BaseTrackItem, TrackType } from "./Base";
import { videoDecoder, splitClip } from "@/utils/webcodecs";
import { OffscreenSprite } from "@webav/av-cliper";
import { baseFps, UnitFrame2μs } from "@/data/trackConfig";
import { Resource } from "@/types/resource";

export class VideoTrack implements BaseTrackItem {
  id: string;
  type: TrackType = "video";
  source: Resource;
  name: string;
  format: string;
  frameCount: number;
  start: number;
  end: any;
  centerX: number;
  centerY: number;
  scale: number;
  height: number;
  width: number;
  offsetL: number;
  offsetR: number;
  audio: HTMLAudioElement | null = null;
  fps: number = baseFps;
  silent = false;
  loading = false;

  get drawHeight() {
    return (this.height * this.scale) / 100;
  }
  get drawWidth() {
    return (this.width * this.scale) / 100;
  }

  constructor(source: Resource, curFrame: number) {
    // 设置ID

    this.id = uniqueId();
    // 设置视频信息
    this.source = source;
    // 获取文件名称
    this.name = source.name;
    // 获取文件类型
    this.format = source.format;
    // 设置轨道信息
    this.frameCount = source.duration * baseFps;
    this.start = curFrame;
    this.end = this.start + this.frameCount;
    this.fps = source.fps ?? baseFps;

    // 设置绘制信息
    this.centerX = 0;
    this.centerY = 0;
    this.scale = 100;
    this.height = source.height;
    this.width = source.width;

    // 设置裁剪信息
    this.offsetL = 0;
    this.offsetR = 0;
  }
  getDrawX(width: number) {
    return width / 2 - this.drawWidth / 2 + this.centerX;
  }
  getDrawY(height: number) {
    return height / 2 - this.drawHeight / 2 + this.centerY;
  }
  /**
   * 渲染需要优化
   * TODO: 不需要没一次都去解码
   * TODO: 优化画布渲染
   */
  async draw(
    ctx: OffscreenCanvasRenderingContext2D,
    width: number,
    height: number,
    frameIndex: number
  ) {
    const frame = Math.max(frameIndex - this.start + this.offsetL, 1); // 默认展示首帧
    const { video: vf } = await videoDecoder.getFrame(this.id, frame, this.fps);
    if (vf) {
      ctx.drawImage(
        vf,
        0,
        0,
        this.source.width,
        this.source.height,
        this.getDrawX(width),
        this.getDrawY(height),
        this.drawWidth,
        this.drawHeight
      );
      vf?.close();
    }
  }
  // 生成合成对象
  async combine(width: number, height: number, outputRatio: number) {
    const video = await videoDecoder.decode(this);
    const clip = await splitClip(video, {
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
    spr.rect.x = this.getDrawX(width) * outputRatio;
    spr.rect.y = this.getDrawY(height) * outputRatio;
    spr.rect.w = this.drawWidth * outputRatio;
    spr.rect.h = this.drawHeight * outputRatio;

    return spr;
  }
}
