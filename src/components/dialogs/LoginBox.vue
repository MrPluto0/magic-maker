<template>
  <el-dialog
    v-model="userStore.showLogin"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-16">欢迎登录</div>
    <div class="flex justify-center">
      <el-form
        :model="form"
        size="default"
        label-width="auto"
        style="width: 400px"
      >
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="输入账号" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="输入密码"
          />
        </el-form-item>
        <div class="flex justify-center mt-16 mb-8">
          <el-button class="!px-6" @click="handleLogin"> 登录 </el-button>
          <el-button class="!px-6" @click="handleRegister"> 注册 </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useUserState } from "@/stores/user";

const userStore = useUserState();

const form = reactive({
	username: "任意输入账号密码即可",
	password: "任意输入账号密码即可",
});

const handleClose = () => {
	userStore.showLogin = false;
};

const handleLogin = () => {
	if (!form.username || !form.password) {
		ElMessage.error("请输入账号和密码");
		return;
	}

	const success = userStore.login(form.username, form.password);
	if (success) {
		ElMessage.success("登录成功");
	} else {
		ElMessage.error("登录失败");
	}
};

const handleRegister = () => {
	userStore.showLogin = false;
	userStore.showRegister = true;
};
</script>

<style scoped lang="less"></style>
