import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, defineStore, setActivePinia } from "pinia";
import { ref } from "vue";
import PiniaUndo from "@/plugins/installPiniaPlugin";
import {
	beginSilentBatch,
	endSilentBatch,
	onUserEdit,
} from "@/plugins/undoGate";

/**
 * 双层 undo 协调（docs/PHASE2_DESIGN §3.3 规则 1-4）：
 * 用真实 pinia + 真插件验证 silent 跳过、组级快照、失效广播。
 */
const useListStore = defineStore(
	"list",
	() => {
		const items = ref<string[]>([]);
		return { items };
	},
	{
		undo: { watch: ["items"] },
	},
);

beforeEach(() => {
	vi.useFakeTimers();
	const pinia = createPinia();
	pinia.use(PiniaUndo as never);
	// pinia v4：无 app 时插件进 toBeInstalled 队列，手动 install 触发
	pinia.install({
		provide: () => {},
		config: { globalProperties: {} },
	} as never);
	setActivePinia(pinia);
});

async function settle(ms = 600) {
	await vi.advanceTimersByTimeAsync(ms);
}

describe("undoGate × installPiniaPlugin", () => {
	it("规则 3：命令 do 期间（silent）不产生中间快照，一次 undo 回到组前", async () => {
		const store = useListStore();
		store.items.push("手操基线");
		await settle(); // 基线快照入栈

		beginSilentBatch();
		store.items.push("命令1");
		store.items.push("命令2");
		await settle();
		endSilentBatch();

		store._snap(); // 组级快照（收尾统一入栈）
		expect(store.items).toEqual(["手操基线", "命令1", "命令2"]);

		store._undo();
		expect(store.items).toEqual(["手操基线"]);
	});

	it("规则 3 补充：silent 开始时取消在途防抖快照", async () => {
		const store = useListStore();
		store.items.push("a");
		// 防抖未落：立即进入 silent（模拟用户编辑后立刻跑命令）
		beginSilentBatch();
		store.items.push("b");
		await settle();
		endSilentBatch();
		store._undo();
		// 栈里只有初始快照 → 一次 undo 回到空
		expect(store.items).toEqual([]);
	});

	it("规则 1：手操编辑触发 onUserEdit（silent 期间不触发）", async () => {
		const store = useListStore();
		const spy = vi.fn();
		onUserEdit(spy);

		beginSilentBatch();
		store.items.push("命令产生");
		await settle();
		expect(spy).not.toHaveBeenCalled();
		endSilentBatch();

		store.items.push("手操");
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it("规则 1：Cmd+Z（快照层 restore）也触发 onUserEdit", async () => {
		const store = useListStore();
		store.items.push("a");
		await settle();
		const spy = vi.fn();
		onUserEdit(spy);
		store._undo();
		await settle();
		expect(spy).toHaveBeenCalled();
	});

	it("规则 2：_snap 立即入栈（绕过防抖），组撤销后可固化为最新状态", () => {
		const store = useListStore();
		store.items.push("x");
		store._snap();
		store.items.push("y");
		store._snap();
		store._undo();
		expect(store.items).toEqual(["x"]);
	});

	it("不传 undo.watch 的 store 不装插件", () => {
		const plain = defineStore("plain", () => ({ v: ref(1) }));
		const store = plain();
		expect(store._undo).toBeUndefined();
		expect(store._snap).toBeUndefined();
	});
});
