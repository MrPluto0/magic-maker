<template>
  <div v-loading="loading" class="flex flex-col w-full h-full overflow-hidden">
    <el-form size="default">
      <el-form-item label="模型">
        <el-select v-model="form.modelUuid">
          <el-option
            v-for="item in trainStore.savedModelList"
            :key="item.modelUuid"
            :label="item.modelName"
            :value="item.modelUuid"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="提示词">
        <el-input v-model="form.prompt" />
      </el-form-item>
    </el-form>
    <el-button size="default" class="mt-2 w-full" @click="onGenerateStory"
      >生成</el-button
    >
    <div class="mt-6 mb-4 font-semibold text-base text-center">故事板</div>
    <div class="flex-1 px-2 w-full overflow-auto">
      <template v-if="storyBoard.length">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(item, index) in storyBoard" :key="index">
            <img :src="item.url" alt="" />
          </div>
        </div>
        <div class="mt-6 flex justify-around">
          <el-button
            class="!bg-purple-heavy hover:bg-transparent !text-white"
            @click="onAddStory"
          >
            添加画板
          </el-button>
          <el-button
            class="!bg-purple-heavy hover:bg-transparent !text-white"
            @click="onAddTrack"
          >
            添加剪辑区
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
import { generateStoryBoard } from "@/api/material";
import { ImageTrack } from "@/class/ImageTrack";
import { baseFps } from "@/data/trackConfig";
import { useDrawStore } from "@/stores/drawState";
import { useTrackState } from "@/stores/trackState";
import { useTrainState } from "@/stores/trainState";
import { formatResourceData } from "@/utils/storeUtil";
import { useRouter } from "vue-router";

const store = useDrawStore();
const trainStore = useTrainState();
const trackStore = useTrackState();
const router = useRouter();

const loading = ref(false);
const form = reactive({
  prompt: "",
  modelUuid: "",
  trigger: "",
});

// const storyBoard = ref<{ url: string; prompt: string; basicInfo: any }[]>([]);
const storyBoard = ref<{ url: string; prompt: string; basicInfo: any }[]>([]);

const onGenerateStory = async () => {
  try {
    loading.value = true;
    form.trigger = trainStore.savedModelList.find(
      (item) => item.modelUuid === form.modelUuid
    )?.trainParam?.conceptSentence;
    storyBoard.value = await generateStoryBoard(form);
  } finally {
    loading.value = false;
  }
};

const onAddStory = async () => {
  try {
    if (!storyBoard.value.length) return;
    store.loading = true;
    await store.addStory(storyBoard.value);
  } finally {
    store.loading = false;
  }
};

const onAddTrack = async () => {
  if (!storyBoard.value.length) return;
  router.push("/editor");
  let startFrame = 0;
  for (let i = 0; i < storyBoard.value.length; i++) {
    const item = storyBoard.value[i];
    const resource = formatResourceData(item);
    resource.type = "image";
    resource.duration = 4;
    //@ts-ignore
    const track: ImageTrack = await trackStore.createTrack(
      resource,
      startFrame
    );
    trackStore.addTrack(track);
    startFrame += resource.duration * baseFps;
  }
};
</script>

<style scoped lang="less">
.upload-container {
  :deep(.el-upload-dragger) {
    padding: 0 !important;
  }
}
</style>
