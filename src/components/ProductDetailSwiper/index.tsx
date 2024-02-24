import { Swiper, Image } from "@taroify/core";

export default function ProductDetailSwiper (props: any) {
  const {banners} = props;
  if (!Array.isArray(banners) || banners.length === 0) {
    return null
  }
  return (
    <Swiper style={{height: '50%'}} autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
      {
        banners.map(({url}) => (
          <Swiper.Item key={url}>
            <Image src={url} placeholder='加载中...'></Image>
          </Swiper.Item>
        ))
      }
    </Swiper>
  )
}
