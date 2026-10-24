import {
	plainifyTrack,
	plainifyTrackList,
	rebuildTrack,
	rebuildTrackList,
} from "@/utils/trackData";
import type { Track, TrackData, TrackLineItem } from "@/types/track";

// 结构上等价于四个 Track 类实例的夹具（纯数据 + 原型方法模拟），
// plainify 只取自有可枚举字段，不关心原型来源。

function makeVideoTrack(overrides: Partial<TrackData> = {}): Track {
	const base = {
		id: "vid-1",
		type: "video" as const,
		resource: {
			id: "res-video", name: "a.mp4", type: "video" as const,
			createdAt: "t", url: "blob:x", format: "mp4", duration: 2,
			width: 320, height: 240,
		},
		name: "a.mp4",
		format: "mp4",
		frameCount: 60,
		start: 10,
		end: 40,
		centerX: 5,
		centerY: -5,
		scale: 80,
		height: 240,
		width: 320,
		offsetL: 10,
		offsetR: 30,
		fps: 30,
		mute: false,
		loading: false,
		...overrides,
	};
	// 模拟类实例：方法与 getter 在原型上，不应进快照
	const proto = {
		draw() {},
		combine() {},
		get drawWidth() {
			return 0;
		},
	};
	return Object.assign(Object.create(proto), base) as unknown as Track;
}

function makeAudioTrack(): Track {
	const base = {
		id: "aud-1",
		type: "audio" as const,
		resource: {
			id: "res-audio", name: "a.wav", type: "audio" as const,
			createdAt: "t", url: "blob:y", format: "wav", duration: 1,
		},
		name: "a.wav",
		format: "wav",
		frameCount: 30,
		start: 0,
		end: 30,
		offsetL: 0,
		offsetR: 0,
		volume: 0.5,
		mute: true,
		loading: false,
		subtitle: {
			show: true, fontSize: 40, fontColor: "#fff",
			strokeSize: 2, strokeColor: "#000", bottomOffset: 30,
			fontFamily: "Noto Sans SC",
		},
	};
	return Object.assign({}, base) as unknown as Track;
}

function makeImageTrack(): Track {
	const base = {
		id: "img-1",
		type: "image" as const,
		resource: {
			id: "res-img", name: "a.png", type: "image" as const,
			createdAt: "t", url: "blob:z", format: "png",
			width: 100, height: 100,
		},
		name: "a.png",
		format: "png",
		frameCount: 120,
		start: 0,
		end: 120,
		centerX: 0,
		centerY: 0,
		scale: 100,
		height: 100,
		width: 100,
		offsetL: 0,
		offsetR: 0,
		loading: false,
	};
	const proto = { combine() {}, get drawWidth() { return 0; } };
	return Object.assign(Object.create(proto), base) as unknown as Track;
}

function makeTextTrack(): Track {
	const base = {
		id: "txt-1",
		type: "text" as const,
		resource: { id: "res-txt", name: "文本", type: "text" as const, text: "你好" },
		name: "文本",
		format: "text",
		frameCount: 60,
		start: 30,
		end: 90,
		offsetL: 0,
		offsetR: 0,
		centerX: 0,
		centerY: 0,
		scale: 100,
		width: 48,
		height: 28,
		fill: "#FFF",
		stroke: "#000",
		textBackgroundColor: undefined,
		fontSize: 24,
		fontFamily: "Arial",
		text: "你好",
		loading: false,
	};
	const proto = { draw() {}, combine() {}, calcSize() {} };
	return Object.assign(Object.create(proto), base) as unknown as Track;
}

describe("plainifyTrack / plainifyTrackList", () => {
	it("video 轨（带裁剪 offset）：只留自有可序列化字段，方法与 getter 不进快照", () => {
		const data = plainifyTrack(makeVideoTrack());
		const json = JSON.parse(JSON.stringify(data));

		expect(data.start).toBe(10);
		expect(data.end).toBe(40);
		expect(data.offsetL).toBe(10);
		expect(data.offsetR).toBe(30);
		expect(data.resource).toMatchObject({ id: "res-video", type: "video" });
		// 方法 / 原型 getter 均不进入快照
		expect((data as Record<string, unknown>).draw).toBeUndefined();
		expect((data as Record<string, unknown>).combine).toBeUndefined();
		expect((data as Record<string, unknown>).drawWidth).toBeUndefined();
		expect((data as Record<string, unknown>).drawHeight).toBeUndefined();
		// JSON 往返无损
		expect(json).toEqual(data);
	});

	it("audio 轨：volume/subtitle 深拷贝进快照，改快照不影响原实例", () => {
		const track = makeAudioTrack();
		const data = plainifyTrack(track);

		expect(data.volume).toBe(0.5);
		expect(data.subtitle).toMatchObject({ show: true, fontSize: 40 });
		data.subtitle!.fontSize = 99;
		data.volume = 2;
		expect(
			(track as unknown as { subtitle: { fontSize: number } }).subtitle.fontSize,
		).toBe(40);
		expect((track as unknown as { volume: number }).volume).toBe(0.5);
	});

	it("image 轨：绘制字段进快照，方法不进", () => {
		const data = plainifyTrack(makeImageTrack());
		expect(data).toMatchObject({ type: "image", scale: 100, frameCount: 120 });
		expect((data as Record<string, unknown>).combine).toBeUndefined();
		expect((data as Record<string, unknown>).drawWidth).toBeUndefined();
	});

	it("text 轨：样式字段（fill/fontSize 等）进快照，无完整 Resource 字段也能投影", () => {
		const data = plainifyTrack(makeTextTrack());
		expect(data).toMatchObject({
			type: "text", fill: "#FFF", stroke: "#000",
			fontSize: 24, fontFamily: "Arial", text: "你好",
		});
		expect(data.resource).toMatchObject({ id: "res-txt", type: "text" });
	});

	it("plainifyTrackList：保留行序/type/main，list 逐项投影", () => {
		const trackList = [
			{ type: "video" as const, main: true, list: [makeVideoTrack()] },
			{ type: "text" as const, list: [makeTextTrack()] },
		] as unknown as TrackLineItem[];

		const data = plainifyTrackList(trackList);
		expect(data).toHaveLength(2);
		expect(data[0]).toMatchObject({ type: "video", main: true });
		expect(data[0].list).toHaveLength(1);
		expect(data[0].list[0].id).toBe("vid-1");
		expect(data[1].main).toBeUndefined();
		expect(data[1].list[0].id).toBe("txt-1");
	});
});

describe("rebuildTrack / rebuildTrackList", () => {
	it("回填全部快照字段（含裁剪 offset），id 保持快照原值", async () => {
		const data = plainifyTrack(makeVideoTrack());
		const created: unknown[] = [];
		const track = await rebuildTrack(data, async (resource, start, volume) => {
			created.push({ resource, start, volume });
			return makeVideoTrack({ id: "fresh-id", start: 0, end: 60, offsetL: 0, offsetR: 0 });
		});

		expect(track.id).toBe("vid-1"); // 快照 id 优先，身份稳定
		expect(track.start).toBe(10);
		expect(track.end).toBe(40);
		expect(track.offsetL).toBe(10);
		expect(track.offsetR).toBe(30);
		// 工厂收到快照的 resource/start（volume 缺省 1）
		expect(created[0]).toMatchObject({
			start: 10,
			volume: 1,
			resource: { id: "res-video" },
		});
	});

	it("快照无 id 时保留工厂新 id", async () => {
		const data = { ...plainifyTrack(makeVideoTrack()), id: "" };
		const track = await rebuildTrack(data, async () =>
			makeVideoTrack({ id: "fresh-id" }));
		expect(track.id).toBe("fresh-id");
	});

	it("resolveResource 重挂活资源实例（resource 重建）", async () => {
		const data = plainifyTrack(makeVideoTrack());
		const liveResource = { ...data.resource, url: "blob:rebuilt" };
		const track = await rebuildTrack(
			data,
			async () => makeVideoTrack(),
			() => liveResource as Track["resource"],
		);
		expect(track.resource).toBe(liveResource);
	});

	it("rebuildTrackList：空轨道线跳过，行序/type/main 保持", async () => {
		const data = plainifyTrackList([
			{ type: "video", main: true, list: [makeVideoTrack()] },
			{ type: "audio", list: [] },
			{ type: "text", list: [makeTextTrack()] },
		] as unknown as TrackLineItem[]);

		const result = await rebuildTrackList(data, async (r) => {
			const t = { video: makeVideoTrack, text: makeTextTrack } as Record<
				string,
				() => Track
			>;
			return (t[(r as { type: string }).type] ?? (() => makeVideoTrack()))();
		});

		expect(result).toHaveLength(2);
		expect(result[0]).toMatchObject({ type: "video", main: true });
		expect(result[1]).toMatchObject({ type: "text" });
		expect(result[0].list[0].id).toBe("vid-1");
		expect(result[1].list[0].id).toBe("txt-1");
	});

	it("完整往返：plainify → JSON → parse → rebuild → plainify 与原快照一致", async () => {
		const source = [
			{ type: "video" as const, main: true, list: [makeVideoTrack()] },
			{ type: "audio" as const, list: [makeAudioTrack()] },
			{ type: "image" as const, list: [makeImageTrack()] },
			{ type: "text" as const, list: [makeTextTrack()] },
		] as unknown as TrackLineItem[];

		const snap = JSON.stringify(plainifyTrackList(source));
		const parsed = JSON.parse(snap);
		const rebuilt = await rebuildTrackList(parsed, async (resource) => {
			const makers: Record<string, () => Track> = {
				video: makeVideoTrack,
				audio: makeAudioTrack,
				image: makeImageTrack,
				text: makeTextTrack,
			};
			return makers[(resource as { type: string }).type]();
		});

		const roundTrip = JSON.parse(JSON.stringify(plainifyTrackList(rebuilt)));
		expect(roundTrip).toEqual(parsed);
	});
});
