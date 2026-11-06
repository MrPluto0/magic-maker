import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, type ProxyOptions } from "vite";

// GLM Coding Plan 零配置接入：从 Hermes 的 .env 读 GLM_API_KEY，
// 请求没带有效鉴权时代理自动注入——magic-maker 的 AI 设置里
// baseUrl/Key 全留空即可用 glm-5.3，无需手工填钥匙。
function hermesGlmKey(): string | undefined {
  try {
    const envPath = path.join(os.homedir(), ".hermes", ".env");
    if (!fs.existsSync(envPath)) return undefined;
    const line = fs
      .readFileSync(envPath, "utf8")
      .split("\n")
      .find((l) => l.startsWith("GLM_API_KEY="));
    if (!line) return undefined;
    const value = line.slice("GLM_API_KEY=".length).trim();
    return value.replace(/^["']|["']$/g, "") || undefined;
  } catch {
    return undefined;
  }
}

const GLM_CODE_BASE = "https://open.bigmodel.cn/api/coding/paas/v4";

// 站内 GLM 代理：透传 BYOK 鉴权；没带鉴权（留空/占位符）时注入 Hermes 钥匙
function glmProxy(): ProxyOptions {
  return {
    target: GLM_CODE_BASE,
    changeOrigin: true,
    rewrite: (p) => p.replace(/^\/glm/, ""),
    configure: (proxy) => {
      proxy.on("proxyReq", (proxyReq) => {
        const auth = proxyReq.getHeader("authorization");
        const key = hermesGlmKey();
        if (!key) return;
        const authText = typeof auth === "string" ? auth : "";
        const usable =
          !authText ||
          authText === "Bearer no-key" ||
          authText.includes("byok-proxy");
        if (usable) {
          proxyReq.setHeader("Authorization", `Bearer ${key}`);
        }
      });
    },
  };
}

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
      // 火山方舟（豆包生图等，需 BYOK 自带方舟 Key）
      "/api": {
        target: "https://ark.cn-beijing.volces.com/api/v3",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
      // GLM Coding Plan：agent 对话默认走这里，零配置（钥匙从 ~/.hermes/.env 注入）
      "/glm": glmProxy(),
    },
  },
});
