import type { Emitter } from "../emitter";
export declare const useEmitter: <TEvent>(
	emitter: Emitter<[TEvent]>,
	initialState: TEvent,
) => TEvent;
