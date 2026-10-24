<template>
  <div class="flex flex-col flex-1 w-full h-full overflow-hidden">
    <EditorTopbar />

    <!-- 主区：左(AI 资源) · 中(播放器) · 右(属性) -->
    <div class="main flex flex-1 min-h-0">
      <!-- LEFT：AI 生成 + 本地素材上传 -->
      <aside
        class="left flex flex-col min-h-0 border-r border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night"
        :style="{ width: `${pageStore.resourceWidth}px` }"
      >
        <GenerateContainer />

        <div class="h-px shrink-0 bg-[#e9ecf2] dark:bg-[#27272a]"></div>

        <div class="shrink-0 h-[268px] flex flex-col min-h-0">
          <UploadContainer />
        </div>
      </aside>

      <SplitLine
        v-model:new-width="pageStore.resourceWidth"
        direction="vertical"
        reverse
        :limit-size="{
          minWidth: 296,
          maxWidth: 600,
        }"
      />

      <!-- CENTER：画布 + 走带控制 -->
      <section class="flex flex-col flex-1 min-w-0 bg-black">
        <div class="flex flex-1 flex-row flex-nowrap min-h-0">
          <CanvasPlayer />
          <SplitLine
            v-model:new-width="pageStore.attrWidth"
            direction="vertical"
            :limit-size="{
              minWidth: 296,
              maxWidth: 600,
            }"
          />
          <AttributeContainer />
        </div>
      </section>
    </div>

    <SplitLine
      v-model:new-height="pageStore.trackHeight"
      direction="horizontal"
      :limit-size="{
        minHeight: 200,
        maxHeight: 500,
      }"
    />

    <!-- TIMELINE -->
    <TrackContainer />
  </div>
</template>

<script setup lang="ts">
import EditorTopbar from "@/components/layout/EditorTopbar.vue";
import SplitLine from "@/components/SplitLine.vue";
import { clearHotKey, initEditorHotKey } from "@/plugins/installHotKey";
import { usePageState } from "@/stores/page";
import { useProjectState } from "@/stores/project";
import AttributeContainer from "./components/attribute/AttributeContainer.vue";
import GenerateContainer from "./components/generate/GenerateContainer.vue";
import CanvasPlayer from "./components/player/CanvasPlayer.vue";
import UploadContainer from "./components/resource/UploadContainer.vue";
import TrackContainer from "./components/track/TrackContainer.vue";

const pageStore = usePageState();
const projectStore = useProjectState();
const timer = ref();

onMounted(() => {
	initEditorHotKey();
	timer.value = setInterval(projectStore.saveProject, 60 * 1000);
});

onUnmounted(() => {
	clearHotKey();
	clearInterval(timer.value);
});
</script>
