<template>
  <!-- 文本 clip：#1a1a1a 面、大写微字（设计稿 .clip.text） -->
  <div class="flex items-center rounded overflow-hidden h-full bg-[#1a1a1a] pl-2">
    <span
      class="text-[10px] text-[#c9ccd1] uppercase whitespace-nowrap overflow-hidden text-ellipsis"
      style="letter-spacing: 0.35px"
    >
      {{ props.trackItem.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { TextTrack } from "@/class/TextTrack";

const props = defineProps<{
	trackItem: TextTrack;
}>();
</script>
