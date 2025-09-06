/// <reference types="react" />
import type { ActionManager } from "../actions/manager";
import type {
	ExcalidrawElement,
	NonDeletedElementsMap,
	NonDeletedSceneElementsMap,
} from "../element/types";
import type { AppClassProperties, AppProps, UIAppState, Zoom } from "../types";
import "./Actions.scss";
export declare const canChangeStrokeColor: (
	appState: UIAppState,
	targetElements: ExcalidrawElement[],
) => boolean;
export declare const canChangeBackgroundColor: (
	appState: UIAppState,
	targetElements: ExcalidrawElement[],
) => boolean;
export declare const SelectedShapeActions: ({
	appState,
	elementsMap,
	renderAction,
}: {
	appState: UIAppState;
	elementsMap: NonDeletedElementsMap | NonDeletedSceneElementsMap;
	renderAction: ActionManager["renderAction"];
}) => JSX.Element;
export declare const ShapesSwitcher: ({
	activeTool,
	appState,
	app,
	UIOptions,
}: {
	activeTool: UIAppState["activeTool"];
	appState: UIAppState;
	app: AppClassProperties;
	UIOptions: AppProps["UIOptions"];
}) => JSX.Element;
export declare const ZoomActions: ({
	renderAction,
	zoom,
}: {
	renderAction: ActionManager["renderAction"];
	zoom: Zoom;
}) => JSX.Element;
export declare const UndoRedoActions: ({
	renderAction,
	className,
}: {
	renderAction: ActionManager["renderAction"];
	className?: string | undefined;
}) => JSX.Element;
export declare const ExitZenModeAction: ({
	actionManager,
	showExitZenModeBtn,
}: {
	actionManager: ActionManager;
	showExitZenModeBtn: boolean;
}) => JSX.Element;
export declare const FinalizeAction: ({
	renderAction,
	className,
}: {
	renderAction: ActionManager["renderAction"];
	className?: string | undefined;
}) => JSX.Element;
