import type { AgentMessage } from "@/class/agentRuntime";

/**
 * LLM 上下文预算工具（上下文治理 3/4 · 4/4）。
 *
 * 纯函数、无副作用：截断与压缩都不改原数组，返回新数组。
 * 预算按字符粗估（中文 ≈1 token/字，英文 ≈1 token/4 字符），
 * 不追求精确——目标是「别把窗口撑爆」，不是省到极致。
 */

/** 单条工具结果的字符上限（超过即头尾保留 + 截断标注） */
export const TOOL_RESULT_CHAR_CAP = 8000;

/** 整条 conversation 的字符预算（≈12k token，给回复留足空间） */
export const CONVERSATION_CHAR_BUDGET = 48000;

/** 头部保留长度 / 尾部保留长度（截断时） */
const HEAD_KEEP = 6000;
const TAIL_KEEP = 1500;

export function messageChars(m: AgentMessage): number {
	return typeof m.content === "string" ? m.content.length : 0;
}

export function totalChars(messages: AgentMessage[]): number {
	return messages.reduce((sum, m) => sum + messageChars(m), 0);
}

/** 超长文本头尾截断：保留开头（结构/列表头）与结尾（汇总行通常在尾部） */
export function truncateForContext(
	text: string,
	cap = TOOL_RESULT_CHAR_CAP,
): string {
	if (text.length <= cap) return text;
	const omitted = text.length - HEAD_KEEP - TAIL_KEEP;
	return `${text.slice(0, HEAD_KEEP)}\n…[结果过长，已截断 ${omitted} 字符；如需完整数据请缩小查询范围再调用]…\n${text.slice(-TAIL_KEEP)}`;
}

/** 压缩最老回合：保留 system(+首轮快照) 和最近的尾部，中间回合折成一条摘要 */
export function compactConversation(
	messages: AgentMessage[],
	budget = CONVERSATION_CHAR_BUDGET,
): AgentMessage[] {
	if (totalChars(messages) <= budget) return messages;

	// 头部锚点：system（必留）+ 紧随其后的项目快照 user 消息（若有，必留）
	const anchors: AgentMessage[] = [messages[0]];
	let headEnd = 1;
	if (
		messages[1]?.role === "user" &&
		typeof messages[1].content === "string" &&
		messages[1].content.startsWith("[项目状态快照")
	) {
		anchors.push(messages[1]);
		headEnd = 2;
	}

	// 从尾部往前收集，装得下多少留多少（至少保留最后一条消息）
	const tail: AgentMessage[] = [];
	let tailChars = totalChars(anchors);
	for (let i = messages.length - 1; i >= headEnd; i -= 1) {
		const c = messageChars(messages[i]);
		if (tailChars + c > budget && tail.length > 0) break;
		tail.unshift(messages[i]);
		tailChars += c;
	}

	// 中间被丢弃的回合 → 规则摘要（user 意图 + 最后一条 assistant 文本）
	const middle = messages.slice(headEnd, messages.length - tail.length);
	const userIntents = middle
		.filter((m) => m.role === "user" && !m.content.startsWith("[项目状态快照"))
		.map((m) => `- ${m.content.slice(0, 80)}`);
	const lastAssistant = [...middle]
		.reverse()
		.find((m) => m.role === "assistant" && m.content);
	const summary = [
		`[历史摘要 · ${middle.length} 条早期消息已压缩]`,
		userIntents.length > 0 ? `涉及请求：\n${userIntents.join("\n")}` : "",
		lastAssistant ? `最后结论：${lastAssistant.content.slice(0, 300)}` : "",
		"完整过程不可考；时间轴当前状态可用 query_timeline 查询。",
	]
		.filter(Boolean)
		.join("\n");

	const compacted: AgentMessage[] = [
		...anchors,
		{ role: "user", content: summary },
		...tail,
	];
	// 摘要本身也可能溢出（极端情况）：直接硬截
	return totalChars(compacted) > budget
		? compactConversation(
				[
					anchors[0],
					{ role: "user", content: truncateForContext(summary, budget - 200) },
					...tail,
				],
				budget,
			)
		: compacted;
}
