import { ChatCompletionMessageParam } from "openai/resources/index";
import { TrackType } from "./track";

// 基础资源接口
export interface BaseResource {
	id: string;
	name: string;
	type: TrackType;
	createdAt: string;
	url: string;
	/** 原始二进制在 OPFS 中的 key（默认等于 id），持久化用，blob: url 不再落盘 */
	opfsKey?: string;
	meta?: Record<string, any>;
}

// 音频资源
export interface AudioResource extends BaseResource {
	type: "audio";
	format: string;
	duration: number;
	subtitle?: string; // 字幕URL或文本内容
}

// 图片资源
export interface ImageResource extends BaseResource {
	type: "image";
	format: string;
	width: number;
	height: number;
}

// 视频资源
export interface VideoResource extends BaseResource {
	type: "video";
	format: string;
	duration: number;
	width: number;
	height: number;
	cover?: string; // 封面图（运行期 blob url）
	/** 封面图在 OPFS 中的 key（默认 id + "_cover"） */
	coverOpfsKey?: string;
}

// 文本资源
export interface TextResource extends BaseResource {
	type: "text";
	messages: ChatMessage[];
}

export type ChatMessage = ChatCompletionMessageParam & {
	[key: string]: any;
};

// 统一资源类型
export type Resource =
	| AudioResource
	| ImageResource
	| VideoResource
	| TextResource;
