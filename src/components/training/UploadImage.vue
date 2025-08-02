<template>
  <div v-loading="loading" class="container-box !p-6 w-full my-text text-xs">
    <div>步骤一：模型配置</div>
    <div class="text-center mt-11">模型命名</div>
    <div class="flex justify-center mt-6">
      <el-input
        v-model="form.modelName"
        class="dark:bg-night-lighter rounded !w-3/4"
      />
    </div>

    <div class="text-center mt-10">触发词设定</div>
    <div class="flex justify-center mt-6">
      <el-input
        v-model="form.trigger"
        class="dark:bg-night-lighter rounded !w-3/4"
      />
    </div>

    <div class="text-center mt-10">上传图片</div>
    <div class="flex justify-center mt-4 mb-10">
      <el-upload
        class="!w-3/4"
        v-model:file-list="fileList"
        drag
        accept=".zip"
        :limit="1"
        :auto-upload="false"
      >
        <el-icon class="el-icon--upload">
          <UploadIcon />
        </el-icon>
        <div class="el-upload__text !text-sm">
          拖拽图片压缩包 或 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip text-center !mt-4 text-sm">
            文件类型：ZIP压缩包，图片格式为JPG或PNG；图片数量6~30张最宜，单图不超过
            2MB。
          </div>
        </template>
      </el-upload>
    </div>

    <div class="flex justify-center gap-6">
      <el-button
        @click="handleUpload"
        class="font-semibold px-6 py-4"
        color="#805DFF"
        >上传配置</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IUploadDataset, uploadDataset } from "@/api/model";
import { useTrainState } from "@/stores/trainState";
import { UploadUserFile } from "element-plus";

const trainStore = useTrainState();

const loading = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const form = reactive<IUploadDataset>({
  modelName: "",
  trigger: "",
  file: null as File,
});

const handleUpload = async () => {
  loading.value = true;
  try {
    if (fileList.value.length != 1) {
      ElMessage.warning("请上传文件");
      return;
    }
    form.file = fileList.value[0].raw;
    const res = await uploadDataset(form);
    trainStore.model = res;
    ElMessage.success("上传成功");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less"></style>
