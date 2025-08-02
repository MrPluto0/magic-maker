<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <div class="flex-0 text-sm">最近使用项</div>
    <div class="mt-4 flex-1 w-full flex flex-col text-xs overflow-hidden">
      <div class="pb-2 border-b border-zinc-700 flex gap-4">
        <div class="w-28">项目名称</div>
        <div class="w-60">项目描述</div>
        <div class="w-40">更新时间</div>
        <div class="w-40">创建时间</div>
        <div class="w-20">操作</div>
      </div>
      <div class="flex-1 overflow-auto" @scroll="onScroll">
        <div
          class="my-2 flex cursor-pointer gap-4"
          :class="{ 'text-purple': pro.id == projectStore.project?.id }"
          v-for="(pro, i) in projectList"
          :key="i"
          @click="checkProject(pro.id)"
        >
          <div class="w-28 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {{ pro.projectName }}
          </div>
          <div class="w-60 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {{ pro.description }}
          </div>
          <div class="w-40">{{ new Date(pro.updatedAt).toLocaleString() }}</div>
          <div class="w-40">{{ new Date(pro.createdAt).toLocaleString() }}</div>
          <div class="w-20 flex gap-4 items-center">
            <el-icon color="#1473e6" size="16" @click.stop="editProject(pro)">
              <Edit />
            </el-icon>
            <el-icon color="#F56C6C" size="16" @click.stop="delProject(pro.id)">
              <Delete />
            </el-icon>
          </div>
        </div>
      </div>

      <UpdateProject v-model:show="showUpdate" :project="project" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProjects, getProjectInfo, deleteProject } from "@/api/workflow";
import { useProjectState } from "@/stores/projectState";
import { IProject } from "@/types/project";
import { debounce } from "lodash-es";
import { useRouter } from "vue-router";
import { Delete, Edit } from "@element-plus/icons-vue";
import UpdateProject from "./messagebox/UpdateProject.vue";

const router = useRouter();
const projectStore = useProjectState();

const pageInfo = reactive({
  page: 1,
  pageSize: 8,
  total: 1,
});

const project = ref<IProject>();
const showUpdate = ref(false);
const projectList = ref<IProject[]>([]);

const loadProject = async (page: number) => {
  pageInfo.page = page;
  const res = await getProjects(pageInfo.page, pageInfo.pageSize);
  console.log("获取项目列表", res);
  pageInfo.total = res.total;
  projectList.value.push(...res.records);
};

const onScroll = debounce(async (e) => {
  if (e.target.scrollTop + e.target.clientHeight < e.target.scrollHeight - 1) {
    return;
  }
  if (pageInfo.page * pageInfo.pageSize >= pageInfo.total) {
    return;
  }

  loadProject(pageInfo.page + 1);
}, 100);

const checkProject = async (id: number) => {
  const res = await getProjectInfo(id);
  projectStore.setProduct(res);
  router.push("/editor");
};

const editProject = (pro: IProject) => {
  project.value = pro;
  showUpdate.value = true;
};

const delProject = (id: number) => {
  ElMessageBox.confirm("确定删除项目？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await deleteProject(id);
    projectStore.refreshFlag++;
    if (id === projectStore.project?.id) {
      projectStore.project = null;
    }
    ElMessage.success("删除成功");
  });
};

watch(
  () => projectStore.refreshFlag,
  () => {
    projectList.value = [];
    loadProject(1);
  }
);

onMounted(() => {
  loadProject(1);
});
</script>

<style scoped lang="less"></style>
