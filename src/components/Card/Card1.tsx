import { Image } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';
export default function Card1 (props: any) {
  const { thumbnail, title, subtitle, action } = props;
  const handleClick = () => {
    if (action.url) {
      if (action.url.startsWith('http')) {
        Taro.navigateTo({
          url: `/pages/WebViewComp/index?url=${action.url}`
        });
      } else {
        Taro.navigateTo({
          url: action.url
        });
      }
    }
  }
  return (
    <View className="home-card flex1" onClick={handleClick}>
      <View className="flex-column flex1">
        <Text className='home-card-title'>{title}</Text>
        <Text className='home-card-subtitle'>{subtitle}</Text>
        <View className='home-card-action'>{action.text}</View>
      </View>
      {
        thumbnail ? 
          <View className="flex" style={{justifyContent: "flex-end",width: "80rpx",height: "80rpx",alignSelf: "flex-end"}}>
            <Image src={thumbnail} style={{borderRadius: "10rpx"}} />
          </View> : null
      }
    </View>
  )
}
