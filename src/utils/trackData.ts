import type {
	Track,
	TrackData,
	TrackLineData,
	TrackLineItem,
} from "@/types/track";

/**
 * trackList ⇄ TrackData 纯数据投影工具（W4 undo 序列化重建）。
 *
 * - plainify*：类实例 → 纯数据。只取自有可枚举字段，方法/getter（drawWidth 等
 *   挂在原型上）天然被排除，嵌套对象递归拷贝，产物可安全 JSON.stringify。
 * - rebuild*：纯数据 → 类实例。类实例的构造依赖 decoder/resourceStore，
 *   这里通过注入的工厂函数（store.createTrack）与资源解析器完成重建，
 *   本模块保持纯函数、可单测。
 */

function toPlain(value: unknown): unknown {
	if (Array.isArray(value)) {
		return value.map(toPlain);
	}
	if (value !== null && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [key, val] of Object.entries(value as object)) {
			out[key] = toPlain(val);
		}
		return out;
	}
	return value;
}

/**
 * 单个轨道片段 → 纯数据投影。
 * 只拷贝自有可枚举字段：类方法与原型 getter 不会进入快照。
 */
export function plainifyTrack(track: Track): TrackData {
	return toPlain(track) as TrackData;
}

/** 整个轨道线列表 → 纯数据投影（undo 快照 / 草稿持久化的序列化形态） */
export function plainifyTrackList(trackList: TrackLineItem[]): TrackLineData[] {
	return trackList.map((line) => ({
		type: line.type,
		main: line.main,
		isSubtitle: line.isSubtitle,
		list: line.list.map(plainifyTrack),
	}));
}

/** 轨道重建工厂：由 store 注入（内部走 createTrack → decoder.decode 命中缓存） */
export type TrackFactory = (
	resource: TrackData["resource"],
	startFrame: number,
	volume?: number,
) => Promise<Track>;

/** 资源解析器：把 JSON 快照里的资源引用换回 store 里的活资源实例 */
export type ResourceResolver = (data: TrackData) => Track["resource"];

/**
 * 单个纯数据片段 → 类实例。
 * - 工厂创建实例（解码走 decoder.clipMap 按 resource.id 缓存，undo 不重复解码）
 * - Object.assign 回填裁剪/样式等全部快照字段
 * - id 保持快照原值，片段身份在 undo 前后稳定
 * - resolveResource 重挂活资源（blob: url 等运行期字段需以 store 为准）
 */
export async function rebuildTrack(
	data: TrackData,
	createTrack: TrackFactory,
	resolveResource?: ResourceResolver,
): Promise<Track> {
	const track = await createTrack(data.resource, data.start, data.volume ?? 1);
	const freshId = track.id;
	Object.assign(track, data);
	track.id = data.id || freshId;
	const resource = resolveResource?.(data);
	if (resource) {
		(track as { resource: Track["resource"] }).resource = resource;
	}
	return track;
}

/**
 * 纯数据轨道线列表 → 类实例轨道线列表。
 * 跳过空轨道线（与 loadTrackData 原行为一致）。
 */
export async function rebuildTrackList(
	data: TrackLineData[],
	createTrack: TrackFactory,
	resolveResource?: ResourceResolver,
): Promise<TrackLineItem[]> {
	const result: TrackLineItem[] = [];
	for (const line of data) {
		if (!line.list?.length) {
			continue;
		}
		const list: Track[] = [];
		for (const item of line.list) {
			list.push(await rebuildTrack(item, createTrack, resolveResource));
		}
		result.push({
			type: line.type,
			main: line.main,
			isSubtitle: line.isSubtitle,
			list,
		});
	}
	return result;
}
