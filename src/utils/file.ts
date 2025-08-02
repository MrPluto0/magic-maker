/**
 * 比较文件大小，第一个参数为文件大小，为纯数字，第二个参数为目标大小，是一个数字+单位的字符串，如'1MB'
 * @param size
 * @param target
 */
export const compareSize = (size: number, target: string): boolean => {
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = sizes.findIndex((item) => item === target.replace(/\d+/, ""));
  return size > parseInt(target) * k ** i;
};

interface OSSPolicy {
  expire: number;
  policy: string;
  signature: string;
  accessid: string;
  host: string;
  dir: string;
}

let policy: OSSPolicy | undefined;

export const uploadFile = (
  file: File,
  onProgress?: (percentComplete: string) => any
): Promise<string> => {
  if (!policy) {
    console.error("OSS policy is not set");
    throw new Error("OSS policy is not set");
  }
  const formData = new FormData();

  // 'key' : g_object_name,
  // 'policy': policyBase64,
  // 'OSSAccessKeyId': accessid,
  // 'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
  // 'callback' : callbackbody,
  // 'signature': signature,
  formData.append("policy", policy.policy);
  formData.append("OSSAccessKeyId", policy.accessid);
  formData.append("signature", policy.signature);
  const key = policy.dir + Date.now().toString();
  formData.append("key", key);
  formData.append("success_action_status", "200");
  formData.append("file", file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    // 为请求设置headers
    xhr.open("POST", policy.host);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(`${policy?.host}/${key}`);
      } else {
        reject(xhr);
      }
    };
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = ((event.loaded / event.total) * 100).toFixed(0);
        onProgress && onProgress(percentComplete);
      }
    };
    xhr.onerror = () => {
      reject(xhr.statusText);
    };
    xhr.send(formData);
  });
};

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
    input.onchange = function (e) {
      let files = Array.from(e.target.files) as File[];
      // 获取文件列表
      if (files) {
        const length = files.length;
        files = files.filter((file) => {
          if (options.max) {
            return !compareSize(file.size, options.max);
          } else {
            return true;
          }
        });
        if (files && files.length > 0) {
          if (length !== files.length) {
            // message.warning(`已过滤上传文件中大小大于${options.max}的文件`);
          }
          resolve(files);
        } else {
          // message.warning(`上传文件大小不能大于${options.max}`);
          reject(new Error(`上传文件大小不能大于${options.max}`));
        }
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
): Promise<FileSystemWritableFileStream> {
  // @ts-ignore
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

export async function getResourceType4Response(url: string) {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get("Content-Type");
    return contentType || null; // 如果没有 Content-Type 头，返回null
  } catch (error) {
    console.error("Error fetching image type:", error);
    return null;
  }
}

export const proxyUrl = (url: string): string => {
  url = url.replace("https://aigc-files.bigmodel.cn", "/zhipu");
  // 遗留问题
  url = url.replace(
    "https://magicmaker.obs.cn-north-4.myhuaweicloud.com",
    "/obs"
  );
  url = url.replace("http://www.zoomad.net", "/obs");
  return url;
};

export const fetch2Stream = async (url: string) => {
  url = proxyUrl(url);
  // const data = await (await fetch(file)).arrayBuffer();
  const data = await fetch(url);

  return data.body;
};

export const fetch2Base64 = async (url: string): Promise<string> => {
  url = proxyUrl(url);
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

export const fetch2Text = async (url: string) => {
  url = proxyUrl(url);
  const data = await fetch(url);
  const text = await data.text();
  return text;
};
