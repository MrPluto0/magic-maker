<template>
  <el-scrollbar class="flex flex-col h-full overflow-auto">
    <MaterialList :materials="templateList" />
    <div
      class="flex justify-center mt-4"
      v-if="page.page * page.pageSize < page.total"
    >
      <el-button size="large" circle @click="loadMore">
        <el-icon><IEpBottom /></el-icon>
      </el-button>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { getMaterialList, IPage } from "@/api/material";
import MaterialList from "./MaterialList.vue";
import { Material } from "@/types/draw";

const loading = ref(false);
const templateList = ref<Material[]>([]);
const page = reactive<IPage>({
  page: 0,
  pageSize: 6,
  total: 1,
  category: "template_psd",
});

const loadMore = async () => {
  if (page.page * page.pageSize >= page.total) return;
  try {
    loading.value = true;
    page.page += 1;
    const res = await getMaterialList(page);
    page.total = res.total;
    templateList.value.push(...res.records);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  loadMore();
});
</script>

<style scoped lang="less"></style>
