// 一般第一个current为空
export function createStack<T>(current: T, start = 2, maxLen = 20) {
	let stack = [current];
	let index = stack.length;

	function update() {
		current = stack[index - 1];
		if (stack.length > maxLen) {
			stack.shift();
			index -= 1;
		}
		return current;
	}

	return {
		push: (value: T) => {
			stack.length = index;
			stack[index++] = value;
			return update();
		},
		undo: () => {
			if (index > start) index -= 1;
			return update();
		},
		redo: () => {
			if (index < stack.length) index += 1;
			return update();
		},
		reset: () => {
			stack = stack.slice(0, start);
			stack.length = start;
			index = start;
			return update();
		},
	};
}
