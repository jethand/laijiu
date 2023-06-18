

import { Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import TypeManager from './TypeManager';
import Culture from './Culture'
export default function VipCenter () {
  const [value, setValue] = useState('product')
  useEffect(() => {
    
  }, []);

  return (
    <View style={{width: "100%",backgroundColor: "#fafafa"}}>
      {/* 产品管理 */}
      {/* 首页推荐管理 */}
      {/* 赖酒文化管理 */}
      <Tabs theme="card" value={value} onChange={setValue}>
        <Tabs.TabPane title="产品管理" value={"product"}>
          <TypeManager />
        </Tabs.TabPane>
        <Tabs.TabPane title="赖酒文化管理" value={"culture"}>
          <Culture />
        </Tabs.TabPane>
        <Tabs.TabPane title="首页推荐管理" value={"home"}>暂未开放</Tabs.TabPane>
      </Tabs>
      
    </View>
  )
}
