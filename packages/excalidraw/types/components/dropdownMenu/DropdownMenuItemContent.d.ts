/// <reference types="react" />
declare const MenuItemContent: ({
	textStyle,
	icon,
	shortcut,
	children,
}: {
	icon?: JSX.Element | undefined;
	shortcut?: string | undefined;
	textStyle?: import("react").CSSProperties | undefined;
	children: React.ReactNode;
}) => JSX.Element;
export default MenuItemContent;
