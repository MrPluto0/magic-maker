import type { TrackType } from "@/types/track";
import type { Component } from "vue";
import TextGenerate from "@/pages/editor/components/generate/TextGenerate.vue";
import ImageGenerate from "@/pages/editor/components/generate/ImageGenerate.vue";
import AudioGenerate from "@/pages/editor/components/generate/AudioGenerate.vue";
import VideoGenerate from "@/pages/editor/components/generate/VideoGenerate.vue";
import SpeechGenerate from "@/pages/editor/components/generate/SpeechGenerate.vue";

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
    icon: "i-mdi-format-text",
    component: TextGenerate,
  },
  {
    title: "图片",
    key: "image",
    fileType: "image/*",
    icon: "i-mdi-image",
    component: ImageGenerate,
  },
  {
    title: "音频",
    key: "audio",
    fileType: "audio/*",
    icon: "i-mdi-volume-high",
    component: AudioGenerate,
  },
  {
    title: "旁白",
    // @ts-expect-error
    key: "speech",
    fileType: "audio/*",
    icon: "i-mdi-microphone",
    component: SpeechGenerate,
  },
  {
    title: "视频",
    key: "video",
    fileType: "video/*",
    icon: "i-mdi-video",
    component: VideoGenerate,
  },
];

export const EditorMaterialMenu: MenuItem[] = [
  {
    title: "图片",
    key: "image",
    fileType: "image/*",
    icon: "i-mdi-image",
    component: ImageGenerate,
  },
  {
    title: "音频",
    key: "audio",
    fileType: "audio/*",
    icon: "i-mdi-volume-high",
    component: AudioGenerate,
  },
  {
    title: "视频",
    key: "video",
    fileType: "video/*",
    icon: "i-mdi-video",
    component: VideoGenerate,
  },
];

// 使用iconify图标映射
export const IconMap = {
  video: "i-mdi-video",
  audio: "i-mdi-volume-high",
  text: "i-mdi-format-text",
  image: "i-mdi-image",
};

export const EditorAIMenu: MenuItem[] = [];

export const DrawAIMenu: MenuItem[] = [];
