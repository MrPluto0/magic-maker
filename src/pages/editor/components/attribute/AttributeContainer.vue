<template>
  <div
    class="select-none relative flex flex-col min-h-0 border-l border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night overflow-hidden"
    :style="{
      width: `${pageStore.attrWidth}px`,
    }"
  >
    <!-- 面板头（设计稿 .prop-head） -->
    <div
      class="prop-head shrink-0 px-[18px] pt-4 pb-3.5 border-b border-[#e9ecf2] dark:border-[#27272a]"
    >
      <span class="label-micro !text-[10px]">属性 · 选中项</span>
      <template v-if="track">
        <h3
          class="mt-2 truncate text-[16px] font-medium text-[#171717] dark:text-white"
          style="letter-spacing: -0.2px"
        >
          {{ track.name || "未命名" }}
        </h3>
        <span
          class="inline-flex mt-2.5 text-[10px] font-[450] uppercase text-[#c9ccd1] border border-[#2e2e33] dark:border-[#2e2e33] border-[#c9ccd1] rounded px-2 py-0.5"
        >
          {{ track.type }} track
        </span>
      </template>
    </div>

    <div v-if="!track" class="flex-1 flex flex-col justify-center items-center">
      <el-empty description="点击轨道素材进行编辑" />
    </div>

    <div v-else class="flex-1 min-h-0 overflow-auto">
      <VideoAttr v-if="track.type === 'video'" />
      <ImageAttr v-else-if="track.type === 'image'" />
      <AudioAttr v-else-if="track.type === 'audio'" />
      <TextAttr v-else-if="track.type === 'text'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageState } from "@/stores/page";
import { useTrackState } from "@/stores/track";
import AudioAttr from "./template/AudioAttr.vue";
import ImageAttr from "./template/ImageAttr.vue";
import TextAttr from "./template/TextAttr.vue";
import VideoAttr from "./template/VideoAttr.vue";

const pageStore = usePageState();
const trackStore = useTrackState();

// 将data下的配置导入
const TrackOptionsConfig: Record<string, any> = {};
const attributeFiles = import.meta.glob("./options/*.ts", { eager: true });
for (const path in attributeFiles) {
	const name = path.match(/(?<=\/)(\w+)(?=\.ts)/) || [];
	TrackOptionsConfig[name[0]] = (
		attributeFiles[path] as { Options: Record<string, any> }
	).Options;
}

const track = computed(() => trackStore.selectTrack);
</script>
