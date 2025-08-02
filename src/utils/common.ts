import { baseFps } from "@/data/trackConfig";

/**
 *  时间格式化
 * */
export function formatTime(time: number) {
  let second = Math.ceil(time / 1000);
  const s = second % 60;
  second = Math.floor(second / 60);
  const m = second % 60;
  second = Math.floor(second / 60);
  const h = second % 60;
  return {
    s,
    m,
    h,
    str: `${h === 0 ? "" : `${h < 10 ? "0" : ""}${h}:`}${
      m < 10 ? "0" : ""
    }${m}:${s < 10 ? "0" : ""}${s}`,
  };
}
export function formatPlayerTime(frameCount: number) {
  let f = Math.round(frameCount % baseFps);
  frameCount = Math.floor(frameCount / baseFps);
  let s = frameCount % 60;
  frameCount = Math.floor(frameCount / 60);
  let m = frameCount % 60;
  frameCount = Math.floor(frameCount / 60);
  let h = frameCount;
  return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
    s < 10 ? "0" : ""
  }${s}:${f < 10 ? "0" : ""}${f}`;
}

export function getTextRect({
  text = "Hello World",
  fontSize = 40,
  fontFamily,
}: {
  text: string;
  fontSize: number;
  fontFamily: string;
}) {
  const padding = 4;
  const canvas = new OffscreenCanvas(1000, 1000);
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is not supported");
  }

  const lines = text.split("\n");
  ctx.font = `${fontSize}px ${fontFamily}`;
  const lineHeight = fontSize * 1.2; // Adjust line height as needed

  // Measure the widest line
  const textWidth = Math.max(
    ...lines.map((line) => ctx.measureText(line).width)
  );

  // Calculate total height
  const totalHeight = lines.length * lineHeight;

  return {
    width: textWidth + padding * 2,
    height: totalHeight + padding * 2,
    lineHeight,
    lines,
  };
}

/**
 * 精确计时器
 * @param callback
 * @param interval
 * @returns
 */
export function preciseInterval(callback: () => void, interval: number) {
  let expected = performance.now() + interval;
  let stop = false;

  function step(timestamp: number) {
    if (stop) return;

    if (timestamp >= expected) {
      callback();
      // 累积期望的时间，以保持精确的间隔
      expected += interval;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);

  // 返回一个对象包含取消方法
  return {
    cancel: () => {
      stop = true;
    },
  };
}

export function trimPunctuation(text: string) {
  // 将文本按行分割
  let lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    // 去除每一行最后的标点符号
    lines[i] = lines[i].replace(/[.,;!?，。、？！]+$/, "");
  }
  // 将处理后的行重新组合成文本
  return lines.join("\n");
}

export function sleep(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}
