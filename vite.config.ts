import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import UnoCSS from "unocss/vite";
import VitePluginVueDevtools from "vite-plugin-vue-devtools";
import veauryVitePlugins from "veaury/vite/esm/index.mjs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    AutoImport({
      ignore: ["h"], //解决h报错
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS(),
    // 兼容vue和react
    veauryVitePlugins({
      type: "vue",
    }),
    VitePluginVueDevtools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@pkg": path.resolve(__dirname, "./packages"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://ark.cn-beijing.volces.com/api/v3",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
      "/tos": {
        target:
          "https://ark-content-generation-v2-cn-beijing.tos-cn-beijing.volces.com",
        rewrite: (path) => path.replace(/^\/tos/, ""),
        changeOrigin: true,
      },
    },
  },
});
