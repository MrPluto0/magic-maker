import type { ToolParams } from "./agentTools";
import { ToolError } from "./toolError";

/**
 * agent 运行时循环（docs/PHASE2_DESIGN §2.2 / §4）。
 *
 * 纯函数实现（不 import pinia/vue）：LLM、工具执行、确认裁决全部注入，
 * Vitest 用假 LLM（按脚本返回 tool_calls）测护栏——步数上限、schema 重试、
 * confirm 阻塞。store 层（stores/agent.ts）只做状态落账与 BYOK 通道。
 */

/** LLM 消息（OpenAI 兼容协议子集） */
export interface AgentMessage {
	role: "system" | "user" | "assistant" | "tool";
	content?: string | null;
	tool_calls?: Array<{
		id: string;
		type: "function";
		function: { name: string; arguments: string };
	}>;
	tool_call_id?: string;
}

/** BYOK 通道接口：由 OpenAI 兼容客户端实现 */
export interface AgentLLM {
	chat(
		messages: AgentMessage[],
		tools: LLMToolSpec[],
	): Promise<{
		text?: string;
		toolCalls?: Array<{ id: string; name: string; arguments: string }>;
	}>;
}

export interface LLMToolSpec {
	type: "function";
	function: { name: string; description: string; parameters: unknown };
}

/** 工具执行结果（store 注入，含确认挂起语义） */
export type ToolRunResult =
	| { ok: true; result: unknown }
	| { ok: false; error: { code: string; message: string; detail?: object } }
	/** destructive 等待用户裁决：循环挂起，裁决后由 store resume */
	| { paused: "confirm"; confirmId: string };

export interface TurnHooks {
	/** 每次工具调用前回调（store 落账 tool 卡片） */
	onToolCall?: (call: { id: string; name: string; arguments: string }) => void;
	/** assistant 文本产出回调 */
	onAssistantText?: (text: string) => void;
}

export interface TurnOptions {
	maxSteps?: number;
	/** 同一工具连续失败多少次后中断该工具 */
	maxSameToolFailures?: number;
}

export const DEFAULT_MAX_STEPS = 12;

export type TurnOutcome =
	| { type: "done"; messages: AgentMessage[]; steps: number }
	| { type: "max_steps"; messages: AgentMessage[]; steps: number }
	| { type: "awaiting_confirm"; messages: AgentMessage[]; confirmId: string }
	| {
			type: "tool_failed";
			messages: AgentMessage[];
			steps: number;
			tool: string;
			error: { code: string; message: string };
	  };

interface ToolFailureTrack {
	lastTool: string;
	count: number;
}

/**
 * 驱动一轮对话循环（可在 confirm 处暂停，resume 时以相同 messages 续跑）。
 */
export async function driveAgentTurn(
	messages: AgentMessage[],
	llm: AgentLLM,
	tools: LLMToolSpec[],
	executeTool: (call: {
		id: string;
		name: string;
		arguments: string;
	}) => Promise<ToolRunResult>,
	hooks: TurnHooks = {},
	options: TurnOptions = {},
): Promise<TurnOutcome> {
	const maxSteps = options.maxSteps ?? DEFAULT_MAX_STEPS;
	const maxSameToolFailures = options.maxSameToolFailures ?? 2;
	let steps = 0;
	let failures: ToolFailureTrack = { lastTool: "", count: 0 };

	for (;;) {
		if (steps >= maxSteps) {
			return { type: "max_steps", messages, steps };
		}
		let response: Awaited<ReturnType<AgentLLM["chat"]>>;
		try {
			response = await llm.chat(messages, tools);
		} catch (error) {
			return {
				type: "tool_failed",
				messages,
				steps,
				tool: "__llm__",
				error: {
					code: "E_LLM_CHANNEL",
					message: error instanceof Error ? error.message : String(error),
				},
			};
		}

		if (response.text && !response.toolCalls?.length) {
			hooks.onAssistantText?.(response.text);
			messages.push({ role: "assistant", content: response.text });
			return { type: "done", messages, steps };
		}

		if (!response.toolCalls?.length) {
			// 无文本无调用：要求收尾
			messages.push({ role: "assistant", content: "" });
			return { type: "done", messages, steps };
		}

		messages.push({
			role: "assistant",
			content: response.text ?? null,
			tool_calls: response.toolCalls.map((call) => ({
				id: call.id,
				type: "function" as const,
				function: { name: call.name, arguments: call.arguments },
			})),
		});

		for (const call of response.toolCalls) {
			if (steps >= maxSteps) {
				return { type: "max_steps", messages, steps };
			}
			steps += 1;
			hooks.onToolCall?.(call);
			const outcome = await executeTool(call);

			if ("paused" in outcome) {
				return {
					type: "awaiting_confirm",
					messages,
					confirmId: outcome.confirmId,
				};
			}

			if (outcome.ok) {
				failures = { lastTool: "", count: 0 };
				messages.push({
					role: "tool",
					tool_call_id: call.id,
					content: JSON.stringify(outcome.result),
				});
				continue;
			}
			const failure = outcome as Extract<
				ToolRunResult,
				{ ok: false; error: { code: string; message: string } }
			>;
			messages.push({
				role: "tool",
				tool_call_id: call.id,
				content: JSON.stringify(failure.error),
			});
			// 同一工具连续失败 N 次 → 中断，把问题交还用户
			if (call.name === failures.lastTool) {
				failures.count += 1;
			} else {
				failures = { lastTool: call.name, count: 1 };
			}
			if (failures.count >= maxSameToolFailures) {
				return {
					type: "tool_failed",
					messages,
					steps,
					tool: call.name,
					error: failure.error,
				};
			}
		}
	}
}

/** 解析 LLM 返回的 arguments JSON（非法时回 E_SCHEMA 形态错误） */
export function parseToolArguments(
	argumentsText: string,
): { ok: true; params: ToolParams } | { ok: false; message: string } {
	if (!argumentsText || argumentsText.trim() === "") {
		return { ok: true, params: {} };
	}
	try {
		const parsed = JSON.parse(argumentsText);
		if (
			typeof parsed !== "object" ||
			parsed === null ||
			Array.isArray(parsed)
		) {
			return { ok: false, message: "arguments 必须是 JSON 对象" };
		}
		return { ok: true, params: parsed as ToolParams };
	} catch {
		return { ok: false, message: "arguments 不是合法 JSON" };
	}
}

/** 工具执行错误 → 回喂 LLM 的结构 */
export function toolErrorPayload(error: unknown) {
	if (error instanceof ToolError) {
		return error.toJSON();
	}
	return {
		code: "E_INTERNAL",
		message: error instanceof Error ? error.message : String(error),
	};
}
