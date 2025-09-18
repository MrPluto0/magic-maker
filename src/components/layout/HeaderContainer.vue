<template>
  <header
    class="pt-2 px-4 w-full flex flex-nowrap flex-row items-center justify-between"
  >
    <div class="flex w-2/5 items-center">
      <div
        class="cursor-pointer flex items-center gap-2"
        @click="router.push('/')"
      >
        <img class="h-10 rounded-[20px]" src="@/assets/logo.png" alt="" />
        <span class="font-bold text-lg">Magic Maker</span>
      </div>

      <div class="w-fit flex h-8">
        <div
          v-for="(item, i) in menu"
          :key="i"
          class="menu text-sm ml-4 router flex items-center border-b-2 border-transparent cursor-pointer"
          :class="{ active: route.path.includes(item.to) }"
          @click="router.push(item.to)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="flex w-1/5 items-center justify-center">
      {{ projectStore.project?.name }}
    </div>
    <div class="flex w-2/5 flex-row-reverse">
      <div class="flex items-center gap-4">
        <template
          v-if="
            userStore.isLogin &&
            projectStore.project?.id &&
            route.path !== '/home'
          "
        >
          <div class="text-xs">上次保存：{{ projectStore.lastSaveTime }}</div>

          <el-dropdown class="outline-none">
            <div class="flex items-center text-xs">更多操作</div>
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
                  v-if="route.path === '/whiteboard'"
                  @click="projectStore.saveProject"
                  icon="i-mdi-upload"
                >
                  保存画板
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

        <div class="flex items-center gap-4 text-[20px]">
          <i class="i-mdi-github cursor-pointer" @click="openGithub"></i>

          <el-button
            v-if="!userStore.isLogin"
            type="primary"
            @click="userStore.showLogin = true"
            >登录</el-button
          >
          <i
            v-else
            class="i-mdi-account cursor-pointer"
            @click="showUserInfo = true"
          ></i>
        </div>
      </div>
    </div>

    <LoginBox />
    <RegisterBox />
    <UserBox v-model:show="showUserInfo" />
  </header>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { usePageState } from "@/stores/page";
import { useUserState } from "@/stores/user";
import { useProjectState } from "@/stores/project";
import { useRouter, useRoute } from "vue-router";
import LoginBox from "../dialogs/LoginBox.vue";
import RegisterBox from "../dialogs/RegisterBox.vue";
import UserBox from "../dialogs/UserBox.vue";

const pageStore = usePageState();
const userStore = useUserState();
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
		name: "图像编辑",
		to: "/draw",
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
.active {
  @apply dark:border-white border-black;
}

.switch {
  --el-switch-on-color: #805dff;
}
</style>
