<template>
  <div class="flex items-center justify-center h-8 my-2 text-[18px]">
    <div class="m-auto flex items-center gap-4">
      <span class="text-xs text-primary" style="font-family: 'monospace'">{{
        playTime
      }}</span>

      <el-tooltip
        v-for="(control, i) in controls"
        :key="i"
        effect="light"
        :content="control.title"
      >
        <i
          :style="{
            cursor: control.disable ? 'not-allowed' : 'pointer',
          }"
          :class="control.icon"
          @click="control.handler"
        />
      </el-tooltip>

      <span class="text-xs" style="font-family: 'monospace'">{{
        allTime
      }}</span>
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
		icon: "i-mdi-skip-backward",
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.backward();
		},
	},
	{
		title: "播放/暂停 [Space]",
		disable: trackStore.frameCount === 0,
		icon: store.isPause ? "i-mdi-play" : "i-mdi-pause",
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.isPause = !store.isPause;
		},
	},
	{
		title: "快进1s [->]",
		disable: trackStore.frameCount === 0,
		icon: "i-mdi-skip-forward",
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.forward();
		},
	},
]);
</script>

<style scoped></style>
