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
import { TrackType } from "@/types/track";

export interface MenuItem {
  title: string;
  key: TrackType;
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
    key: "audio",
    fileType: "audio/*",
    icon: "AudioIcon",
    component: MusicGenerate,
  },
  {
    title: "旁白",
    // @ts-expect-error
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
    key: "audio",
    fileType: "audio/*",
    icon: "AudioIcon",
    component: MusicGenerate,
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

];

export const DrawAIMenu: MenuItem[] = [

];