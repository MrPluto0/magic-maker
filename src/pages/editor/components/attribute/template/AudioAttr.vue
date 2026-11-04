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
    </div>
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
import { debounce } from "lodash-es";
import type { AudioTrack } from "@/class/AudioTrack";
import { decoder } from "@/class/Decoder";
import { baseFps } from "@/data/track";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import AttrCol from "../AttrCol.vue";

const playerStore = usePlayerState();
const trackStore = useTrackState();
const track = computed(() => trackStore.selectTrack as AudioTrack);

const handleReGenerate = () => {
	ElMessage.info("前端模式下暂不支持重新生成功能");
};

// 音量变化需重新解码生效（旧 subtitle 面板已随 W6 字幕重构删除，
// 字幕样式统一走全局 SubtitleStyle）
watch(
	() => [track.value.volume],
	debounce(() => {
		playerStore.isPause = true;
		decoder.decode(track.value, true);
	}, 100),
);
</script>

<style scoped lang="less">
.input-number {
  width: 80px !important;
}
</style>
