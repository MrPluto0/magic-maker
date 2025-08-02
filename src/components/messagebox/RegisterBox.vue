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
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="输入邮箱" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone" placeholder="输入电话">
            <template #prepend>
              <div class="-mx-1">+{{ form.countryCode }}</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="form.verifyCode" placeholder="输入验证码">
            <template #append>
              <el-button :disabled="sendInterval > 0" @click="handleSend">
                {{ sendInterval > 0 ? sendInterval + "s后重试" : "发送验证码" }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="内推码">
          <el-input v-model="form.referralCode" placeholder="输入内推码" />
        </el-form-item>

        <div class="flex justify-center mt-16 mb-8">
          <el-button class="px-6" color="#1473E6" @click="handleRegister">
            注册
          </el-button>
          <el-button class="px-6" @click="handleLogin"> 登录 </el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { IRegisterReq, login, register, sendVerifyCode } from "@/api/user";
import { useUserState } from "@/stores/userState";

const userStore = useUserState();

const form = reactive<IRegisterReq>({
  username: "",
  password: "",
  email: "",
  countryCode: "86",
  phone: "",
  verifyCode: "",
  referralCode: "",
});

const sendInterval = ref(0);

const handleClose = () => {
  userStore.showRegister = false;
};

const handleRegister = async () => {
  if (
    !form.username ||
    !form.password ||
    !form.phone ||
    !form.email ||
    !form.verifyCode ||
    !form.referralCode
  ) {
    ElMessage.error("内容填写不完整");
    return;
  }
  const res = await register(form);
  userStore.authInfo = res;
  userStore.isLogin = true;
  userStore.showRegister = false;
  ElMessage.success("注册成功");
};

const handleSend = async () => {
  await sendVerifyCode(form.phone, form.countryCode);
  sendInterval.value = 60;
  setInterval(() => {
    if (sendInterval.value <= 0) return;
    sendInterval.value--;
  }, 1000);
  ElMessage.success("发送成功");
};

const handleLogin = () => {
  userStore.showLogin = true;
  userStore.showRegister = false;
};
</script>

<style scoped lang="less"></style>
