<template>
  <div class="h-full flex flex-col dark:bg-night bg-gray-100">
    <div class="flex-1 relative overflow-hidden">
      <canvas
        v-show="trackStore.frameCount > 0"
        ref="playerCanvas"
        class="absolute left-0 right-0 top-0 bottom-0 m-auto bg-gray-900"
        id="player"
        :style="{
          zoom: scale,
          width: `${playerWidth}px`,
          height: `${playerHeight}px`,
        }"
      />

      <div
        v-if="trackStore.frameCount === 0"
        class="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center"
      >
        <ElIcon
          :size="144"
          class="box-content opacity-50"
          :style="{ color: '#FDE68A' }"
        >
          <VideoCameraFilled />
        </ElIcon>
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
import PlayerMoveable from "./item/PlayerMoveable.vue";
import PlayerControl from "./item/PlayerControl.vue";
import { usePlayerState } from "@/stores/player";
import { CanvasPlayer } from "@/class/CanvasPlayer";
import { storeToRefs } from "pinia";
import { VideoCameraFilled } from "@element-plus/icons-vue";
import { useTrackState } from "@/stores/track";

const props = defineProps({
  containerSize: {
    // 容器大小
    type: Object,
    default() {
      return {
        width: 0,
        height: 0,
      };
    },
  },
});

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
