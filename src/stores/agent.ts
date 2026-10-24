import { nanoid } from "nanoid";
import OpenAI from "openai";
import { defineStore } from "pinia";
import { ref } from "vue";
import type {
	AgentLLM,
	AgentMessage,
	LLMToolSpec,
	ToolRunResult,
} from "@/class/agentRuntime";
import {
	DEFAULT_MAX_STEPS,
	driveAgentTurn,
	parseToolArguments,
	toolErrorPayload,
} from "@/class/agentRuntime";
import type { ToolParams } from "@/class/agentTools";
import { buildLLMTools, toolRegistry } from "@/class/agentTools";
import type { CommandEffect, EditCommand } from "@/class/commands";
import { DeleteRangeCmd } from "@/class/commands";
import {
	beginSilentBatch,
	endSilentBatch,
	onUserEdit,
} from "@/plugins/undoGate";
import type { ChatEntry, CommandGroupInfo } from "@/types/agent";
import { usePageState } from "./page";

/**
 * agent 对话 store（docs/PHASE2_DESIGN §2 / §4）。
 *
 * - 回合（turn）= 命令组：一次发送到 agent 收尾之间的全部写命令记入同一组，
 *   一键全撤 = 反序执行组内 undo；
 * - 命令 do/undo 期间快照层 silent（undoGate），组收尾/组撤销后推组级快照
 *   （trackStore._snap()），双层 undo 语义不分裂；
 * - 手操编辑 / Cmd+Z 触发 undoGate.onUserEdit → 未决命令组失效。
 *
 * LLM 通道：BYOK，OpenAI 兼容协议（baseURL/model/key 走设置面板），
 * function calling 的 tools 数组直接来自工具注册表。
 * system prompt 版本：w5.1（实测调优结论回写 docs/PHASE2_TOOLS.md §10）。
 */
export const AGENT_PROMPT_VERSION = "w5.1";

export const useAgentState = defineStore("agent", () => {
	const pageStore = usePageState();

	const entries = ref<ChatEntry[]>([]);
	const groups = ref<CommandGroupInfo[]>([]);
	const runningTurn = ref<{
		groupId: string;
		stepCount: number;
		pendingConfirm?: string;
	} | null>(null);

	// 回合内的命令引用（不序列化，进程内存活）
	const groupCommands = new Map<string, EditCommand[]>();
	// LLM 对话历史（含 tool_call 完整链，跨回合续用）
	let conversation: AgentMessage[] = [];
	let activeLLM: AgentLLM | null = null;
	let pendingConfirm: {
		confirmId: string;
		call: { id: string; name: string; arguments: string };
		toolEntryId: string;
	} | null = null;

	/* ------------------------------ 基础落账 ------------------------------ */

	type DistributedOmit<T, K extends PropertyKey> = T extends unknown
		? Omit<T, K>
		: never;
	type NewChatEntry = DistributedOmit<ChatEntry, "id" | "ts"> & {
		id?: string;
	};

	function pushEntry(entry: NewChatEntry): ChatEntry {
		const full = {
			id: entry.id ?? nanoid(),
			ts: Date.now(),
			...entry,
		} as ChatEntry;
		entries.value.push(full);
		// 返回 reactive 代理：后续 status/resultSummary 原地更新必须触发渲染
		return entries.value[entries.value.length - 1];
	}

	function findEntry(id: string) {
		return entries.value.find((e) => e.id === id);
	}

	function ensureGroup(): CommandGroupInfo {
		if (runningTurn.value) {
			return groups.value.find((g) => g.id === runningTurn.value!.groupId)!;
		}
		const group: CommandGroupInfo = {
			id: nanoid(8),
			ts: Date.now(),
			stepCount: 0,
			invalid: false,
			undone: false,
		};
		groups.value.push(group);
		groupCommands.set(group.id, []);
		runningTurn.value = { groupId: group.id, stepCount: 0 };
		return group;
	}

	/* --------------------- 命令执行（双层 undo 协调） --------------------- */

	/** 命令统一入口：do 期间快照层 silent，命令入当前回合组 */
	async function runCommand(cmd: EditCommand): Promise<CommandEffect> {
		const group = ensureGroup();
		beginSilentBatch();
		try {
			const effect = await cmd.do();
			group.stepCount += 1;
			if (runningTurn.value) {
				runningTurn.value.stepCount = group.stepCount;
			}
			groupCommands.get(group.id)?.push(cmd);
			return effect;
		} finally {
			endSilentBatch();
		}
	}

	/** 组收尾：推组级快照（Cmd+Z 粒度 = 整组） */
	async function endTurn() {
		if (!runningTurn.value) return;
		const hasCommands =
			(groupCommands.get(runningTurn.value.groupId) ?? []).length > 0;
		if (hasCommands) {
			const { useTrackState } = await import("./track");
			useTrackState()._snap();
		}
		runningTurn.value = null;
		pendingConfirm = null;
	}

	/** 一键全撤：反序执行组内 undo，随后推组级快照固化撤销结果 */
	async function undoCurrentGroup(): Promise<boolean> {
		const group = [...groups.value]
			.reverse()
			.find((g) => g.stepCount > 0 && !g.undone);
		if (!group) return false;
		const cmds = groupCommands.get(group.id) ?? [];
		if (group.invalid) {
			pushEntry({
				kind: "system",
				text: "该回合已被手动编辑覆盖，无法精确撤销——用 Cmd+Z 回退到组级快照。",
				groupId: group.id,
			});
			return false;
		}
		beginSilentBatch();
		try {
			for (const cmd of [...cmds].reverse()) {
				await cmd.undo();
			}
		} catch (error) {
			const payload = toolErrorPayload(error);
			pushEntry({
				kind: "system",
				text: `撤销失败（${payload.code}）：${payload.message} 可用 Cmd+Z 回退到组级快照。`,
				groupId: group.id,
			});
			return false;
		} finally {
			endSilentBatch();
		}
		group.undone = true;
		const { useTrackState } = await import("./track");
		useTrackState()._snap();
		pushEntry({
			kind: "system",
			text: `已撤销本回合全部 ${cmds.length} 步操作。`,
			groupId: group.id,
		});
		return true;
	}

	// 手操编辑 / Cmd+Z：使所有未决命令组失效（inverse 引用的 id 可能已不存在）
	onUserEdit(() => {
		for (const group of groups.value) {
			if (!group.undone) {
				group.invalid = true;
			}
		}
	});

	/* --------------------------- 工具执行管道 --------------------------- */

	function toolEntryForCall(
		call: { id: string; name: string; arguments: string },
		params: ToolParams,
	) {
		const groupId = runningTurn.value?.groupId;
		return pushEntry({
			id: `tool_${call.id}`,
			kind: "tool",
			tool: call.name,
			params,
			status: "running",
			groupId,
		});
	}

	/** 预览破坏性操作的影响范围（确认卡渲染用） */
	async function previewDestructive(name: string, params: ToolParams) {
		if (name !== "delete_range") {
			return undefined;
		}
		const { createCommandContext } = await import("@/class/commandContext");
		const ctx = await createCommandContext();
		const { resolveTimeRange } = await import("@/class/agentTools");
		try {
			const { start, end } = resolveTimeRange(params, ctx.fps);
			const preview = new DeleteRangeCmd(ctx, {
				startFrame: start,
				endFrame: end,
				scope: params.scope as string[] | undefined,
				ripple: params.ripple as boolean,
			}).preview();
			return {
				clipIds: preview.items.map((item) => item.clipId),
				removedItems: preview.items.map((item) => ({
					name: item.name,
					start: item.start,
					end: item.end,
				})),
				frameStart: start,
				frameEnd: end,
				summary: `删除 ${preview.items.length} 个片段 · ${preview.segmentCount} 条字幕段 · 缩短 ${(preview.timeSavedFrame / ctx.fps).toFixed(1)}s`,
			};
		} catch {
			return undefined;
		}
	}

	/** 执行工具（已过确认关）：落账卡片并返回结果/错误 */
	async function runToolNow(call: {
		id: string;
		name: string;
		arguments: string;
	}): Promise<Exclude<ToolRunResult, { paused: "confirm" }>> {
		const tool = toolRegistry.get(call.name);
		const parsed = parseToolArguments(call.arguments);
		// tsconfig strict:false 下布尔字面量判别式不做真值收窄，用全等比较
		if (parsed.ok === false) {
			return {
				ok: false,
				error: { code: "E_SCHEMA", message: parsed.message },
			};
		}
		if (!tool) {
			return {
				ok: false,
				error: { code: "E_SCHEMA", message: `未知工具 ${call.name}` },
			};
		}
		const entry =
			findEntry(`tool_${call.id}`) ?? toolEntryForCall(call, parsed.params);
		if (entry.kind === "tool") {
			entry.status = "running";
			entry.params = parsed.params;
		}
		try {
			const result = await tool.execute(parsed.params);
			if (entry.kind === "tool") {
				entry.status = "done";
				entry.resultSummary =
					typeof result === "object" && result !== null && "summary" in result
						? String((result as { summary: unknown }).summary)
						: `${call.name} 完成`;
			}
			return { ok: true, result };
		} catch (error) {
			const payload = toolErrorPayload(error);
			if (entry.kind === "tool") {
				entry.status = "failed";
				entry.error = payload;
			}
			return { ok: false, error: payload };
		}
	}

	/** LLM 循环注入的工具执行器：destructive 先出确认卡并挂起循环 */
	async function executeToolCall(call: {
		id: string;
		name: string;
		arguments: string;
	}): Promise<ToolRunResult> {
		const tool = toolRegistry.get(call.name);
		const parsed = parseToolArguments(call.arguments);
		if (parsed.ok === false) {
			return {
				ok: false,
				error: { code: "E_SCHEMA", message: parsed.message },
			};
		}
		if (!tool) {
			return {
				ok: false,
				error: { code: "E_SCHEMA", message: `未知工具 ${call.name}` },
			};
		}
		const groupId = runningTurn.value?.groupId;
		if (tool.danger === "destructive" && !parsed.params.confirmed) {
			const affected = (await previewDestructive(call.name, parsed.params)) ?? {
				clipIds: [],
				summary: "影响范围未知",
			};
			pushEntry({
				id: `tool_${call.id}`,
				kind: "tool",
				tool: call.name,
				params: parsed.params,
				status: "awaiting_confirm",
				groupId,
			});
			const confirmId = nanoid(8);
			pushEntry({
				id: confirmId,
				kind: "confirm",
				tool: call.name,
				params: parsed.params,
				affected,
				resolution: "pending",
				groupId,
			});
			pendingConfirm = { confirmId, call, toolEntryId: `tool_${call.id}` };
			if (runningTurn.value) {
				runningTurn.value.pendingConfirm = confirmId;
			}
			return { paused: "confirm", confirmId };
		}
		// confirmed 的破坏性调用：把 confirm 卡标记为 approved
		if (tool.danger === "destructive" && parsed.params.confirmed) {
			const confirm = entries.value.find(
				(e) =>
					e.kind === "confirm" &&
					e.tool === call.name &&
					e.resolution === "pending",
			);
			if (confirm && confirm.kind === "confirm") {
				confirm.resolution = "approved";
			}
			const { confirmed: _drop, ...rest } = parsed.params;
			parsed.params = rest;
		}
		return runToolNow(call);
	}

	/** 面板确认卡裁决。approved 后继续 LLM 循环（若该回合来自 LLM）。 */
	async function resolveConfirm(confirmId: string, approved: boolean) {
		const confirm = findEntry(confirmId);
		if (
			!confirm ||
			confirm.kind !== "confirm" ||
			confirm.resolution !== "pending"
		) {
			return;
		}
		confirm.resolution = approved ? "approved" : "rejected";
		const pending = pendingConfirm;
		if (!pending || pending.confirmId !== confirmId) {
			return;
		}
		const toolEntry = findEntry(pending.toolEntryId);
		if (approved) {
			if (toolEntry && toolEntry.kind === "tool") {
				toolEntry.status = "running";
			}
			const result = await runToolNow(pending.call);
			const resultPayload = result.ok === true ? result.result : result.error;
			conversation.push({
				role: "tool",
				tool_call_id: pending.call.id,
				content: JSON.stringify(resultPayload),
			});
			if (runningTurn.value) {
				runningTurn.value.pendingConfirm = undefined;
			}
			pendingConfirm = null;
			await continueTurn();
		} else {
			if (toolEntry && toolEntry.kind === "tool") {
				toolEntry.status = "cancelled";
				toolEntry.error = { code: "E_CANCELLED", message: "用户拒绝了该操作" };
			}
			conversation.push({
				role: "tool",
				tool_call_id: pending.call.id,
				content: JSON.stringify({
					code: "E_CANCELLED",
					message: "用户在确认卡拒绝了该操作，请换方案或询问用户",
				}),
			});
			if (runningTurn.value) {
				runningTurn.value.pendingConfirm = undefined;
			}
			pendingConfirm = null;
			await continueTurn();
		}
	}

	/* ----------------------------- LLM 通道 ----------------------------- */

	function createByokLlm(settings: {
		apiKey: string;
		baseUrl: string;
		textModel: string;
	}): AgentLLM {
		const client = new OpenAI({
			dangerouslyAllowBrowser: true,
			apiKey: settings.apiKey,
			// 空 baseURL = 站内 /api 代理（与 OpenAIService 同约定）
			baseURL: settings.baseUrl || location.origin + "/api",
		});
		return {
			async chat(messages, tools) {
				// 网络失败指数退避重试 2 次（§2.5）
				let lastError: unknown;
				for (let attempt = 0; attempt < 3; attempt++) {
					try {
						const res = await client.chat.completions.create({
							model: settings.textModel,
							messages: messages as never,
							tools: tools as never,
						});
						const msg = res.choices[0]?.message;
						return {
							text: msg?.content ?? undefined,
							toolCalls: msg?.tool_calls?.map((t) => {
								const fn = (
									t as unknown as {
										function: { name: string; arguments: string };
									}
								).function;
								return {
									id: t.id,
									name: fn.name,
									arguments: fn.arguments,
								};
							}),
						};
					} catch (error) {
						lastError = error;
						if (attempt < 2) {
							await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
						}
					}
				}
				throw lastError;
			},
		};
	}

	async function buildSystemMessage(): Promise<AgentMessage> {
		const { baseFps } = await import("@/data/track");
		const toolsSummary = [...toolRegistry.values()]
			.map(
				(t) =>
					`- ${t.name}（${t.danger}）：${t.intent} 参数：${JSON.stringify(t.schema)}`,
			)
			.join("\n");
		let project = "（空项目）";
		try {
			const query = toolRegistry.get("query_timeline");
			if (query) {
				project = JSON.stringify(await query.execute({}));
			}
		} catch {
			project = "（项目状态读取失败）";
		}
		return {
			role: "system",
			content: [
				"你是 Magic Maker 的视频剪辑 agent。Magic Maker 是浏览器本地口播视频剪辑器，你通过调用工具操作用户的时间轴。素材与时间轴数据全部在用户浏览器本地，你只能通过工具返回值了解项目。",
				"",
				"# 工具（只能调用下列工具，不得假设清单之外的能力）",
				toolsSummary,
				"",
				`# 当前项目状态（回合开始时快照，fps=${baseFps}）`,
				project,
				"",
				"# 工作规则",
				"1. 先看再动：首次操作前必须 query_timeline；涉及字幕先 query_segments。禁止凭记忆操作——每次编辑后 id 与时间会变。",
				"2. sec 与 frame 换算：frame = round(sec * fps)。时间参数优先用 sec。",
				"3. delete_range 执行前先向用户口头说明准备删什么、预计缩短多少；用户拒绝后不要换个区间重试同一意图。",
				"4. 一次只推进一个明确目标；复杂任务先输出分步计划再逐步执行。",
				"5. trackId/segmentId 一律来自工具返回值，禁止编造。",
				"6. E_SCHEMA/E_OUT_OF_RANGE 修正参数重试；同一工具连续失败 2 次停下向用户说明；E_EXPORT_FAILED/E_INTERNAL 不重试。",
				"7. 完成后报告做了什么（时间码）、时间轴变化，并建议用户导出。",
				"",
				"# 语气",
				"简洁、工程化、不寒暄。所有时间引用使用 mm:ss.s 格式。",
			].join("\n"),
		};
	}

	/** 续跑/收尾当前 LLM 回合 */
	async function continueTurn() {
		if (!activeLLM || !runningTurn.value) {
			await endTurn();
			return;
		}
		const remaining = DEFAULT_MAX_STEPS - runningTurn.value.stepCount;
		const outcome = await driveAgentTurn(
			conversation,
			activeLLM,
			buildLLMTools() as LLMToolSpec[],
			executeToolCall,
			{},
			{ maxSteps: Math.max(remaining, 1) },
		);
		if (outcome.type === "done") {
			const last = [...conversation]
				.reverse()
				.find((m) => m.role === "assistant" && m.content);
			if (last?.content) {
				pushEntry({
					kind: "assistant",
					text: last.content,
					groupId: runningTurn.value.groupId,
				});
			}
			await endTurn();
			return;
		}
		if (outcome.type === "max_steps") {
			// 强制收尾：让 LLM 无工具总结
			conversation.push({
				role: "user",
				content: "工具调用步数已达上限，请立即总结当前进展并停止调用工具。",
			});
			try {
				const summary = await activeLLM.chat(conversation, []);
				pushEntry({
					kind: "assistant",
					text: summary.text ?? "（本回合作步数上限收尾）",
					groupId: runningTurn.value.groupId,
				});
			} catch {
				pushEntry({
					kind: "system",
					text: "回合步数达上限，已停止执行。",
					groupId: runningTurn.value.groupId,
				});
			}
			await endTurn();
			return;
		}
		if (outcome.type === "tool_failed") {
			pushEntry({
				kind: "system",
				text: `工具 ${outcome.tool} 连续失败已中断（${outcome.error.code}）：${outcome.error.message}`,
				groupId: runningTurn.value.groupId,
			});
			await endTurn();
			return;
		}
		// awaiting_confirm：循环挂起等用户裁决，不收尾
	}

	/** 用户发送：构造消息并驱动 LLM 循环 */
	async function send(text: string) {
		const trimmed = text.trim();
		if (!trimmed) return;
		pushEntry({ kind: "user", text: trimmed });
		if (!pageStore.aiSettings.apiKey) {
			pushEntry({
				kind: "system",
				text: "尚未配置 API Key：请到「AI 设置」填写 Key 与模型 ID（BYOK，OpenAI 兼容协议）。填好后即可对话；不填也可以在下方手动触发工具。",
			});
			return;
		}
		activeLLM = createByokLlm(pageStore.aiSettings);
		const system = await buildSystemMessage();
		if (conversation.length === 0) {
			conversation.push(system);
		} else {
			conversation[0] = system;
		}
		conversation.push({ role: "user", content: trimmed });
		await continueTurn();
	}

	/** 手动触发工具（无需 LLM）：走同一执行管道（含确认卡） */
	async function manualRunTool(name: string, params: ToolParams) {
		const tool = toolRegistry.get(name);
		if (!tool) {
			pushEntry({ kind: "system", text: `未知工具 ${name}` });
			return;
		}
		const call = {
			id: nanoid(8),
			name,
			arguments: JSON.stringify(params ?? {}),
		};
		ensureGroup();
		if (tool.danger === "destructive") {
			const affected = (await previewDestructive(name, params)) ?? {
				clipIds: [],
				summary: "影响范围未知",
			};
			pushEntry({
				id: `tool_${call.id}`,
				kind: "tool",
				tool: name,
				params,
				status: "awaiting_confirm",
				groupId: runningTurn.value?.groupId,
			});
			const confirmId = nanoid(8);
			pushEntry({
				id: confirmId,
				kind: "confirm",
				tool: name,
				params,
				affected,
				resolution: "pending",
				groupId: runningTurn.value?.groupId,
			});
			pendingConfirm = {
				confirmId,
				call,
				toolEntryId: `tool_${call.id}`,
			};
			return;
		}
		pushEntry({ kind: "user", text: `手动执行工具 ${name}` });
		await runToolNow(call);
		await endTurn();
	}

	/** 面板失败卡片「重试」：原参数重跑 */
	async function retryTool(entryId: string) {
		const entry = findEntry(entryId);
		if (!entry || entry.kind !== "tool") return;
		await manualRunTool(entry.tool, entry.params);
		// 复用原卡片：手动重跑会落新卡片，原卡保持 failed 留痕
	}

	function newSession() {
		entries.value = [];
		conversation = [];
		activeLLM = null;
		runningTurn.value = null;
		pendingConfirm = null;
	}

	return {
		entries,
		groups,
		runningTurn,
		toolNames: [...toolRegistry.keys()] as string[],
		send,
		manualRunTool,
		retryTool,
		resolveConfirm,
		runCommand,
		undoCurrentGroup,
		endTurn,
		newSession,
	};
});
