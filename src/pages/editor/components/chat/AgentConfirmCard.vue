<template>
	<div
		class="flex flex-col rounded-md border overflow-hidden"
		:class="
			entry.resolution === 'rejected'
				? 'border-[#2e2e33] bg-[#1a1a1a]'
				: 'border-white bg-[#1a1a1a]'
		"
	>
		<div class="flex items-center gap-2 px-3 py-2.5 border-b border-[#27272a]">
			<span class="text-[12px] font-semibold text-white">确认删除</span>
			<span class="ml-auto font-mono text-[10px] text-[#767d88]">{{ entry.tool }}</span>
		</div>

		<!-- 删除预览：逐条列出 -->
		<div class="px-3 py-2 flex flex-col gap-1.5">
			<div
				v-for="(item, i) in items"
				:key="i"
				class="flex items-baseline gap-2 text-[12px] text-[#c9ccd1]"
			>
				<span class="font-mono text-[10px] text-[#767d88] shrink-0">
					{{ fmt(item.start) }}–{{ fmt(item.end) }}
				</span>
				<span
					class="flex-1 min-w-0 truncate"
					:class="{ 'line-through text-[#767d88]': approved }"
				>
					{{ item.name }}
				</span>
			</div>
			<span v-if="items.length === 0" class="text-[12px] text-[#767d88]">
				{{ entry.affected.summary }}
			</span>
		</div>

		<div class="px-3 pb-2.5 font-mono text-[10px] text-[#767d88]">
			{{ entry.affected.summary }}
		</div>

		<!-- 裁决按钮 -->
		<div class="border-t border-[#27272a] flex gap-2 px-3 py-2.5">
			<template v-if="entry.resolution === 'pending'">
				<button
					class="text-[12px] font-semibold rounded px-3.5 py-1.5 bg-white text-black border border-white hover:opacity-90"
					@click="agentStore.resolveConfirm(entry.id, true)"
				>
					执行
				</button>
				<button
					class="text-[12px] font-semibold rounded px-3.5 py-1.5 border border-[#2e2e33] text-[#c9ccd1] hover:text-white hover:border-[#767d88]"
					@click="adjust"
				>
					调整
				</button>
				<button
					class="text-[12px] font-semibold rounded px-3.5 py-1.5 border border-[#2e2e33] text-[#c9ccd1] hover:text-white hover:border-[#767d88]"
					@click="agentStore.resolveConfirm(entry.id, false)"
				>
					取消
				</button>
			</template>
			<template v-else>
				<span
					class="ml-auto font-mono text-[9.5px] flex items-center gap-1.5"
					:class="approved ? 'text-[#c9ccd1]' : 'text-[#767d88]'"
				>
					{{ approved ? "✓ 已执行" : "✕ 已取消" }}
				</span>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { baseFps } from "@/data/track";
import { useAgentState } from "@/stores/agent";
import type { ChatEntry } from "@/types/agent";

const props = defineProps<{
	entry: Extract<ChatEntry, { kind: "confirm" }>;
}>();

const emit = defineEmits<{ adjust: [paramsText: string] }>();

const agentStore = useAgentState();

const approved = computed(() => props.entry.resolution === "approved");

const items = computed(
	() =>
		(
			props.entry.affected as {
				removedItems?: Array<{ name: string; start: number; end: number }>;
			}
		).removedItems ?? [],
);

function fmt(frame: number) {
	const totalSec = frame / baseFps;
	const m = Math.floor(totalSec / 60);
	const s = totalSec - m * 60;
	return `${String(m).padStart(2, "0")}:${s.toFixed(1).padStart(4, "0")}`;
}

/** 「调整」：参数 JSON 回填输入框，用户改完以 user 消息重发 */
function adjust() {
	emit("adjust", JSON.stringify(props.entry.params, null, 2));
}
</script>
