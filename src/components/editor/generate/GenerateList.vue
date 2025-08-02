<template>
  <div class="w-full h-full flex-1 flex flex-col overflow-hidden">
    <div class="w-full flex gap-8 mt-2">
      <div
        v-for="(item, i) in MenuList"
        class="cursor-pointer text-xs py-1 px-4 menu"
        :class="{ active: pagination.type == item.key }"
        @click="pagination.type = item.key"
        :key="i"
      >
        {{ item.label }}
      </div>
    </div>

    <el-divider></el-divider>

    <div class="flex-1 w-full flex flex-col text-xs overflow-auto">
      <ResourceList :list-data="list" :type="pagination.type" no-action />
    </div>

    <div class="flex justify-center">
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :total="total"
        v-model:current-page="pagination.page"
        :page-sizes="[20, 30, 40, 50]"
        v-model:page-size="pagination.pageSize"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Resource } from "@/types/resource";
import { getRecords, IPagination } from "@/api/record";
import ResourceList from "../resource/ResourceList.vue";
import { formatResourceData } from "@/utils/storeUtil";
import { useProjectState } from "@/stores/projectState";

const MenuList = [
  {
    key: "text",
    label: "文本作品",
  },
  {
    key: "image",
    label: "图片作品",
  },
  {
    key: "audio",
    label: "音频作品",
  },
  {
    key: "speech",
    label: "旁白作品",
  },
  {
    key: "video",
    label: "视频作品",
  },
];

const projectState = useProjectState();
const pagination = reactive<IPagination>({
  page: 1,
  pageSize: 20,
  sort: "desc",
  sortBy: "created_at",
  type: "text",
});
const total = ref(0);

const list = ref<Resource[]>([]);

const loadMore = async (page: number) => {
  pagination.page = page;
  const res = await getRecords({ ...pagination });
  list.value = res.records.map((item) => formatResourceData(item));
  total.value = res.total;
};

watch(
  () => [pagination.type, projectState.refreshFlag2],
  () => {
    loadMore(1);
  }
);

watch(
  () => [pagination.page, pagination.pageSize],
  () => {
    loadMore(pagination.page);
  }
);

onMounted(() => {
  loadMore(1);
});
</script>

<style scoped lang="less">
.menu {
  border-radius: 8px;
  opacity: 0.6;
  color: white;
  background: #414141;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);

  &.active {
    @apply dark:bg-[#1473e6] bg-[#0559ff];
  }
}
</style>
