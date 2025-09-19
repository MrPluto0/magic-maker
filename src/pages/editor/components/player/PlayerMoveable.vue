<template>
  <div
    ref="moveContainer"
    class="absolute left-0 right-0 top-0 bottom-0 m-auto"
  >
    <div
      v-for="(item, index) in targetList"
      :key="item.id"
      :data-eleId="item.id"
      :data-lineIndex="item.lineIndex"
      :data-itemIndex="item.itemIndex"
      :style="{
        zIndex: index,
        top: `${item.top}px`,
        left: `${item.left}px`,
        width: `${item.w}px`,
        height: `${item.h}px`,
        transform: `translate(${item.x}px, ${item.y}px) scale(${item.scale})`,
      }"
      class="move-target absolute"
      @click.stop="selectItem(item.id)"
      @mousedown="mousedown($event, item.id)"
    />

    <Moveable
      ref="moveable"
      v-bind="draggableOptions"
      @drag="onDrag"
      @scale="onScale"
    />
  </div>
</template>

<script setup lang="ts">
import { defaultMoveOptions } from "@/data/constant";
import Moveable from "vue3-moveable";
import { ref, nextTick, reactive, computed, watch } from "vue";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import type { DrawTrack } from "@/types/track";

defineProps<{
  canvasSize: { width: number; height: number };
}>();

const store = usePlayerState();
const trackStore = useTrackState();
const moveContainer = ref();
const moveable = ref();
const moveTarget = ref();

interface TargetItem {
  id: string;
  lineIndex: number;
  itemIndex: number;
  y: number;
  x: number;
  w: number;
  h: number;
  scale: number;
  left: number;
  top: number;
}

const targetList = computed(() => {
  if (store.playerHeight === 0 && store.playerWidth === 0) {
    return [];
  }

  const layerArr: TargetItem[] = [];

  trackStore.trackList.forEach(({ list, type }, lineIndex) => {
    if (type === "audio") {
      return;
    }
    const index = list.findIndex((item: Record<string, any>, itemIndex) => {
      if (
        store.playStartFrame >= item.start &&
        store.playStartFrame <= item.end &&
        item.draw
      ) {
        return true;
      }
      return false;
    });
    const trackItem = list[index] as DrawTrack;
    if (trackItem) {
      layerArr.unshift({
        lineIndex,
        itemIndex: index,
        id: trackItem.id,
        scale: trackItem.scale / 100,
        x: trackItem.centerX,
        y: trackItem.centerY,
        w: trackItem.width,
        h: trackItem.height,
        left: store.playerWidth / 2 - trackItem.width / 2,
        top: store.playerHeight / 2 - trackItem.height / 2,
      });
    }
  });
  moveable.value && moveable.value.updateRect();
  return layerArr;
});
const draggableOptions = reactive({
  target: moveTarget,
  container: moveContainer.value,
  ...defaultMoveOptions,
});
function selectItem(eleid: string) {
  store.isPause = true;
  trackStore.selectTrackById(eleid);
}
function onDrag(params: Record<string, any>) {
  const { target, transform, translate } = params;
  const { lineindex, itemindex } = target.dataset;
  const [x, y] = translate;
  const track = trackStore.trackList[lineindex].list[itemindex] as DrawTrack;
  track.centerX = x;
  track.centerY = y;
  target.style.transform = transform;
}

function onScale(params: Record<string, any>) {
  const { target, scale, transform } = params;
  const { lineindex, itemindex } = target.dataset;
  const newScale = Math.max(Math.round(scale[0] * 100), 1);
  const track = trackStore.trackList[lineindex].list[itemindex] as DrawTrack;
  track.scale = newScale;
  target.style.transform = transform;
}

function mousedown(event: MouseEvent, eleid: string) {
  event.stopPropagation();
  store.isPause = true;
  trackStore.selectTrackById(eleid);
  moveTarget.value = event.currentTarget;
  nextTick(() => {
    moveable.value.dragStart(event);
  });
}

watch(
  [trackStore.selectTrackItem, targetList],
  () => {
    if (
      moveContainer.value &&
      trackStore.selectTrackItem.line !== -1 &&
      trackStore.selectTrackItem.index !== -1
    ) {
      const targetTrack =
        trackStore.trackList[trackStore.selectTrackItem.line].list[
          trackStore.selectTrackItem.index
        ];
      if (
        targetTrack &&
        targetList.value.find((item) => item.id === targetTrack.id)
      ) {
        moveTarget.value = moveContainer.value.querySelector(
          `.move-target[data-eleid='${targetTrack.id}']`
        );
      } else {
        moveTarget.value = null;
      }
    } else {
      moveTarget.value = null;
    }
  },
  { immediate: true, flush: "post" }
);
</script>
