import type { NonDeletedExcalidrawElement } from "../element/types";
import type { ElementOrToolType } from "../types";
export declare const hasBackground: (type: ElementOrToolType) => boolean;
export declare const hasStrokeColor: (type: ElementOrToolType) => boolean;
export declare const hasStrokeWidth: (type: ElementOrToolType) => boolean;
export declare const hasStrokeStyle: (type: ElementOrToolType) => boolean;
export declare const canChangeRoundness: (type: ElementOrToolType) => boolean;
export declare const toolIsArrow: (type: ElementOrToolType) => boolean;
export declare const canHaveArrowheads: (type: ElementOrToolType) => boolean;
export declare const getElementAtPosition: (
	elements: readonly NonDeletedExcalidrawElement[],
	isAtPositionFn: (element: NonDeletedExcalidrawElement) => boolean,
) =>
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "rectangle";
	  } & {
			isDeleted: boolean;
	  })
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "diamond";
	  } & {
			isDeleted: boolean;
	  })
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "ellipse";
	  } & {
			isDeleted: boolean;
	  })
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "text";
				fontSize: number;
				fontFamily: import("../element/types").FontFamilyValues;
				text: string;
				textAlign: string;
				verticalAlign: string;
				containerId: string | null;
				originalText: string;
				autoResize: boolean;
				lineHeight: number & {
					_brand: "unitlessLineHeight";
				};
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "line" | "arrow";
				points: readonly import("../../math").LocalPoint[];
				lastCommittedPoint: import("../../math").LocalPoint | null;
				startBinding: import("../element/types").PointBinding | null;
				endBinding: import("../element/types").PointBinding | null;
				startArrowhead: import("../element/types").Arrowhead | null;
				endArrowhead: import("../element/types").Arrowhead | null;
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "freedraw";
				points: readonly import("../../math").LocalPoint[];
				pressures: readonly number[];
				simulatePressure: boolean;
				lastCommittedPoint: import("../../math").LocalPoint | null;
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "image";
				fileId: import("../element/types").FileId | null;
				status: "pending" | "saved" | "error";
				scale: [number, number];
				crop: import("../element/types").ImageCrop | null;
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "frame";
			name: string | null;
	  } & {
			isDeleted: boolean;
	  })
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "magicframe";
			name: string | null;
	  } & {
			isDeleted: boolean;
	  })
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "iframe";
				customData?:
					| {
							generationData?:
								| import("../element/types").MagicGenerationData
								| undefined;
					  }
					| undefined;
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> &
			Readonly<{
				type: "embeddable";
			}> & {
				isDeleted: boolean;
			})
	| (Readonly<{
			id: string;
			x: number;
			y: number;
			strokeColor: string;
			backgroundColor: string;
			fillStyle: import("../element/types").FillStyle;
			strokeWidth: number;
			strokeStyle: import("../element/types").StrokeStyle;
			roundness: {
				type: import("../element/types").RoundnessType;
				value?: number | undefined;
			} | null;
			roughness: number;
			opacity: number;
			width: number;
			height: number;
			angle: import("../../math").Radians;
			seed: number;
			version: number;
			versionNonce: number;
			index: import("../element/types").FractionalIndex | null;
			isDeleted: boolean;
			groupIds: readonly string[];
			frameId: string | null;
			boundElements:
				| readonly Readonly<{
						id: string;
						type: "text" | "arrow";
				  }>[]
				| null;
			updated: number;
			link: string | null;
			locked: boolean;
			customData?: Record<string, any> | undefined;
	  }> & {
			type: "selection";
	  } & {
			isDeleted: boolean;
	  })
	| null;
export declare const getElementsAtPosition: (
	elements: readonly NonDeletedExcalidrawElement[],
	isAtPositionFn: (element: NonDeletedExcalidrawElement) => boolean,
) => NonDeletedExcalidrawElement[];
