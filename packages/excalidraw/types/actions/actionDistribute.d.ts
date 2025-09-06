/// <reference types="react" />
import type { ExcalidrawElement } from "../element/types";
import type { AppClassProperties, AppState } from "../types";
export declare const distributeHorizontally: {
	name: string;
	label: string;
	trackEvent: {
		category: "element";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		_: any,
		app: AppClassProperties,
	) => {
		appState: Readonly<AppState>;
		elements: ExcalidrawElement[];
		storeAction: "capture";
	};
	keyTest: (
		event: KeyboardEvent | import("react").KeyboardEvent<Element>,
	) => boolean;
	PanelComponent: ({
		elements,
		appState,
		updateData,
		app,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?:
		| ((
				event: KeyboardEvent | import("react").KeyboardEvent<Element>,
		  ) => boolean)
		| undefined;
};
export declare const distributeVertically: {
	name: string;
	label: string;
	trackEvent: {
		category: "element";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		_: any,
		app: AppClassProperties,
	) => {
		appState: Readonly<AppState>;
		elements: ExcalidrawElement[];
		storeAction: "capture";
	};
	keyTest: (
		event: KeyboardEvent | import("react").KeyboardEvent<Element>,
	) => boolean;
	PanelComponent: ({
		elements,
		appState,
		updateData,
		app,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?:
		| ((
				event: KeyboardEvent | import("react").KeyboardEvent<Element>,
		  ) => boolean)
		| undefined;
};
