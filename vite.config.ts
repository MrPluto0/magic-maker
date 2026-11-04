import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { createRequire } from "node:module";
import UnoCSS from "unocss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, type Plugin, type ProxyOptions } from "vite";

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

/* ------- ORT wasm 自托管（W6：本地 whisper 的中国网络可达性保障） -------
 * transformers.js 默认从 cdn.jsdelivr.net 拉 onnxruntime-web 的
 * ort-wasm-simd-threaded*.wasm（wasm 推理必需，~15-27MB）——大陆直连不稳。
 * 这里把 node_modules 里的 4 个 ort 文件按原文件名挂到同源 /ort/ 路径：
 * - dev：中间件直接从 node_modules 流式读；
 * - build：closeBundle 拷进 dist/ort/（产物体积 +≈41MB，换零外网依赖）。
 * worker 侧 env.backends.onnx.wasm.wasmPaths 指向该路径（见 whisper.worker.ts）。
 */
const ORT_FILES = [
  "ort-wasm-simd-threaded.mjs",
  "ort-wasm-simd-threaded.wasm",
  "ort-wasm-simd-threaded.asyncify.mjs",
  "ort-wasm-simd-threaded.asyncify.wasm",
];

function ortDistDir(): string {
	const require = createRequire(import.meta.url);
	// onnxruntime-web 的 exports 不暴露 ./package.json，从入口文件向上找包根
	let dir = path.dirname(require.resolve("onnxruntime-web"));
	while (!fs.existsSync(path.join(dir, "package.json"))) {
		const parent = path.dirname(dir);
		if (parent === dir) {
			throw new Error("onnxruntime-web 包根定位失败（wasm 自托管不可用）");
		}
		dir = parent;
	}
	return path.join(dir, "dist");
}

function ortWasmPlugin(): Plugin {
  const dist = ortDistDir();
  return {
    name: "selfhost-ort-wasm",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = (req.url ?? "").replace(/^\/ort\//, "").split("?")[0];
        if (!req.url?.startsWith("/ort/") || !ORT_FILES.includes(name)) {
          next();
          return;
        }
        const file = path.join(dist, name);
        if (!fs.existsSync(file)) {
          res.statusCode = 404;
          res.end("ort file missing");
          return;
        }
        res.setHeader("Content-Type", name.endsWith(".wasm") ? "application/wasm" : "text/javascript");
        fs.createReadStream(file).pipe(res);
      });
    },
    closeBundle() {
      const outDir = fileURLToPath(new URL("./dist/ort", import.meta.url));
      fs.mkdirSync(outDir, { recursive: true });
      for (const name of ORT_FILES) {
        fs.copyFileSync(path.join(dist, name), path.join(outDir, name));
      }
      // transformers.js 打包时会把 ORT wasm 再拷一份进 dist/assets（运行期用不上，
      // 我们固定走 /ort/ 自托管路径）——删掉避免产物翻倍
      const assetsDir = fileURLToPath(new URL("./dist/assets", import.meta.url));
      if (fs.existsSync(assetsDir)) {
        for (const f of fs.readdirSync(assetsDir)) {
          if (/^ort-wasm-.*\.(wasm|mjs)$/.test(f)) {
            fs.rmSync(path.join(assetsDir, f));
          }
        }
      }
      console.log(`[selfhost-ort-wasm] copied ${ORT_FILES.length} files -> dist/ort/`);
    },
  };
}

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
    ortWasmPlugin(),
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
