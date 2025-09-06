import type { LocalPoint, GlobalPoint, Vector } from "../../math";
import type { ExcalidrawBindableElement } from "./types";
export declare const HEADING_RIGHT: Heading;
export declare const HEADING_DOWN: Heading;
export declare const HEADING_LEFT: Heading;
export declare const HEADING_UP: Heading;
export type Heading = [1, 0] | [0, 1] | [-1, 0] | [0, -1];
export declare const headingForDiamond: <
	Point extends GlobalPoint | LocalPoint,
>(
	a: Point,
	b: Point,
) => Heading;
export declare const vectorToHeading: (vec: Vector) => Heading;
export declare const compareHeading: (a: Heading, b: Heading) => boolean;
export declare const headingForPointFromElement: <
	Point extends GlobalPoint | LocalPoint,
>(
	element: Readonly<ExcalidrawBindableElement>,
	aabb: readonly [minX: number, minY: number, maxX: number, maxY: number],
	p: Readonly<LocalPoint | GlobalPoint>,
) => Heading;
export declare const flipHeading: (h: Heading) => Heading;
