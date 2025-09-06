import React from "react";
import { DropDownMenuItemBadgeType } from "../dropdownMenu/DropdownMenuItem";
import { type FontFamilyValues } from "../../element/types";
import type { ValueOf } from "../../utility-types";
export interface FontDescriptor {
	value: number;
	icon: JSX.Element;
	text: string;
	deprecated?: true;
	badge?: {
		type: ValueOf<typeof DropDownMenuItemBadgeType>;
		placeholder: string;
	};
}
interface FontPickerListProps {
	selectedFontFamily: FontFamilyValues | null;
	hoveredFontFamily: FontFamilyValues | null;
	onSelect: (value: number | string) => void;
	onHover: (value: number) => void;
	onLeave: () => void;
	onOpen: () => void;
	onClose: () => void;
}
export declare const FontPickerList: React.MemoExoticComponent<
	({
		selectedFontFamily,
		hoveredFontFamily,
		onSelect,
		onHover,
		onLeave,
		onOpen,
		onClose,
	}: FontPickerListProps) => JSX.Element
>;
export {};
