export interface Resource {
  id: string;
  name: string;
  url: string;
  cover: string;
  format: string;
  width: number;
  duration: number;
  height: number;
  type: string;
  meta: {
    recordId: number;
    prompt: string;
    style: string;
    keywords: string[];
    sizeStr: string;
    model: string;
    len: number;
    color: string;
    voiceUrl: string;
  };
  [key: string]: any;
}

export interface TextResource {
  role: "user" | "system";
  content: string;
  meta: {
    recordId: number;
  };
  [k: string]: any;
}
