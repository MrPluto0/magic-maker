<template>
  <div class="mm-grid mm-projlist">
    <!-- 高密度列表行：项目名 + 描述截断 + 更新时间 + hover 操作 -->
    <template v-for="pro in projectList" :key="pro.id">
      <div class="row group" @click="checkProject(pro)">
        <span class="still-dot" :class="`still-s${(hash(pro.id) % 6) + 1}`"></span>

        <span class="name truncate">{{ pro.name }}</span>
        <span class="desc truncate">{{ pro.description || "—" }}</span>
        <span class="when mono whitespace-nowrap">{{ formatWhen(pro.updatedAt) }}</span>

        <div class="ops flex gap-0.5">
          <button title="进入编辑" @click.stop="checkProject(pro)">进入 →</button>
          <button title="导出项目 JSON" @click.stop="projectStore.exportProject(pro)">
            导出
          </button>
          <button title="重命名" @click.stop="editProject(pro)">重命名</button>
          <button class="danger" @click.stop="delProject(pro.id)">删除</button>
        </div>
      </div>
    </template>

    <!-- 新建 CTA：紧凑行 -->
    <button class="row newrow" @click="$emit('create')">
      <span class="plus">+</span>
      <span class="name font-semibold">新建项目</span>
      <span class="desc">或导入 JSON</span>
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

const hash = (s: string) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

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
/* 高密度紧凑列表（Linear/Notion 式）：行高 52px */
.mm-projlist {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #27272a;
}

.row {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 14px;
  border-bottom: 1px solid #1c1c20;
  cursor: pointer;
  transition: background 0.12s;

  &:hover {
    background: rgba(255, 255, 255, 0.035);
  }
}

/* 缩略色点：保留 filmic still 配色的微缩版 */
.still-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  flex-shrink: 0;
}

.still-s1 { background: #5a7396; }
.still-s2 { background: #78466e; }
.still-s3 { background: #3c6e5a; }
.still-s4 { background: #78642d; }
.still-s5 { background: #4b5a82; }
.still-s6 { background: #823730; }

.name {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  letter-spacing: -0.16px;
  flex-shrink: 0;
  max-width: 260px;
}

.desc {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: #767d88;
  letter-spacing: -0.14px;
}

.when {
  font-size: 11px;
  color: #a7a7a7;
  flex-shrink: 0;
}

.ops {
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;

  button {
    font-size: 12px;
    font-weight: 500;
    color: #767d88;
    padding: 4px 8px;
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

.row:hover .ops {
  opacity: 1;
}

/* 新建 CTA 行 */
.newrow {
  color: #767d88;
  gap: 10px;

  &:hover {
    color: #fff;
    border-bottom-color: #27272a;
  }

  .plus {
    width: 20px;
    height: 20px;
    border: 1px solid #34343a;
    border-radius: 4px;
    display: grid;
    place-items: center;
    font-size: 14px;
    font-weight: 300;
    line-height: 1;
  }

  .name {
    color: inherit;
  }

  .desc {
    flex: 0 0 auto;
  }
}
</style>
