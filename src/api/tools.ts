// import { Resource } from "@/types/resource";
// import { request } from "./base";
// import { formatResourceData } from "@/utils/storeUtil";
import { Resource } from "@/types/resource";
import {
  mockPartialDrawResult,
  mockExtendImageResult,
  mockTransferImageResult,
  mockRandomClipResult,
  mockPreClipResults
} from "@/mock/mockData";
import { mockSuccess } from "@/mock/mockUtils";

export async function partialDraw(imgUrl: string, posPrompt: string) {
  return mockSuccess(mockPartialDrawResult);
}

export async function extendImage(
  imgUrl: string,
  posPrompt: string,
  position: object
) {
  return mockSuccess(mockExtendImageResult);
}

export async function transferImage(imgUrl: string, posPrompt: string) {
  return mockSuccess(mockTransferImageResult);
}

export interface IRandomClipRes {
  record: any;
  scenes: any[];
}

export async function randomClip(file: File) {
  // const data = new FormData();
  // data.append("zip_file", file);

  // const res = await request<Resource>("/auto_clip/random_clip", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data,
  // });
  // return res;
  return mockSuccess(mockRandomClipResult);
}

export async function preAIClip(name: string, file: File) {
  // const data = new FormData();
  // data.append("zip_file", file);
  // data.append("name", name);

  // return request("/auto_clip/ai_clip_prehandle", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data,
  // });
  return mockSuccess({ success: true, name, batchUuid: "batch-uuid-" + Date.now() });
}

export interface PreClipResult {
  name: string;
  batchUuid: string;
}

export async function checkPreAIClip() {
  return mockSuccess(mockPreClipResults);
}

export async function genAIClip(prompt: string, preParams: PreClipResult) {
  // const res = await request<Resource>("/auto_clip/ai_clip_generate", {
  //   method: "POST",
  //   data: {
  //     prompt,
  //     prehandleElement: preParams,
  //   },
  // });
  // return formatResourceData(res);
  return mockSuccess(mockRandomClipResult);
}
