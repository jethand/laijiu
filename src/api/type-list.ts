import Taro from "@tarojs/taro";
import { errorRes, successRes } from "./base";
import { IResponse } from "./constant/index";


const collection = 'type-list';

// 获取类型列表
export const fetchProTypeList = async (): Promise<IResponse> => {
  const db = Taro.cloud.database();
  Taro.showLoading({
    title: "加载中",
  });
  try {
    const pageRes = await db.collection(collection).where({visible: true}).orderBy("index", "desc").get()
    return successRes(pageRes.data);
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    Taro.hideLoading();
  }
};