import { nanoid } from "nanoid";
import type { SubtitleSegment } from "@/stores/subtitle";
import type {
	Track,
	TrackData,
	TrackLineData,
	TrackLineItem,
} from "@/types/track";
import { checkTrackOverlap } from "@/utils/track";
import { plainifyTrack } from "@/utils/trackData";
import { ToolErrorCode as E, ToolError } from "./toolError";

/**
 * 命令层（docs/PHASE2_DESIGN §3）。
 *
 * 两条红线：
 * 1. 所有 agent 写操作都编译成 EditCommand——可序列化、可逆、可回放；
 * 2. 命令层是编排者：复用 store 原语（splitAt/copyTrack/loadTrackData），
 *    不发明新剪辑语义。
 *
 * 与 store 的耦合通过 CommandContext 注入：命令类不 import pinia，
 * 可在 Vitest 里用假 context 单测（真实 context 见 class/commandContext.ts）。
 */

/** 命令执行效果：返回影响范围供对话卡片渲染 */
export interface CommandEffect {
	clipIds: string[];
	segmentIds?: string[];
	frameStart?: number;
	frameEnd?: number;
	summary: string;
}

/** 可序列化命令 JSON（版本字段进 cmd 名） */
export interface EditCommandJSON {
	cmd: string;
	params: Record<string, unknown>;
}

export interface EditCommand {
	/** 卡片/撤销菜单用的人话短句 */
	readonly label: string;
	/** 给 LLM 的人话意图（同 ToolDefinition.intent） */
	readonly intent: string;
	do(): Promise<CommandEffect>;
	/** 反序执行 do 时记录的逆操作；inverse 失效抛 E_UNDO_STALE */
	undo(): Promise<void>;
	toJSON(): EditCommandJSON;
}

/** id → 片段定位 */
export interface ClipRef {
	line: number;
	index: number;
	clip: Track;
}

/**
 * 命令上下文：store 原语的注入面。
 * 真实实现包 trackStore/subtitleStore；测试注入内存假实现。
 */
export interface CommandContext {
	fps: number;
	/** 活跃轨道列表（store 内的同一数组引用，命令原地修改） */
	trackList: TrackLineItem[];
	resolveClip(trackId: string): ClipRef | null;
	/** 分割原语（store.splitAt），返回两段 id */
	splitClipAt(
		line: number,
		index: number,
		frame: number,
	): Promise<{ leftId: string; rightId: string } | null>;
	/** 从纯数据重建单个片段实例（轻 undo） */
	createClip(data: TrackData): Promise<Track>;
	/** 整轨重建（快照层兜底用，loadTrackData 同构重建） */
	rebuildTrackList(data: TrackLineData[]): Promise<void>;
	/** 把重建好的片段挂上轨道行（addTrack 语义） */
	addClip(clip: Track): void;
	/** 字幕段唯一事实源（响应式数组，命令原地删/截/移） */
	subtitleSegments: SubtitleSegment[];
	setSubtitleSegments(next: SubtitleSegment[]): void;
}

export function findClipInList(
	trackList: TrackLineItem[],
	trackId: string,
): ClipRef | null {
	for (let line = 0; line < trackList.length; line++) {
		const index = trackList[line].list.findIndex((t) => t.id === trackId);
		if (index >= 0) {
			return { line, index, clip: trackList[line].list[index] };
		}
	}
	return null;
}

/* ============================== SplitAtCmd ============================== */

export interface SplitAtParams {
	trackId: string;
	frame: number;
}

/** 分割：一段变两段。inverse 记两段 id 与原片段完整 JSON（轻 undo）。 */
export class SplitAtCmd implements EditCommand {
	readonly label = "分割片段";
	readonly intent = "在指定片段的指定帧处切一刀，一段变两段";
	private inverse?: {
		line: number;
		index: number;
		leftId: string;
		rightId: string;
		original: TrackData;
	};

	constructor(
		private ctx: CommandContext,
		private params: SplitAtParams,
	) {}

	async do(): Promise<CommandEffect> {
		const ref = this.ctx.resolveClip(this.params.trackId);
		if (!ref) {
			throw new ToolError(
				E.TRACK_NOT_FOUND,
				`片段 ${this.params.trackId} 不存在或已被删除`,
			);
		}
		const { clip } = ref;
		if (this.params.frame <= clip.start || this.params.frame >= clip.end) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				`分割点 ${this.params.frame} 不在片段开区间 (${clip.start}, ${clip.end}) 内`,
			);
		}
		// 原片段纯数据在 do 前取证（split 不改它，do 后记录亦可，取证先行更稳）
		const original = plainifyTrack(clip);
		const ids = await this.ctx.splitClipAt(
			ref.line,
			ref.index,
			this.params.frame,
		);
		if (!ids) {
			throw new ToolError(E.INTERNAL, "分割原语返回空结果");
		}
		// 逆操作在 do 后记录：两段 id 只有重做后才存在
		this.inverse = { line: ref.line, index: ref.index, ...ids, original };
		return {
			clipIds: [ids.leftId, ids.rightId],
			frameStart: this.params.frame,
			summary: `在 ${this.params.frame} 帧处分割为两段`,
		};
	}

	async undo(): Promise<void> {
		const inv = this.inverse;
		if (!inv) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		const left = this.ctx.resolveClip(inv.leftId);
		const right = this.ctx.resolveClip(inv.rightId);
		if (!left || !right) {
			throw new ToolError(
				E.UNDO_STALE,
				"分割产物已被手动编辑覆盖，无法精确撤销",
			);
		}
		// 先删靠后位置，避免 splice 位移；行内删空不摘行（与波纹删除口径一致）
		const removals = [left, right].sort((a, b) => b.index - a.index);
		for (const r of removals) {
			this.ctx.trackList[r.line]?.list.splice(r.index, 1);
		}
		const restored = await this.ctx.createClip(inv.original);
		const targetLine = this.ctx.trackList[inv.line];
		const insertAt = Math.min(inv.index, targetLine?.list.length ?? 0);
		targetLine?.list.splice(insertAt, 0, restored);
	}

	toJSON(): EditCommandJSON {
		return { cmd: "split_at@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new SplitAtCmd(ctx, json.params as unknown as SplitAtParams);
	}
}

/* ============================ DeleteRangeCmd ============================ */

export interface DeleteRangeParams {
	startFrame: number;
	endFrame: number;
	/** 限定作用的片段 id 列表；缺省 = 全部命中片段 */
	scope?: string[];
	/** true=波纹收拢；false=留空隙 */
	ripple: boolean;
}

export interface DeletePreviewItem {
	clipId: string;
	name: string;
	start: number;
	end: number;
}

/**
 * 波纹删除区间：
 * ① 跨区间片段先 splitAt 两刀；② 整段落入区间的片段移除；
 * ③ ripple 时右侧同轨片段左移 gapWidth；④ 字幕段同步删/截断。
 * 多段命中合并为一个命令，undo 一次全回（重 undo：被删片段含裁剪状态还原 +
 * 各轨位移回退 + 字幕段还原；分割刀口保留，与设计 §5 一致）。
 */
export class DeleteRangeCmd implements EditCommand {
	readonly label = "删除区间";
	readonly intent =
		"删除时间区间内所有（或指定轨道的）片段，右侧波纹左移收拢，同步删除/截断字幕段";
	private inverse?: {
		/** 波纹位移：undo 时按 id 找回并 +delta */
		shifts: Array<{ clipId: string; delta: number }>;
		/** 被删片段（含裁剪状态）与其被删时所在行 */
		removed: Array<{ line: number; data: TrackData }>;
		/** 字幕段：整段删除（带原下标）或截断（带原起止） */
		segmentOps: Array<
			| { op: "remove"; seg: SubtitleSegment }
			| { op: "truncate"; id: string; startFrame: number; endFrame: number }
		>;
	};

	constructor(
		private ctx: CommandContext,
		private params: DeleteRangeParams,
	) {}

	/** 确认卡预览：不落任何变更，列出将被删除的片段 */
	preview(): {
		items: DeletePreviewItem[];
		segmentCount: number;
		timeSavedFrame: number;
	} {
		const { startFrame: s, endFrame: e, scope } = this.params;
		const items: DeletePreviewItem[] = [];
		for (const line of this.ctx.trackList) {
			for (const clip of line.list) {
				if (scope && !scope.includes(clip.id)) continue;
				if (clip.end <= s || clip.start >= e) continue;
				items.push({
					clipId: clip.id,
					name: clip.name,
					start: Math.max(clip.start, s),
					end: Math.min(clip.end, e),
				});
			}
		}
		const segmentCount = this.ctx.subtitleSegments.filter(
			(seg) => seg.endFrame > s && seg.startFrame < e,
		).length;
		return { items, segmentCount, timeSavedFrame: e - s };
	}

	async do(): Promise<CommandEffect> {
		const { startFrame: s, endFrame: e, scope, ripple } = this.params;
		if (!(e > s)) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				`空区间（end ${e} ≤ start ${s}），拒绝空删`,
			);
		}
		const gap = e - s;
		const resolve = (id: string) => findClipInList(this.ctx.trackList, id);

		// ① 跨区间片段先切两刀，切出「整段落入区间」的部分
		const hitIds: string[] = [];
		for (const line of [...this.ctx.trackList]) {
			for (const clip of [...line.list]) {
				if (scope && !scope.includes(clip.id)) continue;
				if (clip.end <= s || clip.start >= e) continue; // 不相交
				let ref = resolve(clip.id);
				if (!ref) continue;
				if (ref.clip.start < s) {
					const ids = await this.ctx.splitClipAt(ref.line, ref.index, s);
					if (!ids) continue;
					ref = resolve(ids.rightId);
					if (!ref) continue;
				}
				if (ref.clip.end > e) {
					const ids = await this.ctx.splitClipAt(ref.line, ref.index, e);
					if (!ids) continue;
					ref = resolve(ids.leftId);
					if (!ref) continue;
				}
				hitIds.push(ref.clip.id);
			}
		}
		if (hitIds.length === 0) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				`区间 [${s}, ${e}) 内没有命中任何片段`,
			);
		}

		// ② 整段移除（取证含裁剪状态的纯数据 + 所在行）
		const removed: Array<{ line: number; data: TrackData }> = [];
		for (const id of hitIds) {
			const ref = resolve(id);
			if (!ref) continue;
			removed.push({
				line: ref.line,
				data: plainifyTrack(ref.clip),
			});
			this.ctx.trackList[ref.line].list.splice(ref.index, 1);
		}

		// ③ 波纹左移（同轨右侧片段）
		const shifts: Array<{ clipId: string; delta: number }> = [];
		if (ripple) {
			for (const line of this.ctx.trackList) {
				for (const clip of line.list) {
					if (clip.start >= e) {
						clip.start -= gap;
						clip.end -= gap;
						shifts.push({ clipId: clip.id, delta: gap });
					}
				}
			}
		}

		// ④ 字幕段同步：完全落入区间 → 删；跨界 → 截断（保头部）；右侧随波纹左移
		const removedSegIds: string[] = [];
		const segmentOps: Array<
			| { op: "remove"; seg: SubtitleSegment }
			| { op: "truncate"; id: string; startFrame: number; endFrame: number }
		> = [];
		const kept: SubtitleSegment[] = [];
		for (const seg of this.ctx.subtitleSegments) {
			const outside = seg.endFrame <= s || seg.startFrame >= e;
			if (outside) {
				if (ripple && seg.startFrame >= e) {
					segmentOps.push({
						op: "truncate",
						id: seg.id,
						startFrame: seg.startFrame,
						endFrame: seg.endFrame,
					});
					kept.push({
						...seg,
						startFrame: seg.startFrame - gap,
						endFrame: seg.endFrame - gap,
					});
				} else {
					kept.push({ ...seg });
				}
				continue;
			}
			const keepHead = seg.startFrame < s;
			const keepTail = seg.endFrame > e;
			if (!keepHead && !keepTail) {
				removedSegIds.push(seg.id);
				segmentOps.push({ op: "remove", seg: { ...seg } });
				continue;
			}
			segmentOps.push({
				op: "truncate",
				id: seg.id,
				startFrame: seg.startFrame,
				endFrame: seg.endFrame,
			});
			if (keepHead) {
				// 保头部 [start, s)；跨区间字幕截断为头部（尾部折叠进头部段，不拆两条）
				kept.push({ ...seg, endFrame: s });
			} else if (keepTail) {
				// 保尾部 [e, end)：起点是区间结束帧 e——ripple 时 e-gap===s 只是数值巧合
				// （W6 修复：原实现记 s，非波纹模式下保留尾部会向前多出 gap 帧且早于段自身起点）
				kept.push({
					...seg,
					startFrame: ripple ? e - gap : e,
					endFrame: ripple ? seg.endFrame - gap : seg.endFrame,
				});
			}
		}
		this.ctx.setSubtitleSegments(kept);

		// ⑤ 逆操作按重做后的实际状态记录（被删片段/位移/字幕段均为 do 中实测取证）
		this.inverse = { shifts, removed, segmentOps };

		const removedByLine = new Map<number, string[]>();
		for (const id of hitIds) {
			const ref = resolve(id);
			// 移除后按行归并统计（type 更直观，但行号足以渲染 chips）
			const line = ref?.line ?? -1;
			removedByLine.set(line, [...(removedByLine.get(line) ?? []), id]);
		}
		return {
			clipIds: hitIds,
			segmentIds: removedSegIds,
			frameStart: s,
			frameEnd: e,
			summary: `删除 ${hitIds.length} 个片段${
				removedSegIds.length ? ` · ${removedSegIds.length} 条字幕段` : ""
			}${ripple ? "，波纹收拢" : ""}，缩短 ${((e - s) / this.ctx.fps).toFixed(1)}s`,
		};
	}

	async undo(): Promise<void> {
		const inv = this.inverse;
		if (!inv) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		// ① 先回退波纹位移（先解析全部目标，任一缺失即整体拒绝，保持原子性）
		const shiftTargets = inv.shifts.map(({ clipId, delta }) => {
			const ref = findClipInList(this.ctx.trackList, clipId);
			if (!ref) {
				throw new ToolError(
					E.UNDO_STALE,
					"被位移的片段已被手动编辑覆盖，无法精确撤销",
				);
			}
			return { clip: ref.clip, delta };
		});
		for (const { clip, delta } of shiftTargets) {
			clip.start += delta;
			clip.end += delta;
		}
		// ② 还原被删片段（按 start 有序插回原行）
		for (const { line, data } of inv.removed) {
			const clip = await this.ctx.createClip(data);
			const targetLine = this.ctx.trackList[line];
			if (!targetLine) {
				throw new ToolError(E.UNDO_STALE, "原轨道行已不存在，无法精确撤销");
			}
			let insertAt = targetLine.list.findIndex((c) => c.start > clip.start);
			if (insertAt < 0) insertAt = targetLine.list.length;
			targetLine.list.splice(insertAt, 0, clip);
		}
		// ③ 还原字幕段：先恢复截断，再插回整删段
		for (const op of inv.segmentOps) {
			if (op.op === "truncate") {
				const seg = this.ctx.subtitleSegments.find((s) => s.id === op.id);
				if (!seg) {
					throw new ToolError(
						E.UNDO_STALE,
						"字幕段已被手动编辑覆盖，无法精确撤销",
					);
				}
				seg.startFrame = op.startFrame;
				seg.endFrame = op.endFrame;
			}
		}
		for (const op of inv.segmentOps) {
			if (op.op !== "remove") continue;
			let insertAt = this.ctx.subtitleSegments.findIndex(
				(s) => s.startFrame > op.seg.startFrame,
			);
			if (insertAt < 0) insertAt = this.ctx.subtitleSegments.length;
			this.ctx.subtitleSegments.splice(insertAt, 0, { ...op.seg });
		}
	}

	toJSON(): EditCommandJSON {
		return { cmd: "delete_range@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new DeleteRangeCmd(ctx, json.params as unknown as DeleteRangeParams);
	}
}

/* ============================ MoveSegmentCmd ============================ */

export interface MoveSegmentParams {
	trackId: string;
	startFrame: number;
	/** 目标行参照片段 id；缺省 = 原轨 */
	targetTrackId?: string;
}

/** 平移片段到新起点（保持时长，可跨同类型轨道行）。inverse 记原坐标（轻 undo）。 */
export class MoveSegmentCmd implements EditCommand {
	readonly label = "移动片段";
	readonly intent = "把片段平移到新起点（保持时长），可选换到同类型轨道行";
	private inverse?: {
		fromLine: number;
		fromIndex: number;
		fromStart: number;
		fromEnd: number;
	};

	constructor(
		private ctx: CommandContext,
		private params: MoveSegmentParams,
	) {}

	async do(): Promise<CommandEffect> {
		const ref = this.ctx.resolveClip(this.params.trackId);
		if (!ref) {
			throw new ToolError(
				E.TRACK_NOT_FOUND,
				`片段 ${this.params.trackId} 不存在或已被删除`,
			);
		}
		const { clip } = ref;
		const start = this.params.startFrame;
		if (start < 0) {
			throw new ToolError(E.OUT_OF_RANGE, `目标起点 ${start} 不能为负`);
		}
		let targetLineIndex = ref.line;
		if (this.params.targetTrackId) {
			const targetRef = this.ctx.resolveClip(this.params.targetTrackId);
			if (!targetRef) {
				throw new ToolError(
					E.TRACK_NOT_FOUND,
					`目标行参照片段 ${this.params.targetTrackId} 不存在`,
					{ kind: "target" },
				);
			}
			// 目标行的容器类型必须与片段同类型（仅接受同 type 轨道行）
			const targetLine = this.ctx.trackList[targetRef.line];
			if (targetLine.type !== clip.type) {
				throw new ToolError(
					E.TRACK_NOT_FOUND,
					`目标行类型 ${targetLine.type} 与片段类型 ${clip.type} 不同，仅接受同类型轨道行`,
					{ kind: "type-mismatch" },
				);
			}
			targetLineIndex = targetRef.line;
		}
		const duration = clip.end - clip.start;
		// checkTrackOverlap 只读 start/end；spread 出纯数据探针避免构造类实例
		const probe = { start, end: start + duration } as unknown as Track;
		const targetLine = this.ctx.trackList[targetLineIndex];
		const moveIndex = targetLineIndex === ref.line ? ref.index : -1;
		const { hasOverlap, insertIndex } = checkTrackOverlap(
			targetLine.list,
			probe,
			moveIndex,
		);
		if (hasOverlap) {
			throw new ToolError(
				E.OVERLAP,
				`目标位 ${start}–${start + duration} 与既有片段重叠`,
			);
		}
		const noOp = targetLineIndex === ref.line && start === clip.start;
		if (noOp) {
			// 移到原位 = 状态不变（真幂等特例）
			return {
				clipIds: [clip.id],
				frameStart: start,
				frameEnd: clip.end,
				summary: `片段已在原位 ${start}–${clip.end}`,
			};
		}
		// 逆操作：移动不改 id，原坐标即逆操作
		this.inverse = {
			fromLine: ref.line,
			fromIndex: ref.index,
			fromStart: clip.start,
			fromEnd: clip.end,
		};
		if (targetLineIndex !== ref.line) {
			this.ctx.trackList[ref.line].list.splice(ref.index, 1);
			targetLine.list.splice(insertIndex, 0, clip);
		}
		clip.start = start;
		clip.end = start + duration;
		return {
			clipIds: [clip.id],
			frameStart: start,
			frameEnd: clip.end,
			summary: `平移至 ${start}–${clip.end}${
				targetLineIndex !== ref.line ? `（第 ${targetLineIndex + 1} 行）` : ""
			}`,
		};
	}

	async undo(): Promise<void> {
		const inv = this.inverse;
		if (!inv) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		const ref = this.ctx.resolveClip(this.params.trackId);
		if (!ref) {
			throw new ToolError(
				E.UNDO_STALE,
				"被移动的片段已被手动编辑覆盖，无法精确撤销",
			);
		}
		const { clip } = ref;
		if (ref.line !== inv.fromLine) {
			this.ctx.trackList[ref.line].list.splice(ref.index, 1);
			const targetLine = this.ctx.trackList[inv.fromLine];
			const insertAt = Math.min(inv.fromIndex, targetLine.list.length);
			targetLine.list.splice(insertAt, 0, clip);
		}
		clip.start = inv.fromStart;
		clip.end = inv.fromEnd;
	}

	toJSON(): EditCommandJSON {
		return { cmd: "move_segment@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new MoveSegmentCmd(ctx, json.params as unknown as MoveSegmentParams);
	}
}

/* ============================== AddTextCmd ============================== */

export interface AddTextParams {
	text: string;
	startFrame: number;
	endFrame: number;
}

/** 新增文字片段（片头标题/花字）。inverse = 摘除该片段（轻 undo）。 */
export class AddTextCmd implements EditCommand {
	readonly label = "添加文字";
	readonly intent = "新增一段文字（片头标题/花字），落在文字轨上";
	private inverse?: { clipId: string };

	constructor(
		private ctx: CommandContext,
		private params: AddTextParams,
	) {}

	async do(): Promise<CommandEffect> {
		const { text, startFrame, endFrame } = this.params;
		if (!(endFrame > startFrame)) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				`时长非法（end ${endFrame} ≤ start ${startFrame}）`,
			);
		}
		if (endFrame - startFrame < Math.round(0.6 * this.ctx.fps)) {
			throw new ToolError(
				E.OUT_OF_RANGE,
				"文字时长不足 0.6s（防闪烁最小段宽）",
			);
		}
		const clip = await this.ctx.createClip({
			id: `txt_${nanoid(6)}`,
			type: "text",
			name: text.slice(0, 12) || "文本",
			start: startFrame,
			end: endFrame,
			frameCount: endFrame - startFrame,
			offsetL: 0,
			offsetR: 0,
			format: "text",
			resource: {
				id: `res_${nanoid(6)}`,
				name: text.slice(0, 12),
				type: "text",
				text,
			},
			text,
			fontSize: 24,
			fontFamily: "Arial",
			fill: "#FFF",
		});
		this.inverse = { clipId: clip.id };
		this.ctx.addClip(clip);
		return {
			clipIds: [clip.id],
			frameStart: startFrame,
			frameEnd: endFrame,
			summary: `新增文字「${text.slice(0, 12)}」`,
		};
	}

	async undo(): Promise<void> {
		const inv = this.inverse;
		if (!inv) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		const ref = this.ctx.resolveClip(inv.clipId);
		if (!ref) {
			throw new ToolError(
				E.UNDO_STALE,
				"文字片段已被手动编辑覆盖，无法精确撤销",
			);
		}
		this.ctx.trackList[ref.line].list.splice(ref.index, 1);
	}

	toJSON(): EditCommandJSON {
		return { cmd: "add_text@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new AddTextCmd(ctx, json.params as unknown as AddTextParams);
	}
}

/* ========================= UpdateSegmentTextCmd ========================= */

export interface UpdateSegmentTextParams {
	segmentId: string;
	text: string;
}

/** 改字幕文字（Descript 式改字），时长不动。inverse 换回旧文本（轻 undo）。 */
export class UpdateSegmentTextCmd implements EditCommand {
	readonly label = "修改字幕文字";
	readonly intent = "修改某条字幕的文字，不改时长";
	private inverse?: { segmentId: string; oldText: string };

	constructor(
		private ctx: CommandContext,
		private params: UpdateSegmentTextParams,
	) {}

	async do(): Promise<CommandEffect> {
		const seg = this.ctx.subtitleSegments.find(
			(s) => s.id === this.params.segmentId,
		);
		if (!seg) {
			throw new ToolError(
				E.TRACK_NOT_FOUND,
				`字幕段 ${this.params.segmentId} 不存在`,
				{ kind: "segment" },
			);
		}
		this.inverse = { segmentId: seg.id, oldText: seg.text };
		seg.text = this.params.text;
		return {
			clipIds: [],
			segmentIds: [seg.id],
			summary: `字幕改写为「${this.params.text.slice(0, 20)}」`,
		};
	}

	async undo(): Promise<void> {
		const inv = this.inverse;
		if (!inv) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		const seg = this.ctx.subtitleSegments.find((s) => s.id === inv.segmentId);
		if (!seg) {
			throw new ToolError(E.UNDO_STALE, "字幕段已被手动编辑覆盖，无法精确撤销");
		}
		seg.text = inv.oldText;
	}

	toJSON(): EditCommandJSON {
		return { cmd: "set_segment_text@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new UpdateSegmentTextCmd(
			ctx,
			json.params as unknown as UpdateSegmentTextParams,
		);
	}
}

/* ========================== ReplaceSegmentsCmd ========================== */

export interface ReplaceSegmentsParams {
	segments: SubtitleSegment[];
	/** 人话原因（卡片摘要用），如「重新转写」 */
	reason?: string;
}

/**
 * 整体替换字幕段（重转写落段，W6 修：原实现直接 setSegments 静默覆盖、
 * 不可撤销）。undo 完整恢复替换前的全部段落（含命令层编辑过的文本/时间）。
 */
export class ReplaceSegmentsCmd implements EditCommand {
	readonly label = "替换字幕段";
	readonly intent =
		"整体替换全部字幕段（重转写落段），替换前的段落（含编辑）完整可撤销";
	private inverse?: { prev: SubtitleSegment[] };

	constructor(
		private ctx: CommandContext,
		private params: ReplaceSegmentsParams,
	) {}

	async do(): Promise<CommandEffect> {
		this.inverse = {
			prev: this.ctx.subtitleSegments.map((s) => ({ ...s })),
		};
		this.ctx.setSubtitleSegments(this.params.segments);
		const reason = this.params.reason ? `（${this.params.reason}）` : "";
		return {
			clipIds: [],
			segmentIds: this.params.segments.map((s) => s.id),
			summary: `字幕整体替换为 ${this.params.segments.length} 段（原 ${
				this.inverse.prev.length
			} 段${reason}，可撤销）`,
		};
	}

	async undo(): Promise<void> {
		if (!this.inverse) {
			throw new ToolError(E.UNDO_STALE, "命令尚未执行，无法撤销");
		}
		this.ctx.setSubtitleSegments(this.inverse.prev);
	}

	toJSON(): EditCommandJSON {
		return { cmd: "replace_segments@1", params: { ...this.params } };
	}

	static fromJSON(ctx: CommandContext, json: EditCommandJSON) {
		return new ReplaceSegmentsCmd(
			ctx,
			json.params as unknown as ReplaceSegmentsParams,
		);
	}
}

/* ============================ 命令注册表 ============================ */

type CommandFactory = (
	ctx: CommandContext,
	json: EditCommandJSON,
) => EditCommand;

/** cmd 名 → fromJSON 工厂；回放/持久化恢复统一收口 */
export const commandRegistry = new Map<string, CommandFactory>([
	["split_at@1", (ctx, json) => SplitAtCmd.fromJSON(ctx, json)],
	["delete_range@1", (ctx, json) => DeleteRangeCmd.fromJSON(ctx, json)],
	["move_segment@1", (ctx, json) => MoveSegmentCmd.fromJSON(ctx, json)],
	["add_text@1", (ctx, json) => AddTextCmd.fromJSON(ctx, json)],
	[
		"set_segment_text@1",
		(ctx, json) => UpdateSegmentTextCmd.fromJSON(ctx, json),
	],
	["replace_segments@1", (ctx, json) => ReplaceSegmentsCmd.fromJSON(ctx, json)],
]);

export function commandFromJSON(
	ctx: CommandContext,
	json: EditCommandJSON,
): EditCommand {
	const factory = commandRegistry.get(json.cmd);
	if (!factory) {
		throw new ToolError(E.INTERNAL, `未知命令类型 ${json.cmd}`);
	}
	return factory(ctx, json);
}
