<template>
  <div class="w-full h-full min-h-0 flex flex-col">
    <!-- 本地素材分类 tab -->
    <MenuList v-model:active-index="activeIndex" :menu="EditorMaterialMenu" />

    <div class="res-head flex items-baseline justify-between px-4 pt-3 pb-1 shrink-0">
      <span class="label-micro !text-[10px]">本地素材 · {{ activeItem.title }}</span>
      <span class="label-micro !text-[10px] mono" style="letter-spacing: 0">
        {{ list.length }} items
      </span>
    </div>

    <div class="flex-1 min-h-0 w-full overflow-auto px-4">
      <ResourceList :list-data="list" :type="activeItem.key" />
    </div>

    <!-- 拖拽上传区（设计稿 .upzone） -->
    <div v-loading="loading" class="shrink-0 px-4 pb-4 pt-2 w-full">
      <el-upload
        v-model:file-list="fileList"
        class="w-full mm-upload"
        drag
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :accept="activeItem.fileType"
        :limit="1"
      >
        <div class="upzone-inner text-center py-1">
          <div class="text-lg font-light leading-none">↑</div>
          <div class="text-[13px] font-semibold text-[#3f3f3f] dark:text-[#c9ccd1] mt-2">上传本地素材</div>
          <div class="text-[11px] text-[#767d88] mt-1">拖拽或点击上传</div>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";
import MenuList from "@/components/MenuList.vue";
import { EditorMaterialMenu } from "@/data/menu";
import { useResourceState } from "@/stores/resource";
import ResourceList from "./ResourceList.vue";

const resourceStore = useResourceState();
const fileList = ref<UploadUserFile[]>([]);
const loading = ref(false);
const activeIndex = ref(0);

const list = computed(
	() => resourceStore.getResourcesByType(activeItem.value.key) || [],
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

<style lang="less" scoped>
/* el-upload 拖拽区皮肤：虚线描边 + 深色内里（设计稿 .upzone） */
.mm-upload {
  :deep(.el-upload-dragger) {
    padding: 10px 12px;
    border: 1px dashed #2e2e33;
    border-radius: 6px;
    background: transparent;
    transition: border-color 0.15s;

    html:not(.dark) & {
      border-color: #c9ccd1;
    }

    &:hover {
      border-color: #767d88;

      html:not(.dark) & {
        border-color: #767d88;
      }
    }
  }

  :deep(.el-upload) {
    width: 100%;
  }

  :deep(.el-upload-dragger),
  :deep(.el-upload-dragger *) {
    color: #767d88;
  }
}
</style>
