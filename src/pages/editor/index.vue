<template>
  <div class="flex flex-1 overflow-hidden gap-2 p-4 h-full">
    <div
      class="flex flex-col rounded overflow-hidden"
      :style="{
        width: `${pageStore.resourceWidth}px`,
      }"
    >
      <el-tabs type="border-card" class="flex-1 overflow-hidden">
        <el-tab-pane class="h-full" label="生成区">
          <GenerateContainer />
        </el-tab-pane>
        <el-tab-pane class="h-full" label="上传区">
          <UploadContainer />
        </el-tab-pane>
      </el-tabs>
    </div>

    <SplitLine
      v-model:new-width="pageStore.resourceWidth"
      direction="vertical"
      reverse
      :limit-size="{
        minWidth: 370,
        maxWidth: 600,
      }"
    />

    <div class="flex flex-1 flex-col overflow-hidden gap-2">
      <div class="flex flex-1 flex-row flex-nowrap gap-2">
        <CanvasPlayer />
        <SplitLine
          v-model:new-width="pageStore.attrWidth"
          direction="vertical"
          :limit-size="{
            minWidth: 300,
            maxWidth: 600,
          }"
        />
        <AttributeContainer />
      </div>
      <SplitLine
        v-model:new-height="pageStore.trackHeight"
        direction="horizontal"
        :limit-size="{
          minHeight: 200,
          maxHeight: 500,
        }"
      />
      <TrackContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageState } from "@/stores/page";
import { useProjectState } from "@/stores/project";
import { clearHotKey, initEditorHotKey } from "@/plugins/installHotKey";
import SplitLine from "@/components/SplitLine.vue";
import CanvasPlayer from "./components/player/CanvasPlayer.vue";
import GenerateContainer from "./components/GenerateContainer.vue";
import UploadContainer from "./components/UploadContainer.vue";
import TrackContainer from "./components/TrackContainer.vue";
import AttributeContainer from "./components/AttributeContainer.vue";

const pageStore = usePageState();
const projectStore = useProjectState();
const timer = ref();

onMounted(() => {
  initEditorHotKey();
  timer.value = setInterval(async () => {
    await projectStore.saveProject();
  }, 30 * 1000);
});

onUnmounted(() => {
  clearHotKey();
  clearInterval(timer.value);
});
</script>
