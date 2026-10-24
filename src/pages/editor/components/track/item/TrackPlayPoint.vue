<template>
  <!-- 播放头：电影红竖线 + 顶部箭头标（设计稿 .playhead，#e5484d） -->
  <div
    class="z-30 w-px absolute -top-5 bottom-0 bg-[#e5484d] transition-transform duration-75"
    id="trackPlayPoint"
    :style="trackStyle"
    @mousedown="onMouseDown"
  >
    <span class="playPoint block sticky top-0 right-0 left-0 cursor-move" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import { getGridPixel, getSelectFrame } from "@/utils/canvasUtil";

const offsetLine = {
	left: 10,
};

const trackStore = useTrackState();
const playerStore = usePlayerState();
const trackStyle = computed(() => {
	return {
		left: `${offsetLine.left}px`,
		transform: `translate(${getGridPixel(
			trackStore.trackScale,
			playerStore.playStartFrame,
		)}px, 0px)`,
	};
});

const isDragging = ref(false);

function onMouseDown(event: MouseEvent) {
	event.stopPropagation();
	event.preventDefault();
	playerStore.isPause = true;
	isDragging.value = true;
}

function onMouseMove(event: MouseEvent) {
	// event.stopPropagation();
	// event.preventDefault();
	if (isDragging.value) {
		// 获取相对于#timeline的偏移量
		const rect = document
			.getElementById("track-container")
			.getBoundingClientRect();
		// 默认fps为30
		const frame = getSelectFrame(
			event.pageX - offsetLine.left - rect.left,
			trackStore.trackScale,
			30,
		);

		const playFrame = frame - 1;
		const startFrame =
			playFrame < 0
				? 0
				: playFrame > trackStore.frameCount
					? trackStore.frameCount
					: playFrame;
		playerStore.playStartFrame = startFrame;
	}
}

document.addEventListener("mousemove", onMouseMove);

function onMouseUp(event: MouseEvent) {
	// event.stopPropagation();
	// event.preventDefault();

	isDragging.value = false;
}

document.addEventListener("mouseup", onMouseUp);
</script>

<style scoped>
.playPoint {
  transform: translateX(-50%);
  width: 11px;
  height: 14px;
  background: #e5484d;
  clip-path: polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%);
}
</style>
