<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <ElConfigProvider :z-index="3000">
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
import { useProjectState } from "./stores/project";

const project = useProjectState();

onMounted(() => {
	if (!Combinator.isSupported()) {
		ElMessageBox.alert(
			"💔 当前浏览器不支持 WebCodecs，请使用 Chrome、Edge（并升级到新版本）体验 ❤️‍🩹",
		);
	}
	project.init();
});
</script>
