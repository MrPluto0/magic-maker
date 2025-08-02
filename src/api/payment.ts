// import axios from "axios";
import { mockPrepayResult, mockGoodsPrice } from "@/mock/mockData";
import { mockSuccess } from "@/mock/mockUtils";

// const PaymentUrl = "https://zoomad.net:7007/api";

export const prepay = async (
  userId: number,
  price: number,
  productCodes: any
) => {
  // const res = await axios.post(`${PaymentUrl}/batchPrepay`, {
  //   userId,
  //   price,
  //   productCodes,
  // });
  // const data = res.data.data as { codeUrl: string; orderId: string };
  // return data;
  return mockSuccess(mockPrepayResult);
};

export const getGoodsPrice = async (goodsCodes: string[]) => {
  // const res = await axios.post(`${PaymentUrl}/getGoodsByCodes `, goodsCodes);
  // return res.data.data;
  return mockSuccess(mockGoodsPrice);
};

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const checkPayment = async (orderId: string) => {
  // const res = await axios.get(`${PaymentUrl}/getOrderById?orderId=${orderId}`);
  // return res.data.data.status == 1;
  await mockSuccess(null); // 模拟检查延迟
  return Math.random() > 0.5; // 随机返回支付状态
};
