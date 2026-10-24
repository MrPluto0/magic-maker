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
	// keep 随 cap 收缩，保证任意 cap 下输出都 ≤ cap（小预算压缩时防递归爆栈）
	const keep = Math.max(
		0,
		Math.floor((cap - 40) / 2), // 40 ≈ 截断标注长度上限
	);
	const omitted = text.length - keep * 2;
	const note = `…[结果过长，已截断 ${omitted} 字符；如需完整数据请缩小查询范围再调用]…`;
	return `${text.slice(0, keep)}${note}${text.slice(-keep)}`;
}

/** 从候选消息构建规则摘要（user 意图 + 最后一条 assistant 文本） */
function buildSummary(middle: AgentMessage[]): string {
	const userIntents = middle
		.filter(
			(m) =>
				m.role === "user" &&
				!m.content.startsWith("[项目状态快照") &&
				!m.content.startsWith("[历史摘要"),
		)
		.map((m) => `- ${m.content.slice(0, 80)}`);
	const lastAssistant = [...middle]
		.reverse()
		.find((m) => m.role === "assistant" && m.content);
	return [
		`[历史摘要 · ${middle.length} 条早期消息已压缩]`,
		userIntents.length > 0 ? `涉及请求：\n${userIntents.join("\n")}` : "",
		lastAssistant ? `最后结论：${lastAssistant.content.slice(0, 300)}` : "",
		"完整过程不可考；时间轴当前状态可用 query_timeline 查询。",
	]
		.filter(Boolean)
		.join("\n");
}

/** 压缩最老回合：保留 system(+首轮快照) 和最近的尾部，中间回合折成一条摘要。
 * 迭代实现（无递归），任意输入下终止且输出 ≤ 预算（±截断标注的少量字符）。 */
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
	const anchorChars = totalChars(anchors);
	const rest = messages.slice(headEnd);

	// 从尾部往前收集，装得下多少留多少；最后一条消息无论如何保留
	const tail: AgentMessage[] = [];
	let tailChars = 0;
	for (let i = rest.length - 1; i >= 0; i -= 1) {
		const c = messageChars(rest[i]);
		if (anchorChars + tailChars + c > budget && tail.length > 0) break;
		tail.unshift(rest[i]);
		tailChars += c;
	}
	let middle = rest.slice(0, rest.length - tail.length);

	// 无中段可压（尾部自身超预算）：尾部逐条硬截到均摊额度
	if (middle.length === 0) {
		const per = Math.max(50, Math.floor((budget - anchorChars) / tail.length));
		return [
			...anchors,
			...tail.map((m) => ({
				...m,
				content: truncateForContext(String(m.content), per),
			})),
		];
	}

	// 摘要预算不足时，把尾部最老的消息往中段挪（保底留最后一条）
	let summaryBudget = budget - anchorChars - tailChars;
	while (summaryBudget < 80 && tail.length > 1) {
		const dropped = tail.shift();
		if (!dropped) break;
		middle = [dropped, ...middle];
		tailChars -= messageChars(dropped);
		summaryBudget = budget - anchorChars - tailChars;
	}
	summaryBudget = Math.max(40, summaryBudget);

	const summaryMsg: AgentMessage = {
		role: "user",
		content: truncateForContext(buildSummary(middle), summaryBudget),
	};
	const out: AgentMessage[] = [...anchors, summaryMsg, ...tail];

	// 终检兜底：仍超预算（锚点+尾部本身就装不下）→ 除 system 外逐条均摊硬截
	if (totalChars(out) > budget) {
		const restOut = out.slice(1);
		const per = Math.max(
			50,
			Math.floor((budget - anchorChars) / restOut.length),
		);
		return [
			anchors[0],
			...restOut.map((m) => ({
				...m,
				content: truncateForContext(String(m.content), per),
			})),
		];
	}
	return out;
}
