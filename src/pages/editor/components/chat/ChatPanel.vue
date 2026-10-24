<template>
	<div class="flex flex-col flex-1 min-h-0">
		<!-- 会话条 -->
		<div
			class="flex-none flex items-center gap-2 px-4 py-2.5 border-b border-[#e9ecf2] dark:border-[#27272a]"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
			<span class="font-mono text-[10px] text-[#767d88] truncate">
				会话 {{ sessionId }} · {{ pageStore.pageTitle }}
			</span>
			<button
				class="ml-auto text-[11px] text-[#767d88] rounded px-1.5 py-1 hover:text-white hover:bg-white/6 shrink-0"
				title="查看素材与 AI 生成"
				@click="pageStore.editorLeftTab = 'asset'"
			>
				素材
			</button>
			<button
				class="text-[11px] text-[#767d88] rounded px-1.5 py-1 hover:text-white hover:bg-white/6 shrink-0"
				@click="onNewSession"
			>
				新会话
			</button>
		</div>

		<!-- 消息流 -->
		<div
			ref="flowEl"
			class="flex-1 min-h-0 overflow-auto px-3.5 pt-4 pb-3 flex flex-col gap-3.5"
		>
			<template v-for="entry in agentStore.entries" :key="entry.id">
				<!-- user -->
				<div
					v-if="entry.kind === 'user'"
					class="self-end max-w-[86%] bg-[#1a1a1a] border border-[#2e2e33] rounded-md px-3 py-2.5 text-[13px] leading-normal text-white"
				>
					<div class="label-micro mb-1.5">你</div>
					{{ entry.text }}
				</div>

				<!-- assistant / system -->
				<div
					v-else-if="entry.kind === 'assistant' || entry.kind === 'system'"
					class="max-w-[92%] text-[13px] leading-relaxed"
					:class="entry.kind === 'system' ? 'text-[#767d88]' : 'text-[#c9ccd1]'"
				>
					{{ entry.text }}
				</div>

				<!-- tool card -->
				<AgentToolCard
					v-else-if="entry.kind === 'tool'"
					:entry="entry"
				/>

				<!-- confirm card -->
				<AgentConfirmCard
					v-else-if="entry.kind === 'confirm'"
					:entry="entry"
					@adjust="onAdjust"
				/>
			</template>

			<!-- 无 key 提示 -->
			<div
				v-if="!pageStore.aiSettings.apiKey && agentStore.entries.length === 0"
				class="text-[12px] leading-relaxed text-[#767d88] border border-dashed border-[#2e2e33] rounded-md p-3"
			>
				对话需要 BYOK：到顶栏「AI 设置」填写 API Key 与模型 ID（OpenAI 兼容协议）。
				填之前也可以在下方手动触发工具试试。
			</div>
		</div>

		<!-- 一键全撤浮条 -->
		<div
			v-if="undoBar"
			class="flex-none mx-3.5 mb-2.5 border border-[#2e2e33] rounded-md bg-[#141414] px-3 py-2 flex items-center gap-2.5"
		>
			<span class="font-mono text-[11px] text-[#c9ccd1]">
				本回合 {{ undoBar.stepCount }} 步
			</span>
			<span class="label-micro" :class="{ 'text-[#e5484d]': undoBar.invalid }">
				{{ undoBar.invalid ? "已被手动编辑覆盖" : "全部可撤销" }}
			</span>
			<button
				v-if="!undoBar.invalid"
				class="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-white border border-[#2e2e33] rounded px-3 py-1.5 hover:border-[#767d88]"
				@click="agentStore.undoCurrentGroup()"
			>
				<span class="font-mono text-[11px]">↩</span>一键全撤
			</button>
		</div>

		<!-- 输入区 -->
		<div class="flex-none border-t border-[#e9ecf2] dark:border-[#27272a] px-3.5 pt-3 pb-3.5 flex flex-col gap-2.5">
			<div
				class="border border-[#2e2e33] rounded-md bg-[#141414] px-3 py-2.5 flex flex-col gap-2 focus-within:border-[#767d88]"
			>
				<textarea
					v-model="draft"
					rows="2"
					class="w-full bg-transparent border-none outline-none resize-none text-[13px] leading-normal text-white placeholder:text-[#767d88]"
					placeholder="描述你要的剪辑，例如：把后半段的停顿收紧一点…"
					@keydown.enter.exact.prevent="onSend"
				/>
				<div class="flex items-center gap-2">
					<span class="font-mono text-[9.5px] text-[#767d88] whitespace-nowrap">
						{{ byokLabel }}
					</span>
					<span class="font-mono text-[9.5px] text-[#767d88] ml-auto whitespace-nowrap">
						⏎ 发送 / Shift+⏎ 换行
					</span>
					<button
						class="text-[12px] font-semibold text-black bg-white rounded px-3.5 py-1.5 whitespace-nowrap hover:opacity-90"
						@click="onSend"
					>
						发送 ↑
					</button>
				</div>
			</div>

			<!-- 手动工具触发（无需 LLM） -->
			<div class="flex items-center gap-2">
				<button
					class="font-mono text-[10px] text-[#767d88] border border-[#2e2e33] rounded px-2 py-1 hover:text-[#c9ccd1] whitespace-nowrap"
					@click="manualOpen = !manualOpen"
				>
					{{ manualOpen ? "▾ 手动工具" : "▸ 手动工具" }}
				</button>
				<template v-if="manualOpen">
					<select
						v-model="manualTool"
						class="bg-[#141414] border border-[#2e2e33] rounded px-1.5 py-1 font-mono text-[10px] text-[#c9ccd1] outline-none max-w-[130px]"
					>
						<option v-for="t in toolOptions" :key="t" :value="t">{{ t }}</option>
					</select>
					<input
						v-model="manualParams"
						class="flex-1 min-w-0 bg-[#141414] border border-[#2e2e33] rounded px-2 py-1 font-mono text-[10px] text-[#c9ccd1] outline-none focus:border-[#767d88]"
						placeholder='{"startSec":12.3,"endSec":18,"ripple":true}'
					/>
					<button
						class="text-[11px] font-semibold text-white border border-[#2e2e33] rounded px-2.5 py-1 hover:border-[#767d88] whitespace-nowrap"
						@click="onManualRun"
					>
						运行
					</button>
				</template>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
import { computed, nextTick, ref, watch } from "vue";
import { toolRegistry } from "@/class/agentTools";
import { useAgentState } from "@/stores/agent";
import { usePageState } from "@/stores/page";
import AgentConfirmCard from "./AgentConfirmCard.vue";
import AgentToolCard from "./AgentToolCard.vue";

const pageStore = usePageState();
const agentStore = useAgentState();

const sessionId = nanoid(4);
const draft = ref("");
const manualOpen = ref(false);
const manualTool = ref("delete_range");
const manualParams = ref("{}");
const flowEl = ref<HTMLElement>();

const toolOptions = computed(() => agentStore.toolNames);

const byokLabel = computed(() =>
	pageStore.aiSettings.apiKey
		? `BYOK · ${pageStore.aiSettings.textModel}`
		: "BYOK · 未配置 Key",
);

/** 最新一个可撤回合（渲染 undo-bar） */
const undoBar = computed(() => {
	const group = [...agentStore.groups]
		.reverse()
		.find((g) => g.stepCount > 0 && !g.undone);
	if (!group) return null;
	return { stepCount: group.stepCount, invalid: group.invalid };
});

watch(
	() => agentStore.entries.length,
	async () => {
		await nextTick();
		flowEl.value?.scrollTo({ top: flowEl.value.scrollHeight });
	},
);

function onSend() {
	const text = draft.value.trim();
	if (!text) return;
	draft.value = "";
	agentStore.send(text);
}

function onAdjust(paramsText: string) {
	draft.value = paramsText;
}

async function onManualRun() {
	let params: Record<string, unknown> = {};
	try {
		params = JSON.parse(manualParams.value || "{}");
	} catch {
		agentStore.entries.push({
			id: `err_${Date.now()}`,
			ts: Date.now(),
			kind: "system",
			text: "手动参数不是合法 JSON，请检查后重试。",
		});
		return;
	}
	await agentStore.manualRunTool(manualTool.value, params);
}

function onNewSession() {
	agentStore.newSession();
}
</script>
