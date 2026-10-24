<template>
  <div
    v-if="['image', 'video'].includes(type)"
    class="gen relative w-full mb-3.5 rounded-md overflow-hidden border border-[#e9ecf2] dark:border-[#27272a] bg-[#f7f8fa] dark:bg-[#141414]"
    draggable="true"
    @dragstart="dragStart"
  >
    <div class="prev relative h-24 cursor-grab overflow-hidden">
      <el-image
        class="w-full h-full"
        fit="cover"
        preview-teleported
        :src="'cover' in resource ? resource.cover : resource.url"
        :preview-src-list="[
          'cover' in resource ? resource.cover : resource.url,
        ]"
      />
      <el-dialog v-if="showVideo" title="原始视频" center v-model="showVideo">
        <video controls :src="'url' in resource ? resource.url : ''"></video>
      </el-dialog>

      <!-- 拖入提示 + 时长角标（设计稿 .drag-hint/.gen-meta） -->
      <span class="drag-hint mono absolute top-2 right-2 text-[10px] text-[#767d88] opacity-0 transition-opacity">
        ⠿ 拖入轨道
      </span>
      <span
        v-show="'duration' in resource && resource.duration"
        class="mono absolute bottom-2 right-2 text-[10px] text-white"
        style="text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8)"
      >
        {{ "duration" in resource && resource.duration ? resource.duration.toFixed(1) : 0 }}s
      </span>
    </div>

    <div class="gen-meta-bar flex items-center justify-between px-2.5 py-1.5">
      <span class="text-xs truncate text-[#3f3f3f] dark:text-[#c9ccd1]">{{
        resource.name
      }}</span>
      <span class="flex items-center gap-1 shrink-0">
        <button class="op-btn" title="加入轨道" @click="addTrack">
          <i class="i-mdi-plus text-[13px]"></i>
        </button>
        <button class="op-btn danger" title="删除素材" @click="resourceStore.removeResource(resource.id)">
          <i class="i-mdi-minus text-[13px]"></i>
        </button>
      </span>
    </div>
  </div>

  <div
    v-else-if="type === 'audio'"
    class="gen-aud relative w-full mb-3.5 flex flex-wrap items-center gap-3 p-3 pb-9 rounded-md border border-[#e9ecf2] dark:border-[#27272a] bg-[#f7f8fa] dark:bg-[#141414]"
    draggable="true"
    @dragstart="dragStart"
  >
    <div
      class="ic w-[34px] h-[34px] shrink-0 rounded border border-[#c9ccd1] dark:border-[#2e2e33] grid place-items-center text-[#767d88]"
    >
      <i class="i-mdi-volume-high text-sm"></i>
    </div>
    <div class="flex-1 min-w-0">
      <div class="truncate text-xs font-medium text-[#171717] dark:text-white">
        {{ resource.name }}
      </div>
      <div class="mono text-[10px] text-[#a7a7a7]">
        {{
          "duration" in resource && resource.duration
            ? `${resource.duration.toFixed(1)}s`
            : "audio"
        }}
      </div>
    </div>

    <div class="flex items-center gap-1 shrink-0">
      <button class="op-btn" title="加入轨道" @click="addTrack">
        <i class="i-mdi-plus text-[13px]"></i>
      </button>
      <button class="op-btn danger" title="删除素材" @click="resourceStore.removeResource(resource.id)">
        <i class="i-mdi-minus text-[13px]"></i>
      </button>
    </div>

    <!-- 本地试听（保留原有 audio 预览能力） -->
    <audio
      class="aud-preview absolute left-3 right-3 bottom-1 w-[calc(100%-24px)] h-7"
      controls
      preload="metadata"
      :src="'url' in resource ? resource.url : ''"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { VideoTrack } from "@/class/VideoTrack";
import { useResourceState } from "@/stores/resource";
import { useTrackState } from "@/stores/track";
import type { AudioResource, Resource } from "@/types/resource";
import type { TrackType } from "@/types/track";

const props = defineProps<{
	resource: Resource;
	type: TrackType;
}>();

const trackStore = useTrackState();
const resourceStore = useResourceState();
const showVideo = ref(false);

async function dragStart(event: DragEvent) {
	event.stopPropagation();
	trackStore.dragData.dataInfo = props.resource;
	trackStore.dragData.dragType = props.type;
	trackStore.dragData.dragPoint.x = event.offsetX;
	trackStore.dragData.dragPoint.y = event.offsetY;
	trackStore.selectTrackItem.line = -1;
	trackStore.selectTrackItem.index = -1;
}

async function addTrack(event: MouseEvent) {
	event.stopPropagation();

	const { resource } = props;
	const track = await trackStore.createTrack(resource);
	trackStore.addTrack(track);
}
</script>

<style lang="less" scoped>
.gen:hover {
  .drag-hint {
    opacity: 1 !important;
  }
}

/* 行内操作按钮：冷灰描边小方钮 */
.op-btn {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #767d88;
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);

    html:not(.dark) & {
      color: #171717;
      background: #e9ecf2;
    }
  }

  &.danger:hover {
    color: #e5484d;
  }
}
</style>
