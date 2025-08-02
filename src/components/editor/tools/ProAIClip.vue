<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center">
    <div class="mt-2 mb-4 font-semibold text-base">素材包上传</div>
    <div v-loading="loading" class="flex flex-col w-full">
      <el-form>
        <el-form-item label="名称">
          <el-input placeholder="输入预剪辑名称" v-model="name"></el-input>
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
            拖拽视频压缩包到此 或 <em>点击上传</em>
          </div>
        </el-upload>
      </div>

      <el-button class="w-full mt-2" @click="onPreClip">
        根据素材预剪辑
      </el-button>
    </div>

    <div class="mt-6 mb-4 font-semibold text-base">剪辑生成</div>
    <div class="flex flex-col w-full">
      <el-form>
        <el-form-item label="提示词">
          <el-input placeholder="提示词" v-model="prompt"></el-input>
        </el-form-item>
        <el-form-item label="预剪辑片段">
          <el-select v-model="selectPreClip" placeholder="请选择">
            <el-option
              v-for="item in preClipResults"
              :key="item.batchUuid"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button class="w-full" @click="onGenerate"> 生成剪辑内容 </el-button>
    </div>

    <div class="mt-6 mb-4 font-semibold text-base">剪辑结果</div>

    <div class="flex-1 w-full px-4 h-full overflow-auto">
      <template v-if="result">
        <video class="w-full" :src="result.url" controls></video>

        <div class="mt-6 flex justify-around">
          <el-button
            class="!bg-purple-heavy hover:bg-transparent !text-white"
            @click="onAddTrack"
          >
            添加剪辑区
          </el-button>
        </div>
      </template>
      <template v-else>
        <el-empty class="h-full" :image-size="100" description="暂无结果" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  checkPreAIClip,
  genAIClip,
  preAIClip,
  PreClipResult,
} from "@/api/tools";
import { useTrackState } from "@/stores/trackState";
import { Resource } from "@/types/resource";
import { UploadUserFile } from "element-plus";

const store = useTrackState();

// form1
const loading = ref(false);
const name = ref("");
const fileList = ref<UploadUserFile[]>([]);
const preClipResults = ref<PreClipResult[]>();

// form2
const loading2 = ref(false);
const prompt = ref("");
const selectPreClip = ref<PreClipResult>();
const result = ref<Resource>();

const onPreClip = async () => {
  try {
    loading.value = true;
    if (fileList.value.length === 0) {
      ElMessage.error("请选择图片压缩包再上传");
      return;
    }
    const file = fileList.value[0].raw;
    await preAIClip(name.value, file);
    checkPreResults();
  } finally {
    loading.value = false;
  }
};

const onGenerate = async () => {
  try {
    loading2.value = true;
    if (!selectPreClip.value) {
      ElMessage.error("请选择预剪辑结果");
      return;
    }
    result.value = await genAIClip(prompt.value, selectPreClip.value);
  } finally {
    loading2.value = false;
  }
};

const onAddTrack = async () => {
  if (!result.value) return;
  const track = await store.createTrack(result.value);
  store.addTrack(track);
};

const checkPreResults = async () => {
  const checkResults = await checkPreAIClip();
  preClipResults.value = checkResults;
};

onMounted(checkPreResults);
</script>

<style scoped lang="less">
::selection {
  color: #fff;
  background: #6990f2;
}

.upload-container {
  :deep(.el-upload-dragger) {
    padding: 5px !important;
  }
}
</style>
