

import { Avatar, Grid, Image } from "@taroify/core";
import { View, Text, Video } from "@tarojs/components";
import Taro from "@tarojs/taro";
import './index.scss';

export default function TrendItem ({ title, create_avatar, create_name, resource_type, urls, create_time }) {
  const date: any = new Date(create_time);
  const [year, month, day, hours, minutes, second] = [date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
  const padStart = (number) => {
    return number.toString().padStart(2, '0');
  };
  const dateString = `${year}-${padStart(month)}-${padStart(day)} ${padStart(hours)}:${padStart(minutes)}:${padStart(second)}`;

  const onPreviewImages = (currentUrl: string) => {
    Taro.previewImage({
      urls: urls.map((item: any) => item.url),
      current: currentUrl
    })
  }
  return (
    <View className='trends flex-row'>
      <View className='trends-avatar'>
        <Avatar src={create_avatar} />
      </View>
      <View className='trends-right'>
        <Text className='trends-name'>{create_name}</Text>
        <View className='trends-title'>{title}</View>
        
        <View className='trends-res'>
        {resource_type === 1 ? (
          <Grid columns={3} bordered={false}>
            {
              urls.map(({url}) => (
                // eslint-disable-next-line react/jsx-key
                <Grid.Item>
                  <Image className='trends-res-image' src={url} onClick={() => {onPreviewImages(url)}} />
                </Grid.Item>
              ))
            }
          </Grid>
        ): null}
        {resource_type === 2 ? (
          <Video src={urls[0]?.url} className='trends-res-video' />): null}
        </View>
        <View className='trends-time'>
          {dateString} 发布
        </View>
      </View>
    </View>
  )
}
