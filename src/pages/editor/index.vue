<template>
  <div class="flex flex-col flex-1 w-full h-full overflow-hidden">
    <EditorTopbar />

    <!-- 主区：左(对话 | 素材) · 中(播放器) · 右(属性) -->
    <div class="main flex flex-1 min-h-0">
      <!-- LEFT：Agent 对话面板 + 素材（生成/上传）tab 切换 -->
      <aside
        class="left flex flex-col min-h-0 border-r border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night"
        :style="{ width: `${pageStore.resourceWidth}px` }"
      >
        <!-- tab 行：对话 | 素材（对话面板落左栏，与右侧属性面板分居两侧） -->
        <div class="flex-none flex border-b border-[#e9ecf2] dark:border-[#27272a]">
          <button
            v-for="tab in leftTabs"
            :key="tab.key"
            class="flex-1 py-3 text-[11px] tracking-[0.35px] uppercase border-b transparent -mb-px"
            :class="
              pageStore.editorLeftTab === tab.key
                ? 'text-white dark:text-white border-[#1a1a1a] dark:border-white font-medium'
                : 'text-[#767d88] border-transparent hover:text-[#c9ccd1]'
            "
            @click="pageStore.editorLeftTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- 对话 tab -->
        <ChatPanel v-if="pageStore.editorLeftTab === 'chat'" class="flex-1 min-h-0" />

        <!-- 素材 tab：AI 生成 + 本地上传（原左栏功能整体收拢） -->
        <template v-else>
          <GenerateContainer />

          <div class="h-px shrink-0 bg-[#e9ecf2] dark:bg-[#27272a]"></div>

          <div class="shrink-0 h-[268px] flex flex-col min-h-0">
            <UploadContainer />
          </div>
        </template>
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
import ChatPanel from "./components/chat/ChatPanel.vue";
import GenerateContainer from "./components/generate/GenerateContainer.vue";
import CanvasPlayer from "./components/player/CanvasPlayer.vue";
import UploadContainer from "./components/resource/UploadContainer.vue";
import TrackContainer from "./components/track/TrackContainer.vue";

const pageStore = usePageState();
const projectStore = useProjectState();
const timer = ref();

const leftTabs = [
	{ key: "chat" as const, label: "对话" },
	{ key: "asset" as const, label: "素材" },
];

onMounted(() => {
	initEditorHotKey();
	timer.value = setInterval(projectStore.saveProject, 60 * 1000);
});

onUnmounted(() => {
	clearHotKey();
	clearInterval(timer.value);
});
</script>
