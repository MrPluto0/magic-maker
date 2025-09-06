/// <reference types="react" />
import "./SearchMenu.scss";
export declare const searchItemInFocusAtom: import("jotai").PrimitiveAtom<
	number | null
> & {
	init: number | null;
};
export declare const SearchMenu: () => JSX.Element;
