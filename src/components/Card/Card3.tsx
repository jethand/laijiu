import { View, Text } from "@tarojs/components";
import './index.scss';
export default function Card3 (props: any) {
  const { title, subtitle, actionText, style = {}, children } = props;
  return (
    <View className="home-card flex-column" style={style}>
      <Text className='home-card-title text-center'>{title}</Text>
      <Text className='home-card-subtitle text-center'>{subtitle}</Text>
      {actionText ? <Text className='home-card-action'>{actionText}</Text> : null}
      { children }
    </View>
  )
}
