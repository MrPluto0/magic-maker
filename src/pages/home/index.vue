<template>
  <div class="flex-1 w-full flex flex-col overflow-auto">
    <HomeNav @create="showCreate = true" @import="projectStore.importProject" />

    <!-- HERO：全宽电影级开场，任何主题下恒暗（预期设计） -->
    <header class="hero theme-dark relative flex flex-col justify-end overflow-hidden shrink-0">
      <div class="hero-media absolute inset-0"></div>

      <div class="hero-inner relative z-[2] px-12 pb-[72px] w-full max-w-[1600px]">
        <div class="hero-kicker flex items-center gap-4 mb-7">
          <span class="w-14 h-px bg-[#767d88]"></span>
          <span class="label-micro !text-[14px] !font-medium">Local-first video studio</span>
        </div>

        <h1
          class="text-white font-normal"
          style="font-size: 96px; line-height: 1; letter-spacing: -3.2px; max-width: 13em"
        >
          素材进，<br />电影出。
          <em
            class="block not-italic text-[#767d88]"
            style="font-size: 52px; letter-spacing: -1px; margin-top: 26px; line-height: 1.15"
          >一切发生在你的机器上。</em>
        </h1>

        <p
          class="mt-7 max-w-[520px] text-base text-[#767d88]"
          style="line-height: 1.4; letter-spacing: -0.16px"
        >
          Magic Maker 是一个完全运行在本地的视频剪辑器——AI
          生成、时间轴编排、画布合成与成片导出，不经过任何云端。
        </p>

        <div class="hero-cta flex gap-3 mt-9 items-center">
          <button class="btn-solid" @click="showCreate = true">新建项目</button>
          <button class="btn-line" @click="projectStore.importProject">
            导入项目 JSON ↓
          </button>
        </div>
      </div>

      <div
        class="hero-meta absolute right-12 bottom-[72px] z-[2] text-right flex flex-col gap-1.5"
      >
        <span class="label-micro">Build</span>
        <span class="mono text-[13px] text-[#a7a7a7]">v0.9.0 — local</span>
        <span class="label-micro mt-2.5">Render engine</span>
        <span class="mono text-[13px] text-[#a7a7a7]">WebAV / Canvas</span>
      </div>
    </header>

    <!-- INTRO STRIP -->
    <section class="intro-sec theme-dark">
      <div class="intro max-w-[1600px] mx-auto grid px-12 pt-[104px] pb-24 gap-16">
        <div>
          <span class="label-micro !text-[14px] !font-medium">Why Magic Maker</span>
          <h2
            class="mt-5 text-white font-normal"
            style="font-size: 40px; line-height: 1.1; letter-spacing: -1px"
          >
            专业时间轴，<br />电影级暗色工作台。
          </h2>
        </div>
        <div class="flex flex-col gap-5">
          <p class="text-base text-[#767d88] max-w-[56ch]" style="line-height: 1.45">
            多轨时间轴支持视频、图片、音频与文字轨道；拖拽吸附、逐帧分割、快捷键直达。左侧
            AI 面板直接生成文本、图片、音频与视频素材，生成即可拖入轨道。右侧属性面板随轨道类型切换——位置、缩放、音量、文字样式，全部实时可见。
          </p>
          <div
            class="spec-row grid grid-cols-3 gap-px rounded-lg overflow-hidden border border-[#27272a]"
          >
            <div class="spec-cell flex flex-col gap-2 p-6 px-5">
              <span class="label-micro">Tracks</span>
              <span class="text-white font-normal" style="font-size: 24px; letter-spacing: -0.6px">
                4 <small class="mono text-[13px] text-[#a7a7a7]">types</small>
              </span>
            </div>
            <div class="spec-cell flex flex-col gap-2 p-6 px-5">
              <span class="label-micro">AI generators</span>
              <span class="text-white font-normal" style="font-size: 24px; letter-spacing: -0.6px">
                5 <small class="mono text-[13px] text-[#a7a7a7]">tabs</small>
              </span>
            </div>
            <div class="spec-cell flex flex-col gap-2 p-6 px-5">
              <span class="label-micro">Cloud calls</span>
              <span class="text-white font-normal" style="font-size: 24px; letter-spacing: -0.6px">
                0 <small class="mono text-[13px] text-[#a7a7a7]">for editing</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS -->
    <section class="projects-sec theme-dark">
      <div class="max-w-[1600px] mx-auto px-12 pb-[120px]">
        <div
          class="proj-head flex items-baseline justify-between border-t border-[#27272a] pt-7 mb-10"
        >
          <div>
            <span class="label-micro !text-[14px] !font-medium">
              Projects — {{ projectStore.projectList.length }} 个项目
            </span>
            <h2
              class="mt-4 text-white font-normal"
              style="font-size: 48px; line-height: 1; letter-spacing: -1.2px"
            >
              最近项目
            </h2>
          </div>
          <div class="flex gap-2.5 items-center">
            <button class="btn-ghost" @click="projectStore.importProject">
              导入项目 JSON
            </button>
            <button class="btn-solid" @click="showCreate = true">新建项目</button>
          </div>
        </div>

        <ProjectList @create="showCreate = true" />
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="theme-dark bg-black">
      <div
        class="max-w-[1600px] mx-auto border-t border-[#27272a] px-12 pt-14 pb-16 flex items-start justify-between gap-10"
      >
        <div>
          <span class="label-micro !text-[14px] !font-medium">Magic Maker</span>
          <p
            class="mt-[18px] text-[#c9ccd1] font-normal max-w-[26em]"
            style="font-size: 24px; line-height: 1.2; letter-spacing: -0.5px"
          >
            剪辑不该等待上传。我们相信创作工具的隐私与速度，应当同时属于创作者。
          </p>
          <p class="mono mt-6 text-[11px] text-[#a7a7a7]">
            © 2026 MAGIC MAKER — LOCAL FIRST
          </p>
        </div>

        <div class="flex gap-16">
          <div class="flex flex-col gap-3">
            <span class="label-micro">项目</span>
            <a class="foot-link" @click="showCreate = true">新建项目</a>
            <a class="foot-link" @click="projectStore.importProject">导入 JSON</a>
            <a class="foot-link" @click="scrollToProjects">最近项目</a>
          </div>
          <div class="flex flex-col gap-3">
            <span class="label-micro">资源</span>
            <a class="foot-link" href="https://github.com/MrPluto0/magic-maker" target="_blank">
              GitHub ↗
            </a>
            <a class="foot-link" @click="openPage">个人主页 ↗</a>
          </div>
        </div>
      </div>
    </footer>

    <NewProject v-model:show="showCreate" />
  </div>
</template>

<script lang="ts" setup>
import HomeNav from "@/components/layout/HomeNav.vue";
import { useProjectState } from "@/stores/project";
import NewProject from "./components/NewProject.vue";
import ProjectList from "./components/ProjectList.vue";

const projectStore = useProjectState();
const showCreate = ref(false);

const openPage = () => {
	window.open("https://www.gypsophlia.top/");
};

const scrollToProjects = () => {
	document
		.querySelector(".projects-sec")
		?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style lang="less" scoped>
/* HERO 底图：电影级 still——三组 radial 光源 + 冷色线性渐变 */
.hero {
  height: 92vh;
  min-height: 640px;

  .hero-media {
    background:
      radial-gradient(120% 90% at 78% 12%, rgba(96, 116, 148, 0.55) 0%, rgba(0, 0, 0, 0) 52%),
      radial-gradient(70% 60% at 18% 88%, rgba(148, 120, 90, 0.28) 0%, rgba(0, 0, 0, 0) 60%),
      radial-gradient(90% 70% at 50% 55%, rgba(30, 34, 42, 0.9) 0%, rgba(0, 0, 0, 0) 70%),
      linear-gradient(180deg, #0a0c10 0%, #14171d 46%, #030303 100%);

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.55) 0%,
        rgba(0, 0, 0, 0) 30%,
        rgba(0, 0, 0, 0) 55%,
        #000 100%
      );
    }
  }
}

.hero-inner {
  padding-top: 0;
}

/* INTRO / PROJECTS / FOOTER：纯黑面 */
.intro-sec,
.projects-sec {
  background: #000;
}

.spec-cell {
  background: #000;
}

.spec-row {
  border-color: #27272a;
}

/* CTA 按钮（hero 恒暗区域内固定浅色方案） */
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

.btn-line {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.16px;
  color: #fff;
  padding: 9px 18px;
  border-radius: 4px;
  border: 1px solid #27272a;

  &:hover {
    border-color: #767d88;
  }
}

.btn-ghost {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.16px;
  color: #767d88;
  padding: 9px 18px;
  border-radius: 4px;
  border: 1px solid transparent;

  &:hover {
    color: #fff;
  }
}

.foot-link {
  font-size: 13px;
  color: #767d88;
  letter-spacing: -0.16px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
}

/* 窄屏兜底：主标题缩放，避免溢出 */
@media (max-width: 1280px) {
  .hero h1 {
    font-size: 64px;
    letter-spacing: -2px;

    em {
      font-size: 36px;
    }
  }
}
</style>
