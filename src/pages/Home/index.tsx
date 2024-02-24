
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.scss';
import HomeSwiper from "../../components/HomeSwiper";
import HomeRecommand from "../../components/HomeRecommand";
import { fetchHomeConfig } from '../../api/home';


export default function Home () {
  
  const [banners, setBanners] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [section, setSection] = useState<any>({});
  const [culture, setCulture] = useState<any>({});
  const fetchHomeData = async () => {
    const result = await fetchHomeConfig();
    if (result.code === 0) {
      setBanners(result.data.banners);
      setCards(result.data.cards);
      setSection(result.data.section);
      setCulture(result.data.culture);
    }
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
      scrollWithAnimation
    >
      <>
        <HomeSwiper banners={banners} />
        {cards.length > 0 && <HomeRecommand cards={cards} section={section} culture={culture} />}
      </>
    </ScrollView>
  )
}
