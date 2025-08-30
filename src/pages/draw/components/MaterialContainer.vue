<template>
  <div class="h-full flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <el-input
        v-model="categoryPage.content"
        class="flex-1"
        placeholder="搜索贴纸类型"
        @keyup.enter="refreshCategory"
      />
      <div>
        <el-button @click="refreshCategory(false)">搜索</el-button>
      </div>
      <div>
        <el-button @click="refreshCategory(true)">重置</el-button>
      </div>
    </div>
    <el-scrollbar class="flex flex-col flex-1 overflow-hidden">
      <template v-if="!showCategoryMore">
        <div v-loading="loading1">
          <div v-for="(item, i) in categoryList" :key="i">
            <div class="text-sm mb-4 font-bold">{{ item.category }}</div>
            <MaterialList :materials="item.records" />
            <el-divider>
              <div
                class="cursor-pointer"
                @click="loadCategoryDetail(item.category, item.records)"
              >
                加载更多
              </div>
            </el-divider>
          </div>
          <div
            class="flex justify-center"
            v-if="
              categoryPage.page * categoryPage.pageSize < categoryPage.total
            "
          >
            <el-button size="large" circle @click="loadMoreCategory">
              <el-icon><IEpBottom /></el-icon>
            </el-button>
          </div>
        </div>
      </template>

      <template v-else>
        <div v-loading="loading2" class="relative">
          <div
            @click="showCategoryMore = false"
            class="w-[25px] h-[25px] cursor-pointer absolute"
          >
            <img src="@/assets/svg/back.svg" alt="" />
          </div>
          <div class="text-base mb-4 font-bold text-center">
            {{ materialPage.category }}
          </div>
          <MaterialList :materials="materialList" />
          <div
            class="flex justify-center mt-4"
            v-if="
              materialPage.page * materialPage.pageSize < materialPage.total
            "
          >
            <el-button size="large" circle @click="loadMoreMaterial">
              <el-icon><IEpBottom /></el-icon>
            </el-button>
          </div>
        </div>
      </template>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import MaterialList from "./MaterialList.vue";
import type { Material } from "@/types/draw";

interface IPage {
	page: number;
	pageSize: number;
	total: number;
	content?: string;
	category?: string;
}

const loading1 = ref(false);
const categoryList = ref<{ category: string; records: Material[] }[]>([]);
const categoryPage = reactive<IPage>({
	page: 0,
	pageSize: 3,
	total: 100,
	content: "",
});

const loading2 = ref(false);
const showCategoryMore = ref(false);
const materialList = ref<Material[]>([]);
const materialPage = reactive<IPage>({
	page: 1,
	pageSize: 6,
	category: "",
	total: 7,
});

const loadCategoryDetail = async (category: string, ms: Material[]) => {
	showCategoryMore.value = true;
	materialPage.category = category;
	materialList.value = [...ms];
	materialPage.page = 1;
	loadMoreMaterial();
};

const loadMoreMaterial = () => {
	// 前端模式下不加载更多素材
	ElMessage.info("前端模式下暂无在线素材");
};

const loadMoreCategory = () => {
	// 前端模式下不加载更多分类
	ElMessage.info("前端模式下暂无在线分类");
};

const refreshCategory = (reset: boolean) => {
	if (reset) {
		categoryPage.content = "";
	}
	categoryPage.page = 0;
	categoryList.value = [];
	loadMoreCategory();
};

onMounted(async () => {
	loadMoreCategory();
});
</script>

<style scoped lang="less"></style>
