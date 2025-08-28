<template>
  <div class="flex items-center justify-center h-8 my-2">
    <div class="m-auto flex items-center gap-4">
      <span class="text-xs text-purple inline-block">{{ playTime }}</span>

      <el-tooltip
        v-for="(control, i) in controls"
        :key="i"
        effect="light"
        :content="control.title"
      >
        <el-icon
          :size="18"
          class="cursor-pointer box-content"
          :class="[control.disable ? 'cursor-not-allowed' : 'cursor-pointer']"
          @click="control.handler"
        >
          <component :is="control.icon" />
        </el-icon>
      </el-tooltip>

      <span class="text-xs">{{ allTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPlayerTime } from "@/utils/common";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";

const store = usePlayerState();
const trackStore = useTrackState();

const playTime = computed(() => {
  return formatPlayerTime(store.playStartFrame);
});
const allTime = computed(() => {
  return formatPlayerTime(trackStore.frameCount);
});

const controls = computed(() => [
  {
    title: "回退1s [<-]",
    disable: trackStore.frameCount === 0,
    icon: "BackwardIcon",
    handler: () => {
      if (trackStore.frameCount === 0) return;
      store.backward();
    },
  },
  {
    title: "播放/暂停 [Space]",
    disable: trackStore.frameCount === 0,
    icon: store.isPause ? "PauseIcon" : "PlayIcon",
    handler: () => {
      if (trackStore.frameCount === 0) return;
      store.isPause = !store.isPause;
    },
  },
  {
    title: "快进1s [->]",
    disable: trackStore.frameCount === 0,
    icon: "ForwardIcon",
    handler: () => {
      if (trackStore.frameCount === 0) return;
      store.forward();
    },
  },
]);
</script>

<style scoped></style>
