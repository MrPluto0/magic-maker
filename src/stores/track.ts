import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { Resource } from "@/types/resource";
import { VideoTrack } from "@/class/VideoTrack";
import { usePlayerState } from "./player";
import { ImageTrack } from "@/class/ImageTrack";
import { AudioTrack } from "@/class/AudioTrack";
import { TextTrack } from "@/class/TextTrack";
import type { Track, TrackLineItem } from "@/types/track";
import { useResourceState } from "./resource";
import { decoder } from "@/class/Decoder";
import { checkTrackOverlap } from "@/utils/track";

export const useTrackState = defineStore(
  "track",
  () => {
    const playStore = usePlayerState();
    const resourceStore = useResourceState();

    // 轨道放大比例
    const trackScale = ref(parseInt(localStorage.trackS || "60"));
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
          res
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
      volume = 1
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
        (line) => line.type === newItem.type
      );

      for (let index = 0; index < lines.length; index++) {
        const line = lines[index];
        const { hasOverlap, insertIndex } = checkTrackOverlap(
          line.list,
          newItem
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
        playStore.playStartFrame
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

    async function splitTrack() {
      if (!selectTrack.value) {
        return;
      }
      // 判断分割时间是否在视频内
      const { line, index } = selectTrackItem;
      const splitFrame = playStore.playStartFrame;
      const target = selectTrack.value;

      if (splitFrame > target.start && splitFrame < target.end) {
        const originEnd = target.end;
        const originOffsetR = target.offsetR;
        target.end = splitFrame;
        target.offsetR = target.frameCount + target.start - splitFrame;

        // 根据cutFrame对视频进行分割
        const copy = await copyTrack(target);
        if (copy) {
          copy.start = splitFrame;
          copy.offsetL = splitFrame - target.start + target.offsetL;
          copy.end = originEnd;
          copy.offsetR = originOffsetR;
          trackList.value[line].list.splice(index + 1, 0, copy);
        }
      }
    }

    /**
     * 加载轨道数据
     */
    const loadTrackData = async (trackData: TrackLineItem[]) => {
      const newTrackList: TrackLineItem[] = [];

      for (let i = 0; i < trackData.length; i++) {
        const trackLine = trackData[i];
        const trackLineList: Track[] = [];

        if (trackLine.list.length === 0) {
          continue;
        }

        for (let j = 0; j < trackLine.list.length; j++) {
          const item = trackLine.list[j];

          const track = await createTrack(
            item.resource,
            item.start,
            item?.["volume"] ?? 1
          );

          // 复制其他属性
          const id = track.id;
          Object.assign(track, item);

          // 重新加载资源，例如本地文件的URL会重新构建
          track.resource = resourceStore.getResourceById(item.resource.id);
          track.id = id;

          trackLineList.push(track);
        }

        newTrackList.push({
          main: trackLine.main,
          type: trackLine.type,
          list: trackLineList,
        });
      }

      trackList.value.splice(0, trackList.value.length, ...newTrackList);
    };

    // @ts-expect-error
    window.clearTrack = () => {
      trackList.value = [];
      selectTrackItem.line = -1;
      selectTrackItem.index = -1;
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
      selectTrackById,
      loadTrackData,
    };
  },
  {
    undo: {
      watch: ["trackList", "trackScale"],
    },
  }
);
