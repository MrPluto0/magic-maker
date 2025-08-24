import { Resource } from "@/types/resource";
import { defineStore } from "pinia";
import { FileParser, FileParseError } from "@/utils/file";
import { TrackType } from "@/types/track";

export const useResourceState = defineStore(
  "resource",
  () => {
    // 统一资源列表
    const resources = ref<Resource[]>([]);

    /**
     * 按类型获取资源
     */
    const getResourcesByType = (type: TrackType) => {
      return computed(() => resources.value.filter((r) => r.type === type));
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
        const resource = await FileParser.createFromFile(file);
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
        if (error instanceof FileParseError) {
          ElMessage.error(`文件解析失败: ${error.message}`);
        } else {
          ElMessage.error(`不支持的文件格式: ${file.name}`);
        }
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
        console.warn(`Resource ${resource.id} already exists`);
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
        const resource = resources.value[index];

        resources.value.splice(index, 1);

        ElMessage.success("资源已删除");
      }
    };

    /**
     * 批量添加文件
     */
    const addResourcesFromFiles = async (
      files: File[],
      onProgress?: (completed: number, total: number) => void
    ): Promise<Resource[]> => {
      const addedResources: Resource[] = [];

      for (const file of files) {
        try {
          const resource = await createResource(file);
          addedResources.push(resource);
          onProgress?.(addedResources.length, files.length);
        } catch (error) {
          console.error(
            `Failed to add resource from file ${file.name}:`,
            error
          );
          onProgress?.(addedResources.length + 1, files.length);
          // 继续处理其他文件，不中断整个批处理
        }
      }

      return addedResources;
    };

    /**
     * 加载资源列表（用于项目加载）
     */
    const loadResources = (resourceList: Resource[]) => {
      resources.value.splice(0, resources.value.length, ...resourceList);
    };

    /**
     * 获取所有资源
     */
    const getAllResources = (): Resource[] => {
      return [...resources.value];
    };

    /**
     * 清空所有资源
     */
    const clearAllResources = () => {
      // 清理所有URL
      resources.value.splice(0, resources.value.length);
    };

    /**
     * 复制资源
     */
    const duplicateResource = async (
      resourceId: string
    ): Promise<Resource | null> => {
      const original = getResourceById(resourceId);
      if (!original) {
        ElMessage.error("原始资源不存在");
        return null;
      }

      try {
        const duplicated = await FileParser.duplicateResource(original);
        resources.value.push(duplicated);
        return duplicated;
      } catch (error) {
        console.error("Duplicate resource error:", error);
        ElMessage.error("复制资源失败");
        return null;
      }
    };

    /**
     * 搜索资源
     */
    const searchResources = (query: string): Resource[] => {
      if (!query.trim()) {
        return getAllResources();
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
      resources: readonly(resources),

      // 资源操作
      getResourcesByType,
      getResourceById,
      createResource,
      addResourcesFromFiles,
      addResource,
      removeResource,
      loadResources,
      getAllResources,
      clearAllResources,
      duplicateResource,
      searchResources,
      getResourceStats,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["resources"],
    },
  }
);
