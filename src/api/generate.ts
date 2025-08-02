// import { formatResourceData } from "@/utils/storeUtil";
// import { request } from "./base";
// import { useTrainState } from "@/stores/trainState";
import {
  mockTextExpandResult,
  mockTextSplitResult,
  mockText2ImageResult,
  mockText2MoodboardResult,
  mockText2StoryboardResult,
  mockText2AudioResult,
  mockText2VideoResult,
  mockSpeechList,
  mockAnalyzeFileResult,
  mockUploadFileResult
} from "@/mock/mockData";
import { mockSuccess } from "@/mock/mockUtils";

export interface IText2Text {
  prompt: string;
  style: string;
}

export async function textExpand(data: IText2Text) {
  return mockSuccess(mockTextExpandResult);
}

export async function textSplit(text: string) {
  return mockSuccess(mockTextSplitResult);
}

export interface IText2Image {
  prompt: string;
  model: string;
  samples: number;
  sizeStr: string;
  keywords: string[];
  color: string;
  trigger?: string;
  [k: string]: any;
}

export async function text2image(data: IText2Image) {
  // const trainStore = useTrainState();
  // data.trigger = trainStore.savedModelList.find(
  //   (item) => item.modelUuid === data.model
  // )?.trainParam?.conceptSentence;

  // const res = await request<{ id: number; basicInfo: any }[]>(
  //   "/image_model/text2image",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  // return res.map((item) => formatResourceData(item));
  return mockSuccess(mockText2ImageResult);
}

export async function text2moodboard(data: IText2Image) {
  return mockSuccess(mockText2MoodboardResult);
}

export async function text2storyboard(prompt: string) {
  return mockSuccess(mockText2StoryboardResult);
}

export interface IText2Audio {
  prompt: string;
  style: string;
  len: number;
}

export async function text2audio(data: IText2Audio) {
  // const res = await request<{ id: number; basicInfo: any }>(
  //   "/music_model/text2music",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  // return formatResourceData(res);
  return mockSuccess(mockText2AudioResult);
}

export interface IText2Speech {
  prompt: string;
  voiceUrl: string;
}

export async function text2speech(data: IText2Speech) {
  // const res = await request<{ id: number; basicInfo: any }>(
  //   "/music_model/text2speech",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  // return formatResourceData(res);
  return mockSuccess(mockText2AudioResult);
}

export interface IVoice {
  voiceUrl: string;
  voiceName: string;
}

export async function getSpeechList() {
  return mockSuccess(mockSpeechList);
}

export async function cloneVoice(voiceName: string, blob: Blob) {
  // const form = new FormData();
  // form.append("file", blob, voiceName + ".mp3"); //和普通form表单并无二致，后端接收到file参数的文件，文件名为recorder.mp3
  // return request("/music_model/clone_voice", {
  //   method: "POST",
  //   data: form,
  //   params: {
  //     voiceName,
  //   },
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  return mockSuccess({ success: true, voiceName });
}

export interface IText2Video {
  prompt: string;
  style: string;
  sizeStr: string;
  model?: "cogvideox";
}

export async function text2video(data: IText2Video) {
  // data.model = "cogvideox";
  // const res = await request<{ id: number; basicInfo: any }>(
  //   "/video_model/text2video",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  // return formatResourceData(res);
  return mockSuccess(mockText2VideoResult);
}

export interface IImage2Video {
  prompt: string;
  imageUrl: string;
  model?: "cogvideox";
}

export async function image2video(data: IImage2Video) {
  // data.model = "cogvideox";
  // const res = await request<{ id: number; basicInfo: any }>(
  //   "/video_model/image2video",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  // return formatResourceData(res);
  return mockSuccess(mockText2VideoResult);
}

export async function analyzeFile(file: File) {
  // const formData = new FormData();
  // formData.append("file", file);

  // return request<string>("/text_model/analyze_file", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data: formData,
  // });
  return mockSuccess(mockAnalyzeFileResult);
}

export interface IUploadFile {
  path?: string;
  url: string;
}

export async function uploadFile(file: File) {
  // const formData = new FormData();
  // formData.append("file", file);

  // return request<IUploadFile>("/file/upload", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data: formData,
  // });
  return mockSuccess(mockUploadFileResult);
}

export async function uploadMaterial(type: string, file: File) {
  // const formData = new FormData();
  // formData.append("file", file);

  // const res = await request<IUploadFile>("/file/upload_material", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data: formData,
  //   params: {
  //     fileType: type,
  //   },
  // });
  // return formatResourceData(res);
  return mockSuccess(mockUploadFileResult);
}
