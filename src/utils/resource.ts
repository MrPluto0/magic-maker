import { nanoid } from "nanoid";
import type {
  Resource,
  AudioResource,
  ImageResource,
  VideoResource,
  TextResource,
} from "@/types/resource";
import { videoDecoder, audioDecoder, imageDecoder } from "./webcodecs";
import { FILE_SIZE_LIMITS, SUPPORTED_FILE_TYPES } from "@/data/file";
import { writeFileToOPFS } from "./file";

/**
 * 资源工厂类
 */
export class ResourceFactory {
  /**
   * 从文件创建资源对象
   */
  static async createFromFile(file: File): Promise<Resource> {
    ResourceFactory.validateFile(file);

    const resource = {
      id: nanoid(),
      name: file.name,
      createdAt: new Date().toISOString(),
    };

    writeFileToOPFS(resource.id, URL.createObjectURL(file));

    try {
      if (file.type.startsWith("video/")) {
        return ResourceFactory.createVideoResource(file, resource);
      } else if (file.type.startsWith("audio/")) {
        return ResourceFactory.createAudioResource(file, resource);
      } else if (file.type.startsWith("image/")) {
        return ResourceFactory.createImageResource(file, resource);
      } else if (file.type.startsWith("text/")) {
        return ResourceFactory.createTextResource(file, resource);
      } else {
        throw new Error(`不支持的文件类型: ${file.type}`);
      }
    } catch (error) {
      throw new Error("资源创建失败");
    }
  }

  private static async createVideoResource(
    file: File,
    resource: any
  ): Promise<VideoResource> {
    const url = URL.createObjectURL(file);
    const clip = await videoDecoder.decodeFromStream(
      file.stream(),
      resource.id
    );
    const meta = clip.meta;

    return {
      ...resource,
      type: "video",
      url,
      format: file.type,
      duration: meta.duration / 1e6,
      width: meta.width,
      height: meta.height,
      cover: await ResourceFactory.genVideoCover(clip),
    };
  }

  private static async createAudioResource(
    file: File,
    resource: any
  ): Promise<AudioResource> {
    const url = URL.createObjectURL(file);
    const clip = await audioDecoder.decodeFromStream(
      file.stream(),
      resource.id
    );
    const meta = clip.meta;

    return {
      ...resource,
      type: "audio",
      url,
      format: file.type,
      duration: meta.duration / 1e6,
    };
  }

  private static async createImageResource(
    file: File,
    resource: any
  ): Promise<ImageResource> {
    const url = URL.createObjectURL(file);
    const clip = await imageDecoder.decodeFromStream(
      file.stream(),
      resource.id,
      file.type
    );
    const meta = clip.meta;

    return {
      ...resource,
      type: "image",
      url,
      format: file.type,
      width: meta.width,
      height: meta.height,
    };
  }

  private static async createTextResource(
    file: File,
    resource: any
  ): Promise<TextResource> {
    const content = await file.text();

    return {
      ...resource,
      type: "text",
      messages: [{ role: "user", content }],
    };
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
    const fileType = ResourceFactory.getFileCategory(file.type);
    const maxSize = FILE_SIZE_LIMITS[fileType as keyof typeof FILE_SIZE_LIMITS];

    if (maxSize && file.size > maxSize) {
      throw new Error(
        `文件大小超过限制 (${ResourceFactory.formatFileSize(maxSize)})`
      );
    }

    const supportedTypes = ResourceFactory.getSupportedTypes();
    if (!ResourceFactory.validateFileType(file, supportedTypes)) {
      throw new Error(`不支持的文件格式: ${file.type}`);
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
    return Math.round((bytes / 1024 ** i) * 100) / 100 + " " + sizes[i];
  }
}
