import { ConfigProvider, Sidebar, Empty } from "@taroify/core"
import './index.scss'
import { ScrollView } from "@tarojs/components"
import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import ShoppingItem from "../../components/ShoppingItem";
// @ts-ignore
const db = wx.cloud.database();

export default function Shopping () {
  const [typeList, setTypeList] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const getList = async (type_id = -1) => {
    Taro.showLoading({
      title: '加载中',
    });
    const where = type_id === -1 ? {} : {type_id }
    const { data } = await db.collection('product_info_list').where(Object.assign(where, {selling: 1})).get();
    Taro.hideLoading();
    setShoppingList(data);
  };

  const navigateTo = (type_id: number, pro_id: number) => {
    Taro.navigateTo({
      url: `/pages/ProductDetail/index?type_id=${type_id}&pro_id=${pro_id}`,
    });
  };
  const fetchTypeList = async () => {
    const { data } = await db.collection('product_type_list').get();
    setTypeList([{type_id: -1, type_name: "全部"}, ...data]);
  }
  useEffect(() => {
    fetchTypeList();
    getList();
  }, []);

  const onSliderChange = (nextIndex: string) => {
    const nextId = typeList[nextIndex]?.type_id;
    if (Number.isInteger(nextId)) {
      getList(nextId);
    }
  }
  return (
    <>
      <ConfigProvider
        theme={{
          sidebarTabColor: "#8D8D8D",
          sidebarWidth: "200rpx",
          sidebarTabPadding: "24rpx",
          sidebarTabFontSize: "24rpx",
        }}
      >
        <Sidebar style={{textAlign: "center"}} onChange={onSliderChange}>
          {
            typeList.map((item) => <Sidebar.Tab>{item.type_name}</Sidebar.Tab>)
          }
        </Sidebar>
      </ConfigProvider>
      <ScrollView
        showScrollbar={false}
        enhanced
        bounces
        scrollAnchoring
        enableBackToTop
        scrollY
        scrollWithAnimation
        className="shopping-items">
        { 
          shoppingList.length ?  shoppingList.map((item) => <ShoppingItem {...item} onClick={navigateTo} />) : 
          <Empty>
            <Empty.Image src="network" />
            <Empty.Description>咦，网络开小差了～</Empty.Description>
          </Empty>
        }
      </ScrollView>
    </>
  )
}
