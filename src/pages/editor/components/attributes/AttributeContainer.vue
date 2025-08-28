<template>
  <div
    class="select-none relative pl-2 dark:bg-night bg-gray-100"
    :style="attrWidth"
  >
    <div
      v-if="!track"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <el-empty description="点击轨道进行编辑" />
    </div>

    <div
      v-else
      class="absolute top-0 left-3 right-2 bottom-0 pr-2 overflow-auto"
    >
      <el-tabs>
        <el-tab-pane label="基本信息">
          <VideoAttr v-if="track.type === 'video'" />
          <ImageAttr v-else-if="track.type === 'image'" />
          <AudioAttr v-else-if="track.type === 'audio'" />
          <TextAttr v-else-if="track.type === 'text'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import { usePageState } from "@/stores/page";
import { GeneralTrack } from "@/types/track";
import VideoAttr from "./items/VideoAttr.vue";
import ImageAttr from "./items/ImageAttr.vue";
import AudioAttr from "./items/AudioAttr.vue";

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
