<template>
  <el-dialog
    :model-value="show"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-8">新建项目</div>
    <div class="flex justify-center">
      <el-form
        :model="form"
        size="default"
        label-width="auto"
        style="width: 400px"
      >
        <el-form-item label="项目名称">
          <el-input v-model="form.projectName" />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" :rows="5" v-model="form.description" />
        </el-form-item>
        <div class="flex justify-center mt-8 mb-8">
          <el-button class="px-6" color="#1473E6" @click="handleCreate">
            确认
          </el-button>
          <el-button class="px-6" @click="handleClose"> 取消 </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { createProject } from "@/api/workflow";
import { useProjectState } from "@/stores/projectState";

const props = defineProps<{
  show: boolean;
}>();
const emits = defineEmits(["update:show"]);

const projectStore = useProjectState();

const form = reactive({
  projectName: "",
  description: "",
});

const handleClose = () => {
  emits("update:show", false);
};

const handleCreate = async () => {
  await createProject(form);
  projectStore.refreshFlag++;
  emits("update:show", false);
  ElMessage.success("创建成功");
};
</script>

<style scoped lang="less"></style>
