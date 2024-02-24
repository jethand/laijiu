import Taro from "@tarojs/taro";
import { IProductArea, IProductDetail } from "./constant";
import { errorRes, successRes } from "./base";

const collection = 'product-detail-list';

// 获取产品列表
export const fetchProductList = async (type_id: string) => {
  const db = Taro.cloud.database();
  Taro.showLoading({
    title: "获取中",
  });
  try {
    const where = type_id === 'all' ? {} : {type_id,};
    const pageRes = await db.collection(collection).where(Object.assign(where, {selling: true})).get()
    return successRes(pageRes.data)
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    Taro.hideLoading();
  }
};

// 获取产品详情
export const fetchProductDetail = async (_id: string) => {
  const db = Taro.cloud.database();
  Taro.showLoading({
    title: "获取中",
  });
  try {
    const res = await db.collection(collection).where({_id}).get();
    return successRes(res.data[0]);
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    Taro.hideLoading();
  }
};

// 新增商品
export const onAddProductRequest = async (type_id: string, data: IProductDetail) => {
  const db = Taro.cloud.database();
  try {
    const now = new Date().getTime();
    const pageRes = await db.collection(collection).add({
      data: {
        type_id, // 关联的typeId

        pro_name: data.pro_name,
        discount_price: data.discount_price,
        price: data.price,
        selling: data.selling,
        thumbnail: data.thumbnail,
        tag: ['高端白酒', '送礼'],

        banners: data.banners,
        title: data.title,
        sub_title: data.sub_title,
        pic_list: data.pic_list,
        net_content: data.net_content,
        specifications: data.specifications,
        abv: data.abv,
        shelf_life: data.shelf_life,
        package_from: data.package_from,
        suitable_scene: ["约会","商务宴请","送礼/礼品","婚宴","纪念日","聚会","自饮"],
        producer_area: IProductArea.GUIZHOU,
        flavor: data.flavor,
        
        create_time: now,
        update_time: now,
      }
    });
    const success = Boolean(pageRes._id);
    return success ? successRes(pageRes._id) : errorRes('创建商品失败');
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {
    
  }
};

// 更新商品
export const onUpdateProductRequest = async (_id: string, data: IProductDetail) => {
  const db = Taro.cloud.database();

  try {
    const now = new Date().getTime();
    const updateRes = await db.collection(collection)
    .where({_id})
    // @ts-ignore
    .update({
      data: {
        pro_name: data.pro_name,
        discount_price: data.discount_price,
        price: data.price,
        selling: data.selling,
        thumbnail: data.thumbnail,
        tag: ['高端白酒', '送礼'],

        banners: data.banners,
        title: data.title,
        sub_title: data.sub_title,
        pic_list: data.pic_list,
        net_content: data.net_content,
        specifications: data.specifications,
        abv: data.abv,
        shelf_life: data.shelf_life,
        package_from: data.package_from,
        suitable_scene: ["约会","商务宴请","送礼/礼品","婚宴","纪念日","聚会","自饮"],
        producer_area: IProductArea.GUIZHOU,
        flavor: data.flavor,
        
        create_time: now,
        update_time: now,
      }
    });
    const success = updateRes?.stats.updated === 1;
    return success ? successRes() : errorRes('更新数据失败');
  }
  catch(err) {
    return errorRes('发生了一些未知的错误');
  }
  finally {

  }
  
}

