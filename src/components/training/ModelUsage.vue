<template>
  <div v-loading="loading" class="container-box flex-1 !p-6 my-text text-xs">
    <div>步骤三：模型保存</div>

    <div class="w-full flex mt-8 gap-10">
      <div class="w-1/3">
        <div>模型选择</div>
        <div class="mt-4">
          <el-select v-model="selectIdx" class="dark:bg-night-lighter rounded">
            <el-option
              v-for="(model, i) in models"
              :key="i"
              :label="model.modelName + ' - ' + model.modelUuid"
              :value="i"
            />
          </el-select>
        </div>
        <div class="mt-5">模型触发词</div>
        <div class="mt-4">
          <el-input
            disabled
            :value="models[selectIdx]?.trainParam?.conceptSentence"
            class="dark:bg-night-lighter rounded"
          />
        </div>
      </div>
      <div class="w-1/3">
        <div>描述词</div>
        <div class="mt-4">
          <el-input
            v-model="prompt"
            type="textarea"
            class="dark:bg-night-lighter rounded"
            :rows="5"
            resize="none"
          />
        </div>
      </div>
      <div class="w-1/3">
        <div>示例参考图</div>
        <div v-if="result.length" class="my-4 h-20 w-full flex gap-4">
          <div
            v-for="(img, i) in result"
            :key="i"
            class="flex max-h-full max-w-full"
          >
            <img :src="img" alt="" />
          </div>
        </div>
        <div v-else class="my-4 h-20 w-full flex gap-4">
          <div class="flex-1 dark:bg-gray-500"></div>
          <div class="flex-1 dark:bg-gray-500"></div>
          <div class="flex-1 dark:bg-gray-500"></div>
        </div>

        <div class="flex justify-center">
          <el-button class="font-semibold px-6" @click="handleUsage"
            >使用模型</el-button
          >
          <el-button
            class="font-semibold px-6"
            color="#805DFF"
            @click="handleSave"
            >保存模型</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { genByModel, saveModel } from "@/api/model";
import { useTrainState } from "@/stores/trainState";
import { TrainModel } from "@/types/model";

const trainStore = useTrainState();

const loading = ref(false);
const models = computed<TrainModel[]>(() => trainStore.modelList);
const selectIdx = ref(0);
const prompt = ref("");
const result = ref<string[]>([]);

const handleUsage = async () => {
  if (prompt.value === "") {
    ElMessage.warning("请输入提示词");
    return;
  }
  loading.value = true;
  try {
    const selectModel = models.value[selectIdx.value];
    const res = await genByModel({
      modelUuid: selectModel?.modelUuid,
      domain: selectModel?.domain,
      prompt: prompt.value,
      trigger: selectModel?.trainParam?.conceptSentence,
    });
    result.value.push(...res);
  } finally {
    loading.value = false;
  }
};

const handleSave = async () => {
  ElMessageBox.confirm("确定保存所选模型？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    await saveModel(models.value[selectIdx.value]);
    ElMessage.success("保存成功");
  });
};
</script>

<style scoped lang="less"></style>
