import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import type { CommandContext } from "@/class/commands";
import { ReplaceSegmentsCmd, findClipInList } from "@/class/commands";
import { useSubtitleState } from "@/stores/subtitle";
import type { SubtitleSegment } from "@/stores/subtitle";
import type { Track, TrackLineItem } from "@/types/track";

/**
 * W6 修：重转写=整体替换 segments 不再静默覆盖——
 * ① ReplaceSegmentsCmd 可撤销（undo 完整恢复替换前段落，含命令层编辑）；
 * ② subtitle store 转写基线 diff（重转写覆盖提示「将覆盖 N 处字幕编辑」的数据源）。
 */

let idSeq = 0;

function makeClip(start: number, end: number): Track {
	idSeq += 1;
	return {
		id: `c${idSeq}`,
		type: "video",
		name: `clip${idSeq}`,
		start,
		end,
		frameCount: 999,
		offsetL: 0,
		offsetR: 0,
		format: "mp4",
		resource: { id: `r${idSeq}`, name: `clip${idSeq}`, type: "video" },
	} as unknown as Track;
}

function makeCtx(segments: SubtitleSegment[]): CommandContext {
	const trackList: TrackLineItem[] = [
		{ type: "video", list: [makeClip(0, 300)] },
	];
	const segs = [...segments];
	return {
		fps: 30,
		trackList,
		resolveClip: (id) => findClipInList(trackList, id),
		splitClipAt: async () => null,
		createClip: async (data) => ({ ...data }) as unknown as Track,
		rebuildTrackList: async () => {},
		addClip: () => {},
		subtitleSegments: segs,
		setSubtitleSegments: (next) => {
			segs.splice(0, segs.length, ...next.map((s) => ({ ...s })));
		},
	};
}

describe("ReplaceSegmentsCmd（重转写整体替换，可撤销）", () => {
	it("do 整体替换 / undo 完整恢复替换前的段落（含命令层编辑过的文本）", async () => {
		const edited: SubtitleSegment[] = [
			{ id: "s1", text: "被 LLM 改过的文字", startFrame: 0, endFrame: 60 },
			{ id: "s2", text: "第二段", startFrame: 60, endFrame: 120 },
		];
		const ctx = makeCtx(edited);
		const next: SubtitleSegment[] = [
			{ id: "n1", text: "重转写第一段", startFrame: 0, endFrame: 80 },
			{ id: "n2", text: "重转写第二段", startFrame: 80, endFrame: 160 },
			{ id: "n3", text: "重转写第三段", startFrame: 160, endFrame: 240 },
		];
		const cmd = new ReplaceSegmentsCmd(ctx, {
			segments: next,
			reason: "重新转写",
		});

		const effect = await cmd.do();
		expect(effect.summary).toContain("3 段");
		expect(effect.summary).toContain("原 2 段");
		expect(ctx.subtitleSegments.map((s) => s.id)).toEqual([
			"n1",
			"n2",
			"n3",
		]);

		await cmd.undo();
		expect(ctx.subtitleSegments).toEqual(edited);
	});

	it("替换前后互不影响（undo 恢复的是 do 时快照，不是引用）", async () => {
		const original: SubtitleSegment[] = [
			{ id: "a", text: "原文", startFrame: 0, endFrame: 30 },
		];
		const ctx = makeCtx(original);
		const cmd = new ReplaceSegmentsCmd(ctx, {
			segments: [{ id: "b", text: "新文", startFrame: 0, endFrame: 50 }],
		});
		await cmd.do();
		// do 之后原地改掉新段落，undo 仍应恢复 do 前状态
		ctx.subtitleSegments[0].text = "落段后又被改";
		await cmd.undo();
		expect(ctx.subtitleSegments[0]).toMatchObject({
			id: "a",
			text: "原文",
			startFrame: 0,
			endFrame: 30,
		});
	});

	it("未执行先 undo → E_UNDO_STALE；toJSON/fromJSON 往返", async () => {
		const ctx = makeCtx([]);
		const cmd = new ReplaceSegmentsCmd(ctx, { segments: [] });
		await expect(cmd.undo()).rejects.toMatchObject({
			code: "E_UNDO_STALE",
		});
		expect(cmd.toJSON()).toEqual({
			cmd: "replace_segments@1",
			params: { segments: [] },
		});
	});
});

describe("subtitle store：转写基线 diff（覆盖提示数据源）", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("无基线（从未转写）→ 0 处编辑", () => {
		const ss = useSubtitleState();
		ss.setSegments([ss.makeSegment("直接手工落的段", 0, 60)]);
		expect(ss.countSegmentEdits()).toBe(0);
	});

	it("落段登记基线后：改文本/改时间各计 1，删除/新增累计", () => {
		const ss = useSubtitleState();
		ss.setSegments([
			ss.makeSegment("第一段", 0, 60),
			ss.makeSegment("第二段", 60, 120),
			ss.makeSegment("第三段", 120, 180),
		]);
		ss.markTranscribeBaseline();

		expect(ss.countSegmentEdits()).toBe(0);

		ss.segments[0].text = "改过的文字"; // 文本编辑
		expect(ss.countSegmentEdits()).toBe(1);

		ss.segments[1].endFrame = 150; // 时间编辑
		expect(ss.countSegmentEdits()).toBe(2);

		ss.segments.splice(2, 1); // 删除一段
		expect(ss.countSegmentEdits()).toBe(3);

		ss.segments.push(ss.makeSegment("手工加的", 200, 260)); // 新增
		expect(ss.countSegmentEdits()).toBe(4);
	});

	it("整体替换（模拟重转写落段）后重新登记基线 → 差异归零", () => {
		const ss = useSubtitleState();
		ss.setSegments([ss.makeSegment("旧段", 0, 60)]);
		ss.markTranscribeBaseline();
		ss.segments[0].text = "编辑过";
		expect(ss.countSegmentEdits()).toBe(1);

		const next = [ss.makeSegment("重转写段", 0, 90)];
		ss.setSegments(next);
		ss.markTranscribeBaseline(next);
		expect(ss.countSegmentEdits()).toBe(0);
	});
});
