import './index.scss';
import HomeSwiper from "../../components/HomeSwiper";
import HomeRecommand from "../../components/HomeRecommand";
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import { getHomeRecommand } from '../../utils/RequestHepler';

export default function Home () {
  const [homeJson, setHomeJson] = useState<any>(null);
  const fetchHomeData = async () => {
    Taro.showLoading({
      title: '加载中',
    });
    const { home_json } = await getHomeRecommand();
    const homeJson = JSON.parse(home_json);
    setHomeJson(homeJson);
    Taro.hideLoading();
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
      {
        homeJson ? (
          <>
          <HomeSwiper bannerList={homeJson?.thumbnail}/>
          <HomeRecommand data={homeJson} />
          </>
        ) : null
      }
    </ScrollView>
  )
}
