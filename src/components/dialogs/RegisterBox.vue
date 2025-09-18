<template>
  <el-dialog
    v-model="userStore.showRegister"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-16">欢迎注册</div>
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
        <el-form-item label="邮箱（可选）">
          <el-input v-model="form.email" placeholder="输入邮箱" />
        </el-form-item>

        <div class="flex justify-center mt-16 mb-8">
          <el-button class="px-6" @click="handleRegister"> 注册 </el-button>
          <el-button class="px-6" @click="handleLogin"> 登录 </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useUserState } from "@/stores/user";

const userStore = useUserState();

const form = reactive({
	username: "",
	password: "",
	email: "",
});

const handleClose = () => {
	userStore.showRegister = false;
};

const handleRegister = () => {
	if (!form.username || !form.password) {
		ElMessage.error("请输入账号和密码");
		return;
	}

	const success = userStore.register(form.username, form.password, form.email);
	if (success) {
		ElMessage.success("注册成功");
	} else {
		ElMessage.error("注册失败");
	}
};

const handleLogin = () => {
	userStore.showLogin = true;
	userStore.showRegister = false;
};
</script>

<style scoped lang="less"></style>
