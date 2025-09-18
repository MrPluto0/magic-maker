import { OffscreenSprite } from "@webav/av-cliper";
import { baseFps, UnitFrame2μs } from "@/data/track";
import type { VideoResource } from "@/types/resource";
import type { BaseTrack, TrackType } from "@/types/track";
import { nanoid } from "nanoid";
import { decoder } from "./Decoder";

export class VideoTrack implements BaseTrack {
	id: string;
	type: TrackType = "video";
	resource: VideoResource;
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
	fps: number = baseFps;
	mute = false;
	loading = false;

	get drawHeight() {
		return (this.height * this.scale) / 100;
	}
	get drawWidth() {
		return (this.width * this.scale) / 100;
	}

	constructor(resource: VideoResource, curFrame: number) {
		// 设置ID
		this.id = nanoid();
		this.resource = resource;

		// 获取文件信息
		this.name = resource.name;
		this.format = resource.format;

		// 设置轨道信息
		this.frameCount = resource.duration * baseFps;
		this.start = curFrame;
		this.end = this.start + this.frameCount;
		this.fps = (resource as any).fps ?? baseFps;

		// 设置绘制信息
		this.centerX = 0;
		this.centerY = 0;
		this.scale = 100;
		this.height = resource.height;
		this.width = resource.width;

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

	async draw(
		ctx: OffscreenCanvasRenderingContext2D,
		width: number,
		height: number,
		frameIndex: number,
	) {
		const frame = Math.max(frameIndex - this.start + this.offsetL, 1); // 默认展示首帧
		const { video: vf } = await decoder.tick(this, frame);
		if (vf) {
			ctx.drawImage(
				vf,
				0,
				0,
				this.width,
				this.height,
				this.getDrawX(width),
				this.getDrawY(height),
				this.drawWidth,
				this.drawHeight,
			);
			vf?.close();
		}
	}

	// 生成合成对象
	async combine(width: number, height: number, outputRatio: number) {
		const clip = await decoder.split(this);
		const spr = new OffscreenSprite(clip);
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
