export interface ImgCaptionItem {
	name: string;
	caption: string;
	url: string;
}

export interface ImgCaptionAndId {
	uniqueId: string;
	imgCaptionList: ImgCaptionItem[];
}

export interface TrainParam {
	loraName: string;
	conceptSentence: string;
	imgcaptionAndId: ImgCaptionAndId;
	steps: number;
	lr: number;
	rank: number;
	fluxModel: string;
	lowVram: string;
}

export interface TrainModel {
	domain: string;
	modelUuid: string;
	modelName: string;
	trainParam: TrainParam;
}
