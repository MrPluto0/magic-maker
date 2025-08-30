import type { App } from "vue";

const installExcalidraw = {
	install(app: App) {
		if (import.meta.env.DEV) {
			window.EXCALIDRAW_ASSET_PATH =
				window.origin + "/packages/excalidraw/excalidraw-assets/";
		} else {
			window.EXCALIDRAW_ASSET_PATH = window.origin + "/assets/";
		}
	},
};
export default installExcalidraw;
