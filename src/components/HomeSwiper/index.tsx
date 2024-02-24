import { Swiper, Image } from "@taroify/core";
import './index.scss';

interface HomeSwiperProps {
  banners: any[];
}
export default function HomeSwiper ({ banners = []}: HomeSwiperProps) {
  return (
    <Swiper className='home-swiper' autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
        {
          banners.map(({url}) => (
            <Swiper.Item key={url}>
              <Image
                lazyLoad
                className='home-swiper-item'
                placeholder='加载中...'
                mode='aspectFit'
                src={url}
              />
            </Swiper.Item>
          ))
        }
    </Swiper>
  )
}
