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
  analyzeUrl: string;
  analyzeResult: string;
  aiEngineModelName: string;
  aiEngineTrigger: string;
  aiEngineUploadPath: string;
  aiEngineCaptions: any;
  aiEngineChosenModel: string;
  aiEngineDescription: string;
  generateSpeechRecords: Record[];
  generateTextRecords: Record[];
  generateImageRecords: Record[];
  generateMusicRecords: Record[];
  generateVideoRecords: Record[];
  uploadImageRecords: Record[];
  uploadMusicRecords: Record[];
  uploadSpeechRecords: Record[];
  uploadVideoRecords: Record[];
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
