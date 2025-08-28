<template>
  <div class="w-full flex-1 overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList
        :list-data="getResourcesByType('audio').value"
        type="audio"
      />
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-2">
      <!-- <div class="w-22">
        <el-select v-model="form.style" placeholder="风格">
          <el-option value="music" label="音乐" />
          <el-option value="audio" label="音效" />
          <el-option value="narration" label="旁白" />
        </el-select>
      </div> -->

      <div class="w-20">
        <el-select v-model="form.style" placeholder="风格">
          <el-option
            v-for="(style, i) in MusicStyleList"
            :key="i"
            :value="style.value"
            :label="style.text"
          />
        </el-select>
      </div>

      <div class="flex-1">
        <el-input
          v-model="form.prompt"
          placeholder="请输入提示词"
          @keyup.enter="handleSubmit"
        >
          <template #suffix>
            <el-popover trigger="click" :width="80">
              <!-- 时长选择区域 -->
              <template #reference>
                <el-icon :size="18" class="cursor-pointer">
                  <TimeIcon />
                </el-icon>
              </template>
              <template #default>
                <div>
                  <div
                    class="time-text m-2 cursor-pointer"
                    v-for="(time, i) in TimeIntervalList"
                    :key="i"
                    @click="form.len = time"
                    :class="{ active: time == form.len }"
                  >
                    {{ time }}s
                  </div>
                </div>
              </template>
            </el-popover>
          </template>
        </el-input>
      </div>

      <el-button class="dark:bg-purple-heavy" circle @click="handleSubmit">
        <PlaneIcon
      /></el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { MusicStyleList, TimeIntervalList } from "@/data/constant";
// Removed API imports for frontend-only mode
import { useResourceState } from "@/stores/resource";

const resourceStore = useResourceState();
const { getResourcesByType } = resourceStore;
const loading = ref(false);
const form = reactive({
  prompt: "",
  style: "Electronic music",
  len: 4,
});

const handleSubmit = () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }

  ElMessage.info("前端模式下暂不支持AI音乐生成功能");
};
</script>

<style scoped lang="less">
.time-text {
  cursor: pointer;
  font-family: "Open Sans";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.5px;

  &.active {
    @apply text-purple;
    font-weight: bold;
  }
}
</style>
