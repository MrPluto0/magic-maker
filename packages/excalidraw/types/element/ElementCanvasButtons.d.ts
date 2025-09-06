/// <reference types="react" />
import type { ElementsMap, NonDeletedExcalidrawElement } from "./types";
import "./ElementCanvasButtons.scss";
export declare const ElementCanvasButtons: ({
	children,
	element,
	elementsMap,
}: {
	children: React.ReactNode;
	element: NonDeletedExcalidrawElement;
	elementsMap: ElementsMap;
}) => JSX.Element | null;
