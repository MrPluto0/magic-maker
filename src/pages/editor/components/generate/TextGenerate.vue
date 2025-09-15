<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <!-- 对话列表区 -->
    <template v-if="!dialog">
      <div
        class="flex-1 w-full flex flex-col justify-center items-center text-gray-400 select-none"
      >
        <el-button type="primary" @click="handleCreateDialog"
          >创建第一个对话吧~</el-button
        >
      </div>
    </template>

    <template v-else>
      <div class="flex justify-between items-center w-full px-2">
        <div
          class="i-mdi:format-list-bulleted text-[20px] cursor-pointer"
        ></div>
        <div>{{ dialog.name }}</div>
        <div
          class="i-mdi:comment-plus-outline text-[20px] cursor-pointer"
        ></div>
      </div>

      <template v-if="messages.length === 0">
        <div
          class="flex-1 w-full flex flex-col justify-center items-center select-none"
        >
          <div class="mb-4">开始你的对话吧~</div>
          <i class="i-mdi-message-text-outline text-[100px]"></i>
        </div>
      </template>
      <template v-else>
        <div class="flex-1 w-full flex flex-col mt-4 overflow-auto gap-4">
          <div
            v-for="(item, index) in messages"
            :key="index"
            class="flex items-center gap-2 text-sm"
            :class="'chat-item-' + item.role"
          >
            <!-- 头像区 -->
            <div
              class="w-5 h-5"
              :class="{
                'i-mdi-account': item.role === 'user',
                'i-mdi-robot': item.role !== 'user' && !item.loading,
                'i-mdi-loading animate-spin':
                  item.role !== 'user' && item.loading,
              }"
            ></div>

            <!-- 文本区域 -->
            <div class="chat-textbox">
              <div class="text-xs select-text text-white">
                {{ item.content }}
              </div>

              <!-- 按钮区 -->
              <div
                v-if="item.role !== 'user'"
                class="flex items-center mt-2 gap-2"
              >
                <button @click="() => handleCopy(item)">
                  <div
                    class="i-mdi-content-copy h-3.5 w-4 cursor-pointer"
                  ></div>
                </button>
                <button
                  v-if="index === messages.length - 1"
                  @click="() => handleRegenerate()"
                >
                  <div class="i-mdi-refresh h-4 w-4 cursor-pointer"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="w-full">
        <el-tag
          v-if="form.file"
          type="primary"
          class="mb-2"
          closable
          :effect="pageStore.isDark ? 'dark' : 'light'"
          @close="form.file = null"
        >
          <span>上传文件：{{ form.file?.name }}</span>
        </el-tag>

        <div v-loading="form.loading" class="flex items-center w-full gap-2">
          <div class="flex-1">
            <el-input
              v-model="form.input"
              class="mr-4"
              placeholder="输入提示词"
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
                  hidden
                  @change="handleFileChange"
                />
              </template>
            </el-input>
          </div>

          <el-button type="primary" @click="handleChat">
            <i class="i-mdi-send" />
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { useResourceState } from "@/stores/resource";
import { ChatMessage, TextResource } from "@/types/resource";
import { usePageState } from "@/stores/page";
import { nanoid } from "nanoid";
import { OpenAIService } from "@/class/OpenAI";

const { toClipboard } = useClipboard();
const resourceStore = useResourceState();
const pageStore = usePageState();

const fileInputRef = ref<HTMLInputElement | null>(null);
const openAI = OpenAIService.getInstance();

const form = reactive({
  loading: false,
  input: "",
  file: null as File | null,
});

const dialogList = computed(
  () => resourceStore.getResourcesByType("text") as TextResource[]
);

const dialog = computed(() => {
  return dialogList.value?.[0];
});

const messages = computed(() => {
  return dialog.value?.messages || [];
});

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    form.file = file;
  }
};

const handleCreateDialog = () => {
  const newDialog: TextResource = {
    id: nanoid(),
    type: "text",
    name: "新对话",
    messages: [],
    url: "",
    createdAt: new Date().toISOString(),
  };
  resourceStore.addResource(newDialog);
};

const handleChat = async () => {
  if (!form.input) {
    ElMessage.warning("请输入提示词");
    return;
  }

  if (!form.file) {
    messages.value.push({
      role: "user",
      content: form.input,
    });
  } else {
    const fileId = await openAI.uploadFile(form.file);
    messages.value.push({
      role: "user",
      content: [
        { type: "text", text: form.input },
        {
          type: "file",
          file: { file_id: fileId, filename: form.file.name },
        },
      ],
    });
  }

  const response = await openAI.chat({
    messages: messages.value,
  });
  messages.value.push(response.choices[0].message);

  form.input = "";
  form.file = null;
};

const handleCopy = async (message: ChatMessage) => {
  try {
    // @ts-expect-error
    await toClipboard(message?.content);
    ElMessage.success("复制成功");
  } catch (error) {
    console.error(error);
  }
};

const handleRegenerate = () => {
  messages.value.pop();
  handleChat();
};
</script>

<style scoped lang="less">
.chat-textbox {
  max-width: calc(100% - 58px);
  border-radius: 8px;
  padding: 7px 10px;
  white-space: pre-wrap; /* 自动换行 */
  word-break: break-word; /* 单词超出时换行 */
}

.chat-item-assistant {
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

.el-textarea__inner {
  padding-bottom: 10px;
}
</style>
