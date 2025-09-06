import OpenAI from "openai";
import { ChatParams, ImageParams } from "@/types/ai";
import { ImagesResponse } from "openai/resources/images";

// 单例模式
export class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;
  private defaultModel = {
    text: "doubao-seed-1-6-flash-250715",
    image: "doubao-seedream-3-0-t2i-250415",
  };

  private constructor() {
    this.openai = new OpenAI({
      // 允许浏览器中使用
      dangerouslyAllowBrowser: true,
      apiKey: "3a6d8cd8-6d05-42a5-911d-52ee09b90c41",
      baseURL: location.origin + "/api",
    });
  }

  // 获取单例实例
  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  // 聊天接口
  public async chat(params: ChatParams) {
    const {
      model = this.defaultModel.text,
      messages,
      thinking = false,
      ...otherParams
    } = params;

    const response = await this.openai.chat.completions.create({
      messages,
      model,
      // @ts-expect-error
      thinking: {
        type: thinking ? "enabled" : "disabled",
      },
      ...otherParams,
    });

    return response.choices[0].message;
  }

  // 生成图片接口
  public async generateImage(params: ImageParams) {
    const { model = this.defaultModel.image, ...otherParams } = params;

    // @ts-expect-error
    const response = (await this.openai.images.generate({
      model,
      stream: false,
      response_format: "url",
      watermark: false,
      ...otherParams,
    })) as ImagesResponse;

    return response.data[0].url;
  }
}
