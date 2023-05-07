import Taro from "@tarojs/taro";

export const aliyunOrigin = `http://112.74.189.230:8081`;
export const getHomeRecommand = () => {
  return Taro.request({url: `http://112.74.189.230:3018/laijiu/home/home_recommand.json`});
}

// 获取酒种类列表
export const getProductTypesList = () => {
  return Taro.request({url: `${aliyunOrigin}/product/type/list`}).then(({ data }) => data);
}

// 获取酒种类列表
export const productTypeCreate = (name: string) => {
  return Taro.request({
    url: `${aliyunOrigin}/product/type/create`,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    data: {
      type_name: name
    }}).then(({ data }) => data);
}

// 根据typeId获取酒分类列表
export const getProductTypesListById = (type_id: number) => {
  return Taro.request({url: `${aliyunOrigin}/product/info/${type_id}`}).then(({ data }) => data);
}

// 获取产品信息
export const getProductInfo = (type_id: any, pro_id: any) => {
  return Taro.request({ url: `${aliyunOrigin}/product/info/${type_id}/${pro_id}` }).then(({ data }) => data)
};
// 获取产品信息
export const getProductDetail = (type_id: number, pro_id: number) => {
  return Taro.request({url: `${aliyunOrigin}/product/detail/${type_id}/${pro_id}`}).then(({ data }) => data)
};
