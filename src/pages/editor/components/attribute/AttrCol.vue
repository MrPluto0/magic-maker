<template>
  <!-- 属性字段：微标签在上、控件在下（设计稿 .field/.sec） -->
  <div class="field px-[18px] py-4 border-b border-[#e9ecf2] dark:border-[#27272a]">
    <div class="label-micro !text-[10px] mb-2.5">{{ name }}</div>
    <div
      class="flex flex-1 gap-3 items-center min-w-0"
      :class="{ 'overflow-ellipsis whitespace-nowrap overflow-hidden': nowrap }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
	name: string;
	nowrap?: boolean;
}>();
</script>

<style scoped lang="less"></style>
