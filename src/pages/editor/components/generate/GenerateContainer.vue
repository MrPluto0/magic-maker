<template>
  <div
    class="flex h-full overflow-hidden relative container-box !p-0 bg-transparent"
  >
    <div class="flex flex-col gap-2 w-full">
      <MenuList v-model:active-index="activeIndex" :menu="EditorGenerateMenu" />
      <KeepAlive>
        <component :is="activeItem.component" :key="activeItem.key" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuList from "@/components/MenuList.vue";
import { EditorGenerateMenu } from "@/data/menu";

const activeIndex = ref(0);
const activeItem = computed(() => EditorGenerateMenu[activeIndex.value]);
</script>
