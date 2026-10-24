<template>
  <div class="flex flex-col flex-1 min-h-0 w-full">
    <!-- 分节标签：与下方「本地素材」区块区分 -->
    <div class="sec-head flex items-baseline justify-between px-4 pt-3.5 pb-1 shrink-0">
      <span class="label-micro !text-[10px]">AI 生成 · GENERATE</span>
    </div>

    <!-- 5 个 AI 生成 tab（设计稿 .tabs/.tab） -->
    <MenuList v-model:active-index="activeIndex" :menu="EditorGenerateMenu" />

    <!-- 生成结果列表 + 提示词输入 -->
    <div class="flex-1 min-h-0 overflow-hidden">
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
