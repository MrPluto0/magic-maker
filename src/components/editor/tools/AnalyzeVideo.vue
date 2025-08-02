<template>
  <div
    class="w-full h-full overflow-hidden flex flex-col items-center"
    v-loading="loading2"
  >
    <div class="mt-2 mb-4 font-semibold text-base">视频上传</div>
    <div v-loading="loading" class="flex items-center w-full gap-4">
      <div class="flex-1">
        <el-input
          v-model="form.link"
          class="mr-4"
          :placeholder="
            form.url
              ? `上传文件：${uploadFileName}`
              : '输入链接或上传（大小不超过100MB）'
          "
          @keyup.enter="handleAnalyze"
        >
          <template #suffix>
            <el-icon class="cursor-pointer" size="18" @click="triggerFileInput">
              <UploadFilled />
            </el-icon>
            <input
              ref="fileInputRef"
              class="file-input"
              type="file"
              name="file"
              accept="video/*"
              hidden
              @change="handleFileChange"
            />
          </template>
        </el-input>
      </div>

      <el-button class="dark:bg-purple-heavy" circle @click="handleAnalyze">
        <PlaneIcon />
      </el-button>
    </div>

    <div class="mt-10 mb-6 font-semibold text-base">解析结果</div>

    <div class="flex-1 w-full px-4 h-full overflow-auto">
      <div v-if="workflow.scenes.length" class="w-full flex flex-col gap-6">
        <div v-for="(scene, i) in workflow.scenes" :key="i">
          <div class="text-xs text-silver-800 mb-2">
            镜头时间：{{ scene.startTime }}s - {{ scene.endTime }}s
          </div>
          <el-input
            class="w-full"
            :autosize="{ minRows: 1, maxRows: 6 }"
            v-model="workflow.scenes[i].description"
            type="textarea"
            placeholder="画面描述"
          />
        </div>
      </div>
      <div v-else>
        <el-empty class="mt-10" description="暂无结果" />
      </div>
    </div>

    <div class="mt-10 mb-6 flex justify-around">
      <el-button
        class="!bg-purple-heavy hover:bg-transparent !text-white"
        :disabled="!workflow.workflowId"
        @click="handleCompleteVideo"
        >生成视频流</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { uploadFile } from "@/api/generate";
import { analyzeVideo, completeAnalyzeVideo } from "@/api/workflow";
import { useTrackState } from "@/stores/trackState";
import { formatResourceData } from "@/utils/storeUtil";
import { Workflow } from "@/types/workflow";
import { VideoTrack } from "@/class/VideoTrack";
import { baseFps } from "@/data/trackConfig";

const loading = ref(false);
const loading2 = ref(false);
const trackStore = useTrackState();

const form = reactive({
  link: "",
  path: "",
  url: "",
});

const workflow = ref<Workflow>({
  workflowId: 10,
  scenes: [],
});
const uploadFileName = ref("");
const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const maxSizeInBytes = 100 * 1024 * 1024; // 100MB换算为字节数
    if (file.size > maxSizeInBytes) {
      ElMessage.error("文件大小超过100MB，请重新上传");
      return;
    }
    loading.value = true;
    uploadFileName.value = file.name;
    const res = await uploadFile(file);
    form.path = res.path;
    form.url = res.url;
    loading.value = false;
  }
};

const handleAnalyze = async () => {
  if (!form.url && !form.link) {
    ElMessage.warning("请输入链接或上传视频文件");
    return;
  }

  loading.value = true;
  try {
    if (form.link) {
      const res = await analyzeVideo({ url: form.link });
      workflow.value = res;
    }
    if (form.path) {
      const res = await analyzeVideo(form);
      workflow.value = res;
    }
  } finally {
    form.link = "";
    loading.value = false;
  }
};

const handleCompleteVideo = async () => {
  loading2.value = true;
  try {
    if (!form.url || !form.path || !workflow.value) {
      return;
    }
    const res = await completeAnalyzeVideo(form.url, form.path, workflow.value);
    workflow.value = res;
    let startFrame = 0;
    for (let i = 0; i < workflow.value.scenes.length; i++) {
      const item = workflow.value.scenes[i];
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
  } finally {
    loading2.value = false;
  }
};
</script>

<style scoped lang="less">
::selection {
  color: #fff;
  background: #6990f2;
}
</style>
