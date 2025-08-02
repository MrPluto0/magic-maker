import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { checkTrackListOverlap } from "@/utils/storeUtil";
import { Resource } from "@/types/resource";
import { fetch2Stream } from "@/utils/file";
import {
  audioDecoder,
  imageDecoder,
  subtitleDecoder,
  videoDecoder,
} from "@/utils/webcodecs";
import { VideoTrack } from "@/class/VideoTrack";
import { usePlayerState } from "./playerState";
import { ImageTrack } from "@/class/ImageTrack";
import { AudioTrack } from "@/class/AudioTrack";
import { TextResource, TextTrack } from "@/class/TextTrack";
import { Track } from "@/types/track";

export const useTrackState = defineStore(
  "trackState",
  () => {
    const playStore = usePlayerState();

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
    const copyData = ref<Track>();

    const moveTrackData = reactive({
      // 行内移动
      lineIndex: -1,
      itemIndex: -1,
    });

    // 轨道放大比例
    const trackScale = ref(parseInt(localStorage.trackS || "60"));
    const trackList = ref<TrackLineItem[]>([]);
    // const { history, undo, redo } = useDebouncedRefHistory(trackList.valueRef, {
    //   deep: true,
    //   debounce: 1000,
    // });

    // 选中元素坐标
    const selectTrackItem = reactive({
      line: -1,
      index: -1,
    });

    // 选中元素
    const selectResource = computed<Track>(() => {
      if (selectTrackItem.line === -1) {
        return null;
      }
      return (
        trackList.value[selectTrackItem.line]?.list[selectTrackItem.index] ||
        null
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
      if (!selectResource.value) {
        return;
      }
      const lineIndex = selectTrackItem.line;
      const itemIndex = selectTrackItem.index;
      // @ts-ignore
      selectResource.value?.pause && selectResource.value?.pause();
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

    const createTrack = async (
      data: Resource | TextResource,
      startFrame: number = playStore.playStartFrame,
      volume = 1
    ): Promise<Track> => {
      if (data.type === "video") {
        const videoTrack = new VideoTrack(data as Resource, startFrame);
        await videoDecoder.decode(videoTrack);
        return videoTrack;
      }

      if (data.type === "image") {
        const imageTrack = new ImageTrack(data as Resource, startFrame);
        await imageDecoder.decode(imageTrack, `image/${data.format}`);
        return imageTrack;
      }

      if (["audio", "music", "speech"].includes(data.type)) {
        const audioTrack = new AudioTrack(data as Resource, startFrame, volume);
        await audioDecoder.decode(audioTrack);
        if (data.subtitle) {
          await subtitleDecoder.decode(audioTrack, data.subtitle);
        }
        return audioTrack;
      }

      console.error("不支持的资源类型", data.type);
    };

    const copyTrack = async (item: Track) => {
      let newTrack = await createTrack(item.source, item.start);
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
        const { hasOverlap, insertIndex } = checkTrackListOverlap(
          line.list,
          newItem
        );

        if (!hasOverlap) {
          line.list.splice(insertIndex, 0, newItem);
          selectTrackItem.line = index;
          selectTrackItem.index = insertIndex;
          return;
        }
      }

      if (["audio"].includes(newItem.type)) {
        trackList.value.push({
          type: newItem.type,
          list: [newItem],
        });
        selectTrackItem.line = 0;
        selectTrackItem.index = 0;
      } else {
        trackList.value.unshift({
          type: newItem.type,
          list: [newItem],
        });
        selectTrackItem.line = trackList.value.length - 1;
        selectTrackItem.index = 0;
      }
    }

    function addText() {
      const selection = window.getSelection().toString();
      const track = new TextTrack(
        {
          text: selection === "" ? "文本内容" : selection,
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
      if (!selectResource.value) {
        return;
      }
      // 判断分割时间是否在视频内
      const { line, index } = selectTrackItem;
      let splitFrame = playStore.playStartFrame;
      let target = selectResource.value;

      if (splitFrame > target.start && splitFrame < target.end) {
        const originEnd = target.end;
        const originOffsetR = target.offsetR;
        target.end = splitFrame;
        target.offsetR = target.frameCount + target.start - splitFrame;

        // 根据cutFrame对视频进行分割
        const copy = await copyTrack(target);
        copy.start = splitFrame;
        copy.offsetL = splitFrame - target.start + target.offsetL;
        copy.end = originEnd;
        copy.offsetR = originOffsetR;
        trackList.value[line].list.splice(index + 1, 0, copy);
      }
    }

    //@ts-ignore
    window.show = () => {
      console.log(trackList.value);
    };

    //@ts-ignore
    window.clearTrack = () => {
      selectTrackItem.line = -1;
      selectTrackItem.index = -1;
      trackList.value.splice(0, trackList.value.length);
    };

    return {
      moveTrackData,
      copyData,
      frameCount,
      dragData,
      selectTrackItem,
      selectResource,
      trackScale,
      trackList,
      createTrack,
      copyTrack,
      addText,
      addTrack,
      selectTrackById,
      removeTrack,
      leftLink,
      splitTrack,
    };
  },
  {
    undo: {
      watch: ["trackList"],
    },
  }
);
