<template>
  <div class="w-full h-full overflow-hidden flex flex-col gap-4">
    <div class="flex-1 w-full overflow-auto">
      <ResourceList :list-data="resourceStore.speechList" type="speech" />
    </div>

    <div v-if="form.voiceUrl === 'custom'" class="text-xs text-left">
      朗读内容：清晨的阳光透过窗帘洒在桌上，温暖而明亮
    </div>

    <div v-loading="loading" class="flex items-center w-full gap-2">
      <div class="w-20 shrink-0">
        <el-select v-model="form.voiceUrl" placeholder="音色">
          <el-option
            v-for="(voice, i) in speechList"
            :key="i"
            :value="voice.voiceUrl"
            :label="voice.voiceName"
          />
        </el-select>
      </div>

      <template v-if="form.voiceUrl !== 'custom'">
        <div class="flex-1">
          <el-input
            v-model="form.prompt"
            placeholder="请输入提示词"
            @keyup.enter="handleSubmit"
          />
        </div>

        <div>
          <el-button type="primary" circle @click="handleSubmit">
            <i class="i-mdi-send" />
          </el-button>
        </div>
      </template>

      <template v-else>
        <el-input v-model="voiceName" placeholder="请输入音色名称" />
        <div class="flex items-center cursor-pointer gap-2">
          <el-tooltip v-if="!isRecording" content="开始/重新录音">
            <i
              class="i-mdi-microphone"
              style="font-size: 18px; cursor: pointer"
              @click="handleRecStart"
            ></i>
          </el-tooltip>
          <el-tooltip v-else content="停止录音">
            <i
              class="i-mdi-stop"
              style="font-size: 18px; cursor: pointer"
              @click="handleRecStop"
            ></i>
          </el-tooltip>
          <el-tooltip v-if="recBlob" content="试听录音">
            <i
              class="i-mdi-volume-high"
              style="font-size: 18px; cursor: pointer"
              @click="handleRecPlay"
            ></i>
          </el-tooltip>
          <el-tooltip v-if="recBlob" content="克隆录音">
            <el-button type="primary" circle @click="handleClone">
              <i class="i-mdi-download" />
            </el-button>
          </el-tooltip>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
// Removed API imports for frontend-only mode
import { useResourceState } from "@/stores/resource";
import Recorder from "recorder-core";
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine";
import "recorder-core/src/extensions/waveview";

const resourceStore = useResourceState();

// 输入表单
const loading = ref(false);
const speechList = ref([]);
const form = reactive({
  prompt: "",
  voiceUrl: "",
});
const voiceName = ref("");

// 录音相关
const recorder = ref<any>(null);
const recBlob = ref<Blob>();
const isRecording = ref(false);

const handleRecStart = () => {
  recorder.value = Recorder({
    type: "mp3", //录音格式，可以换成wav等其他格式
    sampleRate: 16000, //录音的采样率，越大细节越丰富越细腻
    bitRate: 16, //录音的比特率，越大音质越好
  });

  //打开录音，获得权限
  recorder.value.open(
    () => {
      console.log("录音已打开");
      recorder.value.start();
      isRecording.value = true;
      console.log("已开始录音");
    },
    (msg, isUserNotAllow) => {
      //用户拒绝了录音权限，或者浏览器不支持录音
      console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
    }
  );
};

const handleRecStop = () => {
  if (!recorder.value) {
    console.error("未打开录音");
    return;
  }
  recorder.value.stop(
    (blob, duration) => {
      //blob就是我们要的录音文件对象，可以上传，或者本地播放
      isRecording.value = false;
      recBlob.value = blob;
      //简单利用URL生成本地文件地址，此地址只能本地使用，比如赋值给audio.src进行播放，赋值给a.href然后a.click()进行下载（a需提供download="xxx.mp3"属性）
      var localUrl = (window.URL || webkitURL).createObjectURL(blob);
      console.log("录音成功", blob, localUrl, "时长:" + duration + "ms");
      recorder.value.close(); //关闭录音，释放录音资源，当然可以不释放，后面可以连续调用start
      recorder.value = null;
    },
    (err) => {
      console.error("结束录音出错：" + err);
      recorder.value.close(); //关闭录音，释放录音资源，当然可以不释放，后面可以连续调用start
      recorder.value = null;
    }
  );
};

const handleRecPlay = () => {
  //本地播放录音试听，可以直接用URL把blob转换成本地播放地址，用audio进行播放
  var localUrl = URL.createObjectURL(recBlob.value);
  var audio = document.createElement("audio");
  audio.controls = true;
  document.body.appendChild(audio);
  audio.src = localUrl;
  audio.play(); //这样就能播放了

  //注意不用了时需要revokeObjectURL，否则霸占内存
  setTimeout(() => {
    URL.revokeObjectURL(audio.src);
  }, 5000);
};

const handleClone = () => {
  if (!voiceName.value) {
    ElMessage.error("请先填写音色名称");
    return;
  }

  ElMessage.info("前端模式下暂不支持音色克隆功能");
};

const handleSubmit = () => {
  if (!form.prompt) {
    ElMessage.error("请输入文字描述");
    return;
  }

  ElMessage.info("前端模式下暂不支持AI语音生成功能");
};

const updateSpeechList = () => {
  // 前端模式下使用默认音色列表
  speechList.value = [
    { voiceName: "默认音色1", voiceUrl: "default1" },
    { voiceName: "默认音色2", voiceUrl: "default2" },
  ];
  speechList.value.push({
    voiceName: "自定义",
    voiceUrl: "custom",
  });
  form.voiceUrl = speechList.value[0].voiceUrl;
};

onMounted(() => {
  updateSpeechList();
});
</script>

<style scoped lang="less">
.time-text {
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 0.5px;

  &.active {
    @apply text-primary;
    font-weight: bold;
  }
}
</style>
