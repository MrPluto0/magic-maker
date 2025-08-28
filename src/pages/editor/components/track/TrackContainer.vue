<template>
  <div
    class="overflow-hidden select-none relative pt-2 flex flex-col dark:bg-night-light bg-white rounded"
    :style="trackHeight"
  >
    <TrackControl v-model="store.trackScale" />
    <TrackList />
  </div>
</template>

<script setup lang="ts">
import TrackControl from "./item/TrackControl.vue";
import TrackList from "./TrackList.vue";
import { useTrackState } from "@/stores/track";
import { usePageState } from "@/stores/page";

const page = usePageState();
const store = useTrackState();
const trackHeight = computed(() => ({
  height: `${page.trackHeight}px`,
}));
</script>
