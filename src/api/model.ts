// import { TrainModel } from "@/types/model";
// import { request } from "./base";
import { TrainModel } from "@/types/model";
import {
  mockTrainModels,
  mockTrainProcess,
  mockGenByModelResult
} from "@/mock/mockData";
import { mockSuccess } from "@/mock/mockUtils";

export interface IUploadDataset {
  file: File;
  modelName: string;
  trigger: string;
}

export async function uploadDataset(data: IUploadDataset) {
  // const formData = new FormData();
  // formData.append("file", data.file);

  // return request<TrainModel>("/model_engine/upload_dateset", {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   method: "POST",
  //   data: formData,
  //   params: {
  //     modelName: data.modelName,
  //     trigger: data.trigger,
  //     autoCaption: true,
  //   },
  // });
  return mockSuccess({
    ...mockTrainModels[0],
    modelName: data.modelName,
    trainParam: {
      ...mockTrainModels[0].trainParam,
      conceptSentence: data.trigger
    }
  });
}

export async function trainModel(data: TrainModel) {
  return mockSuccess({ success: true, message: "模型训练已开始" });
}

export async function getTrainProcess(data: TrainModel) {
  return mockSuccess(mockTrainProcess);
}

export async function getTrainModels(saveFlag: 0 | 1) {
  return mockSuccess(mockTrainModels);
}

export interface IGenByModel {
  modelUuid: string;
  domain: string;
  prompt: string;
  trigger: string;
}

export async function genByModel(data: IGenByModel) {
  return mockSuccess(mockGenByModelResult);
}

export async function saveModel(data: TrainModel) {
  return mockSuccess({ success: true, message: "模型保存成功" });
}
