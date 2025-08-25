<template>
  <div class="w-full flex flex-col mt-2">
    <ul class="flex flex-row flex-wrap gap-4 w-full">
      <li
        v-for="(item, index) of listData"
        :key="`${item.name}-${index}`"
        class="flex flex-col max-w-full"
      >
        <ResourceItem :resource="item" :type="type" :no-action="noAction" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ResourceItem from "../resource/ResourceItem.vue";

defineProps<{
  listData: Resource[];
  type: TrackType;
  noAction?: boolean;
}>();
</script>
