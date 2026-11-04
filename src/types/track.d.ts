import { AudioTrack } from "@/class/AudioTrack";
import { ImageTrack } from "@/class/ImageTrack";
import { TextTrack } from "@/class/TextTrack";
import { VideoTrack } from "@/class/VideoTrack";
import type { Resource } from "./resource";

// 基础轨道接口
export interface BaseTrack {
	id: string;
	type: TrackType;
	name: string;
	start: number; // 在轨道上的起始位置，单位为帧
	end: number; // 在轨道上的结束位置
	frameCount: number; // 总帧数（原始素材长度）
	offsetL: number; // 相对素材原点的左侧裁剪帧数
	offsetR: number; // 相对素材原点的右侧裁剪帧数
}

// 轨道类型
export type TrackType = "video" | "audio" | "text" | "image";
export type DrawTrack = VideoTrack | ImageTrack | TextTrack;
export type Track = VideoTrack | ImageTrack | AudioTrack | TextTrack;

/**
 * Track 的纯数据投影（W4 undo 序列化重建）：平铺全部可序列化字段，
 * 不含方法/getter，可安全 JSON 往返。按轨道类型只填相关字段。
 * undo 快照与草稿持久化都以它为准，恢复时经 rebuild/loadTrackData 重建类实例。
 */
export interface TrackData extends BaseTrack {
	/** 资源引用（JSON 快照形态；text 轨资源没有 createdAt/url 等完整字段） */
	resource: Partial<Resource> &
		Pick<Resource, "id" | "name" | "type"> & { text?: string };
	format: string;
	// 绘制属性（video/image/text）
	centerX?: number;
	centerY?: number;
	scale?: number;
	width?: number;
	height?: number;
	fps?: number;
	// 通用
	mute?: boolean;
	loading?: boolean;
	// audio
	volume?: number;
	// text
	fill?: string;
	stroke?: string;
	textBackgroundColor?: string;
	fontSize?: number;
	fontFamily?: string;
	text?: string;
	/** 字幕行 TextTrack 反向引用的段落 id（W6 视图同步） */
	segmentId?: string;
}

// 轨道线项目接口
export interface TrackLineItem {
	type: TrackType;
	main?: boolean;
	/** 专用字幕行（W6）：承载 segments → TextTrack 的视图同步，type 复用 "text" */
	isSubtitle?: boolean;
	list: Track[];
}

// 轨道线的纯数据投影（undo 快照 / 草稿持久化）
export interface TrackLineData {
	type: TrackType;
	main?: boolean;
	isSubtitle?: boolean;
	list: TrackData[];
}
