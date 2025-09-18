<template>
  <div
    class="container-box overflow-hidden relative !p-0 flex flex-col"
    :style="{
      height: `${page.trackHeight}px`,
    }"
  >
    <TrackControl v-model="store.trackScale" />
    <TrackList />
  </div>
</template>

<script setup lang="ts">
import TrackControl from "./item/TrackControl.vue";
import TrackList from "./item/TrackList.vue";
import { useTrackState } from "@/stores/track";
import { usePageState } from "@/stores/page";

const page = usePageState();
const store = useTrackState();
</script>
