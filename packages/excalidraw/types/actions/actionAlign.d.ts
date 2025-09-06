/// <reference types="react" />
import type { ExcalidrawElement } from "../element/types";
import type { AppClassProperties, AppState, UIAppState } from "../types";
export declare const actionAlignTop: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
export declare const actionAlignBottom: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
export declare const actionAlignLeft: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
export declare const actionAlignRight: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
export declare const actionAlignVerticallyCentered: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
	PanelComponent: ({
		elements,
		appState,
		updateData,
		app,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionAlignHorizontallyCentered: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "element";
	};
	predicate: (
		elements: readonly ExcalidrawElement[],
		appState: UIAppState,
		_: unknown,
		app: AppClassProperties,
	) => boolean;
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
	PanelComponent: ({
		elements,
		appState,
		updateData,
		app,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
