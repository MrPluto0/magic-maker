<template>
  <!-- 素材 clip：4px 圆角、1px 描边、选中白描边（设计稿 .clip/.clip.sel） -->
  <div
    class="text-left text-sm top-0 absolute trackItem clip rounded overflow-hidden border"
    :class="[
      TrackHeightMap[trackType],
      isDragState ? 'z-50 isDrag' : 'z-10',
      isActive
        ? 'border-white shadow-[0_0_0_1px_#fff]'
        : 'border-[#e9ecf2] dark:border-[#2e2e33]',
    ]"
    :style="[itemClass]"
    :data-type="trackType"
    :data-line="lineIndex"
    :data-index="itemIndex"
    @click.stop="setSelectTract"
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
import { TrackHeightMap } from "@/data/track";
import { useTrackState } from "@/stores/track";
import type { Track } from "@/types/track";
import { getGridPixel } from "@/utils/canvasUtil";
import AudioItem from "../template/AudioItem.vue";
import ImageItem from "../template/ImageItem.vue";
import TextItem from "../template/TextItem.vue";
import VideoItem from "./../template/VideoItem.vue";
import TrackHandler from "./TrackHandler.vue";

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

function setSelectTract() {
	store.selectTrackItem.line = lineIndex;
	store.selectTrackItem.index = itemIndex;
}

const itemClass = computed(() => {
	const showWidth = getGridPixel(
		store.trackScale,
		trackItem.end - trackItem.start,
	);
	const showLeft = getGridPixel(store.trackScale, trackItem.start);

	return {
		width: `${showWidth}px`,
		left: `${isDragState.value ? showLeft + store.dragData.moveX : showLeft}px`,
		top: isDragState.value ? `${store.dragData.moveY}px` : "",
	};
});
</script>
