<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center">
    <div class="mt-2 mb-4 font-semibold text-base">素材包上传</div>
    <div v-loading="loading" class="flex flex-col w-full gap-4">
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

      <el-button class="w-full" @click="onGenerate">
        生成随机剪辑视频
      </el-button>
    </div>

    <div class="mt-8 mb-4 font-semibold text-base">剪辑结果</div>
    <div class="flex-1 w-full px-4 h-full overflow-auto">
      <template v-if="result?.record?.url">
        <video class="w-full" :src="result.record.url" controls></video>
        <div class="mt-6 flex justify-around">
          <el-button
            class="!bg-purple-heavy hover:bg-transparent !text-white"
            @click="onAddTrack"
          >
            添加剪辑区
          </el-button>
          <el-button
            class="!bg-purple-heavy hover:bg-transparent !text-white"
            @click="onSaveVideo"
          >
            保存视频
          </el-button>
        </div>
      </template>
      <template v-else>
        <el-empty class="h-full" description="暂无结果" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { randomClip } from "@/api/tools";
import { baseFps } from "@/data/trackConfig";
import { useTrackState } from "@/stores/trackState";
import { createFileWriter } from "@/utils/file";
import { formatResourceData } from "@/utils/storeUtil";
import { UploadUserFile } from "element-plus";

const trackStore = useTrackState();
const loading = ref(false);

const fileList = ref<UploadUserFile[]>([]);
const result = ref<any>();

const onGenerate = async () => {
  try {
    loading.value = true;
    if (fileList.value.length === 0) {
      ElMessage.error("请选择图片压缩包再上传");
      return;
    }
    const file = fileList.value[0].raw;
    const res = await randomClip(file);
    result.value = res;
  } finally {
    loading.value = false;
  }
};

const onAddTrack = async () => {
  if (!result.value) return;

  let startFrame = 0;
  for (let i = 0; i < result.value.scenes.length; i++) {
    const item = result.value.scenes[i];
    const resource = formatResourceData(item);
    resource.type = "video";
    //@ts-ignore
    const track: VideoTrack = await trackStore.createTrack(
      resource,
      startFrame
    );
    track.silent = true;
    trackStore.addTrack(track);
    startFrame += resource.duration * baseFps;
  }
};

const onSaveVideo = async () => {
  if (!result.value) return;
  const response = await fetch(result.value.record.url);
  const blob = await response.blob();

  const fileWriter = await createFileWriter();
  // 写入文件数据
  await fileWriter.write(blob);
  // 关闭流
  await fileWriter.close();
};
</script>

<style scoped lang="less">
::selection {
  color: #fff;
  background: #6990f2;
}

.upload-container {
  :deep(.el-upload-dragger) {
    padding: 10px !important;
  }
}
</style>
