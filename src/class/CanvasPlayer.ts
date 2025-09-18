import { AudioTrack } from "@/class/AudioTrack";
import { baseFps } from "@/data/track";
import { usePlayerState } from "@/stores/player";
import { useTrackState } from "@/stores/track";
import type { DrawTrack } from "@/types/track";
import { preciseInterval } from "@/utils/common";

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

    const drawList: DrawTrack[] = [];
    const playList: AudioTrack[] = [];

    this.playerStore.playingTracks.forEach((trackItem) => {
      if (trackItem instanceof AudioTrack) {
        playList.push(trackItem);
      } else {
        drawList.unshift(trackItem);
      }
    });

    // // 最后绘制旁白音频的字幕
    // drawList.push(...playList);

    this.#drawCanvas(drawList);
    this.#playAudio(playList);
  }

  // 将预渲染好的canvas进行播放器渲染
  async #drawCanvas(tracks: DrawTrack[]) {
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

  async #playAudio(tracks: AudioTrack[]) {
    if (this.playerStore.isPause) return;

    const asList: AudioBufferSourceNode[] = [];

    for (const track of tracks) {
      const as = await track.play(
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

  // 开始播放音视频
  #play() {
    if (this.playerStore.playStartFrame >= this.trackState.frameCount) {
      this.playerStore.playStartFrame = 0;
    }
    this.audioContext.resume();
    this.audioPlayAt = 0;
    this.playerTimer = preciseInterval(() => {
      this.playerStore.playStartFrame++;
      if (this.playerStore.playStartFrame >= this.trackState.frameCount) {
        this.playerStore.isPause = true;
      }
    }, 1000 / baseFps);
  }

  // 暂停播放音视频
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
