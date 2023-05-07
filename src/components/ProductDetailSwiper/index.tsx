import { Swiper, Image } from "@taroify/core";

export default function ProductDetailSwiper (props: any) {
  const {banners} = props;
  return (
    <Swiper style={{height: '45%'}} autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
      {
        banners.split(',').map((url: string) => (
          <Swiper.Item>
            <Image src={url}></Image>
          </Swiper.Item>
        ))
      }
    </Swiper>
  )
}
