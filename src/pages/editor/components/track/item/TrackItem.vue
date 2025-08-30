<template>
  <div
    class="text-left text-sm top-0 absolute trackItem"
    :class="[
      TrackHeightMap.get(props.trackItem.type),
      isDragState ? 'z-50 isDrag' : 'z-10',
    ]"
    :style="[itemClass]"
    :data-type="props.trackItem.type"
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
    <component :is="componentMap.get(trackItem.type)" :trackItem="trackItem" />
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

const props = defineProps({
	trackType: {
		type: String,
		default: "",
	},
	lineIndex: {
		type: Number,
		default: 0,
	},
	itemIndex: {
		type: Number,
		default: 0,
	},
	trackItem: {
		type: Object,
		default() {
			return {
				width: "0px",
				left: "0px",
			};
		},
	},
});
const store = useTrackState();
const isActive = computed(() => {
	return (
		store.selectTrackItem.line === props.lineIndex &&
		store.selectTrackItem.index === props.itemIndex
	);
});
const componentMap = new Map<string, any>([
	["video", VideoItem],
	["audio", AudioItem],
	["text", TextItem],
	["image", ImageItem],
]);
const isDragState = computed(() => {
	return (
		store.moveTrackData.lineIndex === props.lineIndex &&
		store.moveTrackData.itemIndex === props.itemIndex
	);
});
function setSelectTract(event: Event) {
	event.preventDefault();
	event.stopPropagation();
	store.selectTrackItem.line = props.lineIndex;
	store.selectTrackItem.index = props.itemIndex;
}

const itemClass = computed(() => {
	if (isDragState.value) {
		return {
			width: props.trackItem.showWidth,
			left: `${parseInt(props.trackItem.showLeft) + store.dragData.moveX}px`,
			top: `${store.dragData.moveY}px`,
		};
	}
	return {
		width: props.trackItem.showWidth,
		left: props.trackItem.showLeft,
	};
});
</script>
