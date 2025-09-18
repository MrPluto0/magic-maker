import type { App } from "vue";

const installExcalidraw = {
	// 打包的字体文件放在 /assets/ 目录下，通过EXCALIDRAW_ASSET_PATH获取
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
