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
      <AttrCol name="分辨率"> {{ track.width }} × {{ track.height }} </AttrCol>
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
        v-model="track.name"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
      >
      </el-input>
    </AttrCol>
    <AttrCol name="操作">
      <el-button type="primary" @click="handleReGenerate">重新生成</el-button>
      <el-button type="primary" @click="handleGenVideo">图生视频</el-button>
    </AttrCol>
  </div>
</template>

<script lang="ts" setup>
// Removed API imports for frontend-only mode
import { baseFps } from "@/data/track";
import { useTrackState } from "@/stores/track";
import AttrCol from "./AttrCol.vue";
import type { ImageTrack } from "@/class/ImageTrack";

const trackStore = useTrackState();
const track = computed(() => trackStore.selectTrack as ImageTrack);

const handleReGenerate = () => {
	ElMessage.info("前端模式下暂不支持重新生成功能");
};

const handleGenVideo = () => {
	ElMessage.info("前端模式下暂不支持图片生成视频功能");
};
</script>

<style scoped lang="less"></style>
