<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-5 leading-5 bg-[#4b4f54] text-white"
    >
      <el-icon size="18">
        <VideoIcon class="inline-block mr-2 shrink-0" />
      </el-icon>
      <span class="mr-4 shrink-0"
        >[{{ trackItem.source.duration.toFixed(1) }}s]</span
      >
      <span class="shrink-0">{{
        `${trackItem.name}.${trackItem.format}`
      }}</span>
    </div>
    <div
      ref="container"
      class="bg-gray-400 bg-opacity-70 flex-1 relative whitespace-nowrap overflow-hidden"
      :style="{
        left: `-${getGridPixel(trackStore.trackScale, trackItem.offsetL)}px`,
      }"
    >
      <img
        v-for="(item, index) in thumbnails"
        :key="index"
        :src="item"
        alt=""
        class="image-item"
        draggable="false"
      />
    </div>
    <div
      v-if="trackItem.source.meta.prompt"
      class="pl-2 overflow-hidden h-4 flex items-center bg-gray-700 relative text-xs overflow-ellipsis whitespace-nowrap text-white"
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
import { videoDecoder } from "@/utils/webcodecs";
import { VideoTrack } from "@/class/VideoTrack";
import { getGridPixel } from "@/utils/canvasUtil";
import { useTrackState } from "@/stores/trackState";

const props = defineProps({
  trackItem: {
    type: Object as PropType<VideoTrack>,
  },
});
const store = usePlayerState();
const trackStore = useTrackState();

const container = ref();
const loading = ref(true);
const thumbnails = ref([]);

async function initVideo() {
  try {
    store.ingLoadingCount++;
    loading.value = true;

    const unitWidth = getGridPixel(
      trackStore.trackScale,
      props.trackItem.frameCount
    );
    const imgCount = Math.ceil(unitWidth / 50);
    const step = Math.ceil((props.trackItem.source.duration * 1e6) / imgCount);
    const imgs = await videoDecoder.thumbnails(
      props.trackItem,
      trackStore.trackScale,
      step
    );
    thumbnails.value = imgs.map(({ img }) => {
      return URL.createObjectURL(img);
    });
  } finally {
    loading.value = false;
    store.ingLoadingCount--;
  }
}

watch(() => [props.trackItem.source], initVideo, {
  immediate: true,
  flush: "post",
});

onUnmounted(() => {
  thumbnails.value.forEach((item) => {
    URL.revokeObjectURL(item);
  });
});
</script>

<style scope>
.image-item {
  display: inline-block;
  width: 50px;
  object-fit: cover;
  height: 100%;
}
</style>
