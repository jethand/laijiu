import { View, Text, ScrollView } from "@tarojs/components";
import ProductDetailSwiper from "../../components/ProductDetailSwiper";
import { LikeOutlined, ShareOutlined } from "@taroify/icons";
import { Divider, Image, SafeArea } from "@taroify/core";

import './index.scss';
import ProductDetailParam from "../../components/ProductDetailParam";
import { getCurrentInstance } from "@tarojs/taro";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";


export default function ProductDetail () {
  
  const [proInfo, setProInfo] = useState<any>(null);
  const { router } = getCurrentInstance();
  const { type_id, pro_id } = router?.params || {};
  const getDetailInfo = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const {data: { data: infoData}} = await Taro.request({ url: `http://112.74.189.230:8081/product/info/${type_id}/${pro_id}` })
    const { data: { data: detailData} } = await Taro.request({ url: `http://112.74.189.230:8081/product/detail/${type_id}/${pro_id}` });
    Taro.hideLoading();
    if (!infoData || !detailData) {
      return;
    }
    const mergeData = Object.assign(detailData, {discount_price: infoData.discount_price, price: infoData.price})
    setProInfo(mergeData);
  };
  useEffect(() => {
    getDetailInfo();
  }, []);
  return (
    proInfo ? 
      <ScrollView
        className="product-detail"
        showScrollbar={false}
        enhanced
        bounces
        scrollAnchoring
        enableBackToTop
        scrollY
        scrollWithAnimation>
        <ProductDetailSwiper banners={proInfo.banners} />
        <View className="product-detail_header">
          <View className="product-detail_header_1">
            <View className="product-detail_header_price"><Text>¥</Text>{proInfo.price}</View>
            <View className="product-detail_header_right">
              <View className="product-detail_header_right_fav">
                <ShareOutlined className="product-detail_header_right_fav_icon"/>
                <View className="product-detail_header_right_fav_text">分享</View>
              </View>
              <View className="product-detail_header_right_fav" style={{marginLeft: "22rpx"}}>
                <LikeOutlined className="product-detail_header_right_fav_icon"/>
                <View className="product-detail_header_right_fav_text">收藏</View>
              </View>
            </View>
          </View>
          <View className="product-detail_header_title">{proInfo.title}</View>
          <View className="product-detail_header_desc">{proInfo.desc}</View>
        </View>
        <View className="product-detail_detail product-detail_detail_card">
          <View className="product-detail_detail_card_title">商品详情</View>
          <View className="product-detail_detail_images"></View>
          <Image style={{height: "680rpx"}} src="https://img30.360buyimg.com/sku/jfs/t1/206604/38/11351/218391/61a868f9E0353240f/23747181522f027a.jpg"></Image>
          <Image style={{height: "680rpx"}} src="https://img30.360buyimg.com/sku/jfs/t1/161389/38/26328/337798/61a868faE27b7bafd/26775e1a6f6954f4.jpg"></Image>
        </View>
        <View className="product-detail_param product-detail_detail_card">
          <View className="product-detail_detail_card_title">商品规格</View>
          <View className="product-detail_param_form">
            <ProductDetailParam data={proInfo} />
          </View>
        </View>
        <View className="product-detail_tips product-detail_detail_card">
          <View className="product-detail_detail_card_title">服务</View>
          <View className="product-detail_detail_tips_more">
            <Divider dashed>温馨提示</Divider>
            <View className="product-detail_tips_more_1">未满18周岁的用户请勿购买本商品，孕妇请勿饮酒；酒后请勿驾车</View>
            <Divider dashed>饮用提示</Divider>
            <View className="product-detail_tips_more_1">白酒在运输过程中会收到剧烈晃动，建议您放置几天后再饮用口感更好</View>
          </View>
        </View>
        <SafeArea position="bottom" />
      </ScrollView> : null
  )
}
