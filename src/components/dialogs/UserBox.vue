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
            <el-button type="primary" @click="handleSave"
              >保 存 信 息</el-button
            >
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="AI 设置" name="second">
        <div class="mt-2">
          <el-form label-width="100px" class="ai-settings-form">
          <el-form-item label="供应商：">
          	<el-select
          		v-model="providerKey"
          		class="w-full"
          		placeholder="选择模型供应商预设"
          		@change="applyPreset"
          	>
          		<el-option
          			v-for="p in PROVIDER_PRESETS"
          			:key="p.key"
          			:label="p.label"
          			:value="p.key"
          		/>
          	</el-select>
          </el-form-item>

          <el-form-item label="API 地址：">
          	<el-input
          		v-model="pageStore.aiSettings.baseUrl"
          		placeholder="OpenAI 兼容协议 baseURL，留空 = 站内 /api 代理"
          		clearable
          	>
          		<template #prefix>
          			<i class="i-mdi-link-variant text-gray-400" />
          		</template>
          	</el-input>
          </el-form-item>

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

            <el-form-item label="字幕模型：">
              <el-select v-model="pageStore.whisperSettings.model" class="w-full">
                <el-option
                  label="whisper-base（约 40-80MB，推荐）"
                  value="base"
                />
                <el-option
                  label="whisper-small（约 250MB，中文更准）"
                  value="small"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="模型源：">
              <el-select v-model="pageStore.whisperSettings.hfEndpoint" class="w-full">
                <el-option
                  label="自动探测（官方 → hf-mirror.com 镜像）"
                  value="auto"
                />
                <el-option label="huggingface.co（官方直连）" value="official" />
                <el-option label="hf-mirror.com（镜像，大陆推荐）" value="mirror" />
              </el-select>
            </el-form-item>
          </el-form>

          <div class="flex items-center gap-3 mt-1">
            <el-button size="small" :loading="testing" @click="testConnection">
              测试连接
            </el-button>
            <span
              v-if="testResult"
              class="text-xs"
              :class="testResult.ok ? 'text-green-600 dark:text-green-400' : 'text-red-500'"
            >
              {{ testResult.text }}
            </span>
          </div>

          <!-- 设置说明 -->
          <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-2">
              <i class="i-mdi-information-outline mr-1" />
              设置说明
            </h4>
            <ul class="text-xs text-gray-600 dark:text-gray-300 space-y-1">
              <li>• 本机接入 GLM Coding Plan：baseUrl 与 Key 全部留空即可（自动读 ~/.hermes/.env 的 GLM_API_KEY 走 /glm 代理）；其他供应商选预设或「自定义」手填 BYOK</li>
              <li>
                • 出于安全考虑，API
                Key 仅保存在当前会话内存中，不会写入本地磁盘，刷新页面后需重新填写
              </li>
              <li>• 请输入准确的模型ID，可在各供应商控制台查看</li>
              <li>
                • 文本模型用于对话生成、文本扩写等功能；图片模型用于 AI
                绘图功能；其他模型尚未支持。
              </li>
              <li>
                • 字幕模型（whisper）在本机浏览器内推理，音频不出本地；
                首次转写需下载模型（下载进度显示在对话工具卡），之后离线可用。
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import { usePageState } from "@/stores/page";
import type { IUser } from "@/types/user";

defineProps<{
	show: boolean;
}>();

const emits = defineEmits(["update:show"]);
const pageStore = usePageState();

const form = ref<IUser>({} as IUser);
const fileInputRef = ref<HTMLInputElement | null>(null);

/* --------------------- 模型供应商预设（OpenAI 兼容协议） --------------------- */

interface ProviderPreset {
	key: string;
	label: string;
	baseUrl: string;
	textModel: string;
	imageModel?: string;
}

const PROVIDER_PRESETS: ProviderPreset[] = [
	{
		key: "ark",
		label: "火山方舟（豆包）",
		baseUrl: "https://ark.cn-beijing.volces.com/api/v3",
		textModel: "doubao-seed-1-6-flash-250715",
		imageModel: "doubao-seedream-3-0-t2i-250415",
	},
	{
		key: "deepseek",
		label: "DeepSeek",
		baseUrl: "https://api.deepseek.com/v1",
		textModel: "deepseek-chat",
	},
	{
		key: "qwen",
		label: "通义千问（DashScope）",
		baseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
		textModel: "qwen-plus",
	},
	{
		key: "moonshot",
		label: "Moonshot Kimi",
		baseUrl: "https://api.moonshot.cn/v1",
		textModel: "moonshot-v1-8k",
	},
	{
		key: "zhipu",
		label: "智谱 GLM",
		baseUrl: "https://open.bigmodel.cn/api/paas/v4",
		textModel: "glm-4-flash",
	},
	{
		key: "openrouter",
		label: "OpenRouter",
		baseUrl: "https://openrouter.ai/api/v1",
		textModel: "openai/gpt-4o-mini",
	},
	{
		key: "ollama",
		label: "Ollama 本地",
		baseUrl: "http://localhost:11434/v1",
		textModel: "qwen2.5:7b",
	},
	{
		key: "custom",
		label: "自定义",
		baseUrl: "",
		textModel: "",
	},
];

const providerKey = ref("ark");

function applyPreset(key: string) {
	const p = PROVIDER_PRESETS.find((x) => x.key === key);
	if (!p) return;
	pageStore.aiSettings.baseUrl = p.baseUrl;
	if (p.textModel) pageStore.aiSettings.textModel = p.textModel;
	if (p.imageModel) pageStore.aiSettings.imageModel = p.imageModel;
}

/* ------------------------------ 测试连接 ------------------------------ */

const testing = ref(false);
const testResult = ref<{ ok: boolean; text: string } | null>(null);

async function testConnection() {
	const s = pageStore.aiSettings;
	if (!s.apiKey && s.baseUrl && !s.baseUrl.includes("localhost")) {
		testResult.value = { ok: false, text: "请先填写 API Key" };
		return;
	}
	testing.value = true;
	testResult.value = null;
	const started = Date.now();
	try {
		const { default: OpenAI } = await import("openai");
		const client = new OpenAI({
			dangerouslyAllowBrowser: true,
			apiKey: s.apiKey || "byok-proxy",
			baseURL: s.baseUrl || location.origin + "/glm",
		});
		await client.chat.completions.create({
			model: s.textModel,
			messages: [{ role: "user", content: "ping" }],
			max_tokens: 1,
		});
		testResult.value = {
			ok: true,
			text: `连接成功（${Date.now() - started}ms）`,
		};
	} catch (error) {
		const msg = error instanceof Error ? error.message : JSON.stringify(error);
		testResult.value = { ok: false, text: `连接失败：${msg.slice(0, 120)}` };
	} finally {
		testing.value = false;
	}
}

const handleSave = () => {
	// 本地模式：用户信息仅保存在当前会话内存中
	ElMessage.success("保存成功");
};

const handleClose = () => {
	emits("update:show", false);
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
		// 本地模式使用本地URL
		const localUrl = URL.createObjectURL(file);
		form.value.avatarUrl = localUrl;
		ElMessage.success("头像更新成功");
	}
};

onMounted(() => {
	form.value = {
		id: 1,
		username: "本地用户",
		nickname: "本地用户",
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
