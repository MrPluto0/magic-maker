<template>
  <div class="flex-1 flex p-4 overflow-hidden">
    <div class="container-box w-[200px] h-full !p-6 mr-4">
      <div>
        <el-button
          class="font-semibold"
          color="#1473E6"
          @click="showCreate = true"
          >新建项目</el-button
        >
        <NewProject v-model:show="showCreate" />
      </div>
      <div class="mt-4">
        <el-button class="font-semibold" color="#3B3B3B">打开项目</el-button>
      </div>
    </div>

    <div class="flex-1 flex flex-col h-full gap-4 overflow-hidden">
      <div class="h-1/3 container-box !p-6 flex flex-col overflow-hidden">
        <div class="flex-0 font-semibold mb-4">欢迎使用MagicMaker！</div>
        <div class="flex-1 flex gap-20 pr-20 overflow-hidden">
          <div class="h-full flex-1 overflow-hidden">
            <ProjectList v-if="userStore.isLogin" />
            <el-empty class="h-3/4" v-else description="请先登录" />
          </div>
          <div>
            <div class="text-sm font-semibold mb-8">如何使用</div>
            <el-icon
              :size="120"
              class="cursor-pointer"
              @click="showUsage = true"
            >
              <HowtouseIcon />
            </el-icon>
            <UsageBox v-if="showUsage" v-model:show="showUsage" />
          </div>
          <div>
            <div class="text-sm font-semibold mb-8">了解我们</div>
            <el-icon :size="120" class="cursor-pointer" @click="openPage">
              <ContactIcon />
            </el-icon>
          </div>
        </div>
      </div>

      <div class="h-2/3 container-box !p-6 flex flex-col overflow-hidden">
        <div class="font-semibold mb-4">历史记录</div>
        <GenerateList v-if="userStore.isLogin" />
        <el-empty class="h-full" v-else description="请先登录" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GenerateList from "@/components/editor/generate/GenerateList.vue";
import NewProject from "@/components/messagebox/NewProject.vue";
import UsageBox from "@/components/messagebox/UsageBox.vue";
import { useUserState } from "@/stores/user";

const userStore = useUserState();
const showCreate = ref(false);
const showUsage = ref(false);

const openPage = () => {
  window.open(
    "https://nqu3mwhbrk.feishu.cn/docx/Mj5pdyf0co7EaYxyEIVc3Yu4nad?from=from_copylink"
  );
};
</script>

<style scoped lang="less"></style>
