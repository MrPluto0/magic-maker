import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { AudioTrack } from "@/class/AudioTrack";
import { decoder } from "@/class/Decoder";
import { ImageTrack } from "@/class/ImageTrack";
import { TextTrack } from "@/class/TextTrack";
import { VideoTrack } from "@/class/VideoTrack";
import type { Resource } from "@/types/resource";
import type { Track, TrackLineData, TrackLineItem } from "@/types/track";
import { checkTrackOverlap, computeSplitAt } from "@/utils/track";
import { plainifyTrackList, rebuildTrackList } from "@/utils/trackData";
import { usePageState } from "./page";
import { usePlayerState } from "./player";
import { useResourceState } from "./resource";
import { type SubtitleSegment, useSubtitleState } from "./subtitle";

export const useTrackState = defineStore(
	"track",
	() => {
		const playStore = usePlayerState();
		const resourceStore = useResourceState();
		const pageStore = usePageState();

		// 轨道放大比例（持久化收敛到 page store，不再裸读 localStorage）
		const trackScale = computed({
			get: () => pageStore.trackScale,
			set: (value: number) => {
				pageStore.trackScale = value;
			},
		});
		const trackList = ref<TrackLineItem[]>([]);

		const copyData = ref<Track>();
		const moveTrackData = reactive({
			// 行内移动
			lineIndex: -1,
			itemIndex: -1,
		});
		const dragData = reactive({
			// 拖拽数据
			dataInfo: {} as Track | Resource,
			dragType: "",
			dragPoint: {
				x: 0,
				y: 0,
			},
			// 吸附辅助线
			fixLines: [] as { position: number; frame: number }[][],
			moveX: 0,
			moveY: 0,
		});

		// 选中元素坐标
		const selectTrackItem = reactive({
			line: -1,
			index: -1,
		});

		// 选中元素
		const selectTrack = computed<Track | null>(() => {
			if (selectTrackItem.line === -1) {
				return null;
			}
			return (
				trackList.value?.[selectTrackItem.line]?.list?.[
					selectTrackItem.index
				] || null
			);
		});

		const frameCount = computed(() => {
			const total = trackList.value.reduce((res, { list }) => {
				return Math.max(
					list.reduce((max, track) => Math.max(max, track.end), 0),
					res,
				);
			}, 0);
			return Math.floor(total);
		});

		// 删除元素
		function removeTrack() {
			if (!selectTrack.value) {
				return;
			}
			const lineIndex = selectTrackItem.line;
			const itemIndex = selectTrackItem.index;
			// @ts-expect-error
			selectTrack.value?.pause && selectTrack.value?.pause();
			trackList.value[lineIndex].list.splice(itemIndex, 1);
			if (
				trackList.value[lineIndex].list.length === 0 &&
				!trackList.value[lineIndex].main
			) {
				trackList.value.splice(lineIndex, 1);
			}
			if (
				trackList.value.length === 1 &&
				trackList.value[0].list.length === 0
			) {
				trackList.value.splice(0, 1);
			}
			selectTrackItem.line = -1;
			selectTrackItem.index = -1;
		}

		function selectTrackById(id: string) {
			trackList.value.forEach((item, index) => {
				item.list.forEach((trackItem, trackIndex) => {
					if (trackItem.id === id) {
						selectTrackItem.line = index;
						selectTrackItem.index = trackIndex;
					}
				});
			});
		}

		/**
		 * 创建轨道
		 */
		const createTrack = async (
			resource: Resource,
			startFrame: number = playStore.playStartFrame,
			volume = 1,
		): Promise<Track> => {
			switch (resource.type) {
				case "video": {
					const videoTrack = new VideoTrack(resource, startFrame);
					await decoder.decode(videoTrack);
					return videoTrack;
				}
				case "image": {
					const imageTrack = new ImageTrack(resource, startFrame);
					await decoder.decode(imageTrack);
					return imageTrack;
				}
				case "audio": {
					const audioTrack = new AudioTrack(resource, startFrame, volume);
					await decoder.decode(audioTrack);
					return audioTrack;
				}
				case "text": {
					const textTrack = new TextTrack({ name: resource.name }, startFrame);
					return textTrack;
				}
				default:
					throw new Error(`不支持的资源类型: ${resource}`);
			}
		};

		const copyTrack = async (item: Track) => {
			const newTrack = await createTrack(item.resource as Resource, item.start);
			const id = newTrack.id;
			Object.assign(newTrack, item);
			newTrack.id = id;
			return newTrack;
		};

		/**
		 * 添加片段逻辑：
		 * 输入：新增片段
		 * 查询是否存在同类型轨道，且无重叠部分，存在则插入，不存在则新建轨道
		 * 没有轨道时，新增轨道插入
		 */
		function addTrack(newItem: Track) {
			const lines = trackList.value.filter(
				(line) => line.type === newItem.type,
			);

			for (let index = 0; index < lines.length; index++) {
				const line = lines[index];
				const { hasOverlap, insertIndex } = checkTrackOverlap(
					line.list,
					newItem,
				);

				if (!hasOverlap) {
					line.list.splice(insertIndex, 0, newItem);
					selectTrackItem.line = trackList.value.findIndex((l) => l === line);
					selectTrackItem.index = insertIndex;
					return;
				}
			}

			// 创建新轨道线
			const newTrackLine: TrackLineItem = {
				type: newItem.type,
				list: [newItem],
			};

			if (newItem instanceof AudioTrack) {
				trackList.value.push(newTrackLine);
				selectTrackItem.line = trackList.value.length - 1;
				selectTrackItem.index = 0;
			} else {
				trackList.value.unshift(newTrackLine);
				selectTrackItem.line = 0;
				selectTrackItem.index = 0;
			}
		}

		/**
		 * 添加文本轨道
		 */
		function addText() {
			const selection = window.getSelection().toString();
			const track = new TextTrack(
				{
					type: "text",
					text: selection ?? "文本内容",
					fontSize: 24,
					fontFamily: "Arial",
					name: "文本",
					fill: "#FFF",
					stroke: undefined,
					textBackgroundColor: undefined,
				},
				playStore.playStartFrame,
			);
			addTrack(track);
		}

		function leftLink() {
			if (selectTrackItem.index < 0) {
				return;
			}
			const selectedItem =
				trackList.value[selectTrackItem.line].list[selectTrackItem.index];
			let offsetFrame = 0;
			if (selectTrackItem.index < 1) {
				offsetFrame = selectedItem.start;
			} else {
				const leftItem =
					trackList.value[selectTrackItem.line].list[selectTrackItem.index - 1];
				offsetFrame = selectedItem.start - leftItem.end;
			}
			selectedItem.end -= offsetFrame;
			selectedItem.start -= offsetFrame;
		}

		/**
		 * 分割原语（W5 自 splitTrack 推广）：在任意片段的任意帧处切一刀。
		 * 供选中态分割（splitTrack）与命令层/工具层（SplitAtCmd）共用。
		 * frame 必须严格落在片段 (start, end) 开区间内。
		 * @returns 两段 id；片段不存在或 frame 越界返回 null
		 */
		async function splitAt(line: number, index: number, frame: number) {
			const target = trackList.value[line]?.list[index];
			if (!target) {
				return null;
			}
			if (frame <= target.start || frame >= target.end) {
				return null;
			}
			const { left, right } = computeSplitAt(target, frame);
			// 左半段原地改裁剪字段；右半段经 copyTrack 复制（解码走 clipMap 缓存）
			const originEnd = target.end;
			const originOffsetR = target.offsetR;
			Object.assign(target, left);
			const copy = await copyTrack(target);
			Object.assign(copy, right);
			copy.end = originEnd;
			copy.offsetR = originOffsetR;
			trackList.value[line].list.splice(index + 1, 0, copy);
			return { leftId: target.id, rightId: copy.id };
		}

		async function splitTrack() {
			if (!selectTrack.value) {
				return null;
			}
			// 判断分割时间是否在视频内
			const { line, index } = selectTrackItem;
			const splitFrame = playStore.playStartFrame;
			return splitAt(line, index, splitFrame);
		}

		/**
		 * 加载轨道数据（纯数据 → 类实例的同构重建）。
		 * 项目恢复（IDB 草稿）与 undo 序列化重建共用这条链路：
		 * createTrack → decoder.decode（clipMap 按 resource.id 缓存，不重复解码）
		 * → Object.assign 回填快照字段 → 重挂 store 里的活资源实例。
		 */
		const loadTrackData = async (trackData: TrackLineData[]) => {
			const newTrackList = await rebuildTrackList(
				trackData,
				(resource, startFrame, volume) =>
					createTrack(resource as Resource, startFrame, volume),
				(data) => resourceStore.getResourceById(data.resource.id),
			);

			trackList.value.splice(0, trackList.value.length, ...newTrackList);
		};

		return {
			moveTrackData,
			copyData,
			frameCount,
			dragData,
			selectTrackItem,
			selectTrack,
			trackScale,
			trackList,

			// 轨道操作
			createTrack,
			copyTrack,
			addTrack,
			addText,
			removeTrack,
			leftLink,
			splitTrack,
			splitAt,
			selectTrackById,
			loadTrackData,
		};
	},
	{
		undo: {
			// trackScale 已收敛到 page store，撤销栈只跟踪轨道数据。
			// W4：栈里只存 TrackData 纯数据 JSON（不再 cloneDeep 类实例快照），
			// 恢复经 loadTrackData 重建类实例（$patch 会丢原型、方法变 undefined）
			// W6 修：字幕段并入同一快照栈——Cmd+Z 一次回退轨道+字幕，
			// 两类状态不拆栈（拆了会各自回退到不同时刻，段与画面错位）。
			// subtitle store 无自身订阅快照，段落变更要么走命令（组级 _snap），
			// 要么与 trackList 变更同帧发生，由本栈统一捕获。
			watch: ["trackList"],
			serializer: {
				serialize: (trackList: TrackLineItem[]) =>
					JSON.stringify({
						trackList: plainifyTrackList(trackList),
						subtitles: useSubtitleState().segments.map((s) => ({ ...s })),
					}),
				deserialize: (json: string) => JSON.parse(json),
				restore: async (store, value) => {
					// applySnapshot 按 watch 键包了一层：value.trackList 才是上面的
					// { trackList, subtitles } 复合快照
					const snap = value.trackList as {
						trackList: TrackLineData[];
						subtitles?: SubtitleSegment[];
					};
					await store.loadTrackData(snap.trackList);
					useSubtitleState().setSegments(snap.subtitles ?? []);
				},
			},
		},
	},
);
