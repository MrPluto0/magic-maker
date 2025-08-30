<template>
  <div class="flex flex-wrap items-center gap-4">
    <div
      v-for="(material, i) in materials"
      :key="i"
      @drag="drawStore.dragInfo = material"
    >
      <div
        class="relative"
        :class="material.category === 'template_psd' ? 'w-32' : 'w-20'"
      >
        <div
          class="h-20 cursor-pointer center dark:bg-night hover:border-2 hover:border-purple box-border overflow-hidden"
          :class="material.category === 'template_psd' ? 'h-32' : 'h-20'"
        >
          <el-image
            class="max-h-full max-w-full"
            preview-teleported
            :src="material.url"
            :preview-src-list="[material.url]"
          />
        </div>
        <div
          class="absolute bottom-2 right-1 bg-blue-500 rounded-full w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-150"
          @click="handleAddMaterial(material)"
        >
          <i
            class="i-ep-plus cursor-pointer p-1 box-content"
            style="font-size: 16px; color: #fff"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDrawStore } from "@/stores/draw";
import type { Material } from "@/types/draw";

defineProps<{
  materials: Material[];
}>();

const drawStore = useDrawStore();

const handleAddMaterial = async (material: Material) => {
  try {
    drawStore.loading = true;
    if (material.category === "template_psd") {
      await drawStore.addTemplate(material.psdMetadata);
    } else {
      await drawStore.addMaterial(material);
    }
  } finally {
    drawStore.loading = false;
  }
};
</script>

<style scoped lang="less"></style>
