

import { Tabs } from "@taroify/core";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import TypeManager from './TypeManager';
// @ts-ignore
const db = wx.cloud.database();

export default function VipCenter () {
  useEffect(() => {
    
  }, []);

  return (
    <View style={{width: "100%",backgroundColor: "#fafafa"}}>
      {/* 产品管理 */}
      {/* 首页推荐管理 */}
      {/* 赖酒文化管理 */}
      <Tabs theme="card">
        <Tabs.TabPane title="产品管理">
          <TypeManager />
        </Tabs.TabPane>
        <Tabs.TabPane title="首页推荐管理">内容 2</Tabs.TabPane>
        <Tabs.TabPane title="赖酒文化管理">内容 3</Tabs.TabPane>
      </Tabs>
      
    </View>
  )
}
