<template>
  <!-- transform相对fixed定位 -->
  <div
    class="w-full h-full overflow-hidden flex flex-col items-center gap-4"
    style="transform: translate(0, 0)"
  >
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
          @click="showDialogs = true"
        ></div>
        <div>{{ dialog.name }}</div>
        <div
          class="i-mdi:comment-plus-outline text-[20px] cursor-pointer"
          @click="handleCreateDialog"
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
        <div
          class="flex-1 w-full flex flex-col mt-4 overflow-auto gap-4"
          ref="scrollRef"
        >
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
                'i-mdi-robot': item.role !== 'user',
              }"
            ></div>

            <!-- 文本区域 -->
            <div class="chat-textbox">
              <div
                v-if="item.reason"
                class="mb-2 border-l-2 pl-2 border-gray-400 text-xs select-text text-gray-300"
              >
                {{ item.reason.trim() }}
              </div>

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

      <div class="w-full" v-loading="form.loading">
        <div class="mb-2 flex items-center gap-2">
          <div
            class="cursor-pointer text-[12px] px-2 h-6 leading-6 rounded border border-primary"
            :class="{
              'bg-primary': form.thinking,
            }"
            @click="form.thinking = !form.thinking"
          >
            深度思考
          </div>

          <el-tag
            v-if="form.file"
            closable
            :effect="pageStore.isDark ? 'dark' : 'light'"
            @close="form.file = null"
          >
            <span>文件：{{ form.file?.name }}</span>
          </el-tag>
        </div>

        <div class="flex items-center w-full gap-2">
          <div class="flex-1">
            <el-input
              v-model="form.input"
              class="mr-4"
              placeholder="输入提示词"
              @keydown.enter="handleChat"
            >
              <template #suffix>
                <div
                  class="i-mdi-upload text-[18px] cursor-pointer"
                  @click="triggerFileInput"
                ></div>
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

    <!-- 对话列表 -->
    <el-drawer
      v-model="showDialogs"
      title="对话列表"
      direction="ltr"
      size="300px"
      body-class="!py-0 !px-4"
    >
      <div class="flex flex-col gap-2">
        <div
          v-for="d in dialogList"
          :key="d.id"
          class="p-2 flex items-center justify-between rounded gap-2 hover:bg-night-lighter"
          :class="{
            'bg-night-lighter': dialog?.id === d.id,
          }"
          @click="dialog = d"
        >
          <div class="flex gap-2 items-center">
            <div class="i-mdi-message-text-outline"></div>
            <div class="text-[14px]">
              {{ d.name }}
            </div>
          </div>
          <el-dropdown placement="top-start" trigger="click">
            <div class="i-mdi:more-vert cursor-pointer"></div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleDeleteDialog(d.id)"
                  >删除</el-dropdown-item
                >
                <el-dropdown-item @click="handleRenameDialog(d)"
                  >重命名</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { useResourceState } from "@/stores/resource";
import type { ChatMessage, TextResource } from "@/types/resource";
import { usePageState } from "@/stores/page";
import { nanoid } from "nanoid";
import { openaiService } from "@/class/OpenAI";

const { toClipboard } = useClipboard();
const resourceStore = useResourceState();
const pageStore = usePageState();

const scrollRef = ref<HTMLElement | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
  input: "",
  file: null as File | null,
  loading: false,
  thinking: false,
});

const showDialogs = ref(false);
const dialogList = computed(
  () => resourceStore.getResourcesByType("text").reverse() as TextResource[]
);
const dialog = ref<TextResource | null>(dialogList.value?.[0] || null);

const messages = computed(() => {
  return dialog.value?.messages || [];
});

const scrollBottom = () => {
  nextTick(() => {
    if (scrollRef.value) {
      scrollRef.value.scrollTo({
        top: scrollRef.value.scrollHeight,
        behavior: "smooth",
      });
    }
  });
};

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
  if (dialogList.value?.[0]?.messages?.length === 0) {
    dialog.value = dialogList.value[0];
    return;
  }
  const newDialog: TextResource = {
    id: nanoid(),
    type: "text",
    name: "新对话",
    messages: [],
    url: "",
    createdAt: new Date().toISOString(),
  };
  resourceStore.addResource(newDialog);
  dialog.value = newDialog;
};

const handleDeleteDialog = (id: string) => {
  ElMessageBox.confirm("确定删除该对话吗？", "提示", {
    type: "warning",
  }).then(() => {
    resourceStore.removeResource(id);
    if (dialog.value?.id === id) {
      dialog.value = dialogList.value?.[0] || null;
    }
  });
};

const handleRenameDialog = (dialog: TextResource) => {
  ElMessageBox.prompt("请输入新的对话名称", "重命名", {
    inputValue: dialog.name || "",
  }).then(({ value }) => {
    dialog.name = value;
  });
};

const handleChat = async () => {
  if (!form.input) {
    ElMessage.warning("请输入提示词");
    return;
  }

  try {
    // 更新对话名称
    dialog.value.name = form.input.slice(0, 10) || "新对话";
    form.loading = true;

    if (!form.file) {
      messages.value.push({
        role: "user",
        content: form.input,
      });
    } else {
      const fileId = await openaiService.uploadFile(form.file);
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

    scrollBottom();

    const response = await openaiService.chat({
      messages: messages.value,
      thinking: form.thinking,
      stream: true,
    });

    messages.value.push({
      role: "assistant",
      content: "",
      reason: "",
    });

    for await (const chunk of response) {
      // @ts-expect-error
      const reason = chunk.choices[0].delta?.reasoning_content;
      const content = chunk.choices[0].delta?.content || "";
      if (reason) {
        messages.value[messages.value.length - 1].reason += reason;
      } else {
        messages.value[messages.value.length - 1].content += content;
      }
      scrollBottom();
    }
  } finally {
    form.loading = false;
    form.input = "";
    form.file = null;
  }
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

onMounted(() => {
  scrollBottom();
});
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
</style>
