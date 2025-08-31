<template>
  <el-dialog
    :model-value="show"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-8">更新项目</div>
    <div class="flex justify-center">
      <el-form
        :model="form"
        size="default"
        label-width="auto"
        style="width: 400px"
      >
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" :rows="5" v-model="form.description" />
        </el-form-item>
        <div class="flex justify-center mt-8 mb-8">
          <el-button class="px-6" @click="handleCreate"> 确认 </el-button>
          <el-button class="px-6" @click="handleClose"> 取消 </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useProjectState } from "@/stores/project";
// Removed API imports for frontend-only mode

const props = defineProps<{
  show: boolean;
  project: any;
}>();
const emits = defineEmits(["update:show"]);

const projectStore = useProjectState();

const form = reactive({
  name: "",
  description: "",
});

const handleClose = () => {
  emits("update:show", false);
};

const handleCreate = () => {
  if (!form.name) {
    ElMessage.error("请输入项目名称");
    return;
  }

  projectStore.updateProject(props.project?.id, {
    name: form.name,
    description: form.description || "",
  });

  emits("update:show", false);
  ElMessage.success("更新成功");
};

watch(
  () => props.project,
  () => {
    form.name = props.project.name;
    form.description = props.project.description;
  },
  { deep: true }
);
</script>

<style scoped lang="less"></style>
