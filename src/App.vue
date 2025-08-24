<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <ElConfigProvider size="small" :z-index="3000">
      <HeaderContainer />

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </ElConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { Combinator } from "@webav/av-cliper";
import { useProjectState } from "./stores/projectState";
import { useTrainState } from "./stores/trainState";
import HeaderContainer from "./components/layout/HeaderContainer.vue";

const projectStore = useProjectState();
const trainStore = useTrainState();

onMounted(() => {
  if (!Combinator.isSupported()) {
    ElMessageBox.alert(
      "💔 当前浏览器不支持 WebCodecs，请使用 Chrome、Edge（并升级到新版本）体验 ❤️‍🩹"
    );
  }
  projectStore.init();
  trainStore.init();
});
</script>
