import { baseFps, UnitFrame2μs } from "@/data/track";
import { splitClipBoundaries } from "@/utils/track";

// 分割公式语义（src/class/Decoder.ts split）：
// - startUs：左半段起点，clip.split(startUs)[1] 取右半段
// - endUs：右半段在 clip 本地坐标系的有效终点，clip.split(endUs)[0] 取裁掉 offsetR 后的左半段
describe("splitClipBoundaries", () => {
	it("未裁剪片段：startUs=0，endUs=素材全长", () => {
		const { startUs, endUs } = splitClipBoundaries(0, 0, 300);
		expect(startUs).toBe(0);
		expect(endUs).toBe(300 * UnitFrame2μs);
	});

	it("中点分割（offsetL=150, offsetR=0）：右半段从 150 帧开始到素材末尾", () => {
		const { startUs, endUs } = splitClipBoundaries(150, 0, 300);
		expect(startUs).toBe(150 * UnitFrame2μs);
		expect(endUs).toBe((300 - 0 - 150) * UnitFrame2μs);
	});

	it("中点分割后右半段的 offsetL=150, offsetR=0：endUs 即右半段长度", () => {
		// splitTrack 给右半段设置 offsetL = splitFrame - start + 旧offsetL，offsetR 保持原值
		// frameCount 是原始素材总帧数
		const { endUs } = splitClipBoundaries(150, 0, 300);
		expect(endUs / UnitFrame2μs).toBe(150); // 右半段有效 150 帧
	});

	it("左半段（offsetL=0, offsetR=150）：无需二次裁剪，endUs=150帧对应微秒", () => {
		const { startUs, endUs } = splitClipBoundaries(0, 150, 300);
		expect(startUs).toBe(0);
		expect(endUs).toBe(150 * UnitFrame2μs);
	});

	it("两端都裁剪（offsetL=30, offsetR=60）：endUs 在左裁后 clip 的本地坐标系里", () => {
		const { startUs, endUs } = splitClipBoundaries(30, 60, 300);
		expect(startUs).toBe(30 * UnitFrame2μs);
		// 右半段（本地原点在 offsetL=30 帧处）共 270 帧，裁掉尾部 offsetR=60 帧 → 保留 210 帧
		expect(endUs).toBeCloseTo((300 - 60 - 30) * UnitFrame2μs, 6);
	});

	it("1秒素材按 baseFps 折算帧数", () => {
		const frameCount = 1 * baseFps; // 30
		const { endUs } = splitClipBoundaries(0, 0, frameCount);
		expect(endUs).toBeCloseTo(1e6, 6);
	});

	it("有效帧数为 0 时 endUs 为 0（边界）", () => {
		const { endUs } = splitClipBoundaries(0, 300, 300);
		expect(endUs).toBe(0);
	});
});
