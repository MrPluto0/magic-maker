import { createStack } from "@/utils/stack";
import { cloneDeep, debounce } from "lodash-es";
import type { PiniaPluginContext } from "pinia";

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

  export interface DefineStoreOptionsBase<S, Store> {
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
  }
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
  let pushStack = debounce(() => {
    const state = removeOmittedKeys(options, store, serializer);
    stack.push(state);
  }, 500);

  store._undo = () => {
    preventUpdateOnSubscribe = true;
    store.$patch(stack.undo());
  };

  store._redo = () => {
    preventUpdateOnSubscribe = true;
    store.$patch(stack.redo());
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
    }
  );
}
