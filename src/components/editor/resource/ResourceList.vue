<template>
  <div class="w-full flex flex-col mt-2">
    <ul class="flex flex-row flex-wrap gap-4 w-full">
      <li
        v-for="(item, idnex) of listData"
        :key="`${item.name}${item.cover}${idnex}`"
        class="flex flex-col max-w-full"
      >
        <ResourceItem :data="item" :type="type" :no-action="noAction" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Resource } from "@/types/resource";
import ResourceItem from "../resource/ResourceItem.vue";
import { TrackType } from "@/class/Base";

const props = defineProps<{
  listData: Resource[];
  type: TrackType;
  noAction?: boolean;
}>();
</script>
