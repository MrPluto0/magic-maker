import { getTrainModels } from "@/api/model";
import { TrainModel } from "@/types/model";
import { defineStore } from "pinia";

export const useTrainState = defineStore(
  "train",
  () => {
    // 模型训练
    const model = ref<TrainModel>({} as TrainModel);
    const modelList = ref<TrainModel[]>([]);
    const savedModelList = ref<TrainModel[]>([]);

    const refreshList = async (flag: number = 0) => {
      if (flag === 0) {
        modelList.value = await getTrainModels(0);
      } else {
        savedModelList.value = await getTrainModels(1);
      }
    };

    const init = async () => {
      refreshList(0);
      refreshList(1);
    };

    return {
      model,
      modelList,
      savedModelList,
      refreshList,
      init,
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["model"],
    },
  }
);
