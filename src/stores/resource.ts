import type { Resource } from "@/types/resource";
import { defineStore } from "pinia";
import { ResourceFactory } from "@/utils/resource";
import type { TrackType } from "@/types/track";
import { readFileFromOPFS } from "@/utils/file";

export const useResourceState = defineStore("resource", () => {
  // 统一资源列表
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
  const createResource = async (file: File): Promise<Resource> => {
    try {
      const resource = await ResourceFactory.createFromFile(file);
      resources.value.push(resource);

      // 注册URL管理
      const urls: string[] = [];
      if ("url" in resource && resource.url) {
        urls.push(resource.url);
      }
      if ("cover" in resource && resource.cover) {
        urls.push(resource.cover);
      }
      return resource;
    } catch (error) {
      // 内联错误处理
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
      const file = await readFileFromOPFS(r.id, r.url);
      const buffer = await file.arrayBuffer();
      r.url = file
        ? URL.createObjectURL(new Blob([buffer], { type: r.type }))
        : r.url;
    }
    resources.value.splice(0, resources.value.length, ...resourceList);
  };

  /**
   * 清空所有资源
   */
  const clearAllResources = () => {
    // 清理所有URL
    resources.value.splice(0, resources.value.length);
  };

  /**
   * 搜索资源
   */
  const searchResources = (query: string): Resource[] => {
    if (!query.trim()) {
      return resources.value;
    }

    const lowerQuery = query.toLowerCase();
    return resources.value.filter(
      (resource) =>
        resource.name.toLowerCase().includes(lowerQuery) ||
        (resource.type === "text" &&
          resource.content.toLowerCase().includes(lowerQuery))
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
    clearAllResources,
    searchResources,
    getResourceStats,
  };
});
