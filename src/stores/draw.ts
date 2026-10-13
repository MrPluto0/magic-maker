import { convertToExcalidrawElements } from "@pkg/excalidraw";
import type {
	ExcalidrawElement,
	ExcalidrawImageElement,
} from "@pkg/excalidraw/types/element/types";
import type {
	AppState,
	BinaryFiles,
	ExcalidrawImperativeAPI,
} from "@pkg/excalidraw/types/types";
import { nanoid } from "nanoid";
import { write } from "opfs-tools";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Material } from "@/types/draw";
import { cropShape } from "@/utils/cropper";
import {
	base64ToBlob,
	blobToBase64,
	fetchToBase64,
	readBase64FromOPFS,
} from "@/utils/file";
import { updateFontFamily, updateTextProps } from "@/utils/psd";
import { usePageState } from "./page";

/** 画板图片在 OPFS 中的 key 前缀（customData.url 单一事实源） */
const OPFS_DRAW_PREFIX = "draw_";

/** 判断 customData.url 是否为 OPFS key（无协议前缀即视为 key） */
const isOpfsKey = (url?: string | null): url is string =>
	!!url && !/^(https?|blob|data):/i.test(url);

export const useDrawStore = defineStore("draw", () => {
	const loading = ref(false);
	const api = ref<ExcalidrawImperativeAPI>();
	const state = ref<Partial<AppState>>({
		theme: "dark",
		exportWithDarkMode: true,
	});
	const eles = ref<ExcalidrawElement[]>([]);
	const files = ref<BinaryFiles>({});
	const dragInfo = ref<Material>();
	const pageStore = usePageState();

	const getPositions = () => {
		const eles = api.value.getSceneElements().filter((e) => !e.isDeleted);
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity;
		eles.forEach((e) => {
			minX = Math.min(minX, e.x);
			minY = Math.min(minY, e.y);
			maxX = Math.max(maxX, e.x + e.width);
			maxY = Math.max(maxY, e.y + e.height);
		});
		if (minX === Infinity) {
			minX = 0;
			minY = 0;
			maxX = 0;
			maxY = 0;
		}
		return { minX, minY, maxX, maxY };
	};

	const getSelected = () => {
		const eles = api.value.getSceneElements();
		const state: AppState = api.value.getAppState();
		const eleIds = Object.keys(state.selectedElementIds);
		return eles.find((e) => e.id === eleIds[0]);
	};

	const addMaterial = async (material: Material) => {
		const fileId = nanoid();
		const state: AppState = api.value.getAppState();
		const newEles = convertToExcalidrawElements([
			{
				width: material.width,
				height: material.height,
				type: "image",
				x: state.width / 2 - material.width / 2,
				y: state.height / 2 - material.height / 2,
				//@ts-expect-error
				fileId,
				customData: {
					url: material.url,
				},
			},
		]);
		const base64 = await fetchToBase64(material.url);
		const newFile: any[] = [
			{
				id: fileId,
				dataURL: base64,
				mimeType: "image/png",
			},
		];
		updateContent(newEles, newFile);
	};

	const addTemplate = async (meta: any[]) => {
		// 构建文件
		const files = [];
		for (let i = 0; i < meta.length; i++) {
			const item = meta[i];
			if (item.type === "image" && item.url) {
				const base64 = await fetchToBase64(item.url);
				files.push({
					id: item.fileId,
					mimeType: "image/png",
					dataURL: base64,
				});
				item.customData = {
					url: item.url,
				};
			}
		}
		// 构建excalidraw结构
		meta = updateFontFamily(meta);
		let newEles = convertToExcalidrawElements(meta.reverse());
		newEles = updateTextProps(newEles, meta);
		updateContent(newEles, files);
	};

	const addStory = async (data: { prompt: string; url: string }[]) => {
		const positions = getPositions();
		let startX = positions.minX;
		let startY = positions.maxY + 100;
		const imgWidth = 700;
		const imgHeight = 700;
		const textWidth = 700;
		const textHeight = 120;
		const meta: any[] = [];
		const files: any[] = [];
		const groupIds = [nanoid()];
		for (let i = 0; i < data.length; i++) {
			const { prompt, url } = data[i];
			const fileId = nanoid();
			const base64 = await fetchToBase64(url);
			meta.push({
				type: "image",
				width: imgWidth,
				height: imgHeight,
				x: startX,
				y: startY,
				fileId,
				groupIds,
				customData: {
					prompt,
					url,
				},
			});
			meta.push({
				type: "rectangle",
				strokeColor: "transparent",
				x: startX,
				y: startY + imgHeight + 50, // 50是文字区域与上方图片的间隔
				width: textWidth,
				height: textHeight,
				groupIds,
				backgroundColor: "#e9ecef",
				roundness: {
					type: 3,
				},
				label: {
					textAlign: "center",
					text: prompt,
					fontSize: 30,
					strokeColor: "rgb(0,0,0)",
					fontFamily: 2,
				},
			});
			files.push({
				id: fileId,
				mimeType: "image/png",
				dataURL: base64,
			});
			// 100是相邻板块区域的间隔
			if (i === 3) {
				startX = positions.minX;
				startY += imgHeight + 50 + textHeight + 50;
			} else {
				startX += imgWidth + 100;
			}
		}
		const elements = convertToExcalidrawElements(meta);
		updateContent(elements, files);
	};

	const replaceFile = async (url: string, ele: ExcalidrawImageElement) => {
		let base64 = await fetchToBase64(url);
		const eles = api.value.getSceneElements();
		const newFileId = nanoid();
		const newEles = eles.filter((e) => e.id !== ele.id);

		// 添加图片，删除形状元素
		const newEle = convertToExcalidrawElements([
			{
				width: ele.width,
				height: ele.height,
				type: "image",
				x: ele.x,
				y: ele.y,
				//@ts-expect-error
				fileId: newFileId,
				customData: {
					url,
				},
			},
		]);
		newEles.push(...newEle);
		// 根据形状裁剪
		base64 = await cropShape({
			base64: base64,
			shape: ele.type,
			width: ele.width,
			height: ele.height,
		});

		const newFile = {
			id: newFileId,
			dataURL: base64,
			mimeType: "image/png",
		};
		api.value.updateScene({ elements: newEles });
		// @ts-expect-error
		api.value.addFiles([newFile]);
	};

	const saveDrawData = async () => {
		if (!api.value) {
			return eles.value;
		}
		const curEles = api.value.getSceneElements();
		const curFiles = api.value.getFiles();
		for (const ele of curEles) {
			if (ele.type !== "image" || !ele.fileId) {
				continue;
			}
			const url = (ele?.customData as any)?.url as string | undefined;
			// 已持久化（OPFS key）或外部 http(s)/data 地址，无需处理
			if (
				!url ||
				isOpfsKey(url) ||
				/^https?:/i.test(url) ||
				/^data:/i.test(url)
			) {
				continue;
			}
			// blob: 临时地址（手绘/裁剪/导入产生的图片）：二进制落 OPFS，customData.url 记 OPFS key
			const file = curFiles[ele.fileId];
			if (!file?.dataURL) {
				continue;
			}
			const blob = base64ToBlob(file.dataURL, file.mimeType);
			const opfsKey = `${OPFS_DRAW_PREFIX}${ele.fileId}`;
			try {
				await write(opfsKey, await blob.arrayBuffer());
			} catch (error) {
				console.error("画板图片写入 OPFS 失败:", opfsKey, error);
				continue;
			}
			//@ts-expect-error Excalidraw 元素 customData 为只读声明，此处需要回写持久化 key
			ele.customData = {
				...(ele?.customData as any),
				url: opfsKey,
			};
		}
		eles.value = curEles.filter((item) => !item.isDeleted);
		return eles.value;
	};

	const initContent = async (initEles: ExcalidrawElement[]) => {
		const initFiles = [];
		for (const ele of initEles) {
			if (ele.type === "image" && ele?.customData?.url) {
				const url = (ele.customData as any).url as string;
				try {
					// OPFS key 单一事实源：本地直读重建；其余地址走网络/会话内 fetch
					const base64 = isOpfsKey(url)
						? await readBase64FromOPFS(url)
						: await fetchToBase64(url);
					initFiles.push({
						id: ele.fileId,
						dataURL: base64,
						mimeType: "image/png",
					});
				} catch (error) {
					console.warn("恢复画板图片失败，已跳过:", ele.fileId, error);
				}
			}
		}
		if (api.value) {
			updateContent(initEles, initFiles, "replace");
		} else {
			eles.value = initEles;
			initFiles.forEach((file) => {
				files.value[file.id] = file;
			});
		}
	};

	const updateContent = async (
		newEles: ExcalidrawElement[],
		newFiles: any[],
		mode: "replace" | "append" = "append",
	) => {
		const curEles = api.value.getSceneElements();
		const nextEles = mode == "append" ? curEles.concat(newEles) : newEles;
		api.value.updateScene({
			elements: nextEles,
		});
		api.value.addFiles(newFiles);
		api.value.scrollToContent(nextEles, {
			fitToViewport: true,
			animate: true,
		});
	};

	watch(
		() => pageStore.isDark,
		(isDark) => {
			state.value = {
				theme: isDark ? "dark" : "light",
				exportWithDarkMode: isDark,
			};
			api.value?.updateScene({
				// @ts-expect-error
				appState: state.value,
			});
		},
	);

	return {
		loading,
		api,
		state,
		eles,
		files,
		dragInfo,
		getSelected,
		addMaterial,
		addTemplate,
		addStory,
		replaceFile,
		saveDrawData,
		initContent,
		updateContent,
	};
});
