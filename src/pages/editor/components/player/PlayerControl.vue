<template>
  <!-- 走带控制条（设计稿 .transport：48px 高、1px 上描边） -->
  <div
    class="transport h-12 shrink-0 border-t border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night flex items-center gap-1 px-3.5"
  >
    <button
      v-for="(control, i) in controls"
      :key="i"
      class="tbtn w-8 h-8 rounded grid place-items-center text-[13px] text-[#767d88] hover:text-white hover:bg-white/6"
      :class="{ play: control.primary }"
      :title="control.title"
      :style="{
        cursor: control.disable ? 'not-allowed' : 'pointer',
        opacity: control.disable ? 0.4 : 1,
      }"
      @click="control.handler"
    >
      <i :class="control.icon" class="text-base"></i>
    </button>

    <!-- 时间码：当前 / 总时长（mono） -->
    <span class="timecode mono text-xs text-[#171717] dark:text-white mx-2.5">
      {{ playTime }} <span class="text-[#a7a7a7]">/ {{ allTime }}</span>
    </span>

    <div class="flex-1"></div>

    <span class="label-micro !text-[10px] mr-2">VOL</span>
    <div class="vol-bar w-[72px] h-0.5 rounded-sm bg-[#d5d9df] dark:bg-[#2e2e33] relative mr-3">
      <i class="absolute left-0 top-0 bottom-0 bg-[#c9ccd1] rounded-sm" :style="{ width: '64%' }"></i>
      <b class="absolute top-1/2 -translate-y-1/2 w-[9px] h-[9px] rounded-full bg-white" style="left: 64%"></b>
    </div>

    <button class="tbtn w-8 h-8 rounded grid place-items-center text-[13px] text-[#767d88] hover:text-white" title="全屏">
      <i class="i-mdi-fullscreen text-base"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import { formatPlayerTime } from "@/utils/common";

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
		title: "到开头",
		disable: trackStore.frameCount === 0,
		icon: "i-mdi-skip-backward",
		primary: false,
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.backward(store.playStartFrame);
		},
	},
	{
		title: "回退1s [<-]",
		disable: trackStore.frameCount === 0,
		icon: "i-mdi-chevron-double-left",
		primary: false,
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.backward();
		},
	},
	{
		title: "播放/暂停 [Space]",
		disable: trackStore.frameCount === 0,
		icon: store.isPause ? "i-mdi-play" : "i-mdi-pause",
		primary: true,
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.isPause = !store.isPause;
		},
	},
	{
		title: "快进1s [->]",
		disable: trackStore.frameCount === 0,
		icon: "i-mdi-chevron-double-right",
		primary: false,
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.forward();
		},
	},
	{
		title: "到结尾",
		disable: trackStore.frameCount === 0,
		icon: "i-mdi-skip-forward",
		primary: false,
		handler: () => {
			if (trackStore.frameCount === 0) return;
			store.forward(trackStore.frameCount);
		},
	},
]);
</script>

<style lang="less" scoped>
.tbtn:hover {
  html:not(.dark) & {
    color: #171717;
    background: #e9ecf2;
  }
}
</style>
