<template>
  <!-- 图片 clip：缩略铺底 + 名称条（设计稿 .clip.image） -->
  <div class="flex flex-col rounded overflow-hidden h-full bg-[#131208] relative">
    <img
      v-if="resource?.url"
      :src="resource?.url"
      class="absolute inset-0 w-full h-full object-cover opacity-60"
      alt=""
      draggable="false"
    />
    <div
      class="clip-name relative flex items-center text-[10px] font-medium pl-2 overflow-hidden h-5 leading-5 text-white bg-black/45"
      style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8)"
    >
      <i class="i-mdi-image mr-1.5 text-xs shrink-0"></i>
      <span class="mr-4 shrink-0">{{ trackItem.name }}</span>
    </div>
    <Loading v-show="trackItem.loading" class="pl-12 bg-opacity-70" />
  </div>
</template>

<script setup lang="ts">
import type { ImageTrack } from "@/class/ImageTrack";
import Loading from "@/components/Loading.vue";

const props = defineProps<{
	trackItem: ImageTrack;
}>();

const resource = computed(() => props.trackItem.resource);
</script>
