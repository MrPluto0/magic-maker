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
      <audio
        class="h-10"
        controls
        preload="metadata"
        :src="'url' in resource ? resource.url : ''"
      ></audio>
    </div>

    <div
      class="flex justify-center items-center bg-red-500 rounded-full w-5 h-5"
      @click="resourceStore.removeResource(resource.id)"
    >
      <div class="i-mdi-minus text-white cursor-pointer"></div>
    </div>

    <div
      class="right-1 flex justify-center items-center bg-blue-500 rounded-full w-5 h-5"
      @click="addTrack"
    >
      <div class="i-mdi-plus text-white cursor-pointer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTrackState } from "@/stores/track";
import type { Resource } from "@/types/resource";
import type { TrackType } from "@/types/track";
import { useResourceState } from "@/stores/resource";
import { ref } from "vue";

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
