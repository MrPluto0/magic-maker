import { watch } from "vue";
import { TextTrack } from "@/class/TextTrack";
import { beginSilentBatch, endSilentBatch } from "@/plugins/undoGate";
import { usePlayerState } from "@/stores/player";
import type { SubtitleSegment, SubtitleStyle } from "@/stores/subtitle";
import { useSubtitleState } from "@/stores/subtitle";
import { useTrackState } from "@/stores/track";
import type { TrackLineItem } from "@/types/track";

/**
 * 字幕「数据源 → 视图」同步（W6，docs/BIG_ITERATION_PLAN §3.4）。
 *
 * subtitleStore.segments 是唯一事实源；专用字幕行（type 'text' +
 * isSubtitle 标记，main:false）上的每个 TextTrack 挂 segmentId 反向引用。
 * 本模块 diff 三方差异（增/删/改），幂等收敛：
 * - 段没了 → 对应 TextTrack 删；段新增 → 建 TextTrack；
 * - 文本/时间/全局样式变化 → 原地更新（clip id 稳定，agent 引用不漂移）；
 * - undo 重建 trackList 丢掉字幕行 → 下一次 reconcile 自愈补回。
 *
 * 渲染复用 TextTrack.draw()：底边定位用 bottomOffset 换算 centerY。
 * 同步期间的 trackList 变更走 silent（不进快照栈——段落数据归命令层 undo）。
 */

function isSubtitleLine(line: TrackLineItem): boolean {
	return line.type === "text" && line.isSubtitle === true;
}

/** 字幕 TextTrack 的全部可视属性（文本/时间/样式/定位） */
function applySegmentToTrack(
	track: TextTrack,
	seg: SubtitleSegment,
	style: SubtitleStyle,
	playerHeight: number,
) {
	track.segmentId = seg.id;
	track.text = seg.text;
	track.name = seg.text.slice(0, 12) || "字幕";
	track.start = seg.startFrame;
	track.end = Math.max(seg.endFrame, seg.startFrame + 1);
	track.frameCount = track.end - track.start;
	track.offsetL = 0;
	track.offsetR = 0;
	track.fill = style.fontColor;
	track.stroke = style.strokeSize > 0 ? style.strokeColor : undefined;
	track.strokeWidth = style.strokeSize;
	track.fontSize = style.fontSize;
	track.fontFamily = style.fontFamily;
	track.scale = 100;
	track.centerX = 0;
	track.calcSize();
	// 底边锚定：drawT = H/2 - drawH/2 + centerY，令 drawT + drawH = H - bottomOffset
	track.centerY = playerHeight / 2 - style.bottomOffset - track.drawHeight / 2;
}

let syncing = false;

export function reconcileSubtitleView(): void {
	if (syncing) return;
	const ts = useTrackState();
	const ss = useSubtitleState();
	const playerStore = usePlayerState();
	const segments = ss.segments;
	const style = ss.style;
	const playerHeight = playerStore.playerHeight;

	const lineIdx = ts.trackList.findIndex(isSubtitleLine);
	let line: TrackLineItem | null = lineIdx >= 0 ? ts.trackList[lineIdx] : null;

	// 现有字幕片段按 segmentId 归组（重复 id 只留第一个，其余视作孤儿）
	const bySegment = new Map<string, TextTrack>();
	const orphans: Array<{ index: number; track: TextTrack }> = [];
	if (line) {
		line.list.forEach((track, index) => {
			const sub = track as TextTrack;
			if (sub.segmentId && !bySegment.has(sub.segmentId)) {
				bySegment.set(sub.segmentId, sub);
			} else {
				orphans.push({ index, track: sub });
			}
		});
	}

	const adds: SubtitleSegment[] = [];
	let hasUpdate = false;
	for (const seg of segments) {
		const existing = bySegment.get(seg.id);
		if (!existing) {
			adds.push(seg);
			continue;
		}
		if (
			existing.text !== seg.text ||
			existing.start !== seg.startFrame ||
			existing.end !== seg.endFrame ||
			existing.fontSize !== style.fontSize ||
			existing.fill !== style.fontColor ||
			existing.stroke !==
				(style.strokeSize > 0 ? style.strokeColor : undefined) ||
			existing.fontFamily !== style.fontFamily
		) {
			hasUpdate = true;
		}
	}
	const removes =
		orphans.length +
		[...bySegment.keys()].filter((id) => !segments.some((s) => s.id === id))
			.length;

	if (
		adds.length === 0 &&
		removes === 0 &&
		!hasUpdate &&
		!line === (segments.length === 0)
	) {
		// 无漂移：不进 silent，避免误取消手操编辑的在途防抖快照
		return;
	}

	syncing = true;
	beginSilentBatch();
	try {
		// ① 删孤儿与失效段（倒序 splice；集合以「轨道片段 id」为准）
		if (line) {
			const deadSegIds = new Set(
				[...bySegment.keys()].filter(
					(id) => !segments.some((s) => s.id === id),
				),
			);
			const deadTrackIds = new Set(orphans.map((o) => o.track.id));
			for (const [segId, track] of bySegment) {
				if (deadSegIds.has(segId)) deadTrackIds.add(track.id);
			}
			for (let i = line.list.length - 1; i >= 0; i--) {
				const t = line.list[i] as TextTrack;
				if (deadTrackIds.has(t.id)) line.list.splice(i, 1);
			}
		}
		// ② 原地更新 + 新建
		for (const seg of segments) {
			const existing = bySegment.get(seg.id);
			if (existing) {
				applySegmentToTrack(existing, seg, style, playerHeight);
				continue;
			}
			const track = new TextTrack(
				{ name: "字幕", type: "text", text: seg.text },
				seg.startFrame,
			);
			applySegmentToTrack(track, seg, style, playerHeight);
			// 行内按 start 有序插入
			if (line) {
				let at = line.list.findIndex((t) => t.start > track.start);
				if (at < 0) at = line.list.length;
				line.list.splice(at, 0, track);
			} else {
				// 建专用字幕行：插在第一条音频行之前（字幕压在画面上、不与音频行混排）
				const newLine: TrackLineItem = {
					type: "text",
					main: false,
					isSubtitle: true,
					list: [track],
				};
				const audioIdx = ts.trackList.findIndex((l) => l.type === "audio");
				if (audioIdx >= 0) ts.trackList.splice(audioIdx, 0, newLine);
				else ts.trackList.push(newLine);
				line = newLine;
			}
		}
		// ③ 段落清空 → 摘除空字幕行（行号以实时查找为准，前面的插入可能移动了它）
		const cur = ts.trackList.findIndex(isSubtitleLine);
		if (
			segments.length === 0 &&
			cur >= 0 &&
			ts.trackList[cur].list.length === 0
		) {
			ts.trackList.splice(cur, 1);
		}
	} finally {
		endSilentBatch();
		syncing = false;
	}
}

let installed = false;

/** 安装同步 watcher（editor 挂载时调用，幂等）。segments/style/trackList/画布高任一变化都收敛一次。 */
export function installSubtitleSync(): void {
	if (installed) return;
	installed = true;
	const ts = useTrackState();
	const ss = useSubtitleState();
	const playerStore = usePlayerState();
	watch(
		() => [ss.segments, ss.style, ts.trackList, playerStore.playerHeight],
		() => reconcileSubtitleView(),
		{ deep: true, immediate: true },
	);
}
