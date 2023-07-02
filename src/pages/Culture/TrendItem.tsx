

import { Avatar, Grid, Image } from "@taroify/core";
import { View, Text, Video } from "@tarojs/components";
import './index.scss';

export default function TrendItem ({ title, create_name, type, material, create_time }) {
  const date: any = new Date(create_time);
  const [year, month, day, hours, minutes, second] = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
  const padStart = (number) => {
    return number.toString().padStart(2, '0');
  };
  const dateString = `${year}-${padStart(month)}-${padStart(day)} ${padStart(hours)}:${padStart(minutes)}:${padStart(second)}`;
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
              material.split(',').map((url) => (
                <Grid.Item>
                  <Image className="trends-res-image" src={url} />
                </Grid.Item>
              ))
            }
          </Grid>
        ): null}
        {type === 2 ? (
          <Video src={material} className="trends-res-video"/>): null}
        </View>
        <View className="trends-time">
          {dateString} 发布
        </View>
      </View>
    </View>
  )
}
