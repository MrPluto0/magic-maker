<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-5 leading-5 bg-[#395c96] text-gray-100"
    >
      <i
        class="i-mdi-volume-high"
        style="font-size: 18px; margin-right: 8px; flex-shrink: 0"
      ></i>
      <span class="mr-4 shrink-0">{{
        `${trackItem.name}.${trackItem.format}`
      }}</span>
    </div>

    <div class="overflow-hidden bg-blue-900 bg-opacity-60 flex-1 relative">
      <div :style="waveStyle" class="absolute" ref="waveRef" />
    </div>

    <div
      v-if="resource?.meta?.prompt"
      class="pl-2 overflow-hidden h-4 bg-gray-600 relative text-xs text-white"
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
import Loading from "@/components/Loading.vue";
import { usePlayerState } from "@/stores/player";
import WaveSurfer from "wavesurfer.js";
import { WaveOptions } from "@/data/track";
import type { AudioTrack } from "@/class/AudioTrack";

const props = defineProps({
  trackItem: {
    type: Object as PropType<AudioTrack>,
    default() {
      return {
        showWidth: "0px",
        showLeft: "0px",
      };
    },
  },
});

const store = usePlayerState();

// 获取关联的资源
const resource = computed(() => props.trackItem.resource);

const waveStyle = computed(() => {
  const { start, end, offsetL, offsetR, frameCount } = props.trackItem;
  const showFrameCount = end - start;
  return {
    // transform: `scaleX(${(frameCount / showFrameCount).toFixed(2)})`,
    transformOrigin: "left top",
    left: `-${(offsetL / showFrameCount) * 100}%`,
    right: `-${(offsetR / showFrameCount) * 100}%`,
  };
});
const loading = ref(true);
const waveRef = ref();

async function initAudio() {
  if (!resource.value?.url) {
    console.error("Audio resource URL not found");
    return;
  }

  store.ingLoadingCount++;
  try {
    // @ts-expect-error
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
  () => {
    return resource.value && waveRef.value;
  },
  () => {
    waveRef.value && initAudio();
  },
  {
    immediate: true,
  }
);
</script>
