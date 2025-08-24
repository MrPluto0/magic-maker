import { ref, toRefs, reactive } from "vue";
import { defineStore } from "pinia";
import { useTrackState } from "./track";
import { useResourceState } from "./resource";
import { baseFps } from "@/data/trackConfig";
import { Track } from "@/types/track";
import { subtitleDecoder } from "@/utils/webcodecs";

export const usePlayerState = defineStore("player", () => {
  const trackStore = useTrackState();
  // 画板信息
  const ingLoadingCount = ref(0);
  const playerConfig = reactive({
    playerWidth: 1440,
    playerHeight: 940,
    outputRadio: 1,
  });
  const existVideo = ref(false);
  const playStartFrame = ref(0); // 当前播放帧
  const isPause = ref(true);

  const playingTracks = computed(() => {
    const tracks: Track[] = [];
    trackStore.trackList.forEach(({ list }) => {
      const item = list.find(
        (item) =>
          playStartFrame.value >= item.start && playStartFrame.value <= item.end
      );
      item && tracks.push(item);
    });
    return tracks;
  });

  watch(
    () => trackStore.trackList,
    () => {
      let firstVA = trackStore.trackList?.find(
        (track) => track.type === "video" && track.list.length > 0
      )?.list?.[0];

      if (!firstVA) {
        firstVA = trackStore.trackList?.find(
          (track) => track.type === "image" && track.list.length > 0
        )?.list?.[0];
      }

      if (firstVA) {
        // 通过resourceId获取资源的宽高
        const resourceStore = useResourceState();
        const resource = resourceStore.getResourceById(firstVA.resourceId);
        if (
          resource &&
          (resource.type === "video" || resource.type === "image")
        ) {
          playerConfig.playerWidth = Math.floor(resource.width || 1920);
          playerConfig.playerHeight = Math.floor(resource.height || 1080);
        }
        subtitleDecoder.refresh();
      }
    },
    {
      deep: true,
    }
  );

  // 快进
  function forward(frame: number = baseFps) {
    playStartFrame.value += frame;

    if (playStartFrame.value > trackStore.frameCount) {
      playStartFrame.value = trackStore.frameCount;
    }
  }

  // 回退
  function backward(frame: number = baseFps) {
    playStartFrame.value -= frame;
    if (playStartFrame.value < 0) {
      playStartFrame.value = 0;
    }
  }

  return {
    isPause,
    playStartFrame,
    ingLoadingCount,
    playingTracks,
    existVideo,
    ...toRefs(playerConfig),
    forward,
    backward,
  };
});
