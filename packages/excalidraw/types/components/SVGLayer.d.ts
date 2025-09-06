/// <reference types="react" />
import type { Trail } from "../animated-trail";
import "./SVGLayer.scss";
type SVGLayerProps = {
	trails: Trail[];
};
export declare const SVGLayer: ({ trails }: SVGLayerProps) => JSX.Element;
export {};
