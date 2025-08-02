<template>
  <div class="flex flex-col rounded overflow-hidden h-full">
    <div
      class="flex items-center text-xs pl-2 overflow-hidden h-full leading-6 bg-yellow-700 bg-opacity-70 text-white"
    >
      <img
        :src="trackItem.source.cover"
        class="h-full inline-block mr-2 shrink-0"
        alt=""
        draggable="false"
      />
      <div class="mr-4 shrink-0 flex flex-col gap-1">
        <div class="text-xs h-4">
          {{ `${trackItem.name}.${trackItem.format}` }}
        </div>
        <div
          v-if="trackItem.source.meta.prompt"
          class="overflow-hidden h-4 relative text-xs text-white"
        >
          <span>{{ trackItem.source.meta.prompt }}</span>
        </div>
      </div>
    </div>
    <Loading v-show="trackItem.loading" class="pl-12 bg-opacity-70" />
  </div>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
const props = defineProps({
  trackItem: {
    type: Object,
    default() {
      return {
        width: "0px",
        left: "0px",
      };
    },
  },
});

async function initImage() {
  const { name, source, format, width, height } = props.trackItem;
  if (name && source) {
    const imageName = `${name}.${format}`;
  }
}
watch(
  () => {
    return props.trackItem.source;
  },
  initImage,
  {
    immediate: true,
    flush: "post",
  }
);
</script>
