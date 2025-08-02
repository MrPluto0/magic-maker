import { useProjectState } from "@/stores/projectState";
import { useUserState } from "@/stores/userState";
import { transformCamel, transformSnake } from "@/utils/transform";
import axios, { AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 30 * 60 * 1000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const userStore = useUserState();
    const projectStore = useProjectState();

    config.headers.Authorization = `${userStore.authInfo.tokenType} ${userStore.authInfo.accessToken}`;
    config.params = transformSnake(config.params) || {};
    config.data = transformSnake(config.data) || {};

    if (config.data && config.data.project_id === undefined) {
      config.data.project_id = projectStore?.project?.id || undefined;
    }
    if (config.params && config.params.project_id === undefined) {
      config.params.project_id = projectStore?.project?.id || undefined;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    const resp = response.data;
    if (resp.code === 0 || resp.code === 200) {
      const data = transformCamel(resp.data);
      return data;
    } else {
      ElMessage.error(resp.message);
      return Promise.reject(resp);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

const request = <ResponseType = unknown>(
  url: string,
  options?: AxiosRequestConfig<unknown>
): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    axiosInstance<any, ResponseType>({
      url,
      ...options,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });
};

export { axiosInstance, request };
