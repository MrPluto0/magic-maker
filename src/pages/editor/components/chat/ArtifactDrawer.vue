<template>
	<Teleport to="body">
		<Transition name="mm-drawer">
			<div
				v-if="pageStore.chatArtifactDrawerOpen"
				class="fixed top-0 z-50 flex flex-col border-l border-[#e9ecf2] dark:border-[#27272a] bg-[#fefefe] dark:bg-night"
				:style="drawerStyle"
			>
				<!-- 标题行 -->
				<div class="flex-none flex items-center gap-2 px-4 py-2.5 border-b border-[#e9ecf2] dark:border-[#27272a]">
					<span class="label-micro">产物 · ARTIFACTS</span>
					<span class="font-mono text-[9.5px] text-[#767d88]">{{ resources.length }}</span>
					<button
						class="ml-auto text-[11px] text-[#767d88] rounded px-1.5 py-1 hover:text-white hover:bg-white/6"
						@click="close"
					>
						✕ 收起
					</button>
				</div>

				<!-- 产物列表 -->
				<div class="flex-1 min-h-0 overflow-auto px-3 py-3 flex flex-col gap-2.5">
					<div
						v-if="resources.length === 0"
						class="text-[12px] leading-relaxed text-[#767d88] border border-dashed border-[#2e2e33] rounded-md p-3"
					>
						还没有产物。上传素材或让 Agent 生成后，这里会收集项目里的全部资源。
					</div>

					<button
						v-for="r in resources"
						:key="r.id"
						class="group flex items-center gap-2.5 border border-[#2e2e33] rounded-md p-2 text-left hover:border-[#767d88]"
						:title="`添加 ${r.name} 到轨道`"
						@click="emitAdd(r)"
					>
						<!-- 缩略图 -->
						<span class="w-11 h-8 shrink-0 rounded-sm overflow-hidden bg-[#141414] flex items-center justify-center">
							<img
								v-if="thumbOf(r)"
								:src="thumbOf(r)"
								class="w-full h-full object-cover"
								alt=""
							/>
							<span v-else class="font-mono text-[10px] text-[#767d88] uppercase">{{ r.type.slice(0, 2) }}</span>
						</span>
						<span class="min-w-0 flex flex-col gap-0.5">
							<span class="text-[12px] text-[#c9ccd1] truncate group-hover:text-white">{{ r.name }}</span>
							<span class="font-mono text-[9.5px] text-[#767d88]">
								{{ r.type }}<template v-if="durationOf(r)"> · {{ durationOf(r) }}</template>
							</span>
						</span>
						<span class="ml-auto shrink-0 font-mono text-[9.5px] text-[#767d88] opacity-0 group-hover:opacity-100">
							+轨道
						</span>
					</button>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { usePageState } from "@/stores/page";
import { useResourceState } from "@/stores/resource";
import { useTrackState } from "@/stores/track";
import type { Resource } from "@/types/resource";

const pageStore = usePageState();
const resourceStore = useResourceState();
const trackStore = useTrackState();

const resources = computed(() => resourceStore.resources);

/** 抽屉贴在左栏内侧：左缘 = 左栏宽度 + 分割线 8px */
const drawerStyle = computed(() => ({
	left: `${pageStore.resourceWidth + 8}px`,
	top: "52px",
	bottom: "0",
	width: "280px",
}));

const emit = defineEmits<{ (e: "add", resource: Resource): void }>();

function thumbOf(r: Resource): string | undefined {
	if (r.type === "video") return r.cover;
	if (r.type === "image") return r.url;
	return undefined;
}

function durationOf(r: Resource): string {
	const d = (r as { duration?: number }).duration;
	if (!d || Number.isNaN(d)) return "";
	const s = Math.round(d);
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function close() {
	pageStore.chatArtifactDrawerOpen = false;
}

async function emitAdd(r: Resource) {
	emit("add", r);
	const track = await trackStore.createTrack(r);
	trackStore.addTrack(track);
}
</script>

<style scoped>
.mm-drawer-enter-active,
.mm-drawer-leave-active {
	transition: transform 0.22s ease, opacity 0.22s ease;
}
.mm-drawer-enter-from,
.mm-drawer-leave-to {
	transform: translateX(-16px);
	opacity: 0;
}
</style>
