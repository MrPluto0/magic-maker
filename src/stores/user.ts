import { defineStore } from "pinia";

interface AuthInfo {
	accessToken: string;
	tokenType: string;
}

export const useUserState = defineStore(
	"user",
	() => {
		const isLogin = ref(false);
		const showLogin = ref(false);
		const showRegister = ref(false);

		const authInfo = ref<AuthInfo>({
			accessToken: "",
			tokenType: "",
		});

		const userInfo = reactive({
			id: "",
			name: "Local User",
		});

		// 简化登录逻辑，仅用于前端状态管理
		const login = (username: string, password: string) => {
			if (username && password) {
				isLogin.value = true;
				userInfo.id = username;
				userInfo.name = username;
				authInfo.value = {
					accessToken: "local-token",
					tokenType: "Bearer",
				};
				showLogin.value = false;
				return true;
			}
			return false;
		};

		const logout = () => {
			isLogin.value = false;
			userInfo.id = "";
			userInfo.name = "Local User";
			authInfo.value = { accessToken: "", tokenType: "" };
		};

		const register = (username: string, password: string, email?: string) => {
			if (username && password) {
				isLogin.value = true;
				userInfo.id = username;
				userInfo.name = username;
				authInfo.value = {
					accessToken: "local-token",
					tokenType: "Bearer",
				};
				showRegister.value = false;
				return true;
			}
			return false;
		};

		return {
			isLogin,
			showLogin,
			showRegister,
			userInfo,
			authInfo,
			login,
			logout,
			register,
		};
	},
	{
		persist: {
			storage: localStorage,
			pick: ["authInfo", "isLogin", "userInfo"],
		},
	},
);
