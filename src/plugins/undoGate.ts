/**
 * 双层 undo 协调闸门（PHASE2_DESIGN §3.3）。
 *
 * installPiniaPlugin（快照层）与命令层共用这块共享状态：
 * - 命令 do/undo 期间置 silent：快照层跳过入栈（且取消在途的防抖快照），
 *   保证整组命令只产生一个「组级快照」；
 * - 非 silent 的快照层动作（手操编辑）与快照层恢复（Cmd+Z/Redo）触发
 *   notifyUserEdit：agent store 监听后使未决命令组失效（inverse 引用的
 *   片段 id 在重建后可能已不存在）。
 *
 * 独立成模块的原因：installPiniaPlugin 与命令层/agent store 不能互相 import
 * （插件保持通用、不感知业务），用一块无依赖的共享可变状态解耦。
 */

type EditListener = () => void;

let silentDepth = 0;
const editListeners = new Set<EditListener>();

/** 命令批开始：快照层暂停入栈。可嵌套（组内多命令各自包一层）。 */
export function beginSilentBatch(): void {
	silentDepth += 1;
}

/** 命令批结束。深度归零后快照层恢复入栈。 */
export function endSilentBatch(): void {
	silentDepth = Math.max(0, silentDepth - 1);
}

export function isSilent(): boolean {
	return silentDepth > 0;
}

/**
 * 注册「用户手动编辑」监听（agent store 用于使命令组失效）。
 * 返回退订函数。仅在非 silent 时触发；命令自身产生的变更不触发。
 */
export function onUserEdit(listener: EditListener): () => void {
	editListeners.add(listener);
	return () => {
		editListeners.delete(listener);
	};
}

/** 快照层调用：手操编辑或 Cmd+Z/Redo 恢复完成后广播。 */
export function notifyUserEdit(): void {
	if (silentDepth > 0) return;
	for (const listener of editListeners) {
		try {
			listener();
		} catch (error) {
			console.error("undoGate listener error:", error);
		}
	}
}
