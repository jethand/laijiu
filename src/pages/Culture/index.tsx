

import { Empty } from "@taroify/core";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import './index.scss';
import TrendItem from './TrendItem';
import { fetchCultureList } from "../../api/culture";

export default function Culture () {
  const [cultureList, setCultureList] = useState<any[]>([]);
  const init = async () => {
    const result = await fetchCultureList();
    if (result.code === 0) {
      setCultureList(result.data);
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <View style={{width: "100%"}}>
      
      {
        // eslint-disable-next-line react/jsx-key
        cultureList.length ? cultureList.map((item) => <TrendItem {...item} />) : 
          <Empty>
            <Empty.Image src='network' />
            <Empty.Description>暂无数据～</Empty.Description>
          </Empty>
      }
    </View>
  )
}
