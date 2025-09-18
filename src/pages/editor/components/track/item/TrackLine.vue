<template>
  <div
    class="mb-1 mt-1 relative ml-2 trackLine"
    :class="[
      TrackHeightMap[lineType],
      isActive
        ? 'dark:bg-gray-700 bg-gray-400 bg-opacity-20'
        : 'bg-gray-200 bg-opacity-10',
      isMain ? 'bg-blue-500 bg-opacity-20' : '',
    ]"
    :data-index="lineIndex"
    :data-type="lineType"
  >
    <template v-for="(item, index) of lineData" :key="item.id">
      <TrackItem :lineIndex="lineIndex" :itemIndex="index" :trackItem="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { TrackHeightMap } from "@/data/track";
import { useTrackState } from "@/stores/track";
import TrackItem from "./TrackItem.vue";
import type { Track, TrackType } from "@/types/track";

const { lineIndex } = defineProps<{
	isMain?: boolean;
	lineType: TrackType;
	lineIndex: number;
	lineData: Track[];
}>();

const store = useTrackState();

const isActive = computed(() => {
	return store.selectTrackItem.line === lineIndex;
});
</script>

<style scoped>
.showLine-t::after {
  content: "";
  display: block;
  position: absolute;
  top: 1px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #fcd34d;
  z-index: 30;
}
.showLine-b::before {
  content: "";
  display: block;
  position: absolute;
  bottom: 1px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #fcd34d;
  z-index: 30;
}
</style>
