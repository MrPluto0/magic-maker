<template>
  <header
    class="px-5 w-full h-12 flex flex-nowrap flex-row items-center justify-between border-b border-[#27272a] bg-night"
  >
    <div class="flex items-center gap-8">
      <div
        class="cursor-pointer flex items-center gap-2"
        @click="router.push('/')"
      >
        <img class="h-6 w-6 rounded" src="@/assets/logo.png" alt="" />
        <span
          class="text-white text-base font-semibold"
          style="letter-spacing: -0.3px"
          >Magic Maker</span
        >
      </div>

      <div class="w-fit flex items-center h-8">
        <div
          v-for="(item, i) in menu"
          :key="i"
          class="menu text-[11px] uppercase tracking-[0.35px] ml-1 px-2 py-1 rounded flex items-center cursor-pointer transition-colors"
          :class="
            route.path.includes(item.to)
              ? 'text-white'
              : 'text-[#767d88] hover:text-white'
          "
          @click="router.push(item.to)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-1 items-center justify-end gap-4 min-w-0">
      <template v-if="projectStore.project?.id && route.path !== '/home'">
        <div class="text-xs text-[#a7a7a7] truncate">
          {{ projectStore.project?.name }} · 上次保存
          {{ projectStore.lastSaveTime }}
        </div>

        <el-dropdown class="outline-none">
          <div class="flex items-center text-xs text-[#767d88] hover:text-white cursor-pointer">
            更多操作
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-if="route.path === '/editor'"
                @click="projectStore.saveProject"
              >
                <i class="i-mdi-upload"></i>
                保存剪辑
              </el-dropdown-item>
              <el-dropdown-item
                v-if="route.path === '/editor'"
                @click="projectStore.exportVideo"
              >
                <i class="i-mdi-download"></i>
                导出视频
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>

      <el-switch
        class="switch"
        v-model="pageStore.isDark"
        size="default"
        :active-icon="h('i', { class: 'i-mdi-weather-night' })"
        :inactive-icon="h('i', { class: 'i-mdi-weather-sunny' })"
        inline-prompt
      />

      <div class="flex items-center gap-4 text-[18px] text-[#767d88]">
        <i
          class="i-mdi-github cursor-pointer hover:text-white transition-colors"
          @click="openGithub"
        ></i>

        <i
          class="i-mdi-account cursor-pointer hover:text-white transition-colors"
          title="本地用户 / AI 设置"
          @click="showUserInfo = true"
        ></i>
      </div>
    </div>

    <UserBox v-model:show="showUserInfo" />
  </header>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
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
	{
		name: "主页",
		to: "/home",
	},
	{
		name: "视频剪辑",
		to: "/editor",
	},
];

const openGithub = () => {
	window.open("https://github.com/MrPluto0/magic-maker", "_blank");
};
</script>

<style lang="less" scoped>
.menu {
  user-select: none;
}

.switch {
  --el-switch-on-color: #ffffff;
}
</style>
