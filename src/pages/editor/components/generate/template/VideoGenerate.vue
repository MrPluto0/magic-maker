<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="resource" type="video" />
    </div>

    <div class="w-full">
      <el-tag
        v-if="form.imageUrl"
        type="primary"
        class="my-2 text-xs dark:text-white"
        closable
        @close="form.imageUrl = ''"
      >
        <span
          :title="uploadFileName"
          class="inline-block max-w-[300px] overflow-ellipsis overflow-hidden whitespace-nowrap"
          >上传文件：{{ uploadFileName }}</span
        >
      </el-tag>

      <div v-loading="loading" class="flex items-center w-full gap-2">
        <el-input
          v-model="form.prompt"
          placeholder="请输入提示词"
          @keyup.enter="handleSubmit"
        >
          <template #suffix>
            <i
              class="i-mdi-upload cursor-pointer mr-2"
              style="font-size: 18px"
              @click="triggerFileInput"
            ></i>
            <input
              ref="fileInputRef"
              class="file-input"
              type="file"
              name="file"
              accept="image/*"
              hidden
              @change="handleFileChange"
            />
            <el-popover trigger="click">
              <!-- 尺寸选择区域 -->
              <template #reference>
                <i
                  class="i-mdi-resize cursor-pointer"
                  style="font-size: 18px"
                ></i>
              </template>
              <template #default>
                <div class="grid-container">
                  <div
                    v-for="(item, index) in ImageSizeList"
                    :key="index"
                    class="item"
                    @click="form.sizeStr = item.value"
                  >
                    <span
                      class="text"
                      :class="{ active: item.value == form.sizeStr }"
                      >{{ item.value }}</span
                    >
                  </div>
                </div>
              </template>
            </el-popover>
          </template>
        </el-input>

        <el-button type="primary" @click="handleSubmit">
          <i class="i-mdi-send" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ImageSizeList } from "@/data/constant";
import { useResourceState } from "@/stores/resource";
import type { VideoResource } from "@/types/resource";
import ResourceList from "../../resource/ResourceList.vue";

const resourceStore = useResourceState();

const resource = computed(
  () => resourceStore.getResourcesByType("video") as VideoResource[]
);

const loading = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadFileName = ref("");

const form = reactive({
  prompt: "",
  imageUrl: "",
  sizeStr: ImageSizeList[0].value,
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadFileName.value = file.name;
    form.imageUrl = URL.createObjectURL(file);
  }
};

const handleSubmit = () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }

  if (form.imageUrl) {
    ElMessage.info("前端模式下暂不支持图片生成视频功能");
  } else {
    ElMessage.info("前端模式下暂不支持文字生成视频功能");
  }
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
  gap: 10px; /* 列与列之间的间隙 */
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
    @apply dark:text-primary;
    font-weight: bold;
  }

  .img {
    width: 60px;
    height: 60px;
  }
}
</style>
