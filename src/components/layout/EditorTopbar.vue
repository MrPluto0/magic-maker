<template>
  <header
    class="topbar flex items-center gap-6 px-4 h-[52px] shrink-0 border-b border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night"
  >
    <div
      class="wordmark flex items-center gap-2.5 text-[13px] font-semibold pr-5 border-r border-[#e9ecf2] dark:border-[#27272a] h-full cursor-pointer"
      style="letter-spacing: 0.4px"
      @click="router.push('/home')"
    >
      <span class="w-[7px] h-[7px] bg-current dark:bg-white bg-[#171717]"></span>
      <span class="dark:text-white text-[#171717]">MAGIC MAKER</span>
    </div>

    <nav class="flex gap-[18px] text-[13px]">
      <a
        v-for="item in menu"
        :key="item.to"
        class="cursor-pointer transition-colors"
        :class="
          route.path.includes(item.to)
            ? 'dark:text-white text-[#171717]'
            : 'text-[#767d88] hover:text-current dark:hover:text-white'
        "
        @click="router.push(item.to)"
      >
        {{ item.name }}
      </a>
    </nav>

    <div
      v-if="projectStore.project?.id"
      class="proj-id flex items-baseline gap-3 ml-2"
    >
      <span class="text-sm font-medium dark:text-white text-[#171717]">{{
        projectStore.project?.name
      }}</span>
      <span v-if="projectStore.lastSaveTime" class="mono text-[11px] text-[#a7a7a7]">
        上次保存 {{ projectStore.lastSaveTime }}
      </span>
    </div>

    <div class="flex-1"></div>

    <button class="tb-btn" @click="showUserInfo = true">
      <span class="mono text-xs">✦</span>AI 设置
    </button>
    <button class="tb-btn" title="切换主题" @click="pageStore.isDark = !pageStore.isDark">
      <span class="theme-dot" :class="{ light: !pageStore.isDark }"></span>
    </button>
    <button class="tb-line" @click="projectStore.saveProject">保存</button>
    <button class="tb-solid" @click="projectStore.exportVideo">
      导出 <span style="font-size: 9px">▼</span>
    </button>
  </header>

  <UserBox v-model:show="showUserInfo" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePageState } from "@/stores/page";
import { useProjectState } from "@/stores/project";
import UserBox from "../dialogs/UserBox.vue";

const pageStore = usePageState();
const projectStore = useProjectState();
const router = useRouter();
const route = useRoute();

const showUserInfo = ref(false);

const menu = [
	{ name: "首页", to: "/home" },
	{ name: "编辑器", to: "/editor" },
];
</script>

<style lang="less" scoped>
.tb-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #767d88;
  padding: 8px 12px;
  border-radius: 4px;
  transition: color 0.15s;

  &:hover {
    color: #fff;
  }

  html:not(.dark) &:hover {
    color: #171717;
  }
}

.tb-line {
  font-size: 13px;
  font-weight: 600;
  color: #171717;
  padding: 7px 14px;
  border-radius: 4px;
  border: 1px solid #e9ecf2;

  &:hover {
    border-color: #a7a7a7;
  }

  html.dark & {
    color: #fff;
    border-color: #2e2e33;

    &:hover {
      border-color: #767d88;
    }
  }
}

.tb-solid {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #000;
  background: #fff;
  padding: 8px 16px;
  border-radius: 4px;

  &:hover {
    background: #d0d4d4;
  }

  html:not(.dark) & {
    background: #171717;
    color: #fff;

    &:hover {
      background: #404040;
    }
  }
}

/* 主题圆点：左半填充=暗色，全填充=浅色 */
.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #767d88;
  position: relative;
  overflow: hidden;
  display: block;

  &::after {
    content: "";
    position: absolute;
    inset: 0 50% 0 0;
    background: #767d88;
  }

  &.light::after {
    inset: 0;
    background: #d5d9df;
  }
}
</style>
