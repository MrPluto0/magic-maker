import { UnitFrame2μs } from "@/data/track";
import type { BaseTrack, Track } from "@/types/track";

/**
 * 分割裁剪的纯函数：计算片段在原始 clip 本地坐标系（微秒）里的分割边界。
 *
 * - startUs：左半段的起点 = offsetL 对应的时间（clip.split(startUs)[1] 得到右半段）
 * - endUs：右半段在 clip 本地坐标系里的有效终点（clip.split(endUs)[0] 得到左半段）
 *
 * offsetL/offsetR 语义是「相对素材原点的裁剪帧数」，
 * frameCount - offsetR - offsetL = 片段当前的实际有效帧数（end - start）。
 */
export function splitClipBoundaries(
	offsetL: number,
	offsetR: number,
	frameCount: number,
) {
	return {
		startUs: offsetL * UnitFrame2μs,
		endUs: (frameCount - offsetR - offsetL) * UnitFrame2μs,
	};
}

/**
 * 分割纯函数：计算片段在 frame 处切开后两半的裁剪字段（W5 自 splitTrack 推广）。
 *
 * 不变量（与 splitClipBoundaries 同一语义）：offsetL + (end - start) + offsetR = frameCount。
 * - 左半段：end 收到 frame，右缘裁剪量增加 (end - frame)
 * - 右半段：start 从 frame 起步，左缘裁剪量增加 (frame - start)
 *
 * 原 splitTrack 的公式（offsetR = frameCount + start - frame）在 offsetL=0 时与
 * 本函数等价；offsetL≠0 时原式会破坏不变量，这里以不变量版本为准。
 * 只读入参、返回纯数据，不携带 id（id 由调用方 splitAt 复用/新生成）。
 */
export function computeSplitAt(
	clip: Pick<BaseTrack, "start" | "end" | "offsetL" | "offsetR">,
	frame: number,
): {
	left: { end: number; offsetR: number };
	right: { start: number; offsetL: number };
} {
	return {
		left: { end: frame, offsetR: clip.offsetR + (clip.end - frame) },
		right: { start: frame, offsetL: clip.offsetL + (frame - clip.start) },
	};
}

/**
 * 检查 checkItem 是否与当前 trackList 存在帧重叠部分
 * */
export function checkTrackOverlap(
	trackList: Track[],
	checkItem: Track,
	moveIndex = -1,
) {
	const { start: insertStart, end: insertEnd } = checkItem;
	let overLapIndex = -1;
	let insertIndex = 0;
	const hasOverlap = trackList.some((trackItem, index) => {
		if (moveIndex !== -1 && index === moveIndex) {
			// 行内移动情况下忽略掉移动元素
			return false;
		}
		const { start, end } = trackItem;
		// 当前列表中元素 开始帧处于新元素内部，或结束帧处于新元素内部，则视为重叠
		if (
			(start <= insertStart && end >= insertEnd) || // 添加节点的开始和结束位置位于老节点外 或 两端相等
			(start >= insertStart && start < insertEnd) || // 老节点开始位置在添加节点内部
			(end > insertStart && end <= insertEnd) // 老节点结束位置在添加节点内部
		) {
			overLapIndex = index;
			return true;
		} else {
			if (end <= insertStart) {
				insertIndex = index + 1;
			}
			return false;
		}
	});
	return {
		hasOverlap,
		overLapIndex,
		insertIndex,
	};
}
