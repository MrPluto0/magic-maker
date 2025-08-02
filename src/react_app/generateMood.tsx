import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useDrawStore } from "@/stores/drawState";
import { ColorList, GenerateKeywords } from "@/data/constant";
import { text2image } from "@/api/generate";
import { useTrainState } from "@/stores/trainState";

export function GenerateMood() {
  const store = useDrawStore();
  const trainStore = useTrainState();

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");

  const kwsRef = useRef(null);
  const [showKws, setShowKws] = useState(false);
  const [keywords, setKeywords] = useState<string[]>([]);

  useClickAway(kwsRef, () => {
    setShowKws(false);
  });

  const colorRef = useRef(null);
  const [showColor, setShowColor] = useState(false);
  const [color, setColor] = useState("");

  useClickAway(colorRef, () => {
    setShowColor(false);
  });

  const onGenerate = async () => {
    try {
      store.loading = true;
      const ele = store.getSelected();
      if (
        ele &&
        ["image", "rectangle", "ellipse", "diamond"].includes(ele.type)
      ) {
        const res = await text2image({
          prompt,
          keywords,
          color,
          sizeStr: `(${ele.width.toFixed(0)}, ${ele.height.toFixed(0)})`,
          samples: 1,
          model: "kolor",
        });
        if (res[0].url) {
          //@ts-ignore
          store.replaceFile(res[0].url, ele);
        }
      } else {
        store.api.setToast({
          message: "请选择图片、矩形、菱形、椭圆形后重新操作",
          closable: true,
          duration: 1000,
        });
      }
    } finally {
      store.loading = false;
    }
  };

  return (
    <div className="flex ml-6 h-full gap-2">
      <select
        className="rounded-lg px-2 w-20 text-xs dark:bg-[#232329] bg-[#ececf4]"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        {trainStore.savedModelList.map((m) => (
          <option
            className="!bg-red !text-sm"
            style={{ appearance: "none" }}
            key={m.modelUuid}
            value={m.modelUuid}
          >
            {m.modelName}
          </option>
        ))}
      </select>

      <div className="flex h-full relative">
        <input
          className="rounded-lg px-2 w-100 text-xs dark:bg-[#232329] bg-[#ececf4] pr-[66px]"
          placeholder="请输入提示词"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onGenerate();
            }
          }}
        />

        {/* 选择风格 */}
        <div
          className="absolute rounded-lg w-5 h-5 cursor-pointer"
          style={{ left: "340px", top: "7px" }}
          onClick={() => setShowKws(!showKws)}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M7.5 15C6.51509 15 5.53982 14.806 4.62987 14.4291C3.71993 14.0522 2.89314 13.4997 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C11.625 0 15 3 15 6.75C15 7.94347 14.5259 9.08807 13.682 9.93198C12.8381 10.7759 11.6935 11.25 10.5 11.25H9.15C8.925 11.25 8.775 11.4 8.775 11.625C8.775 11.7 8.85 11.775 8.85 11.85C9.15 12.225 9.3 12.675 9.3 13.125C9.375 14.175 8.55 15 7.5 15ZM7.5 1.5C5.9087 1.5 4.38258 2.13214 3.25736 3.25736C2.13214 4.38258 1.5 5.9087 1.5 7.5C1.5 9.0913 2.13214 10.6174 3.25736 11.7426C4.38258 12.8679 5.9087 13.5 7.5 13.5C7.725 13.5 7.875 13.35 7.875 13.125C7.875 12.975 7.8 12.9 7.8 12.825C7.5 12.45 7.35 12.075 7.35 11.625C7.35 10.575 8.175 9.75 9.225 9.75H10.5C11.2956 9.75 12.0587 9.43393 12.6213 8.87132C13.1839 8.30871 13.5 7.54565 13.5 6.75C13.5 3.825 10.8 1.5 7.5 1.5ZM3.375 6C3.975 6 4.5 6.525 4.5 7.125C4.5 7.725 3.975 8.25 3.375 8.25C2.775 8.25 2.25 7.725 2.25 7.125C2.25 6.525 2.775 6 3.375 6ZM5.625 3C6.225 3 6.75 3.525 6.75 4.125C6.75 4.725 6.225 5.25 5.625 5.25C5.025 5.25 4.5 4.725 4.5 4.125C4.5 3.525 5.025 3 5.625 3ZM9.375 3C9.975 3 10.5 3.525 10.5 4.125C10.5 4.725 9.975 5.25 9.375 5.25C8.775 5.25 8.25 4.725 8.25 4.125C8.25 3.525 8.775 3 9.375 3ZM11.625 6C12.225 6 12.75 6.525 12.75 7.125C12.75 7.725 12.225 8.25 11.625 8.25C11.025 8.25 10.5 7.725 10.5 7.125C10.5 6.525 11.025 6 11.625 6Z"
              fill="currentColor"
            />
          </svg>
        </div>
        {showKws && (
          <div ref={kwsRef} className="grid-container absolute">
            {GenerateKeywords.map((kw, index) => (
              <div
                className="item"
                key={index}
                onClick={() => {
                  if (keywords.includes(kw)) {
                    setKeywords(keywords.filter((k) => k != kw));
                  } else {
                    setKeywords([...keywords, kw]);
                  }
                }}
              >
                <span
                  className={`text ${keywords.includes(kw) ? "active" : ""}`}
                >
                  {kw}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 选择颜色 */}
        <div
          className="absolute rounded-lg border-2 border-black dark:border-white w-5 h-5 cursor-pointer"
          style={{ backgroundColor: color, left: "370px", top: "7px" }}
          onClick={() => setShowColor(!showColor)}
        ></div>
        {showColor && (
          <div ref={colorRef} className="color-container">
            {ColorList.map(({ label, value }, index) => (
              <div
                className={`item ${color === value ? "active" : ""}`}
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: value,
                }}
                key={index}
                title={label}
                onClick={() => setColor(value)}
              ></div>
            ))}
            <div
              className="item border-1 border-white flex justify-center items-center"
              style={{
                width: "25px",
                height: "25px",
              }}
              onClick={() => setColor("")}
            >
              <svg
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6967"
                width="16"
                height="16"
              >
                <path
                  d="M14.08 919.296L919.424 14.208l90.496 90.496L104.704 1009.92z"
                  fill="currentColor"
                  p-id="6968"
                ></path>
                <path
                  d="M104.704 14.08l905.088 905.216-90.496 90.496L14.08 104.704z"
                  fill="currentColor"
                  p-id="6969"
                ></path>
              </svg>
            </div>
          </div>
        )}
      </div>

      <button
        className="btn rounded-lg px-3 text-xs dark:bg-[#232329] bg-[#ececf4]"
        onClick={onGenerate}
      >
        生成
      </button>
    </div>
  );
}
