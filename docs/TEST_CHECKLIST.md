# 回归验证清单

> 执行环境：无头 Chrome（Playwright 驱动，`channel="chrome"`），dev server `pnpm dev --port 5175`。
> 最近执行：2026-10-23（阶段一 W1 收口）。脚本：`/tmp/mmtest/reg_stage1.py`（无头驱动，通过 pinia store 驱动剪辑动作 + 快捷键路径，导出经 stub `showSaveFilePicker` 捕获字节）。
> 历史基线：2026-10-13（P0-9，14 项 12 ✅，#5 分割后导出失败为已知阻断 bug）。

## 用例（19 项全过）

| # | 步骤 | 预期 | 结果 | 备注 |
|---|------|------|------|------|
| 1 | 首页 mock 登录（注入 pinia persist 登录态） | 进入首页，可见项目列表区 | ✅ | |
| 2 | 新建项目 | store.project 就绪，IDB 写入 | ✅ | |
| 3 | 上传 3 类素材（视频/音频/图片） | 资源入列，OPFS 写入原文件 + 封面 | ✅ | opfs 5 个文件 |
| 4 | 素材添加到轨道 | 视频/图片/音频三条轨道生成 | ✅ | image 0-120 / video 0-61 / audio 0-30 |
| 8 | 纯净项目导出 mp4（stub 保存句柄） | 产出 mp4 字节 | ✅ | 180138 bytes |
| 13 | 撤销（undo）→ 播放 | 撤销后播放器正常逐帧推进 | ✅ | frame 0→46 |
| 15a | 分割视频轨（S，播放头 30 帧处） | 片段分裂为 2 段，offsetL/offsetR 正确 | ✅ | 左 [0,30) offsetR=31，右 [30,61) offsetL=30 |
| **15** | **分割 → 立即导出** | 导出成功（原 D1 阻断 bug） | ✅ | 180050 bytes；修复 `Decoder.split` offsetR 裁剪（公式抽为 `splitClipBoundaries` 纯函数 + Vitest 锁定） |
| **16** | **分割 → undo → 导出** | 撤销回单段后导出成功，Track 原型方法完整 | ✅ | 180138 bytes；顺带修复 undo 插件两个缺陷（见下） |
| 17a | 文本轨分割后 `combine()` 时长 | duration = (end-start)×帧时长，而非 frameCount | ✅ | 0.5s / 1.5s 两段均正确（原 D1b TODO） |
| **17** | **文本轨 → 导出** | 导出成功且文本时长正确 | ✅ | 180138 bytes |
| 6 | 保存（ctrl+s） | IDB 记录更新（3 资源/4 轨道线） | ✅ | |
| 7 | 刷新页面恢复 | 项目/资源/轨道从 IDB+OPFS 重建 | ✅ | res=3, lines=4 |
| 5 | 剪辑：快进→分割(S)（快捷键路径） | 片段正确分裂 | ✅ | video 段数 1→2 |
| 11 | localStorage 占用 < 100KB | | ✅ | 127 bytes |
| 14 | 删除资源 | 列表移除 + OPFS 文件同步删除 | ✅ | |
| 9 | draw 页添加图片素材 | 白板渲染元素 | ✅ | `drawStore.addMaterial` 落板 |
| 10 | draw 保存 → 刷新恢复 | 图片二进制落 OPFS，无 blob: 死链 | ✅ | url=`draw_…` |
| 12 | grep 无 `/tos` 残留 | 无命中 | ✅ | src/vite.config/vercel.json 均 0 命中 |

## 本轮修复（W1）

1. **D1 分割后导出失败**：恢复 `Decoder.split` 的 offsetR 收尾裁剪；帧数公式抽成纯函数 `splitClipBoundaries`（`src/utils/track.ts`）并加 Vitest 单测（`tests/split-clip-boundaries.spec.ts`，7 例）。
2. **D1b 文本轨导出时长错误**：`TextTrack.combine` 的 duration 改用 `end-start`；删除 TextTrack 的 `[k:string]:any` 索引签名，`BaseTrack` 显式声明 `offsetL/offsetR`。
3. **D1c 水印 sprite 双加**：删除 `exportVideo` 里多余的 `com.addSprite(watermark)`。
4. **D5 播放时钟定步长漂移**：`CanvasPlayer.#play` 改为 rAF + `audioContext.currentTime` 时间基准反推帧号，音画同源。
5. **undo 插件两处缺陷**（#16 回归暴露）：
   - `_undo/_redo` 用 `$patch` 把栈内快照按引用并入 state，undo 后再编辑会原地改写历史快照，导致后续 undo 永久失效 → 应用快照前 `cloneDeep`；
   - `preventUpdateOnSubscribe` 标记在 patch 未触发订阅时（快照与当前状态相同）永不复位，后续所有变更被抑制、undo 栈停摆 → patch 后同步复位。
   （undo 的类实例快照模型本身按计划在阶段二 W4 重构为序列化重建，本轮不做。）

## 已知问题（非阻断）

1. 偶发 `generate thumbnails aborted`：缩略图生成被刷新/撤销打断时的 WebAV 内部 abort，无功能影响。
2. draw 页手绘笔迹无法经无头自动化模拟（Excalidraw freedraw 需真实指针事件），元素级持久化链路已用图片素材验证。
3. 保存的项目 JSON 中 resource.url 为运行期 blob: URL（刷新后经 `loadResources` 从 opfsKey 重建，不影响恢复）。

## 双浏览器说明

验证环境为 Chromium 内核无头 Chrome。Edge 同为 Chromium 内核，OPFS/WebCodecs/IndexedDB 行为一致；建议发布前在 Edge 真机人工过一遍 #7/#15/#16/#17。
