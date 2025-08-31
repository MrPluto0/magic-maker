<template>
  <div
    v-if="['image', 'video'].includes(type)"
    class="relative w-24"
    draggable="true"
    @dragstart="dragStart"
  >
    <div
      class="h-24 cursor-pointer center hover:border-2 hover:border-primary box-border overflow-hidden"
    >
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
    </div>

    <span
      v-show="'duration' in resource && resource.duration"
      class="h-5 absolute bottom-1 right-2 text-xs text-gray-400"
    >
      {{
        "duration" in resource && resource.duration
          ? resource.duration.toFixed(1)
          : 0
      }}
      s
    </span>

    <div
      class="absolute top-2 right-1 flex justify-center items-center bg-red-500 rounded-full w-5 h-5 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="resourceStore.removeResource(resource.id)"
    >
      <div class="i-mdi-minus text-white cursor-pointer"></div>
    </div>

    <div
      v-if="!noAction"
      class="absolute bottom-2 right-1 flex justify-center items-center bg-blue-500 rounded-full w-5 h-5 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="addTrack"
    >
      <div class="i-mdi-plus text-white cursor-pointer"></div>
    </div>
  </div>

  <div
    v-else-if="type === 'audio'"
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
            :src="'url' in resource ? resource.url : ''"
          ></audio>
        </template>
        <div>{{ resource.meta?.prompt }}</div>
      </el-popover>
    </div>

    <div
      class="bg-red-500 rounded-full w-6 h-6"
      @click="resourceStore.removeResource(resource.id)"
    >
      <i
        class="i-mdi-minus text-white cursor-pointer p-1 box-content"
        style="font-size: 16px"
      ></i>
    </div>

    <div
      v-if="!noAction"
      class="bg-blue-500 rounded-full w-6 h-6"
      @click="addTrack"
    >
      <i
        class="i-mdi-plus text-white cursor-pointer p-1 box-content"
        style="font-size: 16px"
      ></i>
    </div>
  </div>

  <div v-else-if="type === 'text'" class="relative w-24">
    <el-popover trigger="click" placement="right" :width="400">
      <template #reference>
        <div
          class="h-24 flex flex-col cursor-pointer center hover:border-2 hover:border-primary box-border overflow-hidden"
        >
          <i class="i-mdi-folder-open" style="font-size: 30px"></i>
          <div
            class="w-20 text-center text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ resource.meta?.prompt }}
          </div>
        </div>
      </template>
      <div class="whitespace-pre overflow-auto max-h-[600px] select-text">
        {{ getResultContent(resource) }}
      </div>
      <button
        class="absolute top-4 right-6 bg-night-light"
        @click="() => handleCopyButton(getResultContent(resource))"
      >
        <i class="i-mdi-content-copy color-primary"></i>
      </button>
    </el-popover>

    <div
      class="absolute top-2 right-1 bg-red-500 rounded-full w-6 h-6 opacity-0 hover:opacity-100 transition-opacity duration-150"
      @click="resourceStore.removeResource(resource.id)"
    >
      <i
        class="i-mdi-minus text-white cursor-pointer p-1 box-content"
        style="font-size: 16px"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import type { Resource } from "@/types/resource";
import type { TrackType } from "@/types/track";
import { useResourceState } from "@/stores/resource";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const props = defineProps<{
  resource: Resource;
  type: TrackType;
  noAction?: boolean;
}>();

const trackStore = useTrackState();
const resourceStore = useResourceState();
const { toClipboard } = useClipboard();
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

  const track = await trackStore.createTrack(props.resource);

  trackStore.addTrack(track);
}

const getResultContent = (resource: Resource): string => {
  // 如果resource有result属性，返回result，否则根据类型返回相应内容
  if ((resource as any).result) {
    return (resource as any).result;
  }
  if (resource.type === "text") {
    return resource.content;
  }
  return "";
};

const handleCopyButton = async (text: string) => {
  try {
    const selection = window.getSelection()?.toString() || "";
    await toClipboard(selection === "" ? text : selection);
    ElMessage.success("复制成功");
  } catch (error) {
    console.error(error);
  }
};
</script>
