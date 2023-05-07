import { Image } from "@taroify/core"
import { View, Text } from "@tarojs/components"
import './index.scss'

export default function ShoppingItem (props: any) {
  const {
    type_id,
    pro_id,
    thumbnail,
    pro_name,
    tag,
    discount_price,
    price,
    onClick
  } = props;
  const handleClick = () => {
    onClick?.(type_id, pro_id);
  }
  return (
    <View className="shopping-item" onClick={handleClick}>
      <View className="shopping-item-left">
        <Image className="shopping-item-img" src={thumbnail[0]?.url}></Image>
      </View>
      <View className="shopping-item-right">
        <View className='shopping-item-right-title'>
          {tag.split(',').map((text: string) => `【${text}】`)} 
          {pro_name}
        </View>
        <View>
          <Text className="shopping-item-discount-price">¥ {discount_price}</Text>
          <Text className="shopping-item-price">¥ {price}</Text>
        </View>
      </View>
    </View>
  )
}
