

import { Empty } from "@taroify/core";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getCultureList } from "../../utils/RequestHepler";
import './index.scss';

import TrendItem from './TrendItem';
export default function Culture () {
  const [cultureList, setCultureList] = useState<any[]>([]);
  const fetchCultureList = async () => {
    Taro.showLoading({
      title: '加载中...',
    });
    const data = await getCultureList();
    setCultureList(data);
    Taro.hideLoading();
  };
  useEffect(() => {
    fetchCultureList();
  }, []);
  return (
    <View style={{width: "100%"}}>
      
      {
        cultureList.length ? cultureList.map((item) => <TrendItem {...item} />) : 
          <Empty>
            <Empty.Image src="network" />
            <Empty.Description>暂无数据～</Empty.Description>
          </Empty>
      }
    </View>
  )
}
