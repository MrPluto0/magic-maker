/// <reference types="react" />
import type { Theme } from "../../element/types";
import "./DefaultItems.scss";
export declare const LoadScene: {
	(): JSX.Element | null;
	displayName: string;
};
export declare const SaveToActiveFile: {
	(): JSX.Element | null;
	displayName: string;
};
export declare const SaveAsImage: {
	(): JSX.Element;
	displayName: string;
};
export declare const CommandPalette: {
	(opts?: { className?: string }): JSX.Element;
	displayName: string;
};
export declare const SearchMenu: {
	(opts?: { className?: string }): JSX.Element;
	displayName: string;
};
export declare const Help: {
	(): JSX.Element;
	displayName: string;
};
export declare const ClearCanvas: {
	(): JSX.Element | null;
	displayName: string;
};
export declare const ToggleTheme: {
	(
		props:
			| {
					allowSystemTheme: true;
					theme: Theme | "system";
					onSelect: (theme: Theme | "system") => void;
			  }
			| {
					allowSystemTheme?: false | undefined;
					onSelect?: ((theme: Theme) => void) | undefined;
			  },
	): JSX.Element | null;
	displayName: string;
};
export declare const ChangeCanvasBackground: {
	(): JSX.Element | null;
	displayName: string;
};
export declare const Export: {
	(): JSX.Element;
	displayName: string;
};
export declare const Socials: {
	(): JSX.Element;
	displayName: string;
};
export declare const LiveCollaborationTrigger: {
	({
		onSelect,
		isCollaborating,
	}: {
		onSelect: () => void;
		isCollaborating: boolean;
	}): JSX.Element;
	displayName: string;
};
