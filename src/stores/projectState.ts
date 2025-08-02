import { getProjectInfo, updateProject } from "@/api/workflow";
import { defineStore } from "pinia";
import { useTrackState } from "./trackState";
import { useResourceState } from "./resourceState";
import { useRoute } from "vue-router";
import { useUserState } from "./userState";
import { formatResourceData } from "@/utils/storeUtil";
import { ElLoading } from "element-plus";
import { Combinator, ImgClip, OffscreenSprite } from "@webav/av-cliper";
import { AudioTrack } from "@/class/AudioTrack";
import { usePlayerState } from "./playerState";
import { Resource } from "@/types/resource";
import { Track, TrackLineItem } from "@/types/track";
import { baseFps } from "@/data/trackConfig";
import { createFileWriter } from "@/utils/file";
import { useDrawStore } from "./drawState";
import { useTrainState } from "./trainState";

export const useProjectState = defineStore(
  "projectState",
  () => {
    const route = useRoute();
    const userStore = useUserState();
    const trackStore = useTrackState();
    const playerStore = usePlayerState();
    const drawStore = useDrawStore();
    const resourceStore = useResourceState();
    const trainStore = useTrainState();

    const lastSaveTime = ref();
    const refreshFlag = ref(0);
    const refreshFlag2 = ref(0);
    const project = ref<IProject>(null);

    const saveProject = async () => {
      if (!project.value?.id) {
        return;
      }
      if (route.path === "/editor") {
        await updateProject({ clipParam: trackStore.trackList });
      }
      if (route.path === "/whiteboard") {
        const eles = await drawStore.saveDrawData();
        await updateProject({ drawParam: eles });
      }
      lastSaveTime.value = new Date().toLocaleString();
    };

    const setProduct = async (pro: IProject) => {
      project.value = pro;

      const loading = ElLoading.service({ text: "正在加载资源" });

      // 加载生成区资源
      if (pro.generateTextRecords) {
        resourceStore.textList = [];
        // 加载生成区的资源
        pro.generateTextRecords.map((item) => {
          resourceStore.textList.push({
            role: "user",
            content: item.prompt || item.promptFileUrl,
            meta: { recordId: item.id },
          });
          resourceStore.textList.push({
            role: "system",
            content: item.textResult,
            meta: { recordId: item.id },
          });
        });
        resourceStore.imageList = pro.generateImageRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.audioList = pro.generateMusicRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.speechList = pro.generateSpeechRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.videoList = pro.generateVideoRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.uploadImageList = pro.uploadImageRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.uploadAudioList = pro.uploadMusicRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.uploadSpeechList = pro.uploadSpeechRecords.map((item) =>
          formatResourceData(item)
        );
        resourceStore.uploadVideoList = pro.uploadVideoRecords.map((item) =>
          formatResourceData(item)
        );
      }
      // 加载剪辑区资源
      if (pro.clipParam) {
        const trackList: TrackLineItem[] = [];
        for (let i = 0; i < pro.clipParam.length; i++) {
          const trackLine = pro.clipParam[i];
          const trackLineList: Track[] = [];
          for (let j = 0; j < pro.clipParam[i].list.length; j++) {
            const item = trackLine.list[j];
            const track = await trackStore.createTrack(
              item.source as Resource,
              item.start,
              // @ts-ignore
              item?.volume
            );
            const id = track.id;
            Object.assign(track, item); // 轨道赋值，排除ID
            track.id = id;
            trackLineList.push(track);
          }
          trackList.push({
            main: trackLine.main,
            type: trackLine.type,
            list: trackLineList,
          });
        }
        trackStore.trackList.splice(
          0,
          trackStore.trackList.length,
          ...trackList
        );
      }
      // 加载画板资源
      if (pro.drawParam) {
        await drawStore.initContent(pro.drawParam);
      }
      // 加载已经保存模型
      await trainStore.refreshList(1);
      loading.close();
    };

    const exportVideo = async () => {
      const loading = ElLoading.service({ text: "正在合成视频" });
      try {
        const start = performance.now();
        const subSprs: Promise<OffscreenSprite>[] = [];
        const sprs: Promise<OffscreenSprite>[] = [];

        // 使用OffscreenSprite和Combinator进行视频合成
        for (const track of trackStore.trackList.reduce(
          (res, { list }) => res.concat(list),
          [] as Track[]
        )) {
          if (track instanceof AudioTrack) {
            sprs.push(track.combine("audio"));
            if (track.source.subtitle) {
              subSprs.push(track.combine("subtitle"));
            }
          } else {
            sprs.push(
              track.combine(
                playerStore.playerWidth,
                playerStore.playerHeight,
                playerStore.outputRadio
              )
            );
          }
        }

        sprs.unshift(...subSprs);
        const sprites = await Promise.all(sprs);
        console.log("生成sprite耗时", performance.now() - start, "ms");

        // 添加水印
        const watermark = new OffscreenSprite(
          new ImgClip({
            type: "image/gif",
            stream: (await fetch("/magicmaker.gif")).body!,
          })
        );
        watermark.time = {
          offset: 0,
          duration: (trackStore.frameCount / baseFps) * 1e6,
        };
        watermark.zIndex = 1000;
        sprites.unshift(watermark);

        const com = new Combinator({
          width: playerStore.playerWidth,
          height: playerStore.playerHeight,
          bgColor: "black",
          fps: baseFps,
        });

        await Promise.all(
          sprites.map((sprite, index) => {
            sprite.zIndex = 999 - index;
            return com.addSprite(sprite);
          })
        );

        com.addSprite(watermark);

        console.log("合成耗时", performance.now() - start, "ms");

        await com
          .output()
          .pipeTo(
            await createFileWriter(`Video-${new Date().toLocaleString()}.mp4`)
          );

        ElMessage.success("合成视频成功");

        console.log("导出文件耗时", performance.now() - start, "ms");
      } finally {
        loading.close();
      }
    };

    const init = async () => {
      if (userStore.isLogin && project.value?.id) {
        const res = await getProjectInfo(project.value.id);
        setProduct(res);
      }
    };

    return {
      project,
      init,
      refreshFlag,
      refreshFlag2,
      lastSaveTime,
      saveProject,
      setProduct,
      exportVideo,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["showCreate", "project", "lastSaveTime"],
    },
  }
);
