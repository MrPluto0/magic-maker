<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-full leading-6 bg-yellow-700 bg-opacity-70 text-white"
    >
      <img
        :src="imageResource?.url"
        class="h-full inline-block mr-2 shrink-0"
        alt=""
        draggable="false"
      />
      <div class="mr-4 shrink-0 flex flex-col gap-1">
        <div class="text-xs h-4">
          {{ trackItem.name }}
        </div>
        <div class="overflow-hidden h-4 relative text-xs text-white">
          <span>{{ imageResource?.name || "图片" }}</span>
        </div>
      </div>
    </div>
    <Loading v-show="trackItem.loading" class="pl-12 bg-opacity-70" />
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { ImageTrack } from "@/class/ImageTrack";

const props = defineProps({
  trackItem: {
    type: Object as PropType<ImageTrack>,
    default() {
      return {
        width: "0px",
        left: "0px",
      };
    },
  },
});

const imageResource = computed(() => props.trackItem.resource);
</script>
