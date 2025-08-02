import { camelCase, snakeCase } from "lodash-es";

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isArray(obj: any) {
  return Object.prototype.toString.call(obj) === "[object Array]";
}

function transform(obj: any, handler: (key: string) => string) {
  if (isObject(obj)) {
    const newObj: any = {};
    for (const key in obj) {
      const newKey = handler(key);
      newObj[newKey] = transform(obj[key], handler);
    }
    return newObj;
  } else if (isArray(obj)) {
    const newArr: any[] = [];
    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      newArr.push(transform(element, handler));
    }
    return newArr;
  } else {
    return obj;
  }
}

export function transformCamel(obj: any) {
  return transform(obj, camelCase);
}

export function transformSnake(obj: any) {
  return transform(obj, snakeCase);
}
