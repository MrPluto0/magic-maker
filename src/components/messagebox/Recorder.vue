<template>
  <el-dialog
    :model-value="show"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-8">录音</div>

    <div>
      <div class="flex flex-col gap-4">
        <!-- <div class="">音频波形</div> -->
        <!-- 波形绘制区域 -->
        <div class="border-stone-600 border-2 h-16 rounded">
          <div class="h-full w-full" ref="recwave"></div>
        </div>
      </div>
    </div>

    <div class="mt-8 mb-4 flex justify-center gap-4">
      <el-button type="primary" @click="handleRecStart">开始录音</el-button>
      <el-button @click="handleRecStop">结束录音</el-button>
      <el-button @click="handleRecPlay">本地试听</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import Recorder from "recorder-core";
import "recorder-core/src/engine/mp3";
import "recorder-core/src/engine/mp3-engine";
import "recorder-core/src/extensions/waveview";

const props = defineProps<{
	show: boolean;
}>();
const emits = defineEmits(["update:show", "saveRecordBlob"]);

const recorder = ref<any>();
const wave = ref<any>();
const recwave = ref();
const recBlob = ref<Blob>();

const handleClose = () => {
	emits("update:show", false);
};

const handleRecOpen = () => {
	//创建录音对象
	recorder.value = Recorder({
		type: "mp3", //录音格式，可以换成wav等其他格式
		sampleRate: 16000, //录音的采样率，越大细节越丰富越细腻
		bitRate: 16, //录音的比特率，越大音质越好
		onProcess: (
			buffers,
			powerLevel,
			bufferDuration,
			bufferSampleRate,
			newBufferIdx,
			asyncEnd,
		) => {
			//录音实时回调，大约1秒调用12次本回调
			//可实时绘制波形，实时上传（发送）数据
			if (wave.value)
				wave.value.input(
					buffers[buffers.length - 1],
					powerLevel,
					bufferSampleRate,
				);
		},
	});

	//打开录音，获得权限
	recorder.value.open(
		() => {
			console.log("录音已打开");
			if (recwave.value) {
				//创建音频可视化图形绘制对象
				wave.value = Recorder.WaveView({ elem: recwave.value });
			}
		},
		(msg, isUserNotAllow) => {
			//用户拒绝了录音权限，或者浏览器不支持录音
			console.log((isUserNotAllow ? "UserNotAllow，" : "") + "无法录音:" + msg);
		},
	);
};

const handleRecStart = () => {
	if (!recorder.value) {
		console.error("未打开录音");
		return;
	} else {
		handleRecOpen();
	}
	recorder.value.start();
	console.log("已开始录音");
};

const handleRecStop = () => {
	if (!recorder.value) {
		console.error("未打开录音");
		return;
	}
	recorder.value.stop(
		(blob, duration) => {
			//blob就是我们要的录音文件对象，可以上传，或者本地播放
			recBlob.value = blob;
			emits("saveRecordBlob", blob);
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
		},
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

onMounted(() => {
	handleRecOpen();
});
</script>

<style scoped lang="less"></style>
