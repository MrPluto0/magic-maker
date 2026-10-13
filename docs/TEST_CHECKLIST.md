# P0-9 回归验证清单

> 执行环境：无头 Chrome（Playwright 驱动，`channel="chrome"`），dev server `pnpm dev --port 5175`。
> 执行日期：2026-10-13。截图归档：`docs/regression/`。脚本：`/tmp/mmtest/reg_*.py`（一次性验证脚本）。

| # | 步骤 | 预期 | 结果 | 截图 |
|---|------|------|------|------|
| 1 | 首页 mock 登录（注入 pinia persist 登录态） | 进入首页，可见项目列表区 | ✅ | 01-home-login.png |
| 2 | 新建项目「回归测试项目」 | 提示"创建成功"，IndexedDB `projects` store 出现记录 | ✅ | 02-create-project.png |
| 3 | 上传 3 类素材（图片/音频/视频） | 资源列表可见，OPFS 写入 `id`/`id_cover` 文件 | ✅（文本素材无上传入口，属既有设计；文本轨道走 T 快捷键） | 03-upload-materials.png |
| 4 | 素材添加到轨道（资源卡片 + 按钮） | 视频/图片/音频三条轨道生成，缩略图/波形渲染 | ✅ | 04-tracks.png |
| 5 | 剪辑：快进→分割(S)→复制粘贴(ctrl+c/v) | 片段正确分裂/复制 | ⚠️ 分割/复制本身成功（05b）；但**分割后的项目导出报 WebAV `"time" out of bounds` —— 已在 HEAD 原始代码复现，属既有 bug**（见下方"已知问题"） | 05-edit-track.png, 05b-copy-paste.png |
| 6 | 保存（ctrl+s） | IDB 记录更新（3 资源/3 轨道线），JSON 中无 blob: 死链 | ✅ | 06-save.png |
| 7 | **刷新页面**恢复 | 项目/资源/轨道从 IDB+OPFS 重建，轨道/素材完整 | ✅ resCount=3, trackLines=3 | 07-refresh-restore.png |
| 8 | 导出 mp4（stub 保存句柄捕获字节） | 合成成功产出 mp4 字节，IDB meta `exportCount` +1 | ✅ 纯净项目导出 750034 bytes（含视频/音频混合轨道 765042 bytes）；⚠️ 分割态项目触发既有 bug | 08-export.png |
| 9 | draw 页添加图片素材 + 手绘 | 白板渲染元素 | ✅ 图片素材经 `drawStore.addMaterial` 落板 | 09-draw.png |
| 10 | draw 保存 → 刷新恢复 | 图片二进制落 OPFS（`customData.url` = `draw_<fileId>` key），刷新后从 OPFS 重建，无死链 | ✅ drawData 持久化 1 image（url=`draw_…`，无 blob:），刷新后 element+file 均恢复 | 10-draw-restore.png |
| 11 | localStorage 占用 | < 100KB | ✅ **121 bytes**（仅 `user` 登录态 + OPFS 临时文件标记） | 11-localstorage.png |
| 12 | grep 无 `/tos` 残留 | 无命中 | ✅（src/vite.config/vercel.json 均已移除） | — |
| 13 | 撤销（ctrl+z）→ 播放 | 撤销后播放器正常逐帧渲染 | ✅ 撤销后时间码前进、画面正常 | 12-undo-play.png |
| 14 | 删除资源 | 列表移除 + OPFS 文件同步删除 | ✅ 音频资源删除后 OPFS 对应文件消失 | — |

## 已知问题（非本次重构引入，已在 HEAD `e92270f` 基线复现）

1. **分割后导出失败**：视频片段经 S 分割后，`exportVideo` 抛 WebAV `"time" out of bounds`。
   复现：单视频轨道 → 分割 → 导出。原始代码（worktree 基线）行为一致。定位方向：`splitTrack`/`copyTrack` 后 `offsetL/offsetR` 与 `combine()` 传给 OffscreenSprite 的 time 参数。
2. **draw 页手绘笔迹无法经无头自动化模拟**：Excalidraw freedraw 需要真实指针事件序列，Playwright 鼓励事件未生成笔迹；元素级持久化链路（含二进制文件）已用图片素材验证。人工抽检手绘→保存→刷新即可。
3. 偶发 `generate thumbnails aborted`：缩略图生成被刷新/撤销打断时的 WebAV 内部 abort，无功能影响。

## 双浏览器说明

验证环境为 Chromium 内核无头 Chrome。Edge 同为 Chromium 内核，OPFS/WebCodecs/IndexedDB 行为一致；建议发布前在 Edge 真机人工过一遍 #7/#8/#10。
