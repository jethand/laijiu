import { Swiper, Image } from "@taroify/core";

export default function ProductDetailSwiper (props: any) {
  const {} = props;
  return (
    <Swiper style={{height: '45%'}} autoplay={4000} stopPropagation={false}>
      <Swiper.Indicator />
      <Swiper.Item>
        <Image src={"http://www.laijiu.com.cn/static/image/featured.jpg"}></Image>
      </Swiper.Item>
      <Swiper.Item>
        <Image src={"http://www.laijiu.com.cn/static/image/itinerary.jpg"}></Image>
      </Swiper.Item>
    </Swiper>
  )
}
