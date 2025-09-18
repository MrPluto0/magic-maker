<template>
  <div class="flex flex-1 gap-3 items-center">
    <div class="font-semibold flex-shrink-0">{{ name }}</div>
    <div
      class="flex-1 overflow-hidden font-thin"
      :class="{ 'overflow-ellipsis whitespace-nowrap': nowrap }"
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
