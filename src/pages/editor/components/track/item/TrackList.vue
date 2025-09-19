<template>
  <div
    class="trackList flex flex-1 flex-row w-full overflow-x-hidden overflow-y-auto relative"
  >
    <TrackListIcon :listData="store.trackList" :offsetTop="startY" />

    <div
      class="flex-1 overflow-x-scroll overflow-y-auto flex-col shrink-0 grow relative"
      ref="trackList"
      @scroll="handleScroll"
      @wheel.prevent="handleWheel"
      @click="setSelectTract"
    >
      <TimeLine
        :start="startX"
        :scale="trackScale"
        :step="baseFps"
        :focusPosition="store.selectTrack"
        @selectFrame="handlerSelectFrame"
      />
      <div
        class="absolute top-5 flex shrink-0 grow min-w-full"
        :style="{ 'min-height': 'calc(100% - 20px)' }"
        ref="trackListContainer"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
        @dragover.stop.prevent="setDropLineLeft"
        @drop="onDrop"
      >
        <template v-if="store.trackList.length === 0">
          <div
            class="flex justify-center items-center h-24 m-auto w-2/3 dark:bg-gray-500 bg-gray-200 rounded-md text-sm border-dashed border-2 dark:border-gray-500 border-gray-200 hover:dark:border-blue-300 hover:border-blue-400"
          >
            <i class="i-mdi-video text-xl mr-4" />
            将素材拖拽到这里，开始编辑你的大作吧~
          </div>
        </template>

        <template v-else>
          <div
            class="z-10 pt-5 pb-5 min-w-full flex shrink-0 grow flex-col justify-center min-h-full"
            :style="{ width: `${trackStyle.width}px` }"
            id="track-container"
          >
            <TrackLine
              v-for="(lineData, lineIndex) of store.trackList"
              :key="lineData.list.reduce((r, item) => r + item.id, 'line')"
              :style="{
                'margin-left': `${offsetLine.left}px`,
              }"
              :class="[
                dropLineIndex === lineIndex
                  ? insertBefore
                    ? 'showLine-t'
                    : 'showLine-b'
                  : '',
              ]"
              :lineType="lineData.type"
              :isActive="store.selectTrackItem.line === lineIndex"
              :lineIndex="lineIndex"
              :isMain="lineData.main"
              :lineData="lineData.list"
            />
          </div>
        </template>

        <!-- 播放点位 -->
        <TrackPlayPoint v-show="store.trackList.length !== 0" />

        <template v-if="store.trackList.length !== 0">
          <div
            v-for="(line, i) in store.dragData.fixLines.reduce(
              (r, item) => r.concat(item),
              []
            )"
            :key="i"
            class="z-30 w-px absolute -top-5 bottom-0 bg-yellow-300 dark:bg-yellow-300 pointer-events-none"
            :style="{ left: `${line.position + 10}px` }"
          />
        </template>

        <div
          v-if="store.trackList.length !== 0 && dropItemLeft !== 0"
          class="z-30 w-px absolute -top-5 bottom-0 bg-yellow-300 dark:bg-yellow-300"
          :style="{ left: `${dropItemLeft}px` }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimeLine from "./TimeLine.vue";
import TrackLine from "./TrackLine.vue";
import TrackListIcon from "./TrackListIcon.vue";
import TrackPlayPoint from "./TrackPlayPoint.vue";
import { getGridPixel, getSelectFrame } from "@/utils/canvasUtil";
import { useTrackState } from "@/stores/track";
import { usePlayerState } from "@/stores/player";
import { debounce } from "lodash-es";
import type { Resource } from "@/types/resource";
import { baseFps } from "@/data/track";
import type { Track } from "@/types/track";
import { checkTrackOverlap } from "@/utils/track";

// ========================= 状态管理 =========================
const store = useTrackState();
const playerStore = usePlayerState();

// ========================= 视图控制 =========================
const trackList = ref();
const trackListContainer = ref();
const offsetLine = { left: 10, right: 200 }; // 容器边距配置

// 视图偏移状态
const startX = ref(0 - offsetLine.left);
const startY = ref(0);

// 计算属性
const trackScale = computed(() => store.trackScale);
const trackStyle = computed(() => ({
  width: getGridPixel(trackScale.value, store.frameCount) + offsetLine.right,
}));

// ========================= 拖放状态 =========================
const dropLineIndex = ref(-1);
const dropItemLeft = ref(0);
const insertBefore = ref(true);
const dragPoint = computed(() => store.dragData.dragPoint);

// ========================= 拖拽系统 =========================
let dragElement: HTMLElement;
let curCoord = { left: 0, right: 0, start: 0, end: 0 };
let otherCoords: { left: number; right: number; start: number; end: number }[] =
  [];
let fixPosition = { left: 0, right: 0, start: 0, end: 0 };

/**
 * 获取元素计算位置
 */
function getComputedPosition(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return {
    left: parseInt(style.left),
    right: parseInt(style.left) + parseInt(style.width),
  };
}

/**
 * 检查轨道重叠并获取插入信息
 */
function checkOverlapAndGetInsertInfo(
  dragItem: Track,
  lineIndex: number,
  start: number,
  end: number
) {
  if (lineIndex >= store.trackList.length) {
    return { hasOverlap: false, insertIndex: 0 };
  }

  const line = store.trackList[lineIndex];
  if (dragItem.type !== line.type) {
    return { hasOverlap: true, insertIndex: 0 };
  }

  // 创建临时对象用于检测，只包含必要属性
  const testItem = {
    id: dragItem.id,
    type: dragItem.type,
    start,
    end,
  } as Track;

  return checkTrackOverlap(
    line.list.filter((item) => item.id !== dragItem.id),
    testItem
  );
}

/**
 * 获取插入行信息
 */
function getInsertLineInfo() {
  const center =
    dragElement.offsetTop +
    dragElement.offsetHeight / 2 +
    (dragElement.offsetParent as HTMLElement)?.offsetTop;
  const trackLines = Array.from(
    document.querySelectorAll(".trackLine")
  ) as HTMLElement[];

  if (trackLines[0]?.offsetTop > center) {
    return { isNewLine: true, insertIndex: 0 };
  }

  for (let i = 0; i < trackLines.length; i++) {
    const elem = trackLines[i];

    if (
      elem.offsetTop <= center &&
      elem.offsetTop + elem.offsetHeight >= center
    ) {
      return { isNewLine: false, insertIndex: i, elem };
    }

    if (i + 1 !== trackLines.length) {
      const nextElem = trackLines[i + 1];
      if (
        elem.offsetTop + elem.offsetHeight <= center &&
        nextElem.offsetTop >= center
      ) {
        return { isNewLine: true, insertIndex: i + 1 };
      }
    }
  }

  return { isNewLine: true, insertIndex: trackLines.length };
}

/**
 * 计算插入信息
 */
function calculateInsertInfo() {
  let { isNewLine, insertIndex, elem } = getInsertLineInfo();
  const style = getComputedPosition(dragElement);

  const left = fixPosition.left || style.left;
  const right = fixPosition.right || style.right;
  const start =
    fixPosition.start || getSelectFrame(left, store.trackScale, baseFps);
  const end =
    fixPosition.end || getSelectFrame(right, store.trackScale, baseFps);

  if (!elem) {
    return { insertIndex, itemIndex: 0, left, right, isNewLine, start, end };
  }

  const dragItem = store.dragData.dataInfo as Track;
  const { hasOverlap, insertIndex: itemIndex } = checkOverlapAndGetInsertInfo(
    dragItem,
    insertIndex,
    start,
    end
  );

  if (hasOverlap) {
    isNewLine = true;
    const center = elem.offsetLeft + elem.offsetWidth / 2;
    const dragCenter =
      dragElement.offsetTop +
      (dragElement.offsetParent as HTMLElement)?.offsetTop +
      dragElement.offsetHeight / 2;
    if (center < dragCenter) {
      insertIndex -= 1;
    }
  }

  return { insertIndex, itemIndex, left, right, isNewLine, start, end };
}

// ========================= 吸附系统 =========================
/**
 * 获取吸附线
 */
function getAdsorptionLines(x: number, distance = 10) {
  const result = [];

  // 检查与其他轨道的吸附
  otherCoords.forEach((coord) => {
    if (Math.abs(coord.left - x) <= distance) {
      result.push({ position: coord.left, frame: coord.start });
    }
    if (Math.abs(coord.right - x) <= distance) {
      result.push({ position: coord.right, frame: coord.end });
    }
  });

  // 检查与播放点的吸附
  const playPointX = getGridPixel(store.trackScale, playerStore.playStartFrame);
  if (Math.abs(playPointX - x) <= distance) {
    result.push({ position: playPointX, frame: playerStore.playStartFrame });
  }

  return result;
}

/**
 * 应用吸附效果
 */
function applyAdsorption(
  { left, right }: { left: number; right: number },
  lines: any[][]
) {
  fixPosition = { left: 0, right: 0, start: 0, end: 0 };

  if (lines[0].length === 0 && lines[1].length === 0) return;

  const minLeftLine = lines[0].reduce(
    (result, item) =>
      Math.abs(item.position - left) < Math.abs(result.position - left)
        ? item
        : result,
    { position: Number.MAX_SAFE_INTEGER, frame: 0 }
  );

  const minRightLine = lines[1].reduce(
    (result, item) =>
      Math.abs(item.position - right) < Math.abs(result.position - right)
        ? item
        : result,
    { position: Number.MAX_SAFE_INTEGER, frame: 0 }
  );

  if (
    Math.abs(minLeftLine.position - left) <
    Math.abs(minRightLine.position - right)
  ) {
    // 左对齐
    fixPosition.left = minLeftLine.position;
    fixPosition.start = minLeftLine.frame;
    store.dragData.moveX = minLeftLine.position - curCoord.left;
  } else {
    // 右对齐
    fixPosition.right = minRightLine.position;
    fixPosition.end = minRightLine.frame;
    store.dragData.moveX = minRightLine.position - curCoord.right;
  }
}

// ========================= 轨道操作 =========================
/**
 * 执行轨道插入
 */
function performTrackInsert(
  insertInfo: ReturnType<typeof calculateInsertInfo>
) {
  const dragInfo = store.dragData.dataInfo as Track;
  const startFrame = Math.max(
    fixPosition.right !== 0
      ? getSelectFrame(insertInfo.right, store.trackScale, baseFps) -
          (dragInfo.end - dragInfo.start)
      : getSelectFrame(insertInfo.left, store.trackScale, baseFps),
    0
  );

  // 更新轨道位置
  dragInfo.end = startFrame + (dragInfo.end - dragInfo.start);
  dragInfo.start = startFrame;

  // 找到并删除原位置
  let deleteLineIndex = 0;
  let deleteItemIndex = 0;
  store.trackList.forEach((lineItem, lineIndex) => {
    lineItem.list.forEach((item, itemIndex) => {
      if (item.id === dragInfo.id) {
        deleteLineIndex = lineIndex;
        deleteItemIndex = itemIndex;
      }
    });
  });

  store.trackList[deleteLineIndex].list.splice(deleteItemIndex, 1);

  // 插入到新位置
  if (insertInfo.isNewLine) {
    store.trackList.splice(insertInfo.insertIndex, 0, {
      type: dragInfo.type,
      list: [dragInfo],
    });
  } else {
    store.trackList[insertInfo.insertIndex].list.splice(
      insertInfo.itemIndex,
      0,
      dragInfo
    );
  }

  // 清理空行
  const emptyLineIndex = store.trackList.findIndex(
    (lineItem) => lineItem.list.length === 0
  );
  if (emptyLineIndex !== -1) {
    store.trackList.splice(emptyLineIndex, 1);
  }
}

// ========================= 交互处理 =========================
function setSelectTract() {
  store.selectTrackItem.line = -1;
  store.selectTrackItem.index = -1;
}

function handlerSelectFrame(frame: number) {
  const playFrame = frame - 1;
  const startFrame = playFrame < 0 ? 0 : playFrame;
  playerStore.isPause = true;
  playerStore.playStartFrame = startFrame;
}

// ========================= 视图交互 =========================

/**
 * 滚动处理
 */
function handleScroll() {
  const { scrollLeft, scrollTop } = trackList.value;
  startX.value = scrollLeft - offsetLine.left;
  startY.value = scrollTop;
}

/**
 * 缩放控制
 */
let maxDelta = 0;
const setScale = debounce(() => {
  store.trackScale -= maxDelta > 0 ? 10 : -10;
  maxDelta = 0;
}, 100);

function handleWheel(event: WheelEvent) {
  if (event.ctrlKey || event.metaKey) {
    maxDelta || (maxDelta = event.deltaY);
    setScale();
  }
}

// ========================= 鼠标事件处理 =========================

/**
 * 计算拖拽位置和吸附
 */
function calculateDragPosition(event: MouseEvent) {
  store.dragData.moveX = event.pageX - store.dragData.dragPoint.x;
  store.dragData.moveY = event.pageY - store.dragData.dragPoint.y;

  const left = store.dragData.moveX + curCoord.left;
  const right = store.dragData.moveX + curCoord.right;

  store.dragData.fixLines = [
    getAdsorptionLines(left),
    getAdsorptionLines(right),
  ];
  applyAdsorption({ left, right }, store.dragData.fixLines);
}

/**
 * 收集其他轨道坐标信息
 */
function collectOtherTrackCoords(
  excludeLineIndex: number,
  excludeItemIndex: number
) {
  otherCoords = [];
  for (let i = 0; i < store.trackList.length; i++) {
    for (let j = 0; j < store.trackList[i].list.length; j++) {
      if (i !== excludeLineIndex || j !== excludeItemIndex) {
        const item = store.trackList[i].list[j];
        otherCoords.push({
          start: item.start,
          end: item.end,
          left: getGridPixel(store.trackScale, item.start),
          right: getGridPixel(store.trackScale, item.end),
        });
      }
    }
  }
}
function onMouseDown(event: MouseEvent) {
  dragElement = (event.target as HTMLElement).closest(".trackItem");
  if (!dragElement) return;

  playerStore.isPause = true;

  const lineIndex = Number(dragElement.dataset.line);
  const index = Number(dragElement.dataset.index);

  // 设置拖拽状态
  store.dragData.dragPoint.x = event.pageX;
  store.dragData.dragPoint.y = event.pageY;
  store.dragData.dataInfo = store.trackList[lineIndex].list[index];
  store.dragData.dragType = dragElement.dataset.type;
  store.moveTrackData.lineIndex = lineIndex;
  store.moveTrackData.itemIndex = index;
  store.selectTrackItem.line = -1;
  store.selectTrackItem.index = 0;

  const dragItem = store.trackList[lineIndex].list[index];
  curCoord = {
    start: dragItem.start,
    end: dragItem.end,
    left: getGridPixel(store.trackScale, dragItem.start),
    right: getGridPixel(store.trackScale, dragItem.end),
  };

  // 收集其他轨道坐标
  collectOtherTrackCoords(lineIndex, index);
}

function onMouseMove(event: MouseEvent) {
  if (!dragElement) return;
  calculateDragPosition(event);
}

function onMouseUp(event: MouseEvent) {
  if (!dragElement) return;

  calculateDragPosition(event);

  const insertInfo = calculateInsertInfo();
  performTrackInsert(insertInfo);

  dragElement = null;
  resetDragState();
}

// ========================= 拖放与状态管理 =========================
function setDropLineLeft(event: MouseEvent) {
  const trackListElement = trackListContainer.value as HTMLDivElement;
  const { left } = trackListElement.getBoundingClientRect();
  const { clientX } = event;
  const { x: offsetX } = dragPoint.value;
  const itemLeft = clientX - left - offsetX;
  dropItemLeft.value = itemLeft < 0 ? 0 : itemLeft;
}

async function onDrop() {
  const startFrame = getSelectFrame(
    dropItemLeft.value,
    store.trackScale,
    baseFps
  );
  const track = await store.createTrack(
    store.dragData.dataInfo as Resource,
    startFrame
  );
  store.addTrack(track);
  resetDragState();
}

/**
 * 重置拖拽状态
 */
function resetDragState() {
  store.dragData.fixLines = [];
  store.moveTrackData.lineIndex = -1;
  store.moveTrackData.itemIndex = -1;
  store.dragData.moveX = 0;
  store.dragData.moveY = 0;
  dropItemLeft.value = 0;
  store.dragData.dataInfo = {} as Resource;
}
</script>
