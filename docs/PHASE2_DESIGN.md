# Magic Maker 阶段二总体设计：Agent 式视频剪辑（Codex 式对话流 + 工具集 + MCP 桥）

> 前置阅读：`AGENTS.md`、`docs/BIG_ITERATION_PLAN.md` §3.4 / §3.5 / §3.5b。
> 本篇定位：阶段二（W5-W7）的总体设计——工具清单、对话流交互、命令层接口、MCP 桥架构、里程碑切分。
> 配套文档：`docs/PHASE2_TOOLS.md`（工具逐个详设 + system prompt 草案）、`design/agent-chat.html`（对话面板视觉稿）。
> 标注「待验证」的条目是实现前必须实测的技术点，不拍脑袋。

---

## 0. 形态一句话

编辑器右侧加一个 **Codex 式对话面板**：用户说「剪掉口误和口头禅」，agent 通过 function calling 多步调用**工具集**操作时间轴——每个工具调用在聊天流里渲染成可读卡片（调了什么、动了哪些片段、影响范围），破坏性操作先出确认卡，整轮写操作聚合成组、一键全撤。

两条铁律（承 §3.5 设计红线）：

1. **工具定义一份，出口多个**。工具注册表是唯一事实源；应用内对话面板、（未来）转写面板、MCP 桥全部走同一条执行管道，不写第二套剪辑语义。
2. **所有写操作都编译成命令**（`src/class/commands.ts` 的 `EditCommand`），可序列化、可逆、可回放。

---

## 1. 工具清单与 JSON Schema

### 1.1 注册表结构（单一定义源）

```ts
// src/class/agentTools.ts
type ToolDanger = 'query' | 'write' | 'destructive';

interface ToolDefinition<P = any, R = any> {
  name: string;
  intent: string;              // 人话描述，直接进 system prompt 与卡片文案
  danger: ToolDanger;          // 决定对话流里要不要确认卡
  schema: JSONSchema;          // 参数 JSON Schema（draft 2020-12 子集），同时喂 LLM 和 MCP
  execute(params: P): Promise<R>;  // 内部构造 EditCommand 入命令栈；query 类直读 store
}
const toolRegistry = new Map<string, ToolDefinition>();
```

要点：

- `schema` 由命令层导出（§4），**不是**手写在 agent 层的副本；`scripts/gen-tool-schema.ts` 从注册表生成 `tools.json`，LLM function calling 的 `tools` 数组与未来 MCP 的 tool manifest 都从这里出。
- `execute` 只接受已经过 schema 校验的参数（入口统一 `validate(schema, params)`），错误码见 `PHASE2_TOOLS.md` §错误码表。
- `danger: 'destructive'` 的工具在应用内出口必须先过确认卡；MCP 出口返回 `NEEDS_CONFIRMATION`（§5.4）。

### 1.2 工具清单（阶段二落地 9 个）

| 工具 | danger | 一句话意图 | 详细设计 |
|---|---|---|---|
| `query_timeline` | query | agent 的眼睛：读轨道结构/片段清单/总时长 | PHASE2_TOOLS §1 |
| `query_segments` | query | 读当前字幕段落（含未上轨的转写结果） | §2 |
| `transcribe` | write | 跑本地 whisper 转写，产出带时间码的段落并落字幕行 | §3 |
| `split_at` | write | 在指定片段的指定帧处切一刀 | §4 |
| `delete_range` | destructive | 删除时间区间（波纹收拢），同步删字幕段 | §5 |
| `move_segment` | write | 把片段平移到新起点（同轨或跨轨） | §6 |
| `add_text` | write | 加一段文字（片头标题/花字） | §7 |
| `set_segment_text` | write | 改某条字幕的文字（无时长变化） | §8 |
| `export_video` | write | 按参数导出 mp4 | §9 |

`JSON Schema` 全文见 `docs/PHASE2_TOOLS.md`；下面只列关键取舍：

- **参数一律用 `trackId` / `segmentId`，不暴露 `line/index` 数组下标**给 LLM——下标会随编辑漂移，id 稳定。命令层内部负责 id → `(line, index)` 解析（解析不到返回 `E_TRACK_NOT_FOUND`）。
- 时间参数统一 **帧**（项目时间轴帧，与 `BaseTrack.start/end` 同一单位），`query_timeline` 返回里同时给 `frame` 与 `sec`（`sec = frame / baseFps`），LLM 从转写拿到的是秒，换算规则写进 system prompt；工具额外接受 `startSec/endSec` 别名参数（二选一，都传报 `E_AMBIGUOUS_TIME`）。【待验证】帧↔秒换算在 `baseFps` 改为跟随素材 fps（§3.2 时钟校准）后是否有非整数帧取整误差，实现时用 Vitest 锁住取整方向（统一 floor 到帧边界）。
- `delete_range` 支持 `ripple: true`（默认）波纹收拢、`scope: 'all' | trackId[]` 限定作用轨道；多段连续删除合**一个**命令（§3.5 的合并策略），undo 一次全回。
- `transcribe` 是阶段二唯一长耗时工具（模型下载 40-250MB + 推理），返回前先发 `progress` 中间消息（对话卡片显示进度条）；Worker 协议沿用 §3.4 的 load/asr/cancel 消息，不改。

### 1.3 出口

| 出口 | 接入方式 |
|---|---|
| 应用内对话面板（W7） | agent 运行时直接 `toolRegistry.execute`，确认卡由面板渲染 |
| Node 验证脚本（W5，可演示验收） | 直接 import 注册表跑「分割→删段→查询→导出」，不走 UI |
| 转写面板（阶段三 W8） | 手动操作编译成同一批命令 |
| MCP 桥（未来，接公司 Trae） | 见 §5，schema 从注册表生成 |

---

## 2. 对话流交互设计（Codex 式）

### 2.1 消息结构

聊天流里的消息统一为 `ChatMessage` 联合类型（`src/types/agent.d.ts`）：

```ts
type ChatEntry =
  | { kind: 'user';      id; ts; text }
  | { kind: 'assistant'; id; ts; text;       // 纯文本叙述（方案说明/进展播报）
      refs?: EntryId[] }                     // 引用其来源工具卡片
  | { kind: 'tool';     id; ts;
      tool: string; params: object;
      status: 'awaiting_confirm' | 'running' | 'done' | 'failed' | 'cancelled';
      affected?: AffectedRange;              // 影响范围：轨道/片段 id 列表 + 帧区间 + 人话摘要
      resultSummary?: string; error?: ToolError;
      progress?: { phase; value };           // transcribe 专用
      groupId: string }                      // 所属回合一（§2.3）
  | { kind: 'confirm';  id; ts;
      tool: string; params: object; affected: AffectedRange;
      resolution: 'pending' | 'approved' | 'adjusted' | 'rejected' };
```

渲染规则（视觉稿见 `design/agent-chat.html`）：

- `tool` 卡片三行结构：**工具名 + intent**（标题行）/ **参数摘要**（mono 小字，时间码用 `mm:ss.ms`）/ **影响范围 chips**（如「视频主轨 · 3 个片段 · 00:12.3–00:18.0」）。status 用左侧 2px 色条表达：running 白、done 冷灰、failed 红、cancelled 暗灰——不引入新彩色，保持 RunwayML 黑白灰 + 红仅 playhead 的纪律。
- `confirm` 卡片内嵌「删除预览」：将删除的片段逐条列出（名称/区间/时长），底部合计「共删除 4 段 · 缩短 00:23.4」；按钮三枚：执行 / 调整参数（把参数回填输入框）/ 取消。
- assistant 文本克制：工具之间最多一句过场，不逐工具复述参数（卡片已展示）。

### 2.2 function calling 循环

```
用户输入 → 构造 messages（system + 历史 + 用户）→ LLM（tools = 注册表生成的 schema）
  ├─ 返回 text → 追加 assistant 消息，结束本轮
  └─ 返回 tool_calls → 逐个执行：
        query 类     → 直接执行，结果回填 messages
        write 类     → 执行（构造命令入当前回合组），卡片更新为 done
        destructive  → 渲染 confirm 卡，暂停循环等用户裁决（approve → 执行；
                       reject → 以「用户拒绝了该操作」回填 messages 让 LLM 改方案）
  → 结果全部回填 → 再次请求 LLM → 循环
```

护栏（§3.5b「失败恢复」落地）：

- **步数上限**：单回合工具调用 ≤ 12 次，超出后强制收尾，让 LLM 输出总结。
- **非法参数**：schema 校验失败（`E_SCHEMA`）直接把错误码+原因回填给 LLM 重试，同一工具连续失败 2 次后中断该工具并提示用户。
- **超时**：单工具 120s（`transcribe` 首次含模型下载放宽到 30min，进度可见即不算挂起）。
- **中断续聊**：面板关闭/刷新时，running 状态的工具照常跑完（store 层不随组件卸载），历史消息持久化后重进可继续。

### 2.3 会话与项目的归属关系

- **一个项目绑定多个 agent 会话，同一时刻至多一个活跃会话**。会话 id `nanoid`，归属 `projectId`，持久化进 IDB（新 store `src/stores/agent.ts`，存 `messages` / `回合组` / `活跃状态`；不塞进 `ProjectData` 主 JSON，避免项目保存路径耦合——项目 JSON 只存时间轴事实，聊天记录是过程数据）。
- **回合（turn）= 命令组**：用户一次发送到 agent 收尾之间的全部写命令记入同一个 `CommandGroup { id, commandRefs[], ts }`。时间轴侧显示「本回合已执行 N 步 · 一键全撤」浮条；点击 = 反序执行组内 undo，随后把撤销结果作为一条系统消息写入聊天流（可 redo 不在阶段二范围， redo 走快照层兜底）。
- 快照 undo（Cmd+Z）与命令组的关系见 §4.3 的协调规则。

### 2.4 破坏性操作的确认交互

- 触发条件：`danger === 'destructive'`（当前只有 `delete_range`），或单回合累计影响 **≥ 5 个片段**的写操作批（防 LLM 用多个 write 类拼出事实上的大破坏）。
- 确认卡是**模态阻塞**的：循环挂起，用户不裁决 LLM 不继续；卡片不自动过期。
- 「调整参数」路径：参数 JSON 回填输入框（用户手改后以 user 消息重发），原 confirm 卡标记 `adjusted`。

### 2.5 失败重试

- 工具失败 → 卡片转 `failed` + 错误码 + 人话原因（错误码表在 PHASE2_TOOLS）；卡片上「重试」按钮 = 原参数重跑；同时错误回填 LLM 让它自行换路（如 `E_NO_AUDIO` 后 agent 应提示用户先导入音频而非空转）。
- LLM 网络失败（BYOK 通道）：指数退避重试 2 次，失败后保留已执行命令组，用户可继续对话（上下文不丢）。

---

## 3. 命令层接口设计（`src/class/commands.ts`）

### 3.1 EditCommand

```ts
interface EditCommandJSON { cmd: string; params: object; }   // 版本字段进 cmd 名，如 "delete_range@1"

interface EditCommand {
  readonly label: string;      // 卡片/撤销菜单用的人话短句
  readonly intent: string;     // 给 LLM 的人话意图（同 ToolDefinition.intent）
  do(): Promise<CommandEffect>;    // 返回影响范围（affected 片段列表），供卡片渲染
  undo(): Promise<void>;           // 反序执行 do 时记录的逆操作
  toJSON(): EditCommandJSON;
}
// 每个命令类配静态 fromJSON(json): EditCommand —— 注册表统一收口：
const commandRegistry = { toTool(): ToolDefinition; fromJSON(j): EditCommand };
```

- `do()` 内**只记录不执行**逆操作：原子步骤产生时立即记 `inverse`（如 split 记「merge 回原片段所需的两段 id + 原数据」），undo 反序回放。逆操作必须用**重做后的实际状态**计算（不能在 do 前预拍快照，否则中间态被用户手改后会错位）。
- 现有 store 原语全部复用：`splitTrack`（推广为纯函数 `splitAt(line, index, frame)`）、`removeTrack`、`leftLink`、`addText`、`copyTrack`——命令层是编排者，不发明新剪辑语义（§3.5 原则）。
- `DeleteRangeCmd` 额外同步 `subtitleStore.segments`（删/截断对应段）；`UpdateSegmentTextCmd` 只换文本不动时长。
- `MergeSegmentsCmd` 列在 §3.5 原文里，但阶段二工具清单不含它（阶段三转写面板 W8 再暴露），命令类先实现、不进注册表。

### 3.2 与 whisper/字幕数据模型的对齐

- 字幕唯一事实源是 `SubtitleSegment[]`（§3.4），`TextTrack` 只是视图。命令层改字幕一律改 `segments` 再由「数据源 → 视图同步」刷 TextTrack，**不允许**直接改字幕行 TextTrack（会制造两份事实）。
- `transcribe` 工具产出的 segments 自带 `id`，后续 `set_segment_text` / `delete_range` 的字幕同步全靠它寻址。

### 3.3 双层 undo：快照层兜底 + 命令层精确

| 层 | 触发 | 粒度 | 实现 |
|---|---|---|---|
| 快照层（现有 Pinia 插件，W4 已序列化重建） | 时间轴手动操作、Cmd+Z | 全局整轨快照 | `serialize → loadTrackData` 重建 |
| 命令层（新增） | agent 工具、转写面板 | 单命令精确逆操作 | `EditCommand.undo()` |

协调规则（关键，防两层互相打架）：

1. **任何快照层动作（手操编辑或 Cmd+Z/Redo）使所有未决命令组失效**：失效组不可再「一键全撤」，浮条收起；因为命令 inverse 引用的片段 id 在重建后可能已不存在。失效时给组内命令打 `invalid` 标记而非删除（聊天记录保留，卡片上注明「已被手动编辑覆盖，无法精确撤销」）。
2. 命令组一键全撤完成后，**向快照层推一个新快照**（等于把撤销结果固化为最新状态），保证 Cmd+Z 能整体回到「撤销后」。
3. 命令 `do()` 自身也要触发快照层记录吗？**不要**——若 do 同时进快照栈，Cmd+Z 一次只回一步而命令组记录的是整组，两层语义分裂。实现上：命令执行期间给快照 serializer 挂 `silent` 标志跳过入栈，组收尾时统一入一个「组级快照」。【待验证】installPiniaPlugin 的订阅粒度能否支持按次跳过——W4 改造后 serializer 是注入式的，预计可加；实现前重读该文件（AGENTS.md 坑条目要求）。
4. 命令层 undo 遇到 `inverse` 失效（目标 id 不存在）：不静默失败，返回 `E_UNDO_STALE`，浮条降级提示「用 Cmd+Z 回退到组级快照」。

---

## 4. agent 运行时（`src/stores/agent.ts`）

```ts
interface AgentState {
  sessions: Record<projectId, AgentSession[]>;
  activeSessionId: string | null;
  entries: ChatEntry[];           // 活跃会话消息流（持久化）
  runningTurn: { groupId; stepCount; pendingConfirm?: string } | null;
}
```

- LLM 通道：重写 `src/class/OpenAI.ts` 壳，BYOK（OpenAI 兼容协议，baseURL/model/key 走设置面板），`tools` 参数直接传注册表生成的 schema。流式输出阶段二不做（§3.5b 明确不做），整段接收。
- 循环体是纯函数 `runTurn(session, userInput, registry)`，方便 Vitest 用假 LLM（按脚本返回 tool_calls）测护栏：步数上限、schema 重试、confirm 阻塞。

---

## 5. MCP 桥架构草案（接入公司自有 Trae）

### 5.1 拓扑

```
Trae（公司 IDE，MCP 客户端）
   ↕ stdio（MCP 协议，JSON-RPC）
mcp-magic-maker（本地 node 进程，仓库 tools/mcp-bridge/）
   ↕ WebSocket（localhost，token 鉴权）
WS 中继（vite dev plugin 提供_dev；生产形态待定，见 5.5）
   ↕ postMessage / 直连（同源页面）
编辑器页面 runtime（bridge client → toolRegistry.execute）
```

### 5.2 单一定义源

- `scripts/gen-tool-schema.ts` 从 `toolRegistry` 生成 `tools.json`（name/intent/danger/schema/错误码表）。node 进程启动时读取它声明 MCP tools（`tools/list`）；应用内 agent 的 function calling `tools` 数组同源。**改工具只改注册表一处**。
- node 进程不实现任何剪辑语义：`tools/call` → 原样经 WS 转发给页面 runtime → 注册表执行 → 结果原样回传。剪辑逻辑只在页面里（WebAV/OPFS 都在浏览器，天然无法搬到 node）。

### 5.3 页面 runtime 桥

- 编辑器挂载时（仅当检测到桥模式开关，如 URL 参数 `?bridge=1` 或 localStorage 标记）连接 `ws://127.0.0.1:<port>?token=<一次性token>`；node 进程启动时生成 token 并打印到 stdout，Trae 侧配置透传。
- 消息协议：`{ id, kind: 'tools/list' | 'tools/call', payload }` / 响应 `{ id, ok, result | error }`；`transcribe` 的 progress 走服务端推送帧 `{ kind: 'progress', toolCallId, value }`（MCP 侧映射为 notification，【待验证】Trae 对 progress notification 的展示支持）。

### 5.4 破坏性操作在 MCP 出口的语义

- `danger: 'destructive'` 的 `tools/call` 在页面侧**不弹确认卡**（没人看），直接返回 `{ code: 'NEEDS_CONFIRMATION', affected }`，由 Trae 侧的 agent 自行向它的用户要确认后重发同一调用（带 `confirm: true` 参数）。注册表对无 confirm 的 destructive 调用拒绝执行。
- 应用内面板与 MCP 桥**不会同时活跃**（同一项目同一时刻只允许一个出口持有写权限，bridge 连接建立时若面板回合进行中则拒绝：`E_BUSY`）。

### 5.5 待验证清单（MCP 桥不进 W5-W7 承诺范围，先立草案）

| # | 待验证点 | 候选方案 |
|---|---|---|
| V1 | WS 中继宿主：dev 用 vite plugin 够用；**生产**（vercel 部署的编辑器）页面无法常驻 localhost 服务 | 候选 a：用户手动 `npx mcp-magic-maker` 起本地进程 + 浏览器扩展注入；候选 b：Trae 侧只对 localhost dev 环境开放桥 |
| V2 | MCP node SDK 版本与 Trae 的 MCP 实现兼容面 | 用 `@modelcontextprotocol/sdk` latest 起最小 demo 与 Trae 实测 |
| V3 | 跨设备/远程场景是否需要（阶段三后评估） | 明确先不做，本地优先 |

---

## 6. 里程碑切分建议（W5-W7，对齐 BIG_ITERATION_PLAN 阶段二）

| 周 | 交付 | 设计文档对应 |
|---|---|---|
| **W5 命令层 + 工具集** | `EditCommand` 骨架 + `splitAt` 纯函数 + `DeleteRangeCmd` 波纹删除 + `query_timeline` / `export_video` 入注册表；**Node 脚本按 JSON 驱动全流程**（可演示验收）；`gen-tool-schema.ts` 出第一份 tools.json | §1、§3 |
| **W6 whisper（agent 的耳朵）** | whisper.worker + PCM 管线 + `SubtitleSegment` 落轨 + `transcribe` / `query_segments` / `set_segment_text` 入注册表 | §1.2、§3.2 |
| **W7 agent 运行时 + 内测** | function calling 循环 + 护栏（步数/重试/超时）+ 对话面板 UI（确认卡/一键全撤/影响范围卡片）+ BYOK 设置 + 10 段真实素材实测调 prompt + 内测发布 | §2、§4 |

MCP 桥（§5）排在内测发布之后、阶段三之前，作为独立小块：先 `tools/mcp-bridge` 最小 demo（tools/list + query_timeline + export_video 三个只读/低危工具打通 Trae），再放开写工具。

每周末门槛不变：typecheck 零错误 + 回归全量 + 新增纯逻辑（splitAt、命令 undo 逆推、循环护栏）有 Vitest 单测。

---

## 7. 阶段二明确不做

- 转写面板（Descript 手动通路）→ 阶段三 W8；字幕样式面板 → 阶段三 W9。
- 流式逐步执行、多轮对话记忆优化、agent 自动重试策略调优 → P2。
- MCP 桥生产形态（V1-V3）→ 阶段二只交草案与最小 demo。
