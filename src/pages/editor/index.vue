<template>
  <div class="flex flex-col flex-1 w-full h-full overflow-hidden">
    <EditorTopbar />

    <!-- 主区：左(对话 | 素材·通栏全高) · 右(上：播放器+属性 / 下：时间轴对齐右区) -->
    <div class="main flex flex-1 min-h-0">
      <!-- LEFT：Agent 对话面板 + 素材（生成/上传）tab 切换，通栏占满顶栏以下全高 -->
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

          <div class="flex-1 basis-0 min-h-0 flex flex-col">
            <UploadContainer />
          </div>
        </template>
      </aside>

      <!-- 产物抽屉：从左栏内侧滑出，收集项目资源（Teleport 到 body，贴左栏右缘） -->
      <ArtifactDrawer />

      <SplitLine
        v-model:new-width="pageStore.resourceWidth"
        direction="vertical"
        reverse
        :limit-size="{
          minWidth: 296,
          maxWidth: 600,
        }"
      />

      <!-- RIGHT：上（播放器 | 属性）· 下（时间轴，与右区对齐，不延伸到左栏下方） -->
      <section class="flex flex-col flex-1 min-w-0 min-h-0">
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
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorTopbar from "@/components/layout/EditorTopbar.vue";
import SplitLine from "@/components/SplitLine.vue";
import { clearHotKey, initEditorHotKey } from "@/plugins/installHotKey";
import { usePageState } from "@/stores/page";
import { useProjectState } from "@/stores/project";
import AttributeContainer from "./components/attribute/AttributeContainer.vue";
import ArtifactDrawer from "./components/chat/ArtifactDrawer.vue";
import ChatPanel from "./components/chat/ChatPanel.vue";
import GenerateContainer from "./components/generate/GenerateContainer.vue";
import CanvasPlayer from "./components/player/CanvasPlayer.vue";
import UploadContainer from "./components/resource/UploadContainer.vue";
import TrackContainer from "./components/track/TrackContainer.vue";

const pageStore = usePageState();
const projectStore = useProjectState();
const timer = ref();

// 时间轴高度自适应钳制：trackHeight 若吃满视口（小窗口/历史持久化值偏大），
// 会把左栏对话面板与中部画布挤成一条缝——保证主区（顶栏下方 → 时间轴上方）
// 至少占可用高度的大头，时间轴最多占约 42%，且不低于回归脚本依赖的 200px。
function clampTrackHeight() {
	const avail = window.innerHeight - 52 - 12; // 顶栏 + 分割线
	const cap = Math.max(200, Math.floor(avail * 0.42));
	pageStore.trackHeight = Math.min(Math.max(pageStore.trackHeight, 200), cap);
}

const leftTabs = [
	{ key: "chat" as const, label: "对话" },
	{ key: "asset" as const, label: "素材" },
];

function onResize() {
	clampTrackHeight();
}

onMounted(() => {
	initEditorHotKey();
	timer.value = setInterval(projectStore.saveProject, 60 * 1000);
	clampTrackHeight();
	window.addEventListener("resize", onResize);
});

onUnmounted(() => {
	clearHotKey();
	clearInterval(timer.value);
	window.removeEventListener("resize", onResize);
});
</script>
