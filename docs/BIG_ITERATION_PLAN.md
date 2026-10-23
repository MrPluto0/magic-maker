# Magic Maker 大迭代方案（BIG ITERATION PLAN）

> 基线：commit `3519866`（工作区干净，`pnpm typecheck` 零错误）。
> 前置阅读：`docs/REFACTOR_PLAN.md`（架构调研）、`docs/TEST_CHECKLIST.md`（14 项无头回归，12 ✅）、`~/Documents/Research/magic-maker-roadmap.md`（上一轮产品化评估）。
> 本篇定位：**大升级**——技术栈升级、结构性重构、功能重做、新功能全部在射程内；按「每个晚上一小块」的业余节奏排 8 周里程碑，每周有可演示产出。

---

## 0. 一句话目标

把「能跑的 WebCodecs 剪辑 Demo」升级为 **「浏览器本地 AI 字幕剪辑器：口播视频拖进来，字幕自动出、AI 一句话出剪辑计划、改文字就是改视频、mp4 直接导，素材永不上传」**——一个开源 core + 托管 Pro（BYOK）的垂直产品，Chrome/Edge 专用，不做通用剪辑器。产品形态是 **Descript 手动改字 + Agent 一句话剪辑共用同一套编辑命令层**：命令层既是转写面板的手，也是 agent 的工具集。

---

## 1. 现状基线（以实际代码为准）

### 1.1 工程健康度

| 项 | 状态 | 证据 |
|---|---|---|
| typecheck | ✅ 零错误 | `pnpm typecheck`（vue-tsc 2.2 / TS 5.6） |
| 构建 | ✅ 通过 | vite build 16s，最大 chunk 2.0MB（Excalidraw 本地副本） |
| 数据层 | ✅ IndexedDB | `src/db/idb.ts`、`src/db/projectRepo.ts`（P0 重构已落地） |
| 规范化 | ✅ biome + git-hooks | `biome.json`、simple-git-hooks + lint-staged |
| 回归 | ⚠️ 14 项中 12 过 | 已知问题 #1 即 D1 阻断 bug |

### 1.2 媒体链路真实形态（全部亲手核对过）

```
上传 → ResourceFactory.createFromFile → OPFS (opfs-tools)
落轨 → trackStore.createTrack (src/stores/track.ts:119) → VideoTrack/AudioTrack/ImageTrack/TextTrack (src/class/*Track.ts)
     → decoder.decode()：OPFS 读流 → MP4Clip/AudioClip/ImgClip，缓存在 clipMap (src/class/Decoder.ts:16)
播放 → CanvasPlayer (src/class/CanvasPlayer.ts)：preciseInterval 定步长 playStartFrame++ 驱动
     → 每帧对 playingTracks 逐个 decoder.tick() 画 OffscreenCanvas → bitmaprenderer 上屏
     → 音频 AudioTrack.play() 取 PCM → AudioContext 排程 (CanvasPlayer.ts:99-133)
导出 → projectStore.exportVideo (src/stores/project.ts:208-286)：track.combine() → OffscreenSprite
     → Combinator 合成 → mp4（强制 /logo.png 水印）
持久化 → saveProject：resources/trackData/drawData 全进 IDB；undo 走自研 Pinia 插件 (src/plugins/installPiniaPlugin.ts)
```

### 1.3 阻断级与高危问题（本次必须先清）

| # | 问题 | 精确定位 | 后果 |
|---|---|---|---|
| **D1** | **分割后导出失败**：`split()` 只裁 `offsetL`，右半段 `offsetR` 裁剪整段被注释 | `src/class/Decoder.ts:138-139` | Combinator 报 `"time" out of bounds`，**核心剪辑动作断裂，上线阻断** |
| D1b | 分割文本轨导出错位：`combine()` duration 用 `frameCount` 而非 `end-start`，`TODO：需要支持裁剪` | `src/class/TextTrack.ts:180-184` | 分割/裁剪过的文本轨导出时长错误 |
| D1c | 导出时水印 sprite **被添加了两次**：`sprites.unshift(watermark)` 后又 `com.addSprite(watermark)` | `src/stores/project.ts:252,268` | 潜在渲染异常/资源浪费（重构导出管线时一并清除） |
| D2 | undo 栈 `cloneDeep` 快照类实例，恢复后丢原型方法（`combine/pause` 变 undefined） | `src/plugins/installPiniaPlugin.ts:49` | 撤销后导出可能静默坏（回归只测了 undo→播放，未测 undo→导出） |
| D5 | 播放时钟是定步长 `playStartFrame++`，源视频 fps 存了不用 | `src/class/CanvasPlayer.ts:142-147`、`src/data/track.ts`（baseFps=30 全局） | 60fps 素材丢帧感；长素材音画漂移 |
| D4 | 每帧 `new OffscreenCanvas` + 深度 watch 全 trackList | `src/class/CanvasPlayer.ts:77`、`31-39` | 长播放 GC 压力 |
| D6 | 解码/渲染全在主线程 | `src/class/Decoder.ts` 全文 | 大分辨率/长素材卡 UI |

### 1.4 已有的可复用资产（大升级的地基，不要推翻）

- **Track 三方法协议**（`draw/tick/combine`）+ `loadTrackData` 同构重建逻辑（`src/stores/track.ts:269-308`）——它是 undo 重构和文本剪辑的现成轮子。
- **字幕钩子已预留**：`AudioTrack.subtitle: ISubtitle` 完整配置在（`src/class/AudioTrack.ts:41-49`）、`draw()` 与 `Decoder.ts:57-72` 的 `EmbedSubtitlesClip` 链路被注释、`project.ts:222-224` 字幕 sprite 注释——前任作者开了头，我们接上。
- **BYOK AI 通道**：`src/class/OpenAI.ts` + dev proxy / vercel rewrite，chat/生图已通。
- **OPFS/IDB 存储分层**、**重叠检测/吸附**（`src/utils/track.ts`）、**热键体系**（`installHotKey.ts`）。

---

## 2. 核心决策（大升级方向，8 条）

1. **第一周只干一件事：清阻断级 bug（D1/D1b/D1c）+ 补 undo→导出回归。** 大重构建立在「分割→导出」这条最小主链路可信的基础上。
2. **技术栈升级但不动 UI 框架**：Vue 3.2→3.5、Vite 5→7、`@webav/av-cliper` 1.2.1→1.2.8（npm latest，无大版本）、引入 **Vitest** 给纯逻辑建立单测（重叠检测、SRT 解析、分割公式、编辑命令）。Element Plus / UnoCSS 保留——换 UI 库是纯负收益。
3. **不做播放器引擎迁移，做时钟校准**：评估过 `@webav/av-canvas` 整体替换自研 CanvasPlayer，收益是统一 sprite 模型，但会推翻 `Track` 三方法协议和全部回归基线；改为保留自研播放器，把时钟改为 `audioContext.currentTime` 时间基准（D5），`OffscreenCanvas` 复用（D4）。av-canvas 迁移降级为 P2 实验。
4. **undo 从「cloneDeep 快照」重构为「序列化数据 + loadTrackData 重建」**（修 D2）：Track 类实例不进撤销栈，只进可序列化的 `TrackData`；恢复时走现成的重建链路。这是文本剪辑命令层的前置。
5. **AI 字幕 = 本地 whisper（transformers.js WASM，WebGPU 可选）跑在 Web Worker**，数据不出浏览器；字幕以 `SubtitleSegment` 纯数据为唯一事实源，时间轴上的 `TextTrack` 只是视图。**文本剪辑（Descript 模式）是它的直接延伸**，也是产品护城河。
6. **导出管线重写**：进度（chunk 计数近似）+ 取消（AbortController）+ 分辨率/fps/码率参数 + 水印改可关角标；同时顺手把 `Decoder.split` 公式和 `TextTrack.combine` 裁剪修对。导出 Worker 化列为 P2。
7. **功能裁剪：白板、PSD、录屏、假登录全部删除，产品只留一条线**（素材进 → 时间轴 → AI 字幕 → 文字/agent 剪辑 → 导出）。判断标准：凡不在「字幕剪辑」主线上的功能，每留一个都在给构建体积、依赖升级、代码阅读持续付税——Excalidraw 白板是构建产物最大单一来源（11MB dist 里占大头）且拖着独立的 drawData 持久化链路，PSD 导入服务设计师而非口播用户，Recorder 录屏是另一个产品，mock 登录/配额 UI（`stores/user.ts`、`LoginBox/RegisterBox/UsageBox.vue`）服务一个不存在的后端。全砍，W2 执行（赶在依赖升级前缩小升级面），`drawData` 字段从 `saveProject` 移除（旧项目数据忽略即可，不做迁移）。强制水印改可关角标见决策 6。
8. **红线**：Chrome/Edge only（首屏横幅明示）；不碰账号系统；不做 Safari/Firefox/移动端；P2 之前不新增任何需要垫付 GPU 成本的云功能。

---

## 3. 关键技术设计

### 3.1 阻断 bug 修复：分割裁剪（D1/D1b/D1c）

**根因**：`splitTrack`（`src/stores/track.ts:239-264`）分割时给右半段设置 `offsetL = splitFrame - target.start + target.offsetL`、`offsetR` 保持原值；但 `Decoder.split()` 只对 `offsetL` 做了 `originClip.split(start)[1]`，`offsetR` 的收尾裁剪被注释（`Decoder.ts:138-139`）。右半段 clip 的时长超出 `end-start`，Combinator 的 `spr.time.duration` 小于 clip 实际可播放区间时直接越界。

**修复设计**（恢复注释逻辑并修正公式）：

```ts
// Decoder.split() 恢复：
const end = (frameCount - offsetR - offsetL) * UnitFrame2μs; // 右半段在 clip 本地坐标系里的有效长度
return offsetR === 0 ? clip : (await clip.split(end))[0];
```

要点：
- `offsetL/offsetR` 的语义是「相对素材原点的裁剪帧数」，`clip.split()` 返回的 `[0]` 段长度 = `end`，需 `await clip.ready` 后再返回；对 `offsetL===0 && offsetR===0` 的快路径保持现状。
- **文本轨**没有 clip，在 `TextTrack.combine()`（`TextTrack.ts:168-191`）把 `duration: this.frameCount * UnitFrame2μs` 改为 `(this.end - this.start) * UnitFrame2μs`，并删掉 `[k: string]: any` 索引签名（`TextTrack.ts:53`）让它进类型检查。
- **水印双加**：`project.ts:268` 的 `com.addSprite(watermark)` 删除（unshift 进 sprites 已含它）。
- **回归**：TEST_CHECKLIST 新增 #15「分割视频→立即导出成功」、#16「分割文本轨→导出后文本时长正确」、#17「undo→导出成功」。把 `Decoder.split` 的帧数公式抽成纯函数（如 `src/utils/track.ts` 里的 `splitClipBoundaries(offsetL, offsetR, frameCount)`）用 Vitest 锁住。

### 3.2 播放时钟与渲染（D5/D4，小改大收益）

- `CanvasPlayer.#play()`（`CanvasPlayer.ts:136-148`）：废弃 `preciseInterval(() => playStartFrame++, 1000/baseFps)` 的帧计数驱动，改为单一 rAF 循环 + 时间基准推算：

```ts
const startWall = this.audioContext.currentTime - playStartFrame / baseFps;
// 每帧 rAF：
playStartFrame = Math.round((this.audioContext.currentTime - startWall) * baseFps);
```

音频仍在 AudioContext 时钟上排程，视频帧号从同一时钟反推，音画天然同源。暂停/seek 时重置 `startWall`。
- `#drawCanvas`（`CanvasPlayer.ts:77`）：`OffscreenCanvas` 提为实例字段复用（尺寸变化时重建），消除每帧分配。
- 深度 watch（`31-39`）改为监听 `frameCount` + `playStartFrame` + 一个手动触发的 `revision` 计数（由 track 编辑动作 bump），避免拖拽属性时全量重渲染。

### 3.3 文档模型重构：undo 序列化重建（D2）

现状 `installPiniaPlugin.ts:49` 的 `cloneDeep` 把 `VideoTrack` 等类实例快照进栈，undo 后 `$patch` 回来的对象丢原型，`combine/pause` 变 undefined。

**设计**：撤销栈只存可序列化的 `TrackData`（纯数据），恢复时经 `loadTrackData` 重建类实例：

```ts
// types/track.d.ts 新增（Track 的纯数据投影）
interface TrackData extends Omit<BaseTrack, never> { /* 平铺全部可序列化字段 */ }
```

- `removeOmittedKeys` 的 serializer 改为：`serialize = (trackList) => JSON.stringify(plainTrackList)`；`deserialize` 后调用 `trackStore.loadTrackData(data)`（`src/stores/track.ts:269-308`，已实现同构重建：`createTrack` → `Object.assign` → 重绑 resource），替代 `$patch`。
- `loadTrackData` 会重发 `decoder.decode`，需要 `decoder.clipMap` 按 `resource.id` 复用已解码 clip（已有），确保 undo 不重复解码。
- 代价：undo 一次 = 整轨重建，几十个片段内无感；收益：类型安全（顺带删 `BaseTrack` 的 `[k: string]: any`，`track.d.ts:14`）、文本剪辑命令层可以直接复用同一重建链路。
- 插件层做成 `serializer: { serialize, deserialize }` 可注入（接口已预留，`installPiniaPlugin.ts:40-45`），Pinia 插件不动架构。

### 3.4 AI 字幕：whisper wasm 选型 + Worker + 字幕数据模型 ★核心卖点

**选型：`@huggingface/transformers`（npm latest 4.x，transformers.js 官方继任包），不用 whisper.cpp wasm。**

| 维度 | transformers.js | whisper.cpp wasm |
|---|---|---|
| 时间戳 | `return_timestamps: true` 原生返回段级时间戳，长音频 `chunking` 内置 | 要自己拼 token→时间映射 |
| 模型分发 | HF CDN，浏览器 Cache API 自动缓存，零自建 | 需自托管 wasm + ggml 模型 |
| 中文效果 | whisper-base/small 多语言即可用 | 同模型但集成成本高 |
| WebGPU | `device: 'webgpu'` 一行可选加速 | 无 |

模型档位：默认 `onnx-community/whisper-base`（q8 量化，约 40-80MB 下载，首次后离线可用）；设置面板提供 `whisper-small`（约 250MB，中文更准）档位；`device` 探测 WebGPU 成功则用，失败回退 wasm。

**Worker 设计**（新文件 `src/workers/whisper.worker.ts`，Vite `new Worker(new URL(...), { type: 'module' })`）：

```
主线程 → Worker:  { type: 'load',    model: 'base'|'small', device?: 'webgpu' }
                  { type: 'asr',     pcm: Float32Array(16k mono), lang?: 'zh'|'auto' }
                  { type: 'cancel' }
Worker → 主线程:  { type: 'progress', phase: 'download'|'transcribe', value: 0..1 }
                  { type: 'segments', segments: { text, startSec, endSec }[] }
                  { type: 'error', message }
```

- **PCM 提取**：`AudioTrack.play()` 已能拿到 48k 双声道 PCM（`AudioTrack.ts:87-109`）；但字幕需要整段而非逐帧。路径：OPFS 读文件 → `AudioContext.decodeAudioData` → `OfflineAudioContext` 重采样到 16k mono → 一个 `Float32Array` 传给 Worker（transferable，零拷贝）。
- **分段策略**：transformers.js 的 chunk 输出已带句级时间戳；中文后处理做三件事：① 按标点合并 <2s 的碎段；② >8s 的长段在逗号处二次切分；③ 最小段宽 0.6s，避免闪烁。

**字幕轨数据模型**（字幕的唯一事实源是纯数据，不是轨道）：

```ts
// src/types/subtitle.d.ts
interface SubtitleSegment {
  id: string;              // nanoid
  text: string;
  startFrame: number;      // 项目时间轴帧
  endFrame: number;
  styleId?: string;        // 引用全局字幕样式
}
interface SubtitleStyle { fontSize; fontColor; strokeSize; strokeColor; bottomOffset; fontFamily; } // 直接对齐 AudioTrack.ts:17-25 的 ISubtitle
```

- 新 store `src/stores/subtitle.ts`：`segments: SubtitleSegment[]`、全局 `SubtitleStyle`、`activeAudioTrackId`。随项目 JSON 持久化（进 `ProjectData.subtitles`，`src/stores/project.ts:saveProject` 加一字段）。
- **时间轴视图**：`segments` 变更 → diff 后增删对应的 `TextTrack`（落在专用字幕轨行，`TrackLineItem.type` 扩一个 `"text"` 复用即可，字幕行打 `main:false + isSubtitle` 标记）；每个 TextTrack 挂 `segmentId` 反向引用。文本轨渲染直接用现成 `TextTrack.draw()`（`TextTrack.ts:105`），底边定位用 `bottomOffset` 换算 `centerY`。
- **样式联动**：改全局样式 → 遍历字幕行 TextTrack 批量更新字段——把 `AudioTrack.subtitle: ISubtitle` 这份死配置的语义搬到 `SubtitleStyle`，`AudioTrack` 上的旧字段随本次重构删除，不留两份事实。
- **播放期渲染**：W5 先用「字幕行上的 TextTrack」自然获得逐帧绘制；`Decoder.ts:57-72` 的 `EmbedSubtitlesClip` 注释链路**正式废弃删除**（不复活，Canvas 方案已覆盖）。

### 3.5 编辑命令层（Descript 模式 + Agent 工具集，同一层）★护城河

**原则**：所有文本驱动的剪辑都编译成对时间轴的**命令**，命令直接操作 `trackStore` 现有原语（`splitTrack/removeTrack/leftLink/copyTrack` 已全部存在），不发明新剪辑语义。**这层命令同时是 Agent 的工具集（toolset）**——从第一天就按「给 LLM 调用」设计：可序列化（JSON in/out）、可批量、每个命令带人类可读的意图描述与完整参数 schema，人用是 Descript 手动改字，AI 用就是 agent 剪辑。

```ts
// src/class/commands.ts
interface EditCommand { label: string; do(): Promise<void>; undo(): Promise<void>; }
class DeleteSpeechRangeCmd implements EditCommand {   // 删除转写区间 = 波纹删除
  // do: 1) 对与区间相交的每个轨道片段在边界处 splitAt（推广 track.ts:239 的 splitTrack 为纯函数 splitAt(line, index, frame)）
  //     2) 整段落入区间的片段 removeTrack
  //     3) 区间右侧同轨片段整体左移 gapWidth（复用 leftLink 的位移逻辑，批量化）
  //     4) 同步删除/截断 subtitleStore.segments（文本与画面同删）
  // undo: 反序执行记录的逆操作（每个原子步骤记 inverse）
}
class UpdateSegmentTextCmd { /* segmentId + newText → 更新 segment → 同步 TextTrack.text（无时长变化，undo 换回旧文本） */ }
class MergeSegmentsCmd { /* 相邻两段合一，时间轴合并两段 TextTrack */ }
```

- **命令栈**替代 3.3 的快照 undo？不——**双层**：快照 undo 保留为全局兜底（Cmd+Z 不变）；命令层的 undo 用逆操作（更精确、不会因重建抖动）。转写面板内的操作走命令层，时间轴上的手操走快照层。
- **Agent 可调用约束（从 W1 起生效的设计红线）**：每个命令额外提供 `toJSON()/fromJSON()` 与参数 JSON Schema（`intent` 字段写人话，如"删除 00:12.3-00:18.0 区间并波纹收拢"）；命令列表天然构成一份工具清单（后续 agent 的 system prompt 素材）。UI 面板与未来的 agent 走**同一条命令管道**，不写两套剪辑语义。
- **UI**：编辑器右侧新「转写」面板（`src/pages/editor/components/transcript/`），段落列表与时间轴双向高亮：点段落 seek + 选中对应片段（`selectTrackById` 已有），片段选中反查 segment 滚动到面板。
- **删除区间合并策略**：连续勾选多个段落一次删除 → 合并为一个 `DeleteSpeechRangeCmd`，undo 一次全回。

### 3.5b Agent 运行时（★阶段一核心：像 AI IDE 一样剪视频）

形态对标 AI IDE：**对话面板 + 工具调用循环（function calling）+ 每步可视化、可撤销**。用户在聊天框说「剪掉口误和口头禅」，agent 自己转写、定位、逐步调用工具操作时间轴，全程像 IDE 的 diff 一样可见可撤。

```ts
// src/stores/agent.ts + src/class/agentTools.ts
// 工具集（= LLM function calling 的 tools，与命令层同管道）：
//   query_timeline()      —— agent 的眼睛：轨道结构/片段清单/总时长（JSON）
//   transcribe()          —— agent 的耳朵：whisper 转写 → 带时间码的段落全文
//   delete_range / split_at / move_segment / add_text / set_segment_text ...
//   export_video(options) —— 阶段一先包装现有 exportVideo 加基本参数
// 循环：LLM 多步 function calling（不是单发计划）→ 每个工具调用在聊天流里
//   渲染成可读卡片（调了什么工具、动了哪些片段）→ 全部进命令栈，一键全撤
```

- **信任设计**：破坏性批量操作（删除类）执行前停下要一次确认（像 IDE 里 agent 改文件前的 diff 确认）；查询类工具直接执行；整轮对话的所有写操作聚合成一组，一键全撤。
- **BYOK**：OpenAI 兼容协议，用户填自己的 key（复用 `src/class/OpenAI.ts` 的壳重写）；system prompt 限定「只能调用工具清单里的工具」。
- **阶段一不做**：字幕样式/产品化、Descript 转写面板（那是阶段二给"人"用的通路）、流式逐步执行、多轮对话记忆优化。

### 3.6 导出管线重写（进度 / 取消 / 参数化）

现状 `exportVideo`（`src/stores/project.ts:208-286`）：ElLoading 一把梭、无进度、无取消、30fps 写死、强制水印、水印 sprite 双加。

**设计**：

```ts
// src/stores/export.ts（新 store，从 project.ts 拆出）
interface ExportOptions { resolution: 'source'|'720p'|'1080p'; fps: 24|30|60; bitrate?: number; watermark: boolean; }
状态: { phase: 'idle'|'rendering'|'muxing'|'done', progress: 0..1, abort: AbortController|null }
```

- **进度**：`com.output()` 返回 ReadableStream，在 `pipeTo` 前插一个 `TransformStream` 计 mux chunk 数；期望总量按 `sprites 总时长 × (码率相关 chunk 率)` 标定——**标定方法**：导出开始 1s 后用已写入字节/已合成时长估算 chunk 率，进度显示为估算值（足够产品化，不必精确到帧）。同时展示已用时间。
- **取消**：`pipeTo(writer, { signal: abortController.signal })` + `reader.cancel()`；取消后销毁 Combinator 与 sprites（`clip.destroy()` 生命周期已在 `Decoder.decode(force)` 有先例）。
- **参数**：`fps` 传入 `new Combinator({ fps })`（`project.ts:258` 现写死 `baseFps`）；分辨率对 `playerWidth/Height` 按档位缩放；`videoBitrate` 走 av-cliper 支持的 bitrate 选项。
- **水印**：免费版改为右下角小角标、设置里可关（后续 Pro 钩子）；顺手删双加 bug（3.1）。
- **P2（不进本 8 周）**：`Combinator` 移入 Worker（av-cliper 设计上支持 OffscreenCanvas 环境）；webm/gif 格式。

---

## 4. 里程碑（分阶段，业余节奏：每周 3-5 个「晚上块」，1 块 ≈ 2-3h）

> 每周末跑一次 `docs/TEST_CHECKLIST.md` 全量回归 + `pnpm typecheck`，回归不过不进入下周。

### 阶段一：治理（W1-W3）——只治不改，不加任何新功能

目标：把项目治理成干净的底座——主链路可信、依赖新鲜、体积瘦身、类型管住。结束时不比现在多一个功能，但每个后续改动都更便宜。

### W1 —— 解阻断 + 时钟校准（本周结束主链路可信）
| 块 | 任务 | 指向 |
|---|---|---|
| 晚1 | 恢复 `Decoder.split` 的 `offsetR` 裁剪，公式抽纯函数 + Vitest 用例 | `Decoder.ts:126-142` |
| 晚2 | 修 `TextTrack.combine` 裁剪 TODO + 删索引签名 | `TextTrack.ts:53,180-184` |
| 晚3 | 删水印双加；手工复测「分割→导出」 | `project.ts:252,268` |
| 晚4 | 播放时钟改 audioContext 时间基准（3.2） | `CanvasPlayer.ts:136-148` |
| 晚5 | 新增回归 #15/#16/#17，全量跑一遍记录 | `docs/TEST_CHECKLIST.md` |
**可演示**：任意视频分割两半→导出成功；60fps 素材播放音画不漂。

### W2 —— 依赖升级 + 测试地基
| 块 | 任务 |
|---|---|
| 晚1 | 引入 Vitest（纯逻辑：`utils/track.ts` 重叠检测、分割公式 TDD） |
| 晚2 | 依赖升级：Vue 3.5、Vite 7、pinia、`@webav/av-cliper@1.2.8`、element-plus 补丁版；清未用依赖（`qrcode`、对齐 `@types/react@18`） |
| 晚3 | 升级后回归 12 项 + typecheck + build 全绿；不绿则回退单项定位 |
| 晚4 | `BaseTrack` 去掉 `[k:string]:any`（`types/track.d.ts:14`），补齐四个 Track 类的显式字段，让 vue-tsc 真正管住轨道数据 |
**可演示**：新栈构建产物 + 回归全绿截图。

### W3 —— 功能裁剪（决策 7）
| 块 | 任务 |
|---|---|
| 晚1 | 删 Excalidraw：`plugins/installExcalidraw.ts`、`stores/draw.ts`、`main.ts` 注册、MenuList 入口、`saveProject` 的 `drawData` 字段 |
| 晚2 | 删 PSD 导入（`utils/psd.ts` 及调用点）+ 删录屏（`Recorder.vue`）；依赖同步卸载 |
| 晚3 | 删 mock 登录/注册/配额（`stores/user.ts`、`LoginBox/RegisterBox/UsageBox.vue`）；stub 按钮隐藏或标「即将上线」 |
| 晚4 | 回归全量 + typecheck + build；记录 dist 体积前后对比 |
**可演示**：干净的界面 + 显著缩小的 dist + 回归全绿。**阶段一验收**：主链路（分割→导出、undo→导出）全绿，零新增功能，dist 体积下降 ≥40%。

### 阶段二：视频剪辑 Agent（内测版，W4-W7）

目标：像 AI IDE 一样——口播视频拖进来，在对话框里说「剪掉口误和废话」，agent 自己转写、定位、逐步操作时间轴，全程可视化可撤销。

### W4 —— 文档模型重构：undo 序列化重建（修 D2）
| 块 | 任务 |
|---|---|
| 晚1 | `TrackData` 纯数据类型 + `trackList ⇄ TrackData` 的 `plainify` 工具 + 单测 |
| 晚2-3 | `installPiniaPlugin` serializer 注入实现：快照序列化、恢复走 `loadTrackData`（复用 `track.ts:269-308`）；确认 undo 不重复解码（clipMap 命中） |
| 晚4 | 回归 #17「undo→导出」+ 撤销后复制/分割等组合操作手测 |
**可演示**：撤销/重做后播放、导出、再编辑全部正常。（agent 的安全带，必须先于 agent 落地）

### W5 —— Agent 工具集：命令层（3.5，agent-first）
| 块 | 任务 |
|---|---|
| 晚1 | `EditCommand` 骨架（`do/undo/toJSON/fromJSON` + JSON Schema + `intent` 人话描述）+ 工具注册表 `agentTools.ts` |
| 晚2 | `splitAt` 纯函数化（从 `splitTrack` 抽出）+ 单测 |
| 晚3 | `DeleteRangeCmd` 波纹删除（含 segments 同步删除与多段合并删除）+ 单测 |
| 晚4 | `query_timeline()` 状态查询工具（轨道结构/片段清单/总时长 → JSON）——agent 的眼睛 |
| 晚5 | `export_video(options)` 工具：包装现有 `exportVideo` 加分辨率/fps 参数（完整导出重写推迟到阶段三 W10） |
**可演示**：Node 脚本（不走 UI）按 JSON 驱动命令层完成「分割→删段→查询时间轴→导出」全流程——工具集对 LLM 可用性的最直接验证。

### W6 —— Whisper：agent 的耳朵（3.4 精简版）
| 块 | 任务 |
|---|---|
| 晚1 | `@huggingface/transformers` 依赖 + `whisper.worker.ts` 骨架 + load/progress 消息协议 |
| 晚2 | PCM 提取管线：OPFS → decodeAudioData → OfflineAudioContext 16k mono（transferable） |
| 晚3 | 转写执行 + 中文分段后处理（碎段合并/长段切分）→ `stores/subtitle.ts` + `SubtitleSegment` 数据模型 |
| 晚4 | segments → 批量 `TextTrack` 落专用字幕行（「数据源 → 视图同步」结构一步到位，样式面板留给阶段二） |
| 晚5 | WebGPU 探测与 wasm 回退；模型档位（base/small）设置项；`transcribe()` 接入工具注册表 |
**可演示**：口播视频拖入 → agent 对话框里说「转写这个视频」→ 拿到带时间码的段落全文，字幕已上轨。

### W7 —— Agent 运行时 + 内测发布（3.5b）
| 块 | 任务 |
|---|---|
| 晚1 | function calling 循环：BYOK（OpenAI 兼容，复用 `OpenAI.ts` 壳重写）+ system prompt（工具清单 + 「剪口播视频的最佳实践」规则） |
| 晚2-3 | 对话面板 UI（聊天流）：工具调用渲染成可读卡片（调了什么、动了哪些片段）；破坏性批量操作前确认；整轮操作聚合、一键全撤 |
| 晚4 | 失败恢复：模型输出非法参数 → 重试；循环步数上限；中断续聊 |
| 晚5 | 用 10 段真实口播素材实测调 prompt（剪口误/压缩时长/加标题三类任务）；Vercel 部署 + README 简版重写；**小范围内测发布** |
**可演示**：公网可访问——口播视频拖入 → 一句话 → agent 转写、出方案（带确认）、逐步执行、导出 mp4，全程可撤。
**阶段二验收**：3 类任务（删口误 / 压缩到指定时长 / 加片头标题）各 10 段素材，成功率 ≥7/10，误剪率 0（所有操作可撤销兜底）。

### 阶段三：Descript 口播产品化（W8-W10，阶段二内测反馈驱动，此处只列大纲）
- **W8 Descript 转写面板**：段落列表 ↔ 时间轴双向高亮、`UpdateSegmentTextCmd`、勾选删除——给「人」用的手动通路，与 agent 共用命令层。
- **W9 字幕产品化**：样式面板、SRT 导入导出、字幕-音频吸附。
- **W10 导出重写 + 正式发布**：进度（chunk 计数）、取消（AbortController）、码率参数、水印可关角标（Pro 钩子）、性能（OffscreenCanvas 复用）、Chrome/Edge 横幅、README 终版、演示视频（卖点就一句：会剪视频的 AI，素材不出浏览器）。

### P2 池（不承诺，按兴趣取）
Combinator Worker 化、解码 tick Worker 化（D6）、时间轴虚拟滚动、滤镜（ctx.filter）/叠化转场、TTS 配音（Edge-TTS 路线，`SpeechGenerate.vue` 壳已在）、速度调节、av-canvas 迁移实验、智能集锦。

---

## 5. 明确不做

- **不做** Safari/Firefox 兼容、移动端、通用剪辑器对位（对抗剪映）、账号系统、企业协作。
- **已删除不再回来**：Excalidraw 白板/画笔（`drawData` 持久化随之移除）、PSD 导入、录屏、mock 登录/注册/配额（W2/W8 执行）。
- **不迁移** UI 框架与播放引擎（决策 2/3 的理由）。
- **不复活** `EmbedSubtitlesClip` 字幕嵌入链路（Canvas 文本方案已覆盖，注释代码直接删）。

## 6. 验收口径

1. 每周末：`pnpm typecheck` 零错误 + `docs/TEST_CHECKLIST.md` 全量回归（每周新增用例入册）+ 新增纯逻辑有 Vitest 单测。
2. 第 3 周阶段一验收：主链路（分割→导出、undo→导出）回归全绿，零新增功能，dist 体积下降 ≥40%。
3. 第 7 周阶段二验收：口播视频拖入 → 对话一句话 → agent 转写并出剪辑方案（破坏性操作带确认）→ 逐步执行 → 导出 mp4；删口误/压缩时长/加片头标题三类任务各 10 段素材成功率 ≥7/10；全程操作可一键撤销。
4. 第 10 周终验：转写面板手动删两句话 + agent 一句话剪辑双通路并存；带进度导出 1080p mp4；本地 whisper/字幕链路在 DevTools Network 验证无上传（BYOK 的 LLM 调用除外）。
5. 商业化对齐：本地功能全免费（隐私即传播点），Pro 只挂托管 AI 配额与高分辨率导出——阶段一、二只做免费层，阶段三 W10 的水印开关就是 Pro 钩子的占位。
