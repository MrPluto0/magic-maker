import AnimeStyle from "@/assets/style/Animal Style.jpg";
import PhotographicStyle from "@/assets/style/Photographic.jpg";
import DigitalArtStyle from "@/assets/style/Digital Art.jpg";
import ComicBookStyle from "@/assets/style/Comic Book.jpg";
import FantasyArStyle from "@/assets/style/Fantasy Art.jpg";
import AnalogFilm from "@/assets/style/Analog Film.jpg";
import NeonPunkStyle from "@/assets/style/Neon Punk.jpg";
import IsometricStyle from "@/assets/style/Isometric.jpg";
import LowPolyStyle from "@/assets/style/Low Poly.jpg";
import LineArtStyle from "@/assets/style/Line Art.jpg";
import CinematicStyle from "@/assets/style/Cinematic.jpg";
import D3ModelStyle from "@/assets/style/3D Model.jpg";
import PixelArtStyle from "@/assets/style/Pixel Art.jpg";
import GraffitiStyle from "@/assets/style/Graffiti Style.jpg";
import AdertisingPosterStyle from "@/assets/style/Advertising Poster.jpg";
import CraftClayStyle from "@/assets/style/Craft Clay.jpg";

import Size9_16Icon from "@/assets/svg/size/9-16.svg";
import Size3_4Icon from "@/assets/svg/size/3-4.svg";
import Size1_1Icon from "@/assets/svg/size/1-1.svg";
import Size4_3Icon from "@/assets/svg/size/4-3.svg";
import Size16_9Icon from "@/assets/svg/size/16-9.svg";
import Size21_9Icon from "@/assets/svg/size/21-9.svg";

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

export const ResourceStyleList = [
  {
    value: "Anime Style",
    text: "动画风格",
    img: AnimeStyle,
  },
  {
    value: "Photographic",
    text: "照片摄影",
    img: PhotographicStyle,
  },
  {
    value: "Digital Art",
    text: "数字艺术",
    img: DigitalArtStyle,
  },
  {
    value: "Comic Book",
    text: "漫画书",
    img: ComicBookStyle,
  },
  {
    value: "Fantasy Ar",
    text: "奇幻艺术",
    img: FantasyArStyle,
  },
  {
    value: "Analog Film",
    text: "模拟胶片",
    img: AnalogFilm,
  },
  {
    value: "Neon Punk",
    text: "霓虹朋克",
    img: NeonPunkStyle,
  },
  {
    value: "Isometric",
    text: "等轴测投影",
    img: IsometricStyle,
  },
  {
    value: "Low Poly",
    text: "低聚物",
    img: LowPolyStyle,
  },
  {
    value: "Line Art",
    text: "线条艺术",
    img: LineArtStyle,
  },
  {
    value: "Cinematic",
    text: "电影风格",
    img: CinematicStyle,
  },
  {
    value: "3D Model",
    text: "3D模型",
    img: D3ModelStyle,
  },
  {
    value: "Pixel Art",
    text: "像素艺术",
    img: PixelArtStyle,
  },
  {
    value: "Graffiti Style",
    text: "涂鸦风格",
    img: GraffitiStyle,
  },
  {
    value: "Advertising Poster",
    text: "广告风格",
    img: AdertisingPosterStyle,
  },
  {
    value: "Craft Clay",
    text: "粘土风格",
    img: CraftClayStyle,
  },
];

export const ImageSizeList = [
  {
    text: "9:16",
    img: Size9_16Icon,
    value: "(768, 1344)",
  },
  {
    text: "3:4",
    img: Size3_4Icon,
    value: "(832, 1152)",
  },
  {
    text: "1:1",
    img: Size1_1Icon,
    value: "(1024, 1024)",
  },
  {
    text: "4:3",
    img: Size4_3Icon,
    value: "(1152, 896)",
  },
  {
    text: "16:9",
    img: Size16_9Icon,
    value: "(1344, 768)",
  },
  {
    text: "21:9",
    img: Size21_9Icon,
    value: "(1536, 640)",
  },
];

export const MusicStyleList = [
  {
    text: "电子音乐",
    value: "Electronic music",
  },
  {
    text: "小调",
    value: "Minor music",
  },
  {
    text: "恐怖音乐",
    value: "Horror music",
  },
  {
    text: "梦幻音乐",
    value: "Fantasy music",
  },
  {
    text: "鼓点音乐",
    value: "Drumbeat music",
  },
  {
    text: "电影配乐",
    value: "Movie score",
  },
  {
    text: "先锋音乐",
    value: "Pioneer Music",
  },
  {
    text: "伤感风",
    value: "Sad music ",
  },
  {
    text: "爵士",
    value: "Jazz",
  },
  {
    text: "摇滚乐",
    value: "Rock music",
  },
  {
    text: "极简主义",
    value: "Minimalist music",
  },
  {
    text: "钢琴曲",
    value: "Piano",
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
  // { value: "#d4c4fb", label: "浅紫色" },
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
