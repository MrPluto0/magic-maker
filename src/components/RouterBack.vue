<template>
  <div @click="$router.back()" class="icon">
    <img src="@/assets/svg/back.svg" alt="" />
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="less">
.icon {
  cursor: pointer;
  width: 35px;
  height: 35px;
}
</style>
