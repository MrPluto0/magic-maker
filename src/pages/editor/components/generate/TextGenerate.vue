<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <div
      ref="contentChatText"
      class="flex-1 w-full flex flex-col mt-4 overflow-auto gap-4"
    >
      <div
        v-for="(item, index) in dialogs"
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
          <i
            v-if="item.role === 'user'"
            class="i-mdi-account mt-[-2px]"
            style="font-size: 20px"
          ></i>
        </div>

        <!-- 文本区域 -->
        <div class="chat-textbox">
          <div class="text-xs select-text text-white">
            {{ item.content }}
          </div>

          <!-- 按钮区 -->
          <div
            v-if="item.role === 'system'"
            class="flex items-center mt-2 gap-2"
          >
            <button @click="() => handleCopy(item.content)">
              <div class="i-mdi-content-copy h-3.5 w-4 cursor-pointer"></div>
            </button>
            <button
              v-if="index === form.messages.length - 1"
              @click="() => handleRegenerate()"
            >
              <div class="i-mdi-refresh h-4 w-4 cursor-pointer"></div>
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
              <i
                class="i-mdi-upload cursor-pointer"
                style="font-size: 18px"
                @click="triggerFileInput"
              ></i>
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

        <el-button type="primary" @click="handleTextExpand">
          <i class="i-mdi-send" />
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
import { TextResource } from "@/types/resource";

const { toClipboard } = useClipboard();
const resourceStore = useResourceState();
const dialogs = computed(
  () => resourceStore.getResourcesByType("text") as TextResource[]
);

const loading = ref(false);
const inputText = ref("");

const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadFile = ref();
const uploadFileName = ref("");

const form = reactive({
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
