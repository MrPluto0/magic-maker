import type { AgentMessage } from "@/class/agentRuntime";
import {
	CONVERSATION_CHAR_BUDGET,
	compactConversation,
	totalChars,
	truncateForContext,
} from "@/class/contextBudget";

const msg = (
	role: AgentMessage["role"],
	content: string,
): AgentMessage => ({ role, content });

const SYSTEM = msg(
	"system",
	"你是 Magic Maker 的视频剪辑 agent。[system prompt 固定头]",
);
const SNAPSHOT = msg("user", "[项目状态快照 · 会话开始时]\n{tracks:[]}");

function turn(i: number, userLen = 200, assistantLen = 100): AgentMessage[] {
	return [
		msg("user", `第${i}个请求：${"u".repeat(userLen)}`),
		{
			role: "assistant",
			content: `第${i}个回复：${"a".repeat(assistantLen)}`,
		},
	];
}

describe("truncateForContext", () => {
	it("短文本原样返回", () => {
		const t = "短结果";
		expect(truncateForContext(t)).toBe(t);
	});

	it("超长文本截断到上限内并带标注", () => {
		const t = "x".repeat(20000);
		const out = truncateForContext(t);
		expect(out.length).toBeLessThan(8200);
		expect(out).toContain("已截断");
		expect(out.startsWith("x")).toBe(true);
	});
});

describe("compactConversation", () => {
	it("预算内原样返回（同一引用语义下内容不变）", () => {
		const conv = [SYSTEM, SNAPSHOT, ...turn(1), ...turn(2)];
		const out = compactConversation(conv, CONVERSATION_CHAR_BUDGET);
		expect(out).toEqual(conv);
	});

	it("超预算：保留 system+快照锚点、压缩中段为摘要、保住最近回合", () => {
		const conv: AgentMessage[] = [SYSTEM, SNAPSHOT];
		// 10 回合 × ~1500 字符 ≈ 15k，远超 4800 测试预算
		for (let i = 1; i <= 10; i += 1) {
			conv.push(...turn(i, 1000, 400));
		}
		const budget = 6000;
		const out = compactConversation(conv, budget);
		// 锚点保留
		expect(out[0].content).toBe(SYSTEM.content);
		expect(out[1].content).toBe(SNAPSHOT.content);
		// 摘要存在且提到历史压缩
		expect(out[2].content).toContain("历史摘要");
		expect(out[2].content).toContain("第1个请求");
		// 总量入预算
		expect(totalChars(out)).toBeLessThanOrEqual(budget);
		// 最近回合完整保留（尾部原消息对象）
		expect(out[out.length - 1].content).toBe(conv[conv.length - 1].content);
		expect(out[out.length - 2].content).toBe(conv[conv.length - 2].content);
	});

	it("预算极小：仍不丢 system，输出不超预算", () => {
		const conv: AgentMessage[] = [SYSTEM, SNAPSHOT, ...turn(1)];
		const out = compactConversation(conv, 300);
		expect(out[0].role).toBe("system");
		expect(totalChars(out)).toBeLessThanOrEqual(300 + 200); // 极端时允许快照级硬截
	});

	it("无快照消息时锚点只有 system", () => {
		const conv: AgentMessage[] = [SYSTEM, ...turn(1), ...turn(2)];
		const out = compactConversation(conv, 600);
		expect(out[0].content).toBe(SYSTEM.content);
		expect(out.some((m) => m.content.startsWith("[项目状态快照"))).toBe(false);
	});
});
