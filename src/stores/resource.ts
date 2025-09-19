import type { Resource } from "@/types/resource";
import { defineStore } from "pinia";
import type { TrackType } from "@/types/track";
import { readUrlFromOPFS } from "@/utils/file";
import { ResourceFactory } from "@/class/ResourceFactory";

export const useResourceState = defineStore("resource", () => {
  const resources = ref<Resource[]>([]);

  /**
   * 按类型获取资源
   */
  const getResourcesByType = (type: TrackType) => {
    return resources.value.filter((r) => r.type === type);
  };

  /**
   * 根据ID获取资源
   */
  const getResourceById = (id: string): Resource | undefined => {
    return resources.value.find((r) => r.id === id);
  };

  /**
   * 添加资源（从文件）
   */
  const createResource = async (
    file: File,
    meta?: Record<string, any>
  ): Promise<Resource> => {
    try {
      const resource = await ResourceFactory.createFromFile(file);
      resource.meta = meta;
      resources.value.push(resource);
      return resource;
    } catch (error) {
      console.error("File parse error:", error);
      throw error;
    }
  };

  /**
   * 添加资源（直接添加Resource对象）
   */
  const addResource = (resource: Resource) => {
    // 检查是否已存在
    const existing = resources.value.find((r) => r.id === resource.id);
    if (existing) {
      console.warn(`资源 ${resource.id} 已存在`);
      return;
    }

    resources.value.push(resource);
  };

  /**
   * 移除资源
   */
  const removeResource = (id: string) => {
    const index = resources.value.findIndex((r) => r.id === id);
    if (index > -1) {
      resources.value.splice(index, 1);
      ElMessage.success("资源已删除");
    }
  };

  /**
   * 加载资源列表（用于项目加载）
   */
  const loadResources = async (resourceList: Resource[]) => {
    for (const r of resourceList) {
      if (r.url) {
        r.url = await readUrlFromOPFS(r.id, r.url, r.type);
      }
      if (r.type === "video" && r.cover) {
        r.cover = await readUrlFromOPFS(r.id + "_cover", r.cover, "image/jpeg");
      }
    }
    resources.value.splice(0, resources.value.length, ...resourceList);
  };

  /**
   * 搜索资源
   */
  const searchResources = (query: string): Resource[] => {
    if (!query.trim()) {
      return resources.value;
    }

    const lowerQuery = query.toLowerCase();
    return resources.value.filter((resource) =>
      resource.name.toLowerCase().includes(lowerQuery)
    );
  };

  /**
   * 获取资源统计信息
   */
  const getResourceStats = () => {
    const stats = {
      total: resources.value.length,
      text: 0,
      image: 0,
      audio: 0,
      video: 0,
    };

    resources.value.forEach((resource) => {
      stats[resource.type]++;
    });

    return stats;
  };

  return {
    // 核心状态
    resources,

    // 资源操作
    getResourcesByType,
    getResourceById,
    createResource,
    addResource,
    removeResource,
    loadResources,
    searchResources,
    getResourceStats,
  };
});
