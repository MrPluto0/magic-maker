<template>
  <div
    v-loading="track.loading"
    class="text-[12px] leading-5 flex flex-col gap-5"
  >
    <AttrCol name="名称" nowrap>
      {{ track.name }}
    </AttrCol>
    <div class="flex">
      <AttrCol name="初始时间">
        {{ track.source.duration.toFixed(2) }} s
      </AttrCol>
      <AttrCol name="当前时间">
        {{ ((track.end - track.start) / baseFps).toFixed(2) }} s
      </AttrCol>
    </div>
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
    <!-- <AttrCol name="静音">
      <div class="flex items-center gap-2">
        <el-slider :min="1" :max="200" :step="1" v-model="track.scale" />
        <div class="flex-shrink-0">{{ track.scale }} %</div>
      </div>
    </AttrCol> -->
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
    </AttrCol>
  </div>
</template>

<script lang="ts" setup>
import { text2video } from "@/api/generate";
import { VideoTrack } from "@/class/VideoTrack";
import { baseFps } from "@/data/trackConfig";
import { useTrackState } from "@/stores/trackState";
import AttrCol from "./AttrCol.vue";

const trackStore = useTrackState();
const track = computed(() => trackStore.selectResource as VideoTrack);

const handleReGenerate = async () => {
  track.value.loading = true;
  const oldTrack = track.value;

  const resource = await text2video({
    prompt: track.value.source.meta.prompt,
    sizeStr: "",
    style: "",
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
