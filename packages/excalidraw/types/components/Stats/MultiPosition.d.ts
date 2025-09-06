/// <reference types="react" />
import type { ElementsMap, ExcalidrawElement } from "../../element/types";
import type Scene from "../../scene/Scene";
import type { AtomicUnit } from "./utils";
import type { AppState } from "../../types";
interface MultiPositionProps {
	property: "x" | "y";
	elements: readonly ExcalidrawElement[];
	elementsMap: ElementsMap;
	atomicUnits: AtomicUnit[];
	scene: Scene;
	appState: AppState;
}
declare const MultiPosition: ({
	property,
	elements,
	elementsMap,
	atomicUnits,
	scene,
	appState,
}: MultiPositionProps) => JSX.Element;
export default MultiPosition;
