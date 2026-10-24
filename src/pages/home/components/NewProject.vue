<template>
  <el-dialog
    :model-value="show"
    width="520"
    align-center
    :close-on-click-modal="false"
    :before-close="handleClose"
    class="mm-dialog"
  >
    <template #header>
      <div class="dlg-head-inner">
        <span class="label-micro block mb-3">项目</span>
        <div class="text-[#171717] dark:text-white font-normal" style="font-size: 24px; line-height: 1; letter-spacing: -0.5px">
          新建项目
        </div>
      </div>
    </template>

    <!-- 模式切换：手动创建 / 导入 JSON -->
    <div class="mode flex gap-0.5 mb-5 w-max">
      <button :class="{ on: mode === 'create' }" @click="mode = 'create'">
        手动创建
      </button>
      <button :class="{ on: mode === 'import' }" @click="mode = 'import'">
        导入 JSON
      </button>
    </div>

    <template v-if="mode === 'create'">
      <el-form :model="form" label-position="top">
        <el-form-item label="项目名称">
          <el-input
            v-model="form.name"
            placeholder="例如：城市夜行记"
            maxlength="50"
            @keyup.enter="handleCreate"
          />
        </el-form-item>
        <el-form-item>
          <template #label>
            项目描述
            <span class="mono text-[10px] text-[#a7a7a7] ml-1">— 可选</span>
          </template>
          <el-input
            type="textarea"
            :rows="3"
            v-model="form.description"
            placeholder="一句话记录这支片子的方向…"
            maxlength="200"
          />
        </el-form-item>
      </el-form>
      <div class="mono text-[10px] text-[#a7a7a7]">
        项目将以 JSON 保存在本机 — 不经过任何云端。
      </div>
    </template>

    <template v-else>
      <div
        class="drop border border-dashed rounded-md py-[26px] px-4 text-center"
        @click="handleImport"
      >
        <div class="text-lg font-light leading-none">↓</div>
        <div class="text-[13px] font-semibold text-[#3f3f3f] dark:text-[#c9ccd1] mt-2">选择项目 JSON 文件</div>
        <div class="text-[11px] text-[#767d88] mt-1.5">导入后自动进入编辑器</div>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center gap-2.5">
        <span class="mono text-[10px] text-[#a7a7a7]">ESC 关闭</span>
        <div class="flex-1"></div>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="mode === 'create' ? handleCreate() : handleImport()">
          {{ mode === "create" ? "创建项目 ⏎" : "导入" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useProjectState } from "@/stores/project";

const props = defineProps<{
	show: boolean;
}>();
const emits = defineEmits(["update:show"]);

const projectStore = useProjectState();

const mode = ref<"create" | "import">("create");
const form = reactive({
	name: "",
	description: "",
});

watch(
	() => props.show,
	(v) => {
		if (v) {
			mode.value = "create";
		}
	},
);

const handleClose = () => {
	emits("update:show", false);
};

const handleCreate = () => {
	if (!form.name) {
		ElMessage.error("请输入项目名称");
		return;
	}

	projectStore.createProject({
		name: form.name,
		description: form.description || "",
	});

	emits("update:show", false);
	ElMessage.success("创建成功");
};

const handleImport = () => {
	projectStore.importProject();
	emits("update:show", false);
};
</script>

<style lang="less" scoped>
/* 模式分段控件（设计稿 .mode） */
.mode {
  border: 1px solid #2e2e33;
  border-radius: 4px;
  overflow: hidden;

  button {
    font-size: 12px;
    font-weight: 600;
    color: #767d88;
    padding: 7px 14px;
    letter-spacing: -0.1px;
  }

  button.on {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  html:not(.dark) & button.on {
    background: #171717;
    color: #fff;
  }
}

/* 导入拖放块（设计稿 .drop） */
.drop {
  border-color: #2e2e33;
  color: #767d88;
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: #767d88;
  }
}
</style>
