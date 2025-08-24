// 基础资源接口
export interface BaseResource {
  id: string;
  name: string;
  type: "audio" | "image" | "video" | "text";
  createdAt: string;
  file?: File; // 原始文件对象
  meta?: {
    [key: string]: any;
  }
}

// 音频资源
export interface AudioResource extends BaseResource {
  type: "audio";
  url: string;
  format: string;
  duration: number;
  subtitle?: string; // 字幕URL或文本内容
}

// 图片资源
export interface ImageResource extends BaseResource {
  type: "image";
  url: string;
  format: string;
  width: number;
  height: number;
}

// 视频资源
export interface VideoResource extends BaseResource {
  type: "video";
  url: string;
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
  role?: "user" | "system";
}

// 统一资源类型
export type Resource =
  | AudioResource
  | ImageResource
  | VideoResource
  | TextResource;

// 文件元信息接口
export interface FileMetaInfo {
  name: string;
  size: number;
  type: string;
  duration?: number;
  width?: number;
  height?: number;
}