<template>
  <div class="flex-1 w-full flex flex-col overflow-hidden">
    <!-- Hero：全宽电影级暗黑开场，任何主题下恒暗（预期设计） -->
    <section class="theme-dark shrink-0 w-full bg-night text-white overflow-hidden">
      <div class="max-w-[1200px] w-full mx-auto px-10 pt-16 pb-14">
        <div class="label-micro">Local-first video editor</div>
        <h1
          class="mt-4 text-white font-normal"
          style="font-size: 64px; line-height: 1; letter-spacing: -1.5px"
        >
          Magic Maker
        </h1>
        <p class="mt-5 max-w-[560px] text-[15px] leading-relaxed text-[#767d88]">
          浏览器本地的视频剪辑器 —— 素材永不出电脑，WebCodecs 直接合成 mp4。
        </p>

        <div class="mt-10 flex items-center gap-3">
          <el-button type="primary" size="large" @click="showCreate = true">
            <i class="i-mdi-plus text-base mr-1"></i>
            新建项目
          </el-button>
          <el-button size="large" class="hero-ghost" @click="projectStore.importProject">
            导入项目
          </el-button>

          <div class="flex-1"></div>

          <div
            class="cursor-pointer flex items-center gap-2 text-[#767d88] hover:text-white transition-colors"
            @click="openPage"
          >
            <i class="i-mdi-arrow-top-right text-base"></i>
            <span class="label-micro">关于作者</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目列表：随主题自适应的编辑区 -->
    <section
      class="flex-1 min-h-0 w-full max-w-[1200px] mx-auto px-10 py-10 flex flex-col overflow-hidden"
    >
      <div class="flex items-baseline gap-3 shrink-0">
        <span class="label-micro">Recent projects</span>
        <span class="text-xs text-[#a7a7a7]">
          {{ projectStore.projectList.length }}
        </span>
      </div>
      <div class="mt-5 flex-1 min-h-0 overflow-hidden">
        <ProjectList />
      </div>
    </section>

    <NewProject v-model:show="showCreate" />
  </div>
</template>

<script lang="ts" setup>
import { useProjectState } from "@/stores/project";
import NewProject from "./components/NewProject.vue";
import ProjectList from "./components/ProjectList.vue";

const projectStore = useProjectState();
const showCreate = ref(false);

const openPage = () => {
	window.open("https://www.gypsophlia.top/");
};
</script>

<style scoped lang="less">
/* Hero 内的次要按钮：暗底上的幽灵描边（浅色主题下 hero 恒暗，需局部覆盖） */
.hero-ghost {
  --el-button-bg-color: transparent;
  --el-button-border-color: #27272a;
  --el-button-hover-bg-color: #1a1a1a;
  --el-button-hover-border-color: #3f3f3f;
  --el-button-hover-text-color: #ffffff;
  --el-button-active-bg-color: #111113;
  --el-button-active-text-color: #ffffff;
  color: #c9ccd1;
}
</style>
