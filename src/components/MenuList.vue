<template>
  <ul class="flex items-center justify-between w-full">
    <li
      v-for="(item, index) of menu"
      :key="item.key"
      class="flex items-center p-2 gap-1 cursor-pointer rounded-[8px] hover:dark:bg-night-light hover:bg-gray-200"
      @click="handleChange(index)"
    >
      <i
        :style="{
          fontSize: '16px',
        }"
        :class="`${item.icon} ${index === activeIndex ? 'text-primary' : ''}`"
      />
      <span
        class="text-xs font-bold"
        :class="
          index === activeIndex
            ? 'text-primary'
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

function handleChange(index: number) {
	emits("update:activeIndex", index);
}
</script>
