<template>
  <div class="p-4 flex flex-1 gap-4 overflow-hidden">
    <!-- <div class="flex w-full justify-center items-center">
      <el-empty description="即将上线，敬请期待"></el-empty>
    </div> -->
    <div class="w-[400px] h-full flex flex-col gap-4">
      <UploadImage class="h-full custom-shadow" />
    </div>

    <div class="flex-1 h-full flex flex-col gap-4 overflow-visible">
      <Annotation class="h-3/4 overflow-hidden custom-shadow" />
      <ModelUsage class="custom-shadow" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Annotation from "@/components/training/Annotation.vue";
import ModelUsage from "@/components/training/ModelUsage.vue";
import UploadImage from "@/components/training/UploadImage.vue";
</script>

<style scoped lang="less"></style>
