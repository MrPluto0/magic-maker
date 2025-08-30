<template>
  <div class="w-full flex-1 overflow-hidden flex flex-col items-center gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList
        :list-data="getResourcesByType('audio').value"
        type="audio"
      />
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-2">
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
                <i
                  class="i-mdi-clock-outline cursor-pointer"
                  style="font-size: 18px"
                ></i>
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
        <i class="i-mdi-send" />
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { TimeIntervalList } from "@/data/constant";
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
