<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-6 leading-6 bg-red-900 bg-opacity-70 text-gray-300"
    >
      <i
        class="i-mdi-format-text"
        style="font-size: 18px; margin-right: 8px; flex-shrink: 0"
      ></i>
      <span class="mr-4 shrink-0">{{ props.trackItem.text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TextTrack } from "@/class/TextTrack";
import type { PropType } from "vue";

const props = defineProps({
  trackItem: {
    type: Object as PropType<TextTrack>,
    default() {
      return {
        width: "0px",
        left: "0px",
      };
    },
  },
});
</script>
