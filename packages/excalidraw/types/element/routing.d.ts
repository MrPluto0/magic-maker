import { type LocalPoint, type Vector } from "../../math";
import type { AppState } from "../types";
import type { ElementUpdate } from "./mutateElement";
import type {
	ExcalidrawElbowArrowElement,
	NonDeletedSceneElementsMap,
	SceneElementsMap,
} from "./types";
export declare const mutateElbowArrow: (
	arrow: ExcalidrawElbowArrowElement,
	elementsMap: NonDeletedSceneElementsMap | SceneElementsMap,
	nextPoints: readonly LocalPoint[],
	offset?: Vector,
	otherUpdates?: Omit<
		ElementUpdate<ExcalidrawElbowArrowElement>,
		"angle" | "x" | "y" | "width" | "height" | "elbowed" | "points"
	>,
	options?: {
		isDragging?: boolean;
		informMutation?: boolean;
		zoom?: AppState["zoom"];
	},
) => void;
export declare const updateElbowArrow: (
	arrow: ExcalidrawElbowArrowElement,
	elementsMap: NonDeletedSceneElementsMap | SceneElementsMap,
	nextPoints: readonly LocalPoint[],
	offset?: Vector,
	options?: {
		isDragging?: boolean;
		disableBinding?: boolean;
		informMutation?: boolean;
		zoom?: AppState["zoom"];
	},
) => ElementUpdate<ExcalidrawElbowArrowElement> | null;
