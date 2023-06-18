import Taro from "@tarojs/taro";

export const aliyunOrigin = `https://112.74.189.230`;
export const getHomeRecommand = () => {
  return Taro.request({url: 'https://laijiu.oss-cn-beijing.aliyuncs.com/home/home.json'});
}


// 获取酒种类列表
export const getProductTypesList = async (): Promise<any[]> => {
  try {
    const res = await Taro.cloud.callFunction({
      // 云函数名称
      name: 'shop',
      // 传给云函数的参数
      data: {
        path: "/api/product/type/list",
      },
    });
    return res.result as any[];
  } catch (message) {
    console.log('message: ', message);
    return [];
  }
}

// 根据typeId获取酒分类列表
export const getProductTypesListById = async (type_id: number) => {
  try {
    const res = await Taro.cloud.callFunction({
      // 云函数名称
      name: 'shop',
      data: {
        path: "/api/product/type/list/{type_id}",
        type_id
      },
    });
    return res.result as any[];
  } catch (message) {
    return [];
  }
};

// 获取酒info
export const getProductInfo = async (type_id: number, pro_id: number) => {
  try {
    const res = await Taro.cloud.callFunction({
      // 云函数名称
      name: 'shop',
      data: {
        path: "/api/product/info/{type_id}/{pro_id}",
        type_id,
        pro_id
      },
    });
    return res.result as any;
  } catch (message) {
    return [];
  }
};
// 获取酒detail
export const getProductDetail = async (type_id: number, pro_id: number) => {
  try {
    const res = await Taro.cloud.callFunction({
      // 云函数名称
      name: 'shop',
      data: {
        path: "/api/product/detail/{type_id}/{pro_id}",
        type_id,
        pro_id
      },
    });
    return res.result as any;
  } catch (message) {
    return [];
  }
};

// 获取文化列表
export const getCultureList = async () => {
  try {
    const res = await Taro.cloud.callFunction({
      // 云函数名称
      name: 'shop',
      data: {
        path: "/api/culture/list",
      },
    });
    return res.result as any;
  } catch (message) {
    return [];
  }
};



// 获取酒种类列表
export const productTypeCreate = (name: string) => {
  return Taro.request({
    url: `${aliyunOrigin}/api/product/type/create`,
    header: {
      'content-type': 'application/json'
    },
    method: "POST",
    data: {
      type_name: name
    }}).then(({ data }) => data);
}
