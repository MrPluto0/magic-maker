<template>
  <el-scrollbar class="flex flex-col h-full overflow-auto">
    <MaterialList :materials="templateList" />
    <div
      class="flex justify-center mt-4"
      v-if="page.page * page.pageSize < page.total"
    >
      <el-button size="large" circle @click="loadMore">
        <i class="i-ep-bottom" style="font-size: 16px"></i>
      </el-button>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import MaterialList from "./MaterialList.vue";
import type { Material } from "@/types/draw";

interface IPage {
	page: number;
	pageSize: number;
	total: number;
	category?: string;
}

const loading = ref(false);
const templateList = ref<Material[]>([]);
const page = reactive<IPage>({
	page: 0,
	pageSize: 6,
	total: 1,
	category: "template_psd",
});

const loadMore = () => {
	// 前端模式下不加载模板
	ElMessage.info("前端模式下暂无在线模板");
};

onMounted(() => {
	loadMore();
});
</script>

<style scoped lang="less"></style>
