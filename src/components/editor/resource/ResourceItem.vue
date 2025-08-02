<template>
  <div
    v-if="['image', 'video'].includes(type)"
    class="relative w-24"
    draggable="true"
    @dragstart="dragStart"
  >
    <div
      class="h-24 cursor-pointer center bg-night hover:border-2 hover:border-purple box-border overflow-hidden"
    >
      <el-image
        v-if="type === 'image'"
        class="max-h-full max-w-full"
        preview-teleported
        :src="data.cover"
        :preview-src-list="[props.data.cover]"
      />
      <img @click="showVideo = true" v-else :src="props.data.cover" alt="" />
      <el-dialog v-if="showVideo" title="原始视频" center v-model="showVideo">
        <video controls :src="props.data.url"></video>
      </el-dialog>
    </div>

    <span
      v-show="data.duration"
      class="h-5 absolute bottom-1 right-2 text-xs text-gray-400"
      >{{ data?.duration?.toFixed(1) }} s</span
    >

    <div
      class="absolute top-2 right-1 bg-red-500 rounded-full w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="
        resourceStore.removeResource(
          type,
          data.meta.recordId,
          data.meta.model === 'upload'
        )
      "
    >
      <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
        <Minus />
      </ElIcon>
    </div>

    <div
      v-if="!noAction"
      class="absolute bottom-2 right-1 bg-blue-500 rounded-full w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="addTrack"
    >
      <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
        <Plus />
      </ElIcon>
    </div>
  </div>

  <div
    v-else-if="['audio', 'music', 'speech'].includes(type)"
    class="relative w-full h-10 flex items-center py-1 px-2 gap-2 overflow-hidden"
    draggable="true"
    @dragstart="dragStart"
  >
    <div class="flex-1 overflow-hidden flex gap-4 items-center">
      <el-popover>
        <template #reference>
          <audio
            class="h-10"
            controls
            preload="metadata"
            :src="data.url"
          ></audio>
        </template>
        <div>{{ data.meta?.prompt }}</div>
      </el-popover>
    </div>

    <div
      class="bg-red-500 rounded-full w-6 h-6"
      @click="
        resourceStore.removeResource(
          type,
          data.meta.recordId,
          data.meta.model === 'upload'
        )
      "
    >
      <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
        <Minus />
      </ElIcon>
    </div>

    <div
      v-if="!noAction"
      class="bg-blue-500 rounded-full w-6 h-6"
      @click="addTrack"
    >
      <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
        <Plus />
      </ElIcon>
    </div>
  </div>

  <div v-else class="relative w-24">
    <el-popover trigger="click" placement="right" :width="400">
      <template #reference>
        <div
          class="h-24 flex flex-col cursor-pointer center hover:border-2 hover:border-purple box-border overflow-hidden"
        >
          <el-icon size="30"><FolderOpened /></el-icon>
          <div
            class="w-20 text-center text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ data.meta?.prompt }}
          </div>
        </div>
      </template>
      <div class="whitespace-pre overflow-auto max-h-[600px] select-text">
        {{ data.result }}
      </div>
      <button
        class="absolute top-4 right-6 bg-night-light"
        @click="() => handleCopyButton(data.result)"
      >
        <el-icon size="18" color="#1473e6">
          <CopyDocument />
        </el-icon>
      </button>
    </el-popover>

    <div
      class="absolute top-2 right-1 bg-red-500 rounded-full w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="resourceStore.removeResource(type, data.meta.recordId)"
    >
      <ElIcon :size="16" color="#fff" class="cursor-pointer p-1 box-content">
        <Minus />
      </ElIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  Minus,
  CopyDocument,
  FolderOpened,
} from "@element-plus/icons-vue";
import { useTrackState } from "@/stores/trackState";
import { Resource } from "@/types/resource";
import { useResourceState } from "@/stores/resourceState";
import { TrackType } from "@/class/Base";
import useClipboard from "vue-clipboard3";

const props = defineProps<{
  data: Resource;
  type: TrackType;
  noAction?: boolean;
}>();

const trackStore = useTrackState();
const resourceStore = useResourceState();
const { toClipboard } = useClipboard();
const showVideo = ref(false);

async function dragStart(event: DragEvent) {
  event.stopPropagation();
  trackStore.dragData.dataInfo = props.data;
  trackStore.dragData.dragType = props.type;
  trackStore.dragData.dragPoint.x = event.offsetX;
  trackStore.dragData.dragPoint.y = event.offsetY;
  trackStore.selectTrackItem.line = -1;
  trackStore.selectTrackItem.index = -1;
}

async function addTrack(event: MouseEvent) {
  event.stopPropagation();

  const track = await trackStore.createTrack(props.data);

  trackStore.addTrack(track);
}

const handleCopyButton = async (text: string) => {
  try {
    const selection = window.getSelection().toString();
    await toClipboard(selection === "" ? text : selection);
    ElMessage.success("复制成功");
  } catch (error) {
    console.error(error);
  }
};
</script>
