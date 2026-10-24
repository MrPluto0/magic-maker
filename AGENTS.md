# magic-maker 项目开发规则（AGENTS.md）

> 本文件是本仓库的 agent 开发规则。任何 agent 在此仓库工作前先读这里和 `docs/BIG_ITERATION_PLAN.md`（路线与验收口径）、`docs/TEST_CHECKLIST.md`（回归用例册）。

## 执行方式铁律（用户点名）

magic-maker 的开发任务一律 delegate_task 开子会话执行，不占主会话——主会话只做对话、派活和验收。

## 收口门槛（每次提交前全过，用户硬性要求）

1. `pnpm typecheck`（vue-tsc）零错误
2. `pnpm test`（vitest，纯逻辑单测）
3. `pnpm build` 通过
4. 无头回归全过：`python3 scripts/reg_stage1.py`（仓库内脚本；先启动 dev server）

卡住的项就地回退并在回报中说明，禁止带病提交；完成后回报 commit hash、回归通过数、typecheck/build 结果、dist 体积前后对比——用户点名要这几项。

提交信息：中文，格式 `W<N>: 主题——要点` 或 `fix:/feat: 主题`，正文列条目；`pnpm biome check` 有 error 会卡 pre-commit，先 `pnpm biome check --staged --write`。

## 流程

1. 起 dev server：`pnpm dev --port 5175 --strictPort`（后台跑）。先 `kill $(lsof -t -i :5175)` 清掉残留进程——旧 vite 进程占着端口会返回 404/502。
2. 改代码 → typecheck/test/build → 跑回归脚本。

## UI / 视觉

- 设计基准：RunwayML 电影级暗黑（用户已选定）。规范全文在 popular-web-designs skill 的 `templates/runwayml.md`；要点：纯黑 #030303/#1a1a1a 面、零阴影（弹层用 1px 描边 #27272a 替代）、冷灰文本 #767d88/#a7a7a7、4px 小圆角、紧排大标题（48px/line-height 1/-1.2px 字距）、全大写微标签（11px/+0.35px 字距）。浅色模式为副主题。
- 主题实现分两层，改色板只动这两处，全站类名自动继承：① `uno.config.ts` 的 night/primary 色板（所有 `dark:bg-night*` 类跟随）② `src/styles/element.less` 的 EP 变量（`:root` 浅色 / `html.dark` 暗色 / `.theme-dark` 局部强制暗色容器）。字体用系统栈 + Inter，别拿显示字体当正文（上一版 UI 显丑的主因之一）。
- 重构 UI 时放开手脚重写页面模板，不受旧布局/旧 class 束缚——用户点名批评过「受制于之前项目的影响」导致改了等于没改。
- 自检闭环：headless Playwright 截 home/editor/弹窗（暗色+浅色都截），用 vision 逐张检查文字可读性/对比度/亮色残留，不满意改了再看；只看代码不看截图的 UI 提交会被打回。
- 改了页面标记后，同一提交里同步更新 `scripts/reg_stage1.py` 里依赖旧标记的断言（如首页选择器），否则回归假红。

## 无头回归要点（脚本已内置，改脚本时别破坏）

- 驱动方式：不点 UI，经 `document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s` 直接调 store 方法（createProject/createTrack/addTrack/splitTrack/_undo/exportVideo）；导出用 addInitScript 把 `showSaveFilePicker` stub 成真 `WritableStream`（`pipeTo` 要求真 WritableStream，普通对象会抛错），收集字节数断言。
- store 的 reactive 对象只能改字段，不能整体赋值：`ts.selectTrackItem.line = n` 可以，`ts.selectTrackItem = {line, index}` 不行——setup store 的 computed 闭包引用的是原始 reactive，替换后选中态静默失效，分割会落到错误的轨道上。
- page.evaluate 传参用扁平列表：`[[a,b,c]]` 这种单元素嵌套列表会被序列化搞坏（atob 报 InvalidCharacter），直接传 `[a,b,c]`。
- launch Chrome 必须加 `--no-proxy-server`：系统代理会拦 localhost 返回 502，报错看起来像服务没起。
- evaluate 前必须等 `#app.__vue_app__` 和 pinia store 出现，且 poll 循环要吞异常——Vite 8 冷启动按需优化依赖会触发多次整页 reload；导出链路（Combinator）首次加载也会触发一次 reload，正式步骤前先空跑一次导出预热。
- 热键路径（S 分割等）直接 `page.keyboard.press`，不要先点 body 聚焦——点击会落在时间轴上改变选中轨道。
- 诊断音频无声：addInitScript 钩 `AudioBufferSourceNode.prototype.start` 计数 + 播放数秒读计数；导出文件用 ffprobe 验证音轨存在。

## 已知项目坑

- 改了 uno.config 或动了依赖后，dev server 会 504 Outdated Optimize Dep（动态导入组件时报 Failed to fetch dynamically imported module）——重启 dev server 并加 `--force` 强制重新预构建。这与旧进程占端口的 404/502 是两种病。
- rAF 驱动的播放时钟在标签页隐藏时完全停摆（帧不走、音频不排程，后台播放无声）。CanvasPlayer 已用 visibilitychange 在 rAF 与 setInterval 兜底间切换；任何新的 rAF 循环都要考虑同样兜底。
- undo 插件（installPiniaPlugin）：`$patch` 会把快照按引用并入 state，应用快照前必须 cloneDeep，否则 undo 后的编辑原地改写历史；`preventUpdateOnSubscribe` 标记在 patch 未触发订阅时不会自己复位，undo/redo 后要手动清。改 undo 相关代码前先重读这个文件。
- 素材夹（视频/音频/图片 fixture）由 scripts/reg_stage1.py 用 ffmpeg lavfi 现生成，不要依赖 /tmp 下的旧文件。
- 回归出现 `generate thumbnails aborted` 是已知无害报错（缩略图被打断的 WebAV 内部 abort），不算失败。
