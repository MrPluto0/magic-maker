import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.js";
import { ImageGenerateParamsBase } from "openai/resources/images";

export interface ChatParams
  extends Omit<ChatCompletionCreateParamsBase, "stream" | "model"> {
  thinking?: boolean;
  model?: string;
}

export interface ImageParams extends ImageGenerateParamsBase {
  prompt: string;
}
