<template>
  <el-dialog
    :model-value="show"
    width="700"
    align-center
    :before-close="handleClose"
  >
    <div class="px-10 pb-8">
      <div class="flex items-end">
        <div
          class="w-28 text-white text-xl font-bold font-['Open Sans'] tracking-wide"
        >
          联系我们
        </div>
        <div
          class="w-24 text-white text-sm font-normal font-['Open Sans'] tracking-wide"
        >
          CONTACT US
        </div>
      </div>

      <el-divider></el-divider>

      <div
        class="w-72 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
      >
        邮 箱：magicmaker@zoomad.net
      </div>

      <div
        class="mt-2 w-72 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
      >
        微 信：MagicMaker_CN
      </div>

      <div class="flex mt-10 gap-8">
        <div class="item">
          <div
            class="w-12 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
          >
            新片场
          </div>
          <div>
            <img src="@/assets/qrcode1.png" alt="" />
          </div>
        </div>
        <div class="item">
          <div
            class="w-12 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
          >
            小红书
          </div>
          <div>
            <img src="@/assets/qrcode2.png" alt="" />
          </div>
        </div>
        <div class="item">
          <div
            class="w-12 h-5 text-white text-xs font-light font-['Open Sans'] tracking-wide"
          >
            公众号
          </div>
          <div>
            <img src="@/assets/qrcode3.jpg" alt="" />
          </div>
        </div>
      </div>

      <div
        class="text-right text-white text-xs font-normal font-['Open Sans'] leading-normal tracking-wide"
      >
        © 2024. MagicMaker
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
const props = defineProps<{
  show: boolean;
}>();
const emits = defineEmits(["update:show"]);

const handleClose = () => {
  emits("update:show", false);
};
</script>

<style scoped lang="less">
.email {
  color: white;
  text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.25);
  font-family: "Open Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 3px;
}

.item {
  img {
    margin-top: 4px;
    width: 100px;
  }
}
</style>
