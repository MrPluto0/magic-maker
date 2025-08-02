// import { request } from "./base";
// import { IUploadFile } from "./generate";
// import { IProject } from "@/types/project";
// import { Workflow } from "@/types/workflow";
import { IUploadFile } from "./generate";
import { IProject } from "@/types/project";
import { Workflow } from "@/types/workflow";
import {
  mockWorkflow,
  mockWorkflowList,
  mockTaskInfo,
  mockProject,
  mockProjectList,
  mockGenerateVideoResult
} from "@/mock/mockData";
import { mockSuccess, mockPagination } from "@/mock/mockUtils";

export async function analyzeVideo(file: IUploadFile) {
  // const res = await request<Workflow>("/auto_clip/analyze_video", {
  //   method: "POST",
  //   data: {
  //     videoPath: file?.path,
  //     videoUrl: file.url,
  //   },
  // });
  // return res;
  return mockSuccess(mockWorkflow);
}

export async function completeAnalyzeVideo(
  videoUrl: string,
  videoPath: string,
  data: Workflow
) {
  // const res = await request<Workflow>("/workflow/complete_analyze_video", {
  //   method: "POST",
  //   data: {
  //     videoPath,
  //     videoUrl,
  //     ...data,
  //   },
  // });
  // return res;
  return mockSuccess({ ...mockWorkflow, ...data });
}

export async function getWorkflowList(page: number, pageSize: number) {
  const paginatedData = mockPagination(mockWorkflowList.records, page, pageSize);
  return mockSuccess({
    records: paginatedData.records,
    total: paginatedData.total
  });
}

export async function getWorkflow(workflowId: number) {
  return mockSuccess(mockWorkflow);
}

export async function saveWorkFlow(data: any) {
  return mockSuccess({ success: true, message: "工作流保存成功" });
}

export async function generateVideo(data: any) {
  return mockSuccess(mockGenerateVideoResult);
}

export async function getTaskInfo(taskId: string) {
  return mockSuccess(mockTaskInfo);
}

export async function createProject(data: any) {
  return mockSuccess({ ...mockProject, ...data, id: Date.now() });
}

export async function getProjects(page: number, pageSize: number) {
  const paginatedData = mockPagination(mockProjectList.records, page, pageSize);
  return mockSuccess({
    records: paginatedData.records,
    total: paginatedData.total
  });
}

export async function getProjectInfo(projectId: number) {
  return mockSuccess(mockProject);
}

export async function updateProject(project: Partial<IProject>) {
  return mockSuccess({ ...mockProject, ...project });
}

export async function deleteProject(projectId: number) {
  return mockSuccess({ success: true, message: "项目删除成功" });
}
