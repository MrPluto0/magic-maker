import { describe, expect, it } from "vitest";
import {
	cleanText,
	fixCollapsedTimestamps,
	formatTranscript,
	mergeFragments,
	postprocessTranscription,
	splitLongSegments,
} from "../src/utils/subtitlePost";

describe("cleanText", () => {
	it("压缩空白并去首尾", () => {
		expect(cleanText("  你好   世界  ")).toBe("你好 世界");
	});
});

describe("规则①：碎段合并（<2s 且不成句 → 并入前段）", () => {
	it("短碎段并入前段，时间取并集", () => {
		const out = mergeFragments([
			{ text: "今天我们", startSec: 0, endSec: 1.2 },
			{ text: "聊聊字幕", startSec: 1.3, endSec: 2.8 },
		]);
		expect(out).toHaveLength(1);
		expect(out[0].text).toBe("今天我们聊聊字幕");
		expect(out[0].startSec).toBe(0);
		expect(out[0].endSec).toBe(2.8);
	});

	it("前段以句末标点收尾则不并", () => {
		const out = mergeFragments([
			{ text: "完成了。", startSec: 0, endSec: 1.0 },
			{ text: "下一段", startSec: 1.1, endSec: 1.6 },
		]);
		expect(out).toHaveLength(2);
	});

	it("英文拼接补空格", () => {
		const out = mergeFragments([
			{ text: "hello", startSec: 0, endSec: 0.8 },
			{ text: "world", startSec: 0.9, endSec: 1.5 },
		]);
		expect(out[0].text).toBe("hello world");
	});

	it("间隔过大（>1.5s）不并", () => {
		const out = mergeFragments([
			{ text: "前一句", startSec: 0, endSec: 1 },
			{ text: "后一句", startSec: 3, endSec: 4 },
		]);
		expect(out).toHaveLength(2);
	});
});

describe("规则②：长段切分（>8s 在逗号处）", () => {
	it("12s 三逗号段切成多段，时间按字符占比内插", () => {
		const text = "第一部分内容，第二部分内容，第三部分内容，第四部分收尾";
		const out = splitLongSegments([{ text, startSec: 0, endSec: 12 }]);
		expect(out.length).toBeGreaterThanOrEqual(3);
		expect(out[0].text).toBe("第一部分内容，");
		// 首段时长约 = 7/25*12 ≈ 3.4s（标点计入字符占比）
		expect(out[0].endSec).toBeGreaterThan(2);
		expect(out[0].endSec).toBeLessThan(5);
		// 段间时间连续（不重叠、不留大缝）
		for (let i = 1; i < out.length; i++) {
			expect(out[i].startSec).toBeCloseTo(out[i - 1].endSec, 5);
		}
		// 文本无损拼接
		expect(out.map((s) => s.text).join("")).toBe(text);
	});

	it("≤8s 不切", () => {
		const out = splitLongSegments([
			{ text: "短段，不切", startSec: 0, endSec: 6 },
		]);
		expect(out).toHaveLength(1);
	});
});

describe("完整管线 postprocessTranscription", () => {
	it("碎段合并 + 最小段宽 0.6s 兜底 + 帧化（fps=30）", () => {
		const out = postprocessTranscription(
			[
				{ text: "好", startSec: 0.0, endSec: 0.3 }, // <2s 不成句 → 并入下一段文本
				{ text: "今天讲一下", startSec: 0.3, endSec: 1.5 }, // <2s 不成句 → 并
				{ text: "本地字幕的方案。", startSec: 1.5, endSec: 4.0 }, // 成句（。），独立成段
			],
			30,
		);
		expect(out).toHaveLength(2);
		expect(out[0].text).toBe("好今天讲一下");
		expect(out[0].startFrame).toBe(0);
		expect(out[0].endFrame).toBe(45); // 1.5s * 30
		expect(out[1].text).toBe("本地字幕的方案。");
		expect(out[1].startFrame).toBe(45);
		expect(out[1].endFrame).toBe(120); // 4s * 30
	});

	it("endSec 异常（≤startSec）时收敛为最小宽度，endFrame 恒大于 startFrame", () => {
		const out = postprocessTranscription(
			[
				{ text: "倒置时间", startSec: 2, endSec: 1 },
				{ text: "正常段", startSec: 5, endSec: 7 },
			],
			30,
		);
		// 倒置段收敛为 0.05s → 低于最小段宽并进后邻（时间并集）
		expect(out[0].startFrame).toBe(60); // 2s * 30
		expect(out[0].endFrame).toBeGreaterThan(out[0].startFrame);
		for (const seg of out) {
			expect(seg.endFrame).toBeGreaterThan(seg.startFrame);
		}
	});

	it("乱序输入按 startSec 排序；空文本丢弃", () => {
		const out = postprocessTranscription(
			[
				{ text: "第二句。", startSec: 4, endSec: 6 },
				{ text: "  ", startSec: 0, endSec: 1 },
				{ text: "第一句。", startSec: 0, endSec: 2 },
			],
			30,
		);
		expect(out.map((s) => s.text)).toEqual(["第一句。", "第二句。"]);
	});
});

describe("时间戳塌缩重建（whisper 首 chunk 长文本压进极短时长）", () => {
	it("90 字塞进 2s：按 6 字/秒重建时长（钳制到下一句起点）", () => {
		const text = "第一句内容，第二句内容，第三句内容，第四句内容，第五句内容，第六句内容。"; // 36 字
		const out = fixCollapsedTimestamps([
			{ text, startSec: 0, endSec: 2 }, // 18 字/秒 → 塌缩
			{ text: "下一句。", startSec: 30, endSec: 32 },
		]);
		// 36 字 / 6cps = 6s，且远小于下一句起点 30s
		expect(out[0].endSec).toBe(6);
		expect(out[1].endSec).toBe(32);
	});

	it("正常密度（≤12 字/秒）不动", () => {
		const out = fixCollapsedTimestamps([
			{ text: "正常的一段话。", startSec: 0, endSec: 3 },
		]);
		expect(out[0].endSec).toBe(3);
	});

	it("重建后超 8s 的段交给逗号切分（管线端到端）", () => {
		const text = Array.from({ length: 24 }, (_, i) => `第${i}部分内容`).join("，"); // 168 字
		const out = postprocessTranscription(
			[{ text, startSec: 0, endSec: 3 }],
			30,
		);
		expect(out.length).toBeGreaterThan(3);
		for (const seg of out) {
			// 每段不超过 8.5s（切分目标 8s + 内插误差）
			expect(seg.endFrame / 30 - seg.startFrame / 30).toBeLessThan(9);
		}
	});
});

describe("formatTranscript", () => {
	it("带时间码的段落全文（mm:ss.s）", () => {
		const text = formatTranscript(
			[
				{ text: "你好", startFrame: 0, endFrame: 45 },
				{ text: "世界", startFrame: 90, endFrame: 150 },
			],
			30,
		);
		expect(text).toBe("[00:00.0-00:01.5] 你好\n[00:03.0-00:05.0] 世界");
	});
});
