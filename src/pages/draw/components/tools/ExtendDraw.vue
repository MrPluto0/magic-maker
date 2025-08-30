<template>
  <el-dialog v-model="show" width="1200" align-center title="图像扩图">
    <div
      class="px-8 p-6 h-[600px] flex flex-col justify-center items-center gap-10"
      v-loading="loading"
    >
      <div
        class="flex-1 w-full flex justify-center items-center"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseUp"
      >
        <div class="w-[500px] relative">
          <img
            ref="imgRef"
            class="w-full h-fit relative z-[2]"
            :src="dataUrl"
            alt=""
          />
          <div
            class="absolute bg-[#424040] z-[1]"
            :style="{
              border: '3px dashed rgba(255, 255, 255, 0.5)',
              top: `${position.top - 2}px`,
              left: `${position.left - 2}px`,
              bottom: `${position.bottom - 2}px`,
              right: `${position.right - 2}px`,
            }"
          ></div>

          <!-- 四个边 -->
          <div
            class="absolute z-[3] h-1 cursor-ns-resize"
            :style="{
              top: `${position.top}px`,
              left: `${position.top}px`,
              right: `${position.right}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, false, true, false)"
          ></div>
          <div
            class="absolute z-[3] h-1 cursor-ns-resize"
            :style="{
              bottom: `${position.bottom}px`,
              left: `${position.left}px`,
              right: `${position.right}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, false, false, true)"
          ></div>
          <div
            class="absolute z-[3] w-1 cursor-ew-resize"
            :style="{
              left: `${position.left}px`,
              top: `${position.top}px`,
              bottom: `${position.bottom}px`,
            }"
            @mousedown="(e) => onMouseDown(e, true, false, false, false)"
          ></div>
          <div
            class="absolute z-[3] w-1 top-0 bottom-0 cursor-ew-resize"
            :style="{
              right: `${position.right}px`,
              top: `${position.top}px`,
              bottom: `${position.bottom}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, true, false, false)"
          ></div>

          <!-- 4个角 -->
          <div
            class="absolute z-[3] w-3 h-3 bg-black dark:bg-white cursor-nwse-resize"
            :style="{
              top: `${position.top - 6}px`,
              left: `${position.left - 6}px`,
            }"
            @mousedown="(e) => onMouseDown(e, true, false, true, false)"
          ></div>
          <div
            class="absolute z-[3] w-3 h-3 bg-black dark:bg-white cursor-nwse-resize"
            :style="{
              top: `${position.top - 6}px`,
              right: `${position.right - 6}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, true, true, false)"
          ></div>
          <div
            class="absolute z-[3] w-3 h-3 bg-black dark:bg-white cursor-nesw-resize"
            :style="{
              top: `${position.top - 6}px`,
              right: `${position.right - 6}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, true, true, false)"
          ></div>
          <div
            class="absolute z-[3] w-3 h-3 bg-black dark:bg-white cursor-nesw-resize"
            :style="{
              bottom: `${position.bottom - 6}px`,
              left: `${position.left - 6}px`,
            }"
            @mousedown="(e) => onMouseDown(e, true, false, false, true)"
          ></div>
          <div
            class="absolute z-[3] w-3 h-3 bg-black dark:bg-white cursor-nwse-resize"
            :style="{
              bottom: `${position.bottom - 6}px`,
              right: `${position.right - 6}px`,
            }"
            @mousedown="(e) => onMouseDown(e, false, true, false, true)"
          ></div>
        </div>
      </div>

      <div class="flex w-full justify-between items-center">
        <el-button-group>
          <el-button @click="onReset">
            <i class="i-ep-refresh" style="font-size: 17px"></i>
            <span class="ml-[1px]">重置</span>
          </el-button>
        </el-button-group>

        <div class="flex items-center gap-2">
          <el-input placeholder="输入提示词" v-model="prompt" class="w-60" />
          <el-button type="primary" @click="onGenerate">新尺寸扩图</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
// Removed API imports for frontend-only mode

const props = defineProps<{
  dataUrl: string;
}>();
const emits = defineEmits(["finish"]);

const imgRef = ref<HTMLImageElement>();
const show = ref(true);
const loading = ref(false);
const prompt = ref("");

const position = reactive({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  lastL: 0,
  lastR: 0,
  lastT: 0,
  lastB: 0,
});
const moveInfo = reactive({
  isMoving: false,
  left: false,
  right: false,
  top: false,
  bottom: false,
  startX: 0,
  startY: 0,
});

const onMouseDown = (
  e: MouseEvent,
  l: boolean,
  r: boolean,
  t: boolean,
  b: boolean
) => {
  moveInfo.isMoving = true;
  moveInfo.left = l;
  moveInfo.right = r;
  moveInfo.top = t;
  moveInfo.bottom = b;
  moveInfo.startX = e.screenX;
  moveInfo.startY = e.screenY;
  position.lastL = position.left;
  position.lastR = position.right;
  position.lastT = position.top;
  position.lastB = position.bottom;
};

const onMouseMove = (e: MouseEvent) => {
  if (!moveInfo.isMoving) return;
  const dx = e.screenX - moveInfo.startX;
  const dy = e.screenY - moveInfo.startY;
  if (moveInfo.left) {
    position.left = Math.min(position.lastL + dx, 0);
  }
  if (moveInfo.right) {
    position.right = Math.min(position.lastR - dx, 0);
  }
  if (moveInfo.top) {
    position.top = Math.min(position.lastT + dy, 0);
  }
  if (moveInfo.bottom) {
    position.bottom = Math.min(position.lastB - dy, 0);
  }
};

const onMouseUp = (e: MouseEvent) => {
  moveInfo.isMoving = false;
  moveInfo.left = false;
  moveInfo.right = false;
  moveInfo.top = false;
  moveInfo.bottom = false;
};

const onReset = () => {
  position.left = 0;
  position.right = 0;
  position.top = 0;
  position.bottom = 0;
};

const onGenerate = () => {
  ElMessage.info("前端模式下暂不支持图像扩图功能");
  show.value = false;
};
</script>

<style scoped lang="less"></style>
