import { Avatar, Cell } from "@taroify/core";
import { View, Text, Progress } from "@tarojs/components";
import { Contact, VipCardOutlined, VipCard, Diamond, Like, Question } from "@taroify/icons";

import './index.scss'

export default function Mine () {
  return (
    <View className="mine">
      <View className="mine-header">
        <View className="mine-header-top">
          <View className="mine-header-user">
            <Avatar size="medium"><Contact size={20} style={{ color: "rgba(0,0,0,.3)" }} /></Avatar>
            <View className="mine-header-user_info">
              <View className="mine-header-user_info__name">深蓝色的五彩爱田</View>
              <View className="mine-header-user_info__phone">157****9006</View>
            </View>
          </View>
          <View className="mine-header-vip">
            <View className="mine-header-vip-view">
              <VipCardOutlined color="#fff"/>
              <View className="mine-header-vip-title">普通会员</View>
            </View>
            <Progress className="mine-header-vip-progress" percent={50} active={false} strokeWidth={"2px"} color={"#c3BED4"}/>
            <View className="mine-header-vip-rank">0/3000 还需要3000点成长值可升级到白银会员</View>
          </View>
        </View>
        <View className="mine-tabs">
          <View className="mine-tabs-item">
            <Text className="mine-tabs-item_value">11</Text>
            <Text className="mine-tabs-item_text">收藏夹</Text>
          </View>
          <View className="mine-tabs-item">
            <Text className="mine-tabs-item_value">36</Text>
            <Text className="mine-tabs-item_text">积分</Text>
          </View>
          <View className="mine-tabs-item">
            <Text className="mine-tabs-item_value">11</Text>
            <Text className="mine-tabs-item_text">等级</Text>
          </View>
        </View>
      </View>
      <View className="mine-body">
        <View className="mine-service">
          <Cell title="个人中心"></Cell>
          <View className="mine-service-items">
            <View className="mine-service-item">
              <Like className="mine-service-item_icon"/>
              <Text className="mine-service-item_text">收藏夹</Text>
            </View>
            <View className="mine-service-item">
              <Diamond className="mine-service-item_icon"/>
              <Text className="mine-service-item_text">积分</Text>
            </View>
            <View className="mine-service-item">
              <VipCard className="mine-service-item_icon"/>
              <Text className="mine-service-item_text">等级</Text>
            </View>
            <View className="mine-service-item">
              <Question className="mine-service-item_icon"/>
              <Text className="mine-service-item_text">常见问题</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
