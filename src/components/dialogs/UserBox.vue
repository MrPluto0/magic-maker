<template>
  <el-dialog
    :model-value="show"
    width="700"
    align-center
    :before-close="handleClose"
  >
    <div class="flex items-center justify-between mx-4">
      <div class="flex items-center gap-8">
        <div
          @click="triggerUpload"
          class="w-20 h-20 bg-primary flex justify-center items-center rounded-full cursor-pointer overflow-hidden"
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
          <div>欢迎使用MagicMaker，你可以创建你的个人作品啦~</div>
        </div>
      </div>
    </div>

    <el-tabs model-value="first" class="my-6 mx-4 tabs">
      <el-tab-pane label="基本信息" name="first">
        <div class="flex gap-6 mt-2">
          <el-form class="flex-1">
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
          <el-form class="flex-1">
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
        <div class="mt-6 flex justify-between items-end">
          <div class="text-white text-xs tracking-wide flex">
            注册日期：{{ form.createAt }}
          </div>
          <div>
            <el-button type="warning" @click="handleLogout"
              >退 出 登 录</el-button
            >
            <el-button type="primary" @click="handleSave"
              >保 存 信 息</el-button
            >
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="AI 设置" name="second">
        <div class="mt-2">
          <el-form label-width="100px" class="ai-settings-form">
            <el-form-item label="API Key：">
              <el-input
                v-model="pageStore.aiSettings.apiKey"
                type="password"
                placeholder="请输入您的 API Key"
                show-password
                clearable
              >
                <template #prefix>
                  <i class="i-mdi-key text-gray-400" />
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="文本模型：">
              <el-input
                v-model="pageStore.aiSettings.textModel"
                placeholder="请输入文本生成模型ID，如：doubao-seed-1-6-flash-250715"
                clearable
              >
                <template #prefix>
                  <i class="i-mdi-text text-gray-400" />
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="图片模型：">
              <el-input
                v-model="pageStore.aiSettings.imageModel"
                placeholder="请输入图片生成模型ID，如：doubao-seedream-3-0-t2i-250415"
                clearable
              >
                <template #prefix>
                  <i class="i-mdi-image text-gray-400" />
                </template>
              </el-input>
            </el-form-item>
          </el-form>

          <!-- 设置说明 -->
          <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
              <i class="i-mdi-information-outline mr-1" />
              设置说明
            </h4>
            <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 目前均使用的是字节的火山大模型，注册可领取免费额度</li>
              <li>• API Key 将安全存储在本地，不会上传到服务器</li>
              <li>• 请输入准确的模型ID，请自行在火山引擎上查看</li>
              <li>
                • 文本模型用于对话生成、文本扩写等功能；图片模型用于 AI
                绘图功能；其他模型尚未支持。
              </li>
            </ul>
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
import { usePageState } from "@/stores/page";
import type { IUser } from "@/types/user";

defineProps<{
  show: boolean;
}>();

const emits = defineEmits(["update:show"]);
const userStore = useUserState();
const proStore = useProjectState();
const pageStore = usePageState();
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

<style lang="less">
.tabs {
  background-color: transparent !important;

  .el-tabs__nav-scroll {
    background-color: transparent !important;
  }
}

.ai-settings-form {
  .el-form-item {
    margin-bottom: 20px;
  }

  .el-select {
    width: 100%;
  }

  .el-input__prefix {
    display: flex;
    align-items: center;
  }
}

/* 设置说明区域样式 */
.settings-info {
  border-left: 3px solid var(--el-color-primary);

  h4 {
    display: flex;
    align-items: center;

    i {
      margin-right: 4px;
    }
  }
}
</style>
