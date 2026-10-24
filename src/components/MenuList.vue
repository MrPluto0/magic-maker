<template>
  <ul class="mm-tabs flex w-full border-b border-[#e9ecf2] dark:border-[#27272a] shrink-0">
    <li
      v-for="(item, index) of menu"
      :key="item.key"
      class="flex-1 text-center cursor-pointer py-[13px] pb-[11px] text-[11px] font-[450] uppercase"
      style="letter-spacing: 0.35px"
      :class="
        index === activeIndex
          ? 'text-[#171717] dark:text-white border-b border-b-white dark:border-b-white -mb-px'
          : 'text-[#767d88] border-b border-b-transparent -mb-px hover:text-[#c9ccd1] dark:hover:text-[#c9ccd1]'
      "
      @click="handleChange(index)"
    >
      {{ item.title }}
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
