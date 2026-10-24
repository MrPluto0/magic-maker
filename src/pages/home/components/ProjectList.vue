<template>
  <div class="w-full h-full flex flex-col overflow-hidden rounded-lg border border-[#e9ecf2] dark:border-[#27272a] bg-[#f7f8fa] dark:bg-night-lighter p-5">
    <!-- 表头：大写微标签 -->
    <div
      v-if="projectList.length"
      class="grid grid-cols-[minmax(140px,1.2fr)_2fr_170px_170px_100px] gap-4 pb-3 border-b border-[#e9ecf2] dark:border-[#27272a]"
    >
      <div v-for="h in headers" :key="h" class="label-micro">{{ h }}</div>
    </div>

    <!-- 空状态 -->
    <div
      v-if="!projectList.length"
      class="flex-1 flex flex-col items-center justify-center gap-3 text-[#767d88]"
    >
      <i class="i-mdi-movie-open-outline text-3xl opacity-60"></i>
      <div class="text-sm">暂无项目</div>
      <div class="text-xs text-[#a7a7a7]">点击「新建项目」，从第一帧开始你的作品</div>
    </div>

    <!-- 项目行 -->
    <div v-else class="flex-1 overflow-auto -mx-2 px-2">
      <div
        v-for="pro in projectList"
        :key="pro.id"
        class="grid grid-cols-[minmax(140px,1.2fr)_2fr_170px_170px_100px] gap-4 items-center px-2 py-3.5 -mx-2 rounded-md cursor-pointer transition-colors border-b border-transparent"
        :class="
          pro.id === projectStore.project?.id
            ? 'bg-[#e9ecf2] dark:bg-[#1a1a1a]'
            : 'hover:bg-[#eef0f4] dark:hover:bg-[#161618]'
        "
        @click="checkProject(pro)"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <i class="i-mdi-film-strip text-base shrink-0" :class="pro.id === projectStore.project?.id ? 'text-[#171717] dark:text-white' : 'text-[#767d88]'"></i>
          <span
            class="truncate text-sm font-medium"
            :class="pro.id === projectStore.project?.id ? 'text-[#171717] dark:text-white' : 'text-[#3f3f3f] dark:text-[#c9ccd1]'"
          >
            {{ pro.name }}
          </span>
        </div>
        <div class="truncate text-[13px] text-[#767d88]">{{ pro.description || "—" }}</div>
        <div class="text-[13px] text-[#a7a7a7]">{{ formatTime(pro.updatedAt) }}</div>
        <div class="text-[13px] text-[#a7a7a7]">{{ formatTime(pro.createdAt) }}</div>
        <div class="flex items-center gap-1 justify-end">
          <i
            class="i-mdi-tray-arrow-up row-icon"
            title="导出项目"
            @click.stop="projectStore.exportProject(pro)"
          ></i>
          <i
            class="i-mdi-pencil-outline row-icon"
            title="编辑信息"
            @click.stop="editProject(pro)"
          ></i>
          <i
            class="i-mdi-delete-outline row-icon"
            title="删除项目"
            @click.stop="delProject(pro.id)"
          ></i>
        </div>
      </div>
    </div>

    <UpdateProject v-model:show="showUpdate" :project="project" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useProjectState } from "@/stores/project";
import type { IProject } from "@/types/project";
import UpdateProject from "./UpdateProject.vue";

const router = useRouter();
const projectStore = useProjectState();

const project = ref<IProject>();
const showUpdate = ref(false);

const headers = ["项目名称", "项目描述", "更新时间", "创建时间", "操作"];

const projectList = computed(() => projectStore.projectList);

const formatTime = (t: string | number) =>
	new Date(t).toLocaleString(undefined, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

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

<style scoped lang="less">
.row-icon {
  font-size: 16px;
  color: #767d88;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    color: #171717;
    background-color: #e9ecf2;
  }

  html.dark &:hover {
    color: #ffffff;
    background-color: #27272a;
  }
}
</style>
