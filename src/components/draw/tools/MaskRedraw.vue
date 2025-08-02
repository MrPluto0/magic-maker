<template>
  <el-dialog v-model="show" width="1200" align-center title="区域重绘">
    <div class="px-8 p-6 flex flex-col items-center w-full" v-loading="loading">
      <canvas
        ref="canvasRef"
        :style="{
          width: `${canvasData.width}px`,
          height: `${canvasData.height}px`,
        }"
      ></canvas>

      <div class="mt-4 flex w-full justify-between">
        <div class="flex flex-shrink-0 gap-4">
          <el-button-group>
            <el-button @click="onUndo">
              <el-icon size="15"><UndoIcon /></el-icon>
            </el-button>
            <el-button @click="onRedo">
              <el-icon size="15"><RedoIcon /></el-icon>
            </el-button>
            <el-button @click="onReset">
              <el-icon size="17"><IEpRefresh /></el-icon>
            </el-button>
          </el-button-group>

          <div class="flex w-[160px] gap-2 items-center">
            <div class="flex-shrink-0">笔刷</div>
            <el-slider v-model="brushSize" />
          </div>
        </div>

        <div class="flex gap-2">
          <el-input placeholder="输入提示词" v-model="prompt" class="w-60" />
          <el-button type="primary" @click="onGenerate">重绘选区</el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { uploadFile } from "@/api/generate";
import { partialDraw } from "@/api/tools";
import { createStack } from "@/utils/stack";
import hotkeys from "hotkeys-js";

const props = defineProps<{
  dataUrl: string;
}>();
const emits = defineEmits(["finish"]);

const canvasRef = ref();
const canvasCtx = ref<CanvasRenderingContext2D>();
const canvasData = reactive({
  width: 0,
  height: 0,
});
const stack = createStack<ImageData>(null);

const loading = ref(false);
const show = ref(true);

const painting = ref(false);
const brushSize = ref(30);
const prompt = ref("");

const drawMask = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 设置涂抹的区域，画笔大小为 brushSize.value
  for (let dx = -brushSize.value; dx < brushSize.value; dx++) {
    for (let dy = -brushSize.value; dy < brushSize.value; dy++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < canvas.width && ny < canvas.height) {
        const index = (ny * canvas.width + nx) * 4;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < brushSize.value) {
          // 使用鼠标位置来涂抹遮罩透明度
          imageData.data[index + 3] *= dist / brushSize.value;
        }
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

const onUndo = () => {
  const imageData = stack.undo();
  canvasCtx.value.putImageData(imageData, 0, 0);
};

const onRedo = () => {
  const imageData = stack.redo();
  canvasCtx.value.putImageData(imageData, 0, 0);
};

const onReset = () => {
  const imageData = stack.reset();
  canvasCtx.value.putImageData(imageData, 0, 0);
};

const onGenerate = async () => {
  try {
    loading.value = true;
    // 上传文件;
    const dataURL = canvasRef.value.toDataURL("image/png");
    const blob = await (await fetch(dataURL)).blob();
    const file = new File([blob], "redraw.png");
    const res = await uploadFile(file);
    // 局部重绘
    const res2 = await partialDraw(res.url, prompt.value);
    show.value = false;
    emits("finish", res2);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await nextTick();

  if (!canvasRef.value) return;

  const maxWidth = 1000;
  const maxHeight = 600;

  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  canvasCtx.value = ctx;

  // 加载图像
  const img = new Image();
  img.src = props.dataUrl; // 替换为你自己的图片路径
  img.onload = () => {
    let scaledWidth = img.width;
    let scaledHeight = img.height;

    // 计算宽度和高度的缩放比例
    const widthRatio = maxWidth / img.width;
    const heightRatio = maxHeight / img.height;

    if (img.width > maxWidth || img.height > maxHeight) {
      // 确定缩放比例，按比例缩放
      const scaleRatio = Math.min(widthRatio, heightRatio);

      // 计算缩放后的宽度和高度
      scaledWidth = img.width * scaleRatio;
      scaledHeight = img.height * scaleRatio;
    }
    canvasData.width = scaledWidth;
    canvasData.height = scaledHeight;
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    stack.push(imageData);
  };

  canvas.addEventListener("mousedown", (e) => {
    painting.value = true;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (painting.value) {
      drawMask(e.offsetX, e.offsetY);
    }
  });

  canvas.addEventListener("mouseup", () => {
    painting.value = false;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    stack.push(imageData);
  });

  hotkeys("ctrl+z", onUndo);
  hotkeys("ctrl+shift+z", onRedo);
});

onUnmounted(() => {
  hotkeys.unbind("ctrl+z");
  hotkeys.unbind("ctrl+shift+z");
});
</script>

<style scoped lang="less"></style>
