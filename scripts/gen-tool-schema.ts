/**
 * 从工具注册表生成 tools.json（docs/PHASE2_DESIGN §1.3 / §5.2）。
 *
 * 注册表是唯一事实源：LLM function calling 的 tools 数组与未来 MCP 桥的
 * tool manifest 都从这份产物出。改工具只改 src/class/agentTools.ts，
 * 改完跑 `pnpm gen:tools` 重新生成。
 *
 * 运行：pnpm gen:tools（tsx，解析 tsconfig paths）。
 */
import { writeFileSync } from "node:fs";
import { toolCatalogJSON } from "../src/class/agentTools";

const manifest = {
	version: 1,
	generatedAt: new Date().toISOString(),
	tools: toolCatalogJSON(),
};

const out = new URL("../tools.json", import.meta.url);
writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`tools.json written: ${manifest.tools.length} tools`);
