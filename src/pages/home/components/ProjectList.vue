<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="flex-0">最近使用项</div>
    <div class="mt-4 flex-1 w-full flex flex-col text-sm overflow-hidden">
      <div class="pb-2 border-b border-zinc-700 flex gap-4">
        <div class="w-28">项目名称</div>
        <div class="w-60">项目描述</div>
        <div class="w-40">更新时间</div>
        <div class="w-40">创建时间</div>
        <div class="w-20">操作</div>
      </div>
      <div class="flex-1 overflow-auto">
        <div
          class="my-2 flex cursor-pointer gap-4"
          :class="{ 'text-purple': pro.id == projectStore.project?.id }"
          v-for="(pro, i) in projectList"
          :key="i"
          @click="checkProject(pro)"
        >
          <div class="w-28 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {{ pro.name }}
          </div>
          <div class="w-60 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {{ pro.description }}
          </div>
          <div class="w-40">{{ new Date(pro.updatedAt).toLocaleString() }}</div>
          <div class="w-40">{{ new Date(pro.createdAt).toLocaleString() }}</div>
          <div class="w-20 flex gap-4 items-center">
            <i
              class="i-mdi-file-document"
              style="color: #faa65e; font-size: 18px; cursor: pointer"
              @click.stop="projectStore.exportProject(pro)"
            ></i>
            <i
              class="i-mdi-pencil"
              style="color: #1473e6; font-size: 18px; cursor: pointer"
              @click.stop="editProject(pro)"
            ></i>
            <i
              class="i-mdi-delete"
              style="color: #f56c6c; font-size: 18px; cursor: pointer"
              @click.stop="delProject(pro.id)"
            ></i>
          </div>
        </div>
      </div>

      <UpdateProject v-model:show="showUpdate" :project="project" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectState } from "@/stores/project";
import type { IProject } from "@/types/project";
import { useRouter } from "vue-router";
import UpdateProject from "./UpdateProject.vue";

const router = useRouter();
const projectStore = useProjectState();

const project = ref<IProject>();
const showUpdate = ref(false);

const projectList = computed(() => projectStore.projectList);

const checkProject = (targetProject) => {
  if (targetProject) {
    projectStore.loadProject(targetProject);
    router.push("/editor");
  }
};

const editProject = (pro: IProject) => {
  project.value = pro;
  showUpdate.value = true;
};

const delProject = (id: string) => {
  ElMessageBox.confirm("确定删除项目？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    projectStore.deleteProject(id);
  });
};
</script>

<style scoped lang="less"></style>
