import type { AppClassProperties } from "../types";
export declare const actionTextAutoResize: {
	name: string;
	label: string;
	icon: null;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly import("../element/types").ExcalidrawElement[],
		appState: import("../types").AppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		_: any,
		app: AppClassProperties,
	) => {
		appState: Readonly<import("../types").AppState>;
		elements: import("../element/types").OrderedExcalidrawElement[];
		storeAction: "capture";
	};
} & {
	keyTest?: undefined;
};
