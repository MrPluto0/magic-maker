/// <reference types="react" />
import type { Theme } from "../element/types";
import "../components/ToolIcon.scss";
export declare const actionChangeProjectName: {
	name: string;
	label: string;
	trackEvent: false;
	perform: (
		_elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
	) => {
		appState: {
			name: any;
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawLinearElement
				  >
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawBindableElement
				  >
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawElement
				  >[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
			currentItemFontFamily: import("../element/types").FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: import("../element/types").Arrowhead | null;
			currentItemEndArrowhead: import("../element/types").Arrowhead | null;
			currentHoveredFontFamily:
				| import("../element/types").FontFamilyValues
				| null;
			currentItemRoundness: import("../element/types").StrokeRoundness;
			currentItemArrowType: "round" | "sharp" | "elbow";
			viewBackgroundColor: string;
			scrollX: number;
			scrollY: number;
			cursorButton: "up" | "down";
			scrolledOutside: boolean;
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
			theme: Theme;
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
			selectedLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
		storeAction: "none";
	};
	PanelComponent: ({
		appState,
		updateData,
		appProps,
		data,
		app,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeExportScale: {
	name: string;
	label: string;
	trackEvent: {
		category: "export";
		action: string;
	};
	perform: (
		_elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
	) => {
		appState: {
			exportScale: any;
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawLinearElement
				  >
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawBindableElement
				  >
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawElement
				  >[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportWithDarkMode: boolean;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: import("../element/types").FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: import("../element/types").Arrowhead | null;
			currentItemEndArrowhead: import("../element/types").Arrowhead | null;
			currentHoveredFontFamily:
				| import("../element/types").FontFamilyValues
				| null;
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
			theme: Theme;
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
			selectedLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
		storeAction: "none";
	};
	PanelComponent: ({
		elements: allElements,
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeExportBackground: {
	name: string;
	label: string;
	trackEvent: {
		category: "export";
		action: string;
	};
	perform: (
		_elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
	) => {
		appState: {
			exportBackground: any;
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawLinearElement
				  >
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawBindableElement
				  >
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawElement
				  >[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
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
			currentItemFontFamily: import("../element/types").FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: import("../element/types").Arrowhead | null;
			currentItemEndArrowhead: import("../element/types").Arrowhead | null;
			currentHoveredFontFamily:
				| import("../element/types").FontFamilyValues
				| null;
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
			theme: Theme;
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
			selectedLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
		storeAction: "none";
	};
	PanelComponent: ({
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionChangeExportEmbedScene: {
	name: string;
	label: string;
	trackEvent: {
		category: "export";
		action: string;
	};
	perform: (
		_elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
	) => {
		appState: {
			exportEmbedScene: any;
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawLinearElement
				  >
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawBindableElement
				  >
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawElement
				  >[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportWithDarkMode: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: import("../element/types").FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: import("../element/types").Arrowhead | null;
			currentItemEndArrowhead: import("../element/types").Arrowhead | null;
			currentHoveredFontFamily:
				| import("../element/types").FontFamilyValues
				| null;
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
			theme: Theme;
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
			selectedLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
		storeAction: "none";
	};
	PanelComponent: ({
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
export declare const actionSaveToActiveFile: {
	name: string;
	label: string;
	icon: JSX.Element;
	trackEvent: {
		category: "export";
	};
	predicate: (
		elements: readonly import("../element/types").ExcalidrawElement[],
		appState: import("../types").AppState,
		props: import("../types").ExcalidrawProps,
		app: import("../types").AppClassProperties,
	) => boolean;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
		app: import("../types").AppClassProperties,
	) => Promise<
		| {
				storeAction: "none";
				appState: {
					fileHandle: import("browser-fs-access").FileSystemHandle | null;
					toast: {
						message: string;
					} | null;
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawLinearElement
						  >
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawBindableElement
						  >
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawElement
						  >[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
					currentItemFontFamily: import("../element/types").FontFamilyValues;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead:
						| import("../element/types").Arrowhead
						| null;
					currentItemEndArrowhead: import("../element/types").Arrowhead | null;
					currentHoveredFontFamily:
						| import("../element/types").FontFamilyValues
						| null;
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
					zenModeEnabled: boolean;
					theme: Theme;
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
					selectedLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
		  }
		| {
				storeAction: "none";
				appState?: undefined;
		  }
	>;
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
export declare const actionSaveFileToDisk: {
	name: string;
	label: string;
	icon: JSX.Element;
	viewMode: true;
	trackEvent: {
		category: "export";
	};
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
		app: import("../types").AppClassProperties,
	) => Promise<
		| {
				storeAction: "none";
				appState: {
					openDialog: null;
					fileHandle: import("browser-fs-access").FileSystemHandle | null;
					toast: {
						message: string;
					};
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawLinearElement
						  >
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawBindableElement
						  >
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawElement
						  >[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
					currentItemFontFamily: import("../element/types").FontFamilyValues;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead:
						| import("../element/types").Arrowhead
						| null;
					currentItemEndArrowhead: import("../element/types").Arrowhead | null;
					currentHoveredFontFamily:
						| import("../element/types").FontFamilyValues
						| null;
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
					zenModeEnabled: boolean;
					theme: Theme;
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
					selectedLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
		  }
		| {
				storeAction: "none";
				appState?: undefined;
		  }
	>;
	keyTest: (
		event: KeyboardEvent | import("react").KeyboardEvent<Element>,
	) => boolean;
	PanelComponent: ({
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?:
		| ((
				event: KeyboardEvent | import("react").KeyboardEvent<Element>,
		  ) => boolean)
		| undefined;
};
export declare const actionLoadScene: {
	name: string;
	label: string;
	trackEvent: {
		category: "export";
	};
	predicate: (
		elements: readonly import("../element/types").ExcalidrawElement[],
		appState: import("../types").AppState,
		props: import("../types").ExcalidrawProps,
		app: import("../types").AppClassProperties,
	) => boolean;
	perform: (
		elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		_: any,
		app: import("../types").AppClassProperties,
	) => Promise<
		| false
		| {
				elements: import("../element/types").OrderedExcalidrawElement[];
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawLinearElement
						  >
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawBindableElement
						  >
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawElement
						  >[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
					currentItemFontFamily: import("../element/types").FontFamilyValues;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead:
						| import("../element/types").Arrowhead
						| null;
					currentItemEndArrowhead: import("../element/types").Arrowhead | null;
					currentHoveredFontFamily:
						| import("../element/types").FontFamilyValues
						| null;
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
					theme: Theme;
					gridSize: number;
					gridStep: number;
					gridModeEnabled: boolean;
					viewModeEnabled: boolean;
					selectedGroupIds: {
						[groupId: string]: boolean;
					};
					editingGroupId: string | null;
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
					selectedLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
				files: import("../types").BinaryFiles;
				storeAction: "capture";
		  }
		| {
				elements: readonly import("../element/types").OrderedExcalidrawElement[];
				appState: {
					errorMessage: any;
					contextMenu: {
						items: import("../components/ContextMenu").ContextMenuItems;
						top: number;
						left: number;
					} | null;
					showWelcomeScreen: boolean;
					isLoading: boolean;
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawLinearElement
						  >
						| null;
					selectionElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					isBindingEnabled: boolean;
					startBoundElement:
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawBindableElement
						  >
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
						| import("../element/types").NonDeleted<
								import("../element/types").ExcalidrawElement
						  >[]
						| null;
					editingTextElement:
						| import("../element/types").NonDeletedExcalidrawElement
						| null;
					editingLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
					currentItemFontFamily: import("../element/types").FontFamilyValues;
					currentItemFontSize: number;
					currentItemTextAlign: string;
					currentItemStartArrowhead:
						| import("../element/types").Arrowhead
						| null;
					currentItemEndArrowhead: import("../element/types").Arrowhead | null;
					currentHoveredFontFamily:
						| import("../element/types").FontFamilyValues
						| null;
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
					theme: Theme;
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
					selectedLinearElement:
						| import("../element/linearElementEditor").LinearElementEditor
						| null;
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
				files: import("../types").BinaryFiles;
				storeAction: "none";
		  }
	>;
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
export declare const actionExportWithDarkMode: {
	name: string;
	label: string;
	trackEvent: {
		category: "export";
		action: string;
	};
	perform: (
		_elements: readonly import("../element/types").OrderedExcalidrawElement[],
		appState: Readonly<import("../types").AppState>,
		value: any,
	) => {
		appState: {
			exportWithDarkMode: any;
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawLinearElement
				  >
				| null;
			selectionElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			isBindingEnabled: boolean;
			startBoundElement:
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawBindableElement
				  >
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
				| import("../element/types").NonDeleted<
						import("../element/types").ExcalidrawElement
				  >[]
				| null;
			editingTextElement:
				| import("../element/types").NonDeletedExcalidrawElement
				| null;
			editingLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
			activeTool: {
				lastActiveTool: import("../types").ActiveTool | null;
				locked: boolean;
			} & import("../types").ActiveTool;
			penMode: boolean;
			penDetected: boolean;
			exportBackground: boolean;
			exportEmbedScene: boolean;
			exportScale: number;
			currentItemStrokeColor: string;
			currentItemBackgroundColor: string;
			currentItemFillStyle: import("../element/types").FillStyle;
			currentItemStrokeWidth: number;
			currentItemStrokeStyle: import("../element/types").StrokeStyle;
			currentItemRoughness: number;
			currentItemOpacity: number;
			currentItemFontFamily: import("../element/types").FontFamilyValues;
			currentItemFontSize: number;
			currentItemTextAlign: string;
			currentItemStartArrowhead: import("../element/types").Arrowhead | null;
			currentItemEndArrowhead: import("../element/types").Arrowhead | null;
			currentHoveredFontFamily:
				| import("../element/types").FontFamilyValues
				| null;
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
			theme: Theme;
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
			selectedLinearElement:
				| import("../element/linearElementEditor").LinearElementEditor
				| null;
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
		storeAction: "none";
	};
	PanelComponent: ({
		appState,
		updateData,
	}: import("./types").PanelComponentProps) => JSX.Element;
} & {
	keyTest?: undefined;
};
