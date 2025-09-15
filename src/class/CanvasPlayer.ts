import { AudioTrack } from "@/class/AudioTrack";
import { baseFps } from "@/data/track";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import type { Track } from "@/types/track";
import { preciseInterval } from "@/utils/common";
import { watch, reactive } from "vue";
import type { Ref } from "vue";

export class CanvasPlayer {
  playerStore = usePlayerState();
  trackState = useTrackState();

  containerSize: Record<string, any>;
  canvasSize = reactive({
    width: 0,
    height: 0,
  });

  player: Ref<HTMLCanvasElement>; // 播放器
  playerTimer: any = 0;
  playerContext: ImageBitmapRenderingContext | null = null;

  audioPlayAt = 0;
  audioContext: AudioContext = new AudioContext();
  captureAudioDest = this.audioContext.createMediaStreamDestination();
  playingAudioCache: Set<AudioBufferSourceNode> = new Set();

  constructor(options: Record<string, any>) {
    this.player = options.player;
    this.playerContext = this.player.value.getContext("bitmaprenderer");

    watch(
      [
        () => this.trackState.trackList,
        () => this.canvasSize,
        () => this.playerStore.playStartFrame,
      ],
      () => this.#render(),
      { deep: true }
    );

    watch(
      () => this.playerStore.isPause,
      () => {
        if (this.playerStore.isPause) {
          this.#pause();
        } else {
          this.#play();
        }
      }
    );
  }

  // 绘制
  async #render() {
    if (this.playerStore.ingLoadingCount !== 0) return;

    const drawList: Track[] = [];
    const audioList: AudioTrack[] = [];

    this.playerStore.playingTracks.forEach(async (trackItem) => {
      if (trackItem instanceof AudioTrack) {
        audioList.push(trackItem);
      } else {
        drawList.unshift(trackItem);
      }
    });

    // 最后绘制旁白音频的字幕
    drawList.push(...audioList);

    this.#renderCanvas(drawList);
    if (!this.playerStore.isPause) {
      this.#renderAudio(audioList);
    }
  }

  // 将预渲染好的canvas进行渲播放器渲染
  async #renderCanvas(tracks: Track[]) {
    const offCanvas = new OffscreenCanvas(
      this.playerStore.playerWidth,
      this.playerStore.playerHeight
    );
    const offCanvasCtx = offCanvas.getContext("2d");

    for (const track of tracks) {
      await track.draw(
        offCanvasCtx,
        this.playerStore.playerWidth,
        this.playerStore.playerHeight,
        this.playerStore.playStartFrame
      );
    }

    if (this.playerContext) {
      this.playerContext.transferFromImageBitmap(
        offCanvas.transferToImageBitmap()
      );
    }
  }
  async #renderAudio(tracks: AudioTrack[]) {
    const asList: AudioBufferSourceNode[] = [];

    for (const track of tracks) {
      const as = await track.render(
        this.audioContext,
        this.playerStore.playStartFrame
      );
      if (as) {
        asList.push(as);
      }
    }

    const curAudioTime = Math.max(
      this.audioContext.currentTime,
      this.audioPlayAt
    );

    let addTime = 0;
    for (const ads of asList) {
      ads.start(curAudioTime);
      ads.connect(this.audioContext.destination);
      ads.connect(this.captureAudioDest);

      this.playingAudioCache.add(ads);
      ads.onended = () => {
        ads.disconnect();
        this.playingAudioCache.delete(ads);
      };
      addTime = Math.max(addTime, ads.buffer?.duration ?? 0);
    }
    this.audioPlayAt = curAudioTime + addTime;
  }

  #play() {
    if (this.playerStore.playStartFrame >= this.trackState.frameCount) {
      this.playerStore.playStartFrame = 0;
    }
    this.audioContext.resume();
    this.audioPlayAt = 0;
    this.playerTimer = preciseInterval(() => {
      this.playerStore.playStartFrame++;
      if (this.playerStore.playStartFrame >= this.trackState.frameCount) {
        this.#pause();
      }
    }, 1000 / baseFps);
  }

  #pause() {
    this.playerTimer?.cancel();
    this.audioContext.suspend();
    for (const asn of this.playingAudioCache) {
      asn.stop();
      asn.disconnect();
    }
    this.playingAudioCache.clear();
  }
}
