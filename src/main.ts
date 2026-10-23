import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import "./styles/index.less";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import installPiniaPlugin from "@/plugins/installPiniaPlugin"; // Pinia 状态监控
import installRouter from "@/plugins/installRouter"; // 路由注册

const app = createApp(App);

const pinia = createPinia();
pinia.use(installPiniaPlugin);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(installRouter);

app.mount("#app");
