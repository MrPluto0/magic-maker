<template>
  <div class="flex flex-1 overflow-hidden gap-4 py-4 h-full">
    <Transition name="slide-fade">
      <div
        v-show="showSider"
        class="w-[340px] pl-4 flex flex-col overflow-hidden"
      >
        <el-tabs type="border-card" class="flex-1 overflow-hidden">
          <el-tab-pane class="h-full" label="素材区">
            <MaterialContainer />
          </el-tab-pane>
          <el-tab-pane class="h-full" label="模板区">
            <TemplateContainer />
          </el-tab-pane>
          <el-tab-pane class="h-full" label="AI工具">
            <DrawAIMenu />
          </el-tab-pane>
        </el-tabs>
      </div>
    </Transition>

    <div
      class="flex-1 relative"
      @drop="onDropMaterial"
      v-loading="drawStore.loading"
      element-loading-text="资源加载中..."
    >
      <!-- 控制侧边栏显示隐藏 -->
      <div
        class="cursor-pointer absolute top-1/2 z-[100] bg-[#e9e9e9] dark:bg-[#33333b] flex justify-center items-center rounded-[50%] p-2"
        @click="showSider = !showSider"
        :class="showSider ? '-left-6' : '-left-2'"
      >
        <el-icon v-if="showSider" color="#b3b3b8"><IEpArrowLeftBold /></el-icon>
        <el-icon v-else color="#b3b3b8"><IEpArrowRightBold /></el-icon>
      </div>

      <VWhiteboard />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DrawAIMenu from "@/components/draw/DrawAIMenu.vue";
import MaterialContainer from "@/components/draw/MaterialContainer.vue";
import TemplateContainer from "@/components/draw/TemplateContainer.vue";
import Whiteboard from "@/react_app/whiteboard";
import { useDrawStore } from "@/stores/drawState";
import { useProjectState } from "@/stores/projectState";
import { applyPureReactInVue } from "veaury";

const VWhiteboard = applyPureReactInVue(Whiteboard);
const drawStore = useDrawStore();
const projectStore = useProjectState();

const showSider = ref(true);
const timer = ref();

const onDropMaterial = async (e: DragEvent) => {
  if (!drawStore.dragInfo) {
    return;
  }
  try {
    e.preventDefault();
    drawStore.loading = true;
    if (drawStore.dragInfo.category === "template_psd") {
      await drawStore.addTemplate(drawStore.dragInfo.psdMetadata);
    } else {
      await drawStore.addMaterial(drawStore.dragInfo);
    }
  } finally {
    drawStore.loading = false;
  }
};

onMounted(() => {
  timer.value = setInterval(async () => {
    await projectStore.saveProject();
  }, 30 * 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<style scoped lang="less"></style>
