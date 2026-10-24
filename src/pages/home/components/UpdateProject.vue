<template>
  <el-dialog
    :model-value="show"
    width="480"
    align-center
    :before-close="handleClose"
    class="mm-dialog"
  >
    <template #header>
      <div class="label-micro">Edit project</div>
      <div class="mt-2 text-xl font-medium">更新项目</div>
    </template>

    <el-form :model="form" label-position="top">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" maxlength="50" @keyup.enter="handleCreate" />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input
          type="textarea"
          :rows="4"
          v-model="form.description"
          maxlength="200"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCreate">保存修改</el-button>
      </div>
    </template>
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
	{ deep: true },
);
</script>

<style scoped lang="less"></style>
