<template>
  <el-dialog
    :model-value="show"
    width="800"
    align-center
    :before-close="handleClose"
  >
    <div class="px-10" style="width: 700px">
      <div class="flex items-end">
        <div
          class="w-28 text-white text-xl font-bold font-['Open Sans'] tracking-wide"
        >
          如 何 使 用
        </div>
        <div
          class="w-24 text-white text-sm font-normal font-['Open Sans'] tracking-wide"
        >
          How To Use
        </div>
      </div>

      <el-divider class="w-2/3"></el-divider>

      <div class="grid gap-5 grid-cols-4">
        <div
          v-for="(item, i) in GuideMenu"
          :key="i"
          @click="$router.push('/home/guide?id=' + i)"
          class="item flex gap-2 flex-col py-8 justify-center items-center bg-zinc-100 rounded-3xl cursor-pointer"
        >
          <div class="w-10 h-10 flex justify-center items-center">
            <img :src="item.icon" alt="" />
          </div>
          <div
            class="text-neutral-700 text-xs font-light font-['Open Sans'] tracking-widest"
            style="text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.25)"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="my-8 mr-6 text-right text-white text-xs font-normal font-['Open Sans'] leading-normal tracking-wide"
    >
      © 2024. MagicMaker
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { GuideMenu } from "@/data/menu";

const props = defineProps<{
  show: boolean;
}>();
const emits = defineEmits(["update:show"]);

const handleClose = () => {
  emits("update:show", false);
};
</script>

<style scoped lang="less">
.item:nth-of-type(8) {
  img {
    margin-bottom: 8px;
  }
}
</style>
