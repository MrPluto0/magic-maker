<template>
  <ul class="flex items-center gap-2 w-full">
    <li
      v-for="(item, index) of menu"
      :key="item.key"
      class="flex items-center p-2 gap-1 cursor-pointer hover:dark:bg-night-light hover:bg-gray-200"
      @click="activeChangeHandler(index)"
    >
      <i
        :style="{
          fontSize: '16px',
        }"
        :class="`${item.icon} ${index === activeIndex ? 'text-purple' : ''}`"
      />
      <span
        class="text-xs font-bold"
        :class="
          index === activeIndex
            ? 'text-purple'
            : 'dark:text-gray-300 text-gray-500'
        "
      >
        {{ item.title }}</span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { MenuItem } from "@/data/menu";

defineProps<{
  activeIndex: number;
  menu: MenuItem[];
}>();
const emits = defineEmits(["update:activeIndex"]);

function activeChangeHandler(index: number) {
  emits("update:activeIndex", index);
}
</script>
