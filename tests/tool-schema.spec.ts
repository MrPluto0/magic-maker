import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
	assertSchema,
	buildLLMTools,
	resolveTimePoint,
	resolveTimeRange,
	toolCatalogJSON,
	toolRegistry,
} from "@/class/agentTools";

const EXPECTED_TOOLS: Array<[string, string]> = [
	["query_timeline", "query"],
	["query_segments", "query"],
	["split_at", "write"],
	["delete_range", "destructive"],
	["move_segment", "write"],
	["add_text", "write"],
	["set_segment_text", "write"],
	["export_video", "write"],
];

describe("工具注册表（单一事实源）", () => {
	it("W5 落地 8 个工具，danger 标记与 PHASE2_TOOLS 清单一致", () => {
		expect([...toolRegistry.keys()].sort()).toEqual(
			EXPECTED_TOOLS.map(([n]) => n).sort(),
		);
		for (const [name, danger] of EXPECTED_TOOLS) {
			expect(toolRegistry.get(name)?.danger, name).toBe(danger);
			expect(toolRegistry.get(name)?.intent.length, name).toBeGreaterThan(4);
		}
	});

	it("每个工具 schema 都是 additionalProperties:false 的对象 schema", () => {
		for (const tool of toolRegistry.values()) {
			expect(tool.schema.type).toBe("object");
			expect(tool.schema.additionalProperties).toBe(false);
		}
	});

	it("buildLLMTools 与注册表同源", () => {
		const tools = buildLLMTools();
		expect(tools).toHaveLength(toolRegistry.size);
		expect(tools[0].type).toBe("function");
		expect(tools[0].function.parameters).toBe(
			toolRegistry.get(tools[0].function.name)?.schema,
		);
	});

	it("tools.json 与注册表一致（gen 脚本产物防漂移）", () => {
		const raw = JSON.parse(
			readFileSync(fileURLToPath(new URL("../tools.json", import.meta.url)), "utf8"),
		);
		expect(raw.tools).toEqual(toolCatalogJSON());
	});
});

describe("assertSchema（E_SCHEMA 校验）", () => {
	const schema = {
		type: "object" as const,
		properties: {
			trackId: { type: "string" as const },
			frame: { type: "integer" as const },
			ripple: { type: "boolean" as const },
			scope: { type: "array" as const, items: { type: "string" } },
			resolution: {
				type: "string" as const,
				enum: ["source", "720p", "1080p"],
			},
			text: { type: "string" as const, maxLength: 5 },
		},
		required: ["trackId"],
		additionalProperties: false as const,
	};

	it("缺少必填 → E_SCHEMA /path", () => {
		expect(() => assertSchema(schema, {})).toThrow(
			expect.objectContaining({ code: "E_SCHEMA" }) as never,
		);
		try {
			assertSchema(schema, {});
		} catch (e) {
			expect((e as { detail?: { path?: string } }).detail?.path).toBe("/trackId");
		}
	});

	it("类型错 / enum 越界 / maxLength / 未知参数 → E_SCHEMA", () => {
		expect(() =>
			assertSchema(schema, { trackId: 1 }),
		).toThrow();
		expect(() =>
			assertSchema(schema, { trackId: "t", resolution: "4k" }),
		).toThrow();
		expect(() =>
			assertSchema(schema, { trackId: "t", text: "太长了太长了" }),
		).toThrow();
		expect(() =>
			assertSchema(schema, { trackId: "t", nope: 1 }),
		).toThrow();
		expect(() =>
			assertSchema(schema, { trackId: "t", scope: [1] }),
		).toThrow();
	});

	it("合法参数通过", () => {
		expect(() =>
			assertSchema(schema, {
				trackId: "t",
				ripple: true,
				scope: ["a"],
				resolution: "720p",
			}),
		).not.toThrow();
	});
});

describe("时间换算（frame = round(sec * fps)）", () => {
	it("sec 换算帧（四舍五入到帧边界）", () => {
		expect(resolveTimePoint({ sec: 12.35 }, 30)).toBe(371);
		expect(resolveTimePoint({ sec: 0 }, 30)).toBe(0);
		expect(resolveTimePoint({ frame: 45 }, 30)).toBe(45);
	});

	it("frame 与 sec 同时传 → E_AMBIGUOUS_TIME", () => {
		try {
			resolveTimePoint({ frame: 30, sec: 1 }, 30);
			expect.unreachable("应抛错");
		} catch (e) {
			expect((e as { code: string }).code).toBe("E_AMBIGUOUS_TIME");
		}
	});

	it("都不传 → E_SCHEMA", () => {
		expect(() => resolveTimePoint({}, 30)).toThrow();
	});

	it("区间换算 start/end 各自独立", () => {
		expect(resolveTimeRange({ startSec: 1, endFrame: 60 }, 30)).toEqual({
			start: 30,
			end: 60,
		});
		expect(
			resolveTimeRange({ startFrame: 10, endFrame: 20 }, 30, ""),
		).toEqual({ start: 10, end: 20 });
	});
});
