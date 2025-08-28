import { defineStore } from "pinia";
import { useTrackState } from "./track";
import { useResourceState } from "./resource";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
import { Combinator, ImgClip, OffscreenSprite } from "@webav/av-cliper";
import { AudioTrack } from "@/class/AudioTrack";
import { usePlayerState } from "./player";
import { Resource } from "@/types/resource";
import { Track, TrackLineItem } from "@/types/track";
import { baseFps } from "@/data/track";
import { createFileWriter, selectFile } from "@/utils/file";
import { useDrawStore } from "./draw";
import { ResourceFactory } from "@/utils/resource";
import { nanoid } from "nanoid";

// 项目数据接口
interface ProjectData {
  id?: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  drawData?: any[];
  resources: Resource[];
  trackData: TrackLineItem[];
  version: string;
}

export const useProjectState = defineStore(
  "project",
  () => {
    const route = useRoute();
    const trackStore = useTrackState();
    const playerStore = usePlayerState();
    const drawStore = useDrawStore();
    const resourceStore = useResourceState();

    const lastSaveTime = ref<string>();
    const project = ref<ProjectData | null>(null);
    const projectList = ref<ProjectData[]>([]);

    /**
     * 保存项目到projectList
     */
    const saveProject = async () => {
      if (!project.value) {
        return;
      }

      try {
        const projectData: ProjectData = {
          ...project.value,
          updatedAt: new Date().toISOString(),
          resources: resourceStore.resources,
          trackData: trackStore.trackList,
          drawData:
            route.path === "/draw" ? await drawStore.saveDrawData() : [],
        };

        // 更新projectList中的项目
        const index = projectList.value.findIndex(
          (p) => p.id === projectData.id
        );
        if (index >= 0) {
          projectList.value[index] = projectData;
        } else {
          projectList.value.push(projectData);
        }

        // 更新当前项目
        project.value = projectData;
        lastSaveTime.value = new Date().toLocaleString();
        ElMessage.success("项目已保存");
      } catch (error) {
        console.error("Save project error:", error);
        ElMessage.error("项目保存失败");
      }
    };

    /**
     * 加载项目数据
     */
    const loadProject = async (projectData: ProjectData) => {
      const loading = ElLoading.service({ text: "正在加载项目" });

      try {
        project.value = projectData;

        // 加载资源
        await resourceStore.loadResources(projectData.resources || []);

        // 加载轨道数据
        await trackStore.loadTrackData(projectData.trackData || []);

        // 加载画板数据
        await drawStore.initContent(projectData.drawData || []);

        console.log("Loaded project", project.value);
      } catch (error) {
        console.error("Load project error:", error);
        ElMessage.error("项目加载失败");
      } finally {
        loading.close();
      }
    };

    /**
     * 创建新项目
     */
    const createProject = (params: {
      name: string;
      description?: string;
    }): ProjectData => {
      const newProject: ProjectData = {
        id: nanoid(),
        name: params.name,
        description: params.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        resources: [],
        trackData: [],
        version: "1.0.0",
      };

      project.value = newProject;
      projectList.value.push(newProject);
      return newProject;
    };

    /**
     * 更新项目信息
     */
    const updateProject = (
      projectId: string,
      updates: Partial<ProjectData>
    ) => {
      try {
        // 更新projectList中的项目
        const index = projectList.value.findIndex((p) => p.id === projectId);
        if (index >= 0) {
          const updatedProject = {
            ...projectList.value[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          };
          projectList.value[index] = updatedProject;

          // 如果更新的是当前项目，也要更新当前项目状态
          if (project.value?.id === projectId) {
            project.value = updatedProject;
          }

          ElMessage.success("项目信息已更新");
          return updatedProject;
        } else {
          ElMessage.error("项目不存在");
          return null;
        }
      } catch (error) {
        console.error("Update project error:", error);
        ElMessage.error("更新项目失败");
        return null;
      }
    };

    /**
     * 删除项目
     */
    const deleteProject = (projectId: string) => {
      try {
        const index = projectList.value.findIndex((p) => p.id === projectId);
        if (index >= 0) {
          projectList.value.splice(index, 1);
          ElMessage.success("项目已删除");
        } else {
          ElMessage.error("项目不存在");
        }
      } catch (error) {
        console.error("Delete project error:", error);
        ElMessage.error("删除项目失败");
      }
    };

    /**
     * 导出视频（保持原有功能）
     */
    const exportVideo = async () => {
      const loading = ElLoading.service({ text: "正在合成视频" });
      try {
        const start = performance.now();
        const subSprs: Promise<OffscreenSprite>[] = [];
        const sprs: Promise<OffscreenSprite>[] = [];

        // 使用OffscreenSprite和Combinator进行视频合成
        for (const track of trackStore.trackList.reduce(
          (res, { list }) => res.concat(list),
          [] as Track[]
        )) {
          if (track instanceof AudioTrack) {
            sprs.push(track.combine("audio"));
            if (track.drawSub) {
              subSprs.push(track.combine("subtitle"));
            }
          } else {
            sprs.push(
              track.combine(
                playerStore.playerWidth,
                playerStore.playerHeight,
                playerStore.outputRadio
              )
            );
          }
        }

        sprs.unshift(...subSprs);
        const sprites = await Promise.all(sprs);
        console.log("生成sprite耗时", performance.now() - start, "ms");

        // 添加水印
        const watermark = new OffscreenSprite(
          new ImgClip({
            type: "image/gif",
            stream: (await fetch("/magicmaker.gif")).body!,
          })
        );
        watermark.time = {
          offset: 0,
          duration: (trackStore.frameCount / baseFps) * 1e6,
        };
        watermark.zIndex = 1000;
        sprites.unshift(watermark);

        const com = new Combinator({
          width: playerStore.playerWidth,
          height: playerStore.playerHeight,
          bgColor: "black",
          fps: baseFps,
        });

        await Promise.all(
          sprites.map((sprite, index) => {
            sprite.zIndex = 999 - index;
            return com.addSprite(sprite);
          })
        );

        com.addSprite(watermark);

        console.log("合成耗时", performance.now() - start, "ms");

        await com
          .output()
          .pipeTo(
            await createFileWriter(`Video-${new Date().toLocaleString()}.mp4`)
          );

        ElMessage.success("合成视频成功");

        console.log("导出文件耗时", performance.now() - start, "ms");
      } finally {
        loading.close();
      }
    };

    // 导入本地项目文件
    const importProject = async () => {
      const file = await selectFile({ accept: ".json" });
      const text = await file?.[0]?.text();
      try {
        const importedProject = JSON.parse(text) as ProjectData;
        importedProject.id = nanoid();
        projectList.value.unshift(importedProject);
        if (importedProject && importedProject.id) {
          await loadProject(importedProject);
          ElMessage.success("项目导入成功");
        } else {
          ElMessage.error("无效的项目文件");
        }
      } catch (error) {
        console.error("Import project error:", error);
        ElMessage.error("项目导入失败");
      }
    };

    // 导出项目为文件
    const exportProject = async (project: ProjectData) => {
      if (!project) {
        ElMessage.error("当前无项目可导出");
        return;
      }
      try {
        const writer = await createFileWriter(
          `${project.name || "Project"}-${new Date().toLocaleString()}.json`
        );
        await writer.write(JSON.stringify(project, null, 2));
        await writer.close();
        ElMessage.success("项目导出成功");
      } catch (error) {
        console.error("Export project error:", error);
        ElMessage.error("项目导出失败");
      }
    };

    const init = async () => {
      if (project.value) {
        loadProject(project.value);
      } else if (projectList.value.length > 0) {
        loadProject(projectList.value[0]);
      }
    };

    return {
      // 状态
      project,
      projectList,
      lastSaveTime,

      // 方法
      init,
      loadProject,
      updateProject,
      saveProject,
      createProject,
      deleteProject,
      exportVideo,
      importProject,
      exportProject,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["projectList", "project", "lastSaveTime"],
    },
  }
);
