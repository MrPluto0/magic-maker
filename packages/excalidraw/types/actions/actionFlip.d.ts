/// <reference types="react" />
import type { ExcalidrawElement } from "../element/types";
import type { AppClassProperties, AppState } from "../types";
export declare const actionFlipHorizontal: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		_: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: Readonly<AppState>;
		storeAction: "capture";
	};
	keyTest: (
		event: KeyboardEvent | import("react").KeyboardEvent<Element>,
	) => boolean;
} & {
	keyTest?:
		| ((
				event: KeyboardEvent | import("react").KeyboardEvent<Element>,
		  ) => boolean)
		| undefined;
};
export declare const actionFlipVertical: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		_: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: Readonly<AppState>;
		storeAction: "capture";
	};
	keyTest: (
		event: KeyboardEvent | import("react").KeyboardEvent<Element>,
	) => boolean;
} & {
	keyTest?:
		| ((
				event: KeyboardEvent | import("react").KeyboardEvent<Element>,
		  ) => boolean)
		| undefined;
};
