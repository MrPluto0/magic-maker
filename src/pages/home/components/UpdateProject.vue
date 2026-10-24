<template>
  <el-dialog
    :model-value="show"
    width="520"
    align-center
    :before-close="handleClose"
    class="mm-dialog"
  >
    <template #header>
      <div class="dlg-head-inner">
        <span class="label-micro block mb-3">项目</span>
        <div class="text-[#171717] dark:text-white font-normal" style="font-size: 24px; line-height: 1; letter-spacing: -0.5px">
          重命名项目
        </div>
      </div>
    </template>

    <el-form :model="form" label-position="top">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" maxlength="50" @keyup.enter="handleCreate" />
      </el-form-item>
      <el-form-item>
        <template #label>
          项目描述
          <span class="mono text-[10px] text-[#a7a7a7] ml-1">— 可选</span>
        </template>
        <el-input
          type="textarea"
          :rows="3"
          v-model="form.description"
          maxlength="200"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex items-center gap-2.5">
        <span class="mono text-[10px] text-[#a7a7a7]">ESC 关闭</span>
        <div class="flex-1"></div>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleCreate">保存修改 ⏎</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useProjectState } from "@/stores/project";

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

<style lang="less" scoped></style>
