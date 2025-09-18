<template>
  <div
    class="text-left text-sm top-0 absolute trackItem"
    :class="[TrackHeightMap[trackType], isDragState ? 'z-50 isDrag' : 'z-10']"
    :style="[itemClass]"
    :data-type="trackType"
    :data-line="lineIndex"
    :data-index="itemIndex"
    @click="setSelectTract"
  >
    <!-- 操作手柄 -->
    <TrackHandler
      :isActive="isActive"
      :lineIndex="lineIndex"
      :itemIndex="itemIndex"
    />
    <!-- 容器 -->
    <component :is="componentMap.get(trackType)" :trackItem="trackItem" />
  </div>
</template>

<script setup lang="ts">
import TrackHandler from "./TrackHandler.vue";
import VideoItem from "../template/VideoItem.vue";
import AudioItem from "../template/AudioItem.vue";
import TextItem from "../template/TextItem.vue";
import ImageItem from "../template/ImageItem.vue";
import { TrackHeightMap } from "@/data/track";
import { useTrackState } from "@/stores/track";
import { computed } from "vue";
import { getGridPixel } from "@/utils/canvasUtil";
import type { Track } from "@/types/track";

const componentMap = new Map<string, any>([
	["video", VideoItem],
	["audio", AudioItem],
	["text", TextItem],
	["image", ImageItem],
]);

const { lineIndex, itemIndex, trackItem } = defineProps<{
	lineIndex: number;
	itemIndex: number;
	trackItem: Track;
}>();

const store = useTrackState();

const trackType = computed(() => trackItem.type);

const isActive = computed(() => {
	return (
		store.selectTrackItem.line === lineIndex &&
		store.selectTrackItem.index === itemIndex
	);
});

const isDragState = computed(() => {
	return (
		store.moveTrackData.lineIndex === lineIndex &&
		store.moveTrackData.itemIndex === itemIndex
	);
});

function setSelectTract(event: Event) {
	event.preventDefault();
	event.stopPropagation();
	store.selectTrackItem.line = lineIndex;
	store.selectTrackItem.index = itemIndex;
}

const itemClass = computed(() => {
	const showWidth = `${getGridPixel(
		store.trackScale,
		trackItem.end - trackItem.start,
	)}px`;
	const showLeft = `${getGridPixel(store.trackScale, trackItem.start)}px`;
	return {
		width: showWidth,
		left: isDragState
			? `${parseInt(showLeft) + store.dragData.moveX}px`
			: showLeft,
		top: isDragState ? `${store.dragData.moveY}px` : "",
	};
});
</script>
