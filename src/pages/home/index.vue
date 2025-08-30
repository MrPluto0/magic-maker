<template>
  <div class="flex-1 p-4 overflow-hidden flex flex-col gap-4">
    <div class="container-box w-full flex justify-between !p-6">
      <div>
        <div class="flex-0 font-semibold text-xl mb-4">
          欢迎使用MagicMaker！
        </div>

        <div>
          <el-button class="font-semibold" @click="showCreate = true">
            新建项目
          </el-button>
          <NewProject v-model:show="showCreate" />
        </div>
        <div class="mt-4">
          <el-button class="font-semibold" @click="projectStore.importProject">
            导入项目
          </el-button>
        </div>
      </div>

      <div class="flex gap-16">
        <div>
          <div class="font-semibold mb-4">产品介绍</div>
          <el-icon :size="120" class="cursor-pointer" @click="showUsage = true">
            <HowtouseIcon />
          </el-icon>
          <UsageBox v-if="showUsage" v-model:show="showUsage" />
        </div>
        <div class="mr-4">
          <div class="font-semibold mb-4">关于我自己</div>
          <el-icon :size="120" class="cursor-pointer" @click="openPage">
            <ContactIcon />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="container-box flex-1 !p-6 flex flex-col overflow-hidden">
      <div class="flex-1 flex gap-20 overflow-hidden">
        <div class="h-full flex-1 overflow-hidden">
          <ProjectList v-if="userStore.isLogin" />
          <el-empty class="h-3/4" v-else description="请先登录" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserState } from "@/stores/user";
import { useProjectState } from "@/stores/project";
import UsageBox from "@/components/messagebox/UsageBox.vue";
import NewProject from "./components/NewProject.vue";
import ProjectList from "./components/ProjectList.vue";

const userStore = useUserState();
const projectStore = useProjectState();
const showCreate = ref(false);
const showUsage = ref(false);

const openPage = () => {
	window.open("https://www.gypsophlia.top/");
};
</script>

<style scoped lang="less"></style>
