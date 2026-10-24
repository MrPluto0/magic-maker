/** 阶段二 agent 对话流类型（docs/PHASE2_DESIGN §2.1 消息结构） */

/** 影响范围：轨道/片段 id 列表 + 帧区间 + 人话摘要（工具卡片渲染用） */
export interface AffectedRange {
	/** 受影响的片段 id（删除类为被删片段） */
	clipIds: string[];
	/** 受影响的字幕段 id */
	segmentIds?: string[];
	/** 帧区间 */
	frameStart?: number;
	frameEnd?: number;
	/** 人话摘要，如「视频主轨 · 3 个片段 · 00:12.3–00:18.0」 */
	summary: string;
}

export interface ToolErrorJSON {
	code: string;
	message: string;
	detail?: Record<string, unknown>;
}

export type ChatEntryKind =
	| "user"
	| "assistant"
	| "tool"
	| "confirm"
	| "system";

interface EntryBase {
	id: string;
	ts: number;
	/** 所属回合组 id（一轮对话 = 一个命令组） */
	groupId?: string;
}

export type ChatEntry =
	| (EntryBase & { kind: "user"; text: string })
	| (EntryBase & {
			kind: "assistant";
			text: string;
			/** 引用其来源工具卡片 */
			refs?: string[];
	  })
	| (EntryBase & {
			kind: "system";
			text: string;
	  })
	| (EntryBase & {
			kind: "tool";
			tool: string;
			params: Record<string, unknown>;
			status: "awaiting_confirm" | "running" | "done" | "failed" | "cancelled";
			affected?: AffectedRange;
			resultSummary?: string;
			error?: ToolErrorJSON;
			progress?: { phase: string; value: number };
	  })
	| (EntryBase & {
			kind: "confirm";
			tool: string;
			params: Record<string, unknown>;
			affected: AffectedRange;
			resolution: "pending" | "approved" | "adjusted" | "rejected";
	  });

/** 回合 = 命令组（PHASE2_DESIGN §2.3） */
export interface CommandGroupInfo {
	id: string;
	ts: number;
	/** 组内命令条数（运行中递增） */
	stepCount: number;
	/** 手操编辑/Cmd+Z 后失效：不可再一键全撤 */
	invalid: boolean;
	/** 已一键全撤 */
	undone: boolean;
}
