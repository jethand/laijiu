import './index.scss';
import { Video, View } from '@tarojs/components';
import Card1 from '../Card/Card1';
import Card2 from '../Card/Card2';
import Card3 from '../Card/Card3';

import { Button, Cell, ConfigProvider } from '@taroify/core';
import { Arrow, Passed } from "@taroify/icons"
import Taro from '@tarojs/taro';

interface HomeRecommandProps {
  data: any[]
}
export default function HomeRecommand({ data }: HomeRecommandProps) {
  const first = data.filter((item) => item.type === 0);
  const tips = data.filter((item) => item.type === 1);
  const recommand1 = data.filter((item) => item.type === 2);
  const recommand2 = data.filter((item) => item.type === 3);
  const bottom = data.filter((item) => item.type === 4);

  const onGoto = () => {
    Taro.navigateTo({
      url: tips[0].url,
    });
  }
  return (
    <View className="home-container">
      {/* 签到和分享 */}
      <View className='flex-row'>
        <Card1 {...first[0]} />
        <View className="width20" />
        <Card1 {...first[1]} />
      </View>
      <ConfigProvider
        theme={{
          cellBackgroundColor: "#132264",
          cellColor: "#F5E0C0",
        }}
      >
        <Cell 
          title={tips[0].title}
          rightIcon={<Arrow />} 
          icon={<Passed />} 
          style={{marginBottom: "20rpx", marginTop: "20rpx"}}
          onClick={onGoto}>
          <Button
            style={{height: "100%",color: "#F5E0C0",display: "flex",padding: 0}}
            variant="text" 
            color='default'
            openType='share'>
            {tips[0].subtitle}
          </Button>
        </Cell>
      </ConfigProvider>
      {/* 产品介绍 */}
      <View className='home-container-title'>好酒推荐</View>
      <View style={{marginTop: "20rpx", marginBottom: "20rpx"}}>
        <Card2 {...recommand1[0]} />
      </View>
      <View className='flex-row'>
        <Card1 {...recommand2[0]}/>
        <View className="width20" />
        <Card1 {...recommand2[1]} />
      </View>
      
      {/* 赖酒文化 */}
      <View className='home-container-title'>赖酒文化</View>
      <Card3 title={bottom[0].title} subtitle={bottom[0].subtitle}>
        <Video
          src={bottom[0].video}
          className='home-container-video'
          enablePlayGesture
        />
      </Card3>
    </View>
  )
}
