import { ExcalidrawElement } from "@pkg/excalidraw/types/element/types";

export interface IProject {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  description: string;
  projectName: string;
  previewUrl: string;
  clipParam: TrackLineItem[];
  drawParam: ExcalidrawElement[];
  speechRecords: Record[];
  textRecords: Record[];
  imageRecords: Record[];
  musicRecords: Record[];
  videoRecords: Record[];
}

export interface Record {
  id: number;
  userId: number;
  type: string;
  model: string;
  prompt: string;
  promptFileUrl: string;
  url: string;
  textResult: string;
  size: number;
  configs: string;
  basicInfo: any;
}
