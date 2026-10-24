import { describe, expect, it } from "vitest";
import type { CommandContext } from "@/class/commands";
import { DeleteRangeCmd, findClipInList } from "@/class/commands";
import { computeSplitAt } from "@/utils/track";
import type { Track, TrackLineItem } from "@/types/track";
import type { SubtitleSegment } from "@/stores/subtitle";

let idSeq = 0;

function makeClip(start: number, end: number, id?: string): Track {
	idSeq += 1;
	return {
		id: id ?? `c${idSeq}`,
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
			const rightClip = makeClip(frame, originEnd);
			rightClip.offsetL = right.offsetL;
			rightClip.offsetR = originOffsetR;
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

describe("DeleteRangeCmd（波纹删除）", () => {
	it("区间命中段中间：切两刀取中段，右侧波纹左移", async () => {
		const ctx = makeCtx([[makeClip(0, 100)]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 30,
			endFrame: 60,
			ripple: true,
		});
		const effect = await cmd.do();
		expect(effect.clipIds).toHaveLength(1);
		// 左半 [0,30) + 右半左移后 [30,70)
		expect(ctx.trackList[0].list).toHaveLength(2);
		expect(ctx.trackList[0].list[0]).toMatchObject({ start: 0, end: 30 });
		expect(ctx.trackList[0].list[1]).toMatchObject({ start: 30, end: 70 });
		expect(effect.summary).toContain("1 个片段");

		await cmd.undo();
		// undo 还原被删片段 + 位移回退；分割刀口保留（设计 §5：还原被删片段/位移/字幕段）
		expect(ctx.trackList[0].list.map((c) => [c.start, c.end])).toEqual([
			[0, 30],
			[30, 60],
			[60, 100],
		]);
	});

	it("区间跨多个整段：全部移除一次 undo 全回", async () => {
		const ctx = makeCtx([[
			makeClip(0, 30, "x1"),
			makeClip(30, 60, "x2"),
			makeClip(60, 90, "x3"),
		]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 25,
			endFrame: 65,
			ripple: true,
		});
		const effect = await cmd.do();
		// x1 尾部 [25,30)、x2 整段、x3 头部 [60,65) → 3 个被删部分
		expect(effect.clipIds).toHaveLength(3);
		expect(ctx.trackList[0].list).toHaveLength(2);
		expect(ctx.trackList[0].list[0]).toMatchObject({ start: 0, end: 25 });
		expect(ctx.trackList[0].list[1]).toMatchObject({ start: 25, end: 50 });

		await cmd.undo();
		// 被删部分含裁剪状态还原、位移回退；x1/x3 上的两处刀口保留
		expect(
			ctx.trackList[0].list.map((c) => [c.start, c.end]),
		).toEqual([
			[0, 25],
			[25, 30],
			[30, 60],
			[60, 65],
			[65, 90],
		]);
	});

	it("多行（视频/音频/文字）同步删除 + 多行波纹", async () => {
		const ctx = makeCtx([[makeClip(0, 90)], [makeClip(0, 90)], [makeClip(0, 90)]]);
		ctx.trackList[1].type = "audio";
		ctx.trackList[2].type = "text";
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 10,
			endFrame: 20,
			ripple: true,
		});
		const effect = await cmd.do();
		expect(effect.clipIds).toHaveLength(3);
		for (const line of ctx.trackList) {
			expect(line.list).toHaveLength(2);
			expect(line.list[0]).toMatchObject({ start: 0, end: 10 });
			expect(line.list[1]).toMatchObject({ start: 10, end: 80 });
		}
	});

	it("字幕段同步：段内全删、跨界截断、右侧随波纹左移", async () => {
		const segments: SubtitleSegment[] = [
			{ id: "s1", text: "被整段删除", startFrame: 30, endFrame: 55 },
			{ id: "s2", text: "头部保留", startFrame: 10, endFrame: 40 },
			{ id: "s3", text: "在区间右侧", startFrame: 70, endFrame: 90 },
			{ id: "s4", text: "不受影响", startFrame: 0, endFrame: 8 },
		];
		const ctx = makeCtx([[makeClip(0, 100)]], segments);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 30,
			endFrame: 60,
			ripple: true,
		});
		const effect = await cmd.do();
		expect(effect.segmentIds).toEqual(["s1"]);
		const segs = ctx.subtitleSegments;
		expect(segs.find((s) => s.id === "s1")).toBeUndefined();
		expect(segs.find((s) => s.id === "s2")).toMatchObject({
			startFrame: 10,
			endFrame: 30,
		});
		expect(segs.find((s) => s.id === "s3")).toMatchObject({
			startFrame: 40,
			endFrame: 60,
		});
		expect(segs.find((s) => s.id === "s4")).toMatchObject({
			startFrame: 0,
			endFrame: 8,
		});
	});

	it("ripple=false 留空隙", async () => {
		const ctx = makeCtx([[makeClip(0, 30), makeClip(30, 60), makeClip(60, 90)]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 30,
			endFrame: 60,
			ripple: false,
		});
		await cmd.do();
		expect(ctx.trackList[0].list).toHaveLength(2);
		expect(ctx.trackList[0].list[1]).toMatchObject({ start: 60, end: 90 });
	});

	it("空区间 / 未命中任何片段 → E_OUT_OF_RANGE", async () => {
		const ctx = makeCtx([[makeClip(0, 30)]]);
		const empty = new DeleteRangeCmd(ctx, {
			startFrame: 10,
			endFrame: 10,
			ripple: true,
		});
		await expect(empty.do()).rejects.toMatchObject({ code: "E_OUT_OF_RANGE" });

		const miss = new DeleteRangeCmd(ctx, {
			startFrame: 200,
			endFrame: 300,
			ripple: true,
		});
		await expect(miss.do()).rejects.toMatchObject({ code: "E_OUT_OF_RANGE" });
	});

	it("undo 后字幕段一并还原", async () => {
		const segments: SubtitleSegment[] = [
			{ id: "s1", text: "跨界截断", startFrame: 5, endFrame: 15 },
		];
		const ctx = makeCtx([[makeClip(0, 90)]], segments);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 10,
			endFrame: 20,
			ripple: true,
		});
		await cmd.do();
		// 跨界段截断为头部 [5,10)
		expect(ctx.subtitleSegments).toHaveLength(1);
		expect(ctx.subtitleSegments[0]).toMatchObject({ startFrame: 5, endFrame: 10 });
		await cmd.undo();
		expect(ctx.subtitleSegments).toHaveLength(1);
		expect(ctx.subtitleSegments[0]).toMatchObject({
			id: "s1",
			startFrame: 5,
			endFrame: 15,
		});
	});

	it("整段落入区间的字幕段删除后 undo 插回", async () => {
		const segments: SubtitleSegment[] = [
			{ id: "s1", text: "删我", startFrame: 12, endFrame: 18 },
		];
		const ctx = makeCtx([[makeClip(0, 90)]], segments);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 10,
			endFrame: 20,
			ripple: true,
		});
		await cmd.do();
		expect(ctx.subtitleSegments).toHaveLength(0);
		await cmd.undo();
		expect(ctx.subtitleSegments).toHaveLength(1);
		expect(ctx.subtitleSegments[0]).toMatchObject({
			id: "s1",
			startFrame: 12,
			endFrame: 18,
		});
	});

	it("preview 不落变更，列出命中片段", () => {
		const ctx = makeCtx([[makeClip(0, 30), makeClip(30, 60)]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 20,
			endFrame: 40,
			ripple: true,
		});
		const preview = cmd.preview();
		expect(preview.items).toHaveLength(2);
		expect(preview.timeSavedFrame).toBe(20);
		expect(ctx.trackList[0].list).toHaveLength(2); // 未动
	});

	it("scope 限定只删指定片段（其余命中片段不动、不截断）", async () => {
		const a = makeClip(0, 30);
		const b = makeClip(30, 60);
		const ctx = makeCtx([[a, b]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 20,
			endFrame: 50,
			scope: [a.id],
			ripple: true,
		});
		const effect = await cmd.do();
		expect(effect.clipIds).toHaveLength(1);
		expect(ctx.trackList[0].list.some((c) => c.id === b.id)).toBe(true);
	});

	it("toJSON 版本化 cmd 名", () => {
		const ctx = makeCtx([[makeClip(0, 90)]]);
		const cmd = new DeleteRangeCmd(ctx, {
			startFrame: 10,
			endFrame: 20,
			ripple: true,
		});
		expect(cmd.toJSON().cmd).toBe("delete_range@1");
	});
});
