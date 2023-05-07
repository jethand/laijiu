

import { View } from "@tarojs/components";
import './index.scss';

import TrendItem from './TrendItem';
export default function Culture () {
  return (
    <View style={{width: "100%"}}>
      <TrendItem />
      <TrendItem />
      <TrendItem />
    </View>
  )
}
