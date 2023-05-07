import './index.scss';
import HomeSwiper from "../../components/HomeSwiper";
import HomeRecommand from "../../components/HomeRecommand";
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';

// @ts-ignore
const db = wx.cloud.database();

export default function Home () {
  const [ recommandData, setRecommand ] = useState<any>([]);
  const [ bannerList, setBannerList ] = useState<any[]>([]);
  const fetchHomeData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const { data } = await db.collection('home_recommand').get();
    Taro.hideLoading();
    const [config] = data;
    if (!config) {
      return;
    }
    const { banner, recommand } = config;
    setBannerList(banner);
    setRecommand(recommand)
  };
  useEffect(() => {
    fetchHomeData();
  }, []);
  return (
    <ScrollView
      showScrollbar={false}
      enhanced
      bounces
      scrollAnchoring
      enableBackToTop
      scrollY
      scrollWithAnimation>
      <HomeSwiper bannerList={bannerList}/>
      { recommandData.length ? <HomeRecommand data={recommandData} /> : null }
    </ScrollView>
  )
}
