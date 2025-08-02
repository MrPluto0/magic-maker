import { uniqueId } from "lodash-es";
import type { BaseTrackItem, TrackType } from "./Base";
import { imageDecoder } from "@/utils/webcodecs";
import { OffscreenSprite } from "@webav/av-cliper";
import { baseFps, UnitFrame2μs } from "@/data/trackConfig";
import { Resource } from "@/types/resource";

/**
 * 解析文件不能放在片段中：
 * 1. 文件解析是一个耗时操作，需要提前解析好，然后传递给片段
 * 2. 文件可能是网络资源，也可能是本地资源，在片段对象中要收束
 * 3. 不同片段可能共享同一个文件，解析一次即可
 * 4. 片段信息需要转换为文本进行存储（草稿）
 */
export class ImageTrack implements BaseTrackItem {
  id: string;
  type: TrackType = "image";
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
  offsetL = 0;
  offsetR = 0;
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
    // 设置图片信息
    this.source = source;
    // 获取文件名称
    this.name = source.name;
    // 获取文件类型
    this.format = source.format;
    // 设置轨道信息
    this.frameCount = 4 * baseFps;
    this.start = curFrame;
    this.end = this.start + this.frameCount;

    // 设置绘制信息
    this.centerX = 0;
    this.centerY = 0;
    this.scale = 100;
    this.height = source.height;
    this.width = source.width;
  }
  getDrawX(width: number) {
    return width / 2 - this.drawWidth / 2 + this.centerX;
  }
  getDrawY(height: number) {
    return height / 2 - this.drawHeight / 2 + this.centerY;
  }
  async draw(
    ctx: OffscreenCanvasRenderingContext2D,
    width: number,
    height: number,
    frameIndex: number
  ) {
    const frame = Math.max(frameIndex - this.start, 0); // 默认展示首帧
    const vf = await imageDecoder.getFrame(this.id, frame);
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
    }
  }

  // 生成合成对象
  async combine(width: number, height: number, outputRatio: number) {
    const clip = await imageDecoder.decode(this);
    if (!clip) {
      throw new Error("frames is not ready");
    }
    const spr = new OffscreenSprite(clip);
    // TODO：需要支持裁剪
    spr.time = {
      offset: this.start * UnitFrame2μs,
      duration: this.frameCount * UnitFrame2μs,
    };
    spr.rect.x = this.getDrawX(width) * outputRatio;
    spr.rect.y = this.getDrawY(height) * outputRatio;
    spr.rect.w = this.drawWidth * outputRatio;
    spr.rect.h = this.drawHeight * outputRatio;

    return spr;
  }
}
