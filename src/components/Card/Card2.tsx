import { View, Text } from "@tarojs/components";
import { Image } from "@taroify/core";

import './index.scss';
import Taro from "@tarojs/taro";
export default function Card2 (props: any) {
  const { thumbnail, title, subtitle, action} = props;

  const handleClick = () => {
    if (action.url) {
      Taro.navigateTo({
        url: action.url
      });
  }
  };
  return (
    <View className="home-card flex-row" style={{padding: "46rpx 24rpx 24rpx 44rpx"}} onClick={handleClick}>
      <View className="flex-column">
        <Text className='home-card-title'>{title}</Text>
        <Text className='home-card-subtitle'>{subtitle}</Text>
        <Text className='home-card-action' style={{marginTop: "40rpx"}}>{action.text}</Text>
      </View>
      <View className="flex1 flex-row" style={{justifyContent: "flex-end"}}>
        <View style={{width: "220rpx",height: "220rpx"}}>
          <Image src={thumbnail} style={{borderRadius: "20rpx"}} />
        </View>
      </View>
    </View>
  )
}
