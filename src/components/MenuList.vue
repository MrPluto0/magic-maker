<template>
  <ul class="flex items-center gap-2 w-full">
    <li
      v-for="(item, index) of menu"
      :key="item.key"
      class="flex items-center p-2 cursor-pointer hover:dark:bg-gray-700 hover:bg-gray-200"
      @click="activeChangeHandler(index)"
    >
      <ElIcon
        :color="index === activeIndex ? '#1473e6' : ''"
        :size="item.iconSize ?? 14"
        class="flex-auto mr-1"
      >
        <component :is="item.icon" />
      </ElIcon>
      <span
        class="ml-0.5 select-none text-xs font-bold"
        :class="
          index === activeIndex
            ? 'text-[#1473e6]'
            : 'dark:text-gray-300 text-gray-500'
        "
      >
        {{ item.title }}</span
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { MenuItem } from "@/data/menu";

defineProps<{
  activeIndex: number;
  menu: MenuItem[];
}>();
const emits = defineEmits(["update:activeIndex"]);

function activeChangeHandler(index: number) {
  emits("update:activeIndex", index);
}
</script>
