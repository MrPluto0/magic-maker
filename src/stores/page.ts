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

		// 编辑器左栏 tab：对话面板 | 素材（W5 对话面板落左栏）
		const editorLeftTab = ref<"chat" | "asset">("chat");

		// 产物抽屉开合（会话级，不持久化）
		const chatArtifactDrawerOpen = ref(false);

		// AI设置表单：apiKey 仅存内存（会话级），不写入任何持久化存储
		const aiSettings = ref({
			// agent 对话（BYOK）：OpenAI 兼容协议 baseURL；空 = 站内 /api 代理
			baseUrl: "",
			apiKey: "",
			textModel: "doubao-seed-1-6-flash-250715",
			imageModel: "doubao-seedream-3-0-t2i-250415",
		});

		// immediate：持久化恢复的 isDark 必须同步到 <html>（index.html 硬编码 class="dark"，
		// 浅色用户刷新页面时若不立即执行，会一直停在暗色直到手动切换）
		watch(
			isDark,
			() => {
				document.documentElement.classList[isDark.value ? "add" : "remove"](
					"dark",
				);
			},
			{ immediate: true },
		);

		return {
			pageTitle,
			isDark,
			attrWidth,
			trackHeight,
			resourceWidth,
			trackScale,
			editorLeftTab,
			chatArtifactDrawerOpen,
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
				"editorLeftTab",
			],
		},
	},
);
