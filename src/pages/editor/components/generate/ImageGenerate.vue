<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="resource" type="image" />
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-1">
      <div class="w-20">
        <el-select v-model="form.size" placeholder="尺寸">
          <el-option
            v-for="(size, i) in ImageSizeList"
            :key="i"
            :value="size.value"
            :label="size.text"
          />
        </el-select>
      </div>

      <div class="flex-1 gap-1 flex">
        <el-input
          v-model="form.prompt"
          placeholder="请输入提示词"
          @keyup.enter="handleSubmit"
        >
        </el-input>

        <el-button type="primary" @click="handleSubmit">
          <i class="i-mdi-send" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useResourceState } from "@/stores/resource";
import ResourceList from "../resource/ResourceList.vue";
import { ImageResource } from "@/types/resource";
import { ImageSizeList } from "@/data/constant";
import { OpenAIService } from "@/class/OpenAI";
import { urlToFile } from "@/utils/file";

const resourceStore = useResourceState();

const loading = ref(false);
const resource = computed(
  () => resourceStore.getResourcesByType("image") as ImageResource[]
);

const form = reactive({
  prompt: "",
  size: "",
});

const handleSubmit = async () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }

  loading.value = true;

  try {
    const openai = OpenAIService.getInstance();
    const url = await openai.generateImage({
      prompt: form.prompt,
      n: 1,
      // @ts-expect-error
      size: form.size || "1024x1024",
    });

    const file = await urlToFile(url, `generated-image-${Date.now()}.png`);
    resourceStore.createResource(file, {
      prompt: form.prompt,
      size: form.size,
    });
  } finally {
    loading.value = false;
    form.prompt = "";
  }
};
</script>
