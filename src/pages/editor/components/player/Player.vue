<template>
  <div class="flex-1 min-h-0 flex flex-col bg-black overflow-hidden relative container-box !rounded-none !border-0 !border-b !border-[#e9ecf2] dark:!border-[#27272a] !bg-black !p-0">
    <!-- 舞台 HUD（分辨率 / 本机渲染标识） -->
    <div class="stage-hud absolute top-4 left-5 right-5 z-20 flex justify-between pointer-events-none">
      <span class="hud-chip mono">{{ playerWidth }} × {{ playerHeight }} · 适应窗口</span>
      <span class="hud-chip mono">编辑器 · 仅本机渲染</span>
    </div>

    <div class="flex-1 relative overflow-hidden">
      <canvas
        v-show="trackStore.frameCount > 0"
        ref="playerCanvas"
        class="absolute left-0 right-0 top-0 bottom-0 m-auto rounded"
        id="player"
        :style="{
          zoom: scale,
          width: `${playerWidth}px`,
          height: `${playerHeight}px`,
        }"
      />

      <div
        v-if="trackStore.frameCount === 0"
        class="absolute left-0 right-0 top-0 bottom-0 z-20 flex flex-col justify-center items-center gap-4 text-[#767d88]"
      >
        <i class="i-mdi-movie-open-outline" :style="{ fontSize: '72px', opacity: 0.5 }"></i>
        <span class="label-micro">导入素材到时间轴开始创作</span>
      </div>

      <PlayerMoveable
        :style="{
          zoom: scale,
          width: `${playerWidth}px`,
          height: `${playerHeight}px`,
        }"
      />
    </div>

    <PlayerControl />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { CanvasPlayer } from "@/class/CanvasPlayer";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import PlayerControl from "./PlayerControl.vue";
import PlayerMoveable from "./PlayerMoveable.vue";

const props = defineProps<{
	containerSize: {
		width: number;
		height: number;
	};
}>();

const store = usePlayerState();
const { playerWidth, playerHeight } = storeToRefs(store);
const trackStore = useTrackState();

const playerCanvas = ref();
const player = ref();

const scale = computed(() => {
	let { width, height } = props.containerSize;
	height -= 70; // 上下功能栏
	width -= 10; //  左右功能栏
	return Math.min(width / playerWidth.value, height / playerHeight.value);
});

onMounted(() => {
	player.value = new CanvasPlayer({
		player: playerCanvas,
	});
});
</script>

<style lang="less" scoped>
/* HUD 角标：mono 微字 + 半透明底 + 1px 描边（设计稿 .hud-chip） */
.hud-chip {
  font-size: 10px;
  color: #a7a7a7;
  background: rgba(3, 3, 3, 0.7);
  border: 1px solid #27272a;
  border-radius: 4px;
  padding: 4px 8px;
}
</style>
