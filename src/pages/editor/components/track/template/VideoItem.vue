<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-5 leading-5 bg-[#4b4f54] text-white"
    >
      <i class="i-mdi-video mr-2 text-lg shrink-0"></i>
      <span class="mr-4 shrink-0">{{ `${trackItem.name}` }}</span>
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
      v-if="resource.meta?.prompt"
      class="pl-2 overflow-hidden h-4 flex items-center bg-gray-700 relative text-xs overflow-ellipsis whitespace-nowrap text-white"
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
import type { VideoTrack } from "@/class/VideoTrack";
import { getGridPixel } from "@/utils/canvasUtil";
import { useTrackState } from "@/stores/track";
import { decoder } from "@/class/Decoder";

const { trackItem } = defineProps<{ trackItem: VideoTrack }>();
const store = usePlayerState();
const trackStore = useTrackState();

const container = ref();
const loading = ref(true);
const thumbnails = ref([]);
const resource = computed(() => trackItem.resource);

async function initVideo() {
  if (!resource.value) {
    console.error("Video resource not found");
    return;
  }

  try {
    store.ingLoadingCount++;
    loading.value = true;

    const imgs = await decoder.thumbnails(trackItem, trackStore.trackScale);
    thumbnails.value = imgs.map(({ img }) => {
      return URL.createObjectURL(img);
    });
  } finally {
    loading.value = false;
    store.ingLoadingCount--;
  }
}

watch(() => [trackItem, resource.value], initVideo, {
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
