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
        {{ (track.frameCount / baseFps).toFixed(2) }} s
      </AttrCol>
      <AttrCol name="当前时间">
        {{ ((track.end - track.start) / baseFps).toFixed(2) }} s
      </AttrCol>
    </div>
    <AttrCol name="类型">
      <el-tag size="small">{{ track.type }}</el-tag>
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
      <AttrCol name="字幕">
        <el-switch v-model="track.subtitle.show" />
      </AttrCol>
    </div>
    <template v-if="track.subtitle.show">
      <div class="flex">
        <AttrCol name="字号">
          <el-input-number
            v-model="track.subtitle.fontSize"
            class="input-number"
            :min="12"
            :max="100"
            size="small"
          />
        </AttrCol>
        <AttrCol name="字体颜色">
          <el-color-picker v-model="track.subtitle.fontColor" size="small" />
        </AttrCol>
      </div>
      <div class="flex">
        <AttrCol name="描边大小">
          <el-input-number
            v-model="track.subtitle.strokeSize"
            class="input-number"
            :min="0"
            :max="20"
            size="small"
          />
        </AttrCol>
        <AttrCol name="描边颜色">
          <el-color-picker v-model="track.subtitle.strokeColor" size="small" />
        </AttrCol>
      </div>
      <AttrCol name="底部边距">
        <el-input-number
          v-model="track.subtitle.bottomOffset"
          class="input-number"
          :min="0"
          :max="200"
          size="small"
        />
      </AttrCol>
    </template>
    <AttrCol name="提示词">
      <el-input
        v-model="track.name"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
      />
    </AttrCol>
    <AttrCol name="操作">
      <el-button type="primary" @click="handleReGenerate">重新生成</el-button>
    </AttrCol>
  </div>
</template>

<script lang="ts" setup>
import { baseFps } from "@/data/track";
import { useTrackState } from "@/stores/track";
import AttrCol from "../AttrCol.vue";
import type { AudioTrack } from "@/class/AudioTrack";
import { debounce } from "lodash-es";
import { usePlayerState } from "@/stores/player";
import { decoder } from "@/class/Decoder";

const playerStore = usePlayerState();
const trackStore = useTrackState();
const track = computed(() => trackStore.selectTrack as AudioTrack);

const handleReGenerate = () => {
  ElMessage.info("前端模式下暂不支持重新生成功能");
};

watch(
  () => [track.value.volume, track.value.subtitle],
  debounce(() => {
    playerStore.isPause = true;
    decoder.decode(track.value, true);
  }, 100)
);
</script>

<style scoped lang="less">
.input-number {
  width: 80px !important;
}
</style>
