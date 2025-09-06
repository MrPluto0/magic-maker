<template>
  <div
    class="container-box overflow-hidden relative !p-0 flex flex-col"
    :style="trackHeight"
  >
    <TrackControl v-model="store.trackScale" />
    <TrackList />
  </div>
</template>

<script setup lang="ts">
import TrackControl from "./track/item/TrackControl.vue";
import TrackList from "./track/TrackList.vue";
import { useTrackState } from "@/stores/track";
import { usePageState } from "@/stores/page";

const page = usePageState();
const store = useTrackState();
const trackHeight = computed(() => ({
  height: `${page.trackHeight}px`,
}));
</script>
