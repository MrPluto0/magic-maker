import { AudioTrack } from "@/class/AudioTrack";
import { ImageTrack } from "@/class/ImageTrack";
import { TextTrack } from "@/class/TextTrack";
import { VideoTrack } from "@/class/VideoTrack";

// 轨道类型
export type TrackType = "video" | "audio" | "text" | "image";

// 基础轨道接口
export interface BaseTrack {
  id: string;
  type: TrackType;
  name: string;
  start: number; // 在轨道上的起始位置，单位为帧
  end: number; // 在轨道上的结束位置
  frameCount: number; // 总帧数
  [k: string]: any;
}

// 具体轨道类型实现
export type DrawTrack = VideoTrack | ImageTrack | TextTrack;
export type PlayTrack = VideoTrack | AudioTrack;
export type Track = VideoTrack | ImageTrack | AudioTrack | TextTrack;

// 轨道线项目接口
export interface TrackLineItem {
  type: TrackType;
  main?: boolean;
  list: Track[];
}
