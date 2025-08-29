<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList
        :list-data="getResourcesByType('image').value"
        type="image"
      />
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-2">
      <el-input
        v-model="form.prompt"
        placeholder="请输入提示词"
        @keyup.enter="handleSubmit"
      >
      </el-input>

      <el-button class="dark:bg-purple-heavy" circle @click="handleSubmit">
        <PlaneIcon
      /></el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useResourceState } from "@/stores/resource";
import ResourceList from "../resource/ResourceList.vue";

const resourceStore = useResourceState();
const { getResourcesByType } = resourceStore;

const loading = ref(false);

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

<style scoped lang="less">
.grid-container {
  display: grid;
  grid-template-rows: auto auto; /* 两行，每行高度自动调整 */
  grid-template-columns: auto auto auto; /* 三列，每列宽度自动调整 */
  gap: 10px; /* 列与列之间的间隙 */
}

.grid-container2 {
  display: grid;
  grid-template-rows: auto auto auto auto; /* 两行，每行高度自动调整 */
  grid-template-columns: auto auto auto auto; /* 三列，每列宽度自动调整 */
  gap: 6px; /* 列与列之间的间隙 */
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  .text {
    color: #a78585;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 240% */
    letter-spacing: 0.5px;
  }

  .text.active {
    @apply dark:text-purple;
    font-weight: bold;
  }

  .img {
    width: 60px;
    height: 60px;
  }
}
</style>
