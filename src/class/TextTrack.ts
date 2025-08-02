import { uniqueId } from "lodash-es";
import type { BaseTrackItem, TrackType } from "./Base";
import { getTextRect } from "@/utils/common";
import { ImgClip, OffscreenSprite } from "@webav/av-cliper";
import { baseFps, UnitFrame2μs } from "@/data/trackConfig";

export interface TextResource {
  text: string;
  fill: string;
  stroke?: string;
  fontSize: number;
  fontFamily: string;
  textBackgroundColor?: string;
  name: string;
  type?: string;
  [k: string]: any;
}

export class TextTrack implements BaseTrackItem {
  id: string;
  name: string;
  frameCount: number;
  start: number;
  end: number;
  format: string;
  source: TextResource;
  // 绘制信息
  type: TrackType = "text";
  centerX = 0;
  centerY = 0;
  scale = 100;
  width = 0;
  height = 0;
  // 文本内容，下面的属性在改变后应该响应时更新
  fill: string;
  stroke: string;
  textBackgroundColor?: string;
  fontSize = 24;
  fontFamily = "Arial";
  text = "";
  loading = false;

  constructor(source: TextResource, curFrame: number) {
    // 设置ID
    this.id = uniqueId();

    this.source = source;
    // 设置文字信息
    this.text = source.text;
    this.fill = source.fill;
    this.stroke = source.stroke;
    this.textBackgroundColor = source.textBackgroundColor;
    this.fontSize = source.fontSize;
    this.fontFamily = source.fontFamily;
    this.name = source.name;
    // 对于文本意义不大
    this.source.type = "text";
    this.format = "text";
    // 设置轨道信息
    this.frameCount = 2 * baseFps;
    this.start = curFrame;
    this.end = this.start + this.frameCount;
    // 设置绘制信息
    this.centerX = 0;
    this.centerY = 0;
    this.scale = 100;

    this.calcSize();
  }
  [k: string]: any;
  calcSize() {
    const { width, height } = getTextRect({
      text: this.text,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
    });
    // 计算文本宽高
    this.height = height;
    this.width = width;
  }
  get drawWidth() {
    return (this.width * this.scale) / 100;
  }
  get drawHeight() {
    return (this.height * this.scale) / 100;
  }
  getDrawX(width: number) {
    return width / 2 - this.drawWidth / 2 + this.centerX;
  }
  getDrawY(height: number) {
    return height / 2 - this.drawHeight / 2 + this.centerY;
  }
  drawRoundRect(
    ctx: OffscreenCanvasRenderingContext2D,
    {
      x,
      y,
      width,
      height,
      radius,
      color,
    }: {
      x: number;
      y: number;
      width: number;
      height: number;
      radius: number;
      color: string;
    }
  ) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }
  // 渲染方法保持一致
  async draw(
    ctx: OffscreenCanvasRenderingContext2D,
    width: number,
    height: number,
    frameIndex: number
  ) {
    this.calcSize();
    const padding = 4;
    const radius = 4;
    const text = this.text;
    const drawL = this.getDrawX(width);
    const drawT = this.getDrawY(height);

    const size = (this.fontSize * this.scale) / 100;
    const color = this.fill;
    const fontFamily = this.fontFamily;
    const strokeColor = this.stroke;
    const strokeWidth = 4;
    const backgroundColor = this.textBackgroundColor;

    const lines = text.split("\n");
    const lineHeight = size * 1.2; // Adjust line height as needed

    // Measure the widest line
    const textWidth = Math.max(
      ...lines.map((line) => ctx.measureText(line).width)
    );

    const totalHeight = lines.length * lineHeight;

    if (backgroundColor) {
      this.drawRoundRect(ctx, {
        x: drawL - padding,
        y: drawT - padding,
        width: textWidth + padding * 2,
        height: totalHeight + padding * 2,
        radius,
        color: backgroundColor,
      });
    }

    ctx.textBaseline = "top";
    ctx.font = `${size}px ${fontFamily}`;

    const startY = drawT + (totalHeight - lines.length * size) / 2; // Adjust y to center text vertically

    lines.forEach((line, index) => {
      const y = startY + index * lineHeight;

      if (strokeColor && strokeWidth) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.strokeText(line, drawL, y);
      }

      ctx.fillStyle = color;
      ctx.fillText(line, drawL, y);
    });

    return Promise.resolve();
  }

  // 生成合成对象
  async combine(width: number, height: number, outputRatio: number) {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("ctx is null");
    }
    await this.draw(ctx, width, height, 0);
    const imageBitmap = canvas.transferToImageBitmap();

    const clip = new ImgClip(imageBitmap);
    await clip.ready;
    const spr = new OffscreenSprite(clip);
    // TODO：需要支持裁剪
    spr.time = {
      offset: this.start * UnitFrame2μs,
      duration: this.frameCount * UnitFrame2μs,
    };
    spr.rect.x = 0;
    spr.rect.y = 0;
    spr.rect.w = width;
    spr.rect.h = height;

    console.log(spr);

    return spr;
  }
}
