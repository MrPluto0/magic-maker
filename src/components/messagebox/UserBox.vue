<template>
  <el-dialog
    :model-value="show"
    width="700"
    align-center
    :before-close="handleClose"
  >
    <div class="flex items-center justify-between ml-4 mr-10 text-xs">
      <div class="flex items-center gap-8">
        <div
          @click="triggerUpload"
          class="w-20 h-20 bg-[#1473e6] flex justify-center items-center rounded-full cursor-pointer overflow-hidden"
        >
          <input
            ref="fileInputRef"
            class="file-input"
            type="file"
            name="file"
            accept="image/*"
            hidden
            @change="handleUploadAvatar"
          />
          <img v-if="!form.avatarUrl" src="@/assets/logo.png" alt="" />
          <img
            v-else
            class="w-full h-full object-cover"
            :src="form.avatarUrl"
            alt=""
          />
        </div>
        <div class="flex flex-col gap-4">
          <div>你好，{{ form.nickname || "暂无" }}</div>
          <div>欢迎使用MagicMaker</div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div>
          <el-button type="info" @click="showContact = true"
            >联 系 我 们</el-button
          >
        </div>
        <div>
          <el-button type="warning" @click="handleLogout"
            >退 出 登 录</el-button
          >
        </div>
        <ContactBox v-model:show="showContact" />
      </div>
    </div>

    <el-tabs model-value="first" class="mt-6 mx-4 mb-6">
      <el-tab-pane label="基本信息" name="first">
        <div class="flex gap-6">
          <el-form class="mt-2" style="width: 270px">
            <el-form-item label="手 机：">
              <el-input v-model="form.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮 箱：">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="职 业：">
              <el-input v-model="form.profession"></el-input>
            </el-form-item>
            <el-form-item label="方 向：">
              <el-input v-model="form.direction"></el-input>
            </el-form-item>
          </el-form>
          <el-form class="mt-2" style="width: 290px">
            <el-form-item label="昵 称：">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="简 介：">
              <el-input
                type="textarea"
                v-model="form.introduction"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="mt-6 flex justify-between items-center">
          <div
            class="text-white text-xs font-light font-['Open Sans'] tracking-wide"
          >
            注册日期：{{ form.createAt }}
          </div>
          <div>
            <el-button type="primary" @click="handleSave"
              >保 存 信 息</el-button
            >
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="剩余次数" name="second">
        <div class="mt-2 flex items-center gap-8">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="flex flex-col items-center gap-4"
          >
            <el-icon size="65"> <component :is="item.icon" /> </el-icon>
            <div
              class="py-1 px-2 bg-blue-600 rounded-md text-white text-xs font-light font-['Open Sans'] tracking-wide"
            >
              {{ item.label }}
            </div>
            <div
              class="text-white text-xs font-light font-['Open Sans'] tracking-wide"
            >
              {{ item.count }} 次
            </div>
          </div>
        </div>
        <div
          class="mt-12 text-white text-xs font-normal font-['Open Sans'] leading-normal tracking-wide"
        >
          © 2024. MagicMaker
        </div>
      </el-tab-pane>

      <el-tab-pane label="购买次数" name="third">
        <div class="mt-2 mb-8 flex items-center gap-8">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="flex flex-col items-center gap-4"
          >
            <el-icon size="65"> <component :is="item.icon" /> </el-icon>
            <div
              class="py-1 px-2 bg-blue-600 rounded-md text-white text-xs font-light font-['Open Sans'] tracking-wide"
            >
              {{ item.label }}
            </div>
            <el-input-number
              class="input-number"
              v-model="list[index].add"
              :min="0"
              :max="99"
            />

            <div
              class="text-white text-xs font-light font-['Open Sans'] tracking-wide"
            >
              {{ (item.price / 100).toFixed(2) }} 元
            </div>
          </div>
        </div>

        <div v-if="totalPrice > 0" class="flex flex-row-reverse">
          <div class="flex flex-col items-end">
            <div
              class="text-white text-sm font-extrabold font-['Open Sans'] tracking-wide"
            >
              总计：{{ (totalPrice / 100).toFixed(2) }} 元
            </div>
            <div
              class="mt-4 w-fit px-4 py-2 bg-rose-500 rounded cursor-pointer"
              @click="handlePay"
            >
              <div
                class="text-white text-xs font-bold font-['Open Sans'] tracking-wide"
              >
                立 即 支 付
              </div>
            </div>
            <Paybox v-if="showPay" v-model:show="showPay" :codeUrl="codeUrl" />
          </div>
        </div>

        <div
          class="absolute bottom-0 text-white text-xs font-normal font-['Open Sans'] leading-normal tracking-wide"
        >
          © 2024. MagicMaker
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useUserState } from "@/stores/userState";
import {
  getUserInfo,
  getUserLimits,
  updateUserInfo,
  uploadAvatar,
} from "@/api/user";
import ContactBox from "./ContactBox.vue";
import { IUser } from "@/types/user";
import { checkPayment, getGoodsPrice, prepay } from "@/api/payment";
import Paybox from "./Paybox.vue";
import { useRouter } from "vue-router";
import { useProjectState } from "@/stores/projectState";

const props = defineProps<{
  show: boolean;
}>();
const emits = defineEmits(["update:show"]);
const userStore = useUserState();
const proStore = useProjectState();
const router = useRouter();

const showContact = ref(false);
const showPay = ref(false);

const orderId = ref("");
const codeUrl = ref("");
const form = ref<IUser>({} as IUser);
const timer = ref();

const fileInputRef = ref<HTMLInputElement | null>(null);

const list = ref([
  {
    label: "文本生成",
    icon: "TextIcon",
    goodsCode: "4000",
    count: 0,
    add: 1,
    price: 2,
  },
  {
    label: "图片生成",
    icon: "ImageIcon",
    goodsCode: "5000",
    count: 0,
    add: 1,
    price: 2,
  },
  {
    label: "音频生成",
    icon: "AudioIcon",
    goodsCode: "6000",
    count: 0,
    add: 1,
    price: 2,
  },
  {
    label: "旁白生成",
    icon: "VoiceIcon",
    goodsCode: "7000",
    count: 0,
    add: 1,
    price: 2,
  },
  {
    label: "视频生成",
    icon: "VideoIcon",
    goodsCode: "8000",
    count: 0,
    add: 1,
    price: 2,
  },
]);

const totalPrice = computed(() => {
  return list.value.reduce((acc, cur) => acc + cur.add * cur.price, 0);
});

const handleSave = async () => {
  form.value = await updateUserInfo(form.value);
  ElMessage.success("保存成功");
};

const handlePay = async () => {
  if (!form.value) return;
  const productCodes = list.value.map((item) => ({
    goodsCode: item.goodsCode,
    count: item.add,
  }));
  const res = await prepay(
    form.value.id,
    Number(totalPrice.value),
    productCodes
  );
  if (res.codeUrl) {
    showPay.value = true;
    codeUrl.value = res.codeUrl;
    orderId.value = res.orderId;

    let interval = 60;
    timer.value = setInterval(async () => {
      const isPay = await checkPayment(orderId.value);
      if (isPay) {
        showPay.value = false;
        updateUserLimits();
        ElMessage.success("支付成功");
      }
      if (interval <= 0) {
        ElMessage.success("支付超时");
        showPay.value = false;
      }
      interval -= 1;
    }, 1000);
  }
};

const handleClose = () => {
  emits("update:show", false);
};

const handleLogout = () => {
  userStore.isLogin = false;
  userStore.authInfo = {
    accessToken: "",
    tokenType: "",
  };
  proStore.project = null;
  handleClose();
  router.push("/");
  ElMessage.success("退出成功");
};

const updateUserLimits = async () => {
  const res: any = await getUserLimits();
  list.value[0].count = res.generateText;
  list.value[1].count = res.generateImage;
  list.value[2].count = res.generateMusic;
  list.value[3].count = res.generateSpeech;
  list.value[4].count = res.generateVideo;
};

const triggerUpload = () => {
  fileInputRef.value?.click();
};

const handleUploadAvatar = async (e: any) => {
  const file = e.target.files[0];
  if (file) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB换算为字节数
    if (file.size > maxSizeInBytes) {
      ElMessage.error("文件大小超过5MB，请重新上传");
      return;
    }
    const res = await uploadAvatar(file);
    form.value.avatarUrl = res.avatarUrl;
  }
};

watch(
  () => showPay.value,
  () => {
    if (showPay.value === false && timer.value) {
      codeUrl.value = "";
      orderId.value = "";
      clearInterval(timer.value);
    }
  }
);

watch(
  () => props.show,
  () => {
    if (props.show) {
      updateUserLimits();
    }
  }
);

onMounted(async () => {
  // 初始化用户信息
  const userInfo = await getUserInfo();
  form.value = userInfo;
  // 初始化用户使用次数
  updateUserLimits();
  // 初始化商品价格
  const prices: any[] = await getGoodsPrice(
    list.value.map((item) => item.goodsCode)
  );
  prices.map((price) => {
    const goodsCode = price.goodsCode;
    list.value.map((item) => {
      if (item.goodsCode === goodsCode) {
        item.price = price.payAmount;
      }
    });
  });
});
</script>

<style scoped lang="less">
.input-number {
  width: 80px !important;
}
</style>
