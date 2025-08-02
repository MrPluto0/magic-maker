<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-5 leading-5 bg-[#395c96] text-gray-100"
    >
      <el-icon size="18">
        <AudioIcon class="inline-block mr-2 shrink-0" />
      </el-icon>
      <span class="mr-4 shrink-0">{{
        `${trackItem.name}.${trackItem.format}`
      }}</span>
    </div>

    <div class="overflow-hidden bg-blue-900 bg-opacity-60 flex-1 relative">
      <div :style="waveStyle" class="absolute" ref="waveRef" />
    </div>

    <div
      v-if="trackItem.source.meta.prompt"
      class="pl-2 overflow-hidden h-4 bg-gray-600 relative text-xs text-white"
    >
      <span>{{ trackItem.source.meta.prompt }}</span>
    </div>
    <Loading
      v-show="loading || trackItem.loading"
      class="pl-12 bg-opacity-70"
    />
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { usePlayerState } from "@/stores/playerState";
import WaveSurfer from "wavesurfer.js";
import { WaveOptions } from "@/data/trackConfig";
import { AudioTrack } from "@/class/AudioTrack";
import { proxyUrl } from "@/utils/file";

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
  store.ingLoadingCount++;
  try {
    const url = proxyUrl(props.trackItem.source.url);
    // @ts-ignore
    WaveSurfer.create({
      container: waveRef.value,
      url,
      ...WaveOptions,
    });
  } finally {
    loading.value = false;
    store.ingLoadingCount--;
  }
}

watch(
  () => {
    return props.trackItem.source && waveRef.value;
  },
  () => {
    waveRef.value && initAudio();
  },
  {
    immediate: true,
  }
);
</script>
