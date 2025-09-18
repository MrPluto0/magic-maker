export const baseFps = 30;

/**
 * 单位帧时间，微秒
 */
export const UnitFrame2μs = 1e6 / baseFps;

export const TrackHeightMap = {
  video: "h-16",
  audio: "h-12",
  text: "h-6",
  image: "h-10",
} as const;

export const WaveOptions = {
  height: 28,
  waveColor: "#007bff",
  progressColor: "#dd5e98",
  cursorColor: "#ddd5e9",
  barAlign: "bottom",
  interact: false,
} as const;
