import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";
import { useProjectState } from "@/stores/project";
import { useUserState } from "@/stores/user";

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
  {
    path: "/draw",
    name: "draw",
    component: () => import("@/pages/draw/index.vue"),
  },
];

const installRouter = {
  install(app: App) {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: routes,
    });

    router.beforeEach((to, from, next) => {
      const projectStore = useProjectState();
      const userStore = useUserState();
      if (["/", "/home"].includes(to.path) || to.path.startsWith("/login")) {
        next();
        return;
      }
      if (!userStore.isLogin) {
        ElMessage.warning("请先登录再继续操作");
        userStore.showLogin = true;
        return;
      }

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
