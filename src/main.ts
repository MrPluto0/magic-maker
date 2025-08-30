import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "virtual:uno.css";
import "./styles/index.less";

import installRouter from "@/plugins/installRouter"; // 路由注册
import installPiniaPlugin from "@/plugins/installPiniaPlugin"; // Pinia 状态监控
import installExcalidraw from "@/plugins/installExcalidraw";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);

const pinia = createPinia();
pinia.use(installPiniaPlugin);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(installRouter);
app.use(installExcalidraw);

app.mount("#app");
