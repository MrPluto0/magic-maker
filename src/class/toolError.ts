/**
 * 工具/命令层统一错误（PHASE2_TOOLS §0 错误码总表）。
 * code 稳定，可直接回喂 LLM 改路径；message 为人话原因。
 */
export class ToolError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		public readonly detail?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ToolError";
	}

	toJSON() {
		return { code: this.code, message: this.message, detail: this.detail };
	}
}

/** 错误码常量（与 docs/PHASE2_TOOLS.md §错误码总表一一对应） */
export const ToolErrorCode = {
	SCHEMA: "E_SCHEMA",
	AMBIGUOUS_TIME: "E_AMBIGUOUS_TIME",
	TRACK_NOT_FOUND: "E_TRACK_NOT_FOUND",
	EMPTY_TIMELINE: "E_EMPTY_TIMELINE",
	OUT_OF_RANGE: "E_OUT_OF_RANGE",
	OVERLAP: "E_OVERLAP",
	BUSY: "E_BUSY",
	EXPORT_FAILED: "E_EXPORT_FAILED",
	CANCELLED: "E_CANCELLED",
	UNDO_STALE: "E_UNDO_STALE",
	INTERNAL: "E_INTERNAL",
} as const;
