import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({
      ignore: ["h"], //解决h报错
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    UnoCSS(),
    // @vue/devtools-kit 7.7.7 在 Node 环境调 localStorage 导致 config 加载崩溃，暂禁用
    // VitePluginVueDevtools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // 产物瘦身：大依赖分包，提升缓存命中与首屏加载
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (/[\\/]node_modules[\\/]@webav[\\/]/.test(id)) {
              return "vendor-webav";
            }
            if (/[\\/]node_modules[\\/](openai)[\\/]/.test(id)) {
              return "vendor-openai";
            }
            if (
              /[\\/]node_modules[\\/](element-plus|@element-plus|@vueuse)[\\/]/
                .test(id)
            ) {
              return "vendor-element-plus";
            }
          }
          return undefined;
        },
      },
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://ark.cn-beijing.volces.com/api/v3",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
      // 智谱 GLM（OpenAI 兼容）：浏览器直连被 CORS 拦，dev 走代理
      "/bigmodel": {
        target: "https://open.bigmodel.cn/api/paas/v4",
        rewrite: (path) => path.replace(/^\/bigmodel/, ""),
        changeOrigin: true,
      },
      // GLM Coding Plan 专用端点（glm-5.3 完整版只在这条路开放）
      "/glmcode": {
        target: "https://open.bigmodel.cn/api/coding/paas/v4",
        rewrite: (path) => path.replace(/^\/glmcode/, ""),
        changeOrigin: true,
      },
    },
  },
});
