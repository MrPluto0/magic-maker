<template>
  <div class="px-4 py-2 w-full dark:border-night-lighter">
    <div
      class="float-left h-9 w-32 flex flex-row gap-3 flex-nowrap items-center justify-around"
    >
      <div v-for="item of controls" :key="item.title" @click="item.handler">
        <el-tooltip effect="light" :content="item.title">
          <el-icon
            size="15"
            class="focus:outline-0"
            :class="
              item.disable
                ? 'cursor-not-allowed text-gray-400'
                : 'cursor-pointer'
            "
          >
            <component :is="item.icon" />
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="float-right flex w-52 h-9 justify-center items-center gap-4">
      <SubIcon
        :style="svgStyle"
        class="cursor-pointer"
        @click="changeScale(-10)"
      />
      <el-slider v-model="modelValue" v-bind="sliderProps" />
      <AddIcon
        :style="svgStyle"
        class="cursor-pointer"
        @click="changeScale(10)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import { usePlayerState } from "@/stores/player";
import { ref, reactive, computed } from "vue";

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
const playerStore = usePlayerState();

const svgStyle = ref({
	fontSize: "1.75rem",
	padding: "0.25rem",
	boxSizing: "content-box",
});
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
		icon: "UndoIcon",
		handler: trackStore._undo,
	},
	{
		title: "恢复[Ctrl+Shift+Z]",
		// disable: statePoint.value === stateLength.value,
		icon: "RedoIcon",
		handler: trackStore._redo,
	},
	{
		title: "左链接[L]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "LeftLinkIcon",
		handler: trackStore.leftLink,
	},
	{
		title: "分割[S]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "SplitIcon",
		handler: trackStore.splitTrack,
	},
	{
		title: "删除[Backspace]",
		disable: trackStore.selectTrackItem.index === -1,
		icon: "DeleteIcon",
		handler: trackStore.removeTrack,
	},
	{
		title: "文字[T]",
		disable: false,
		icon: "AddTextIcon",
		handler: trackStore.addText,
	},
]);
</script>
