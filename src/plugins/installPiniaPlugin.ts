import { cloneDeep, debounce } from "lodash-es";
import type { PiniaPluginContext, StateTree } from "pinia";
import { createStack } from "@/utils/stack";

type Store = PiniaPluginContext["store"];
type Options = PiniaPluginContext["options"];

interface Serializer {
	serialize: (value: any) => string;
	deserialize: (value: string) => any;
}

type PluginOptions = PiniaPluginContext & {
	serializer?: Serializer;
};

declare module "pinia" {
	export interface PiniaCustomProperties {
		_undo: () => void;
		_redo: () => void;
		_resetStack: () => void;
	}

	export interface DefineStoreOptionsBase<S extends StateTree, Store> {
		undo?: {
			watch?: Array<keyof S>;
		};
	}
}

/**
 * Removes properties from the store state.
 * @param options The options object defining the store passed to `defineStore()`.
 * @param store The store the plugin is augmenting.
 * @param serializer Custome serializer to serialize state before storing it in the undo stack.
 * @returns {object} State of the store without omitted keys.
 */
function removeOmittedKeys(
	options: Options,
	store: Store,
	serializer: Serializer = {
		serialize: JSON.stringify,
		deserialize: JSON.parse,
	},
): Store["$state"] {
	const clone = {};
	options.undo.watch.forEach((key) => {
		// clone[key] = serializer.deserialize(serializer.serialize(store[key]));
		clone[key] = cloneDeep(store[key]);
	});
	return clone;
}

export default function PiniaUndo({
	store,
	options,
	serializer,
}: PluginOptions) {
	if (!options?.undo?.watch) return;
	if (options.undo.watch.length == 0) return;

	let stack = createStack(removeOmittedKeys(options, store, serializer));
	let preventUpdateOnSubscribe = false;
	const pushStack = debounce(() => {
		const state = removeOmittedKeys(options, store, serializer);
		stack.push(state);
	}, 500);

	store._undo = () => {
		preventUpdateOnSubscribe = true;
		// $patch 会把快照里的数组/对象按引用并入 state，若不重新克隆，
		// undo 后的编辑会原地改写栈内历史快照，导致后续 undo 失效
		store.$patch(cloneDeep(stack.undo()));
		// $subscribe 为 flush: 'sync'，回调已在 $patch 期间同步消费标记；
		// 若本次 patch 未触发订阅（快照与当前状态相同），标记必须在这里复位，
		// 否则后续所有状态变更都会被永久抑制、undo 栈不再前进
		preventUpdateOnSubscribe = false;
	};

	store._redo = () => {
		preventUpdateOnSubscribe = true;
		store.$patch(cloneDeep(stack.redo()));
		preventUpdateOnSubscribe = false;
	};

	store._resetStack = () => {
		stack = createStack(removeOmittedKeys(options, store, serializer));
	};

	store.$subscribe(
		(mutations) => {
			if (preventUpdateOnSubscribe) {
				preventUpdateOnSubscribe = false;
				return;
			}
			pushStack();
		},
		{
			flush: "sync",
		},
	);
}
