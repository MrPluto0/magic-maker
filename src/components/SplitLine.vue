<template>
  <div
    ref="lineElement"
    class="flex justify-center items-center"
    :class="[
      isVertical ? 'cursor-c-resize' : 'cursor-r-resize',
      isVertical ? 'w-2 h-full flex-col' : 'h-2 w-full flex-row',
    ]"
    @mousedown="mouseDownHandler"
  >
    <span
      class="absolute flex z-10 dark:bg-night-light bg-gray-200"
      :class="
        isVertical
          ? 'h-6 w-4 flex-col  cursor-ew-resize'
          : 'w-8 h-4 flex-row cursor-ns-resize'
      "
    >
      <i
        class="i-mdi-dots-horizontal flex-auto"
        :class="isVertical ? 'rotate-90' : ''"
      ></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// 定义限制尺寸的接口
interface LimitSize {
	minHeight?: number;
	maxHeight?: number;
	minWidth?: number;
	maxWidth?: number;
}

// 使用泛型定义 props
interface Props {
	newWidth?: number;
	reverse?: boolean;
	newHeight?: number;
	direction?: "horizontal" | "vertical";
	limitSize?: LimitSize;
}

const props = withDefaults(defineProps<Props>(), {
	newWidth: 0,
	reverse: false,
	newHeight: 0,
	direction: "horizontal",
	limitSize: (): LimitSize => ({
		minHeight: 0,
		maxHeight: 999999,
		minWidth: 0,
		maxWidth: 999999,
	}),
});

// 定义 emit 事件类型
const emit = defineEmits<{
	"update:newWidth": [value: number];
	"update:newHeight": [value: number];
}>();

const newWidthValue = computed({
	get() {
		return props.newWidth;
	},
	set(newValue) {
		emit("update:newWidth", newValue);
	},
});
const newHeightValue = computed({
	get() {
		return props.newHeight;
	},
	set(newValue) {
		emit("update:newHeight", newValue);
	},
});

const lineElement = ref();
const isVertical = computed(() => props.direction === "vertical");

// 定位数据缓存
const positionState = {
	left: 0,
	top: 0,
};

let enableMove = false;

function mouseDownHandler() {
	const { left, top } = lineElement.value.getBoundingClientRect();
	positionState.left = parseInt(left);
	positionState.top = parseInt(top);
	enableMove = true;

	document.onmousemove = (documentEvent) => {
		if (!enableMove) return;
		const { pageX, pageY } = documentEvent;
		const { top: oldTop, left: oldLeft } = positionState;
		const { minHeight, maxHeight, minWidth, maxWidth } = props.limitSize;
		const offsetX = pageX - oldLeft;
		const offsetY = pageY - oldTop;
		positionState.left = pageX;
		positionState.top = pageY;
		if (isVertical.value) {
			const newWidth = props.reverse
				? newWidthValue.value + offsetX
				: newWidthValue.value - offsetX;
			newWidthValue.value =
				newWidth > maxWidth
					? maxWidth
					: newWidth < minWidth
						? minWidth
						: newWidth;
		} else {
			const newHeight = props.reverse
				? newHeightValue.value + offsetY
				: newHeightValue.value - offsetY;
			newHeightValue.value =
				newHeight > maxHeight
					? maxHeight
					: newHeight < minHeight
						? minHeight
						: newHeight;
		}
	};

	document.onmouseup = () => {
		enableMove = false;
		document.onmouseup = null;
		document.onmousemove = null;
	};
}
</script>
