import OpenAI from "openai";
import type { ChatParams, ImageParams } from "@/types/ai";
import type { ImagesResponse } from "openai/resources/images";
import { usePageState } from "@/stores/page";

// 单例模式
export class OpenAIService {
  private static instance: OpenAIService;
  private openai: OpenAI;
  private settings: Record<string, any> = {};

  private constructor() {
    const page = usePageState();
    this.settings = page.aiSettings;
    if (!this.settings.apiKey) {
      ElMessage.error("请先在用户设置中填写 API Key和Model ID");
      return;
    }

    this.openai = new OpenAI({
      // 允许浏览器中使用
      dangerouslyAllowBrowser: true,
      apiKey: this.settings.apiKey,
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

  public async uploadFile(file: File) {
    const response = await this.openai.files.create({
      file,
      purpose: "assistants",
    });
    return response.id; // 返回文件ID
  }

  // 聊天接口
  public async chat(params: ChatParams) {
    const {
      model = this.settings.textModel,
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

    return response;
  }

  // 生成图片接口
  public async generateImage(params: ImageParams) {
    const { model = this.settings.imageModel, ...otherParams } = params;

    const response = (await this.openai.images.generate({
      model,
      response_format: "url",
      // @ts-expect-error
      watermark: false,
      ...otherParams,
    })) as ImagesResponse;

    return response.data[0].url;
  }
}
