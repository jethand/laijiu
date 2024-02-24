import { ConfigProvider, Sidebar, Empty } from "@taroify/core"
import { ScrollView } from "@tarojs/components"
import { useEffect, useState } from "react"
import Taro from "@tarojs/taro";

import './index.scss'
import ShoppingItem from "../../components/ShoppingItem";
import { fetchProTypeList } from "../../api/type-list";
import { fetchProductList } from "../../api/product-detail-list"

export default function Shopping () {
  const [typeList, setTypeList] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const getList = async () => {
    const result = await fetchProTypeList();
    if (result.code !== 0) {
      return;
    }
    const all = {_id: 'all', type_name: "全部"};
    setTypeList([all, ...result.data]);
    onFetchProductList(all._id)
  };

  const onFetchProductList = async (_id: string) => {
    const result = await fetchProductList(_id);
    if (result.code === 0) {
      setProductList(result.data);
    }
  };

  const navigateTo = (_id: string) => {
    Taro.navigateTo({
      url: `/pages/ProductDetail/index?proId=${_id}`,
    });
  };
  useEffect(() => {
    getList();
  }, []);

  const onSliderChange = (nextIndex: string) => {
    const nextId = typeList[nextIndex]?._id;
    onFetchProductList(nextId);
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
            typeList.map((item) => <Sidebar.Tab key={item._id}>{item.type_name}</Sidebar.Tab>)
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
        className='shopping-items'
      >
        { 
          productList.length ?  productList.map((item) => <ShoppingItem key={item._id} {...item} onClick={navigateTo} />) : 
          <Empty>
            <Empty.Image src='network' />
            <Empty.Description>暂无数据～</Empty.Description>
          </Empty>
        }
      </ScrollView>
    </>
  )
}
