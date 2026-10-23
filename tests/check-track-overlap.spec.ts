import type { Track } from "@/types/track";
import { checkTrackOverlap } from "@/utils/track";

function fakeTrack(start: number, end: number): Track {
	return { start, end } as unknown as Track;
}

describe("checkTrackOverlap", () => {
	const list = [fakeTrack(0, 100), fakeTrack(120, 200), fakeTrack(260, 300)];

	it("无重叠的新片段返回 hasOverlap=false 和正确插入位置", () => {
		const r = checkTrackOverlap(list, fakeTrack(210, 250));
		expect(r.hasOverlap).toBe(false);
		expect(r.insertIndex).toBe(2);
	});

	it("新片段落在空白末尾：插入到最后一行", () => {
		const r = checkTrackOverlap(list, fakeTrack(310, 400));
		expect(r.hasOverlap).toBe(false);
		expect(r.insertIndex).toBe(3);
	});

	it("新片段包含老片段：重叠", () => {
		const r = checkTrackOverlap(list, fakeTrack(0, 300));
		expect(r.hasOverlap).toBe(true);
		expect(r.overLapIndex).toBe(0);
	});

	it("新片段起点落在老片段内部：重叠", () => {
		expect(checkTrackOverlap(list, fakeTrack(150, 250)).hasOverlap).toBe(
			true,
		);
	});

	it("新片段终点落在老片段内部：重叠", () => {
		expect(checkTrackOverlap(list, fakeTrack(50, 150)).hasOverlap).toBe(
			true,
		);
	});

	it("首尾相接（end==start）不算重叠", () => {
		const r = checkTrackOverlap(list, fakeTrack(100, 120));
		expect(r.hasOverlap).toBe(false);
	});

	it("行内移动时忽略被移动元素自身", () => {
		// moveIndex=0：忽略 list[0]，与 list[1]（120-200）重叠才报
		const r = checkTrackOverlap(list, fakeTrack(0, 100), 0);
		expect(r.hasOverlap).toBe(false);
		const r2 = checkTrackOverlap(list, fakeTrack(50, 130), 0);
		expect(r2.hasOverlap).toBe(true);
		expect(r2.overLapIndex).toBe(1);
	});
});
