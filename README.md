# Magic Maker 🎬✨

一个功能强大的多媒体内容创作平台，集成了AI生成、视频编辑、绘图功能，为创作者提供一站式的内容制作解决方案。

## 🚀 功能特性

### 核心功能
- 🎥 **专业视频编辑器** - 时间轴编辑、多轨道支持、实时预览
- 🤖 **AI 内容生成** - 文本对话、图像生成、智能助手
- 🎨 **交互式白板** - 基于 Excalidraw 的绘图和协作功能
- 📁 **项目管理** - 统一的项目和资源管理系统

### AI 能力
- 💬 **智能对话** - 支持多轮对话、上下文记忆、文件上传
- 🖼️ **图像生成** - 基于 OpenAI DALL-E 的图像创作
- 🎯 **深度思考模式** - AI 长思考链生成更优质内容
- ⚙️ **个性化配置** - 自定义 API 密钥和模型选择

### 媒体处理
- 🎬 **多媒体支持** - 视频、音频、图像、文本轨道
- 🎵 **音频处理** - 实时解码、音量控制、字幕渲染
- 📱 **Canvas 渲染** - 高性能实时预览和播放
- 📹 **视频导出** - 专业级视频合成和输出

## 🛠️ 技术栈

### 前端框架
- **Vue3** + **React** - 现代化响应式框架
- **TypeScript** - 类型安全的开发体验
- **Vite** - 极速构建工具
- **Element Plus** - 企业级 UI 组件库
- **UnoCSS** - 原子化 CSS 引擎

### 状态管理
- **Pinia** - Vue 官方状态管理库
- **数据持久化** - 本地存储和项目管理
- **OPFS API** - 原生浏览器文件存储系统

### 媒体处理
- **WebAV** (`@webav/av-cliper`, `@webav/av-canvas`) - 专业视频处理库
- **WebCodecs API** - 原生浏览器媒体编解码
- **Canvas API** - 2D/OffscreenCanvas 渲染

### AI 集成
- **OpenAI API** - GPT 模型和 DALL-E 图像生成
- **流式响应** - 实时 AI 回复体验

### 特殊集成
- **Excalidraw** - 通过 Veaury 集成 React 绘图组件
- **React 桥接** - Vue 中使用 React 组件的完美融合

## 📁 项目架构

```
magic-maker/
├── src/
│   ├── pages/              # 页面组件
│   │   ├── home/          # 主页 - 项目管理和导航
│   │   ├── editor/        # 视频编辑器 - 时间轴和媒体编辑
│   │   └── draw/          # 绘图页面 - 白板和创作工具
│   ├── components/        # 通用组件
│   │   ├── icons/         # 图标组件
│   │   ├── layout/        # 布局组件
│   │   └── dialogs/       # 对话框组件
│   ├── stores/            # Pinia 状态管理
│   │   ├── project.ts     # 项目数据和导出
│   │   ├── track.ts       # 时间轴轨道管理
│   │   ├── player.ts      # 播放器状态控制
│   │   ├── resource.ts    # 资源管理和AI内容
│   │   ├── draw.ts        # 绘图画布状态
│   │   └── user.ts        # 用户设置和认证
│   ├── class/             # 核心业务类
│   │   ├── CanvasPlayer.ts    # 画布播放器引擎
│   │   ├── AudioTrack.ts      # 音频轨道处理
│   │   ├── VideoTrack.ts      # 视频轨道处理
│   │   ├── ImageTrack.ts      # 图像轨道处理
│   │   ├── TextTrack.ts       # 文本轨道处理
│   │   └── OpenAI.ts          # AI 服务集成
│   ├── utils/             # 工具函数
│   │   ├── webcodecs.ts   # 媒体编解码器
│   │   ├── canvasUtil.ts  # Canvas 工具
│   │   ├── file.ts        # 文件处理
│   │   └── common.ts      # 通用工具
│   ├── types/             # TypeScript 类型定义
│   │   ├── project.d.ts   # 项目数据类型
│   │   ├── track.d.ts     # 轨道和媒体类型
│   │   ├── resource.d.ts  # 资源类型定义
│   │   └── ai.d.ts        # AI 相关类型
│   └── react_app/         # React 组件集成
│       └── whiteboard.tsx # Excalidraw 白板组件
└── packages/
    └── excalidraw/        # Excalidraw 集成包
```

## 🏗️ 核心架构

### 状态管理系统 (Pinia Stores)

#### Project Store (`project.ts`)
- **项目数据管理** - 统一的项目创建、保存、加载
- **视频导出** - 多轨道合成和输出功能
- **数据持久化** - 本地存储和云端同步

#### Track Store (`track.ts`)
- **时间轴管理** - 多轨道媒体片段编排
- **轨道操作** - 添加、删除、移动、裁剪
- **帧管理** - 基于30FPS的精确时间控制

#### Player Store (`player.ts`)
- **播放控制** - 播放、暂停、跳转功能
- **实时渲染** - Canvas画布同步更新
- **音频同步** - Web Audio API音频播放

#### Resource Store (`resource.ts`)
- **媒体资源** - 统一的文件和AI生成内容管理
- **类型支持** - 视频、音频、图像、文本资源
- **AI集成** - ChatGPT对话和DALL-E图像生成

### 媒体处理引擎

#### CanvasPlayer 类
```typescript
// 实时播放器核心
export class CanvasPlayer {
  // Canvas 渲染管道
  async #renderCanvas(tracks: Track[])

  // 音频渲染管道
  async #renderAudio(tracks: AudioTrack[])

  // 播放控制
  #play() / #pause()
}
```

#### Track 类层次结构
- **AudioTrack** - 音频解码、音量控制、字幕渲染
- **VideoTrack** - 视频帧解码、变换操作
- **ImageTrack** - 图像渲染、动画效果
- **TextTrack** - 文本绘制、字体样式

### AI 服务集成

#### OpenAI 服务类
```typescript
export class OpenAIService {
  // 聊天对话
  async chat(params: ChatParams): Promise<AsyncIterable<string>>

  // 图像生成
  async generateImage(params: ImageParams): Promise<ImagesResponse>

  // 文件上传
  async uploadFile(file: File): Promise<any>
}
```

## ⚙️ 开发指南

### 环境要求
- **Node.js** ≥ 18.0.0
- **pnpm** ≥ 8.0.0 (推荐包管理器)
- **现代浏览器** 支持 WebCodecs API

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd magic-maker

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview
```

### 开发命令

```bash
# 开发相关
pnpm dev          # 启动开发服务器 (热重载)
pnpm build        # 构建生产版本
pnpm preview      # 本地预览生产构建

# 代码质量
pnpm lint         # ESLint 代码检查
pnpm lint:fix     # 自动修复 ESLint 问题
pnpm type-check   # TypeScript 类型检查
```

### 项目配置

#### AI 服务配置
在用户设置中配置 OpenAI API：
- **API Key** - OpenAI API 密钥
- **Text Model** - 文本生成模型 (如 gpt-4)
- **Image Model** - 图像生成模型 (如 dall-e-3)

#### 开发环境配置
```typescript
// vite.config.ts - 主要配置
export default defineConfig({
  // Vue + React 双框架支持
  plugins: [
    vue(),
    veaury.vueToReact()
  ],

  // 开发服务器代理
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
```

## 🎯 使用场景

### 内容创作者
- **短视频制作** - 快速剪辑和AI辅助创作
- **教育内容** - 多媒体课程和演示制作
- **社交媒体** - 个性化内容批量生成

### 开发者
- **媒体应用** - 基于 WebAV 的专业媒体处理
- **AI 集成** - OpenAI API 的最佳实践示例
- **组件复用** - Vue + React 混合开发模式

### 企业应用
- **内容营销** - 品牌视频和图像素材制作
- **培训材料** - 企业内部教学内容
- **产品演示** - 交互式产品展示

## 🔧 技术细节

### 媒体处理流程
1. **文件上传** → Resource Factory 创建资源对象
2. **轨道创建** → 基于资源类型实例化对应 Track 类
3. **实时解码** → WebCodecs API 解码音视频
4. **Canvas 渲染** → OffscreenCanvas 多线程渲染
5. **音频同步** → Web Audio API 精确播放

### AI 功能实现
- **流式响应** - Server-Sent Events 实时显示
- **上下文管理** - 多轮对话历史存储
- **文件处理** - 支持图像、文档上传分析
- **思考模式** - Chain-of-Thought 推理展示

## 🤝 贡献指南

### 代码规范
- **TypeScript** - 严格类型检查，避免 `any` 类型
- **Vue 3** - 使用 Composition API 和 `<script setup>`
- **ESLint** - 遵循项目配置的代码风格
- **Prettier** - 统一代码格式化

### 提交规范
```bash
feat: 添加新功能
fix: 修复问题
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建配置更新
```

### 开发流程
1. Fork 项目并创建功能分支
2. 确保所有测试通过
3. 更新相关文档
4. 提交 Pull Request

## 📄 许可证

本项目采用 **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** 许可证。

### 许可证条款
✅ **允许的使用**：
- 🎓 **学习目的** - 用于教育和个人学习
- 🔧 **开源修改** - 可以修改和改进代码
- 🔄 **非商业分享** - 可以分享和重新分发
- 🧪 **研究开发** - 用于非商业性研究项目

❌ **禁止的使用**：
- 💰 **商业用途** - 不得用于任何商业目的
- 🏢 **企业项目** - 不得用于盈利性商业项目

📋 **要求**：
- 📝 **署名** - 必须注明原作者和来源
- 🔗 **相同许可** - 修改后的作品必须使用相同许可证
- 📢 **变更声明** - 如有修改需要明确说明

如需商业使用，请联系项目维护者获得授权。查看完整许可证内容请参考 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [WebAV](https://github.com/hughfenghen/WebAV) - 专业的 Web 媒体处理库
- [Excalidraw](https://excalidraw.com/) - 优秀的绘图工具
- [OpenAI](https://openai.com/) - 强大的 AI 能力支持
- [Element Plus](https://element-plus.org/) - 完善的 Vue 3 组件库

---

**Magic Maker** - 让创意变为现实 ✨