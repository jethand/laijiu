import Taro from "@tarojs/taro";
import { errorRes, successRes } from "./base";
import { IResponse } from "./constant/index";


const collection = 'home-config';

// 获取类型列表
export const fetchHomeConfig = async (): Promise<IResponse> => {
  const db = Taro.cloud.database();
  Taro.showLoading({
    title: "加载中",
  });
  try {
    const pageRes = await db.collection(collection).where({
      _id: "34e8707565d8947e00c93a966e0e8913"
    }).get();
    return successRes(pageRes.data[0]);
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    Taro.hideLoading();
  }
};