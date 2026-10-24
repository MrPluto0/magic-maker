import { describe, expect, it } from "vitest";
import type { CommandContext, TrackLineItem } from "@/class/commands";
import {
	AddTextCmd,
	MoveSegmentCmd,
	SplitAtCmd,
	UpdateSegmentTextCmd,
	findClipInList,
} from "@/class/commands";
import { computeSplitAt } from "@/utils/track";
import type { Track, TrackData } from "@/types/track";
import type { SubtitleSegment } from "@/stores/subtitle";

let idSeq = 0;

/** 显式 id：避免跨用例的流水号耦合；缺省自动编号 */
function makeClip(
	start: number,
	end: number,
	overrides: Partial<TrackData> & { id?: string } = {},
): Track {
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
		...overrides,
	} as unknown as Track;
}

/** 内存假 context：与真实 store 同构的最小实现 */
function makeCtx(
	lines: Track[][],
	segments: SubtitleSegment[] = [],
): CommandContext {
	const trackList: TrackLineItem[] = lines.map((list) => ({
		type: list[0]?.type ?? "video",
		list: [...list],
	}));
	const segs = [...segments];
	return {
		fps: 30,
		trackList,
		resolveClip: (id) => findClipInList(trackList, id),
		splitClipAt: async (line, index, frame) => {
			const clip = trackList[line].list[index];
			const { left, right } = computeSplitAt(clip, frame);
			const originEnd = clip.end;
			const originOffsetR = clip.offsetR;
			Object.assign(clip, left);
			const rightClip = makeClip(frame, originEnd, {
				offsetL: right.offsetL,
				offsetR: originOffsetR,
				resource: { ...clip.resource },
			});
			trackList[line].list.splice(index + 1, 0, rightClip);
			return { leftId: clip.id, rightId: rightClip.id };
		},
		createClip: async (data) => ({ ...data }) as unknown as Track,
		rebuildTrackList: async (data) => {
			trackList.splice(
				0,
				trackList.length,
				...data.map((l) => ({
					type: l.type,
					main: l.main,
					list: l.list.map((d) => ({ ...d })) as Track[],
				})),
			);
		},
		addClip: (clip) => {
			trackList.push({ type: clip.type, list: [clip] });
		},
		subtitleSegments: segs,
		setSubtitleSegments: (next) => {
			segs.splice(0, segs.length, ...next);
		},
	};
}

describe("computeSplitAt（splitTrack 推广的纯函数）", () => {
	it("未裁剪片段：两半裁剪字段各向两侧扩展", () => {
		const { left, right } = computeSplitAt(
			{ start: 0, end: 90, offsetL: 0, offsetR: 0 },
			30,
		);
		expect(left).toEqual({ end: 30, offsetR: 60 });
		expect(right).toEqual({ start: 30, offsetL: 30 });
	});

	it("保持不变量 offsetL + (end-start) + offsetR = frameCount", () => {
		const clip = { start: 10, end: 100, offsetL: 15, offsetR: 25 };
		const before = 15 + (100 - 10) + 25;
		const { left, right } = computeSplitAt(clip, 50);
		const leftInvariant = 15 + (left.end - clip.start) + left.offsetR;
		const rightInvariant =
			right.offsetL + (clip.end - right.start) + 25;
		expect(leftInvariant).toBe(before);
		expect(rightInvariant).toBe(before);
	});

	it("边界帧（start/end）上的分割应被上层拒绝，纯函数本身照算", () => {
		const { left } = computeSplitAt(
			{ start: 0, end: 90, offsetL: 0, offsetR: 0 },
			90,
		);
		expect(left.end).toBe(90);
	});
});

describe("SplitAtCmd", () => {
	it("do 后两段 id 有效，undo 还原为原片段数据", async () => {
		const clip = makeClip(0, 90, { id: "a" });
		const ctx = makeCtx([[clip]]);
		// do 会原地改 clip（左半段），先取证原始坐标
		const original = { start: clip.start, end: clip.end };
		const cmd = new SplitAtCmd(ctx, { trackId: clip.id, frame: 30 });
		const effect = await cmd.do();
		expect(effect.clipIds).toHaveLength(2);
		expect(ctx.trackList[0].list).toHaveLength(2);
		expect(ctx.trackList[0].list[0].end).toBe(30);
		expect(ctx.trackList[0].list[1].start).toBe(30);

		await cmd.undo();
		expect(ctx.trackList[0].list).toHaveLength(1);
		const restored = ctx.trackList[0].list[0];
		expect(restored.id).toBe(clip.id);
		expect(restored.start).toBe(original.start);
		expect(restored.end).toBe(original.end);
	});

	it("已裁剪片段（offsetL≠0）分割后不变量保持", async () => {
		// 不变量：offsetL(10) + (end-start)(60) + offsetR(5) = frameCount(75)
		const clip = makeClip(0, 60, { id: "a", offsetL: 10, offsetR: 5, frameCount: 75 });
		const ctx = makeCtx([[clip]]);
		const cmd = new SplitAtCmd(ctx, { trackId: clip.id, frame: 20 });
		await cmd.do();
		for (const c of ctx.trackList[0].list) {
			expect(c.offsetL + (c.end - c.start) + c.offsetR).toBe(75);
		}
		await cmd.undo();
		expect(ctx.trackList[0].list[0].offsetL).toBe(10);
		expect(ctx.trackList[0].list[0].offsetR).toBe(5);
	});

	it("开区间外分割抛 E_OUT_OF_RANGE", async () => {
		const clip = makeClip(0, 90, { id: "a" });
		const ctx = makeCtx([[clip]]);
		const cmd = new SplitAtCmd(ctx, { trackId: clip.id, frame: 90 });
		await expect(cmd.do()).rejects.toMatchObject({ code: "E_OUT_OF_RANGE" });
	});

	it("片段不存在抛 E_TRACK_NOT_FOUND", async () => {
		const ctx = makeCtx([[makeClip(0, 90, { id: "a" })]]);
		const cmd = new SplitAtCmd(ctx, { trackId: "nope", frame: 30 });
		await expect(cmd.do()).rejects.toMatchObject({ code: "E_TRACK_NOT_FOUND" });
	});

	it("undo 前未 do 抛 E_UNDO_STALE；产物被删后 undo 抛 E_UNDO_STALE", async () => {
		const clip = makeClip(0, 90, { id: "a" });
		const ctx = makeCtx([[clip]]);
		const cmd = new SplitAtCmd(ctx, { trackId: clip.id, frame: 30 });
		await expect(cmd.undo()).rejects.toMatchObject({ code: "E_UNDO_STALE" });
		await cmd.do();
		ctx.trackList[0].list.length = 0;
		await expect(cmd.undo()).rejects.toMatchObject({ code: "E_UNDO_STALE" });
	});

	it("toJSON 版本化 cmd 名", async () => {
		const clip = makeClip(0, 90, { id: "a" });
		const ctx = makeCtx([[clip]]);
		const cmd = new SplitAtCmd(ctx, { trackId: clip.id, frame: 30 });
		await cmd.do();
		expect(cmd.toJSON()).toEqual({
			cmd: "split_at@1",
			params: { trackId: clip.id, frame: 30 },
		});
	});
});

describe("MoveSegmentCmd", () => {
	it("同轨平移保持时长，undo 回原位", async () => {
		const a = makeClip(0, 30, { id: "a" });
		const b = makeClip(60, 90, { id: "b" });
		const ctx = makeCtx([[a, b]]);
		const cmd = new MoveSegmentCmd(ctx, { trackId: a.id, startFrame: 20 });
		const effect = await cmd.do();
		expect(effect.clipIds).toEqual([a.id]);
		expect(ctx.trackList[0].list[0].start).toBe(20);
		expect(ctx.trackList[0].list[0].end).toBe(50);
		await cmd.undo();
		expect(ctx.trackList[0].list[0].start).toBe(0);
		expect(ctx.trackList[0].list[0].end).toBe(30);
	});

	it("目标位重叠抛 E_OVERLAP", async () => {
		const a = makeClip(0, 30, { id: "a" });
		const ctx = makeCtx([[a, makeClip(60, 90, { id: "b" })]]);
		const cmd = new MoveSegmentCmd(ctx, { trackId: a.id, startFrame: 50 });
		await expect(cmd.do()).rejects.toMatchObject({ code: "E_OVERLAP" });
	});

	it("跨轨移动：同类型可移，类型不同抛错", async () => {
		const a = makeClip(0, 30, { id: "a" });
		const b = makeClip(0, 30, { id: "b" });
		const ctx = makeCtx([[a], [b]]);
		const cmd = new MoveSegmentCmd(ctx, {
			trackId: a.id,
			startFrame: 30,
			targetTrackId: b.id,
		});
		await cmd.do();
		expect(ctx.trackList[0].list).toHaveLength(0);
		expect(ctx.trackList[1].list).toHaveLength(2);
		expect(ctx.trackList[1].list[1].start).toBe(30);
		await cmd.undo();
		expect(ctx.trackList[0].list).toHaveLength(1);
		expect(ctx.trackList[0].list[0].start).toBe(0);

		// 目标行类型不同（audio 行 vs video 片段）→ 拒绝
		const a2 = makeClip(0, 30, { id: "a" });
		const b2 = makeClip(0, 30, { id: "b" });
		const ctx2 = makeCtx([[a2], [b2]]);
		ctx2.trackList[1].type = "audio";
		const bad = new MoveSegmentCmd(ctx2, {
			trackId: a2.id,
			startFrame: 30,
			targetTrackId: b2.id,
		});
		await expect(bad.do()).rejects.toMatchObject({
			code: "E_TRACK_NOT_FOUND",
		});
	});

	it("移到原位 = 状态不变（真幂等特例）", async () => {
		const clip = makeClip(10, 40, { id: "a" });
		const ctx = makeCtx([[clip]]);
		const cmd = new MoveSegmentCmd(ctx, { trackId: clip.id, startFrame: 10 });
		const effect = await cmd.do();
		expect(effect.summary).toContain("原位");
		await expect(cmd.undo()).rejects.toMatchObject({ code: "E_UNDO_STALE" });
	});
});

describe("AddTextCmd / UpdateSegmentTextCmd", () => {
	it("add_text 落文字轨，undo 摘除；时长 <0.6s 抛错", async () => {
		const ctx = makeCtx([[]]);
		const cmd = new AddTextCmd(ctx, {
			text: "片头标题",
			startFrame: 0,
			endFrame: 90,
		});
		await cmd.do();
		const textLine = ctx.trackList.find((l) => l.type === "text");
		expect(textLine?.list).toHaveLength(1);
		expect(textLine?.list[0].type).toBe("text");
		await cmd.undo();
		expect(ctx.trackList.find((l) => l.type === "text")?.list).toHaveLength(0);

		const short = new AddTextCmd(ctx, {
			text: "闪",
			startFrame: 0,
			endFrame: 10,
		});
		await expect(short.do()).rejects.toMatchObject({ code: "E_OUT_OF_RANGE" });
	});

	it("set_segment_text 只换文字不动时长，undo 换回旧文本", async () => {
		const seg = { id: "s1", text: "旧文本", startFrame: 0, endFrame: 45 };
		const ctx = makeCtx([[]], [seg]);
		const cmd = new UpdateSegmentTextCmd(ctx, { segmentId: "s1", text: "新文本" });
		await cmd.do();
		expect(ctx.subtitleSegments[0].text).toBe("新文本");
		expect(ctx.subtitleSegments[0].endFrame).toBe(45);
		await cmd.undo();
		expect(ctx.subtitleSegments[0].text).toBe("旧文本");

		const missing = new UpdateSegmentTextCmd(ctx, {
			segmentId: "nope",
			text: "x",
		});
		await expect(missing.do()).rejects.toMatchObject({
			code: "E_TRACK_NOT_FOUND",
		});
	});
});
