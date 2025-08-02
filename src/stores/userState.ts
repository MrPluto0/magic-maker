import { IAuthRes } from "@/api/user";
import { defineStore } from "pinia";
import { useProjectState } from "./projectState";

export const useUserState = defineStore(
  "userState",
  () => {
    const projectStore = useProjectState();
    const isLogin = ref(false);
    const showLogin = ref(false);
    const showRegister = ref(false);

    const authInfo = ref<IAuthRes>({
      accessToken: "",
      tokenType: "",
    });

    const userInfo = reactive({
      id: "",
    });

    watch(
      () => isLogin.value,
      () => {
        if (isLogin.value) {
          projectStore.refreshFlag++;
        } else {
          projectStore.project = null;
          authInfo.value = { accessToken: "", tokenType: "" };
        }
      }
    );

    return {
      isLogin,
      showLogin,
      showRegister,
      userInfo,
      authInfo,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["authInfo", "isLogin", "userInfo"],
    },
  }
);
