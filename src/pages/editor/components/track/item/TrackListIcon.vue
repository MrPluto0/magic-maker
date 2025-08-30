<template>
  <div
    ref="iconList"
    class="relative w-12 flex h-full flex-col items-center justify-start overflow-y-hidden overflow-x-scroll border-r-2 dark:border-gray-700 border-gray-300 border-t"
  >
    <span class="w-full h-5 sticky top-0 left-0 right-0 z-20" />
    <div
      class="absolute pt-10 pb-5 min-w-full flex flex-col justify-center min-h-full overflow-x-hidden left-0 right-0"
    >
      <template v-for="(lineData, lineIndex) of listData" :key="lineIndex">
        <div
          class="z-10 flex justify-center items-center w-12 text-center mb-1 mt-1"
          :class="[
            TrackHeightMap.get(lineData.type),
            lineData.main ? 'bg-blue-500 bg-opacity-20' : '',
          ]"
          :title="lineData.main ? '主轨道' : ''"
        >
          <Icon :icon="iconMap.get(lineData.type)" style="font-size: 20px" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { TrackHeightMap } from "@/data/track";
const props = defineProps({
  listData: {
    type: Array as PropType<TrackLineItem[]>,
    default() {
      return [];
    },
  },
  offsetTop: {
    type: Number,
    default: 0,
  },
});

// 使用iconify图标映射
const iconMap = new Map([
  ["video", "i-mdi-video"],
  ["audio", "i-mdi-volume-high"],
  ["text", "i-mdi-format-text"],
  ["image", "i-mdi-image"],
]);

const iconList = ref();
watch(
  () => props.offsetTop,
  () => {
    iconList.value.scrollTop = props.offsetTop;
  }
);
</script>
