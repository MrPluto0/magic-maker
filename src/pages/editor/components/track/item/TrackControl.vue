<template>
  <!-- 时间轴工具条（设计稿 .tl-tools：44px、工具钮 + kbd、右侧缩放） -->
  <div
    class="tl-tools h-11 shrink-0 flex items-center gap-1.5 px-3.5 border-b border-[#e9ecf2] dark:border-[#27272a]"
  >
    <button
      v-for="item of controls"
      :key="item.title"
      class="tool flex items-center gap-[7px] text-xs font-semibold text-[#c9ccd1] px-2.5 py-1.5 rounded border border-transparent hover:bg-white/6"
      :title="item.title"
      :style="{
        cursor: item.disable ? 'not-allowed' : 'pointer',
        opacity: item.disable ? 0.4 : 1,
      }"
      @click="item.handler"
    >
      <i :class="item.icon" class="text-sm"></i>
      <span>{{ item.label }}</span>
      <kbd
        v-if="item.kbd"
        class="mono text-[10px] text-[#a7a7a7] border border-[#2e2e33] rounded-[3px] px-1.5 py-px"
      >{{ item.kbd }}</kbd>
    </button>

    <div class="flex-1"></div>

    <!-- 时间轴缩放（zoomer） -->
    <div class="zoomer flex items-center gap-2.5">
      <span class="label-micro !text-[10px]">时间轴缩放</span>
      <i
        class="i-mdi-minus-circle cursor-pointer text-[#767d88] hover:text-white text-sm"
        @click="changeScale(-10)"
      />
      <el-slider v-model="modelValue" v-bind="sliderProps" class="!w-[110px]" />
      <i
        class="i-mdi-plus-circle cursor-pointer text-[#767d88] hover:text-white text-sm"
        @click="changeScale(10)"
      />
      <span class="mono text-[11px] text-[#c9ccd1] w-[38px]">{{ modelValue }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useTrackState } from "@/stores/track";

const props = defineProps({
	modelValue: {
		type: Number,
		default: 30,
	},
});
const emit = defineEmits({
	"update:modelValue": (val) => {
		return val !== null;
	},
});
const modelValue = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});
const trackStore = useTrackState();

const sliderProps = reactive({
	showTooltip: false,
	size: "small" as const,
	step: 10,
	max: 100,
	min: 0,
});

function changeScale(val: number) {
	let newVal = modelValue.value + val;
	if (newVal > sliderProps.max) newVal = sliderProps.max;
	if (newVal < sliderProps.min) newVal = sliderProps.min;
	modelValue.value = newVal;
}

const controls = computed(() => [
	{
		title: "撤销[Ctrl+Z]",
		label: "撤销",
		kbd: "⌘Z",
		// disable: stateLength.value === 0 || statePoint.value === 0,
		icon: "i-mdi-undo",
		handler: trackStore._undo,
	},
	{
		title: "恢复[Ctrl+Shift+Z]",
		label: "恢复",
		kbd: "⇧⌘Z",
		// disable: statePoint.value === stateLength.value,
		icon: "i-mdi-redo",
		handler: trackStore._redo,
	},
	{
		title: "左链接[L]",
		label: "左链接",
		kbd: "L",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-link-variant",
		handler: trackStore.leftLink,
	},
	{
		title: "分割[S]",
		label: "分割",
		kbd: "S",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-content-cut",
		handler: trackStore.splitTrack,
	},
	{
		title: "删除[Backspace]",
		label: "删除",
		kbd: "⌫",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-delete-outline",
		handler: trackStore.removeTrack,
	},
	{
		title: "文字[T]",
		label: "文字",
		kbd: "T",
		disable: false,
		icon: "i-mdi-format-text",
		handler: trackStore.addText,
	},
]);
</script>

<style lang="less" scoped>
.tool {
  color: #c9ccd1;

  kbd {
    border-color: #2e2e33;
    color: #a7a7a7;
  }

  html:not(.dark) & {
    color: #3f3f3f;

    kbd {
      border-color: #d5d9df;
      color: #6b7280;
    }
  }
}

.tool:hover {
  html:not(.dark) & {
    color: #171717;
    background: #e9ecf2;
  }
}

.zoomer {
  html:not(.dark) & {
    .mono {
      color: #3f3f3f;
    }
  }
}
</style>
