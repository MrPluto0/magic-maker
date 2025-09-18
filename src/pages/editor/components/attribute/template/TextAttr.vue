<template>
  <div v-loading="loading" class="text-[12px] leading-5 flex flex-col gap-5">
    <div class="flex">
      <AttrCol name="时长">
        {{ ((track.end - track.start) / baseFps).toFixed(2) }} s
      </AttrCol>
      <AttrCol name="类型">
        <el-tag size="small">{{ track.type }}</el-tag>
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
    <AttrCol name="内容">
      <el-input
        v-model="track.text"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
      >
      </el-input>
    </AttrCol>
    <div class="flex gap-4">
      <AttrCol name="字号">
        <el-input-number
          class="w-[90%]"
          controlsPosition="right"
          v-model="track.fontSize"
        ></el-input-number>
      </AttrCol>
      <AttrCol name="背景">
        <ColorPicker v-model="track.textBackgroundColor" />
      </AttrCol>
    </div>
    <div class="flex gap-4">
      <AttrCol name="字体颜色">
        <ColorPicker v-model="track.fill" />
      </AttrCol>
      <AttrCol name="描边颜色">
        <ColorPicker v-model="track.stroke" />
      </AttrCol>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { baseFps } from "@/data/track";
import { useTrackState } from "@/stores/track";
import AttrCol from "../AttrCol.vue";
import type { TextTrack } from "@/class/TextTrack";
import ColorPicker from "../color/ColorPicker.vue";

const loading = ref(false);
const trackStore = useTrackState();
const track = computed(() => trackStore.selectTrack as TextTrack);
</script>

<style scoped lang="less"></style>
