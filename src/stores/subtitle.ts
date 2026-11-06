import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 字幕段落 store（阶段二字幕唯一事实源，docs/BIG_ITERATION_PLAN §3.4）。
 *
 * segments 是唯一事实源，时间轴上的字幕行 TextTrack 只是视图
 * （src/class/subtitleView.ts 做 diff 同步，不允许直接改字幕行）。
 *
 * W6 增补：全局 SubtitleStyle（承接 AudioTrack.subtitle 死配置的语义，
 * 旧字段已删，不留两份事实）；subtitles 随项目 JSON 持久化（saveProject）。
 *
 * undo 归命令层（DeleteRangeCmd 等），不进快照栈。
 */
export interface SubtitleSegment {
	id: string;
	text: string;
	/** 项目时间轴帧（与 BaseTrack.start/end 同单位） */
	startFrame: number;
	endFrame: number;
	/** 引用全局字幕样式（W6 单一全局样式，预留多样式位） */
	styleId?: string;
}

/** 全局字幕样式（对齐原 AudioTrack.ISubtitle 的字段语义） */
export interface SubtitleStyle {
	fontSize: number;
	fontColor: string;
	strokeSize: number;
	strokeColor: string;
	/** 距画面底部的边距（px，按导出画布高度） */
	bottomOffset: number;
	fontFamily: string;
}

export const DEFAULT_SUBTITLE_STYLE: SubtitleStyle = {
	fontSize: 40,
	fontColor: "#ffffff",
	strokeSize: 4,
	strokeColor: "#000000",
	bottomOffset: 30,
	fontFamily: "Noto Sans SC",
};

/** 项目持久化形态（saveProject 进 ProjectData.subtitles） */
export interface SubtitleProjectData {
	segments: SubtitleSegment[];
	style: SubtitleStyle;
}

export const useSubtitleState = defineStore(
	"subtitle",
	() => {
		const segments = ref<SubtitleSegment[]>([]);
		const style = ref<SubtitleStyle>({ ...DEFAULT_SUBTITLE_STYLE });

		/**
		 * 最近一次转写落段时的基线快照（W6 修：重转写覆盖提示用）。
		 * 会话内存活、不持久化——重启后无基线视为「无编辑差异」，
		 * 不影响可撤销性（撤销走命令层/快照层）。
		 */
		const transcribeBaseline = ref<SubtitleSegment[] | null>(null);

		/** 转写落段后登记基线（缺省 = 当前 segments 的浅拷贝） */
		function markTranscribeBaseline(segs?: SubtitleSegment[]) {
			transcribeBaseline.value = (segs ?? segments.value).map((s) => ({
				...s,
			}));
		}

		/**
		 * 当前 segments 相对转写基线的编辑数（改动/新增/删除各计 1）。
		 * 无基线（从未转写/重启后）= 0。O(n) id 索引 diff，段落量级几十条。
		 */
		function countSegmentEdits(): number {
			const base = transcribeBaseline.value;
			if (!base) return 0;
			const baseById = new Map(base.map((s) => [s.id, s]));
			const curIds = new Set(segments.value.map((s) => s.id));
			let edits = 0;
			for (const cur of segments.value) {
				const b = baseById.get(cur.id);
				if (!b) {
					edits += 1; // 新增
					continue;
				}
				if (
					b.text !== cur.text ||
					b.startFrame !== cur.startFrame ||
					b.endFrame !== cur.endFrame
				) {
					edits += 1; // 文本/时间被改
				}
			}
			for (const b of base) {
				if (!curIds.has(b.id)) edits += 1; // 被删
			}
			return edits;
		}

		/** 整体替换（transcribe 落段 / 命令 undo 还原 / 项目恢复） */
		function setSegments(next: SubtitleSegment[]) {
			segments.value.splice(
				0,
				segments.value.length,
				...next.map((s) => ({ ...s })),
			);
		}

		/** 全局样式变更（批量联动字幕行由 subtitleView 完成） */
		function setStyle(patch: Partial<SubtitleStyle>) {
			style.value = { ...style.value, ...patch };
		}

		function makeSegment(
			text: string,
			startFrame: number,
			endFrame: number,
			styleId = "default",
		) {
			return {
				id: `seg_${nanoid(8)}`,
				text,
				startFrame,
				endFrame,
				styleId,
			};
		}

		return {
			segments,
			style,
			setSegments,
			setStyle,
			makeSegment,
			transcribeBaseline,
			markTranscribeBaseline,
			countSegmentEdits,
		};
	},
	{
		// 段落数据随项目草稿持久化（saveProject 的 subtitles 字段）；
		// undo 走命令层，不进快照栈
	},
);
