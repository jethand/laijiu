

export enum IResponseCode {
  NOT_LOGIN = -1, // 未登录
  SUCCESS = 0, // 成功
  PARAM_ERROR = 1, // 参数错误
  RESPONSE_ERROR = 2, // 结果错误
}

export interface IResponse {
  code: IResponseCode;
  message?: string;
  data?: any;
  total?: number;
}

export interface IResourceItem {
  url: string;
}

export enum IPackFrom {
  BOX = "礼盒装",
  BOTTLE = '光瓶装'
}

export enum IProductArea {
  GUIZHOU = '贵州'
}
export enum IFlavor {
  MAOTAIFLAVOR = '酱香型'
}

export interface IProductDetail {
  pro_name: string; // 商品名称
  discount_price: number;  // 售价
  price: number;  // 原价
  selling: boolean; // 是否在售
  thumbnail: IResourceItem[];  // 缩略图
  tag: string[];  // 标签

  banners: IResourceItem[]; // banner列表
  title: string; // 商品标题
  sub_title: string; // 商品副标题
  pic_list: IResourceItem[]; // 详情图片列表
  net_content: number; // 单件净含量(单位:ml)
  specifications: number; // 包装规格(单位:瓶)
  abv: number; // 酒精度(单位:%vol)
  shelf_life: number; // 保质期(单位:年)
  package_from: IPackFrom; 
  suitable_scene?: string[]; // 适用场景
  producer_area?: IProductArea; // 产地
  flavor: IFlavor; // 香型
}