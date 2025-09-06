/// <reference types="react" />
import type { ActionManager } from "../../actions/manager";
import type { UIAppState } from "../../types";
declare const Footer: {
	({
		appState,
		actionManager,
		showExitZenModeBtn,
		renderWelcomeScreen,
	}: {
		appState: UIAppState;
		actionManager: ActionManager;
		showExitZenModeBtn: boolean;
		renderWelcomeScreen: boolean;
	}): JSX.Element;
	displayName: string;
};
export default Footer;
