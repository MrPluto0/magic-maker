import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { Resource } from "@/types/resource";
import {
  audioDecoder,
  imageDecoder,
  subtitleDecoder,
  videoDecoder,
} from "@/utils/webcodecs";
import { VideoTrack } from "@/class/VideoTrack";
import { usePlayerState } from "./player";
import { ImageTrack } from "@/class/ImageTrack";
import { AudioTrack } from "@/class/AudioTrack";
import { TextTrack } from "@/class/TextTrack";
import { Track, TrackLineItem } from "@/types/track";
import { useResourceState } from "./resource";

/**
 * 检查 checkItem 是否与当前 trackList 存在帧重叠部分
 * */
export function checkTrackListOverlap(
  trackList: Track[],
  checkItem: Track,
  moveIndex = -1
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

export const useTrackState = defineStore(
  "track",
  () => {
    const playStore = usePlayerState();
    const resourceStore = useResourceState();

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

    /**
     * 创建轨道
     * @param resource 资源对象
     * @param startFrame 起始帧
     * @param volume 音量（仅音频）
     */
    const createTrack = async (
      resource: Resource,
      startFrame: number = playStore.playStartFrame,
      volume = 1
    ): Promise<Track> => {
      if (resource.type === "video") {
        const videoTrack = new VideoTrack(resource, startFrame);
        await videoDecoder.decode(videoTrack);
        return videoTrack;
      }

      if (resource.type === "image") {
        const imageTrack = new ImageTrack(resource, startFrame);
        await imageDecoder.decode(imageTrack, resource.format);
        return imageTrack;
      }

      if (resource.type === "audio") {
        const audioTrack = new AudioTrack(resource, startFrame, volume);
        await audioDecoder.decode(audioTrack);
        // 检查是否有字幕数据
        if ("subtitle" in resource && resource.subtitle) {
          await subtitleDecoder.decode(audioTrack, resource.subtitle);
        }
        return audioTrack;
      }

      if (resource.type === "text") {
        // 对于文本资源，创建文本轨道
        const textTrack = new TextTrack(
          {
            text: resource.content,
            fontSize: 24,
            fontFamily: "Arial",
            name: resource.name,
            fill: "#FFF",
            stroke: undefined,
            textBackgroundColor: undefined,
          },
          startFrame
        );
        return textTrack;
      }

      // @ts-expect-error
      throw new Error(`不支持的资源类型: ${resource.type}`);
    };

    /**
     * 从资源ID创建轨道
     */
    const createTrackFromResourceId = async (
      resourceId: string,
      startFrame: number = playStore.playStartFrame,
      volume = 1
    ): Promise<Track | null> => {
      const resource = resourceStore.getResourceById(resourceId);
      if (!resource) {
        console.error(`Resource not found: ${resourceId}`);
        return null;
      }

      return createTrack(resource, startFrame, volume);
    };

    const copyTrack = async (item: Track) => {
      // 通过resourceId获取原始资源
      let resource: Resource;
      if ("resourceId" in item && item.resourceId) {
        resource = resourceStore.getResourceById(item.resourceId);
        if (!resource) {
          console.error(`Resource not found: ${item.resourceId}`);
          return null;
        }
      } else {
        console.error("Track missing resource reference");
        return null;
      }

      let newTrack = await createTrack(resource, item.start);
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

      if (["audio"].includes(newItem.type)) {
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
     * 从资源添加轨道
     */
    async function addTrackFromResource(
      resource: Resource,
      startFrame?: number
    ) {
      try {
        const track = await createTrack(resource, startFrame);
        addTrack(track);
        return track;
      } catch (error) {
        console.error("Failed to create track from resource:", error);
        ElMessage.error("创建轨道失败");
        return null;
      }
    }

    /**
     * 添加文本轨道
     */
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
        if (copy) {
          copy.start = splitFrame;
          copy.offsetL = splitFrame - target.start + target.offsetL;
          copy.end = originEnd;
          copy.offsetR = originOffsetR;
          trackList.value[line].list.splice(index + 1, 0, copy);
        }
      }
    }

    return {
      moveTrackData,
      copyData,
      frameCount,
      dragData,
      selectTrackItem,
      selectResource,
      trackScale,
      trackList,

      // 轨道操作
      createTrack,
      createTrackFromResourceId,
      copyTrack,
      addTrack,
      addTrackFromResource,
      addText,
      removeTrack,
      leftLink,
      splitTrack,

      // 轨道选择
      selectTrackById,
    };
  },
  {
    undo: {
      watch: ["trackList"],
    },
  }
);
