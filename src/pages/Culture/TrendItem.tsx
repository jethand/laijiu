

import { Avatar, Grid, Image } from "@taroify/core";
import { View, Text, Video } from "@tarojs/components";
import './index.scss';

export default function TrendItem () {
  return (
    <View className="trends flex-row">
      <View className="trends-avatar">
        <Avatar src="http://www.laijiu.com.cn/../image/nav-logo.jpg" />
      </View>
      <View className="trends-right">
        <Text className="trends-name">赖酒管理员</Text>
        <View className="trends-title">
        赖氏三代酿酒，百年风雨于同一方水土，历经父传子、师传徒，沉淀的不只是汗水，更是浓浓的情感。<br />
        我有酒，你有故事吗
        </View>
        <View className="trends-res">
          <Grid columns={3} bordered={false}>
            <Grid.Item>
              <Image className="trends-res-image" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </Grid.Item>
            <Grid.Item>
              <Image className="trends-res-image" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
            </Grid.Item>
            <Grid.Item>
              <Image className="trends-res-image" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
            </Grid.Item>
            <Grid.Item>
              <Image className="trends-res-image" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
            </Grid.Item>
            <Grid.Item>
              <Image className="trends-res-image" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
            </Grid.Item>
          </Grid>
          {/* <Video src="http://www.laijiu.com.cn/static/video/laiding2021.mp4" className="trends-res-video"/> */}
        </View>
        <View className="trends-time">
          昨天  12:57 发布
        </View>
      </View>
    </View>
  )
}
