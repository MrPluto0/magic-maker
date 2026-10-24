<template>
	<div class="relative flex flex-col flex-1 min-h-0">
		<!-- 会话条 -->
		<div
			class="flex-none flex items-center gap-2 px-4 py-2.5 border-b border-[#e9ecf2] dark:border-[#27272a]"
		>
			<span class="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
			<button
				class="font-mono text-[10px] text-[#767d88] truncate hover:text-white"
				title="会话历史"
				@click="historyOpen = !historyOpen"
			>
				会话 {{ agentStore.currentSessionId.slice(0, 4) }} · {{ pageStore.pageTitle }}
			</button>
			<button
				class="ml-auto text-[11px] text-[#767d88] rounded px-1.5 py-1 hover:text-white hover:bg-white/6 shrink-0"
				:class="historyOpen ? 'text-white bg-white/6' : ''"
				title="会话历史"
				@click="historyOpen = !historyOpen"
			>
				历史
			</button>
			<button
				class="text-[11px] text-[#767d88] rounded px-1.5 py-1 hover:text-white hover:bg-white/6 shrink-0"
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

		<!-- 会话历史下拉（ChatGPT 式列表：标题 + 时间，可切可删） -->
			<div
				v-if="historyOpen"
				class="absolute left-2 right-2 top-[52px] z-30 border border-[#2e2e33] rounded-md bg-[#0d0d0d] overflow-hidden"
			>
				<div
					v-if="sortedSessions.length === 0"
					class="px-3.5 py-3 text-[12px] leading-relaxed text-[#767d88]"
				>
					还没有历史会话。
				</div>
				<div
					v-for="sItem in sortedSessions"
					:key="sItem.id"
					class="group flex items-center gap-2 px-3.5 py-2.5 cursor-pointer border-b border-[#1c1c1f] last:border-b-0 hover:bg-[#1a1a1a]"
					:class="sItem.id === agentStore.currentSessionId ? 'bg-[#1a1a1a]' : ''"
					@click="onPickSession(sItem.id)"
				>
					<span class="min-w-0 flex flex-col gap-0.5">
						<span class="text-[12.5px] truncate" :class="sItem.id === agentStore.currentSessionId ? 'text-white' : 'text-[#c9ccd1]'">
							{{ sItem.title }}
						</span>
						<span class="font-mono text-[9.5px] text-[#767d88]">{{ formatTs(sItem.updatedAt) }}</span>
					</span>
					<button
						class="ml-auto shrink-0 text-[11px] text-[#767d88] opacity-0 group-hover:opacity-100 hover:text-[#e5484d] px-1"
						title="删除会话"
						@click.stop="agentStore.deleteSession(sItem.id)"
					>
						✕
					</button>
				</div>
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
		<!-- 斜杠命令面板 -->
		<div
			v-if="slashMatches.length > 0 && draft.startsWith('/')"
			class="flex-none border border-[#2e2e33] rounded-md bg-[#0d0d0d] overflow-hidden"
		>
			<div
				v-for="c in slashMatches"
				:key="c.cmd"
				class="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-[#1a1a1a]"
				@click="draft = c.template"
			>
				<span class="font-mono text-[11px] text-white">{{ c.cmd }}</span>
				<span class="text-[11px] text-[#767d88]">{{ c.label }}</span>
				<span class="ml-auto font-mono text-[9px] text-[#767d88] truncate max-w-[150px]">{{ c.hint }}</span>
			</div>
			<div class="border-t border-[#1c1c1f] px-3 py-1.5 font-mono text-[9px] text-[#767d88]">
				点击补全参数模板 · 改好参数后回车执行
			</div>
		</div>

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
						⏎ 发送 / Shift+⏎ 换行 / / 命令
					</span>
					<button
						class="text-[12px] font-semibold text-black bg-white rounded px-3.5 py-1.5 whitespace-nowrap hover:opacity-90"
						@click="onSend"
					>
						发送 ↑
					</button>
				</div>
			</div>

			<!-- 斜杠命令错误提示 -->
			<div
				v-if="slashError"
				class="flex-none text-[11px] leading-relaxed text-[#e5484d] px-3.5"
			>
				{{ slashError }}
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
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { toolRegistry } from "@/class/agentTools";
import { useAgentState } from "@/stores/agent";
import { usePageState } from "@/stores/page";
import AgentConfirmCard from "./AgentConfirmCard.vue";
import AgentToolCard from "./AgentToolCard.vue";

const pageStore = usePageState();
const agentStore = useAgentState();

const historyOpen = ref(false);

const sortedSessions = computed(() =>
	[...agentStore.sessions].sort((a, b) => b.updatedAt - a.updatedAt),
);

function formatTs(ts: number): string {
	const d = new Date(ts);
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function onPickSession(id: string) {
	agentStore.switchSession(id);
	historyOpen.value = false;
}

onMounted(() => {
	agentStore.loadSessions();
});
const draft = ref("");
const manualOpen = ref(false);
const manualTool = ref("delete_range");
const manualParams = ref("{}");
const flowEl = ref<HTMLElement>();

const toolOptions = computed(() => agentStore.toolNames);

/* --------------------------- 斜杠命令（免 LLM） --------------------------- */

interface SlashCommand {
	cmd: string;
	label: string;
	hint: string;
	template: string;
	tool?: string;
	undo?: boolean;
}

const SLASH_COMMANDS: SlashCommand[] = [
	{
		cmd: "/delete",
		label: "删除区间",
		hint: '{"startSec":10,"endSec":18,"ripple":true}',
		template: '/delete {"startSec":10,"endSec":18,"ripple":true}',
		tool: "delete_range",
	},
	{
		cmd: "/split",
		label: "分割片段",
		hint: '{"trackId":"…","sec":12.5}',
		template: '/split {"trackId":"片段id","sec":12.5}',
		tool: "split_at",
	},
	{
		cmd: "/text",
		label: "加字幕",
		hint: '{"text":"标题","startSec":0,"endSec":5}',
		template: '/text {"text":"标题","startSec":0,"endSec":5}',
		tool: "add_text",
	},
	{
		cmd: "/export",
		label: "导出成片",
		hint: '{"filename":"output"}',
		template: '/export {"filename":"output"}',
		tool: "export_video",
	},
	{
		cmd: "/undo",
		label: "撤销上一回合",
		hint: "无需参数",
		template: "/undo",
		undo: true,
	},
];

const slashMatches = computed(() => {
	const q = draft.value.toLowerCase();
	if (!q.startsWith("/")) return [];
	const word = q.split(/\s/)[0];
	return SLASH_COMMANDS.filter((c) => c.cmd.startsWith(word));
});

/** 解析并执行斜杠命令；返回错误文案（null = 已受理） */
async function runSlash(text: string): Promise<string | null> {
	const m = text.match(/^(\/\w+)\s*(\{[\s\S]*\})?$/);
	if (!m) return "命令格式：/命令 {JSON 参数}（点击面板项可获得模板）";
	const c = SLASH_COMMANDS.find((x) => x.cmd === m[1]);
	if (!c)
		return `未知命令 ${m[1]}，可用：${SLASH_COMMANDS.map((x) => x.cmd).join(" ")}`;
	if (c.undo) {
		await agentStore.undoCurrentGroup();
		return null;
	}
	let params: Record<string, unknown> = {};
	if (m[2]) {
		try {
			params = JSON.parse(m[2]);
		} catch {
			return "参数不是合法 JSON——点击面板项用模板改。";
		}
	}
	await agentStore.manualRunTool(c.tool!, params);
	return null;
}

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

const slashError = ref("");

async function onSend() {
	const text = draft.value.trim();
	if (!text) return;
	if (text.startsWith("/")) {
		const err = await runSlash(text);
		if (err) {
			slashError.value = err;
			return;
		}
		slashError.value = "";
		draft.value = "";
		return;
	}
	slashError.value = "";
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
