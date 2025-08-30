<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center">
    <MenuList v-model:active-index="activeIndex" :menu="EditorMaterialMenu" />
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="list" :type="activeItem.key" />
    </div>

    <div v-loading="loading" class="w-full upload-container">
      <el-upload
        v-model:file-list="fileList"
        class="w-full"
        drag
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :accept="activeItem.fileType"
        :limit="1"
      >
        <el-icon class="el-icon--upload mt-2" size="40">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text !mt-[-10px] mb-4">
          拖拽文件到此 或 <em>点击上传</em>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import MenuList from "@/components/MenuList.vue";
import { EditorMaterialMenu } from "@/data/menu";
import { useResourceState } from "@/stores/resource";
import type { UploadUserFile } from "element-plus";
import ResourceList from "./ResourceList.vue";

const resourceStore = useResourceState();
const fileList = ref<UploadUserFile[]>([]);
const loading = ref(false);
const activeIndex = ref(0);

const list = computed(
	() => resourceStore.getResourcesByType(activeItem.value.key).value || [],
);

const activeItem = computed(
	() => EditorMaterialMenu.filter((item) => item.fileType)[activeIndex.value],
);

const uploadFile = async () => {
	if (fileList.value.length === 0) {
		ElMessage.error("请选择文件再上传");
		return;
	}

	loading.value = true;
	try {
		const file = fileList.value[0].raw;
		if (!file) {
			ElMessage.error("文件无效");
			return;
		}

		// 使用前端文件解析替代API调用
		await resourceStore.createResource(file);
		ElMessage.success("文件上传成功");
		fileList.value = [];
	} catch (error) {
		console.error("Upload error:", error);
		ElMessage.error("文件上传失败");
	} finally {
		loading.value = false;
	}
};

watch(
	() => fileList.value,
	() => {
		if (fileList.value.length > 0) {
			uploadFile();
		}
	},
);
</script>

<style scoped lang="less">
.upload-container {
  :deep(.el-upload-dragger) {
    padding: 0 !important;
  }
}
</style>
