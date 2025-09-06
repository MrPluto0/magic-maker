import type {
	ElementsMap,
	ExcalidrawElement,
	ExcalidrawElementType,
	ExcalidrawTextContainer,
	ExcalidrawTextElement,
	ExcalidrawTextElementWithContainer,
	FontString,
	NonDeletedExcalidrawElement,
} from "./types";
import type { MaybeTransformHandleType } from "./transformHandles";
import type { AppState } from "../types";
import type { ExtractSetType } from "../utility-types";
export declare const normalizeText: (text: string) => string;
export declare const redrawTextBoundingBox: (
	textElement: ExcalidrawTextElement,
	container: ExcalidrawElement | null,
	elementsMap: ElementsMap,
	informMutation?: boolean,
) => void;
export declare const bindTextToShapeAfterDuplication: (
	newElements: ExcalidrawElement[],
	oldElements: ExcalidrawElement[],
	oldIdToDuplicatedId: Map<ExcalidrawElement["id"], ExcalidrawElement["id"]>,
) => void;
export declare const handleBindTextResize: (
	container: NonDeletedExcalidrawElement,
	elementsMap: ElementsMap,
	transformHandleType: MaybeTransformHandleType,
	shouldMaintainAspectRatio?: boolean,
) => void;
export declare const computeBoundTextPosition: (
	container: ExcalidrawElement,
	boundTextElement: ExcalidrawTextElementWithContainer,
	elementsMap: ElementsMap,
) => {
	x: number;
	y: number;
};
export declare const measureText: (
	text: string,
	font: FontString,
	lineHeight: ExcalidrawTextElement["lineHeight"],
	forceAdvanceWidth?: true,
) => {
	width: number;
	height: number;
};
/**
 * To get unitless line-height (if unknown) we can calculate it by dividing
 * height-per-line by fontSize.
 */
export declare const detectLineHeight: (
	textElement: ExcalidrawTextElement,
) => number & {
	_brand: "unitlessLineHeight";
};
/**
 * We calculate the line height from the font size and the unitless line height,
 * aligning with the W3C spec.
 */
export declare const getLineHeightInPx: (
	fontSize: ExcalidrawTextElement["fontSize"],
	lineHeight: ExcalidrawTextElement["lineHeight"],
) => number;
export declare const getApproxMinLineHeight: (
	fontSize: ExcalidrawTextElement["fontSize"],
	lineHeight: ExcalidrawTextElement["lineHeight"],
) => number;
/**
 * @param forceAdvanceWidth use to force retrieve the "advance width" ~ `metrics.width`, instead of the actual boundind box width.
 *
 * > The advance width is the distance between the glyph's initial pen position and the next glyph's initial pen position.
 *
 * We need to use the advance width as that's the closest thing to the browser wrapping algo, hence using it for:
 * - text wrapping
 * - wysiwyg editor (+padding)
 *
 * Everything else should be based on the actual bounding box width.
 *
 * `Math.ceil` of the final width adds additional buffer which stabilizes slight wrapping incosistencies.
 */
export declare const getLineWidth: (
	text: string,
	font: FontString,
	forceAdvanceWidth?: true,
) => number;
export declare const getTextWidth: (
	text: string,
	font: FontString,
	forceAdvanceWidth?: true,
) => number;
export declare const getTextHeight: (
	text: string,
	fontSize: number,
	lineHeight: ExcalidrawTextElement["lineHeight"],
) => number;
export declare const charWidth: {
	calculate: (char: string, font: FontString) => number;
	getCache: (font: FontString) => number[];
	clearCache: (font: FontString) => void;
};
export declare const getApproxMinLineWidth: (
	font: FontString,
	lineHeight: ExcalidrawTextElement["lineHeight"],
) => number;
export declare const getMinCharWidth: (font: FontString) => number;
export declare const getMaxCharWidth: (font: FontString) => number;
export declare const getBoundTextElementId: (
	container: ExcalidrawElement | null,
) => string | null;
export declare const getBoundTextElement: (
	element: ExcalidrawElement | null,
	elementsMap: ElementsMap,
) => ExcalidrawTextElementWithContainer | null;
export declare const getContainerElement: (
	element: ExcalidrawTextElement | null,
	elementsMap: ElementsMap,
) => ExcalidrawTextContainer | null;
export declare const getContainerCenter: (
	container: ExcalidrawElement,
	appState: AppState,
	elementsMap: ElementsMap,
) => {
	x: number;
	y: number;
};
export declare const getContainerCoords: (
	container: NonDeletedExcalidrawElement,
) => {
	x: number;
	y: number;
};
export declare const getTextElementAngle: (
	textElement: ExcalidrawTextElement,
	container: ExcalidrawTextContainer | null,
) => import("../../math").Radians;
export declare const getBoundTextElementPosition: (
	container: ExcalidrawElement,
	boundTextElement: ExcalidrawTextElementWithContainer,
	elementsMap: ElementsMap,
) =>
	| {
			x: number;
			y: number;
	  }
	| undefined;
export declare const shouldAllowVerticalAlign: (
	selectedElements: NonDeletedExcalidrawElement[],
	elementsMap: ElementsMap,
) => boolean;
export declare const suppportsHorizontalAlign: (
	selectedElements: NonDeletedExcalidrawElement[],
	elementsMap: ElementsMap,
) => boolean;
declare const VALID_CONTAINER_TYPES: Set<string>;
export declare const isValidTextContainer: (element: {
	type: ExcalidrawElementType;
}) => boolean;
export declare const computeContainerDimensionForBoundText: (
	dimension: number,
	containerType: ExtractSetType<typeof VALID_CONTAINER_TYPES>,
) => number;
export declare const getBoundTextMaxWidth: (
	container: ExcalidrawElement,
	boundTextElement: ExcalidrawTextElement | null,
) => number;
export declare const getBoundTextMaxHeight: (
	container: ExcalidrawElement,
	boundTextElement: ExcalidrawTextElementWithContainer,
) => number;
export declare const isMeasureTextSupported: () => boolean;
export declare const getMinTextElementWidth: (
	font: FontString,
	lineHeight: ExcalidrawTextElement["lineHeight"],
) => number;
/** retrieves text from text elements and concatenates to a single string */
export declare const getTextFromElements: (
	elements: readonly ExcalidrawElement[],
	separator?: string,
) => string;
export {};
