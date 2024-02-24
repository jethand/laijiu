import { View, Text, ScrollView } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import { Divider, Image, SafeArea } from "@taroify/core";
import ProductDetailSwiper from "../../components/ProductDetailSwiper";
import ProductDetailParam from "../../components/ProductDetailParam";
import { fetchProductDetail } from "../../api/product-detail-list";
import './index.scss';


export default function ProductDetail () {
  
  const [proInfo, setProInfo] = useState<any>(null);
  const { router } = getCurrentInstance();
  const { proId } = router?.params || {} as any;
  const getDetailInfo = async () => {
    const result = await fetchProductDetail(proId as string);
    if (result.code === 0) {
      setProInfo(result.data);
    } else {
      Taro.showToast({
        title: "服务错误"
      })
    }
  };
  useEffect(() => {
    getDetailInfo();
  }, []);
  return (
    proInfo ? 
      <ScrollView
        className='product-detail'
        showScrollbar={false}
        enhanced
        bounces
        scrollAnchoring
        enableBackToTop
        scrollY
        scrollWithAnimation
      >
        <ProductDetailSwiper banners={proInfo.banners} />
        <View className='product-detail_header'>
          <View className='product-detail_header_1'>
            <View className='product-detail_header_price'><Text>¥</Text>{proInfo.discount_price}</View>
          </View>
          <View className='product-detail_header_title'>{proInfo.title}</View>
          <View className='product-detail_header_desc'>{proInfo.sub_title}</View>
        </View>
        <View className='product-detail_detail product-detail_detail_card'>
          <View className='product-detail_detail_card_title'>商品详情</View>
          <View className='product-detail_detail_images'></View>
          {
            proInfo.pic_list?.map(({url}) => <Image key={url} src={url} mode='widthFix' placeholder='加载中...' />)
          }
        </View>
        <View className='product-detail_param product-detail_detail_card'>
          <View className='product-detail_detail_card_title'>商品规格</View>
          <View className='product-detail_param_form'>
            <ProductDetailParam data={proInfo} />
          </View>
        </View>
        <View className='product-detail_tips product-detail_detail_card'>
          <View className='product-detail_detail_card_title'>服务</View>
          <View className='product-detail_detail_tips_more'>
            <Divider dashed>温馨提示</Divider>
            <View className='product-detail_tips_more_1'>未满18周岁的用户请勿购买本商品，孕妇请勿饮酒；酒后请勿驾车</View>
            <Divider dashed>饮用提示</Divider>
            <View className='product-detail_tips_more_1'>白酒在运输过程中会收到剧烈晃动，建议您放置几天后再饮用口感更好</View>
          </View>
        </View>
        <SafeArea position='bottom' />
      </ScrollView> : null
  )
}
