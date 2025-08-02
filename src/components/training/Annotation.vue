<template>
  <div
    class="container-box !p-6 w-full my-text text-xs flex flex-col"
    ref="containerRef"
  >
    <div>步骤二：模型训练</div>

    <el-scrollbar class="m-10 flex-1 overflow-auto">
      <div v-if="trainState.model.modelUuid" class="flex flex-col gap-4">
        <div
          v-for="(image, i) in trainState.model.trainParam.imgcaptionAndId
            .imgCaptionList"
          :key="i"
          class="flex justify-center h-20 mr-4 gap-4"
        >
          <div class="w-20 h-full flex justify-center items-center">
            <el-image
              class="max-w-full max-h-full"
              :src="image.url"
              :preview-src-list="[image.url]"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
            />
          </div>
          <div class="flex-1 h-full">
            <div class="mt-2">Caption {{ i + 1 }}: {{ image.name }}</div>
            <el-input
              class="dark:bg-night-lighter rounded mt-4"
              v-model="image.caption"
            />
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col gap-4">
        <div
          v-for="(_, i) in Array(6)"
          :key="i"
          class="flex justify-center h-20 mr-4"
        >
          <img class="w-20 h-full mr-4 dark:bg-gray-600" alt="" />
          <div class="flex-1 h-full">
            <div class="mt-2">Caption {{ i + 1 }}</div>
            <el-input class="dark:bg-night-lighter rounded mt-4" />
          </div>
        </div>
      </div>
    </el-scrollbar>

    <div class="flex justify-center gap-6 mb-6">
      <el-button
        class="font-semibold px-6 py-4"
        color="#805DFF"
        @click="handleTrain"
      >
        开始训练
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTrainProcess, trainModel } from "@/api/model";
import { useTaskState } from "@/stores/taskState";
import { useTrainState } from "@/stores/trainState";
import { ElLoading } from "element-plus";

const trainState = useTrainState();
const taskStore = useTaskState();
const containerRef = ref();

const handleTrain = async () => {
  // trainState.model.trainParam.steps = 10;
  await trainModel(trainState.model);
  checkProcess();
};

const checkProcess = async () => {
  const loading = ElLoading.service({ target: containerRef.value });

  taskStore.startTimer(async () => {
    try {
      const res = await getTrainProcess(trainState.model);
      loading.setText(`[${res.percent}/100] ${res.status}`);

      if (res.percent === 100) {
        trainState.refreshList();
        ElMessage.success("训练完成");
        loading.close();
        taskStore.endTimer();
      }
    } catch {
      loading.close();
      taskStore.endTimer();
    }
  }, 5);
};
</script>
