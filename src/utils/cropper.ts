export interface CropParams {
  base64: string;
  shape: string;
  width: number;
  height: number;
}
export async function cropShape(params: CropParams) {
  switch (params.shape) {
    // 图片或者矩形，无需裁剪
    case "image":
      return params.base64;
    case "rectangle":
      return params.base64;
    case "diamond":
      return cropDiamond(params);
    case "ellipse":
      return cropEllipse(params);
    default:
      console.log("unsupported shape:", params.shape);
      return params.base64;
  }
}

export function cropDiamond(params: CropParams) {
  const canvas = document.createElement("canvas");
  canvas.width = params.width;
  canvas.height = params.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context from canvas");
    return params.base64;
  }

  const img = new Image();
  img.src = params.base64;

  return new Promise<string>((resolve) => {
    img.onload = () => {
      // 将 canvas 裁剪为菱形
      ctx.save();
      ctx.translate(params.width / 2, params.height / 2);
      ctx.beginPath();
      ctx.moveTo(-params.width / 2, 0);
      ctx.lineTo(0, -params.height / 2);
      ctx.lineTo(params.width / 2, 0);
      ctx.lineTo(0, params.height / 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(
        img,
        -params.width / 2,
        -params.height / 2,
        params.width,
        params.height
      );
      ctx.restore();
      const croppedBase64 = canvas.toDataURL();
      resolve(croppedBase64);
    };
  });
}

export function cropEllipse(params: CropParams) {
  const canvas = document.createElement("canvas");
  canvas.width = params.width;
  canvas.height = params.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Could not get 2D context from canvas");
    return params.base64;
  }

  const img = new Image();
  img.src = params.base64;

  return new Promise<string>((resolve) => {
    img.onload = () => {
      // 将 canvas 裁剪为椭圆形
      ctx.save();
      const rx = params.width / 2;
      const ry = params.height / 2;
      ctx.scale(rx, ry);
      ctx.beginPath();
      ctx.arc(1, 1, 1, 0, 2 * Math.PI);
      ctx.restore();
      ctx.clip();
      ctx.drawImage(img, 0, 0, params.width, params.height);
      const croppedBase64 = canvas.toDataURL();
      resolve(croppedBase64);
    };
  });
}
