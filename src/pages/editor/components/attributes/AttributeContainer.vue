<template>
  <div class="select-none relative container-box" :style="attrWidth">
    <div
      v-if="!track"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <el-empty description="点击轨道进行编辑" />
    </div>

    <div v-else class="overflow-auto">
      <div class="mb-4 border-b-primary border-b-2">基本信息</div>
      <VideoAttr v-if="track.type === 'video'" />
      <ImageAttr v-else-if="track.type === 'image'" />
      <AudioAttr v-else-if="track.type === 'audio'" />
      <TextAttr v-else-if="track.type === 'text'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import { usePageState } from "@/stores/page";
import type { GeneralTrack } from "@/types/track";
import VideoAttr from "./items/VideoAttr.vue";
import ImageAttr from "./items/ImageAttr.vue";
import AudioAttr from "./items/AudioAttr.vue";
import TextAttr from "./items/TextAttr.vue";

const pageStore = usePageState();
const trackStore = useTrackState();

const attrWidth = computed(() => ({
  width: `${pageStore.attrWidth}px`,
}));

// 将data下的配置导入
const TrackOptionsConfig: Record<string, any> = {};
const attributeFiles = import.meta.glob("./options/*.ts", { eager: true });
for (const path in attributeFiles) {
  const name = path.match(/(?<=\/)(\w+)(?=\.ts)/) || [];
  TrackOptionsConfig[name[0]] = (
    attributeFiles[path] as { Options: Record<string, any> }
  ).Options;
}

const track = computed(() => trackStore.selectTrack as GeneralTrack);
</script>
