<template>
  <div class="flex flex-col rounded overflow-hidden h-full bg-[#101318]">
    <div
      class="clip-name flex items-center text-[10px] font-medium pl-2 overflow-hidden h-5 leading-5 text-white"
      style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8)"
    >
      <i
        class="i-mdi-volume-high"
        style="font-size: 12px; margin-right: 6px; flex-shrink: 0"
      ></i>
      <span class="mr-4 min-w-0 truncate">{{ trackItem.name }}</span>
    </div>

    <div class="overflow-hidden bg-black/20 flex-1 relative">
      <div :style="waveStyle" class="absolute" ref="waveRef" />
    </div>

    <div
      v-if="resource?.meta?.prompt"
      class="pl-2 overflow-hidden h-4 bg-black/40 relative text-[10px] text-[#c9ccd1]"
    >
      <span>{{ resource.meta.prompt }}</span>
    </div>
    <Loading
      v-show="loading || trackItem.loading"
      class="pl-12 bg-opacity-70"
    />
  </div>
</template>

<script setup lang="ts">
import WaveSurfer from "wavesurfer.js";
import type { AudioTrack } from "@/class/AudioTrack";
import Loading from "@/components/Loading.vue";
import { WaveOptions } from "@/data/track";
import { usePlayerState } from "@/stores/player";

const props = defineProps<{
	trackItem: AudioTrack;
}>();

const store = usePlayerState();
const loading = ref(true);
const waveRef = ref();

const resource = computed(() => props.trackItem.resource);
const waveStyle = computed(() => {
	const { start, end, offsetL, offsetR } = props.trackItem;
	const showFrameCount = end - start;
	return {
		transformOrigin: "left top",
		left: `-${(offsetL / showFrameCount) * 100}%`,
		right: `-${(offsetR / showFrameCount) * 100}%`,
	};
});

async function initAudio() {
	if (!resource.value?.url) {
		console.error("Audio resource URL not found");
		return;
	}

	store.ingLoadingCount++;
	try {
		WaveSurfer.create({
			container: waveRef.value,
			url: resource.value.url,
			...WaveOptions,
		});
	} finally {
		loading.value = false;
		store.ingLoadingCount--;
	}
}

watch(
	() => resource.value && waveRef.value,
	() => {
		waveRef.value && initAudio();
	},
	{
		immediate: true,
	},
);
</script>
