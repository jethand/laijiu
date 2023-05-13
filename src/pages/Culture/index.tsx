

import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import './index.scss';

import TrendItem from './TrendItem';
export default function Culture () {
  const [cultureList, setCultureList] = useState<any[]>([]);
  const fetchCultureList = async () => {
    const {data: { data}} = await Taro.request({ url: `http://127.0.0.1:8361/culture/list` })
    setCultureList(data);
  };
  useEffect(() => {
    fetchCultureList();
  }, []);
  return (
    <View style={{width: "100%"}}>
      {
        cultureList.map((item) => <TrendItem {...item} />)
      }
    </View>
  )
}
