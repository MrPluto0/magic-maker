/**
 * 项目仓储层：对 IndexedDB 项目持久化的高层封装。
 * project store 通过本模块读写项目，localStorage 不再承载项目大对象。
 */
import type { IProject } from "@/types/project";
import {
  deleteProjectRecord,
  getMeta,
  loadProjects,
  saveProjectRecord,
  setMeta,
} from "./idb";

/** meta store 中记录“当前选中项目 id”的键 */
const CURRENT_PROJECT_KEY = "currentProjectId";
/** meta store 中记录导出次数的键 */
const EXPORT_COUNT_KEY = "exportCount";

/** 项目记录即 IProject（id 必填后落库） */
export type ProjectRecord = IProject & { id: string };

export async function repoLoadProjects(): Promise<ProjectRecord[]> {
  const list = await loadProjects<ProjectRecord>();
  // 按 updatedAt 倒序，最近编辑的在前
  return list.sort((a, b) =>
    (b.updatedAt || "").localeCompare(a.updatedAt || "")
  );
}

export async function repoSaveProject(
  project: ProjectRecord
): Promise<ProjectRecord> {
  // 1) 项目状态含 Vue 响应式代理与类实例，structured clone 不支持，先做 JSON 净化；
  // 2) 运行期 blob: url 不落库（单一事实源是 OPFS key），加载时经 loadResources 重建
  const plain = JSON.parse(JSON.stringify(project), (key, value) => {
    if (
      (key === "url" || key === "cover") &&
      typeof value === "string" &&
      value.startsWith("blob:")
    ) {
      return "";
    }
    return value;
  }) as ProjectRecord;
  await saveProjectRecord(plain);
  await setMeta(CURRENT_PROJECT_KEY, plain.id);
  return plain;
}

export async function repoDeleteProject(id: string): Promise<void> {
  await deleteProjectRecord(id);
  const currentId = await repoGetCurrentProjectId();
  if (currentId === id) {
    await setMeta(CURRENT_PROJECT_KEY, undefined);
  }
}

export async function repoGetCurrentProjectId(): Promise<string | undefined> {
  return getMeta<string>(CURRENT_PROJECT_KEY);
}

export async function repoGetExportCount(): Promise<number> {
  return (await getMeta<number>(EXPORT_COUNT_KEY)) || 0;
}

export async function repoIncrExportCount(): Promise<number> {
  const next = (await repoGetExportCount()) + 1;
  await setMeta(EXPORT_COUNT_KEY, next);
  return next;
}
