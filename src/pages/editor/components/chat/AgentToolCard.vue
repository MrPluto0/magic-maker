<template>
	<div
		class="flex flex-col border border-gray-200 dark:border-[#2e2e33] bg-white dark:bg-[#141414] rounded-md overflow-hidden shrink-0"
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

		<!-- 参数摘要（mono 小字，单行紧凑 + 最多两行） -->
		<div class="px-3 pb-2 font-mono text-[10.5px] leading-relaxed text-gray-500 dark:text-[#767d88] break-all line-clamp-2">
			{{ paramsText }}
		</div>

		<!-- 长耗时工具的运行进度（W6 transcribe：模型下载/转写相位 + 百分比） -->
		<div
			v-if="entry.status === 'running' && progress"
			class="border-t border-gray-200 dark:border-[#27272a] px-3 py-2 flex items-center gap-2.5"
		>
			<span class="font-mono text-[10px] whitespace-nowrap text-gray-500 dark:text-[#767d88]">
				{{ progress.phase }}{{ progress.note ? ` · ${progress.note}` : "" }}
			</span>
			<div class="flex-1 h-1 rounded-full bg-gray-200 dark:bg-[#27272a] overflow-hidden">
				<div
					v-if="progress.value >= 0"
					class="h-full bg-gray-900 dark:bg-white transition-[width] duration-200"
					:style="{ width: `${Math.round(progress.value * 100)}%` }"
				/>
				<div
					v-else
					class="h-full w-1/3 bg-gray-400 dark:bg-[#767d88] animate-pulse"
				/>
			</div>
			<span
				v-if="progress.value >= 0"
				class="font-mono text-[10px] text-gray-500 dark:text-[#767d88] shrink-0"
			>
				{{ Math.round(progress.value * 100) }}%
			</span>
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
import { activeToolProgress } from "@/class/toolProgress";
import { useAgentState } from "@/stores/agent";
import { usePageState } from "@/stores/page";
import type { ChatEntry } from "@/types/agent";

const props = defineProps<{ entry: Extract<ChatEntry, { kind: "tool" }> }>();

const agentStore = useAgentState();
const pageStore = usePageState();

/** 运行态进度（工具 execute 内经 toolProgress 登记；非运行态不显示） */
const progress = computed(
	() =>
		(
			activeToolProgress as Record<
				string,
				{ phase: string; value: number; note?: string } | undefined
			>
		)[props.entry.tool],
);

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
			.join(" · ") || "无参数",
);
</script>
