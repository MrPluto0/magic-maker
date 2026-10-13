<template>
  <el-dialog
    :model-value="show"
    width="730"
    align-center
    :before-close="handleClose"
  >
    <div class="px-10" style="width: 700px">
      <div class="flex items-end">
        <div class="w-28 text-white text-xl tracking-wide">如 何 使 用</div>
        <div class="w-24 text-white text-sm tracking-wide">How To Use</div>
      </div>

      <el-divider class="w-2/3"></el-divider>

      <div class="h-[50vh] overflow-auto pr-4">
        <div class="space-y-6 text-white">
          <!-- 使用数据（真实统计） -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              📊 我的使用数据
            </h3>
            <div class="grid grid-cols-4 gap-4 text-sm">
              <div
                v-for="item in statItems"
                :key="item.label"
                class="stat-item text-center p-3 rounded-lg bg-gray-800/60 border border-gray-700"
              >
                <div class="text-2xl font-bold text-blue-300 mb-1">
                  {{ item.value }}
                </div>
                <div class="text-xs text-gray-300">{{ item.label }}</div>
              </div>
            </div>
          </div>

          <!-- 项目介绍 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              🎬 项目介绍
            </h3>
            <p class="text-sm text-justify leading-relaxed text-gray-200">
              MagicMaker
              是一款基于Web技术的多媒体创作平台，集成了视频编辑、音频处理、图像编辑和白板绘制等功能。
              支持多种媒体格式，提供直观的时间轴编辑界面，让您轻松创建专业级的多媒体内容。
            </p>
          </div>

          <!-- 主要功能 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              ✨ 主要功能
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="feature-item">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <span class="font-medium">视频编辑</span>
                </div>
                <p class="text-gray-300 text-xs ml-4">
                  支持多种视频格式，提供剪辑、合并、滤镜等功能
                </p>
              </div>
              <div class="feature-item">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  <span class="font-medium">音频处理</span>
                </div>
                <p class="text-gray-300 text-xs ml-4">
                  音频剪辑、音量调节、音效添加和字幕生成
                </p>
              </div>
              <div class="feature-item">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-primary-400 rounded-full mr-2"></span>
                  <span class="font-medium">图像编辑</span>
                </div>
                <p class="text-gray-300 text-xs ml-4">
                  图片处理、滤镜应用、尺寸调整和格式转换
                </p>
              </div>
              <div class="feature-item">
                <div class="flex items-center mb-2">
                  <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  <span class="font-medium">白板绘制</span>
                </div>
                <p class="text-gray-300 text-xs ml-4">
                  自由绘制、图形工具、协作编辑和导出功能
                </p>
              </div>
            </div>
          </div>

          <!-- 快速开始 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              🚀 快速开始
            </h3>
            <div class="space-y-3 text-sm">
              <div class="step-item flex items-start">
                <span
                  class="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"
                  >1</span
                >
                <div>
                  <div class="font-medium mb-1">上传媒体文件</div>
                  <p class="text-gray-300 text-xs">
                    在编辑器界面点击上传按钮，选择您的视频、音频或图片文件
                  </p>
                </div>
              </div>
              <div class="step-item flex items-start">
                <span
                  class="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"
                  >2</span
                >
                <div>
                  <div class="font-medium mb-1">添加到时间轴</div>
                  <p class="text-gray-300 text-xs">
                    将资源拖拽到时间轴对应的轨道上，支持视频、音频、图片和文本轨道
                  </p>
                </div>
              </div>
              <div class="step-item flex items-start">
                <span
                  class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"
                  >3</span
                >
                <div>
                  <div class="font-medium mb-1">编辑和调整</div>
                  <p class="text-gray-300 text-xs">
                    使用右侧面板调整属性，如音量、透明度、位置、滤镜等
                  </p>
                </div>
              </div>
              <div class="step-item flex items-start">
                <span
                  class="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5"
                  >4</span
                >
                <div>
                  <div class="font-medium mb-1">预览和导出</div>
                  <p class="text-gray-300 text-xs">
                    在预览窗口查看效果，满意后点击导出生成最终作品
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 操作技巧 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              💡 操作技巧
            </h3>
            <div class="space-y-2 text-sm">
              <div class="tip-item flex items-center">
                <span class="text-yellow-400 mr-2">▸</span>
                <span class="text-gray-200"
                  >使用
                  <kbd class="px-1 py-0.5 bg-gray-700 rounded text-xs"
                    >Space</kbd
                  >
                  键快速播放/暂停预览</span
                >
              </div>
              <div class="tip-item flex items-center">
                <span class="text-yellow-400 mr-2">▸</span>
                <span class="text-gray-200"
                  >拖拽时间轴上的元素可以调整位置和长度</span
                >
              </div>
              <div class="tip-item flex items-center">
                <span class="text-yellow-400 mr-2">▸</span>
                <span class="text-gray-200"
                  >右键点击轨道元素可以访问更多编辑选项</span
                >
              </div>
              <div class="tip-item flex items-center">
                <span class="text-yellow-400 mr-2">▸</span>
                <span class="text-gray-200"
                  >支持多选操作，按住
                  <kbd class="px-1 py-0.5 bg-gray-700 rounded text-xs"
                    >Ctrl</kbd
                  >
                  键选择多个元素</span
                >
              </div>
              <div class="tip-item flex items-center">
                <span class="text-yellow-400 mr-2">▸</span>
                <span class="text-gray-200"
                  >使用白板功能创建图解和标注，增强视频表现力</span
                >
              </div>
            </div>
          </div>

          <!-- 支持格式 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              📁 支持格式
            </h3>
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div class="format-category">
                <div class="font-medium text-green-400 mb-2">视频格式</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• MP4, WebM</div>
                  <div>• MOV, AVI</div>
                  <div>• OGG</div>
                </div>
              </div>
              <div class="format-category">
                <div class="font-medium text-blue-400 mb-2">音频格式</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• MP3, WAV</div>
                  <div>• AAC, FLAC</div>
                  <div>• OGG</div>
                </div>
              </div>
              <div class="format-category">
                <div class="font-medium text-primary-400 mb-2">图片格式</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• JPEG, PNG</div>
                  <div>• GIF, WebP</div>
                  <div>• SVG</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 系统要求 -->
          <div class="section">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              ⚙️ 系统要求
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-200 mb-2">推荐浏览器</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• Chrome 94+</div>
                  <div>• Edge 94+</div>
                  <div>• Firefox (部分功能)</div>
                </div>
              </div>
              <div>
                <div class="font-medium text-gray-200 mb-2">性能建议</div>
                <div class="text-xs text-gray-300 space-y-1">
                  <div>• 内存: 4GB+</div>
                  <div>• 硬盘: 2GB+ 可用空间</div>
                  <div>• 网络: 稳定连接</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 帮助信息 -->
          <div class="section border-t border-gray-600 pt-4">
            <h3 class="text-lg font-semibold mb-3 text-blue-300">
              🆘 需要帮助？
            </h3>
            <div class="text-sm text-gray-300 space-y-2">
              <p>如果您在使用过程中遇到问题，可以：</p>
              <div class="ml-4 space-y-1 text-xs">
                <div>• 查看控制台错误信息</div>
                <div>• 确保浏览器版本符合要求</div>
                <div>• 检查文件格式是否支持</div>
                <div>• 尝试刷新页面重新加载</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="my-8 text-right text-white text-xs leading-normal tracking-wide"
      >
        © 2024. MagicMaker
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useProjectState } from "@/stores/project";
import { useResourceState } from "@/stores/resource";
import { useTrackState } from "@/stores/track";
import { baseFps } from "@/data/track";
import { repoGetExportCount } from "@/db/projectRepo";

const props = defineProps<{
	show: boolean;
}>();
const emits = defineEmits(["update:show"]);

const handleClose = () => {
	emits("update:show", false);
};

// —— 使用数据聚合（来自 resource / project / track store 与 IDB meta） ——
const projectStore = useProjectState();
const resourceStore = useResourceState();
const trackStore = useTrackState();

const exportCount = ref(0);
onMounted(async () => {
	try {
		exportCount.value = await repoGetExportCount();
	} catch {
		exportCount.value = 0;
	}
});

const stats = computed(() => {
	const byType = resourceStore.getResourceStats();
	const resourceTotal =
		byType.video + byType.audio + byType.image + byType.text;
	// 项目列表内所有资源的时长合计（秒）
	let totalSeconds = 0;
	for (const p of projectStore.projectList) {
		for (const r of p.resources || []) {
			if (r.type === "video" || r.type === "audio") {
				totalSeconds += r.duration || 0;
			}
		}
	}
	const currentDuration = Math.round(
		trackStore.frameCount / baseFps,
	);
	return {
		projects: projectStore.projectList.length,
		resources: resourceTotal,
		trackSeconds: Math.max(totalSeconds, currentDuration),
		exports: exportCount.value,
	};
});

const statItems = computed(() => [
	{ label: "项目数", value: stats.value.projects },
	{ label: "素材数", value: stats.value.resources },
	{
		label: "素材总时长",
		value: `${stats.value.trackSeconds}s`,
	},
	{ label: "导出次数", value: stats.value.exports },
]);
</script>

<style scoped lang="less">
.item:nth-of-type(8) {
  img {
    margin-bottom: 8px;
  }
}

.section {
  margin-bottom: 24px;
}

.section:last-child {
  margin-bottom: 0;
}

.feature-item,
.format-category {
  padding: 12px;
  background-color: rgba(31, 41, 55, 0.5);
  border-radius: 8px;
  border: 1px solid #374151;
}

.step-item {
  padding: 8px 0;
}

.tip-item {
  padding: 4px 0;
}

kbd {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #374151;
  border: 1px solid #4b5563;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 自定义滚动条 */
.h-\[50vh\] {
  scrollbar-width: thin;
  scrollbar-color: #374151 #1f2937;
}

.h-\[50vh\]::-webkit-scrollbar {
  width: 6px;
}

.h-\[50vh\]::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.h-\[50vh\]::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 3px;
}

.h-\[50vh\]::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
