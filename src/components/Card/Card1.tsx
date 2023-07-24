import { Image, Toast } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import './index.scss';
export default function Card1 (props: any) {
  const { thumbnail, title, subtitle, action } = props;
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    if (action.url) {
      if (action.url.startsWith('http')) {
        Taro.setClipboardData({
          data: action.url
        });
        setOpen(true);
        /* Taro.navigateTo({
          url: `/pages/WebViewComp/index?url=${action.url}`
        }); */
      } else {
        Taro.navigateTo({
          url: action.url
        });
      }
    }
  }
  return (
    <View className="home-card flex1" onClick={handleClick}>
      <Toast open={open} onClose={setOpen}>已复制链接,请在浏览器中打开</Toast>
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
