import { a as t, c as n } from "./chunk-CTQKIOE4.js";
import { a as r } from "./chunk-M2JW2GFW.js";
import "./chunk-SXMPUQ6M.js";
r();
var f = import.meta.url ? new URL(import.meta.url) : void 0;
typeof window > "u" &&
	typeof self < "u" &&
	(self.onmessage = async (e) => {
		switch (e.data.command) {
			case t.Subset:
				let a = await n(e.data.arrayBuffer, e.data.codePoints);
				self.postMessage(a, { transfer: [a] });
				break;
		}
	});
export { f as WorkerUrl };
