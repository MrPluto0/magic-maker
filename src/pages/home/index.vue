<template>
  <div
    class="dark theme-dark flex-1 w-full max-w-[1200px] mx-auto px-10 py-12 overflow-hidden flex flex-col gap-8 bg-night text-white"
  >
    <!-- Hero：电影级暗黑开场，紧排大标题 -->
    <div>
      <div class="label-micro mb-4">Local-first video editor</div>
      <h1
        class="text-white font-normal"
        style="font-size: 48px; line-height: 1; letter-spacing: -1.2px"
      >
        Magic Maker
      </h1>
      <p class="mt-4 text-base text-[#767d88]">
        浏览器本地的视频剪辑器 —— 素材永不出电脑，WebCodecs 直接合成 mp4
      </p>
    </div>

    <!-- 操作区 -->
    <div class="flex items-center gap-3">
      <el-button type="primary" class="font-semibold" @click="showCreate = true">
        新建项目
      </el-button>
      <el-button class="font-semibold" @click="projectStore.importProject">
        导入项目
      </el-button>
      <div class="flex-1"></div>
      <div class="label-micro">产品介绍 · 即将上线</div>
      <div
        class="cursor-pointer flex items-center gap-2 text-[#767d88] hover:text-white transition-colors"
        @click="openPage"
      >
        <ContactIcon />
        <span class="label-micro">关于作者</span>
      </div>
    </div>

    <!-- 项目列表：描边容器，无阴影 -->
    <div
      class="flex-1 min-h-0 rounded-lg border border-[#27272a] bg-night-lighter p-6 flex flex-col overflow-hidden"
    >
      <ProjectList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ContactIcon from "@/components/icons/ContactIcon.vue";
import { useProjectState } from "@/stores/project";
import NewProject from "./components/NewProject.vue";
import ProjectList from "./components/ProjectList.vue";

const projectStore = useProjectState();
const showCreate = ref(false);

const openPage = () => {
	window.open("https://www.gypsophlia.top/");
};
</script>

<style scoped lang="less"></style>
