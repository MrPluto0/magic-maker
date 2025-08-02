import { ref } from "vue";
import { defineStore } from "pinia";

export const usePageState = defineStore(
  "pageState",
  () => {
    const pageTitle = ref("祖母镜");
    // 暗色模式
    const isDark = ref(true);
    const isLoading = ref(true);
    // 属性宽度
    const attrWidth = ref(parseInt("320"));
    // 轨道高度
    const trackHeight = ref(parseInt("380"));
    // const drawStore = useDrawStore();

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
    };
  },
  {
    persist: true,
  }
);
