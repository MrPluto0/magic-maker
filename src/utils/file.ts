import { file, write } from "opfs-tools";

interface FileUploadOptions {
  accept: string;
  multiple?: boolean;
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
        reject(new Error("未选择文件"));
      }
    };

    input.oncancel = function () {
      reject(new Error("未选择文件"));
    };
    input.click();
  });
};

// 创建文件写入流
export async function createFileWriter(
  name = `${new Date().toLocaleString()}.mp4`
) {
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

// 通过URL获取Base64数据
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

export async function writeFileToOPFS(id: string, url: string) {
  // 从URL读取并写入opfs
  if (url) {
    const data = await fetch(url);
    await write(id, data.body);
    return file(id);
  }

  throw new Error(`resource not found: ${url}`);
}

export async function readFileFromOPFS(id: string, url?: string) {
  // 尝试从opfs中获取
  if (await file(id).exists()) {
    return file(id);
  }

  if (url) {
    return writeFileToOPFS(id, url);
  }

  throw new Error(`resource not found: ${id}`);
}
