import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * 字幕段落 store（阶段二字幕唯一事实源，docs/PHASE2_DESIGN §3.2）。
 *
 * W5 最小形态：segments 数组 + 原子写入口。W6 transcribe 落段、
 * W8 字幕面板都改这里再由「数据源 → 视图同步」刷 TextTrack，
 * 不允许直接改字幕行 TextTrack（两份事实）。
 *
 * undo 归命令层（DeleteRangeCmd 等），不进快照栈。
 */
export interface SubtitleSegment {
	id: string;
	text: string;
	/** 项目时间轴帧（与 BaseTrack.start/end 同单位） */
	startFrame: number;
	endFrame: number;
}

export const useSubtitleState = defineStore(
	"subtitle",
	() => {
		const segments = ref<SubtitleSegment[]>([]);

		/** 整体替换（transcribe 落段 / 命令 undo 还原） */
		function setSegments(next: SubtitleSegment[]) {
			segments.value.splice(
				0,
				segments.value.length,
				...next.map((s) => ({ ...s })),
			);
		}

		function makeSegment(text: string, startFrame: number, endFrame: number) {
			return { id: `seg_${nanoid(8)}`, text, startFrame, endFrame };
		}

		return { segments, setSegments, makeSegment };
	},
	{
		// 段落数据 W5 起先随项目草稿之外的会话存续；undo 走命令层，不进快照栈
	},
);
