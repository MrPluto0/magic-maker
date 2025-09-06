<template>
  <div class="w-full h-full overflow-hidden flex flex-col items-center gap-4">
    <!-- 对话列表区 -->
    <template v-if="messages.length === 0">
      <div
        class="flex-1 w-full flex flex-col justify-center items-center text-gray-400 select-none"
      >
        <el-button type="primary">创建第一个对话吧~</el-button>
      </div>
    </template>

    <template v-else>
      <div class="flex-1 w-full flex flex-col mt-4 overflow-auto gap-4">
        <div
          v-for="(item, index) in messages"
          :key="index"
          class="chat-item text-sm"
          :class="'chat-item-' + item.role"
        >
          <!-- 头像区 -->
          <div class="avatar">
            <i
              v-if="item.role === 'system' && !item.loading"
              class="i-mdi-robot"
            />
            <i
              v-if="item.role === 'system' && item.loading"
              class="i-mdi-loading animate-spin"
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
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";
import { useResourceState } from "@/stores/resource";
import { TextResource } from "@/types/resource";
import { usePageState } from "@/stores/page";

const { toClipboard } = useClipboard();
const resourceStore = useResourceState();
const pageStore = usePageState();

const fileInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
  loading: false,
  input: "",
  file: null as File | null,
  messages: [],
});

const messages = computed(() => {
  const dialogs = resourceStore.getResourcesByType("text") as TextResource[];
  return dialogs?.[0]?.messages || [];
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

const handleTextExpand = () => {
  if (!form.file && !form.input) {
    ElMessage.warning("请输入文字或上传文件");
    return;
  }

  if (form.input) {
    form.messages.push({
      role: "user",
      content: form.input,
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

  form.input = "";
  form.file = null;
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
</style>
