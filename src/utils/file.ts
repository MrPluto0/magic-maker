
import { nanoid } from "nanoid";
import {
  Resource,
  AudioResource,
  ImageResource,
  VideoResource,
  TextResource,
} from "@/types/resource";
import { videoDecoder, audioDecoder, imageDecoder } from "./webcodecs";
import { FILE_SIZE_LIMITS, SUPPORTED_FILE_TYPES } from "@/data/file";

interface FileUploadOptions {
  accept: string;
  multiple: boolean;
  max?: string;
}

export const selectFile = (options: FileUploadOptions): Promise<File[]> => {
  return new Promise((resolve, reject) => {
    // 创建input[file]元素
    const input = document.createElement("input");
    // 设置相应属性
    input.setAttribute("type", "file");
    input.setAttribute("accept", options.accept);
    if (options.multiple) {
      input.setAttribute("multiple", "multiple");
    } else {
      input.removeAttribute("multiple");
    }
    // 绑定事件
    input.onchange = function (e: Event) {
      const target = e.target as HTMLInputElement;
      let files = Array.from(target.files || []) as File[];
      // 获取文件列表
      if (files) {
        resolve(files);
      } else {
        reject(new Error("No files selected"));
      }
    };

    input.oncancel = function () {
      reject(new Error("No files selected"));
    };
    input.click();
  });
};

export async function createFileWriter(
  name = `${new Date().toLocaleString()}.mp4`
): Promise<WritableStream> {
  // @ts-ignore - File System Access API
  const fileHandle = await window.showSaveFilePicker({
    suggestedName: name,
  });
  return fileHandle.createWritable();
}

// 将Base64数据转换为Blob对象
export function base64ToBlob(base64Data: string, contentType: string) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

// 将Blob对象转换为File对象
export function blobToFile(blob: Blob, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export const fetch2Base64 = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // 当读取完成时，将结果传递给 resolve 函数
    reader.onloadend = () => resolve(reader.result as string);
    // 当发生错误时，将错误传递给 reject 函数
    reader.onerror = reject;
    // 开始读取 blob 并将其转换为 data URL （包含 Base64 编码）
    reader.readAsDataURL(blob);
  });
};


/**
 * 文件解析错误类
 */
export class FileParseError extends Error {
  constructor(
    message: string,
    public fileType: string,
    public fileName: string
  ) {
    super(message);
    this.name = "FileParseError";
  }
}

/**
 * 资源工厂类
 */
export class FileParser {
  /**
   * 从文件创建资源对象
   */
  static async createFromFile(file: File): Promise<Resource> {
    this.validateFile(file);

    const baseResource = {
      id: nanoid(),
      name: file.name,
      createdAt: new Date().toISOString(),
      file,
    };

    try {
      if (file.type.startsWith("video/")) {
        return await this.createVideoResource(file, baseResource);
      } else if (file.type.startsWith("audio/")) {
        return await this.createAudioResource(file, baseResource);
      } else if (file.type.startsWith("image/")) {
        return await this.createImageResource(file, baseResource);
      } else if (file.type.startsWith("text/")) {
        return await this.createTextResource(file, baseResource);
      } else {
        throw new FileParseError(
          `不支持的文件类型: ${file.type}`,
          file.type,
          file.name
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new FileParseError("资源创建失败", file.type, file.name);
    }
  }

  private static async createVideoResource(
    file: File,
    baseResource: any
  ): Promise<VideoResource> {
    const url = URL.createObjectURL(file);
    const clip = await videoDecoder.decodeFromStream(file.stream(), baseResource.id);
    const meta = clip.meta;

    return {
      ...baseResource,
      type: "video",
      url,
      format: file.type,
      duration: meta.duration / 1e6,
      width: meta.width,
      height: meta.height,
      cover: await this.genVideoCover(clip),
    };
  }

  private static async createAudioResource(
    file: File,
    baseResource: any
  ): Promise<AudioResource> {
    const url = URL.createObjectURL(file);
    const clip = await audioDecoder.decodeFromStream(file.stream(), baseResource.id);
    const meta = clip.meta;

    return {
      ...baseResource,
      type: "audio",
      url,
      format: file.type,
      duration: meta.duration / 1e6,
    };
  }

  private static async createImageResource(
    file: File,
    baseResource: any
  ): Promise<ImageResource> {
    const url = URL.createObjectURL(file);
    const clip = await imageDecoder.decodeFromStream(file.stream(), baseResource.id, file.type);
    const meta = clip.meta;

    return {
      ...baseResource,
      type: "image",
      url,
      format: file.type,
      width: meta.width,
      height: meta.height,
    };
  }

  private static async createTextResource(
    file: File,
    baseResource: any
  ): Promise<TextResource> {
    const content = await this.parseTextContent(file);

    return {
      ...baseResource,
      type: "text",
      content,
    };
  }

  private static async parseTextContent(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = () => {
        reject(new FileParseError("无法读取文本文件", file.type, file.name));
      };

      reader.readAsText(file, "utf-8");
    });
  }

  private static async genVideoCover(clip: any): Promise<string> {
    try {
      const { video } = await clip.tick(0);

      if (!video) {
        return "";
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = video.displayWidth || video.codedWidth;
      canvas.height = video.displayHeight || video.codedHeight;

      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.close();

      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            canvas.remove();
            if (blob) {
              resolve(URL.createObjectURL(blob));
            } else {
              resolve("");
            }
          },
          "image/jpeg",
          0.8
        );
      });
    } catch (error) {
      console.error("Failed to generate thumbnail from WebCodecs:", error);
      return "";
    }
  }

  private static validateFile(file: File): void {
    const fileType = this.getFileCategory(file.type);
    const maxSize = FILE_SIZE_LIMITS[fileType as keyof typeof FILE_SIZE_LIMITS];

    if (maxSize && file.size > maxSize) {
      throw new FileParseError(
        `文件大小超过限制 (${this.formatFileSize(maxSize)})`,
        file.type,
        file.name
      );
    }

    const supportedTypes = this.getSupportedTypes();
    if (!this.validateFileType(file, supportedTypes)) {
      throw new FileParseError(
        `不支持的文件格式: ${file.type}`,
        file.type,
        file.name
      );
    }
  }

  private static validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some((type) => {
      if (type.endsWith("/*")) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });
  }

  private static getFileCategory(mimeType: string): string {
    if (mimeType.startsWith("video/")) return "VIDEO";
    if (mimeType.startsWith("audio/")) return "AUDIO";
    if (mimeType.startsWith("image/")) return "IMAGE";
    if (mimeType.startsWith("text/")) return "TEXT";
    return "UNKNOWN";
  }

  private static getSupportedTypes(): string[] {
    return [
      ...SUPPORTED_FILE_TYPES.VIDEO,
      ...SUPPORTED_FILE_TYPES.AUDIO,
      ...SUPPORTED_FILE_TYPES.IMAGE,
      ...SUPPORTED_FILE_TYPES.TEXT,
    ];
  }

  private static formatFileSize(bytes: number): string {
    const sizes = ["B", "KB", "MB", "GB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  }

  static async duplicateResource(resource: Resource): Promise<Resource> {
    if (!resource.file) {
      throw new Error("无法复制资源：缺少原始文件");
    }

    return this.createFromFile(resource.file);
  }
}
