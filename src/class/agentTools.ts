import type { EditCommand } from "./commands";
import {
	AddTextCmd,
	DeleteRangeCmd,
	findClipInList,
	MoveSegmentCmd,
	SplitAtCmd,
	UpdateSegmentTextCmd,
} from "./commands";
import { ToolErrorCode as E, ToolError } from "./toolError";

/**
 * 工具注册表（docs/PHASE2_DESIGN §1）——单一事实源。
 *
 * 应用内对话面板、（未来）转写面板、MCP 桥全部走同一条执行管道；
 * `scripts/gen-tool-schema.ts` 从这里生成 tools.json，LLM function
 * calling 的 tools 数组与 MCP tool manifest 同源。改工具只改本文件。
 *
 * 本模块保持 Node 可导入（不静态 import pinia store）：store 访问全部
 * 延迟到 execute 内动态 import，保证 gen 脚本可运行。
 */

export type ToolDanger = "query" | "write" | "destructive";

/** JSON Schema draft 2020-12 子集（LLM function calling 与 MCP 通用） */
export interface ToolJSONSchema {
	type: "object";
	properties?: Record<string, ToolJSONSchemaProperty>;
	required?: string[];
	additionalProperties?: false;
}

export interface ToolJSONSchemaProperty {
	type: "string" | "number" | "integer" | "boolean" | "array";
	description?: string;
	enum?: Array<string | number>;
	maxLength?: number;
	items?: { type: string };
	default?: string | number | boolean;
}

export interface ToolParams {
	[name: string]: unknown;
}

export interface ToolDefinition {
	name: string;
	/** 人话意图，直接进 system prompt 与卡片文案 */
	intent: string;
	/** 决定对话流里要不要确认卡 */
	danger: ToolDanger;
	schema: ToolJSONSchema;
	execute(params: ToolParams): Promise<unknown>;
}

export const toolRegistry = new Map<string, ToolDefinition>();

function register(def: ToolDefinition) {
	toolRegistry.set(def.name, def);
}

/* ------------------------- 参数校验与时间换算 ------------------------- */

/** schema 校验（draft 2020-12 子集），失败抛 E_SCHEMA（附 JSON Path 级原因） */
export function assertSchema(schema: ToolJSONSchema, params: ToolParams) {
	if (typeof params !== "object" || params === null || Array.isArray(params)) {
		throw new ToolError(E.SCHEMA, "参数必须是对象");
	}
	const props = schema.properties ?? {};
	for (const key of schema.required ?? []) {
		if (!(key in params)) {
			throw new ToolError(E.SCHEMA, `缺少必填参数 ${key}`, { path: `/${key}` });
		}
	}
	for (const [key, value] of Object.entries(params)) {
		if (!(key in props)) {
			if (schema.additionalProperties === false) {
				throw new ToolError(E.SCHEMA, `未知参数 ${key}`, { path: `/${key}` });
			}
			continue;
		}
		const rule = props[key];
		const path = `/${key}`;
		if (
			rule.type === "string" &&
			(typeof value !== "string" ||
				(rule.maxLength !== undefined && value.length > rule.maxLength))
		) {
			throw new ToolError(
				E.SCHEMA,
				`参数 ${key} 应为字符串${
					rule.maxLength !== undefined ? `（≤${rule.maxLength} 字符）` : ""
				}`,
				{ path },
			);
		}
		if (
			(rule.type === "number" || rule.type === "integer") &&
			(typeof value !== "number" ||
				Number.isNaN(value) ||
				(rule.type === "integer" && !Number.isInteger(value)))
		) {
			throw new ToolError(
				E.SCHEMA,
				`参数 ${key} 应为${rule.type === "integer" ? "整数" : "数值"}`,
				{ path },
			);
		}
		if (rule.type === "boolean" && typeof value !== "boolean") {
			throw new ToolError(E.SCHEMA, `参数 ${key} 应为布尔值`, { path });
		}
		if (rule.type === "array") {
			if (!Array.isArray(value)) {
				throw new ToolError(E.SCHEMA, `参数 ${key} 应为数组`, { path });
			}
			if (rule.items?.type === "string") {
				for (const item of value) {
					if (typeof item !== "string") {
						throw new ToolError(E.SCHEMA, `参数 ${key} 的元素应为字符串`, {
							path,
						});
					}
				}
			}
		}
		if (rule.enum && !rule.enum.includes(value as never)) {
			throw new ToolError(
				E.SCHEMA,
				`参数 ${key} 必须是 ${rule.enum.join(" | ")}`,
				{ path },
			);
		}
	}
}

/**
 * 时间点换算：frame 与 sec 二选一，都传报 E_AMBIGUOUS_TIME；
 * frame = round(sec * fps)（统一取整到帧边界）。
 */
export function resolveTimePoint(
	params: ToolParams,
	fps: number,
	frameKey = "frame",
	secKey = "sec",
): number {
	const hasFrame = params[frameKey] !== undefined;
	const hasSec = params[secKey] !== undefined;
	if (hasFrame && hasSec) {
		throw new ToolError(
			E.AMBIGUOUS_TIME,
			`${frameKey} 与 ${secKey} 只能传一个`,
		);
	}
	if (hasFrame) {
		const frame = params[frameKey];
		if (typeof frame !== "number" || !Number.isInteger(frame)) {
			throw new ToolError(E.SCHEMA, `${frameKey} 应为整数`, {
				path: `/${frameKey}`,
			});
		}
		return frame;
	}
	if (hasSec) {
		const sec = params[secKey];
		if (typeof sec !== "number") {
			throw new ToolError(E.SCHEMA, `${secKey} 应为数值`, {
				path: `/${secKey}`,
			});
		}
		return Math.round(sec * fps);
	}
	throw new ToolError(E.SCHEMA, `需要 ${frameKey} 或 ${secKey} 之一`);
}

/** 区间换算：start/end 各自 frame|sec 二选一 */
export function resolveTimeRange(
	params: ToolParams,
	fps: number,
	prefix = "",
): { start: number; end: number } {
	const start = resolveTimePoint(
		params,
		fps,
		`${prefix}startFrame`,
		`${prefix}startSec`,
	);
	const end = resolveTimePoint(
		params,
		fps,
		`${prefix}endFrame`,
		`${prefix}endSec`,
	);
	return { start, end };
}

/* ---------------------------- 命令执行管道 ---------------------------- */

/** 写命令统一入 agent store 当前回合组（do 期间快照层 silent） */
async function runWriteCommand(cmd: EditCommand) {
	const { useAgentState } = await import("@/stores/agent");
	return useAgentState().runCommand(cmd);
}

async function requireContext() {
	const { createCommandContext } = await import("./commandContext");
	const ctx = await createCommandContext();
	if (ctx.trackList.length === 0) {
		throw new ToolError(E.EMPTY_TIMELINE, "时间轴为空，请先导入素材");
	}
	return ctx;
}

/* ------------------------------- 查询类 ------------------------------- */

register({
	name: "query_timeline",
	intent:
		"读取当前时间轴的完整结构：轨道行、每行片段清单、项目总时长、fps、字幕段",
	danger: "query",
	schema: {
		type: "object",
		properties: {},
		additionalProperties: false,
	},
	async execute() {
		const { useTrackState } = await import("@/stores/track");
		const { useSubtitleState } = await import("@/stores/subtitle");
		const { baseFps } = await import("@/data/track");
		const ts = useTrackState();
		const ss = useSubtitleState();
		const durationFrame = ts.trackList.reduce(
			(max, line) => Math.max(max, ...line.list.map((t) => t.end), 0),
			0,
		);
		return {
			durationFrame: Math.floor(durationFrame),
			durationSec: Math.floor(durationFrame) / baseFps,
			fps: baseFps,
			lines: ts.trackList.map((line, lineIndex) => ({
				line: lineIndex,
				type: line.type,
				main: !!line.main,
				clips: line.list.map((t) => ({
					id: t.id,
					name: t.name,
					type: t.type,
					start: t.start,
					end: t.end,
					startSec: t.start / baseFps,
					endSec: t.end / baseFps,
					offsetL: t.offsetL,
					offsetR: t.offsetR,
				})),
			})),
			subtitleSegments: ss.segments.map((seg) => ({
				id: seg.id,
				text: seg.text,
				startFrame: seg.startFrame,
				endFrame: seg.endFrame,
				startSec: seg.startFrame / baseFps,
				endSec: seg.endFrame / baseFps,
			})),
		};
	},
});

register({
	name: "query_segments",
	intent:
		"只读当前字幕段落（含已落轨与仅存在于字幕 store 的段），供改写文字前的寻址",
	danger: "query",
	schema: {
		type: "object",
		properties: {},
		additionalProperties: false,
	},
	async execute() {
		const { useSubtitleState } = await import("@/stores/subtitle");
		const { baseFps } = await import("@/data/track");
		const ss = useSubtitleState();
		return {
			segments: ss.segments.map((seg) => ({
				id: seg.id,
				text: seg.text,
				startFrame: seg.startFrame,
				endFrame: seg.endFrame,
				startSec: seg.startFrame / baseFps,
				endSec: seg.endFrame / baseFps,
			})),
		};
	},
});

/* ------------------------------- 写入类 ------------------------------- */

register({
	name: "split_at",
	intent: "在指定片段的指定帧处切一刀，一段变两段",
	danger: "write",
	schema: {
		type: "object",
		properties: {
			trackId: { type: "string", description: "要分割的片段 id" },
			frame: { type: "integer", description: "分割点（帧），与 sec 二选一" },
			sec: { type: "number", description: "分割点（秒），与 frame 二选一" },
		},
		required: ["trackId"],
		additionalProperties: false,
	},
	async execute(params) {
		assertSchema(toolRegistry.get("split_at")!.schema, params);
		const ctx = await requireContext();
		const frame = resolveTimePoint(params, ctx.fps);
		const ref = findClipInList(ctx.trackList, params.trackId as string);
		if (!ref) {
			throw new ToolError(E.TRACK_NOT_FOUND, `片段 ${params.trackId} 不存在`);
		}
		const cmd = new SplitAtCmd(ctx, {
			trackId: params.trackId as string,
			frame,
		});
		const effect = await runWriteCommand(cmd);
		return { leftId: effect.clipIds[0], rightId: effect.clipIds[1] };
	},
});

register({
	name: "delete_range",
	intent:
		"删除时间区间内所有（或指定轨道的）片段，右侧波纹左移收拢，同步删除/截断字幕段",
	danger: "destructive",
	schema: {
		type: "object",
		properties: {
			startFrame: { type: "integer", description: "区间起点（帧）" },
			endFrame: { type: "integer", description: "区间终点（帧）" },
			startSec: { type: "number", description: "区间起点（秒）" },
			endSec: { type: "number", description: "区间终点（秒）" },
			scope: {
				type: "array",
				items: { type: "string" },
				description: "限定作用的片段 id 列表；缺省 = 全部命中片段",
			},
			ripple: {
				type: "boolean",
				default: true,
				description: "true=波纹收拢；false=留空隙",
			},
		},
		required: ["ripple"],
		additionalProperties: false,
	},
	// 破坏性工具：应用内出口必经确认卡后才允许调用 execute；
	// MCP 出口两段式（NEEDS_CONFIRMATION → confirm:true 重发），见 PHASE2_TOOLS §5
	async execute(params) {
		assertSchema(toolRegistry.get("delete_range")!.schema, params);
		const ctx = await requireContext();
		const { start, end } = resolveTimeRange(params, ctx.fps);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: start,
			endFrame: end,
			scope: params.scope as string[] | undefined,
			ripple: params.ripple as boolean,
		});
		const preview = cmd.preview();
		if (preview.items.length === 0) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				`区间 [${start}, ${end}) 内没有命中任何片段`,
			);
		}
		const effect = await runWriteCommand(cmd);
		return {
			removed: [
				{
					trackId: "*",
					clipIds: effect.clipIds,
					segmentIds: effect.segmentIds ?? [],
				},
			],
			timeSavedSec: (end - start) / ctx.fps,
			summary: effect.summary,
		};
	},
});

register({
	name: "move_segment",
	intent: "把片段平移到新起点（保持时长），可选换到同类型轨道行",
	danger: "write",
	schema: {
		type: "object",
		properties: {
			trackId: { type: "string", description: "要移动的片段 id" },
			startFrame: { type: "integer", description: "新起点（帧）" },
			startSec: { type: "number", description: "新起点（秒）" },
			targetTrackId: {
				type: "string",
				description: "目标行参照片段 id；缺省=原轨，仅接受同 type 轨道行",
			},
		},
		required: ["trackId"],
		additionalProperties: false,
	},
	async execute(params) {
		assertSchema(toolRegistry.get("move_segment")!.schema, params);
		const ctx = await requireContext();
		const start = resolveTimePoint(params, ctx.fps, "startFrame", "startSec");
		const cmd = new MoveSegmentCmd(ctx, {
			trackId: params.trackId as string,
			startFrame: start,
			targetTrackId: params.targetTrackId as string | undefined,
		});
		const effect = await runWriteCommand(cmd);
		return { clipId: effect.clipIds[0], summary: effect.summary };
	},
});

register({
	name: "add_text",
	intent: "新增一段文字（片头标题/花字），落在文字轨上",
	danger: "write",
	schema: {
		type: "object",
		properties: {
			text: { type: "string", maxLength: 60, description: "文字内容" },
			startFrame: { type: "integer", description: "起点（帧）" },
			endFrame: { type: "integer", description: "终点（帧）" },
			startSec: { type: "number", description: "起点（秒）" },
			endSec: { type: "number", description: "终点（秒）" },
		},
		required: ["text"],
		additionalProperties: false,
	},
	async execute(params) {
		assertSchema(toolRegistry.get("add_text")!.schema, params);
		const ctx = await requireContext();
		let start = 0;
		let end = 3 * ctx.fps;
		let usedDefault = false;
		if (
			params.startFrame !== undefined ||
			params.startSec !== undefined ||
			params.endFrame !== undefined ||
			params.endSec !== undefined
		) {
			const range = resolveTimeRange(params, ctx.fps);
			start = range.start;
			end = range.end;
		} else {
			usedDefault = true;
		}
		const cmd = new AddTextCmd(ctx, {
			text: params.text as string,
			startFrame: start,
			endFrame: end,
		});
		const effect = await runWriteCommand(cmd);
		return {
			clipId: effect.clipIds[0],
			startFrame: start,
			endFrame: end,
			usedDefaultTimeRange: usedDefault,
		};
	},
});

register({
	name: "set_segment_text",
	intent: "修改某条字幕的文字（Descript 式改字），不改时长",
	danger: "write",
	schema: {
		type: "object",
		properties: {
			segmentId: { type: "string", description: "字幕段 id" },
			text: { type: "string", maxLength: 200, description: "新文字" },
		},
		required: ["segmentId", "text"],
		additionalProperties: false,
	},
	async execute(params) {
		assertSchema(toolRegistry.get("set_segment_text")!.schema, params);
		const { createCommandContext } = await import("./commandContext");
		const ctx = await createCommandContext();
		const cmd = new UpdateSegmentTextCmd(ctx, {
			segmentId: params.segmentId as string,
			text: params.text as string,
		});
		const effect = await runWriteCommand(cmd);
		return { segmentId: effect.segmentIds?.[0], summary: effect.summary };
	},
});

register({
	name: "export_video",
	intent: "按参数导出 mp4",
	danger: "write",
	schema: {
		type: "object",
		properties: {
			resolution: {
				type: "string",
				enum: ["source", "720p", "1080p"],
				default: "source",
			},
			fps: { type: "integer", enum: [24, 30, 60], default: 30 },
			watermark: { type: "boolean", default: true },
			filename: { type: "string", maxLength: 80 },
		},
		additionalProperties: false,
	},
	async execute(params) {
		assertSchema(toolRegistry.get("export_video")!.schema, params);
		const { useProjectState } = await import("@/stores/project");
		const { useTrackState } = await import("@/stores/track");
		const projectStore = useProjectState();
		const ts = useTrackState();
		if (ts.frameCount <= 0) {
			throw new ToolError(E.EMPTY_TIMELINE, "时间轴为空，没有可导出的内容");
		}
		if (exportBusy) {
			throw new ToolError(E.BUSY, "已有导出进行中");
		}
		exportBusy = true;
		try {
			await projectStore.exportVideo();
		} catch (error) {
			throw new ToolError(
				E.EXPORT_FAILED,
				`导出失败：${error instanceof Error ? error.message : String(error)}`,
			);
		} finally {
			exportBusy = false;
		}
		return {
			ok: true,
			note: "导出完成。resolution/fps 透传待 W10 完整导出重写（当前固定画布尺寸与 baseFps）",
		};
	},
});

let exportBusy = false;

/* ----------------------------- 出口辅助 ----------------------------- */

/** LLM function calling 的 tools 数组（与注册表同源） */
export function buildLLMTools(): Array<{
	type: "function";
	function: { name: string; description: string; parameters: ToolJSONSchema };
}> {
	return [...toolRegistry.values()].map((tool) => ({
		type: "function" as const,
		function: {
			name: tool.name,
			description: tool.intent,
			parameters: tool.schema,
		},
	}));
}

/** tools.json / MCP manifest 形态（name/intent/danger/schema） */
export function toolCatalogJSON() {
	return [...toolRegistry.values()].map((tool) => ({
		name: tool.name,
		intent: tool.intent,
		danger: tool.danger,
		schema: tool.schema,
	}));
}
