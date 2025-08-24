<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div
      ref="contentChatText"
      class="flex-1 w-full flex flex-col mt-4 overflow-auto gap-4"
    >
      <div
        v-for="(item, index) in form.messages"
        :key="index"
        class="chat-item text-sm"
        :class="'chat-item-' + item.role"
      >
        <!-- 头像区 -->
        <div class="avatar">
          <img
            v-if="item.role === 'system' && !item.loading"
            src="@/assets/svg/avatar/system.svg"
          />
          <img
            v-if="item.role === 'system' && item.loading"
            src="@/assets/svg/avatar/thinking.gif"
          />
          <el-icon v-if="item.role === 'user'" size="20" class="mt-[-2px]">
            <UserBotIcon />
          </el-icon>
        </div>

        <!-- 文本区域 -->
        <div class="chat-textbox">
          <div
            v-if="!item.edit"
            class="text-xs select-text text-white"
            @click="item.edit = true"
          >
            {{ item.content }}
          </div>
          <el-input
            v-else
            type="textarea"
            v-model="item.content"
            autosize
            @mouseleave="item.edit = false"
            class="text-xs text-white w-[250px]"
          ></el-input>

          <!-- 按钮区 -->
          <div
            v-if="item.role === 'system'"
            class="flex items-center mt-2 gap-3"
          >
            <button @click="() => handleCopy(item.content)">
              <el-icon color="white">
                <CopyDocument />
              </el-icon>
            </button>
            <button
              v-if="index === form.messages.length - 1"
              @click="() => handleRegenerate()"
            >
              <el-icon color="white">
                <Refresh />
              </el-icon>
            </button>
            <button @click="() => handleTextSplit(item.content)">
              <el-icon color="white">
                <Scissor />
              </el-icon>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full">
      <el-tag
        v-if="uploadFile"
        type="primary"
        class="my-2 text-xs dark:text-white"
        closable
        @close="uploadFile = null"
      >
        <span>上传文件：{{ uploadFileName }}</span>
      </el-tag>

      <div v-loading="loading" class="flex items-center w-full gap-2">
        <div class="w-22">
          <el-select v-model="form.style" placeholder="风格">
            <el-option value="Promotional video" label="宣传片" />
            <el-option value="Movie" label="电影" />
            <el-option value="Ad" label="广告" />
            <el-option value="E-commerce" label="电商" />
            <el-option value="Custom" label="自定义" />
          </el-select>
        </div>

        <div class="flex-1">
          <el-input
            v-model="inputText"
            class="mr-4"
            :placeholder="
              uploadFile ? `上传文件：${uploadFileName}` : '输入提示词'
            "
            :disabled="uploadFile"
            @keyup.enter="handleTextExpand"
          >
            <template #suffix>
              <el-icon
                class="cursor-pointer"
                size="18"
                @click="triggerFileInput"
              >
                <UploadIcon />
              </el-icon>
              <input
                ref="fileInputRef"
                class="file-input"
                type="file"
                name="file"
                accept=".txt, .pdf, .doc, .docx"
                hidden
                @change="handleFileChange"
              />
            </template>
          </el-input>
        </div>

        <el-button
          class="dark:bg-purple-heavy"
          circle
          @click="handleTextExpand"
        >
          <PlaneIcon />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { useResourceState } from "@/stores/resource";
import { CopyDocument, Refresh, Scissor } from "@element-plus/icons-vue";

const { toClipboard } = useClipboard();
const resourceStore = useResourceState();

const loading = ref(false);
const inputText = ref("");

const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadFile = ref();
const uploadFileName = ref("");

const form = reactive({
  style: "Promotional video",
  messages: [],
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    uploadFile.value = file;
    uploadFileName.value = file.name;
  }
};

const handleTextExpand = () => {
  if (!uploadFile.value && !inputText.value) {
    ElMessage.warning("请输入文字或上传文件");
    return;
  }

  if (inputText.value) {
    form.messages.push({
      role: "user",
      content: inputText.value,
    });
  } else {
    form.messages.push({
      role: "user",
      content: "请解析该文件并扩写",
    });
  }

  // 模拟生成文本
  form.messages.push({
    role: "system",
    content: "这是一个扩写后的文本内容示例。在前端模式下，暂不支持AI生成功能。",
    loading: 0,
  });

  inputText.value = "";
  uploadFile.value = null;
  uploadFileName.value = "";
};

const handleTextSplit = (text: string) => {
  form.messages.push({
    role: "user",
    content: "请输出分镜头脚本",
  });

  form.messages.push({
    role: "system",
    content:
      "这是一个分镜头脚本示例。在前端模式下，暂不支持AI分镜头脚本生成功能。",
    loading: 0,
  });
};

const handleCopy = async (text: string) => {
  try {
    await toClipboard(text);
    ElMessage.success("复制成功");
  } catch (error) {
    console.error(error);
  }
};

const handleRegenerate = () => {
  form.messages.pop();
  handleTextExpand();
};
</script>

<style scoped lang="less">
.chat-item {
  display: flex;
  align-items: center;
  gap: 5px;

  .chat-textbox {
    max-width: 280px;
    min-height: 30px;
    border-radius: 8px;
    padding: 7px 10px;
    white-space: pre-wrap; /* 自动换行 */
    word-break: break-word; /* 单词超出时换行 */
  }

  .avatar {
    width: 20px;
    height: 20px;
  }
}

.chat-item-system {
  .chat-textbox {
    background: #31313a;
  }
}

.chat-item-user {
  flex-direction: row-reverse;
  .chat-textbox {
    border-radius: 8px;
    background: #29499d;
  }
}

::selection {
  color: #fff;
  background: #6990f2;
}

/* 文件上传区 */
.upload {
  border: transparent;
}

/* 添加样式用于显示文件列表 */
.file-list {
  padding: 10px;
  border: transparent;
  border-radius: 4px;
}

.file-list-hiddenIcon {
  padding: 10px;
  border: transparent;
  border-radius: 4px;
  margin-bottom: 150px;
}
</style>
