import { TrackType } from "./track";

// 基础资源接口
export interface BaseResource {
  id: string;
  name: string;
  type: TrackType;
  createdAt: string;
  url: string;
  meta?: {
    [key: string]: any;
  };
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
  cover?: string; // 封面图
}

// 文本资源
export interface TextResource extends BaseResource {
  type: "text";
  content: string;
  role: "user" | "system";
  [key: string]: any;
}

// 统一资源类型
export type Resource =
  | AudioResource
  | ImageResource
  | VideoResource
  | TextResource;
