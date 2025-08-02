import type { Component } from "vue";
import TextGenerate from "@/components/editor/generate/TextGenerate.vue";
import ImageGenerate from "@/components/editor/generate/ImageGenerate.vue";
import MusicGenerate from "@/components/editor/generate/MusicGenerate.vue";
import VideoGenerate from "@/components/editor/generate/VideoGenerate.vue";
import SpeechGenerate from "@/components/editor/generate/SpeechGenerate.vue";

import HomeIcon from "@/assets/svg/header/home.svg";
import ProjectIcon from "@/assets/svg/header/project.svg";
import TextIcon from "@/assets/svg/header/text.svg";
import ImageIcon from "@/assets/svg/header/image.svg";
import AudioIcon from "@/assets/svg/header/audio.svg";
import SpeechIcon from "@/assets/svg/header/speech.svg";
import VideoIcon from "@/assets/svg/header/video.svg";
import ClipIcon from "@/assets/svg/header/clip.svg";
import AILayout from "@/components/draw/tools/AILayout.vue";
import AIStoryboard from "@/components/draw/tools/AIStoryboard.vue";
import AnalyzeVideo from "@/components/editor/tools/AnalyzeVideo.vue";
import RandomClip from "@/components/editor/tools/RandomClip.vue";
import ProAIClip from "@/components/editor/tools/ProAIClip.vue";

export interface MenuItem {
  title: string;
  key: string;
  icon: string;
  active?: boolean;
  component?: Component;
  [key: string]: any;
}

export const EditorGenerateMenu: MenuItem[] = [
  {
    title: "文本",
    key: "text",
    icon: "TextIcon",
    component: TextGenerate,
  },
  {
    title: "图片",
    key: "image",
    fileType: "image/*",
    icon: "ImageIcon",
    component: ImageGenerate,
  },
  {
    title: "音频",
    key: "music",
    fileType: "audio/*",
    icon: "AudioIcon",
    component: MusicGenerate,
  },
  {
    title: "旁白",
    key: "speech",
    fileType: "audio/*",
    icon: "VoiceIcon",
    component: SpeechGenerate,
  },
  {
    title: "视频",
    key: "video",
    fileType: "video/*",
    icon: "VideoIcon",
    component: VideoGenerate,
  },
];

export const EditorMaterialMenu: MenuItem[] = [
  {
    title: "图片",
    key: "image",
    fileType: "image/*",
    icon: "ImageIcon",
    component: ImageGenerate,
  },
  {
    title: "音频",
    key: "music",
    fileType: "audio/*",
    icon: "AudioIcon",
    component: MusicGenerate,
  },
  {
    title: "旁白",
    key: "speech",
    fileType: "audio/*",
    icon: "VoiceIcon",
    component: SpeechGenerate,
  },
  {
    title: "视频",
    key: "video",
    fileType: "video/*",
    icon: "VideoIcon",
    component: VideoGenerate,
  },
];

export const EditorAIMenu: MenuItem[] = [
  {
    title: "视频解析",
    key: "Video Analysis",
    icon: "HAnalyzeIcon",
    iconSize: 16,
    component: AnalyzeVideo,
  },
  {
    title: "随机剪辑",
    key: "Random Clip",
    icon: "HRdClipIcon",
    component: RandomClip,
  },
  {
    title: "智能剪辑",
    key: "AI Clip",
    icon: "HAIClipIcon",
    iconSize: 20,
    component: ProAIClip,
  },
];

export const DrawAIMenu: MenuItem[] = [
  {
    title: "智能布局",
    key: "AI layout",
    icon: "HLayoutIcon",
    component: AILayout,
  },
  {
    title: "故事板",
    key: "image",
    icon: "HStoryboardIcon",
    component: AIStoryboard,
  },
];

export const GuideMenu: MenuItem[] = [
  {
    title: "官网首页",
    icon: HomeIcon,
    key: "home",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E5%AE%98%E7%BD%91%E9%A6%96%E9%A1%B5_batch.mp4",
  },
  {
    title: "新建项目",
    icon: ProjectIcon,
    key: "project",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E6%96%B0%E5%BB%BA%E9%A1%B9%E7%9B%AE_batch.mp4",
  },
  {
    title: "创意脚本",
    icon: TextIcon,
    key: "text",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90_batch.mp4",
  },
  {
    title: "图片生成",
    icon: ImageIcon,
    key: "image",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E5%9B%BE%E7%89%87%E7%94%9F%E6%88%90_batch.mp4",
  },
  {
    title: "音乐生成",
    icon: AudioIcon,
    key: "audio",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E9%9F%B3%E4%B9%90%E7%94%9F%E6%88%90_batch.mp4",
  },
  {
    title: "旁白生成",
    icon: SpeechIcon,
    key: "speech",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E6%97%81%E7%99%BD%E7%94%9F%E6%88%90_batch.mp4",
  },
  {
    title: "视频生成",
    icon: VideoIcon,
    key: "video",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90_batch.mp4",
  },
  {
    title: "剪辑导出",
    icon: ClipIcon,
    key: "clip",
    url: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/frontends/magicmaker/%E5%89%AA%E8%BE%91%E5%8C%BA_batch.mp4",
  },
];
