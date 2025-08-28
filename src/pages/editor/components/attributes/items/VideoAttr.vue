<template>
  <div
    v-loading="track.loading"
    class="text-[12px] leading-5 flex flex-col gap-5"
  >
    <AttrCol name="名称" nowrap>
      {{ track.name }}
    </AttrCol>
    <div class="flex" v-if="track">
      <AttrCol name="初始时间"> {{ resource.duration.toFixed(2) }} s </AttrCol>
      <AttrCol name="当前时间">
        {{ ((track.end - track.start) / baseFps).toFixed(2) }} s
      </AttrCol>
    </div>
    <div class="flex" v-if="resource">
      <AttrCol name="类型">
        <el-tag size="small">{{ track.type }}</el-tag>
      </AttrCol>
      <AttrCol name="分辨率">
        {{ resource.width }} × {{ resource.height }}
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
    <AttrCol name="描述" v-if="resource.meta?.prompt !== undefined">
      <el-input
        v-model="resource.meta.prompt"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 6 }"
        resize="none"
      >
      </el-input>
    </AttrCol>
    <AttrCol v-if="resource.meta?.model !== 'upload'" name="操作">
      <el-button type="primary" @click="handleReGenerate">重新生成</el-button>
    </AttrCol>
  </div>
</template>

<script lang="ts" setup>
import { VideoTrack } from "@/class/VideoTrack";
import { baseFps } from "@/data/track";
import { useTrackState } from "@/stores/track";
import AttrCol from "./AttrCol.vue";
import { VideoResource } from "@/types/resource";

const trackStore = useTrackState();

const track = computed(() => trackStore.selectTrack as VideoTrack);

const resource = computed(
  () => trackStore.selectTrack.resource as VideoResource
);

const handleReGenerate = async () => {
  if (!track.value) {
    ElMessage.error("缺少重新生成所需的提示词");
    return;
  }

  try {
    track.value.loading = true;

    // 这里需要根据实际情况调用生成API
    // 由于我们已经移除了API调用，这里可能需要其他处理方式
    ElMessage.info("重新生成功能需要后端支持");

    // const resource = await text2video({
    //   prompt: resource.value.meta.prompt,
    //   sizeStr: "",
    //   style: "",
    // });

    // const newTrack = await trackStore.createTrack(resource, oldTrack.start);
    // if (newTrack.end > oldTrack.end) {
    //   newTrack.offsetR = newTrack.end - oldTrack.end;
    //   newTrack.end = oldTrack.end;
    // }
    // trackStore.selectTrackById(oldTrack.id);
    // const { line, index } = trackStore.selectTrackItem;
    // trackStore.trackList[line].list.splice(index, 1, newTrack);
  } catch (error) {
    console.error("重新生成失败:", error);
    ElMessage.error("重新生成失败");
  } finally {
    track.value.loading = false;
  }
};
</script>

<style scoped lang="less"></style>
