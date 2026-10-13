# Magic Maker 重构方案（Portfolio + 软著双目标）

> 调研基准：commit `e92270f feat: 更新模块`（工作区改动：`vite.config.ts` 注释了 VitePluginVueDevtools）。
> 源码规模：`src/` 约 1.1 万行（不含 `packages/excalidraw` 第三方打包副本）。
> 目标：A. 对外可展示的 portfolio 项目（在线 demo + 面试可讲）；B. 软著申请材料（源码前 60 页 + 操作手册）。
> 约束：不真调付费 API（接入层 + mock），不引入重后端，纯前端。

---

## 0. 架构现状（调研结论）

### 0.1 技术栈与入口

| 层 | 技术 | 位置 |
|---|---|---|
| 框架 | Vue 3.2 + TS 4.7 + Vite 5 + pnpm 10 | `package.json` |
| UI | Element Plus（unplugin 自动导入）+ UnoCSS 66 | `vite.config.ts`, `uno.config.ts` |
| 状态 | Pinia + persistedstate（localStorage）+ 自研 undo 插件 | `src/plugins/installPiniaPlugin.ts` |
| 路由 | vue-router hash 模式，3 页：`/home` `/editor` `/draw`，全局守卫在 `src/plugins/installRouter.ts` | |
| React 桥 | veaury `applyPureReactInVue`，**全项目仅 1 处**：`src/pages/draw/index.vue:56`（VWhiteboard） | |
| React 部分 | `src/react_app/`：`whiteboard.tsx`（Excalidraw 封装 + PSD 上传 + 字体注入 + 3 个自定义 action 注册）、`generateMood.tsx`（AI 生图 UI，前端模式已 stub）、`actions/{partRedraw,extendDraw,styleRedraw}.tsx`（从 React action 弹 Vue 组件的混合写法） | |
| Excalidraw | **本地打包副本** `packages/excalidraw/`（dist + assets + d.ts，alias `@pkg`），不可 npm 升级，绑定 React 18 | `src/plugins/installExcalidraw.ts` 设置 `EXCALIDRAW_ASSET_PATH` |
| 媒体引擎 | **`@webav/av-cliper`（WebCodecs），不是 ffmpeg.wasm** —— 全仓库 grep 无 ffmpeg。解码 `MP4Clip/AudioClip/ImgClip`，导出 `Combinator` | `src/class/Decoder.ts`, `src/stores/project.ts:exportVideo` |
| 播放器 | **自研 CanvasPlayer**（canvas bitmaprenderer + AudioContext 手动排程 + `preciseInterval`），未用 `@webav/av-canvas` | `src/class/CanvasPlayer.ts`, `src/pages/editor/components/player/Player.vue` |
| 存储 | OPFS（`opfs-tools`）存媒体二进制；localStorage 存项目元数据/轨道/画板 JSON | `src/utils/file.ts`, 各 store 的 `persist` |

### 0.2 核心数据流

```
上传/生成 → ResourceFactory.createFromFile (src/class/ResourceFactory.ts)
           → 原文件写 OPFS (writeFileToOPFS)，Resource 元数据进 resource store
拖入轨道 → trackStore.createTrack (src/stores/track.ts) → new VideoTrack/ImageTrack/AudioTrack/TextTrack (src/class/*Track.ts)
         → decoder.decode(track)：从 OPFS 读流 → Clip（WebCodecs 解码器，缓存在 clipMap）
播放 → playerStore.playStartFrame 驱动 → CanvasPlayer 每帧对 playingTracks 逐个 decoder.tick() 画到 canvas；音频走 AudioContext
导出 → projectStore.exportVideo：所有 track.combine() → OffscreenSprite → Combinator 合成 → mp4（带 /public/logo.png 水印）
项目持久化 → saveProject 把 resources/trackData/drawData 塞进 project JSON → pinia persist 到 localStorage
绘图页 → Excalidraw(React) ↔ drawStore(src/stores/draw.ts)（elements/files 双向），PSD 导入经 src/utils/psd.ts（@webtoon/psd）
```

### 0.3 Store 职责表

| Store | 文件 | 职责 | 持久化 | 问题 |
|---|---|---|---|---|
| user | `src/stores/user.ts` | 纯前端 mock 登录/注册（任意账密），authInfo/localStorage | ✔ | 无真鉴权需求，OK |
| project | `src/stores/project.ts` | 项目 CRUD、导入导出 JSON、`exportVideo` 合成、30s/60s 自动保存 | ✔ localStorage | **projectList 整包（含资源元数据、轨道、画板）塞 localStorage**，5MB 上限；含 blob: URL 死链 |
| track | `src/stores/track.ts` | 轨道行/片段增删改、拖拽吸附、分割/复制/对齐、重叠检测（`src/utils/track.ts`）、undo watch | undo 栈在内存 | `trackScale` 直接读裸 localStorage；undo 用 cloneDeep 恢复会**丢失 Track 类原型方法**（见风险 R5） |
| resource | `src/stores/resource.ts` | 资源列表、按类型查询、OPFS URL 重建（`loadResources`） | ✘（随 project 持久化） | `removeResource` 不清 OPFS 文件（泄漏） |
| player | `src/stores/player.ts` | 播放帧指针、播放/暂停、快进快退、画布尺寸自适应首个视频/图片资源 | ✘ | 深度 watch trackList，性能隐患 |
| draw | `src/stores/draw.ts` | Excalidraw 场景代理：加素材/模板/分镜、PSD 文本替换、场景保存恢复 | ✔ localStorage（files/eles） | **`saveDrawData` 给手绘图片生成 blob: URL 存进持久化数据，刷新即死链**（P0 主修点） |
| page | `src/stores/page.ts` | 布局尺寸、暗色、**aiSettings（apiKey 明文 persist）** | ✔ | apiKey 明文落盘 |

### 0.4 外部 API 调用点盘点（全部）

生产/开发环境的“后端”实为**火山方舟（Ark / doubao）的 OpenAI 兼容接口**，经代理转发，key 由用户在设置里自填（BYOK）：

| # | 调用点 | 目标 | 通道 |
|---|---|---|---|
| 1 | `src/class/OpenAI.ts`（单例 `openaiService`，`dangerouslyAllowBrowser`，baseURL=`location.origin + "/api"`） | ark chat / images / files | dev: `vite.config.ts` proxy `/api → https://ark.cn-beijing.volces.com/api/v3`；prod: `vercel.json` rewrite |
| 2 | `src/pages/editor/components/generate/template/TextGenerate.vue:301,316` | `uploadFile` + `chat`（流式，含 reasoning_content） | 同上 |
| 3 | `src/pages/editor/components/generate/template/ImageGenerate.vue:65` | `generateImage`（doubao-seedream） | 同上 |
| 4 | `src/utils/proxy.ts` + `src/utils/file.ts`（`fetchToBase64`/`urlToFile`/`writeFileToOPFS` 均过 `proxyUrl`） | `/tos → ark-content-generation-v2...volces.com`（生成图片的 TOS 下载地址防盗链） | dev proxy + vercel rewrite |

结论：**没有残留的“已失效私有后端”调用** —— 原作者已把 10 处功能降级为前端 stub（grep “前端模式下暂不/暂无”，共 24 处命中，列表见 §1.2）。剩余活的外部依赖只有 Ark API + TOS 下载，两者都吃代理且需真 key。

### 0.5 已验证的工程现状

- `pnpm build` ✅ 16s 通过（纯 vite build，**无 vue-tsc 类型检查**），警告多个 >500KB chunk，最大 `index-nmq00Dh5.js` 2.0MB（Excalidraw 主体）。
- `pnpm dev` ✅（devtools 插件注释规避了 `@vue/devtools-kit@7.7.7` 的 Node 端 localStorage 崩溃）。
- 依赖疑点：`@types/react@19` 配 `react@18.2`；`@vitejs/plugin-react`、`@vitejs/plugin-vue-jsx` 在 `vite.config.ts` 中**未被引用**（veaury 插件自带 JSX 处理），疑似可删；`qrcode` 在 src 中无引用；`vue-clipboard3`/`wavesurfer.js`/`vue3-moveable` 在用。

---

## 1. 功能盘点

### 1.1 完整可用 ✅

| 功能 | 链路 |
|---|---|
| 项目管理 | 新建/重命名/删除/切换/导入导出 JSON：`src/pages/home/*` + `src/stores/project.ts` |
| 素材上传 | 视频/音频/图片/文本，大小校验、视频封面帧：`src/pages/editor/components/resource/UploadContainer.vue` → `ResourceFactory` → OPFS |
| 时间轴剪辑 | 多轨（video/image/audio/text）、拖拽吸附、分割(S)、复制粘贴、左对齐(l)、删除、重叠自动换行、缩放、缩略图、波形：`src/pages/editor/components/track/**` |
| 播放器 | canvas 逐帧渲染 + 音频排程、空格/左右键、选中高亮与 Moveable 变换（`PlayerMoveable.vue`）、属性面板联动（位置/缩放/音量/文本样式：`attribute/template/*Attr.vue`） |
| 导出 | WebCodecs 合成 mp4 + 水印，File System Access 保存（`project.ts:exportVideo`） |
| 快捷键/撤销 | `src/plugins/installHotKey.ts` + 自研 undo 插件（ctrl+z / ctrl+shift+z） |
| 绘图页 | Excalidraw 白板、本地素材/PSD 模板导入（`MaterialContainer.vue`、`TemplateContainer.vue`、`src/utils/psd.ts`）、中英文字体注入、图形裁剪替换（`src/utils/cropper.ts`）、30s 自动保存 |
| 登录/设置 | mock 登录、AI 设置表单（`src/components/dialogs/UserBox.vue:88`）、暗色主题 |
| AI 文本对话 + AI 生图 | **在填入真实 Ark key 时可用**（依赖 vite/vercel 代理），生成结果自动入库为资源：`TextGenerate.vue`、`ImageGenerate.vue` |

### 1.2 半成品（UI 在、逻辑 stub）——共 10 项 24 处

| 功能 | 文件 | 现状 |
|---|---|---|
| 语音合成(TTS)/音色克隆 | `src/pages/editor/components/generate/template/SpeechGenerate.vue:154,162` | ElMessage stub；录音功能本身可用但产物没接资源库；**另有 bug：模板引用了 store 上不存在的 `resourceStore.speechList`（undefined）** |
| AI 音乐 | `AudioGenerate.vue:73` | stub |
| 图生视频/文生视频 | `VideoGenerate.vue:121,123`、`ImageAttr.vue:74` | stub（上传本地视频可用） |
| 局部重绘/扩图/风格迁移 | `src/react_app/actions/partRedraw.tsx`、`src/pages/draw/components/tools/{MaskRedraw,ExtendDraw,StyleRedraw}.vue` | Vue 弹窗 UI 完整，提交处 stub |
| 白板 AI 生图 | `src/react_app/generateMood.tsx:31` | toast stub |
| 素材重新生成 | `ImageAttr.vue:70`、`AudioAttr.vue:101` | stub |
| 在线素材库/在线模板 | `src/pages/draw/components/MaterialContainer.vue:116-122`、`TemplateContainer.vue:36` | toast stub（本地素材可用） |
| 用量面板 | `src/components/dialogs/UsageBox.vue`（350 行） | 静态展示，无数据源 |
| 字幕嵌入 | `src/class/Decoder.ts` 大段注释代码 | 半废弃 |
| 头像上传 | `src/components/dialogs/UserBox.vue:205` | blob URL 不持久化，刷新丢失 |

### 1.3 与新目标的适配结论

1. **核心卖点成立**：纯前端 WebCodecs 视频剪辑器 + Excalidraw 集成（veaury 混合架构）本身就是面试可讲的两个硬核点。
2. **演示最大障碍**：刷新后项目数据半瘫（blob: 死链 + localStorage 膨胀）——必须先做 P0。
3. **AI 演示**：在线 demo 不能要求访客填 key → P2 的 mock 模式是 demo 可用性的前提。

---

## 2. 分阶段任务清单

工作量单位：人日（有效编码日）。总量约 **P0: 6~8d，P1: 4~6d，P2: 6~8d，P3: 3~4d**，合计 19~26d（约 4~5 周业余时间）。

### P0 清债：数据层本地化 IndexedDB + 剥离死代码（预估 6~8d）

目标：刷新不丢、不炸 localStorage、无假功能入口。这是 demo 和软著演示的地基。

| # | 任务 | 涉及文件 | 估时 |
|---|---|---|---|
| P0-1 | 新建 IndexedDB 薄封装 `src/db/idb.ts`（原生 IDB 或 `idb` 库，2 store：`projects`（项目 JSON）、`meta`），提供 `loadProjects/saveProject/deleteProject/getBlob/putBlob` | 新增 `src/db/idb.ts`、`src/db/projectRepo.ts` | 1d |
| P0-2 | `project` store 持久化切到 IDB：去掉 `persist: { storage: localStorage }`，改为启动时 hydrate（`init()` 已有挂载点）+ 保存时 debounce 写 IDB；`projectList` 大对象不再进 localStorage | `src/stores/project.ts` | 1.5d |
| P0-3 | 修 draw 死链：`saveDrawData` 中手绘图片改写 OPFS（`writeFileToOPFS(ele.fileId, ...)`），`customData.url` 存 OPFS key；`initContent` 经 `readUrlFromOPFS` 重建 | `src/stores/draw.ts`（saveDrawData/initContent） | 1d |
| P0-4 | 修 resource 生命周期：`removeResource` 同步删 OPFS 文件与封面；Resource 元数据增加 `opfsKey` 字段替代裸 blob url 持久化 | `src/stores/resource.ts`、`src/class/ResourceFactory.ts`、`src/types/resource.d.ts` | 1d |
| P0-5 | 剥离 `/tos` 链路：`proxyUrl` 仅对 http(s) 外链重写（本地 blob/OPFS 直读）；`vite.config.ts`、`vercel.json` 删 `/tos` 代理 | `src/utils/proxy.ts`、`src/utils/file.ts`、`vite.config.ts`、`vercel.json` | 0.5d |
| P0-6 | apiKey 不再明文持久化：`page.ts` 的 `persist.pick` 剔除 `aiSettings`，或改为 sessionStorage + 设置弹窗声明“仅本地保存”；README 加安全说明 | `src/stores/page.ts`、`src/components/dialogs/UserBox.vue` | 0.5d |
| P0-7 | 修已知小 bug：`SpeechGenerate.vue` 引用不存在的 `resourceStore.speechList`（改本地 ref 传入）；`track.ts` 裸 `localStorage.trackS` 收敛到 page store；删调试残留 `window.api`（`draw.ts`）、`window.clearTrack`（`track.ts`） | 对应文件 | 0.5d |
| P0-8 | UsageBox 改真数据：资源数/项目数/轨道时长/导出次数（从 resource/project store 聚合） | `src/components/dialogs/UsageBox.vue`、`src/stores/resource.ts:getResourceStats` | 0.5d |
| P0-9 | 回归验证清单：建项目→传 4 类素材→剪辑→保存→**刷新恢复**→导出 mp4→draw 画图→刷新恢复 | 手动 + 新增 `docs/TEST_CHECKLIST.md` | 0.5d |

验收标准：双浏览器（Chrome/Edge）刷新后项目、资源、画板完整可用；localStorage 占用 < 100KB；grep 无 `/tos`。

### P1 现代化：依赖升级 / Vite 清理 / biome 全量（预估 4~6d）

| # | 任务 | 说明 | 估时 |
|---|---|---|---|
| P1-1 | biome 全量格式化基线 | `pnpm biome format --write src packages/excalidraw/types`（现在仓库内 tab/空格混用，两套风格）；统一 `biome.json` 规则（quote 风格、行宽）；`format`/`lint` script 扩到全 src | 0.5d |
| P1-2 | 提交钩子 | `simple-git-hooks` + `lint-staged`（biome check 对 staged 文件），避免重构期间格式回潮 | 0.5d |
| P1-3 | TS 4.7 → 5.x + `vue-tsc` 升级 | tsconfig `moduleResolution: bundler`；新增 `pnpm typecheck` script；先修 `src/types/**` 与 store 的类型错误（预计 30~60 处，`@ts-expect-error` 清理） | 1.5~2d |
| P1-4 | Vite 配置清理 | 移除未使用依赖 `@vitejs/plugin-react`、`@vitejs/plugin-vue-jsx`、`qrcode`、`@types/webpack-env`；修复 `@types/react@19` 与 `react@18` 的错配（锁 @types/react@18） | 0.5d |
| P1-5 | 产物瘦身 | `build.rollupOptions.manualChunks`：`excalidraw`（含 react/react-dom/veaury）、`element-plus`、`webav`、`openai` 分包；Excalidraw 路由级懒加载已是页面级，确认 draw 页 chunk 独立 | 1d |
| P1-6 | vite 5.4.x 补丁升级；评估 vite 6/7 | veaury vite 插件对 vite 6 的兼容性需实测（`veaury/vite/esm/index.mjs`），不兼容则锁 5.4 并记录原因 | 0.5~1d |
| P1-7 | devtools 恢复实验 | 升级 `vite-plugin-vue-devtools` 至修复版后解除 `vite.config.ts` 注释，崩溃则保留注释并记录 issue 链接 | 0.5d |
| P1-8 | CI | GitHub Actions：`pnpm i --frozen-lockfile && pnpm biome ci . && pnpm typecheck && pnpm build`；失败红绿灯即 portfolio 门面 | 0.5d |

验收标准：`biome ci` + `typecheck` + `build` 三绿；首屏 JS（home 页）< 1.2MB raw。

### P2 AI 能力：接入层 + mock + 生成进轨道（预估 6~8d）

设计原则：一个接口、两个实现（`volcengine` 真 BYOK / `mock` 零依赖），UI 只依赖接口；所有生成产物统一走 `resourceStore.createResource` 入库，即可拖入轨道/画板。

| # | 任务 | 涉及文件 | 估时 |
|---|---|---|---|
| P2-1 | 定义接入层接口 `src/services/ai/types.ts`：`AIClient { chat(req): AsyncIterable<ChatChunk>; generateImage(req): Promise<Blob>; listModels?(): string[] }`；`src/services/ai/index.ts` 工厂按 `pageStore.aiSettings.provider` 分发 | 新增目录 `src/services/ai/` | 1d |
| P2-2 | 迁移真实现：现 `src/class/OpenAI.ts` → `src/services/ai/volcengine.ts`（保留 OpenAI SDK 协议、thinking/reasoning_content、watermark:false 等 Ark 特有参数），删除旧 class | 迁移 + `TextGenerate.vue`/`ImageGenerate.vue` 改依赖注入 | 1d |
| P2-3 | mock 实现 `src/services/ai/mock.ts`：chat → 预置文案分段流式（300ms/段）；generateImage → 离屏 canvas 按 prompt hash 生成渐变占位图 + 文字水印 → Blob。零网络依赖，在线 demo 默认此模式 | 新增 | 1.5d |
| P2-4 | 设置 UI 加 provider 开关（`mock` / `volcengine`）与连接测试按钮 | `src/components/dialogs/UserBox.vue`、`src/stores/page.ts` | 0.5d |
| P2-5 | 生成素材一键入轨：ImageGenerate/AudioGenerate/VideoGenerate 结果卡片加“添加到轨道”按钮 → `trackStore.createTrack(res, playerStore.playStartFrame)` + `addTrack`；TextGenerate 选中回复片段 → `addText` 定制文本轨道 | `generate/template/*.vue`、`src/stores/track.ts`（如需暴露辅助函数） | 1d |
| P2-6 | 白板 AI 生图（generateMood.tsx）接 mock：占位图经 `drawStore.addMaterial` 落画板 | `src/react_app/generateMood.tsx` | 0.5d |
| P2-7 | 风格迁移/重绘的“假实现”（可选加分项）：`StyleRedraw.vue` 用 canvas filter（像素化/油画/灰度）处理选中图后 `replaceFile` 回画板——演示效果完整且诚实标注为本地滤镜 demo | `src/pages/draw/components/tools/*.vue` | 1d |
| P2-8 | TTS mock：SpeechGenerate 用 Web Speech API（`speechSynthesis`）录不到流，则退化为预置 mp3 占位资源入库；修复 `resourceStore.speechList` 引用 | `SpeechGenerate.vue` | 0.5~1d |
| P2-9 | AI 使用埋点计数（供 UsageBox 与演示故事线）：生成次数存 `src/db/idb.ts` 的 meta store | 各生成组件 | 0.5d |

验收标准：断网状态下在线 demo 全部 AI 按钮有可见产出且可进轨道；填真 key 时与现状行为一致。

### P3 对外：README / 部署 / 演示物料（预估 3~4d）

| # | 任务 | 说明 | 估时 |
|---|---|---|---|
| P3-1 | README 重写（大纲见 §3） | 双语或中文为主+英文特性列表；架构 mermaid 图；GIF 首屏 | 1d |
| P3-2 | 部署：**推荐 GitHub Pages**（零成本、`gh-pages` 依赖与 `deploy` script 已就位、hash 路由 + `base:"./"` 天然兼容；OPFS/SharedArrayBuffer 无需特殊 header）。Vercel 作为备选（`vercel.json` 已有，但若 P0-5 后无 rewrite 需求，Pages 更省心）。注意：`showSaveFilePicker` 仅 Chromium → README/demo 页标注“请用 Chrome/Edge” | `package.json:deploy`、仓库 Settings→Pages | 0.5d |
| P3-3 | demo 引导横幅：首次进入提示 mock 模式、浏览器要求、示例项目一键加载（内置一个示例 project JSON 进 `public/sample-project.json`，home 页“载入示例”按钮） | `src/pages/home/index.vue`、`src/stores/project.ts:importProject` | 1d |
| P3-4 | 演示 GIF 脚本（见 §3.3）+ 录制（Kap/Screen.studio）+ 压缩（ffmpeg/gifsicle <10MB） | `docs/assets/` | 1d |
| P3-5 | 面试叙事文档（不公开）：三个深挖点——WebCodecs 播放器为什么自研、veaury 双框架桥的坑（样式/事件/context）、OPFS+IDB 分层存储设计 | `docs/INTERVIEW_NOTES.md` | 0.5d |

### §3.1 README 重写大纲

```
# Magic Maker — 纯前端 AI 视频创作工作台
[demo badge] [CI badge] [demo GIF]
- 一句话：浏览器里的"AI 生成 + 多轨剪辑 + 白板绘制"三合一，无后端、数据全本地
- ✨ 特性：WebCodecs 多轨时间轴 / Excalidraw 白板(veaury 桥接 React) / AI 生成(BYOK 或 mock) / OPFS+IndexedDB 本地存储 / mp4 导出
- 🚀 快速开始：pnpm i && pnpm dev；在线 demo 链接；浏览器要求（Chrome/Edge ≥ 102）
- 🤖 AI 模式说明：mock（默认，离线可用）vs volcengine（自备 Ark key，设置面板填入）
- 🏗️ 架构：mermaid 图（页面/store/媒体管线/存储四层）
- ⌨️ 快捷键表（空格/←→/S/L/T/Ctrl+C/V/Z/S）
- 📐 技术决策：为什么不用 ffmpeg.wasm、为什么自研 CanvasPlayer、veaury 取舍
- 🗺️ Roadmap：字幕轨道、转场、协作、移动端
- 📄 License: Apache-2.0
```

### §3.2 在线 demo 部署清单

1. P0-5 后从 `vercel.json` 删除全部 rewrite（无代理需求）→ 二选一：
   - **GitHub Pages（推荐）**：`pnpm add -D gh-pages`（已有）→ `pnpm build && pnpm deploy`；或 Actions 内 build 后推 `gh-pages` 分支；确认 `vite.config.ts` 的 `base: "./"` 保持。
   - Vercel：import 仓库即可，删除无用的 rewrite 后 vercel.json 只留 `$schema`。
2. Pages 域名下验证清单：Excalidraw assets 加载（`installExcalidraw.ts` 走 `/assets/` 分支）、OPFS 可写、mock AI 全链路、导出下载。
3. 仓库 About 填 demo 链接 + topics（`vue3` `webcodecs` `excalidraw` `video-editor` `ai`）。

### §3.3 演示 GIF 脚本（约 45~60s，1280×800，5 幕）

| 幕 | 时长 | 操作 | 讲解字幕 |
|---|---|---|---|
| 1 | 8s | home 页 → 载入示例项目 → 进入 editor | “浏览器里的多轨剪辑器，数据全在本地” |
| 2 | 12s | AI 面板输入 prompt → mock 生图 → 点“添加到轨道” | “AI 生成直接落轨（mock 模式，也可接真实模型）” |
| 3 | 12s | 拖动素材对齐吸附 → 按 S 分割 → Ctrl+V 复制 → 空格播放 | “吸附、分割、快捷键，Canvas 逐帧渲染” |
| 4 | 10s | 选中视频 → 属性面板改缩放/位置 → Moveable 拖拽 | “属性联动 + 框选变换” |
| 5 | 10s | 导出 mp4（展示保存对话框）→ 切 draw 页画两笔 → PSD 模板导入 | “WebCodecs 合成导出；Excalidraw 白板无缝集成” |

---

## 3. 软著申请材料清单（与 P0~P3 并行度低，可最后集中 3~4 天）

### 3.1 申请材料总表

| 材料 | 要求 | 本项目落点 |
|---|---|---|
| 软件著作权登记信息表 | 软件全称+版本号（V1.0）、开发完成日、发表状态 | 建议定名“魔法创作平台软件 V1.0”（与 README 名一致） |
| 程序鉴别材料 | 源程序**前 30 页 + 后 30 页，每页 ≥50 行**（共 60 页，约 3000 行）；页眉含软件名+版本号+页码 | 见 §3.2 选源策略 |
| 文档鉴别材料 | 操作手册或设计说明书，≤60 页，每页有页眉页码 | 见 §3.3 手册大纲 |
| 身份证明 | 个人申请：身份证复印件；杭州 E 类认定通常要求原件扫描 | — |

### 3.2 源码文档整理步骤（目标 60 页 / ~3000 行）

1. **排除**：`packages/excalidraw/**`（第三方 Apache-2.0 打包副本，混入会稀释原创性且审核可能质疑）、`node_modules`、`auto-imports.d.ts`、`components.d.ts`、`pnpm-lock.yaml`、`dist`。
2. **选源顺序**（原创密度优先，前 30 页=核心算法，后 30 页=核心 UI）：
   - ① `src/class/`：`CanvasPlayer.ts`、`Decoder.ts`、`VideoTrack.ts`、`AudioTrack.ts`、`TextTrack.ts`、`ImageTrack.ts`、`ResourceFactory.ts`（自研媒体引擎，最能体现创造性）
   - ② `src/stores/`：`track.ts`、`project.ts`、`resource.ts`、`draw.ts`、`plugins/installPiniaPlugin.ts`（undo 栈）、`plugins/installHotKey.ts`
   - ③ `src/utils/`：`track.ts`、`canvasUtil.ts`、`cropper.ts`、`psd.ts`、`stack.ts`、`file.ts`
   - ④ `src/react_app/whiteboard.tsx`、`actions/partRedraw.tsx`（自行编写的部分，Excalidraw import 行可保留）
   - ⑤ 组件层：`track/item/TrackList.vue`、`Player.vue`、`player/PlayerControl.vue`
3. **去注释噪音**：删除大段注释掉的死代码（如 `Decoder.ts` 字幕段、`player.ts` TODO 块）——P0 顺手清理，同时提升“程序完整性”观感。
4. **排版脚本**：写一次性脚本 `docs/scripts/build-copyright.mjs`：按上述清单拼接源码 → 每页 50 行分页 → 输出 docx/pdf（页眉：`魔法创作平台软件 V1.0  第 X 页 共 Y 页`）；等宽字体、保留缩进。代码量足够时**确保前 60 页全部来自 src 原创代码**，避免触及第三方。
5. **核对**：页数=60、每页行数≥50、无空页、文件清单与提交版本一致；在 `docs/COPYRIGHT_MANIFEST.md` 记录入选文件与行数。

### 3.3 操作手册大纲（目标 40~50 页，截图 ≥30 张）

```
1. 软件概述（功能定位、运行环境：Chrome/Edge、分辨率建议）
2. 安装与启动（Node 20+、pnpm install、pnpm dev、构建部署）
3. 登录与账号（注册/登录表单演示、本地模式说明）
4. 项目管理（新建/重命名/删除/导入/导出 JSON，截图每步）
5. 编辑器总览（五区布局图：生成区/上传区/播放器/属性区/轨道区，可拖拽分隔条）
6. 素材管理（本地上传 4 类素材、AI 生成文本/图片、生成结果入库）
7. 时间轴编辑（拖入轨道、吸附、分割 S、复制粘贴、左对齐 L、删除 Backspace、轨道缩放、缩略图与波形）
8. 播放与属性调整（播放控制、快捷键表、视频/图片/音频/文本各自的属性面板逐项截图）
9. 视频导出（导出流程、水印说明、保存位置）
10. 绘图工作台（白板工具、本地素材拖入、PSD 模板导入、字体、局部重绘/风格迁移入口、保存到项目）
11. 数据存储与隐私（OPFS/IndexedDB 说明、数据清除方法）
12. 常见问题（浏览器兼容、大视频内存、AI key 配置、刷新恢复）
附录：快捷键速查表、目录结构说明
```

### 3.4 软著与重构的顺序建议

P0 完成后立即冻结一版打 tag（如 `v1.0-software-copyright`），以该 tag 生成鉴别材料 —— 保证材料、demo、仓库三者版本一致；P1~P3 的改动进入 V1.1 或不另申请。

---

## 4. 风险与难点（按严重度排序）

| # | 风险 | 说明 | 缓解 |
|---|---|---|---|
| R1 | **Excalidraw 本地副本不可升级** | `packages/excalidraw` 是打包产物（2MB 主 chunk + assets），绑 React 18；`@types/react@19` 与其错配已埋雷。升级 React/依赖可能破坏白板页 | P1 只动 @types 版本不动 react；长期方案是换 npm `@excalidraw/excalidraw` 包重写 `src/react_app/whiteboard.tsx` 的 3 个自定义 action 注册方式（工作量大，列为 V1.1） |
| R2 | **draw 数据恢复链路脆弱**（P0-3 的坑） | Excalidraw 的 `files`（dataURL base64）+ `customData.url`（现在写死 blob:）双轨存储，恢复顺序（先 updateScene 后 addFiles）不对就白屏/图丢；P0-3 必须配套刷新回归 | 引入 OPFS key 单一事实源；`docs/TEST_CHECKLIST.md` 固化刷新用例 |
| R3 | **undo 栈对 class 实例失效** | `installPiniaPlugin.ts` 用 `cloneDeep` 快照 `trackList`（元素是 VideoTrack 等类实例）；恢复后原型方法（`combine/pause`）丢失，导出/播放可能静默坏 | P0-9 回归覆盖 undo→export；必要时快照只存可序列化数据 + 恢复时 `createTrack` 重建（已有 `loadTrackData` 同构逻辑可复用） |
| R4 | 浏览器兼容面窄 | WebCodecs、OPFS、File System Access（导出保存）均为 Chromium 系特性；Safari/Firefox 演示会翻车 | README + demo 横幅声明 Chrome/Edge；探测降级提示（`'showSaveFilePicker' in window`） |
| R5 | Ark 代理在 Pages 下不存在 | 若选 GitHub Pages，`/api` 无 rewrite，BYOK 模式会 CORS 失败（Ark 不允许浏览器直连） | 方案 a：demo 固定 mock 模式（推荐，符合“不真调付费 API”约束）；方案 b：保留 Vercel 部署；BYOK 真调用仅限本地 dev |
| R6 | pinia persistedstate → IDB 的异步 hydrate | 路由守卫（`installRouter.ts`）在 hydrate 完成前判断 `projectStore.project` 会误判“未选项目” | hydrate 完成前挂 loading 屏或守卫 await ready promise |
| R7 | 软著审核对第三方依赖敏感 | 源码里混 Excalidraw 打包产物/自动生成文件可能被要求补正 | §3.2 选源策略 + manifest 留痕 |

## 5. 里程碑建议

- **W1~W2**：P0 全部 + P1-1/2（格式化基线）→ 打 tag `v1.0-software-copyright`，启动软著材料整理（§3）
- **W3**：P1 剩余 + P2-1~4（接入层 + mock）
- **W4**：P2-5~9 + P3-1~3 → demo 上线
- **W5**：P3-4/5 收尾 + 软著材料定稿提交
