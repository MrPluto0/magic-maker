import { baseFps } from "@/data/track";
import type { Resource } from "@/types/resource";
import { rebuildTrack } from "@/utils/trackData";
import type { CommandContext } from "./commands";
import { findClipInList } from "./commands";

/**
 * 真实命令上下文：把 pinia store 原语适配成 CommandContext。
 * 动态 import store——本模块在 Node（tools.json 生成脚本）里只被类型引用，
 * 不触发浏览器侧模块图。
 */
export async function createCommandContext(): Promise<CommandContext> {
	const [{ useTrackState }, { useSubtitleState }, { useResourceState }] =
		await Promise.all([
			import("@/stores/track"),
			import("@/stores/subtitle"),
			import("@/stores/resource"),
		]);
	const trackStore = useTrackState();
	const subtitleStore = useSubtitleState();
	const resourceStore = useResourceState();

	return {
		fps: baseFps,
		trackList: trackStore.trackList,
		resolveClip: (trackId) => findClipInList(trackStore.trackList, trackId),
		splitClipAt: (line, index, frame) => trackStore.splitAt(line, index, frame),
		createClip: (data) =>
			rebuildTrack(
				data,
				(resource, startFrame, volume) =>
					trackStore.createTrack(resource as Resource, startFrame, volume),
				(d) => resourceStore.getResourceById(d.resource.id),
			),
		rebuildTrackList: (data) => trackStore.loadTrackData(data),
		addClip: (clip) => trackStore.addTrack(clip),
		subtitleSegments: subtitleStore.segments,
		setSubtitleSegments: (next) => subtitleStore.setSegments(next),
	};
}
