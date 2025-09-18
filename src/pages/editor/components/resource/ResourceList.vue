<template>
  <div class="w-full flex flex-col mt-2">
    <ul class="flex flex-row flex-wrap gap-4 w-full">
      <li
        v-for="(item, index) of listData"
        :key="`${item.name}-${index}`"
        class="flex flex-col max-w-full"
      >
        <ResourceItem :resource="item" :type="type" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from "@/types/resource";
import ResourceItem from "../resource/ResourceItem.vue";
import type { TrackType } from "@/types/track";

defineProps<{
	listData: Resource[];
	type: TrackType;
}>();
</script>
