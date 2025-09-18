<template>
  <div
    class="px-4 py-2 w-full dark:border-night-lighter flex justify-between text-[18px]"
  >
    <div class="flex flex-row gap-3 flex-nowrap items-center justify-around">
      <el-tooltip
        v-for="item of controls"
        :key="item.title"
        effect="light"
        :content="item.title"
      >
        <i
          :style="{
            cursor: item.disable ? 'not-allowed' : 'pointer',
            color: item.disable ? '#9ca3af' : 'inherit',
          }"
          :class="item.icon"
          @click="item.handler"
        />
      </el-tooltip>
    </div>
    <div class="flex w-60 justify-center items-center gap-4">
      <i class="i-mdi-minus-circle cursor-pointer" @click="changeScale(-10)" />
      <el-slider v-model="modelValue" v-bind="sliderProps" />
      <i class="i-mdi-plus-circle cursor-pointer" @click="changeScale(10)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import { reactive, computed } from "vue";

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
		// disable: stateLength.value === 0 || statePoint.value === 0,
		icon: "i-mdi-undo",
		handler: trackStore._undo,
	},
	{
		title: "恢复[Ctrl+Shift+Z]",
		// disable: statePoint.value === stateLength.value,
		icon: "i-mdi-redo",
		handler: trackStore._redo,
	},
	{
		title: "左链接[L]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-link-variant",
		handler: trackStore.leftLink,
	},
	{
		title: "分割[S]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-content-cut",
		handler: trackStore.splitTrack,
	},
	{
		title: "删除[Backspace]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "i-mdi-delete",
		handler: trackStore.removeTrack,
	},
	{
		title: "文字[T]",
		disable: false,
		icon: "i-mdi-format-text",
		handler: trackStore.addText,
	},
]);
</script>
