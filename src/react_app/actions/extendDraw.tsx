import ExtendDraw from "@/pages/draw/components/tools/ExtendDraw.vue";
import { useDrawStore } from "@/stores/draw";
import { ExcalidrawImageElement } from "@pkg/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@pkg/excalidraw/types/types";
import { createApp } from "vue";

export const actionExtendDraw = async (api: ExcalidrawImperativeAPI) => {
  api.registerAction({
    name: "Extend Image",
    label: "AI扩图",
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4254"
        width="16"
        height="16"
      >
        <path
          d="M760 280v207.328h-66.736V345.472H548.672V280z"
          p-id="4255"
          fill="currentColor"
        ></path>
        <path
          d="M678.976 311.12l48.408 45.064-1.64 1.696-0.608 0.632-1.2 1.232-0.616 0.64-31.68 32.752c-41.696 43.12-41.696 43.12-107.232 110.864L536 458.936l71.256-73.68 2.288-2.352 33.688-34.832 31.024-32.08 0.656-0.672 0.312-0.32 0.608-0.632 3.144-3.248z"
          p-id="4256"
          fill="currentColor"
        ></path>
        <path
          d="M896 136v760H136V136h760z m-66.408 66.408H202.408v627.184h627.184V202.408z"
          p-id="4257"
          fill="currentColor"
        ></path>
        <path
          d="M280 760V552.672h66.736v141.856h144.592V760z"
          p-id="4258"
          fill="currentColor"
        ></path>
        <path
          d="M361.024 728.88l-48.408-45.064 1.64-1.696 0.608-0.632 1.2-1.232 0.616-0.64 31.68-32.752c41.696-43.12 41.696-43.12 107.232-110.864L504 581.064l-71.256 73.68-2.288 2.352-33.688 34.832-31.024 32.08-0.656 0.672-0.312 0.32-0.608 0.632-3.144 3.248z"
          p-id="4259"
          fill="currentColor"
        ></path>
      </svg>
    ),
    perform: async (elements, appState) => {
      const store = useDrawStore();
      const ele = store.getSelected() as ExcalidrawImageElement;
      const files = store.api.getFiles();
      if (!files[ele.fileId]) {
        return {
          elements,
          appState,
          storeAction: "none",
        };
      }
      // 动态创建Vue组件
      const container = document.createElement("div");
      document.body.appendChild(container);
      const comp = createApp(ExtendDraw, {
        dataUrl: files[ele.fileId].dataURL,
        onFinish: (url: string) => {
          store.replaceFile(url, ele);
        },
      });
      comp.mount(container);
      // 默认输出
      return {
        elements,
        appState,
        storeAction: "none",
      };
    },
    custom: true,
    visible: (elements, appState) => {
      const id = Object.keys(appState.selectedElementIds)[0];
      return (
        elements.findIndex((ele) => ele.id === id && ele.type === "image") !==
        -1
      );
    },
  });
};
