import { type GlobalPoint } from "../math";
import type { LineSegment } from "../utils";
import type { BoundingBox, Bounds } from "./element/bounds";
declare global {
	interface Window {
		visualDebug?: {
			data: DebugElement[][];
			currentFrame?: number;
		};
	}
}
export type DebugElement = {
	color: string;
	data: LineSegment<GlobalPoint>;
	permanent: boolean;
};
export declare const debugDrawLine: (
	segment: LineSegment<GlobalPoint> | LineSegment<GlobalPoint>[],
	opts?: {
		color?: string;
		permanent?: boolean;
	},
) => void;
export declare const debugDrawPoint: (
	p: GlobalPoint,
	opts?: {
		color?: string;
		permanent?: boolean;
		fuzzy?: boolean;
	},
) => void;
export declare const debugDrawBoundingBox: (
	box: BoundingBox | BoundingBox[],
	opts?: {
		color?: string;
		permanent?: boolean;
	},
) => void;
export declare const debugDrawBounds: (
	box: Bounds | Bounds[],
	opts?: {
		color?: string;
		permanent?: boolean;
	},
) => void;
export declare const debugCloseFrame: () => void;
export declare const debugClear: () => void;
