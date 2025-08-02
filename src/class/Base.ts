export type TrackType = "video" | "audio" | "text" | "image" | "speech";

export interface BaseTrackItem {
  id: string;
  type: TrackType;
  name: string;
  start: number; // 在轨道上的起始位置，单位为帧
  end: number; // 在轨道上的结束位置
  frameCount: number; // 总帧数
  [k: string]: any;
}
