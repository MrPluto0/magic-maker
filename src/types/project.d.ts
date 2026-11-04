import type { SubtitleProjectData } from "@/stores/subtitle";
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
	/** 字幕段 + 全局样式（W6 起随项目 JSON 持久化；旧项目无此字段按空字幕处理） */
	subtitles?: SubtitleProjectData;
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
