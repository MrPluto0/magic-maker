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
    <AttrCol name="类型">
      <el-tag size="small">{{ track.source.type }}</el-tag>
    </AttrCol>
    <AttrCol name="音量">
      <div class="flex items-center gap-4">
        <el-slider :min="0" :max="1" :step="0.1" v-model="track.volume" />
        <div class="flex-shrink-0">{{ track.volume }}</div>
      </div>
    </AttrCol>
    <div class="flex">
      <AttrCol name="静音">
        <el-switch v-model="track.mute" />
      </AttrCol>
      <AttrCol v-if="track.source.type === 'speech'" name="字幕">
        <el-switch v-model="track.drawSub" />
      </AttrCol>
    </div>
    <template v-if="track.source.type === 'speech' && track.drawSub">
      <div class="flex">
        <AttrCol name="字号">
          <el-input-number class="w-[90%]" v-model="track.subtitle.fontSize" />
        </AttrCol>
        <AttrCol name="描边">
          <el-input-number
            class="w-[90%]"
            v-model="track.subtitle.strokeSize"
          />
        </AttrCol>
      </div>
      <div class="flex">
        <AttrCol name="字体颜色">
          <ColorPicker v-model="track.subtitle.fontColor" />
        </AttrCol>
        <AttrCol name="描边颜色">
          <ColorPicker v-model="track.subtitle.strokeColor" />
        </AttrCol>
      </div>
      <AttrCol name="字体位置">
        <el-input-number v-model="track.subtitle.bottomOffset" />
      </AttrCol>
    </template>
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
import { text2audio, text2speech } from "@/api/generate";
import { baseFps } from "@/data/trackConfig";
import { useTrackState } from "@/stores/trackState";
import AttrCol from "./AttrCol.vue";
import { AudioTrack } from "@/class/AudioTrack";
import { Resource } from "@/types/resource";
import { debounce } from "lodash-es";
import { audioDecoder, subtitleDecoder } from "@/utils/webcodecs";
import { usePlayerState } from "@/stores/playerState";

const playerStore = usePlayerState();
const trackStore = useTrackState();
const track = computed(() => trackStore.selectResource as AudioTrack);

const handleReGenerate = async () => {
  const oldTrack = track.value;
  track.value.loading = true;
  let resource: Resource;
  if (track.value.source.type === "music") {
    resource = await text2audio(oldTrack.source.meta);
  } else {
    resource = await text2speech(oldTrack.source.meta);
  }
  const newTrack = await trackStore.createTrack(resource, oldTrack.start);
  if (newTrack.end > oldTrack.end) {
    newTrack.offsetR = newTrack.end - oldTrack.end;
    newTrack.end = oldTrack.end;
  }

  trackStore.selectTrackById(oldTrack.id);
  const { line, index } = trackStore.selectTrackItem;
  trackStore.trackList[line].list.splice(index, 1, newTrack);
};

watch(
  () => track.value.volume,
  debounce(() => {
    playerStore.isPause = true;
    audioDecoder.updateVolume(track.value, track.value.volume);
  }, 100)
);

watch(
  () => track.value.subtitle,
  debounce(() => {
    subtitleDecoder.refresh(track.value);
  }, 100),
  {
    deep: true,
  }
);
</script>

<style scoped lang="less"></style>
