import { Image } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';

export default function Card1 (props: any) {
  const { data: {url, title, subtitle, action} } = props;
  const handleClick = () => {
    if (action.scheme) {
      if (action.scheme.startsWith('#小程序')) {
        Taro.navigateToMiniProgram({
          shortLink: action.scheme
        });
      } else {
        Taro.navigateTo({
          url: action.scheme
        });
      }
    }
  }
  return (
    <View className='home-card flex1' onClick={handleClick}>
      <View className='flex-column flex1'>
        <Text className='home-card-title'>{title}</Text>
        <Text className='home-card-subtitle'>{subtitle}</Text>
        <View className='home-card-action'>{action.text}</View>
      </View>
      {
        url ? 
          <View className='flex' style={{justifyContent: "flex-end",width: "80rpx",height: "80rpx",alignSelf: "flex-end"}}>
            <Image src={url} style={{borderRadius: "10rpx"}} />
          </View> : null
      }
    </View>
  )
}
