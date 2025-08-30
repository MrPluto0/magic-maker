import * as _ from "lodash-es";
import Psd from "@webtoon/psd";
import { nanoid } from "nanoid";
import { convertToExcalidrawElements } from "@pkg/excalidraw";
import type { ExcalidrawElement } from "@pkg/excalidraw/types/element/types";
import { ChineseFonts, EnglishFonts } from "@/data/fonts";

export async function psdToJson(file: File) {
	const result = await file.arrayBuffer();
	const psdFile = Psd.parse(result);

	// 初始化
	const json = {
		version: "0.0.2",
		width: psdFile.width,
		height: psdFile.height,
		origin: [],
		elements: [],
		files: [],
	};

	// 拍平
	const children = flattenTree(psdFile.children);

	// 转换psd结构
	json.origin = await psdChildrenTransform(children, json);

	json.origin = updateFontFamily(json.origin);

	// 构建excalidraw结构
	json.elements = convertToExcalidrawElements(json.origin.reverse());

	// 更新字体族的名称等信息
	json.elements = updateTextProps(json.elements, json.origin);

	// 输出文件
	return json;
}

function flattenTree(tree) {
	const result = [];

	function traverse(nodes) {
		nodes.forEach((node) => {
			if (node?.layerFrame?.layerProperties?.hidden || node?.isHidden) {
				return;
			}
			if (node.children) {
				traverse(node.children); // 递归遍历子节点
			} else {
				result.push(node); // 将当前节点添加到结果数组中
			}
		});
	}

	traverse(tree);
	return result;
}

async function psdChildrenTransform(children, json) {
	const nodes = [];
	// 编组
	const groupIds = [nanoid()];

	for (let i = 0; i < children.length; i++) {
		const item = children[i];

		const common = {
			name: item.name,
			x: item.left,
			y: item.top,
			width: item.width,
			height: item.height,
			groupIds,
		};

		if (item.text) {
			if (!isNaN(item.text)) {
				continue;
			}
			const { FontSize, FillColor } =
				item.textProperties.EngineDict.StyleRun.RunArray[0].StyleSheet
					.StyleSheetData;
			const { FontSet } = item.textProperties.ResourceDict;
			const { Justification } =
				item.textProperties.EngineDict.ParagraphRun.RunArray[0].ParagraphSheet
					.Properties;

			nodes.push({
				...common,
				type: "text",
				text: item.text,
				textAlign: getAlign(Justification),
				fontSize: FontSize || 12,
				strokeColor: getColor(FillColor?.Values || [1, 0, 0, 0]),
				fontFamily: FontSet?.[0].Name || 2,
			});
		} else if (item.type == "Layer") {
			const base64 = await getLayerBse64(item);
			const fileId = nanoid();
			json.files.push({
				id: fileId,
				mimeType: "image/jpeg",
				dataURL: base64,
			});
			nodes.push({
				...common,
				type: "image",
				fileId,
			});
		} else {
			console.error("not found type: ", item.type);
		}
	}

	return nodes;
}

async function getLayerBse64(layer) {
	try {
		const compositeBuffer = await layer.composite();
		const canvasElement = document.createElement("canvas");
		const context = canvasElement.getContext("2d");
		const imageData = new ImageData(compositeBuffer, layer.width, layer.height);
		canvasElement.width = layer.width;
		canvasElement.height = layer.height;
		context.putImageData(imageData, 0, 0);
		const base64 = canvasElement.toDataURL("image/png");
		return base64;
	} catch (error) {
		console.error(error);
	}
}

function getColor(arr) {
	const [, r, g, b] = arr;
	return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}

function getAlign(justification: number) {
	switch (justification) {
		case 0:
		case 3:
			return "left";
		case 1:
		case 4:
			return "right";
		case 2:
		case 5:
			return "center";
		default:
			return "left";
	}
}

export function updateFontFamily(eles: any[]) {
	const fontFamilys = Object.keys(ChineseFonts).concat(
		Object.keys(EnglishFonts),
	);

	return eles.map((ele) => {
		if (ele.type === "text" && typeof ele.fontFamily === "string") {
			const family = ele.fontFamily;
			const target = fontFamilys.find((f) => family.includes(f));
			return {
				...ele,
				fontFamily: target ?? 2,
				fontSize: ele.fontSize > 80 ? ele.fontSize * 0.8 : ele.fontSize,
			};
		}
		return ele;
	});
}

// 调整文字的字体族、宽高、位置
export function updateTextProps(eles: ExcalidrawElement[], origin: any[]) {
	return eles.map((ele, i) => {
		if (ele.type === "text") {
			return {
				...ele,
				x: origin[i].x,
				y: origin[i].y,
				autoResize: false,
				width: origin[i].width,
				height: origin[i].height,
			};
		}
		return ele;
	});
}
