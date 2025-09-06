import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.js";
import { ImageGenerateParamsBase } from "openai/resources/images";

export interface ChatParams
  extends Omit<ChatCompletionCreateParamsBase, "stream"> {
  thinking?: boolean;
}

export interface ImageParams extends ImageGenerateParamsBase {
  prompt: string;
}
