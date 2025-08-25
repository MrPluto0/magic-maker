<template>
  <el-dialog
    :model-value="show"
    width="700"
    align-center
    :before-close="handleClose"
  >
    <div class="flex items-center justify-between ml-4 mr-10 text-xs">
      <div class="flex items-center gap-8">
        <div
          @click="triggerUpload"
          class="w-20 h-20 bg-[#1473e6] flex justify-center items-center rounded-full cursor-pointer overflow-hidden"
        >
          <input
            ref="fileInputRef"
            class="file-input"
            type="file"
            name="file"
            accept="image/*"
            hidden
            @change="handleUploadAvatar"
          />
          <img v-if="!form.avatarUrl" src="@/assets/logo.png" alt="" />
          <img
            v-else
            class="w-full h-full object-cover"
            :src="form.avatarUrl"
            alt=""
          />
        </div>
        <div class="flex flex-col gap-4">
          <div>你好，{{ form.nickname || "暂无" }}</div>
          <div>欢迎使用MagicMaker</div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <el-button type="warning" @click="handleLogout"
            >退 出 登 录</el-button
          >
        </div>
      </div>
    </div>

    <el-tabs model-value="first" class="mt-6 mx-4 mb-6">
      <el-tab-pane label="基本信息" name="first">
        <div class="flex gap-6">
          <el-form class="mt-2" style="width: 270px">
            <el-form-item label="手 机：">
              <el-input v-model="form.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮 箱：">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="职 业：">
              <el-input v-model="form.profession"></el-input>
            </el-form-item>
            <el-form-item label="方 向：">
              <el-input v-model="form.direction"></el-input>
            </el-form-item>
          </el-form>
          <el-form class="mt-2" style="width: 290px">
            <el-form-item label="昵 称：">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="简 介：">
              <el-input
                type="textarea"
                v-model="form.introduction"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="mt-6 flex justify-between items-center">
          <div
            class="text-white text-xs font-light font-['Open Sans'] tracking-wide"
          >
            注册日期：{{ form.createAt }}
          </div>
          <div>
            <el-button type="primary" @click="handleSave"
              >保 存 信 息</el-button
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { useUserState } from "@/stores/user";
import { useProjectState } from "@/stores/project";

const props = defineProps<{
  show: boolean;
}>();

const emits = defineEmits(["update:show"]);
const userStore = useUserState();
const proStore = useProjectState();
const router = useRouter();

const form = ref<IUser>({} as IUser);
const fileInputRef = ref<HTMLInputElement | null>(null);

const handleSave = () => {
  // 前端模式下仅更新本地状态
  if (form.value?.username) {
    userStore.userInfo.name = form.value.username;
  }
  ElMessage.success("保存成功");
};

const handleClose = () => {
  emits("update:show", false);
};

const handleLogout = () => {
  userStore.isLogin = false;
  userStore.authInfo = {
    accessToken: "",
    tokenType: "",
  };
  proStore.project = null;
  handleClose();
  router.push("/");
  ElMessage.success("退出成功");
};

const triggerUpload = () => {
  fileInputRef.value?.click();
};

const handleUploadAvatar = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      ElMessage.error("文件大小超过5MB，请重新上传");
      return;
    }
    // 前端模式下使用本地URL
    const localUrl = URL.createObjectURL(file);
    form.value.avatarUrl = localUrl;
    ElMessage.success("头像更新成功");
  }
};

onMounted(() => {
  // 前端模式下使用默认用户信息
  form.value = {
    id: 1,
    username: userStore.userInfo.name || "本地用户",
    nickname: userStore.userInfo.name || "本地用户",
    avatarUrl: "",
    email: "",
    phone: "",
    phoneCountryCode: "+86",
    direction: "",
    profession: "",
    introduction: "",
    createAt: "2024-01-01T00:00:00Z",
  };
});
</script>

<style scoped lang="less"></style>
