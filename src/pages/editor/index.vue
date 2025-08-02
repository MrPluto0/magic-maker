<template>
  <div class="flex flex-1 overflow-hidden gap-4 p-4 h-full">
    <div class="w-[370px] flex flex-col rounded overflow-hidden">
      <el-tabs type="border-card" class="flex-1 overflow-hidden">
        <el-tab-pane class="h-full" label="生成区">
          <GenerateContainer />
        </el-tab-pane>
        <el-tab-pane class="h-full" label="上传区">
          <UploadContainer />
        </el-tab-pane>
        <el-tab-pane class="h-full" label="工具区">
          <ClipAIMenu />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="flex flex-1 flex-col overflow-hidden gap-2">
      <div class="flex flex-1 flex-row flex-nowrap container-box gap-2">
        <CanvasPlayer />
        <SplitLine
          v-model:new-width="page.attrWidth"
          direction="vertical"
          :limit-size="limitSize"
        />
        <AttributeContainer />
      </div>
      <SplitLine
        v-model:new-height="page.trackHeight"
        direction="horizontal"
        :limit-size="limitSize"
      />
      <TrackContainer />
    </div>
  </div>
</template>

<script setup lang="ts">
import AttributeContainer from "@/components/editor/attributes/AttributeContainer.vue";
import CanvasPlayer from "@/components/editor/player/CanvasPlayer.vue";
import TrackContainer from "@/components/editor/track/TrackContainer.vue";
import SplitLine from "@/components/SplitLine.vue";
import GenerateContainer from "@/components/editor/generate/GenerateContainer.vue";
import { usePageState } from "@/stores/pageState";
import { clearHotKey, initEditorHotKey } from "@/plugins/installHotKey";
import { useProjectState } from "@/stores/projectState";
import UploadContainer from "@/components/editor/resource/UploadContainer.vue";
import ClipAIMenu from "@/components/editor/tools/ClipAIMenu.vue";

const page = usePageState();
const projectStore = useProjectState();
const timer = ref();

const limitSize = reactive({
  minHeight: 200,
  maxHeight: document.body.getBoundingClientRect().height - 200,
  minWidth: 300,
  maxWidth: 600,
});

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
