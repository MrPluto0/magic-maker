import { ref } from "vue";
import { defineStore } from "pinia";
import type {
	AppState,
	BinaryFiles,
	ExcalidrawImperativeAPI,
} from "@pkg/excalidraw/types/types";
import type {
	ExcalidrawElement,
	ExcalidrawImageElement,
} from "@pkg/excalidraw/types/element/types";
import { convertToExcalidrawElements } from "@pkg/excalidraw";
import type { Material } from "@/types/draw";
import { nanoid } from "nanoid";
import { base64ToBlob, blobToFile, fetch2Base64 } from "@/utils/file";
import { cropShape } from "@/utils/cropper";
import { updateFontFamily, updateTextProps } from "@/utils/psd";
import { usePageState } from "./page";

export const useDrawStore = defineStore(
	"draw",
	() => {
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
			const base64 = await fetch2Base64(material.url);
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
					const base64 = await fetch2Base64(item.url);
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
				const base64 = await fetch2Base64(url);
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
			let base64 = await fetch2Base64(url);
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
			const curEles = api.value.getSceneElements();
			const files = api.value.getFiles();
			for (const ele of curEles) {
				if (ele.type === "image" && !ele?.customData?.url) {
					const file = files[ele.fileId];
					const blob = base64ToBlob(file.dataURL, file.mimeType);
					const fileData = blobToFile(
						blob,
						`${new Date().toLocaleString()}.png`,
					);
					// 前端模式下使用本地URL
					const localUrl = URL.createObjectURL(fileData);
					//@ts-expect-error
					ele.customData = {
						url: localUrl,
						...ele?.customData,
					};
				}
			}
			eles.value = curEles.filter((item) => !item.isDeleted);
			return eles.value;
		};

		const initContent = async (initEles: ExcalidrawElement[]) => {
			const initFiles = [];
			for (const ele of initEles) {
				if (ele.type === "image" && ele?.customData?.url) {
					const base64 = await fetch2Base64(ele.customData.url);
					initFiles.push({
						id: ele.fileId,
						dataURL: base64,
						mimeType: "image/png",
					});
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

		//@ts-expect-error
		window.api = () => {
			if (api.value) {
				console.log(getSelected());
			}
			return api.value;
		};

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
	},
	{
		persist: {
			storage: localStorage,
			pick: ["state", "files", "eles"],
		},
	},
);
