/// <reference types="react" />
import type { AppClassProperties, AppState, Primitive } from "../types";
import type {
	Arrowhead,
	ExcalidrawBindableElement,
	ExcalidrawElement,
	ExcalidrawLinearElement,
	FontFamilyValues,
} from "../element/types";
import { LinearElementEditor } from "../element/linearElementEditor";
export declare const changeProperty: (
	elements: readonly ExcalidrawElement[],
	appState: AppState,
	callback: (element: ExcalidrawElement) => ExcalidrawElement,
	includeBoundText?: boolean,
) => ExcalidrawElement[];
export declare const getFormValue: <T extends Primitive>(
	elements: readonly ExcalidrawElement[],
	appState: AppState,
	getAttribute: (element: ExcalidrawElement) => T,
	isRelevantElement: true | ((element: ExcalidrawElement) => boolean),
	defaultValue: T | ((isSomeElementSelected: boolean) => T),
) => T;
export declare const actionChangeStrokeColor: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => any;
	PanelComponent: ({
		elements,
		appState,
		updateData,
		appProps,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeBackgroundColor: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => any;
	PanelComponent: ({
		elements,
		appState,
		updateData,
		appProps,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeFillStyle: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemFillStyle: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeStrokeWidth: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemStrokeWidth: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeSloppiness: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemRoughness: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeStrokeStyle: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemStrokeStyle: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeOpacity: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemOpacity: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeFontSize: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemFontSize: number;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
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
export declare const actionDecreaseFontSize: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemFontSize: number;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
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
export declare const actionIncreaseFontSize: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemFontSize: number;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
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
export declare const actionChangeFontFamily: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) =>
		| {
				appState: {
					currentItemFontFamily: FontFamilyValues;
					currentHoveredFontFamily: FontFamilyValues | null;
					openPopup:
						| "fontFamily"
						| "canvasBackground"
						| "elementBackground"
						| "elementStroke"
						| null;
					contextMenu: {
						items: import("../components/ContextMenu").ContextMenuItems;
						top: number;
						left: number;
					} | null;
					showWelcomeScreen: boolean;
					isLoading: boolean;
					errorMessage: import("react").ReactNode;
					activeEmbeddable: {
						element: import("../element/types").NonDeletedExcalidrawElement;
						state: "hover" | "active";
					} | null;
					newElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawNonSelectionElement
						  >
						| null;
					resizingElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					multiElement:
						| import("../element/types").NonDeleted<ExcalidrawLinearElement>
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<ExcalidrawBindableElement>
						| null;
					suggestedBindings: import("../element/binding").SuggestedBinding[];
					frameToHighlight:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawFrameLikeElement
						  >
						| null;
					frameRendering: {
						enabled: boolean;
						name: boolean;
						outline: boolean;
						clip: boolean;
					};
					editingFrame: string | null;
					elementsToHighlight:
						| import("../element/types").NonDeleted<ExcalidrawElement>[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement: LinearElementEditor | null;
					activeTool: {
						lastActiveTool: import("../types").ActiveTool | null;
						locked: boolean;
					} & import("../types").ActiveTool;
					penMode: boolean;
					penDetected: boolean;
					exportBackground: boolean;
					exportEmbedScene: boolean;
					exportWithDarkMode: boolean;
					exportScale: number;
					currentItemStrokeColor: string;
					currentItemBackgroundColor: string;
					currentItemFillStyle: import("../element/types").FillStyle;
					currentItemStrokeWidth: number;
					currentItemStrokeStyle: import("../element/types").StrokeStyle;
					currentItemRoughness: number;
					currentItemOpacity: number;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead: Arrowhead | null;
					currentItemEndArrowhead: Arrowhead | null;
					currentItemRoundness: import("../element/types").StrokeRoundness;
					currentItemArrowType: "round" | "sharp" | "elbow";
					viewBackgroundColor: string;
					scrollX: number;
					scrollY: number;
					cursorButton: "up" | "down";
					scrolledOutside: boolean;
					name: string | null;
					isResizing: boolean;
					isRotating: boolean;
					zoom: Readonly<{
						value: import("../types").NormalizedZoomValue;
					}>;
					openMenu: "canvas" | "shape" | null;
					openSidebar: {
						name: string;
						tab?: string | undefined;
					} | null;
					openDialog:
						| {
								name: "imageExport" | "help" | "jsonExport";
						  }
						| {
								name: "ttd";
								tab: "text-to-diagram" | "mermaid";
						  }
						| {
								name: "commandPalette";
						  }
						| {
								name: "elementLinkSelector";
								sourceElementId: string;
						  }
						| null;
					defaultSidebarDockedPreference: boolean;
					lastPointerDownWith: import("../element/types").PointerType;
					selectedElementIds: Readonly<{
						[id: string]: true;
					}>;
					hoveredElementIds: Readonly<{
						[id: string]: true;
					}>;
					previousSelectedElementIds: {
						[id: string]: true;
					};
					selectedElementsAreBeingDragged: boolean;
					shouldCacheIgnoreZoom: boolean;
					toast: {
						message: string;
						closable?: boolean | undefined;
						duration?: number | undefined;
					} | null;
					zenModeEnabled: boolean;
					theme: import("../element/types").Theme;
					gridSize: number;
					gridStep: number;
					gridModeEnabled: boolean;
					viewModeEnabled: boolean;
					selectedGroupIds: {
						[groupId: string]: boolean;
					};
					editingGroupId: string | null;
					width: number;
					height: number;
					offsetTop: number;
					offsetLeft: number;
					fileHandle: import("browser-fs-access").FileSystemHandle | null;
					collaborators: Map<
						import("../types").SocketId,
						Readonly<{
							pointer?: import("../types").CollaboratorPointer | undefined;
							button?: "up" | "down" | undefined;
							selectedElementIds?:
								| Readonly<{
										[id: string]: true;
								  }>
								| undefined;
							username?: string | null | undefined;
							userState?: import("../types").UserIdleState | undefined;
							color?:
								| {
										background: string;
										stroke: string;
								  }
								| undefined;
							avatarUrl?: string | undefined;
							id?: string | undefined;
							socketId?: import("../types").SocketId | undefined;
							isCurrentUser?: boolean | undefined;
							isInCall?: boolean | undefined;
							isSpeaking?: boolean | undefined;
							isMuted?: boolean | undefined;
						}>
					>;
					stats: {
						open: boolean;
						panels: number;
					};
					currentChartType: import("../element/types").ChartType;
					pasteDialog:
						| {
								shown: false;
								data: null;
						  }
						| {
								shown: true;
								data: import("../charts").Spreadsheet;
						  };
					pendingImageElementId: string | null;
					showHyperlinkPopup: false | "info" | "editor";
					selectedLinearElement: LinearElementEditor | null;
					snapLines: readonly import("../snapping").SnapLine[];
					originSnapOffset: {
						x: number;
						y: number;
					} | null;
					objectsSnapModeEnabled: boolean;
					userToFollow: import("../types").UserToFollow | null;
					followedBy: Set<import("../types").SocketId>;
					isCropping: boolean;
					croppingElementId: string | null;
					searchMatches: readonly {
						id: string;
						focus: boolean;
						matchedLines: {
							offsetX: number;
							offsetY: number;
							width: number;
							height: number;
						}[];
					}[];
				};
				storeAction: "none" | "capture";
		  }
		| {
				elements: ExcalidrawElement[];
				appState: {
					currentItemFontFamily: FontFamilyValues;
					currentHoveredFontFamily: FontFamilyValues | null;
					openPopup:
						| "fontFamily"
						| "canvasBackground"
						| "elementBackground"
						| "elementStroke"
						| null;
					contextMenu: {
						items: import("../components/ContextMenu").ContextMenuItems;
						top: number;
						left: number;
					} | null;
					showWelcomeScreen: boolean;
					isLoading: boolean;
					errorMessage: import("react").ReactNode;
					activeEmbeddable: {
						element: import("../element/types").NonDeletedExcalidrawElement;
						state: "hover" | "active";
					} | null;
					newElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawNonSelectionElement
						  >
						| null;
					resizingElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					multiElement:
						| import("../element/types").NonDeleted<ExcalidrawLinearElement>
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<ExcalidrawBindableElement>
						| null;
					suggestedBindings: import("../element/binding").SuggestedBinding[];
					frameToHighlight:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawFrameLikeElement
						  >
						| null;
					frameRendering: {
						enabled: boolean;
						name: boolean;
						outline: boolean;
						clip: boolean;
					};
					editingFrame: string | null;
					elementsToHighlight:
						| import("../element/types").NonDeleted<ExcalidrawElement>[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement: LinearElementEditor | null;
					activeTool: {
						lastActiveTool: import("../types").ActiveTool | null;
						locked: boolean;
					} & import("../types").ActiveTool;
					penMode: boolean;
					penDetected: boolean;
					exportBackground: boolean;
					exportEmbedScene: boolean;
					exportWithDarkMode: boolean;
					exportScale: number;
					currentItemStrokeColor: string;
					currentItemBackgroundColor: string;
					currentItemFillStyle: import("../element/types").FillStyle;
					currentItemStrokeWidth: number;
					currentItemStrokeStyle: import("../element/types").StrokeStyle;
					currentItemRoughness: number;
					currentItemOpacity: number;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead: Arrowhead | null;
					currentItemEndArrowhead: Arrowhead | null;
					currentItemRoundness: import("../element/types").StrokeRoundness;
					currentItemArrowType: "round" | "sharp" | "elbow";
					viewBackgroundColor: string;
					scrollX: number;
					scrollY: number;
					cursorButton: "up" | "down";
					scrolledOutside: boolean;
					name: string | null;
					isResizing: boolean;
					isRotating: boolean;
					zoom: Readonly<{
						value: import("../types").NormalizedZoomValue;
					}>;
					openMenu: "canvas" | "shape" | null;
					openSidebar: {
						name: string;
						tab?: string | undefined;
					} | null;
					openDialog:
						| {
								name: "imageExport" | "help" | "jsonExport";
						  }
						| {
								name: "ttd";
								tab: "text-to-diagram" | "mermaid";
						  }
						| {
								name: "commandPalette";
						  }
						| {
								name: "elementLinkSelector";
								sourceElementId: string;
						  }
						| null;
					defaultSidebarDockedPreference: boolean;
					lastPointerDownWith: import("../element/types").PointerType;
					selectedElementIds: Readonly<{
						[id: string]: true;
					}>;
					hoveredElementIds: Readonly<{
						[id: string]: true;
					}>;
					previousSelectedElementIds: {
						[id: string]: true;
					};
					selectedElementsAreBeingDragged: boolean;
					shouldCacheIgnoreZoom: boolean;
					toast: {
						message: string;
						closable?: boolean | undefined;
						duration?: number | undefined;
					} | null;
					zenModeEnabled: boolean;
					theme: import("../element/types").Theme;
					gridSize: number;
					gridStep: number;
					gridModeEnabled: boolean;
					viewModeEnabled: boolean;
					selectedGroupIds: {
						[groupId: string]: boolean;
					};
					editingGroupId: string | null;
					width: number;
					height: number;
					offsetTop: number;
					offsetLeft: number;
					fileHandle: import("browser-fs-access").FileSystemHandle | null;
					collaborators: Map<
						import("../types").SocketId,
						Readonly<{
							pointer?: import("../types").CollaboratorPointer | undefined;
							button?: "up" | "down" | undefined;
							selectedElementIds?:
								| Readonly<{
										[id: string]: true;
								  }>
								| undefined;
							username?: string | null | undefined;
							userState?: import("../types").UserIdleState | undefined;
							color?:
								| {
										background: string;
										stroke: string;
								  }
								| undefined;
							avatarUrl?: string | undefined;
							id?: string | undefined;
							socketId?: import("../types").SocketId | undefined;
							isCurrentUser?: boolean | undefined;
							isInCall?: boolean | undefined;
							isSpeaking?: boolean | undefined;
							isMuted?: boolean | undefined;
						}>
					>;
					stats: {
						open: boolean;
						panels: number;
					};
					currentChartType: import("../element/types").ChartType;
					pasteDialog:
						| {
								shown: false;
								data: null;
						  }
						| {
								shown: true;
								data: import("../charts").Spreadsheet;
						  };
					pendingImageElementId: string | null;
					showHyperlinkPopup: false | "info" | "editor";
					selectedLinearElement: LinearElementEditor | null;
					snapLines: readonly import("../snapping").SnapLine[];
					originSnapOffset: {
						x: number;
						y: number;
					} | null;
					objectsSnapModeEnabled: boolean;
					userToFollow: import("../types").UserToFollow | null;
					followedBy: Set<import("../types").SocketId>;
					isCropping: boolean;
					croppingElementId: string | null;
					searchMatches: readonly {
						id: string;
						focus: boolean;
						matchedLines: {
							offsetX: number;
							offsetY: number;
							width: number;
							height: number;
						}[];
					}[];
				};
				storeAction: "update";
		  };
	PanelComponent: ({
		elements,
		appState,
		app,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeTextAlign: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemTextAlign: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
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
export declare const actionChangeVerticalAlign: {
	name: string;
	label: string;
	trackEvent: {
		category: "element";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
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
export declare const actionChangeRoundness: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemRoundness: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeArrowhead: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: {
			position: "start" | "end";
			type: Arrowhead;
		},
	) => {
		elements: ExcalidrawElement[];
		appState: {
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeArrowType: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<AppState>,
		value: any,
		app: AppClassProperties,
	) => {
		elements: ExcalidrawElement[];
		appState: {
			currentItemArrowType: any;
			contextMenu: {
				items: import("../components/ContextMenu").ContextMenuItems;
				top: number;
				left: number;
			} | null;
			showWelcomeScreen: boolean;
			isLoading: boolean;
			errorMessage: import("react").ReactNode;
			activeEmbeddable: {
				element: import("../element/types").NonDeletedExcalidrawElement;
				state: "hover" | "active";
			} | null;
			newElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawNonSelectionElement
				  >
				| null;
			resizingElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			multiElement:
				| import("../element/types").NonDeleted<ExcalidrawLinearElement>
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<ExcalidrawBindableElement>
				| null;
			suggestedBindings: import("../element/binding").SuggestedBinding[];
			frameToHighlight:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawFrameLikeElement
				  >
				| null;
			frameRendering: {
				enabled: boolean;
				name: boolean;
				outline: boolean;
				clip: boolean;
			};
			editingFrame: string | null;
			elementsToHighlight:
				| import("../element/types").NonDeleted<ExcalidrawElement>[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement: LinearElementEditor | null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: Arrowhead | null;
			currentItemEndArrowhead: Arrowhead | null;
			currentHoveredFontFamily: FontFamilyValues | null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
			name: string | null;
			isResizing: boolean;
			isRotating: boolean;
			zoom: Readonly<{
				value: import("../types").NormalizedZoomValue;
			}>;
			openMenu: "canvas" | "shape" | null;
			openPopup:
				| "fontFamily"
				| "canvasBackground"
				| "elementBackground"
				| "elementStroke"
				| null;
			openSidebar: {
				name: string;
				tab?: string | undefined;
			} | null;
			openDialog:
				| {
						name: "imageExport" | "help" | "jsonExport";
				  }
				| {
						name: "ttd";
						tab: "text-to-diagram" | "mermaid";
				  }
				| {
						name: "commandPalette";
				  }
				| {
						name: "elementLinkSelector";
						sourceElementId: string;
				  }
				| null;
			defaultSidebarDockedPreference: boolean;
			lastPointerDownWith: import("../element/types").PointerType;
			selectedElementIds: Readonly<{
				[id: string]: true;
			}>;
			hoveredElementIds: Readonly<{
				[id: string]: true;
			}>;
			previousSelectedElementIds: {
				[id: string]: true;
			};
			selectedElementsAreBeingDragged: boolean;
			shouldCacheIgnoreZoom: boolean;
			toast: {
				message: string;
				closable?: boolean | undefined;
				duration?: number | undefined;
			} | null;
			zenModeEnabled: boolean;
			theme: import("../element/types").Theme;
			gridSize: number;
			gridStep: number;
			gridModeEnabled: boolean;
			viewModeEnabled: boolean;
			selectedGroupIds: {
				[groupId: string]: boolean;
			};
			editingGroupId: string | null;
			width: number;
			height: number;
			offsetTop: number;
			offsetLeft: number;
			fileHandle: import("browser-fs-access").FileSystemHandle | null;
			collaborators: Map<
				import("../types").SocketId,
				Readonly<{
					pointer?: import("../types").CollaboratorPointer | undefined;
					button?: "up" | "down" | undefined;
					selectedElementIds?:
						| Readonly<{
								[id: string]: true;
						  }>
						| undefined;
					username?: string | null | undefined;
					userState?: import("../types").UserIdleState | undefined;
					color?:
						| {
								background: string;
								stroke: string;
						  }
						| undefined;
					avatarUrl?: string | undefined;
					id?: string | undefined;
					socketId?: import("../types").SocketId | undefined;
					isCurrentUser?: boolean | undefined;
					isInCall?: boolean | undefined;
					isSpeaking?: boolean | undefined;
					isMuted?: boolean | undefined;
				}>
			>;
			stats: {
				open: boolean;
				panels: number;
			};
			currentChartType: import("../element/types").ChartType;
			pasteDialog:
				| {
						shown: false;
						data: null;
				  }
				| {
						shown: true;
						data: import("../charts").Spreadsheet;
				  };
			pendingImageElementId: string | null;
			showHyperlinkPopup: false | "info" | "editor";
			selectedLinearElement: LinearElementEditor | null;
			snapLines: readonly import("../snapping").SnapLine[];
			originSnapOffset: {
				x: number;
				y: number;
			} | null;
			objectsSnapModeEnabled: boolean;
			userToFollow: import("../types").UserToFollow | null;
			followedBy: Set<import("../types").SocketId>;
			isCropping: boolean;
			croppingElementId: string | null;
			searchMatches: readonly {
				id: string;
				focus: boolean;
				matchedLines: {
					offsetX: number;
					offsetY: number;
					width: number;
					height: number;
				}[];
			}[];
		};
		storeAction: "capture";
	};
	PanelComponent: ({
		elements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
