/// <reference types="react" />
import type { CommandPaletteItem } from "./types";
import * as defaultItems from "./defaultCommandPaletteItems";
import "./CommandPalette.scss";
export declare const DEFAULT_CATEGORIES: {
	app: string;
	export: string;
	tools: string;
	editor: string;
	elements: string;
	links: string;
};
type CommandPaletteProps = {
	customCommandPaletteItems?: CommandPaletteItem[];
};
export declare const CommandPalette: ((
	props: CommandPaletteProps,
) => JSX.Element | null) & {
	defaultItems: typeof defaultItems;
};
export {};
