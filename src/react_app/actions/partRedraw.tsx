import MaskRedraw from "@/components/draw/tools/MaskRedraw.vue";
import { useDrawStore } from "@/stores/drawState";
import { ExcalidrawImageElement } from "@pkg/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@pkg/excalidraw/types/types";
import { createApp } from "vue";

export const actionPartRedraw = async (api: ExcalidrawImperativeAPI) => {
  api.registerAction({
    name: "Partial Redraw",
    label: "局部重绘",
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6140"
        width="16"
        height="16"
      >
        <path
          d="M66.56 275.072c31.488-31.445333 80.469333-76.245333 125.184-108.586667 22.613333-16.384 42.368-28.330667 57.344-34.261333 4.053333-1.621333 7.210667-2.56 9.514667-3.072 0.384 1.109333 0.810667 2.56 1.237333 4.309333 1.706667 6.826667 2.730667 16.213333 3.029333 28.16 0.597333 23.893333-1.834667 52.736-4.565333 82.56l-0.426667 4.821334c-2.474667 27.093333-5.077333 55.466667-4.352 77.397333 0.341333 11.221333 1.621333 24.490667 6.272 35.882667 2.432 5.973333 6.570667 13.354667 13.738667 19.370666 7.808 6.485333 17.365333 9.813333 27.306667 9.813334 16.938667 0 35.285333-7.850667 49.664-15.146667 16-8.106667 33.536-18.901333 50.645333-30.421333a1196.16 1196.16 0 0 0 91.477333-68.906667l-40.96-49.152a1132.288 1132.288 0 0 1-86.186666 64.938667 435.029333 435.029333 0 0 1-48.085334 28.501333c-0.256-17.536 1.92-41.258667 4.437334-68.992l0.213333-2.304c2.645333-29.056 5.546667-61.738667 4.821333-90.026667a200.405333 200.405333 0 0 0-4.864-41.642666c-3.072-12.672-8.661333-27.136-19.925333-38.4a54.698667 54.698667 0 0 0-40.490667-15.36 104.576 104.576 0 0 0-36.181333 8.192c-22.357333 8.917333-47.232 24.533333-71.253333 41.898666C105.813333 149.717333 54.144 196.992 21.333333 229.802667l45.226667 45.226666zM215.210667 707.882667v192.725333H407.893333a192.768 192.768 0 0 0 183.552-133.930667l0.085334 0.085334 388.693333-482.474667a95.274667 95.274667 0 0 0-133.973333-133.888L393.173333 515.754667a192.725333 192.725333 0 0 0-178.005333 192.128z m192.682666 128.725333H279.210667V707.84a128.682667 128.682667 0 0 1 136.746666-128.426667l0.085334 0.128 0.128-0.128a128.682667 128.682667 0 0 1-8.277334 257.152z m186.88-175.914667a193.109333 193.109333 0 0 0-115.754666-131.925333l78.592-63.36 105.856 110.037333-68.693334 85.248z m109.226667-135.509333l-96.426667-100.138667 278.826667-224.853333a31.274667 31.274667 0 0 1 43.946667 43.946667L704 525.226667z"
          p-id="6141"
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
      const comp = createApp(MaskRedraw, {
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
