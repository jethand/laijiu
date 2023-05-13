import { Swiper, Image } from "@taroify/core";

export default function ProductDetailSwiper (props: any) {
  const {banners} = props;
  if (!banners) {
    return null
  }
  return (
    <Swiper style={{height: '50%'}} autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
      {
        banners.split(',').map((url: string) => (
          <Swiper.Item>
            <Image src={url} placeholder="加载中..."></Image>
          </Swiper.Item>
        ))
      }
    </Swiper>
  )
}
