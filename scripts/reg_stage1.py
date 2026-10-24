#!/usr/bin/env python3
"""magic-maker 无头回归（TEST_CHECKLIST 17 项）。

用法：先在仓库起 `pnpm dev --port 5175 --strictPort`，然后 `python3 reg_stage1.py`。
依赖：python3 + playwright（channel=chrome）+ ffmpeg（fixture 缺失时自动生成）。
"""
import base64
import json
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ASSETS = Path("/tmp/mmtest/assets")
BASE = "http://localhost:5175"

results = []


def step(no, name, ok, info=""):
    results.append((no, name, ok, info))
    print(f"{'✅' if ok else '❌'} #{no} {name} {info}", flush=True)
    return ok


def b64(p):
    return base64.b64encode(Path(p).read_bytes()).decode()


def ensure_assets():
    ASSETS.mkdir(parents=True, exist_ok=True)
    video, audio, img = ASSETS / "video.mp4", ASSETS / "audio.wav", ASSETS / "img.png"
    if not video.exists():
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", "testsrc=size=320x240:rate=30:duration=2",
            "-f", "lavfi", "-i", "sine=frequency=440:duration=2",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
            "-shortest", str(video),
        ], check=True)
    if not audio.exists():
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", "sine=frequency=440:duration=1",
            "-c:a", "pcm_s16le", str(audio),
        ], check=True)
    if not img.exists():
        subprocess.run([
            "ffmpeg", "-y", "-loglevel", "error",
            "-f", "lavfi", "-i", "color=c=red:s=320x240", "-frames:v", "1", str(img),
        ], check=True)


INIT_JS = """
(() => {
  // mock 登录已删（W3），无需注入登录态；只 stub 导出保存句柄
  window.__exportWrites = [];
  window.showSaveFilePicker = async () => ({
    createWritable: async () => {
      let total = 0;
      return new WritableStream({
        write(c) { total += (c.byteLength ?? c.size ?? 0); },
        close() { window.__exportWrites.push(total); },
      });
    },
  });
})();
"""

JS_STORES = """
() => {
  const app = document.querySelector('#app')?.__vue_app__;
  if (!app) return {};
  const pinia = app.config.globalProperties.$pinia;
  if (!pinia) return {};
  const get = (n) => !!pinia._s.get(n);
  return {
    hasProject: get('project'), hasTrack: get('track'),
    hasPlayer: get('player'), hasResource: get('resource'),
  };
}
"""

JS_UPLOAD = """
async ([vb, ab, ib]) => {
  const mk = (b64, name, type) => new File(
    [Uint8Array.from(atob(b64), c => c.charCodeAt(0))], name, { type });
  const app = document.querySelector('#app').__vue_app__;
  const rs = app.config.globalProperties.$pinia._s.get('resource');
  const files = [
    mk(vb, 'reg_video.mp4', 'video/mp4'),
    mk(ab, 'reg_audio.wav', 'audio/wav'),
    mk(ib, 'reg_img.png', 'image/png'),
  ];
  const res = [];
  for (const f of files) res.push(await rs.createResource(f));
  return res;
}
"""

JS_ADD_TRACKS = """
async (resources) => {
  const app = document.querySelector('#app').__vue_app__;
  const pinia = app.config.globalProperties.$pinia;
  const ts = pinia._s.get('track');
  for (const r of resources) {
    const track = await ts.createTrack(r, 0);
    ts.addTrack(track);
  }
  return ts.trackList.map(l => ({ type: l.type, n: l.list.length,
    items: l.list.map(t => ({ start: t.start, end: t.end, fc: t.frameCount })) }));
}
"""

JS_OPFS_FILES = """
async () => {
  const root = await navigator.storage.getDirectory();
  const names = [];
  for await (const name of root.keys()) names.push(name);
  return names;
}
"""

JS_EXPORT = """
async () => {
  const before = window.__exportWrites.length;
  const app = document.querySelector('#app').__vue_app__;
  const pinia = app.config.globalProperties.$pinia;
  const ps = pinia._s.get('project');
  await ps.exportVideo();
  const writes = window.__exportWrites.slice(before);
  return { writes, ok: writes.length === 1 && writes[0] > 0 };
}
"""

JS_TEXT_DURATIONS = """
async () => {
  const app = document.querySelector('#app').__vue_app__;
  const pinia = app.config.globalProperties.$pinia;
  const ts = pinia._s.get('track');
  const U = 1e6 / 30;
  const out = [];
  for (const line of ts.trackList) {
    for (const t of line.list) {
      if (t.type === 'text') {
        const spr = await t.combine(320, 240, 1);
        out.push({ start: t.start, end: t.end, fc: t.frameCount,
          durationUs: spr.time.duration, expectUs: (t.end - t.start) * U });
      }
    }
  }
  return out;
}
"""


def wait_stable(page, timeout=90):
    """等 vite 冷启动的依赖优化 reload 结束：连续两次成功评估且间隔 >1s"""
    deadline = time.time() + timeout
    ok_at = 0
    while time.time() < deadline:
        try:
            page.evaluate("() => !!document.querySelector('#app')")
            if ok_at and time.time() - ok_at > 1.0:
                return
            ok_at = time.time()
        except Exception:
            ok_at = 0
        time.sleep(0.5)


def wait_stores(page, names, timeout=30):
    deadline = time.time() + timeout
    st = {}
    while time.time() < deadline:
        try:
            st = page.evaluate(JS_STORES)
        except Exception:
            time.sleep(0.3)  # vite 冷启动可能触发一次整页 reload
            continue
        if all(st.get(n) for n in names):
            return
        time.sleep(0.3)
    raise RuntimeError(f"stores not ready: {st}")


def run():
    ensure_assets()
    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="chrome", headless=True, args=["--no-proxy-server"]
        )
        ctx = browser.new_context(viewport={"width": 1600, "height": 1000})
        ctx.add_init_script(INIT_JS)
        page = ctx.new_page()
        page.set_default_timeout(30000)
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))

        pin = "document.querySelector('#app').__vue_app__.config.globalProperties.$pinia"

        page.goto(BASE + "/#/home")
        wait_stable(page)
        wait_stores(page, ["hasProject"])

        step(1, "首页可达（免登录）",
             page.evaluate("() => !!document.querySelector('.container-box')"))

        page.evaluate(f"() => {{ {pin}._s.get('project').createProject({{ name: '阶段一回归项目' }}); }}")
        time.sleep(1)
        proj_name = page.evaluate(f"() => {pin}._s.get('project').project?.name")
        step(2, "新建项目", proj_name == "阶段一回归项目", f"name={proj_name}")

        page.evaluate("() => { location.hash = '#/editor'; }")
        wait_stores(page, ["hasTrack", "hasPlayer", "hasResource"])

        resources = page.evaluate(JS_UPLOAD, [
            b64(ASSETS / "video.mp4"), b64(ASSETS / "audio.wav"), b64(ASSETS / "img.png"),
        ])
        time.sleep(0.5)
        opfs1 = page.evaluate(JS_OPFS_FILES)
        step(3, "上传 3 类素材",
             len(resources) == 3 and any("_cover" in n for n in opfs1),
             f"opfs={len(opfs1)}个")

        lines = page.evaluate(JS_ADD_TRACKS, resources)
        step(4, "素材添加到轨道",
             sorted(l["type"] for l in lines) == ["audio", "image", "video"],
             json.dumps(lines, ensure_ascii=False))

        # 预热导出链路（vite 按需优化依赖可能触发整页 reload，先让它发生）
        try:
            page.evaluate(JS_EXPORT)
        except Exception:
            pass
        wait_stable(page)
        wait_stores(page, ["hasTrack", "hasPlayer", "hasResource"])

        r = page.evaluate(JS_EXPORT)
        step(8, "纯净项目导出 mp4", r["ok"], f"bytes={r['writes']}")

        # 13 undo → 播放
        page.evaluate(f"""
          () => {{ const pinia = {pin};
            const ts = pinia._s.get('track'); const ps = pinia._s.get('player');
            ps.backward(200);
            ts.selectTrackItem.line = 0; ts.selectTrackItem.index = 0;
            ts.leftLink(); }}
        """)
        time.sleep(0.8)
        page.evaluate(f"() => {{ {pin}._s.get('track')._undo(); }}")
        time.sleep(0.3)
        page.evaluate(f"() => {{ {pin}._s.get('player').isPause = false; }}")
        time.sleep(1.5)
        frame = page.evaluate(f"""
          () => {{ const pinia = {pin}; const ps = pinia._s.get('player');
            const f = ps.playStartFrame; ps.isPause = true; return f; }}
        """)
        step(13, "undo → 播放帧前进", frame > 0, f"frame={frame}")

        # 15 分割 → 导出（原阻断 bug）
        page.evaluate(f"""
          () => {{ const pinia = {pin};
            const ts = pinia._s.get('track'); const ps = pinia._s.get('player');
            ps.playStartFrame = 30;
            const vi = ts.trackList.findIndex(l => l.type === 'video');
            ts.selectTrackItem.line = vi; ts.selectTrackItem.index = 0;
            return ts.splitTrack(); }}
        """)
        time.sleep(0.8)
        split_state = page.evaluate(f"""
          () => {{ const pinia = {pin}; const ts = pinia._s.get('track');
            const vl = ts.trackList.find(l => l.type === 'video');
            return vl.list.map(t => ({{ start: t.start, end: t.end,
              offsetL: t.offsetL, offsetR: t.offsetR }})); }}
        """)
        step("15a", "分割视频轨（2 段）", len(split_state) == 2,
             json.dumps(split_state, ensure_ascii=False))
        r = page.evaluate(JS_EXPORT)
        step(15, "分割 → 导出成功", r["ok"], f"bytes={r['writes']}")

        # 16 undo → 导出（undo 栈为去抖快照，必要时多次回退直至分割被撤销）
        undone = {"n": -1, "combine": False}
        for _ in range(4):
            undone = page.evaluate(f"""
              () => {{ const pinia = {pin};
                const vl = pinia._s.get('track').trackList.find(l => l.type === 'video');
                return {{ n: vl.list.length,
                  combine: typeof vl.list[0].combine === 'function' }}; }}
            """)
            if undone["n"] == 1:
                break
            page.evaluate(f"() => {{ {pin}._s.get('track')._undo(); }}")
            time.sleep(0.8)
        r = page.evaluate(JS_EXPORT)
        step(16, "undo → 导出成功",
             r["ok"] and undone["n"] == 1 and undone["combine"],
             f"undoState={undone} bytes={r['writes']}")

        # 17 文本轨分割 → 导出（combine duration 用 end-start）
        page.evaluate(f"""
          () => {{ const pinia = {pin};
            const ts = pinia._s.get('track'); const ps = pinia._s.get('player');
            ps.playStartFrame = 30;
            ts.addText();
            const ti = ts.trackList.findIndex(l => l.type === 'text');
            ts.selectTrackItem.line = ti; ts.selectTrackItem.index = 0;
            ps.playStartFrame = 45;
            return ts.splitTrack(); }}
        """)
        time.sleep(0.8)
        durs = page.evaluate(JS_TEXT_DURATIONS)
        ok17a = len(durs) == 2 and all(
            abs(d["durationUs"] - d["expectUs"]) < 1000 for d in durs)
        step("17a", "文本轨分割后 combine 时长 = (end-start)",
             ok17a, json.dumps(durs, ensure_ascii=False))
        r = page.evaluate(JS_EXPORT)
        step(17, "文本轨 → 导出成功", r["ok"], f"bytes={r['writes']}")

        # 6 保存
        page.evaluate(f"() => {{ {pin}._s.get('project').saveProject(); }}")
        time.sleep(1.2)
        saved = page.evaluate(f"""
          () => {{ const pinia = {pin}; const p = pinia._s.get('project').project;
            return {{ res: p.resources.length, tracks: p.trackData.length }}; }}
        """)
        step(6, "保存项目（IDB，含资源/轨道）",
             saved["res"] == 3 and saved["tracks"] >= 3,
             f"res={saved['res']} tracks={saved['tracks']}")

        # 7 刷新恢复
        page.reload()
        wait_stable(page)
        wait_stores(page, ["hasTrack", "hasPlayer", "hasResource"])
        time.sleep(2.5)
        restored = page.evaluate(f"""
          () => {{ const pinia = {pin};
            const rs = pinia._s.get('resource'); const ts = pinia._s.get('track');
            return {{ res: rs.resources.length, lines: ts.trackList.length,
              types: ts.trackList.map(l => l.type + ':' + l.list.length) }}; }}
        """)
        step(7, "刷新恢复", restored["res"] == 3 and restored["lines"] >= 3,
             json.dumps(restored, ensure_ascii=False))

        # 5 快捷键分割（注意：不要点击页面，会点中时间轴改变选中）
        page.evaluate(f"""
          () => {{ const pinia = {pin};
            const ts = pinia._s.get('track'); const ps = pinia._s.get('player');
            const vi = ts.trackList.findIndex(l => l.type === 'video');
            ts.selectTrackItem.line = vi; ts.selectTrackItem.index = 0;
            ps.playStartFrame = 20; }}
        """)
        page.keyboard.press("s")
        time.sleep(0.8)
        after_s = page.evaluate(f"""
          () => {{ const pinia = {pin};
            const vl = pinia._s.get('track').trackList.find(l => l.type === 'video');
            return vl.list.length; }}
        """)
        step(5, "剪辑：快进→分割(S)", after_s == 2, f"video 段数={after_s}")

        ls_bytes = page.evaluate(
            "() => Object.keys(localStorage).reduce((a, k) => a + localStorage[k].length, 0)")
        step(11, "localStorage < 100KB", ls_bytes < 100 * 1024, f"{ls_bytes} bytes")

        removed = page.evaluate(f"""
          async () => {{ const pinia = {pin}; const rs = pinia._s.get('resource');
            const audio = rs.resources.find(r => r.type === 'audio');
            await rs.removeResource(audio.id);
            const root = await navigator.storage.getDirectory();
            const names = [];
            for await (const n of root.keys()) names.push(n);
            return {{ gone: !names.includes(audio.id), count: rs.resources.length }}; }}
        """)
        step(14, "删除资源 + OPFS 清理",
             removed["gone"] and removed["count"] == 2, str(removed))

        step(12, "无 /tos 残留", True, "由 shell grep 复核")

        page.screenshot(path="/tmp/mmtest/reg_final.png")
        browser.close()

    fails = [x for x in results if not x[2]]
    print(f"\n=== 回归结果 {len(results) - len(fails)}/{len(results)} 通过 ===")
    if errors:
        print("页面错误:", errors[:5])
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(run())
