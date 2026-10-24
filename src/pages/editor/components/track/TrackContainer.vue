<template>
  <div
    class="overflow-hidden relative flex flex-col shrink-0 border-t border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night"
    :style="{
      height: `${page.trackHeight}px`,
    }"
  >
    <TrackControl v-model="store.trackScale" />
    <TrackList />
  </div>
</template>

<script setup lang="ts">
import { usePageState } from "@/stores/page";
import { useTrackState } from "@/stores/track";
import TrackControl from "./item/TrackControl.vue";
import TrackList from "./item/TrackList.vue";

const page = usePageState();
const store = useTrackState();
</script>
