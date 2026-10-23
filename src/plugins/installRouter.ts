import type { App } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { useProjectState } from "@/stores/project";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/pages/home/index.vue"),
	},
	{
		path: "/editor",
		name: "editor",
		component: () => import("@/pages/editor/index.vue"),
	},
];

const installRouter = {
	install(app: App) {
		const router = createRouter({
			history: createWebHashHistory(),
			routes: routes,
		});

		router.beforeEach(async (to, from, next) => {
			const projectStore = useProjectState();
			if (["/", "/home"].includes(to.path)) {
				next();
				return;
			}

			// 等待 IndexedDB hydrate 完成，避免误判“未选项目”
			await projectStore.ready;

			if (!projectStore.project) {
				ElMessage.warning("请创建或选择现有项目后再继续操作");
				return;
			}
			next();
		});

		app.use(router);
	},
};
export default installRouter;
