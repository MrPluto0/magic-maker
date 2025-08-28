<template>
  <el-dialog v-model="show" width="1000" align-center title="风格重绘">
    <div class="px-8 p-6" v-loading="loading">
      <div class="w-full h-[600px]">
        <img class="w-full h-full object-contain" :src="dataUrl" alt="" />
      </div>
      <div class="mt-4 flex justify-center gap-2">
        <el-input placeholder="输入提示词" v-model="prompt" class="w-60" />
        <el-button type="primary" @click="onGenerate">风格重绘</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
// Removed API imports for frontend-only mode

const props = defineProps<{
  dataUrl: string;
}>();
const emits = defineEmits(["finish"]);

const loading = ref(false);
const show = ref(true);
const prompt = ref("");

const onGenerate = () => {
  ElMessage.info("前端模式下暂不支持风格迁移功能");
  show.value = false;
};
</script>

<style scoped lang="less"></style>
