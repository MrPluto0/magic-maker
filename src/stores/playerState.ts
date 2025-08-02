import { ref, toRefs, reactive } from "vue";
import { defineStore } from "pinia";
import { useTrackState } from "./trackState";
import { baseFps } from "@/data/trackConfig";
import { Track } from "@/types/track";
import { subtitleDecoder } from "@/utils/webcodecs";

export const usePlayerState = defineStore("playerState", () => {
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
        playerConfig.playerWidth = Math.floor(firstVA.source.width);
        playerConfig.playerHeight = Math.floor(firstVA.source.height);
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
