import Taro from "@tarojs/taro";
import { errorRes, successRes } from "./base";
import { IResponse } from "./constant/index";


const collection = 'culture-list';

// 获取文化列表
export const fetchCultureList = async (): Promise<IResponse> => {
  const db = Taro.cloud.database();
  Taro.showLoading({
    title: "获取中",
  });
  try {
    const pageRes = await db.collection(collection).get();
    return successRes(pageRes.data);
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    Taro.hideLoading();
  }
};