import { ref } from "vue";
import { defineStore } from "pinia";

export const usePageState = defineStore(
  "page",
  () => {
    const pageTitle = ref("Magic Maker");
    // 暗色模式
    const isDark = ref(true);
    const isLoading = ref(true);
    // 属性宽度
    const attrWidth = ref(320);
    // 轨道高度
    const trackHeight = ref(380);
    // 素材区宽度
    const resourceWidth = ref(370);

    watch(isDark, () => {
      document.documentElement.classList[isDark.value ? "add" : "remove"](
        "dark"
      );
    });

    return {
      isLoading,
      pageTitle,
      isDark,
      attrWidth,
      trackHeight,
      resourceWidth,
    };
  },
  {
    persist: true,
  }
);
