// import { Material } from "@/types/draw";
// import { request } from "./base";
import { Material } from "@/types/draw";
import {
  mockCategoryList,
  mockMaterialList,
  mockProductBoard,
  mockStoryBoard
} from "@/mock/mockData";
import { mockSuccess, mockPagination } from "@/mock/mockUtils";

export interface IPage {
  page: number;
  pageSize: number;
  total: number;
  category?: string; //template_psd
  content?: string;
}

export function getCategoryList(params: IPage) {
  return mockSuccess(mockCategoryList);
}

export function getMaterialList(params: IPage) {
  const paginatedData = mockPagination(mockMaterialList.records, params.page, params.pageSize);
  return mockSuccess({
    records: paginatedData.records,
    total: paginatedData.total
  });
}

export interface IProductBoard {
  productName: string;
  style: string;
  keyword: string;
}

export function generateProductBoard(file: File, product: IProductBoard) {
  // const data = new FormData();
  // data.append("zip_file", file);
  // data.append("style", product.style);
  // data.append("product_name", product.productName);
  // data.append("keyword", product.keyword);

  // return request<any[]>("/board/generate_productboard", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   data,
  // });
  return mockSuccess(mockProductBoard);
}

export function generateStoryBoard(data: any) {
  // return request<{ prompt: string; url: string; basicInfo: any }[]>(
  //   "/board/generate_storyboard",
  //   {
  //     method: "POST",
  //     data,
  //   }
  // );
  return mockSuccess(mockStoryBoard);
  // return [
  //   {
  //     prompt: "全景 , 自然光 , 劳力士手表整体 , 时尚展示台 , 现代时尚氛围",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215621_00001_.png",
  //   },
  //   {
  //     prompt: "大特写 , 柔光 , 手表表盘细节 , 简约背景 , 精致设计感",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215650_00001_.png",
  //   },
  //   {
  //     prompt: "中景 , 侧光 , 手表与模特手腕 , 室内时尚环境 , 佩戴展示感",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215718_00001_.png",
  //   },
  //   {
  //     prompt: "特写 , 聚光 , 手表表链细节 , 暗调背景 , 质感突出氛围",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215747_00001_.png",
  //   },
  //   {
  //     prompt: "近景 , 软光 , 手表侧面视角 , 简洁展示板 , 立体感表现",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215816_00001_.png",
  //   },
  //   {
  //     prompt: "远景 , 环境光 , 模特佩戴手表行走 , 都市街头背景 , 都市生活氛围",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215844_00001_.png",
  //   },
  //   {
  //     prompt: "中景 , 逆光 , 手表正面全貌 , 室内简约场景 , 高雅品质感",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215917_00001_.png",
  //   },
  //   {
  //     prompt:
  //       "全景 , 落日余晖 , 手表陈列与时尚配饰 , 精致展示空间 , 高端时尚品味",
  //     url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/models/iclight/generate_bg/generate_bg-20241227-215950_00001_.png",
  //   },
  // ];
}
