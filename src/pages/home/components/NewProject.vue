<template>
  <el-dialog
    :model-value="show"
    width="480"
    align-center
    :before-close="handleClose"
    class="mm-dialog"
  >
    <template #header>
      <div class="label-micro">New project</div>
      <div class="mt-2 text-xl font-medium">新建项目</div>
    </template>

    <el-form :model="form" label-position="top">
      <el-form-item label="项目名称">
        <el-input
          v-model="form.name"
          placeholder="未命名项目"
          maxlength="50"
          @keyup.enter="handleCreate"
        />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.description"
          placeholder="一句话描述这个项目（可选）"
          maxlength="200"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建项目</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// Removed API imports for frontend-only mode
import { useProjectState } from "@/stores/project";

const props = defineProps<{
	show: boolean;
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

	projectStore.createProject({
		name: form.name,
		description: form.description || "",
	});

	emits("update:show", false);
	ElMessage.success("创建成功");
};
</script>

<style scoped lang="less"></style>
