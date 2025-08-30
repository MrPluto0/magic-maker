import { useTrackState } from "@/stores/track";
import hotkeys from "hotkeys-js";
import { usePlayerState } from "@/stores/player";
import { useProjectState } from "@/stores/project";

const projectStore = useProjectState();
const trackStore = useTrackState();
const playerStore = usePlayerState();

export const initEditorHotKey = () => {
	// 删除轨道上的素材
	hotkeys("backspace,delete", (event, handler) => {
		trackStore.removeTrack();
		event.preventDefault();
	});
	// 播放暂停
	hotkeys("space", (event, handler) => {
		playerStore.isPause = !playerStore.isPause;
		event.preventDefault();
	});
	// 快进
	hotkeys("right", (event, handler) => {
		playerStore.forward();
		event.preventDefault();
	});
	// 快退
	hotkeys("left", (event, handler) => {
		playerStore.backward();
		event.preventDefault();
	});
	// 添加文字
	hotkeys("t|T", (event, handler) => {
		trackStore.addText();
		event.preventDefault();
	});
	hotkeys("l", (event, handler) => {
		trackStore.leftLink();
		event.preventDefault();
	});
	hotkeys("s", (event, handler) => {
		trackStore.splitTrack();
		event.preventDefault();
	});
	// 复制素材
	hotkeys("ctrl+c", (event, handler) => {
		if (trackStore.selectTrack) {
			trackStore.copyData = trackStore.selectTrack;
			event.preventDefault();
		}
	});
	// 粘贴素材
	hotkeys("ctrl+v", (event, handler) => {
		(async () => {
			if (trackStore.copyData) {
				const newTrack = await trackStore.copyTrack(trackStore.copyData);
				const frameCount = newTrack.end - newTrack.start;
				newTrack.start = playerStore.playStartFrame;
				newTrack.end = newTrack.start + frameCount;
				trackStore.addTrack(newTrack);
				event.preventDefault();
			}
		})();
	});
	hotkeys("ctrl+s", (event, handler) => {
		projectStore.saveProject().then(() => {
			ElMessage.success("保存成功");
		});
		event.preventDefault();
	});
	hotkeys("ctrl+z", (event, handler) => {
		trackStore._undo();
		event.preventDefault();
	});
	hotkeys("ctrl+shift+z", (event, handler) => {
		trackStore._redo();
		event.preventDefault();
	});
};

export const clearHotKey = () => {
	hotkeys.deleteScope("all");
};
