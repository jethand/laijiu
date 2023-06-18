

import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getCultureList } from "../../utils/RequestHepler";
import './index.scss';

import TrendItem from './TrendItem';
export default function Culture () {
  const [cultureList, setCultureList] = useState<any[]>([]);
  const fetchCultureList = async () => {

    const data = await getCultureList();
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
