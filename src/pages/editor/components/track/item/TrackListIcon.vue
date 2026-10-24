<template>
  <!-- 轨道标签列（设计稿 .tlabels：64px、图标 + 大写微标签） -->
  <div
    ref="iconList"
    class="relative w-16 flex h-full flex-col items-center justify-start overflow-y-hidden overflow-x-scroll shrink-0 border-r border-[#e9ecf2] dark:border-[#27272a] border-t border-t-[#e9ecf2] dark:border-t-[#27272a]"
  >
    <div
      class="absolute pt-10 pb-5 min-w-full flex flex-col justify-center min-h-full overflow-x-hidden left-0 right-0"
    >
      <template v-for="(lineData, lineIndex) of listData" :key="lineIndex">
        <div
          class="tlabel z-10 flex flex-col items-center justify-center gap-1 w-16 text-center mb-1 mt-1"
          :class="TrackHeightMap[lineData.type]"
          :title="lineData.main ? '主轨道' : ''"
        >
          <i :class="IconMap[lineData.type]" class="text-[10px] text-[#a7a7a7] opacity-70" />
          <span class="text-[9.5px] font-[450] uppercase text-[#767d88]" style="letter-spacing: 0.35px">
            {{ TypeNameMap[lineData.type] }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IconMap } from "@/data/menu";
import { TrackHeightMap } from "@/data/track";
import type { TrackLineItem } from "@/types/track";

const TypeNameMap: Record<string, string> = {
	video: "视频",
	audio: "音频",
	text: "文本",
	image: "图片",
};

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

const iconList = ref();
watch(
	() => props.offsetTop,
	() => {
		iconList.value.scrollTop = props.offsetTop;
	},
);
</script>
