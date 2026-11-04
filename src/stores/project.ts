import { Combinator, ImgClip, OffscreenSprite } from "@webav/av-cliper";
import { ElLoading } from "element-plus";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { AudioTrack } from "@/class/AudioTrack";
import { baseFps } from "@/data/track";
import {
	type ProjectRecord,
	repoDeleteProject,
	repoGetCurrentProjectId,
	repoIncrExportCount,
	repoLoadProjects,
	repoSaveProject,
} from "@/db/projectRepo";
import type { SubtitleSegment } from "@/stores/subtitle";
import type { Resource } from "@/types/resource";
import type { Track, TrackLineItem } from "@/types/track";
import { createFileWriter, selectFile } from "@/utils/file";
import { usePlayerState } from "./player";
import { useResourceState } from "./resource";
import { useTrackState } from "./track";

// 项目数据接口（持久化到 IndexedDB，不再进 localStorage）
export type ProjectData = ProjectRecord;

export const useProjectState = defineStore("project", () => {
	const trackStore = useTrackState();
	const playerStore = usePlayerState();
	const resourceStore = useResourceState();

	const lastSaveTime = ref<string>();
	const project = ref<ProjectData | null>(null);
	const projectList = ref<ProjectData[]>([]);

	/**
	 * IDB hydrate 完成信号：路由守卫与首屏渲染需等待它，
	 * 避免 hydrate 前误判“未选项目”（重构方案风险 R6）。
	 */
	let resolveReady: () => void = () => {};
	const ready = new Promise<void>((resolve) => {
		resolveReady = resolve;
	});

	/**
	 * 将项目写入 IndexedDB
	 */
	const persistProject = async (projectData: ProjectData) => {
		try {
			await repoSaveProject(projectData);
		} catch (error) {
			console.error("Persist project to IDB error:", error);
			ElMessage.error("项目写入本地数据库失败");
		}
	};

	/**
	 * 保存项目到projectList
	 */
	const saveProject = async () => {
		if (!project.value) {
			return;
		}

		// 字幕段 + 全局样式的可序列化快照（subtitle store 延迟 import，避免 store 循环）
		const subtitleSnapshot = async () => {
			const { useSubtitleState } = await import("./subtitle");
			const ss = useSubtitleState();
			return {
				segments: JSON.parse(JSON.stringify(ss.segments)) as SubtitleSegment[],
				style: { ...ss.style },
			};
		};

		try {
			const projectData: ProjectData = {
				...project.value,
				updatedAt: new Date().toISOString(),
				resources: resourceStore.resources,
				trackData: trackStore.trackList,
				// 字幕段 + 全局样式（W6）：唯一事实源随项目 JSON 落库，
				// 时间轴上的字幕行 TextTrack 只是视图（加载后由 diff 同步重建）
				subtitles: await subtitleSnapshot(),
			};

			const index = projectList.value.findIndex((p) => p.id === projectData.id);
			if (index >= 0) {
				projectList.value[index] = projectData;
			} else {
				projectList.value.push(projectData);
			}

			// 更新当前项目
			project.value = projectData;
			await persistProject(projectData);
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

			// 恢复字幕段 + 全局样式（W6）：segment 是唯一事实源，
			// 字幕行 TextTrack 若在 trackData 里已有则被 diff 同步对齐，缺则补建
			const { useSubtitleState, DEFAULT_SUBTITLE_STYLE } = await import(
				"./subtitle"
			);
			const ss = useSubtitleState();
			ss.setSegments(projectData.subtitles?.segments ?? []);
			ss.setStyle(projectData.subtitles?.style ?? DEFAULT_SUBTITLE_STYLE);

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
		projectList.value.unshift(newProject);
		persistProject(newProject);
		// 新项目从空字幕开始（清掉上一个项目残留的段落，避免旧字幕落新时间轴）
		import("./subtitle").then(({ useSubtitleState }) => {
			useSubtitleState().setSegments([]);
		});
		return newProject;
	};

	/**
	 * 更新项目信息
	 */
	const updateProject = (projectId: string, updates: Partial<ProjectData>) => {
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

				persistProject(updatedProject);
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
	 * 删除项目（同步删除 IndexedDB 记录）
	 */
	const deleteProject = async (projectId: string) => {
		try {
			const index = projectList.value.findIndex((p) => p.id === projectId);
			if (index >= 0) {
				projectList.value.splice(index, 1);
				if (project.value?.id === projectId) {
					project.value = null;
				}
				await repoDeleteProject(projectId);
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
				[] as Track[],
			)) {
				if (track instanceof AudioTrack) {
					sprs.push(track.combine());
					// if (track.drawSub) {
					//   subSprs.push(track.combine("subtitle"));
					// }
				} else {
					sprs.push(
						track.combine(
							playerStore.playerWidth,
							playerStore.playerHeight,
							playerStore.outputRadio,
						),
					);
				}
			}

			sprs.unshift(...subSprs);
			const sprites = await Promise.all(sprs);
			console.log("生成sprite耗时", performance.now() - start, "ms");

			// 添加水印
			const watermark = new OffscreenSprite(
				new ImgClip({
					type: "image/png",
					stream: (await fetch("/logo.png")).body!,
				}),
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
				}),
			);

			// 水印已通过 sprites.unshift 加入，这里不能再 addSprite 一次（双加 bug）

			console.log("合成耗时", performance.now() - start, "ms");

			await com
				.output()
				.pipeTo(
					await createFileWriter(`Video-${new Date().toLocaleString()}.mp4`),
				);

			// 导出成功后计数（供用量面板聚合展示）
			await repoIncrExportCount().catch(() => {});
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
				await repoSaveProject(importedProject);
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
				`${project.name || "Project"}-${new Date().toLocaleString()}.json`,
			);
			await writer.write(JSON.stringify(project, null, 2));
			await writer.close();
			ElMessage.success("项目导出成功");
		} catch (error) {
			console.error("Export project error:", error);
			ElMessage.error("项目导出失败");
		}
	};

	/**
	 * 启动时从 IndexedDB hydrate：
	 * 恢复项目列表与“当前项目”，随后放行 ready。
	 */
	const init = async () => {
		try {
			projectList.value = await repoLoadProjects();
			const currentId = await repoGetCurrentProjectId();
			const current =
				projectList.value.find((p) => p.id === currentId) ||
				projectList.value[0];
			if (current) {
				await loadProject(current);
			}
		} catch (error) {
			console.error("Hydrate projects from IDB error:", error);
			ElMessage.error("本地项目数据加载失败");
		} finally {
			resolveReady();
		}
	};

	return {
		// 状态
		project,
		projectList,
		lastSaveTime,
		ready,

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
});
