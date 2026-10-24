# Magic Maker 阶段二工具集详细设计（PHASE2_TOOLS）

> 归属：`docs/PHASE2_DESIGN.md` §1 的逐工具展开。schema 为 draft 2020-12 子集（LLM function calling 与 MCP 通用）。
> 约定：时间参数**帧**为主（项目时间轴帧，与 `BaseTrack.start/end` 同单位），`*Sec` 别名为秒；两者都传 → `E_AMBIGUOUS_TIME`。
> 所有写工具 `execute` 内部构造 `EditCommand` 入命令栈；undo 代价指**该命令逆操作的开销量级**（快照整轨重建为「重」，纯内存反转为「轻」）。

---

## 0. 通用约定

- **参数校验**：入口统一按 schema 校验，失败 `E_SCHEMA`（附 JSON Path 级原因回喂 LLM）。
- **id 寻址**：`trackId` 是 `BaseTrack.id`（nanoid，编辑过程中稳定）；`segmentId` 是 `SubtitleSegment.id`。
- **幂等性口径**：同参数重复调用，第二次要么成功且状态不变（真幂等），要么报明确的「前置已满足」类错误（工程幂等）。写工具一律**非真幂等**——重复 `split_at` 会多出一刀——由 agent 运行时负责不重放已成功的调用，工具自身返回 `E_ALREADY` 类错误兜底。
- **错误码结构**：`{ code: string, message: string, detail?: object }`，`code` 稳定可被 LLM 用来改路径。

### 错误码总表

| code | HTTP 式语义 | 典型场景 | LLM 应对 |
|---|---|---|---|
| `E_SCHEMA` | 参数不合法 | 缺字段/类型错 | 修正参数重试 |
| `E_AMBIGUOUS_TIME` | 参数冲突 | frame 与 sec 同时传 | 二选一重试 |
| `E_TRACK_NOT_FOUND` | 寻址失败 | trackId/segmentId 不存在（或已被删） | `query_timeline` 重查 |
| `E_EMPTY_TIMELINE` | 前置缺失 | 空项目上调剪辑工具 | 告知用户先导入素材 |
| `E_NO_AUDIO` | 前置缺失 | `transcribe` 找不到音频/视频轨 | 告知用户导入口播素材 |
| `E_OUT_OF_RANGE` | 越界 | frame 超出片段/项目范围 | 重新定位后重试 |
| `E_OVERLAP` | 冲突 | `move_segment` 目标位与既有片段重叠 | 换位置或先腾挪 |
| `E_BUSY` | 资源占用 | 导出中/其他出口持写权限/转写进行中 | 稍后重试 |
| `E_EXPORT_FAILED` | 内部失败 | Combinator 合成异常（WebAV abort 等） | 人类介入，不盲试 |
| `E_MODEL_LOAD_FAILED` | 内部失败 | whisper 模型下载/初始化失败 | 提示检查网络/换档位 |
| `E_CANCELLED` | 用户取消 | confirm 拒绝、进度条取消 | 停止该路径 |
| `E_UNDO_STALE` | 撤销失效 | 命令 inverse 引用的片段已被手改覆盖 | 降级走快照 Cmd+Z |
| `E_INTERNAL` | 兜底 | 未分类异常 | 不重试，报告用户 |

---

## 1. `query_timeline`

**intent**：读取当前时间轴的完整结构：轨道行、每行片段清单、项目总时长、fps。

```json
{
  "name": "query_timeline",
  "danger": "query",
  "parameters": { "type": "object", "properties": {}, "additionalProperties": false }
}
```

**返回**：

```json
{
  "durationFrame": 3600, "durationSec": 120.0, "fps": 30,
  "lines": [{
    "line": 0, "type": "video", "main": true,
    "clips": [{
      "id": "trk_a1b2", "name": "口播_v3.mp4", "type": "video",
      "start": 0, "end": 1800, "startSec": 0.0, "endSec": 60.0,
      "offsetL": 120, "offsetR": 0, "segmentId": null
    }]
  }],
  "subtitleSegments": [{ "id": "seg_01", "text": "大家好…", "startSec": 0.4, "endSec": 3.1 }]
}
```

- **前置**：无（空项目返回空 `lines`，不报错——agent 的第一眼）。
- **幂等**：真幂等（纯读）。**undo 代价**：无（不进命令栈）。
- 错误：仅 `E_INTERNAL`。

## 2. `query_segments`

**intent**：只读当前字幕段落（含已落轨与仅存在于字幕 store 的段），供改写文字前的寻址。

```json
{ "name": "query_segments", "danger": "query",
  "parameters": { "type": "object", "properties": {}, "additionalProperties": false } }
```

- **返回**：`{ segments: SubtitleSegmentJSON[] }`（id/text/start/end 帧与秒）。
- 前置：无；未转写过返回空数组。真幂等，不进命令栈。

## 3. `transcribe`

**intent**：对本项目口播素材跑本地 whisper 转写，产出带时间码的段落并自动落字幕行。

```json
{ "name": "transcribe", "danger": "write",
  "parameters": {
    "type": "object",
    "properties": {
      "trackId":  { "type": "string", "description": "要转写的音频/视频轨；缺省取唯一有声轨" },
      "language": { "type": "string", "enum": ["zh", "auto"], "default": "auto" },
      "model":    { "type": "string", "enum": ["base", "small"], "default": "base",
                    "description": "base≈40-80MB，small≈250MB 中文更准" }
    },
    "additionalProperties": false
  } }
```

**返回**：`{ segments: [{ id, text, startFrame, endFrame, startSec, endSec }], model, device: "webgpu"|"wasm" }`。

- **前置**：存在可解码的音频（视频轨取其音轨）；PCM 管线按 §3.4（OPFS → decodeAudioData → OfflineAudioContext 16k mono）。已有转写结果时**不覆盖**，返回 `E_BUSY` 附 detail `{ existing: true }`——要重跑由用户在 UI 明确触发（阶段二不给工具参数留 overwrite 口子，防 agent 静默重转）。
- **幂等**：非幂等但**有防重入**（上条）。长耗时：卡片显示 download/transcribe 两段进度。
- **undo 代价**：**重**——逆操作 = 清空字幕 store 的本次 segments + 移除字幕行 TextTrack（走数据源→视图同步）；不回滚模型缓存。
- **可取消**：`cancel` 经 Worker 协议；取消返回 `E_CANCELLED`。
- 错误：`E_NO_AUDIO` / `E_BUSY` / `E_MODEL_LOAD_FAILED` / `E_CANCELLED`。
- 【待验证】transformers.js `return_timestamps` 在 q8 量化 + zh 下的段级时间戳质量；若漂移明显，段边界改用 VAD（silero）二次校正，列为 W6 风险预案。

## 4. `split_at`

**intent**：在指定片段的指定帧处切一刀，一段变两段。

```json
{ "name": "split_at", "danger": "write",
  "parameters": { "type": "object",
    "properties": {
      "trackId": { "type": "string" },
      "frame":   { "type": "integer" }, "sec": { "type": "number" }
    },
    "required": ["trackId"],
    "additionalProperties": false } }
```

- **前置**：trackId 存在；frame 严格落在片段 `(start, end)` **开区间**内（边界上切分无意义，`E_OUT_OF_RANGE`）。
- **幂等**：非幂等；实现前先查「该片段在 frame 处是否已有刀口」？**不做**——帧级相等判断与吸附语义纠缠，重复调用让 agent 靠返回值自查（返回两段新 id）。
- **undo 代价**：**轻**——inverse 记两段 id 与原片段完整 JSON，undo 即删两段、按原数据重建（`loadTrackData` 单轨量级）。
- 错误：`E_TRACK_NOT_FOUND` / `E_OUT_OF_RANGE` / `E_EMPTY_TIMELINE`。
- 实现：调用推广后的纯函数 `splitAt(line, index, frame)`（§3.5 W5 晚2），公式已被 Vitest 锁住。

## 5. `delete_range`

**intent**：删除时间区间内所有（或指定轨道的）片段，右侧波纹左移收拢，同步删除/截断字幕段。

```json
{ "name": "delete_range", "danger": "destructive",
  "parameters": { "type": "object",
    "properties": {
      "startFrame": { "type": "integer" }, "endFrame": { "type": "integer" },
      "startSec": { "type": "number" },   "endSec": { "type": "number" },
      "scope":  { "type": "array", "items": { "type": "string" },
                  "description": "限定作用的 trackId 列表；缺省 = 全部轨道" },
      "ripple": { "type": "boolean", "default": true,
                  "description": "true=波纹收拢；false=留空隙" }
    },
    "required": ["ripple"],
    "additionalProperties": false } }
```

**返回**：`{ removed: [{ trackId, clipIds, segmentIds }], timeSavedSec }`。

- **前置**：区间合法（`end > start`，落在项目时长内）；区间内至少命中一个片段，否则 `E_OUT_OF_RANGE`（防 LLM 空删刷步数）。
- **执行语义**（`DeleteRangeCmd`）：① 对跨区间的片段先 `splitAt` 两刀；② 整段落入区间的 `removeTrack`；③ 右侧同轨片段左移 gapWidth（批量复用 `leftLink` 位移逻辑）；④ `subtitleStore.segments` 同步删/截断。多段勾选删除合并为**一个**命令。
- **幂等**：非幂等（重复调=第二刀区间已空→`E_OUT_OF_RANGE` 兜底）。
- **undo 代价**：**重**——inverse 需还原「被删片段（含裁剪状态）+ 各轨位移 + 字幕段」，量级为受影响轨道的单轨重建；但语义上仍是**一次 undo 全回**。
- **确认**：应用内出口必经确认卡（删除预览逐条列出）；MCP 出口两段式（`NEEDS_CONFIRMATION` → `confirm: true` 重发）。
- 错误：`E_AMBIGUOUS_TIME` / `E_OUT_OF_RANGE` / `E_EMPTY_TIMELINE` / `E_CANCELLED`。

## 6. `move_segment`

**intent**：把片段平移到新起点（保持时长），可选换到同类型轨道行。

```json
{ "name": "move_segment", "danger": "write",
  "parameters": { "type": "object",
    "properties": {
      "trackId": { "type": "string" },
      "startFrame": { "type": "integer" }, "startSec": { "type": "number" },
      "targetTrackId": { "type": "string", "description": "缺省=原轨；仅接受同 type 轨道行" }
    },
    "required": ["trackId"],
    "additionalProperties": false } }
```

- **前置**：片段存在；目标位不与既有片段重叠（复用 `checkTrackOverlap`，重叠即 `E_OVERLAP`，不做自动推挤——阶段二剪辑语义保持最小）。
- **幂等**：非幂等但**自洽**：移到原位 = 状态不变，返回成功（真幂等特例）。
- **undo 代价**：**轻**——inverse 记原 `(trackId, start)`，纯坐标回写。
- 错误：`E_TRACK_NOT_FOUND` / `E_OVERLAP` / `E_OUT_OF_RANGE`。

## 7. `add_text`

**intent**：新增一段文字（片头标题/花字），落在文字轨上。

```json
{ "name": "add_text", "danger": "write",
  "parameters": { "type": "object",
    "properties": {
      "text": { "type": "string", "maxLength": 60 },
      "startFrame": { "type": "integer" }, "endFrame": { "type": "integer" },
      "startSec": { "type": "number" }, "endSec": { "type": "number" },
      "position": { "type": "string", "enum": ["center", "bottom"], "default": "center" }
    },
    "required": ["text"],
    "additionalProperties": false } }
```

- **前置**：时长 ≥ 0.6s（`E_OUT_OF_RANGE`，对齐 §3.4 最小段宽，防闪烁）；`position` 仅映射到 `TextTrack` 的 `centerY` 换算（bottom = `bottomOffset` 语义），样式面板阶段三才有。
- **幂等**：非幂等（重复调=多一条文字）；agent 靠返回的 trackId 自查。
- **undo 代价**：**轻**——inverse = `removeTrack` 该文字片段。
- **默认区间**：未传时间时默认 `[0, 3s×fps]`（片头惯例），返回体里注明用了默认值。
- 错误：`E_SCHEMA` / `E_OUT_OF_RANGE`。

## 8. `set_segment_text`

**intent**：修改某条字幕的文字（Descript 式改字），不改时长。

```json
{ "name": "set_segment_text", "danger": "write",
  "parameters": { "type": "object",
    "properties": {
      "segmentId": { "type": "string" },
      "text": { "type": "string", "maxLength": 200 }
    },
    "required": ["segmentId", "text"], "additionalProperties": false } }
```

- **前置**：segmentId 存在于字幕 store。
- **语义**：只改 `SubtitleSegment.text` 并同步视图 TextTrack.text；**时长不动**（改时长的需求走 delete_range + add_text 组合，不让单工具承担两种语义）。
- **幂等**：非幂等但自洽（同文本重写=无变化，成功返回）。
- **undo 代价**：**轻**——inverse 换回旧文本。
- 错误：`E_TRACK_NOT_FOUND`（segment 寻址统一用此码，detail 注明 `kind:"segment"`）。

## 9. `export_video`

**intent**：按参数导出 mp4。

```json
{ "name": "export_video", "danger": "write",
  "parameters": { "type": "object",
    "properties": {
      "resolution": { "type": "string", "enum": ["source", "720p", "1080p"], "default": "source" },
      "fps":        { "type": "integer", "enum": [24, 30, 60], "default": 30 },
      "watermark":  { "type": "boolean", "default": true },
      "filename":   { "type": "string", "maxLength": 80 }
    },
    "additionalProperties": false } }
```

- **前置**：时间轴非空；无进行中的导出/转写（`E_BUSY`）。包装现有 `exportVideo`（完整导出重写在阶段三 W10，阶段二只加分辨率/fps 透传，对齐 §3.5 W5 晚5 范围）。【待验证】av-cliper 1.2.8 的 `Combinator` 对非 `baseFps` 的 fps 与分辨率缩放的实际表现——W5 实测后再定 enum 是否收缩。
- **幂等**：非幂等（重复导=再出一个文件）；导出中重复调用 `E_BUSY`。
- **undo 代价**：**无**——产物是文件不进时间轴，不进命令栈（卡片显示产物大小/时长即可）。`watermark` 默认值在设置里可被用户全局覆盖，工具参数显式传参时优先。
- 错误：`E_EMPTY_TIMELINE` / `E_BUSY` / `E_EXPORT_FAILED`。

---

## 10. system prompt 草案（限定只能调工具清单）

> 注入位置：function calling 循环的 system 消息；`{{TOOLS}}` 由注册表生成时填充，`{{PROJECT}}` 每回合开始时以 `query_timeline` 结果预填（省 agent 一次调用）。

```text
你是 Magic Maker 的视频剪辑 agent。Magic Maker 是一个浏览器本地口播视频剪辑器，
你通过调用工具操作用户的时间轴。素材与时间轴数据全部在用户浏览器本地，你接触不到原始媒体文件，
只能通过工具的返回值了解项目。

# 工具
你只能调用下列工具，不得假设存在清单之外的能力（不能播放、不能生成素材、不能直接改文件）：
{{TOOLS}}

# 当前项目状态（回合开始时快照）
{{PROJECT}}

# 工作规则
1. 先看再动：首次操作前必须 query_timeline 了解结构；涉及字幕先 query_segments。
   禁止凭记忆操作——每次编辑后 id 与时间会变。
2. 转写是定位口误的前提：需要删口误/压缩时长时，先 transcribe 拿到带时间码的段落，
   再决定 delete_range 的区间。sec 与 frame 换算：frame = round(sec * fps)。
3. 删除类操作（delete_range）执行前，先向用户口头说明你准备删什么、预计缩短多少，
   再发起调用；系统会弹出确认卡，用户拒绝后不要换个区间重试同一意图，
   除非用户明确给了新范围。
4. 一次只推进一个明确目标。任务复杂时（如「压缩到 60 秒」），先输出分步计划文本，
   再逐步执行，每步之间用一句话交代进度；不要一次性串起超过 5 个删除调用。
5. 参数规则：时间优先用 sec（工具自动换算帧）；trackId/segmentId 一律来自工具返回值，禁止编造。
6. 出错处理：E_SCHEMA/E_OUT_OF_RANGE 类错误修正参数重试，同一工具连续失败 2 次就停下向用户说明；
   E_EXPORT_FAILED/E_INTERNAL 不重试，直接报告。
7. 剪辑审美（口播场景）：口头禅（「然后」「就是说」「嗯」）单独成段且 <2s 时才值得删；
   删除区间前后各留 0.15s 余量避免句子粘连；成段删除优先合并相邻口误为一个区间。
8. 完成后：报告做了什么（用时间码）、时间轴变化（删了几段/缩短几秒）、并建议用户导出。

# 语气
简洁、工程化、不寒暄。所有时间引用使用 mm:ss.s 格式。
```

**prompt 工程约束**：`{{TOOLS}}` 只含 name/intent/schema 摘要（完整 JSON Schema 太长，intent 已经是写给 LLM 的人话）；第 3/4/7 条是 W7 用 10 段真实素材实测的调优重点，prompt 版本号记在 `agent.ts` 常量里，实测结论回写本节。

---

## 11. 工具 ↔ 命令 ↔ store 对照表

| 工具 | EditCommand | 触达的 store 原语 |
|---|---|---|
| query_timeline / query_segments | 无（纯读） | track.trackList / subtitle.segments |
| transcribe | `TranscribeCmd`（落 segments + 批量建字幕行 TextTrack） | subtitle / track.addTrack |
| split_at | `SplitAtCmd` | track.splitAt（纯函数化后） |
| delete_range | `DeleteRangeCmd` | splitAt + removeTrack + leftLink + subtitle |
| move_segment | `MoveSegmentCmd` | 坐标回写 + checkTrackOverlap |
| add_text | `AddTextCmd` | track.addText / addTrack |
| set_segment_text | `UpdateSegmentTextCmd` | subtitle.segments（视图自动同步） |
| export_video | 无（不进栈） | project.exportVideo |
