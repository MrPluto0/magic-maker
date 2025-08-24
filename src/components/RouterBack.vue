<template>
  <div @click="handleBack" class="icon">
    <img src="@/assets/svg/back.svg" alt="" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleBack = () => {
  router.back();
};
</script>

<style scoped lang="less">
.icon {
  cursor: pointer;
  width: 35px;
  height: 35px;
}
</style>
