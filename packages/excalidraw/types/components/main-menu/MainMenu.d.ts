import React from "react";
import * as DefaultItems from "./DefaultItems";
declare const MainMenu: React.FC<
	{
		children?: React.ReactNode;
		/**
		 * Called when any menu item is selected (clicked on).
		 */
		onSelect?: ((event: Event) => void) | undefined;
	} & {
		__fallback?: boolean | undefined;
	}
> & {
	Trigger: {
		({
			className,
			children,
			onToggle,
			title,
			...rest
		}: {
			className?: string | undefined;
			children: React.ReactNode;
			onToggle: () => void;
			title?: string | undefined;
		} & Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			"onSelect"
		>): JSX.Element;
		displayName: string;
	};
	Item: {
		({
			icon,
			value,
			order,
			children,
			shortcut,
			className,
			hovered,
			selected,
			textStyle,
			onSelect,
			onClick,
			...rest
		}: {
			icon?: JSX.Element | undefined;
			value?: string | number | undefined;
			order?: number | undefined;
			onSelect?: ((event: Event) => void) | undefined;
			children: React.ReactNode;
			shortcut?: string | undefined;
			hovered?: boolean | undefined;
			selected?: boolean | undefined;
			textStyle?: React.CSSProperties | undefined;
			className?: string | undefined;
		} & Omit<
			React.ButtonHTMLAttributes<HTMLButtonElement>,
			"onSelect"
		>): JSX.Element;
		displayName: string;
		Badge: {
			({
				type,
				children,
			}: {
				type?:
					| import("../../utility-types").ValueOf<{
							readonly GREEN: "green";
							readonly RED: "red";
							readonly BLUE: "blue";
					  }>
					| undefined;
				children: React.ReactNode;
			}): JSX.Element;
			displayName: string;
		};
	};
	ItemLink: {
		({
			icon,
			shortcut,
			href,
			children,
			onSelect,
			className,
			selected,
			rel,
			...rest
		}: {
			href: string;
			icon?: JSX.Element | undefined;
			children: React.ReactNode;
			shortcut?: string | undefined;
			className?: string | undefined;
			selected?: boolean | undefined;
			onSelect?: ((event: Event) => void) | undefined;
			rel?: string | undefined;
		} & React.AnchorHTMLAttributes<HTMLAnchorElement>): JSX.Element;
		displayName: string;
	};
	ItemCustom: ({
		children,
		className,
		selected,
		...rest
	}: {
		children: React.ReactNode;
		className?: string | undefined;
		selected?: boolean | undefined;
	} & React.HTMLAttributes<HTMLDivElement>) => JSX.Element;
	Group: {
		({
			children,
			className,
			style,
			title,
		}: {
			children: React.ReactNode;
			className?: string | undefined;
			style?: React.CSSProperties | undefined;
			title?: string | undefined;
		}): JSX.Element;
		displayName: string;
	};
	Separator: {
		(): JSX.Element;
		displayName: string;
	};
	DefaultItems: typeof DefaultItems;
};
export default MainMenu;
