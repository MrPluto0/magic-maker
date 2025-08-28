import { TrackType } from "@/types/track";
import type { Component } from "vue";
import TextGenerate from "@/pages/editor/components/generate/TextGenerate.vue";
import ImageGenerate from "@/pages/editor/components/generate/ImageGenerate.vue";
import MusicGenerate from "@/pages/editor/components/generate/MusicGenerate.vue";
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

export const EditorAIMenu: MenuItem[] = [];

export const DrawAIMenu: MenuItem[] = [];
