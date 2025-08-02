// import { IUser } from "@/types/user";
// import { request } from "./base";
import { IUser } from "@/types/user";
import {
  mockAuthRes,
  mockUser,
  mockUserLimits
} from "@/mock/mockData";
import { mockSuccess } from "@/mock/mockUtils";

export interface ILoginReq {
  username: string;
  password: string;
}

export interface IAuthRes {
  accessToken: string;
  tokenType: string;
}

export async function login(data: ILoginReq) {
  return mockSuccess(mockAuthRes);
}

export interface IRegisterReq {
  username: string;
  password: string;
  email: string;
  countryCode: string;
  phone: string;
  verifyCode: string;
  referralCode: string;
}

export async function register(data: IRegisterReq) {
  return mockSuccess(mockAuthRes);
}

export async function sendVerifyCode(phone: string, countryCode: string) {
  return mockSuccess({ success: true, message: "验证码发送成功" });
}

export async function getUserInfo() {
  return mockSuccess(mockUser);
}

export async function updateUserInfo(user: IUser) {
  return mockSuccess({ ...mockUser, ...user });
}

export async function getUserLimits() {
  return mockSuccess(mockUserLimits);
}

export async function uploadAvatar(file: File) {
  // const data = new FormData();
  // data.append("file", file);
  // return request<IUser>("/auth/upload_avatar", {
  //   method: "POST",
  //   data,
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  return mockSuccess({
    ...mockUser,
    avatarUrl: "https://magicmaker.obs.cn-north-4.myhuaweicloud.com/avatar/new_avatar.png"
  });
}
