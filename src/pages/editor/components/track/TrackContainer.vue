<template>
  <div
    class="container-box overflow-hidden select-none relative !p-0 flex flex-col"
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
