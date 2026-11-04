import { reactive } from "vue";

/**
 * 长耗时工具的运行进度登记（W6：transcribe 转写工具卡 running 态进度条）。
 *
 * 工具 execute 内发布进度，AgentToolCard 按 entry.tool 读取渲染。
 * 以工具名为键——同类工具同时只允许一个在跑（工具自身有 busy 守卫）。
 */
export interface ToolProgress {
	phase: string;
	/** 0..1；-1 = 不确定进度（仅相位提示） */
	value: number;
	note?: string;
}

export const activeToolProgress = reactive<
	Record<string, ToolProgress | undefined>
>({});

export function setToolProgress(
	tool: string,
	progress: ToolProgress | undefined,
) {
	activeToolProgress[tool] = progress;
}

export function clearToolProgress(tool: string) {
	activeToolProgress[tool] = undefined;
}
