import { Swiper, Image } from "@taroify/core";
import './index.scss';

interface HomeSwiperProps {
  bannerList: any[];
}
export default function HomeSwiper ({ bannerList = []}: HomeSwiperProps) {
  const handleClick = (action_url: string) => {
    if (!action_url) {
      return;
    }
  };
  return (
    <Swiper className="home-swiper" autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
      <Swiper.Item >
        {
          bannerList.map(({url, action_url}) => (
            <Image
              lazyLoad
              onClick={() => {handleClick(action_url)}}
              className="home-swiper-item"
              placeholder="加载中..."
              mode="aspectFit"
              src={url}
            />
          ))
        }
      </Swiper.Item>
    </Swiper>
  )
}
