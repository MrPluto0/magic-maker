<template>
  <el-dialog
    :model-value="show"
    width="500"
    align-center
    :before-close="handleClose"
  >
    <div class="text-center text-xl mb-4">请用微信支付</div>

    <div
      class="w-72 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
    >
      请在 {{ interval }} s内用微信支付
    </div>

    <div
      class="flex flex-col justify-center items-center"
      style="height: 200px"
    >
      <img :src="qrcodeUrl" alt="" />
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import QRCode from "qrcode";

const props = defineProps<{
  show: boolean;
  codeUrl: string;
}>();
const emits = defineEmits(["update:show"]);

const qrcodeUrl = ref("");
const interval = ref(60);

const handleClose = () => {
  emits("update:show", false);
};

onMounted(async () => {
  const res = await QRCode.toDataURL(props.codeUrl);
  qrcodeUrl.value = res;

  const timer = setInterval(() => {
    interval.value -= 1;
    if (interval.value <= 0) {
      clearInterval(timer);
      emits("update:show", false);
    }
  }, 1000);
});
</script>
