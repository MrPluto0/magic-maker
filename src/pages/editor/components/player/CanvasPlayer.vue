<template>
  <div
    ref="playerContent"
    class="flex-1 min-w-0 flex flex-col overflow-hidden relative !p-0"
    @click="cancelSelect"
  >
    <Player :container-size="containerSize" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { usePageState } from "@/stores/page";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import Player from "./Player.vue";

const pageStore = usePageState();
const store = usePlayerState();
const trackStore = useTrackState();
const playerContent = ref();
const containerSize = reactive({
	width: 0,
	height: 0,
});

function cancelSelect(event: MouseEvent) {
	event.stopPropagation();
	trackStore.selectTrackItem.line = -1;
	trackStore.selectTrackItem.index = -1;
}

// 更新画布尺寸
function updateContainerSize() {
	const { width: maxW, height: maxH } =
		playerContent.value.getBoundingClientRect();
	containerSize.width = maxW;
	containerSize.height = maxH;
}

onMounted(() => {
	updateContainerSize();
});

window.addEventListener("resize", updateContainerSize, false);

watch(
	() => [pageStore.trackHeight, pageStore.attrWidth],
	() => {
		updateContainerSize();
	},
);

watch([() => store.playerHeight, () => store.playerWidth], () => {
	updateContainerSize();
});
</script>
