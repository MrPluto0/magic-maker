<template>
  <div class="flex-1 p-4 overflow-hidden flex flex-col gap-4">
    <div class="container-box w-full flex justify-between !p-6">
      <div>
        <div class="flex-0 font-semibold text-xl mb-4">
          欢迎使用MagicMaker！
        </div>

        <div>
          <el-button
            type="primary"
            class="font-semibold"
            @click="showCreate = true"
          >
            新建项目
          </el-button>
          <NewProject v-model:show="showCreate" />
        </div>
        <div class="mt-4">
          <el-button
            type="primary"
            class="font-semibold"
            @click="projectStore.importProject"
          >
            导入项目
          </el-button>
        </div>
      </div>

      <div class="flex gap-16">
        <div>
          <div class="font-semibold mb-4 text-gray-400">产品介绍</div>
          <div class="text-xs text-gray-400">即将上线</div>
        </div>
        <div class="cursor-pointer" @click="openPage">
          <div class="font-semibold mb-4">关于我自己</div>
          <ContactIcon />
        </div>
      </div>
    </div>

    <div class="container-box flex-1 !p-6 flex flex-col overflow-hidden">
      <div class="flex-1 flex gap-20 overflow-hidden">
        <div class="h-full flex-1 overflow-hidden">
          <ProjectList />
        </div>
      </div>
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
