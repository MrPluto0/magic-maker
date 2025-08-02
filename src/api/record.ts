// import { request } from "./base";
import { mockRecords } from "@/mock/mockData";
import { mockSuccess, mockPagination } from "@/mock/mockUtils";

export interface IPagination {
  page: number;
  pageSize: number;
  sortBy: "size" | "created_at";
  sort: "asc" | "desc";
  type: string;
  // type: "video" | "image" | "music" | "text" | "custom";
}

export async function getRecords(page: IPagination) {
  // 重命名
  if (page.type === "audio") {
    page.type = "music";
  }
  // return request<any>("/record/get_records", { params: page });
  const paginatedData = mockPagination(mockRecords.records, page.page, page.pageSize);
  return mockSuccess({
    records: paginatedData.records,
    total: paginatedData.total
  });
}

export async function delRecord(recordId: number) {
  return mockSuccess({ success: true, message: "记录删除成功" });
}
