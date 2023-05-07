import './index.scss';
import HomeSwiper from "../../components/HomeSwiper";
import HomeRecommand from "../../components/HomeRecommand";
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { getHomeRecommand } from '../../utils/RequestHepler';

export default function Home () {
  const [ recommandData, setRecommand ] = useState<any>([]);
  const [ bannerList, setBannerList ] = useState<any[]>([]);
  const fetchHomeData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const { data } = await getHomeRecommand();
    Taro.hideLoading();
    const { banner, recommand } = data;
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
