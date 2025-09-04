<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="resource" type="image" />
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-2">
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
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useResourceState } from "@/stores/resource";
import ResourceList from "../resource/ResourceList.vue";
import { ImageResource } from "@/types/resource";

const resourceStore = useResourceState();

const loading = ref(false);
const resource = computed(
  () => resourceStore.getResourcesByType("image") as ImageResource[]
);

const form = reactive({
  prompt: "",
  keywords: [],
  model: "",
  size: "",
});

const handleSubmit = () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }

  ElMessage.info("前端模式下暂不支持AI图片生成功能");
};
</script>
