import { cloneDeep, debounce } from "lodash-es";
import type { PiniaPluginContext, StateTree } from "pinia";
import { createStack } from "@/utils/stack";
import { isSilent, notifyUserEdit } from "./undoGate";

type Store = PiniaPluginContext["store"];
type Options = PiniaPluginContext["options"];

/**
 * 快照序列化器（按 store 注入，见 DefineStoreOptionsBase.undo.serializer）：
 * - serialize：watch 的状态 → 可存储的字符串（如纯数据 JSON）
 * - deserialize：字符串 → 纯数据
 * - restore：可选。类实例状态不能走 $patch（会丢原型、方法变 undefined），
 *   由 store 用自身方法（如 trackStore.loadTrackData）重建；缺省走 $patch。
 * 插件本身不感知任何具体 store，保持通用。
 */
export interface Serializer {
	serialize: (value: any) => string;
	deserialize: (value: string) => any;
	restore?: (store: any, value: any) => void | Promise<void>;
}

type PluginOptions = PiniaPluginContext & {
	serializer?: Serializer;
};

declare module "pinia" {
	export interface PiniaCustomProperties {
		_undo: () => void;
		_redo: () => void;
		_resetStack: () => void;
		/** 立即入栈当前快照（跳过防抖）。命令组收尾/组撤销后推「组级快照」用。 */
		_snap: () => void;
	}

	export interface DefineStoreOptionsBase<S extends StateTree, Store> {
		undo?: {
			watch?: Array<keyof S>;
			/** 注入后撤销栈存序列化快照；缺省 cloneDeep 快照 + $patch 恢复 */
			serializer?: Serializer;
		};
	}
}

/**
 * 生成当前 watch 状态的快照。
 * 有 serializer 时栈里存序列化后的字符串（小且类型安全），
 * 否则退回 cloneDeep（兼容未注入序列化器的 store）。
 */
function snapshotState(
	options: Options,
	store: Store,
	serializer?: Serializer,
): Record<string, any> {
	const clone: Record<string, any> = {};
	options.undo!.watch.forEach((key) => {
		const value = store[key];
		clone[key as string] = serializer
			? serializer.serialize(value)
			: cloneDeep(value);
	});
	return clone;
}

/** 恢复快照：有 restore 钩子时经 deserialize + store 方法重建，否则 $patch */
async function applySnapshot(
	store: Store,
	snap: Record<string, any>,
	serializer?: Serializer,
) {
	if (serializer?.restore) {
		const data: Record<string, any> = {};
		for (const key of Object.keys(snap)) {
			data[key] = serializer.deserialize(snap[key]);
		}
		await serializer.restore(store, data);
		return;
	}
	// $patch 会把快照里的数组/对象按引用并入 state，若不重新克隆，
	// undo 后的编辑会原地改写栈内历史快照，导致后续 undo 失效
	store.$patch(cloneDeep(snap));
}

export default function PiniaUndo({
	store,
	options,
	serializer: pluginSerializer,
}: PluginOptions) {
	if (!options?.undo?.watch) return;
	if (options.undo.watch.length == 0) return;

	const serializer = pluginSerializer ?? options.undo.serializer;

	let stack = createStack(snapshotState(options, store, serializer));
	// 恢复期间抑制订阅。restore 可能触发多次同步 mutation（如 splice 整轨重建），
	// 用计数器而非布尔标记，保证整个恢复过程（含 await 段）都被抑制且必然复位
	let suppressDepth = 0;
	const pushStack = debounce(() => {
		stack.push(snapshotState(options, store, serializer));
	}, 500);

	const restore = async (snap: Record<string, any>) => {
		suppressDepth += 1;
		try {
			await applySnapshot(store, snap, serializer);
		} finally {
			suppressDepth = 0;
			// 快照层动作（Cmd+Z/Redo）也属于「用户编辑」：命令 inverse 引用的
			// 片段 id 在重建后可能已不存在，需使未决命令组失效（PHASE2_DESIGN §3.3 规则 1）。
			// restore 自身不 push（suppress 期间订阅已跳过），只广播失效信号。
			notifyUserEdit();
		}
	};

	store._undo = () => restore(stack.undo());

	store._redo = () => restore(stack.redo());

	store._resetStack = () => {
		stack = createStack(snapshotState(options, store, serializer));
	};

	// 组级快照：命令组收尾 / 组撤销完成后由 agent store 显式调用，
	// 把当前状态固化为最新快照（绕过防抖与 silent 标志）。
	store._snap = () => {
		stack.push(snapshotState(options, store, serializer));
	};

	store.$subscribe(
		() => {
			if (suppressDepth > 0) return;
			// 命令 do/undo 期间 silent：跳过入栈并取消在途防抖快照，
			// 避免命令层与快照层两层语义分裂（PHASE2_DESIGN §3.3 规则 3）
			if (isSilent()) {
				pushStack.cancel();
				return;
			}
			pushStack();
			// 手动编辑：广播给命令层使未决命令组失效
			notifyUserEdit();
		},
		{
			flush: "sync",
		},
	);
}
