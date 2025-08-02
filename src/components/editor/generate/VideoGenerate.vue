<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="resourceStore.videoList" type="video" />
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
            <el-icon
              class="cursor-pointer mr-2"
              size="18"
              @click="triggerFileInput"
            >
              <UploadIcon />
            </el-icon>
            <input
              ref="fileInputRef"
              class="file-input"
              type="file"
              name="file"
              accept="image/*"
              hidden
              @change="handleFileChange"
            />
            <el-popover trigger="click" width="325">
              <!-- 风格选择区域 -->
              <template #reference>
                <el-icon :size="18" class="cursor-pointer mr-2">
                  <ColorPanelIcon />
                </el-icon>
              </template>
              <template #default>
                <div class="grid-container2">
                  <div
                    v-for="(item, index) in ResourceStyleList"
                    :key="index"
                    class="item"
                    @click="form.style = item.value"
                  >
                    <img class="img" :src="item.img" />
                    <span
                      class="text"
                      :class="{ active: item.value == form.style }"
                      >{{ item.text }}</span
                    >
                  </div>
                </div>
              </template>
            </el-popover>

            <el-popover trigger="click">
              <!-- 尺寸选择区域 -->
              <template #reference>
                <el-icon :size="18" class="cursor-pointer">
                  <SizePanelIcon />
                </el-icon>
              </template>
              <template #default>
                <div class="grid-container">
                  <div
                    v-for="(item, index) in ImageSizeList"
                    :key="index"
                    class="item"
                    @click="form.sizeStr = item.value"
                  >
                    <img class="icon" :src="item.img" />
                    <span
                      class="text"
                      :class="{ active: item.value == form.sizeStr }"
                      >{{ item.text }}</span
                    >
                  </div>
                </div>
              </template>
            </el-popover>
          </template>
        </el-input>

        <el-button class="dark:bg-purple-heavy" circle @click="handleSubmit">
          <PlaneIcon />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ImageSizeList, ResourceStyleList } from "@/data/constant";
import { image2video, uploadFile, text2video } from "@/api/generate";
import { useResourceState } from "@/stores/resourceState";

const resourceStore = useResourceState();
const loading = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadFileName = ref("");

const form = reactive({
  prompt: "",
  imageUrl: "",
  sizeStr: ImageSizeList[0].value,
  style: "Anime Style",
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const res = await uploadFile(file);
    uploadFileName.value = file.name;
    form.imageUrl = res.url;
  }
};

const handleSubmit = async () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }
  loading.value = true;
  try {
    let res;
    if (form.imageUrl) {
      res = await image2video(form);
    } else {
      res = await text2video(form);
    }
    resourceStore.videoList.push(res);
  } finally {
    loading.value = false;
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
    font-family: "Open Sans";
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
