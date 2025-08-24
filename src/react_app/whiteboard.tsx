import { useDrawStore } from "@/stores/draw";
import { selectFile } from "@/utils/file";
import { psdToJson } from "@/utils/psd";
import { Excalidraw, MainMenu, WelcomeScreen, Footer } from "@pkg/excalidraw";
// 必须添加，不然样式混乱
import "@pkg/excalidraw/src/index.css";

import { GenerateMood } from "./generateMood";
import "./whiteboard.less";
import { actionPartRedraw } from "./actions/partRedraw";
import { actionExtendDraw } from "./actions/extendDraw";
import { ExcalidrawImperativeAPI } from "@pkg/excalidraw/types/types";
import { actionStyleRedraw } from "./actions/styleRedraw";
import { ChineseFonts, EnglishFonts } from "@/data/fonts";

export default function () {
  const store = useDrawStore();

  const initAPI = (e: ExcalidrawImperativeAPI) => {
    // 添加文件store.files
    const files: any[] = [];
    for (let file in store.files) {
      files.push(store.files[file]);
    }
    e.addFiles(files);

    // 添加自定义操作按钮
    actionPartRedraw(e);
    actionExtendDraw(e);
    actionStyleRedraw(e);

    // 添加内置字体
    for (const fontFamily in ChineseFonts) {
      e.setFontFamily(fontFamily, ChineseFonts[fontFamily], false);
    }
    for (const fontFamily in EnglishFonts) {
      e.setFontFamily(fontFamily, EnglishFonts[fontFamily], false);
    }
    // @ts-ignore 刷新字体集合
    e.setFontFamily("BebasNeue", EnglishFonts["BebasNeue"], true);

    store.api = e;
  };

  const onUploadPSD = async () => {
    try {
      store.loading = true;
      store.api.resetScene();
      const files = await selectFile({ accept: ".psd", multiple: false });
      const json = await psdToJson(files[0]);
      store.updateContent(json.elements, json.files);
    } finally {
      store.loading = false;
    }
  };

  const onUploadFont = async () => {
    try {
      store.loading = true;
      const files = await selectFile({
        accept: ".ttf,.woff,.woff2",
        multiple: false,
      });
      // 前端模式下使用本地字体文件
      const localUrl = URL.createObjectURL(files[0]);
      const family = files[0].name.split(".")[0];
      store.api.setFontFamily(family, [{ url: localUrl }]);
    } finally {
      store.loading = false;
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw
        name="test"
        initialData={{
          elements: store.eles,
          appState: store.state,
          scrollToContent: true,
        }}
        langCode="zh-CN"
        excalidrawAPI={initAPI}
      >
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.Item
            icon={
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="9677"
                width="16"
                height="16"
              >
                <path
                  d="M791.96 978.54H232.04c-60.76 0-110.18-49.43-110.18-110.18V155.64c0-60.76 49.43-110.18 110.18-110.18h409.47c38.98 0 76.13 16.78 101.9 46.03l124.82 141.65a135.735 135.735 0 0 1 33.91 89.79v545.43c0 60.76-49.43 110.18-110.18 110.18zM232.04 118.52c-20.47 0-37.12 16.65-37.12 37.12v712.72c0 20.47 16.65 37.12 37.12 37.12h559.92c20.47 0 37.12-16.65 37.12-37.12V322.93c0-15.28-5.57-30.02-15.67-41.49L688.59 139.79a62.796 62.796 0 0 0-47.08-21.27H232.04z"
                  fill="currentColor"
                  p-id="9678"
                ></path>
                <path
                  d="M867.49 360.56H717.04c-60.76 0-110.18-49.43-110.18-110.18V79.55h73.06v170.83c0 20.47 16.65 37.12 37.12 37.12h150.45v73.06z"
                  fill="currentColor"
                  p-id="9679"
                ></path>
                <path
                  d="M339.29 682.61v62.23H298.6V564.19h63.74c45.52 0 68.28 19.19 68.28 57.57 0 18.14-6.53 32.82-19.59 44.03-13.06 11.21-30.51 16.82-52.34 16.82h-19.4z m0-87.18v56.31h16c21.67 0 32.5-9.49 32.5-28.47s-10.83-27.84-32.5-27.84h-16zM448.76 737.91V697.6c7.31 6.13 15.24 10.73 23.81 13.79 8.57 3.07 17.22 4.6 25.95 4.6 5.12 0 9.59-0.46 13.42-1.38 3.82-0.92 7.01-2.2 9.57-3.84 2.56-1.64 4.47-3.57 5.73-5.8 1.26-2.22 1.89-4.64 1.89-7.24 0-3.53-1.01-6.68-3.02-9.45-2.02-2.77-4.77-5.33-8.25-7.68-3.49-2.35-7.62-4.62-12.41-6.8-4.79-2.18-9.95-4.41-15.49-6.68-14.11-5.88-24.63-13.06-31.56-21.54-6.93-8.48-10.39-18.73-10.39-30.74 0-9.4 1.89-17.49 5.67-24.25 3.78-6.76 8.92-12.32 15.43-16.69 6.51-4.36 14.05-7.58 22.61-9.64 8.57-2.06 17.64-3.09 27.21-3.09s17.74 0.57 25.01 1.7c7.26 1.13 13.96 2.88 20.09 5.23v37.67c-3.02-2.1-6.32-3.95-9.89-5.54a79.067 79.067 0 0 0-11.02-3.97 83.625 83.625 0 0 0-11.27-2.33c-3.74-0.5-7.29-0.76-10.64-0.76-4.62 0-8.82 0.44-12.6 1.32-3.78 0.88-6.97 2.12-9.57 3.72-2.61 1.6-4.62 3.51-6.05 5.73-1.43 2.23-2.14 4.72-2.14 7.5 0 3.02 0.8 5.73 2.39 8.12 1.59 2.39 3.86 4.66 6.8 6.8 2.94 2.14 6.51 4.24 10.71 6.3 4.2 2.06 8.94 4.18 14.23 6.36 7.22 3.02 13.71 6.24 19.46 9.64 5.75 3.4 10.69 7.24 14.8 11.53a45.09 45.09 0 0 1 9.45 14.68c2.18 5.5 3.27 11.9 3.27 19.21 0 10.08-1.91 18.54-5.73 25.38-3.82 6.85-9.01 12.39-15.56 16.63-6.55 4.24-14.17 7.29-22.86 9.13-8.69 1.85-17.87 2.77-27.53 2.77s-19.34-0.84-28.28-2.52c-8.94-1.68-16.69-4.2-23.24-7.56zM601.69 744.84V564.19h64c64.16 0 96.25 29.35 96.25 88.06 0 28.14-8.76 50.6-26.27 67.4-17.51 16.8-40.84 25.2-69.98 25.2h-64z m40.69-147.52v114.51h20.16c17.64 0 31.47-5.29 41.51-15.87 10.03-10.58 15.05-24.98 15.05-43.21 0-17.22-4.98-30.76-14.93-40.63-9.95-9.87-23.92-14.8-41.89-14.8h-19.91z"
                  fill="currentColor"
                  p-id="9680"
                ></path>
              </svg>
            }
            onSelect={onUploadPSD}
          >
            上传PSD
          </MainMenu.Item>
          <MainMenu.Item
            icon={
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6307"
                width="16"
                height="16"
              >
                <path
                  d="M236.970667 938.666667H145.066667L469.333333 128h85.333334l324.266666 810.666667h-91.904l-102.4-256H339.370667l-102.4 256z m136.533333-341.333334h276.992L512 251.093333 373.504 597.333333z"
                  p-id="6308"
                  fill="currentColor"
                ></path>
              </svg>
            }
            onSelect={onUploadFont}
          >
            上传字体
          </MainMenu.Item>
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.Help />
          <div
            style={{
              height: "1px",
              backgroundColor: "rgb(115 115 116)",
              margin: "0.5rem 0px",
            }}
          ></div>
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>

        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>

        <Footer>
          <div
            className="h-full w-full flex justify-center items-center"
            style={{ marginLeft: "-80px" }}
          >
            <GenerateMood />
          </div>
        </Footer>
      </Excalidraw>
    </div>
  );
}
