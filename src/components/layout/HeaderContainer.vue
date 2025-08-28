<template>
  <header
    class="pt-2 w-full flex flex-nowrap flex-row items-center justify-between"
  >
    <div class="flex w-2/5 pl-2 items-center">
      <div
        class="w20 cursor-pointer flex items-center gap-2"
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
          <span class="my-text">{{ item.name }}</span>
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
            ['/editor', '/whiteboard'].includes(route.path) &&
            projectStore.project?.id
          "
        >
          <div class="text-xs">自动保存：{{ projectStore.lastSaveTime }}</div>

          <el-dropdown class="outline-none">
            <div class="flex items-center -mt-0.5 text-xs">
              更多操作
              <el-icon class="el-icon--right"><i-ep-arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-if="route.path === '/editor'"
                  @click="projectStore.saveProject"
                  :icon="Upload"
                >
                  保存剪辑
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="route.path === '/whiteboard'"
                  @click="projectStore.saveProject"
                  :icon="Upload"
                >
                  保存画板
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="route.path === '/editor'"
                  @click="projectStore.exportVideo"
                  :icon="Download"
                >
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
          :active-icon="Moon"
          :inactive-icon="Sunny"
          inline-prompt
        />

        <div class="mr-4 flex items-center">
          <el-button
            v-if="!userStore.isLogin"
            type="primary"
            @click="userStore.showLogin = true"
            >登录</el-button
          >
          <el-icon
            class="cursor-pointer"
            @click="showUserInfo = true"
            v-else
            :size="18"
          >
            <UserFilled />
          </el-icon>
        </div>
      </div>
    </div>

    <LoginBox />
    <RegisterBox />
    <UserBox v-model:show="showUserInfo" />
  </header>
</template>

<script setup lang="ts">
import {
  Download,
  Upload,
  Sunny,
  Moon,
  UserFilled,
} from "@element-plus/icons-vue";
import { usePageState } from "@/stores/page";
import { useUserState } from "@/stores/user";
import { useProjectState } from "@/stores/project";
import { useRouter, useRoute } from "vue-router";
import LoginBox from "../messagebox/LoginBox.vue";
import RegisterBox from "../messagebox/RegisterBox.vue";
import UserBox from "../messagebox/UserBox.vue";

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
</script>

<style lang="less" scoped>
.active {
  @apply dark:border-white border-black;
}

.switch {
  --el-switch-on-color: #805dff;
}
</style>
