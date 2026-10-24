<template>
  <div class="mm-grid">
    <template v-for="(pro, i) in projectList" :key="pro.id">
      <article class="card" :style="placementStyle(i)">
        <div class="thumb">
          <span class="badge">Draft</span>
          <div class="still" :class="`still-s${(i % 6) + 1}`"></div>

          <div class="card-info">
            <div class="t min-w-0 flex-1">
              <h3 class="truncate">{{ pro.name }}</h3>
              <p class="line-clamp-1">
                {{ pro.description || "—" }}
              </p>
            </div>
            <span class="when mono whitespace-nowrap">{{
              formatWhen(pro.updatedAt)
            }}</span>
            <div class="card-ops flex gap-0.5">
              <button title="进入编辑" @click.stop="checkProject(pro)">进入 →</button>
              <button title="导出项目 JSON" @click.stop="projectStore.exportProject(pro)">
                导出
              </button>
              <button title="重命名" @click.stop="editProject(pro)">重命名</button>
              <button class="danger" @click.stop="delProject(pro.id)">删除</button>
            </div>
          </div>
        </div>
      </article>

      <!-- 新建 CTA 瓦片：插在第 2 张卡片之后（与设计稿网格位一致） -->
      <button
        v-if="i === 1"
        class="newcard col-start-8 col-end-13 row-start-3 row-end-6"
        @click="$emit('create')"
      >
        <span class="plus">+</span>
        <span class="t text-sm font-semibold">新建项目</span>
        <span class="label-micro">或导入 JSON</span>
      </button>
    </template>

    <!-- 项目不足 2 个时，新建瓦片补位到网格起点 -->
    <button
      v-if="projectList.length < 2"
      class="newcard"
      :class="
        projectList.length === 0
          ? 'col-start-1 col-end-8 row-start-1 row-end-6'
          : 'col-start-8 col-end-13 row-start-3 row-end-6'
      "
      @click="$emit('create')"
    >
      <span class="plus">+</span>
      <span class="t text-sm font-semibold">新建项目</span>
      <span class="label-micro">或导入 JSON</span>
    </button>

    <UpdateProject v-model:show="showUpdate" :project="project" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useProjectState } from "@/stores/project";
import type { IProject } from "@/types/project";
import UpdateProject from "./UpdateProject.vue";

defineEmits(["create"]);

const router = useRouter();
const projectStore = useProjectState();

const project = ref<IProject>();
const showUpdate = ref(false);

const projectList = computed(() => projectStore.projectList);

// 显式编辑排版网格（design notes：不用 auto-flow）。
// 前 6 个槽位与设计稿逐线对齐；更多项目按 3 列带状延续（行位置内联计算）。
const placements = [
	"1 / 8 / 1 / 6", // c1 主卡
	"8 / 13 / 1 / 3", // c2
	"1 / 5 / 6 / 10", // c3
	"5 / 9 / 6 / 10", // c4
	"9 / 13 / 6 / 10", // c5
	"1 / 13 / 10 / 13", // c6 宽幅
];

const placementStyle = (index: number) => {
	let lines: string;
	if (index < placements.length) {
		lines = placements[index];
	} else {
		const band = Math.floor((index - placements.length) / 3);
		const col = (index - placements.length) % 3;
		const rowStart = 13 + band * 4;
		lines = `${1 + col * 4} / ${5 + col * 4} / ${rowStart} / ${rowStart + 4}`;
	}
	const [cs, ce, rs, re] = lines.split(" / ").map(Number);
	return { gridColumn: `${cs} / ${ce}`, gridRow: `${rs} / ${re}` };
};

const formatWhen = (t: string | number) => {
	const d = new Date(t);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getMonth() + 1}-${pad(d.getDate())}`;
};

const checkProject = (targetProject) => {
	if (targetProject) {
		projectStore.loadProject(targetProject);
		router.push("/editor");
	}
};

const editProject = (pro: IProject) => {
	project.value = pro;
	showUpdate.value = true;
};

const delProject = (id: string) => {
	ElMessageBox.confirm("确定删除项目？", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	}).then(() => {
		projectStore.deleteProject(id);
	});
};
</script>

<style lang="less" scoped>
/* 12 列编辑排版网格：96px 行高、24px 间距（设计稿 .grid） */
.mm-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 96px;
  gap: 24px;
}

.card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #030303;
  border: 1px solid #27272a;
  display: flex;
  flex-direction: column;
}

.thumb {
  position: relative;
  flex: 1;
  overflow: hidden;
}

/* filmic still：horizon 构图 + 颗粒 + 暗角（设计稿 .still-*） */
.still {
  position: absolute;
  inset: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.5;
    background:
      repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.028) 0 1px, transparent 1px 3px),
      repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 4px);
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    background:
      radial-gradient(120% 90% at 50% 40%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 18%);
  }
}

.still-s1 {
  background:
    radial-gradient(55% 40% at 74% 22%, rgba(215, 228, 245, 0.85), rgba(0, 0, 0, 0) 62%),
    radial-gradient(90% 50% at 20% 30%, rgba(90, 115, 150, 0.5), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #232e40 0%, #3d5170 36%, #141c29 37%, #070a11 78%, #020306 100%);
}

.still-s2 {
  background:
    radial-gradient(50% 35% at 32% 28%, rgba(235, 205, 220, 0.7), rgba(0, 0, 0, 0) 60%),
    radial-gradient(70% 45% at 75% 55%, rgba(120, 70, 110, 0.45), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #1c1420 0%, #332038 42%, #120b16 43%, #050308 100%);
}

.still-s3 {
  background:
    radial-gradient(55% 35% at 62% 20%, rgba(190, 235, 215, 0.65), rgba(0, 0, 0, 0) 60%),
    radial-gradient(80% 45% at 25% 45%, rgba(60, 110, 90, 0.5), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #0d1a14 0%, #1c352a 40%, #0a130e 41%, #030605 100%);
}

.still-s4 {
  background:
    radial-gradient(50% 32% at 76% 26%, rgba(240, 220, 160, 0.75), rgba(0, 0, 0, 0) 60%),
    radial-gradient(75% 40% at 30% 55%, rgba(120, 100, 45, 0.45), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #17130a 0%, #2c2513 45%, #100d06 46%, #050403 100%);
}

.still-s5 {
  background:
    radial-gradient(50% 35% at 24% 24%, rgba(205, 215, 240, 0.7), rgba(0, 0, 0, 0) 60%),
    radial-gradient(80% 45% at 70% 50%, rgba(75, 90, 130, 0.5), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #141824 0%, #28304a 38%, #10131e 39%, #04050a 100%);
}

.still-s6 {
  background:
    radial-gradient(55% 32% at 55% 30%, rgba(245, 190, 170, 0.7), rgba(0, 0, 0, 0) 60%),
    radial-gradient(80% 45% at 22% 55%, rgba(130, 55, 45, 0.5), rgba(0, 0, 0, 0) 65%),
    linear-gradient(180deg, #170d0b 0%, #331a15 44%, #140806 45%, #040202 100%);
}

.thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 45%, rgba(3, 3, 3, 0.92) 100%);
}

.badge {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  font-size: 11px;
  font-weight: 450;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  color: #a7a7a7;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid #27272a;
  padding: 4px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.card-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 18px 20px;
  display: flex;
  align-items: flex-end;
  gap: 16px;

  h3 {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -0.3px;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 13px;
    line-height: 1.3;
    color: #767d88;
    margin-top: 6px;
    letter-spacing: -0.16px;
  }
}

.when {
  font-size: 11px;
  color: #a7a7a7;
}

.card-ops {
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.18s;

  button {
    font-size: 13px;
    font-weight: 600;
    color: #767d88;
    padding: 7px 12px;
    border-radius: 4px;

    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
    }

    &.danger:hover {
      color: #e5484d;
    }
  }
}

.card:hover .card-ops {
  opacity: 1;
  transform: none;
}

/* 新建项目：虚线编辑瓦片 */
.newcard {
  border: 1px dashed #34343a;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #767d88;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: #767d88;
    color: #fff;
  }

  .plus {
    width: 44px;
    height: 44px;
    border: 1px solid #34343a;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 22px;
    font-weight: 300;
    line-height: 1;
  }
}

/* 空状态 */
.mm-grid:has(> .newcard:only-child) {
  min-height: 320px;
}
</style>
