<template>
  <nav
    class="mm-nav fixed top-0 left-0 right-0 z-50 flex items-center gap-10 px-12 h-[72px]"
  >
    <div
      class="mm-wordmark flex items-center gap-2.5 text-[15px] font-semibold cursor-pointer text-white"
      style="letter-spacing: 0.4px"
      @click="router.push('/home')"
    >
      <span class="w-2 h-2 bg-white"></span>
      MAGIC MAKER
    </div>

    <div class="flex gap-7 ml-2">
      <a
        v-for="item in menu"
        :key="item.to"
        class="text-sm cursor-pointer transition-colors"
        :class="
          route.path.includes(item.to)
            ? 'text-white'
            : 'text-[#767d88] hover:text-white'
        "
        @click="router.push(item.to)"
      >
        {{ item.name }}
      </a>
    </div>

    <div class="flex-1"></div>

    <button class="btn-ghost" @click="$emit('import')">导入项目 JSON</button>
    <button class="btn-ghost theme-toggle" title="切换主题" @click="toggleTheme">
      <span class="theme-dot" :class="{ light: !pageStore.isDark }"></span>主题
    </button>
    <button class="btn-solid" @click="$emit('create')">新建项目</button>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { usePageState } from "@/stores/page";

defineEmits(["create", "import"]);

const pageStore = usePageState();
const router = useRouter();
const route = useRoute();

const menu = [
	{ name: "首页", to: "/home" },
	{ name: "视频剪辑", to: "/editor" },
];

const toggleTheme = () => {
	pageStore.isDark = !pageStore.isDark;
};
</script>

<style lang="less" scoped>
/* 顶部导航：黑场渐隐渐变——首页 hero 任何主题下恒暗，导航文字恒为浅色 */
.mm-nav {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
}

.btn-ghost {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.16px;
  padding: 9px 18px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #767d88;
  transition: color 0.15s;

  &:hover {
    color: #fff;
  }
}

.btn-solid {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.16px;
  color: #000;
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;

  &:hover {
    background: #d0d4d4;
  }
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  border-color: #27272a;

  &:hover {
    color: #fff;
  }
}

/* 主题圆点：左半填充=暗色，全填充=浅色 */
.theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #767d88;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0 50% 0 0;
    background: #767d88;
  }

  &.light::after {
    inset: 0;
    background: #d5d9df;
  }
}
</style>
