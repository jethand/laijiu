import './index.scss';
import { Video, View } from '@tarojs/components';
import Card1 from '../Card/Card1';
import Card2 from '../Card/Card2';
import Card3 from '../Card/Card3';

import { Button, Cell, ConfigProvider } from '@taroify/core';
import { Arrow, Passed } from "@taroify/icons"
import Taro from '@tarojs/taro';

export default function HomeRecommand({ data }: any) {

  /* const onGoto = () => {
    Taro.navigateTo({
      url: tips[0].url,
    });
  } */
  return (
    <View className="home-container">
      {/* 文章和分享 */}
      <View className='flex-row'>
        <Card1 {...data.knowledge[0]} />
        <View className="width20" />
        <Card1 {...data.knowledge[1]} />
      </View>
      <ConfigProvider
        theme={{
          cellBackgroundColor: "#132264",
          cellColor: "#F5E0C0",
        }}
      >
        <Cell 
          title={data.share[0].title}
          rightIcon={<Arrow />} 
          icon={<Passed />} 
          style={{marginBottom: "20rpx", marginTop: "20rpx"}}>
          <Button
            style={{height: "100%",color: "#F5E0C0",display: "flex",padding: 0}}
            variant="text" 
            color='default'
            openType='share'>
            {data.share[0].subtitle}
          </Button>
        </Cell>
      </ConfigProvider>
      {/* 产品介绍 */}
      <View className='home-container-title'>好酒推荐</View>
      <View style={{marginTop: "20rpx", marginBottom: "20rpx"}}>
        <Card2 {...data.recommand[0]} />
      </View>
      <View className='flex-row'>
        <Card1 {...data.recommand[1]}/>
        <View className="width20" />
        <Card1 {...data.recommand[2]} />
      </View>
      
      {/* 赖酒文化 */}
      <View className='home-container-title'>甲骨文酒文化</View>
      <Card3 title={data.video[0].title} subtitle={data.video[0].subtitle}>
        <Video
          src={data.video[0].url}
          className='home-container-video'
          enablePlayGesture
        />
      </Card3>
    </View>
  )
}
