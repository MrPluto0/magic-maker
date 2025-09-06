export const defaultMoveOptions = {
  draggable: true,
  resizable: false,
  scalable: true,
  dragArea: false, // 开启 控制拖动区域
  origin: false, // 原点是否可见
  snappable: true, // 开启辅助线
  stopPropagation: true, // 阻止冒泡
  snapThreshold: 5,
  isDisplaySnapDigit: true, // 是否显示辅助线距离
  snapGap: true, // 画块辅助线
  snapElement: true, // 基于元素的辅助线
  snapCenter: true, // 中心辅助线
  snapDigit: 10, // 吸附距离
  snapVertical: true, // 垂直辅助线
  snapHorizontal: true, // 水平辅助线
  throttleDrag: 1,
  throttleResize: 1,
  throttleScale: 0.01,
  keepRatio: true, // 保持宽高比
  renderDirections: ["nw", "ne", "se", "sw"], // 手柄锚点
  rotatable: false, // 是否可旋转
  throttleRotate: 0.2,
  elementGuidelines: [],
  pinchable: false, // 捏合开关
};

export const ImageSizeList = [
  {
    value: "1024x1024",
    text: "1:1",
  },
  {
    value: "864x1152",
    text: "3:4",
  },
  {
    value: "1152x864",
    text: "4:3",
  },
  {
    value: "1280x720",
    text: "16:9",
  },
  {
    value: "720x1280",
    text: "9:16",
  },
  {
    value: "832x1248",
    text: "2:3",
  },
  {
    value: "1248x832",
    text: "3:2",
  },
  {
    value: "1512x648",
    text: "21:9",
  },
];

export const TimeIntervalList = [90, 60, 30, 16, 8, 4];

export const ColorList = [
  { value: "#b80000", label: "深红色" },
  { value: "#db3e00", label: "橙红色" },
  { value: "#fccb00", label: "亮黄色" },
  { value: "#008b02", label: "深绿色" },
  { value: "#006b76", label: "深青色" },
  { value: "#1273de", label: "蓝色" },
  { value: "#004dcf", label: "深蓝色" },
  { value: "#5300eb", label: "深紫色" },
  { value: "#eb9694", label: "浅粉色" },
  { value: "#fad0c3", label: "浅肉色" },
  { value: "#fef3bd", label: "浅黄色" },
  { value: "#c1e1c5", label: "浅草绿色" },
  { value: "#bedadc", label: "浅蓝绿色" },
  { value: "#c4def6", label: "浅蓝色" },
  { value: "#bed3f3", label: "浅蓝紫色" },
];

export const GenerateKeywords = [
  "动画风格",
  "照片摄影",
  "数字艺术",
  "漫画书",
  "奇幻艺术",
  "模拟胶片",
  "霓虹朋克",
  "等轴测投影",
  "低聚物",
  "线条艺术",
  "电影风格",
  "3D模型",
  "像素艺术",
  "涂鸦风格",
  "广告风格",
  "粘土风格",
];
