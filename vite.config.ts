import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import UnoCSS from "unocss/vite";
import VueRouter from "unplugin-vue-router/vite";
import VitePluginVueDevtools from "vite-plugin-vue-devtools";
import veauryVitePlugins from "veaury/vite/index.js";

// https://vitejs.dev/config/
export default defineConfig({
	base: "./", // 设置基础路径
	plugins: [
		veauryVitePlugins({
			type: "vue",
		}),
		VitePluginVueDevtools(),
		VueRouter(),
		AutoImport({
			dts: "./auto-imports.d.ts",
			ignore: ["h"], //解决h报错
			imports: [
				"vue", // example type import
				{
					from: "@/types/track.d.ts",
					imports: ["TrackLineItem", "TrackItem", "TrackType", "Track"],
					type: true,
				},
				{
					from: "@/types/project.d.ts",
					imports: ["IProject"],
					type: true,
				},
			],
			resolvers: [
				ElementPlusResolver(),
				IconsResolver({
					prefix: "Icon",
				}),
			],
		}),
		Components({
			resolvers: [
				IconsResolver({
					enabledCollections: ["ep"],
				}),
				ElementPlusResolver(),
			],
		}),
		Icons({
			autoInstall: true,
		}),
		UnoCSS(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"@pkg": path.resolve(__dirname, "./packages"),
			pages: path.resolve(__dirname, "./src/pages"),
		},
	},
	server: {
		headers: {
			// 开启以确保ShareArrayBuffer能够正常使用，来支持ffmpeg的worker多线程
			// "Cross-Origin-Embedder-Policy": "require-corp",
			// "Cross-Origin-Opener-Policy": "same-origin",
		},
		// Removed API proxy configuration for frontend-only mode
	},
	optimizeDeps: {
		exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
	},
	define: {
		"process.env": {},
	},
});
