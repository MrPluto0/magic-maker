import { AudioTrack } from "@/class/AudioTrack";
import { ImageTrack } from "@/class/ImageTrack";
import { TextTrack } from "@/class/TextTrack";
import { VideoTrack } from "@/class/VideoTrack";

export type GeneralTrack = AudioTrack | ImageTrack | VideoTrack;
export type DrawTrack = VideoTrack | ImageTrack | TextTrack;

export type Track = GeneralTrack | TextTrack;

export interface TrackLineItem {
  type: Track["type"];
  main?: boolean;
  list: Track[];
}
