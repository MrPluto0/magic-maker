/// <reference types="react" />
import type { ExcalidrawElement } from "../../element/types";
import type Scene from "../../scene/Scene";
import type { AppState } from "../../types";
interface FontSizeProps {
	element: ExcalidrawElement;
	scene: Scene;
	appState: AppState;
	property: "fontSize";
}
declare const FontSize: ({
	element,
	scene,
	appState,
	property,
}: FontSizeProps) => JSX.Element | null;
export default FontSize;
