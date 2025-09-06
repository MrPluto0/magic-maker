import type { ElementsMap, ExcalidrawElement } from "./element/types";
export interface Alignment {
	position: "start" | "center" | "end";
	axis: "x" | "y";
}
export declare const alignElements: (
	selectedElements: ExcalidrawElement[],
	elementsMap: ElementsMap,
	alignment: Alignment,
) => ExcalidrawElement[];
