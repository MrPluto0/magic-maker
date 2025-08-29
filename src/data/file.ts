/**
 * 支持的文件类型常量
 */
export const SUPPORTED_FILE_TYPES = {
  VIDEO: ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/mov"],
  AUDIO: ["audio/mp3", "audio/wav", "audio/ogg", "audio/aac", "audio/flac"],
  IMAGE: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ],
  TEXT: ["text/plain", "text/html", "text/css", "text/javascript"],
};

/**
 * 文件大小限制常量（字节）
 */
export const FILE_SIZE_LIMITS = {
  VIDEO: 500 * 1024 * 1024, // 500MB
  AUDIO: 100 * 1024 * 1024, // 100MB
  IMAGE: 50 * 1024 * 1024, // 50MB
  TEXT: 10 * 1024 * 1024, // 10MB
};
