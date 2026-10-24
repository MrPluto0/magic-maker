import { describe, expect, it } from "vitest";
import type { AgentMessage, AgentLLM, ToolRunResult } from "@/class/agentRuntime";
import {
	DEFAULT_MAX_STEPS,
	driveAgentTurn,
	parseToolArguments,
} from "@/class/agentRuntime";

/** 按脚本逐轮返回的假 LLM */
function scriptedLLM(
	script: Array<{ text?: string; toolCalls?: Array<{ id: string; name: string; arguments: string }> }>,
): AgentLLM & { calls: number } {
	let i = 0;
	return {
		calls: 0,
		async chat() {
			this.calls += 1;
			return script[Math.min(i++, script.length - 1)];
		},
	};
}

const okTool = (result: unknown = { ok: 1 }) =>
	async (): Promise<ToolRunResult> => ({ ok: true, result });

describe("driveAgentTurn（function calling 循环护栏）", () => {
	it("纯文本回复 → done 结束", async () => {
		const llm = scriptedLLM([{ text: "已删除 3 段口误，缩短 5.7s" }]);
		const outcome = await driveAgentTurn(
			[],
			llm,
			[],
			okTool(),
		);
		expect(outcome.type).toBe("done");
		expect(outcome.steps).toBe(0);
	});

	it("工具调用后回填结果并继续，最终收尾", async () => {
		const llm = scriptedLLM([
			{ toolCalls: [{ id: "t1", name: "query_timeline", arguments: "{}" }] },
			{ text: "时间轴有 1 条视频轨" },
		]);
		const messages: AgentMessage[] = [];
		const outcome = await driveAgentTurn(messages, llm, [], okTool());
		expect(outcome.type).toBe("done");
		expect(outcome.steps).toBe(1);
		const toolMsg = messages.find((m) => m.role === "tool");
		expect(toolMsg?.tool_call_id).toBe("t1");
		expect(toolMsg?.content).toContain("ok");
	});

	it(`步数上限（${DEFAULT_MAX_STEPS}）：超限强制收尾`, async () => {
		const llm = scriptedLLM([
			{
				toolCalls: [{ id: `t${Math.random()}`, name: "x", arguments: "{}" }],
			},
		]);
		const outcome = await driveAgentTurn(
			[],
			llm,
			[],
			okTool(),
			{},
			{ maxSteps: 3 },
		);
		expect(outcome.type).toBe("max_steps");
		expect(outcome.steps).toBe(3);
	});

	it("同一工具连续失败 2 次 → tool_failed 中断", async () => {
		const llm = scriptedLLM([
			{
				toolCalls: [
					{ id: "a", name: "split_at", arguments: "{}" },
					{ id: "b", name: "split_at", arguments: "{}" },
				],
			},
		]);
		let n = 0;
		const outcome = await driveAgentTurn(
			[],
			llm,
			[],
			async () => {
				n += 1;
				return {
					ok: false,
					error: { code: "E_OUT_OF_RANGE", message: `第${n}次越界` },
				};
			},
			{},
			{ maxSameToolFailures: 2 },
		);
		expect(outcome.type).toBe("tool_failed");
		if (outcome.type === "tool_failed") {
			expect(outcome.tool).toBe("split_at");
			expect(outcome.error.code).toBe("E_OUT_OF_RANGE");
		}
		expect(n).toBe(2);
	});

	it("destructive 确认：循环挂起 awaiting_confirm", async () => {
		const llm = scriptedLLM([
			{
				toolCalls: [
					{ id: "d1", name: "delete_range", arguments: '{"ripple":true}' },
				],
			},
		]);
		const outcome = await driveAgentTurn([], llm, [], async () => ({
			paused: "confirm",
			confirmId: "c1",
		}));
		expect(outcome.type).toBe("awaiting_confirm");
		if (outcome.type === "awaiting_confirm") {
			expect(outcome.confirmId).toBe("c1");
		}
	});

	it("失败后换工具成功 → 失败计数重置，不误中断", async () => {
		const llm = scriptedLLM([
			{ toolCalls: [{ id: "1", name: "split_at", arguments: "{}" }] },
			{ toolCalls: [{ id: "2", name: "query_timeline", arguments: "{}" }] },
			{ toolCalls: [{ id: "3", name: "split_at", arguments: "{}" }] },
			{ text: "已重试成功" },
		]);
		let splitFails = 0;
		const outcome = await driveAgentTurn(
			[],
			llm,
			[],
			async (call) => {
				// split_at 失败一次；换工具成功后 split_at 重试成功
				if (call.name === "split_at" && splitFails === 0) {
					splitFails += 1;
					return {
						ok: false,
						error: { code: "E_OUT_OF_RANGE", message: "越界" },
					};
				}
				return { ok: true, result: {} };
			},
			{},
			{ maxSameToolFailures: 2 },
		);
		// 若失败计数未被 query_timeline 成功重置，第二个 split_at 会误中断
		expect(outcome.type).toBe("done");
		expect(splitFails).toBe(1);
	});

	it("LLM 通道异常 → tool_failed（__llm__）", async () => {
		const llm: AgentLLM = {
			async chat() {
				throw new Error("network down");
			},
		};
		const outcome = await driveAgentTurn([], llm, [], okTool());
		expect(outcome.type).toBe("tool_failed");
		if (outcome.type === "tool_failed") {
			expect(outcome.tool).toBe("__llm__");
			expect(outcome.error.message).toBe("network down");
		}
	});
});

describe("parseToolArguments", () => {
	it("合法 JSON 对象 / 空串 / 非对象 / 非法 JSON", () => {
		expect(parseToolArguments('{"frame":30}')).toEqual({
			ok: true,
			params: { frame: 30 },
		});
		expect(parseToolArguments("")).toEqual({ ok: true, params: {} });
		expect(parseToolArguments("[1]")).toMatchObject({ ok: false });
		expect(parseToolArguments("{bad")).toMatchObject({ ok: false });
	});
});
