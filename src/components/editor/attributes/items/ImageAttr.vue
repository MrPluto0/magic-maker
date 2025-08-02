<template>
  <div
    v-loading="track.loading"
    class="text-[12px] leading-5 flex flex-col gap-5"
  >
    <AttrCol name="名称" nowrap>
      {{ track.name }}
    </AttrCol>
    <AttrCol name="时长">
      {{ ((track.end - track.start) / baseFps).toFixed(2) }} s
    </AttrCol>
    <div class="flex">
      <AttrCol name="类型">
        <el-tag size="small">{{ track.type }}</el-tag>
      </AttrCol>
      <AttrCol name="分辨率">
        {{ track.source.width }} × {{ track.source.height }}
      </AttrCol>
    </div>
    <AttrCol name="位置">
      <div class="w-full grid grid-cols-2 gap-4">
        <div class="flex flex-1 gap-2 items-center">
          <span>X</span>
          <el-input-number
            class="flex-1"
            controlsPosition="right"
            v-model="track.centerX"
          ></el-input-number>
        </div>
        <div class="flex flex-1 gap-2 items-center">
          <span>Y</span>
          <el-input-number
            controlsPosition="right"
            v-model="track.centerY"
          ></el-input-number>
        </div>
      </div>
    </AttrCol>
    <AttrCol name="缩放">
      <div class="flex items-center gap-2">
        <el-slider :min="1" :max="200" :step="1" v-model="track.scale" />
        <div class="flex-shrink-0">{{ track.scale }} %</div>
      </div>
    </AttrCol>
    <AttrCol name="描述">
      <el-input
        v-model="track.source.meta.prompt"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
      >
      </el-input>
    </AttrCol>
    <AttrCol v-if="track.source.meta.model !== 'upload'" name="操作">
      <el-button type="primary" @click="handleReGenerate">重新生成</el-button>
      <el-button type="primary" @click="handleGenVideo">图生视频</el-button>
    </AttrCol>
  </div>
</template>

<script lang="ts" setup>
import { image2video, text2image, text2video } from "@/api/generate";
import { baseFps } from "@/data/trackConfig";
import { useTrackState } from "@/stores/trackState";
import AttrCol from "./AttrCol.vue";
import { ImageTrack } from "@/class/ImageTrack";

const trackStore = useTrackState();
const track = computed(() => trackStore.selectResource as ImageTrack);

const handleReGenerate = async () => {
  const oldTrack = track.value;
  track.value.loading = true;
  const meta = oldTrack.source.meta;
  const resources = await text2image({
    ...meta,
    samples: 1,
  });
  const newTrack = await trackStore.createTrack(resources[0], oldTrack.start);
  if (newTrack.end > oldTrack.end) {
    newTrack.offsetR = newTrack.end - oldTrack.end;
    newTrack.end = oldTrack.end;
  }

  trackStore.selectTrackById(oldTrack.id);
  const { line, index } = trackStore.selectTrackItem;
  trackStore.trackList[line].list.splice(index, 1, newTrack);
};

const handleGenVideo = async () => {
  const oldTrack = track.value;
  track.value.loading = true;
  const meta = oldTrack.source.meta;
  const resource = await image2video({
    prompt: meta.prompt,
    imageUrl: oldTrack.source.url,
  });
  const newTrack = await trackStore.createTrack(resource, oldTrack.start);
  if (newTrack.end > oldTrack.end) {
    newTrack.offsetR = newTrack.end - oldTrack.end;
    newTrack.end = oldTrack.end;
  }

  trackStore.selectTrackById(oldTrack.id);
  const { line, index } = trackStore.selectTrackItem;
  trackStore.trackList[line].list.splice(index, 1, newTrack);
};
</script>

<style scoped lang="less"></style>
