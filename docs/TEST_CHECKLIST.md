# 回归验证清单

> 执行环境：无头 Chrome（Playwright 驱动，`channel="chrome"`），dev server `pnpm dev --port 5175 --strictPort`。
> 最近执行：2026-11-07（W6 本地 ASR 链路整体移除，回归瘦身至 20 项全过，dist 43532KB→1700KB）。脚本：`scripts/reg_stage1.py`（无头驱动，通过 pinia store 驱动剪辑动作 + 快捷键路径，导出经 stub `showSaveFilePicker` 捕获字节；fixture 由 ffmpeg 自动生成）。
> 历史基线：2026-11-07 早（W6 三遗留修复，24 项全过 + 真模型 E2E）；2026-10-24（W4 收口，18 项全过）；2026-10-23（阶段一 W3 收口，17 项）；2026-10-13（P0-9，14 项 12 ✅）；2026-10-23 W1（19 项全过，D1 阻断 bug 修复）。

## 用例（20 项全过；#9/#10 随 Excalidraw 白板裁剪退役；#20/#21/#23/#24 随本地 ASR 移除下线）

| # | 步骤 | 预期 | 结果 | 备注 |
|---|------|------|------|------|
| 1 | 首页直达（W3 起 mock 登录已删，免登录进入） | 项目列表可见 | ✅ | |
| 2 | 新建项目 | store.project 就绪，IDB 写入 | ✅ | |
| 3 | 上传 3 类素材（视频/音频/图片） | 资源入列，OPFS 写入原文件 + 封面 | ✅ | opfs 5 个文件 |
| 4 | 素材添加到轨道 | 视频/图片/音频三条轨道生成 | ✅ | image 0-120 / video 0-61 / audio 0-30 |
| 8 | 纯净项目导出 mp4（stub 保存句柄） | 产出 mp4 字节 | ✅ | 180138 bytes |
| 13 | 撤销（undo）→ 播放 | 撤销后播放器正常逐帧推进 | ✅ | frame 0→39 |
| 15a | 分割视频轨（S，播放头 30 帧处） | 片段分裂为 2 段，offsetL/offsetR 正确 | ✅ | 左 [0,30) offsetR=31，右 [30,61) offsetL=30 |
| **15** | **分割 → 立即导出** | 导出成功（原 D1 阻断 bug） | ✅ | 180034 bytes；`Decoder.split` offsetR 裁剪修复（公式抽为 `splitClipBoundaries` 纯函数 + Vitest 锁定） |
| **16** | **分割 → undo → 导出** | 撤销回单段后导出成功，Track 原型方法完整 | ✅ | 180138 bytes；undo 插件两处缺陷已修（见 W1 记录） |
| 17a | 文本轨分割后 `combine()` 时长 | duration = (end-start)×帧时长，而非 frameCount | ✅ | 0.5s / 1.5s 两段均正确（原 D1b TODO） |
| **17** | **文本轨 → 导出** | 导出成功且文本时长正确 | ✅ | 180154 bytes |
| **18** | **undo → 导出 → 再 undo → 导出**（W4 序列化重建） | 分割后 undo 回单段、`combine` 原型方法完整，两次导出均产出字节；探针证实 undo 重建零重复解码 | ✅ | 180138 bytes ×2；decode 探针 calls +3/+3（video/image/audio 各一次），misses +0（全走 clipMap 缓存） |
| 6 | 保存（ctrl+s） | IDB 记录更新（3 资源/3 轨道线） | ✅ | W4 起 #18 的两次 undo 会回退掉文本轨，保存 3 线为预期 |
| 7 | 刷新页面恢复 | 项目/资源/轨道从 IDB+OPFS 重建 | ✅ | res=3, lines=3 |
| 5 | 剪辑：快进→分割(S)（快捷键路径） | 片段正确分裂 | ✅ | video 段数 1→2 |
| 11 | localStorage 占用 < 100KB | | ✅ | 53 bytes |
| 14 | 删除资源 | 列表移除 + OPFS 文件同步删除 | ✅ | |
| 12 | grep 无 `/tos` 残留 | 无命中 | ✅ | src/vite.config/vercel.json 均 0 命中 |
| 22 | 字幕段 diff 上轨（W6）：setSegments → 专用字幕行 | `type:'text' + main:false + isSubtitle` 行生成，TextTrack 挂 segmentId、文本/起止与段一致；改全局样式 fontSize 48 → 行内全部联动；段清空 → 行摘除 | ✅ | `src/class/subtitleView.ts` 幂等收敛（字幕体系保留，为云端 ASR 预留） |

## W6 本地 ASR 链路移除（2026-11-07，转写暂缓待云端方案）

用户决策：禁止前端 ASR 推理，W6/W6b 本地 whisper 链路整体下线；转写功能暂时不可用，未来接云端 ASR 再重建（不在本轮射程）。

1. **下线回归用例**：#20（PCM 提取管线）、#21（whisper worker 协议）、#23（HF 端点探测）随 `src/utils/audio.ts`、`src/class/whisperClient.ts`、`src/workers/` 删除而移除；#24（重转写可撤销）随 transcribe 工具移除（重转写入口不存在）——被测对象全部消失，非跳过。#22 字幕段上轨**保留**（subtitle store/字幕轨视图仍在役）。
2. **删除清单**：依赖 `@huggingface/transformers`/`onnxruntime-web`/`opencc-js`（t2s 繁→简为转写专用）；vite `selfhost-ort-wasm` 插件与 `dist/ort/`；`src/workers/whisper.worker.ts`、`src/class/whisperClient.ts`、`src/utils/audio.ts`（PCM 管线，无其他调用方）、`src/class/toolProgress.ts`（transcribe 进度登记，AgentToolCard 进度条一并移除）；agentTools 的 `transcribe` 工具（注册表 9→8，tools.json 重生成）；设置面板 base/small 档位与模型源（`whisperSettings`）；subtitlePost 的 t2s（`toSimplifiedText`/`toSimplifiedSegments` + 4 例单测）。
3. **保留清单（「文字即视频」地基 / 云 ASR 第一块砖）**：subtitle store segments 体系与转写基线（`ReplaceSegmentsCmd`/`markTranscribeBaseline`/`countSegmentEdits`，单测 tests/replace-segments.spec.ts 锁定）、subtitleView 字幕轨 diff 同步、subtitlePost 分段合并管线（碎段合并/长段切分/最小段宽/时间戳重建 + formatTranscript）、AudioAttr/字幕样式联动。
4. **回归脚本加固**：原 whisper worker 预热在无状态阶段消化了 vite 冷启动的按需优化 reload；移除后冷缓存首跑的导出预热 reload 会清掉未持久化内存态——脚本补「轨道被清空则重建素材/轨道」守卫（冷缓存 + 热缓存均 20/20 实测）。
5. **dist 体积**：43532KB（W6 含 ORT wasm 自托管 39.3MB）→ 1700KB（-96%），回到 W5 基线量级（1664KB）。

## W6 后续修复——三个验收遗留（2026-11-07）【历史记录，其中的本地转写链路已于同日移除，见上节】

1. **中文繁体输出 → 简繁转换**：转写链路在分段后处理前加 t2s（`src/utils/subtitlePost.ts` 的 `toSimplifiedSegments`，opencc-js **t2cn 子集构建**——只含繁→简词典约 109KB，动态 import 懒加载不进主包；无 CJK 文本跳过；加载失败退回原文）。后处理单测补 4 例繁→简用例（含实测形态「視頻裡的時間軸→视频里的时间轴」与端到端管线无繁体断言）。真模型 E2E（say 15.3s 中文口播）：base/small 输出均为繁体、t2s 后全简体；错字对比 base 3 处（對急/反體字/簡機工具）vs small 1 处（對極，即「对齐」），small 明显更准（详见回报）。设置面板 base/small 档位 W6 已齐备（设置项、worker MODEL_REPO、工具 schema 三处一致），本轮无补全项。
2. **重转写静默覆盖 → 可撤销 + 覆盖提示**：落段改走命令层 `ReplaceSegmentsCmd`（`replace_segments@1` 入注册表，undo 完整恢复替换前段落含命令层编辑）；subtitle store 增转写基线（`markTranscribeBaseline`/`countSegmentEdits`，会话内存活不持久化，O(n) id diff）；有编辑差异时工具卡进度行明示「将覆盖 N 处字幕编辑（可撤销）」、结果带 `overwrittenEdits`。快照层同步扩展：track store 的 undo serializer 把 `subtitles` 并入同一快照栈（`{trackList, subtitles}` 复合快照），Cmd+Z 一次回退轨道+字幕、不拆栈。transcribe 工具 danger query→write（工具卡「只读」→「可撤销」徽标，语义如实）。不做智能合并（明确不做）。
3. **DeleteRangeCmd keep-tail startFrame 真 bug 修复**：原实现保留尾部 `startFrame: s`，ripple 模式下因 `e-gap===s` 数值巧合掩盖了错误；**ripple=false（留空隙）模式下保留尾部起点错误地落在区间起点 s**（比正确值 e 提前 gap 帧，且可能早于段自身起点）。修复为 `startFrame: ripple ? e - gap : e`，失败单测复现后转绿（tests/delete-range.spec.ts 2 例：非波纹/波纹各一，undo 恢复一并锁定）。兄弟分支核过：keep-head（endFrame:s）、整删（remove）、区间右侧波纹左移（`startFrame>=e` 分支）公式均正确无同款问题。

## W6 本地 whisper 转写——agent 的耳朵（2026-11-05）【历史记录，该链路已于 2026-11-07 整体移除，见上】

`transcribe()` 工具（query 类，无需确认）落进注册表（共 9 个工具），链路：OPFS 原文件 → `extractPcm16kMono`（OfflineAudioContext 16k mono，transferable 入 worker）→ `whisper.worker.ts`（transformers.js 4.3.2，30s 窗口切片 + 逐窗进度/取消检查点）→ 中文分段后处理（碎段合并 <2s / 长段逗号切分 >8s / 最小段宽 0.6s / **时间戳塌缩重建**：whisper-base 首窗长文本压进极短 chunk 时按 6 字/秒重估时长）→ `subtitleStore.setSegments` → diff 同步专用字幕行（`subtitleView.ts`）。Vitest 14 例锁后处理纯函数（`tests/subtitle-post.spec.ts`）。

1. **中国网络三道保障**（均实测验证）：①模型源运行期探测 huggingface.co→hf-mirror.com（官方直连超时自动落镜像，24h 缓存，设置面板「模型源」可钉死）；②**模型下载经主线程 fetch 代理**——实测 hf-mirror 的 CDN 边缘对 worker 直发请求直接断连（net::ERR_FAILED、无响应），同 URL 主线程请求正常，故 worker 内 transformers.js 的 `env.fetch` 改道主线程代取回传（`{type:'fetch'}/{type:'fetch-result'}` 消息）；③ORT wasm 同源自托管——vite 插件把 onnxruntime-web 的 4 个 ort 文件挂 `/ort/`（dev 中间件流式读 + build 拷贝进 dist，并清理 bundler 冗余拷贝），worker 内抢先设 `ort.env.wasm.wasmPaths`（transformers.js 只在未设时才落 cdn.jsdelivr.net 默认，大陆不可达）。
2. **真实模型 E2E（无头 Chrome + Playwright 驱动，非协议 stub）**：macOS `say` 生成 41s 中文口播 mp4 → 上传落轨 → `transcribe({lang:'zh'})` → whisper-base q8 真实下载（hf-mirror，~55s 含下载）→ 15 段带时间码字幕（首窗时间戳塌缩经后处理重建为 0-22s 十段合理时间）→ 字幕行 15 个 TextTrack 全部上轨（segmentId 反向引用、全局样式 fontSize 40）→ 导出 mp4 1.3MB（字幕参与合成）。WebGPU 探测在 headless 下可用性不稳定，按计划走 wasm 回退路径实测。
3. **数据模型**：`SubtitleSegment + styleId`、全局 `SubtitleStyle`（承接并删除 `AudioTrack.subtitle: ISubtitle` 死配置与 AudioAttr 字幕面板、Decoder 的 EmbedSubtitlesClip 注释链路——不留两份事实）；subtitles 随项目 JSON 持久化（`saveProject/loadProject` 的 `subtitles` 字段，旧项目无此字段按空字幕处理）。
4. **设置/进度 UI**：AI 设置新增「字幕模型」（base/small 档位）与「模型源」两项（明暗双主题截图自检通过）；对话面板工具卡 running 态显示下载/转写相位进度条（`toolProgress` 模块，transcribe 入口登记）；转写全文入 LLM 链经 agentRuntime 既有 `truncateForContext(8000)` 统一截断，无确认旁路。
5. **dist 体积**：1664KB（W5 基线）→ 42430KB，其中 ORT wasm 自托管 39.3MB（wasm 推理必需，原本走 jsdelivr CDN 现同源化）；应用产物 2192KB（+528KB，whisper worker 懒加载 chunk 536KB 含 transformers.js，不进主包）。
6. **已知边界**：whisper-base 中文输出繁体（whisper 特性，简繁转换留 W8）；30s 窗口边界词可能被切（后处理合并兜底）；重新转写=整体替换段落（覆盖此前对字幕段的命令层编辑）。

## W4 undo 序列化重建（2026-10-24，修 D2）

撤销栈不再 `cloneDeep` 类实例快照（不类型安全、快照大、丢原型），改为纯数据序列化 + 重建：

1. **TrackData 纯数据投影**（`types/track.d.ts`）：平铺可序列化字段（resource 引用、offsetL/R、绘制/样式属性）；`src/utils/trackData.ts` 提供 `plainifyTrack(List)`（只取自有可枚举字段，方法/getter 不进快照）与 `rebuildTrack(List)`（工厂/资源解析器注入，纯函数可单测，`tests/track-data.spec.ts` 10 例）。
2. **插件 serializer 接入**（`installPiniaPlugin.ts`）：按 store 的 `undo.serializer` 注入 `{ serialize, deserialize, restore }`；栈里存 serialize 产物（JSON 字符串），恢复优先走 `restore`（track store 侧调 `loadTrackData` 重建类实例），缺省仍 `$patch`。抑制订阅的布尔标记升级为 `suppressDepth` 计数（重建含异步段且触发多次同步 mutation）。`_undo/_redo/_resetStack` 接口、热键、栈深 20、500ms 去抖均不变。
3. **重建链路共用**：`loadTrackData` 重构为复用 `rebuildTrackList`，项目恢复（IDB 草稿）与 undo 走同一条 `createTrack → decode → Object.assign → 重挂资源` 链路；快照 id 回填，片段身份在 undo 前后稳定。
4. **解码复用验证**：reg #18 探针钩 `decoder.decode`，两次 undo 共 6 次 decode 调用全部命中 `clipMap`（misses +0），无重复 OPFS 读/解码。

## W1 修复（2026-10-23）

1. **D1 分割后导出失败**：恢复 `Decoder.split` 的 offsetR 收尾裁剪；帧数公式抽成纯函数 `splitClipBoundaries`（`src/utils/track.ts`）并加 Vitest 单测（`tests/split-clip-boundaries.spec.ts`，7 例）。
2. **D1b 文本轨导出时长错误**：`TextTrack.combine` 的 duration 改用 `end-start`；删除 TextTrack 的 `[k:string]:any` 索引签名，`BaseTrack` 显式声明 `offsetL/offsetR`。
3. **D1c 水印 sprite 双加**：删除 `exportVideo` 里多余的 `com.addSprite(watermark)`。
4. **D5 播放时钟定步长漂移**：`CanvasPlayer.#play` 改为 rAF + `audioContext.currentTime` 时间基准反推帧号，音画同源。
5. **undo 插件两处缺陷**（#16 回归暴露）：
   - `_undo/_redo` 用 `$patch` 把栈内快照按引用并入 state，undo 后再编辑会原地改写历史快照，导致后续 undo 永久失效 → 应用快照前 `cloneDeep`；
   - `preventUpdateOnSubscribe` 标记在 patch 未触发订阅时（快照与当前状态相同）永不复位，后续所有变更被抑制、undo 栈停摆 → patch 后同步复位。
   （undo 的类实例快照模型本身按计划在阶段二 W4 重构为序列化重建，本轮不做。）

## W2 依赖升级（2026-10-23）

Vue 3.5.44 / Vite 8（rolldown，构建 30s→4s）/ pinia 4 / @webav/av-cliper 1.2.8 / element-plus 2.14.7 / vue-tsc 3 / vitest 5；卸载 vite-plugin-vue-devtools；vue-router 保持 4.x（5.x 破坏性大版本不跟）。升级后回归 + typecheck + build 全绿。

## W3 功能裁剪（2026-10-23）

- **删 Excalidraw 白板**：`packages/excalidraw`、`src/pages/draw`、`src/react_app`、`stores/draw.ts`、`plugins/installExcalidraw.ts`、`/draw` 路由与入口；`saveProject` 移除 `drawData` 字段（旧项目数据中的 drawData 忽略不迁移）；react/react-dom/veaury 依赖卸载，vite.config 显式接入 `@vitejs/plugin-vue`（原先由 veaury 隐式提供）。
- **删 PSD 导入**：`src/utils/psd.ts`、`@webtoon/psd`。
- **删录屏**：`components/dialogs/Recorder.vue`（recorder-core 保留，语音合成录音仍用）。
- **删 mock 登录/注册/配额**：`stores/user.ts`、`LoginBox/RegisterBox/UsageBox.vue`、路由登录门禁；头部登录按钮移除，产品介绍占位「即将上线」，用户盒保留本地资料表单与 AI 设置（BYOK）。
- **dist 体积**：11436 KB（基线 3519866）→ 3448 KB，**-69.8%**（验收线 ≥40%）。

## W3.5 后台播放修复（2026-10-23）

W1 时钟改 rAF 后，标签页/窗口隐藏时 rAF 完全停摆 → 帧不走、音频不排程，后台播放无声。修复：`CanvasPlayer` 监听 `visibilitychange`，前台 rAF 满帧率推进、隐藏时切 `setInterval`（1000/baseFps）兜底；帧号仍从 audioContext.currentTime 反推，音画同源不变。探针验证：切后台 2s 帧号 28→96 且音频持续调度，回前台/暂停行为正常。

## 已知问题（非阻断）

1. 偶发 `generate thumbnails aborted`：缩略图生成被刷新/撤销打断时的 WebAV 内部 abort，无功能影响。
2. 保存的项目 JSON 中 resource.url 为运行期 blob: URL（刷新后经 `loadResources` 从 opfsKey 重建，不影响恢复）。

## 双浏览器说明

验证环境为 Chromium 内核无头 Chrome。Edge 同为 Chromium 内核，OPFS/WebCodecs/IndexedDB 行为一致；建议发布前在 Edge 真机人工过一遍 #7/#15/#16/#17。
