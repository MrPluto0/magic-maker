import { Resource } from "./resource";
import { TrackLineItem } from "./track";

export interface IProject {
  id?: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  resources: Resource[];
  trackData: TrackLineItem[];
  drawData?: any[];
  version: string;
}

export interface Record {
  id: number;
  userId: number;
  type: string;
  model: string;
  prompt: string;
  promptFileUrl: string;
  url: string;
  textResult: string;
  size: number;
  configs: string;
  basicInfo: any;
}
