<template>
	<div
		class="flex flex-col border border-gray-200 dark:border-[#2e2e33] dark:bg-white dark:bg-[#141414] rounded-md overflow-hidden shrink-0"
	>
		<!-- 标题行：工具名 + danger 标签 + 状态 -->
		<div class="flex items-center gap-2 px-3 py-2">
			<span class="font-mono text-[11px] text-gray-900 dark:text-white">{{ entry.tool }}</span>
			<span
				class="text-[9px] tracking-[0.35px] uppercase rounded-sm px-1.5 py-px border"
				:class="dangerClass"
			>
				{{ dangerLabel }}
			</span>
			<span class="ml-auto font-mono text-[9.5px] text-gray-500 dark:text-[#767d88] flex items-center gap-1.5">
				<template v-if="entry.status === 'running'">
					<span class="inline-block w-2 h-2 rounded-full border border-gray-200 dark:border-[#2e2e33] border-t-white animate-spin" />
					执行中
				</template>
				<template v-else>{{ statusLabel }}</template>
			</span>
		</div>

		<!-- 参数摘要（mono 小字） -->
		<div class="px-3 pb-2 font-mono text-[10.5px] leading-relaxed text-gray-500 dark:text-[#767d88] whitespace-pre-wrap break-all">
			{{ paramsText }}
		</div>

		<!-- 影响范围 chips -->
		<div
			v-if="entry.affected || entry.resultSummary"
			class="border-t border-[#27272a] px-3 py-1.5 flex items-center gap-2"
		>
			<span class="text-[11px] text-gray-500 dark:text-[#767d88]">
				<template v-if="entry.resultSummary">{{ entry.resultSummary }}</template>
				<template v-else-if="entry.affected">{{ entry.affected.summary }}</template>
			</span>
			<span class="ml-auto"></span>
			<span
				v-if="entry.status === 'done'"
				class="font-mono text-[9.5px] text-gray-500 dark:text-[#767d88] border border-gray-200 dark:border-[#2e2e33] rounded-sm px-1.5 py-px"
			>
				{{ danger !== "query" ? "可撤销" : "只读" }}
			</span>
			<span
				class="cursor-pointer font-mono text-[9.5px] text-gray-500 dark:text-[#767d88] border border-gray-200 dark:border-[#2e2e33] rounded-sm px-1.5 py-px hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-[#767d88]"
				title="查看素材"
				@click="pageStore.editorLeftTab = 'asset'"
			>
				素材
			</span>
		</div>

		<!-- 错误行 + 重试 -->
		<div
			v-if="entry.status === 'failed' && entry.error"
			class="border-t border-[#27272a] px-3 py-1.5 flex items-center gap-2.5"
		>
			<span class="text-[11px] text-[#e5484d] break-all">{{ entry.error.message }}</span>
			<span class="font-mono text-[9.5px] text-[#e5484d] border border-[#e5484d66] rounded-sm px-1.5 py-px shrink-0">
				{{ entry.error.code }}
			</span>
			<button
				class="ml-auto shrink-0 text-[11px] font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-[#2e2e33] rounded px-2.5 py-1 hover:border-gray-400 dark:hover:border-[#767d88]"
				@click="agentStore.retryTool(entry.id)"
			>
				重试
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toolRegistry } from "@/class/agentTools";
import { useAgentState } from "@/stores/agent";
import { usePageState } from "@/stores/page";
import type { ChatEntry } from "@/types/agent";

const props = defineProps<{ entry: Extract<ChatEntry, { kind: "tool" }> }>();

const agentStore = useAgentState();
const pageStore = usePageState();

const danger = computed(
	() => toolRegistry.get(props.entry.tool)?.danger ?? "write",
);

const dangerLabel = computed(
	() =>
		({ query: "查询", write: "写入", destructive: "破坏性" })[danger.value] ??
		"",
);

const dangerClass = computed(() =>
	danger.value === "destructive"
		? "text-[#e5484d] border-[#e5484d66]"
		: "text-gray-500 dark:text-[#767d88] border-gray-200 dark:border-[#2e2e33]",
);

const statusLabel = computed(
	() =>
		({
			awaiting_confirm: "待确认",
			running: "执行中",
			done: "完成",
			failed: "失败",
			cancelled: "已取消",
		})[props.entry.status],
);

const paramsText = computed(
	() =>
		Object.entries(props.entry.params)
			.filter(([k]) => k !== "confirmed")
			.map(([k, v]) => `${k} ${typeof v === "object" ? JSON.stringify(v) : v}`)
			.join("\n") || "无参数",
);
</script>
