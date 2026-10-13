import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePageState = defineStore(
	"page",
	() => {
		const pageTitle = ref("Magic Maker");
		const isDark = ref(true); // 暗色模式
		const attrWidth = ref(320); // 属性区宽度
		const trackHeight = ref(380); // 素材轨道高度
		const resourceWidth = ref(370); // 素材区宽度

		// 轨道缩放比例（原裸 localStorage.trackS 收敛到此）
		const trackScale = ref(60);

		// AI设置表单：apiKey 仅存内存（会话级），不写入任何持久化存储
		const aiSettings = ref({
			apiKey: "",
			textModel: "doubao-seed-1-6-flash-250715",
			imageModel: "doubao-seedream-3-0-t2i-250415",
		});

		watch(isDark, () => {
			document.documentElement.classList[isDark.value ? "add" : "remove"](
				"dark",
			);
		});

		return {
			pageTitle,
			isDark,
			attrWidth,
			trackHeight,
			resourceWidth,
			trackScale,
			aiSettings,
		};
	},
	{
		// 安全：aiSettings（含 apiKey）不参与持久化，仅当前会话有效
		persist: {
			pick: [
				"pageTitle",
				"isDark",
				"attrWidth",
				"trackHeight",
				"resourceWidth",
				"trackScale",
			],
		},
	},
);
