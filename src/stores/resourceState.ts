import { delRecord } from "@/api/record";
import { Resource, TextResource } from "@/types/resource";
import { defineStore } from "pinia";
import { useProjectState } from "./projectState";
import { useRoute } from "vue-router";

export const useResourceState = defineStore("resourceState", () => {
  const textList = ref<TextResource[]>([]);
  const imageList = ref<Resource[]>([]);
  const audioList = ref<Resource[]>([]);
  const speechList = ref<Resource[]>([]);
  const videoList = ref<Resource[]>([]);

  const uploadImageList = ref<Resource[]>([]);
  const uploadAudioList = ref<Resource[]>([]);
  const uploadSpeechList = ref<Resource[]>([]);
  const uploadVideoList = ref<Resource[]>([]);

  const route = useRoute();
  const projectState = useProjectState();

  const getTypeList = (type: string, isUpload: boolean = false) => {
    switch (type) {
      case "text":
        return textList;
      case "image":
        return isUpload ? uploadImageList : imageList;
      case "music":
        return isUpload ? uploadAudioList : audioList;
      case "speech":
        return isUpload ? uploadSpeechList : speechList;
      case "video":
        return isUpload ? uploadVideoList : videoList;
    }
  };

  const removeResource = async (
    type: string,
    id: number,
    isUpload: boolean = false
  ) => {
    const list = getTypeList(type, isUpload);
    //@ts-ignore
    list.value = list.value.filter((item) => item.meta.recordId !== id);
    await delRecord(id);
    if (route.path === "/home") {
      projectState.refreshFlag2++;
    }
  };

  const addResource = (resource: Resource, isUpload: boolean = false) => {
    const list = getTypeList(resource.type, isUpload);
    //@ts-ignore
    list.value.push(resource);
  };

  return {
    textList,
    imageList,
    audioList,
    speechList,
    videoList,
    uploadImageList,
    uploadAudioList,
    uploadSpeechList,
    uploadVideoList,
    getTypeList,
    addResource,
    removeResource,
  };
});
