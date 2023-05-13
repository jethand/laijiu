

import { Avatar, Grid, Image } from "@taroify/core";
import { View, Text, Video } from "@tarojs/components";
import './index.scss';

export default function TrendItem ({ title, create_name, type, images, videos, create_time }) {
  return (
    <View className="trends flex-row">
      <View className="trends-avatar">
        <Avatar src="http://www.laijiu.com.cn/../image/nav-logo.jpg" />
      </View>
      <View className="trends-right">
        <Text className="trends-name">{create_name}</Text>
        <View className="trends-title">{title}</View>
        
        <View className="trends-res">
        {type === 1 ? (
          <Grid columns={3} bordered={false}>
            {
              JSON.parse(images).map(({url}) => (
                <Grid.Item>
                  <Image className="trends-res-image" src={url} />
                </Grid.Item>
              ))
            }
          </Grid>
        ): null}
        {type === 2 ? (
            JSON.parse(videos).map(({url}) => (
                <Video src={url} className="trends-res-video"/> 
            ))): null}
        </View>
        <View className="trends-time">
          {create_time} 发布
        </View>
      </View>
    </View>
  )
}
