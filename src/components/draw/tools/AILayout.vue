<template>
  <div v-loading="loading" class="flex flex-col w-full">
    <el-form size="default">
      <el-form-item label="布局风格">
        <el-input disabled v-model="form.style" />
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input v-model="form.productName" />
      </el-form-item>
      <el-form-item label="关键词">
        <el-input v-model="form.keyword" />
      </el-form-item>
    </el-form>

    <div class="upload-container">
      <el-upload
        v-model:file-list="fileList"
        drag
        action=""
        :auto-upload="false"
        accept=".zip"
        :limit="1"
      >
        <el-icon class="el-icon--upload mt-2" size="60">
          <i-ep-upload-filled />
        </el-icon>
        <div class="el-upload__text !mt-[-10px] mb-4">
          拖拽图片压缩包到此 或 <em>点击上传</em>
        </div>
      </el-upload>
    </div>

    <el-button size="default" class="mt-4 w-full" @click="onGenerateTpl">
      生成
    </el-button>
  </div>
</template>

<script lang="ts" setup>
// Removed API imports for frontend-only mode
import { useDrawStore } from "@/stores/draw";
import { UploadUserFile } from "element-plus";

const store = useDrawStore();

const loading = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const form = reactive({
  style: "画册排版",
  productName: "",
  keyword: "",
});

const onGenerateTpl = () => {
  if (!form.productName || !form.keyword) {
    ElMessage.error("请填写产品名称和关键词");
    return;
  }
  if (fileList.value.length === 0) {
    ElMessage.error("请选择图片压缩包再上传");
    return;
  }

  ElMessage.info("前端模式下暂不支持AI布局功能");
};
</script>

<style scoped lang="less">
.upload-container {
  :deep(.el-upload-dragger) {
    padding: 10px !important;
  }
}
</style>
