

import { Button, Cell, Dialog, Empty, Field, Tabs, Input } from "@taroify/core";
import { useEffect, useState } from "react";
import { Plus } from "@taroify/icons"
import ShoppingItem from "../../components/ShoppingItem";
import Taro, { useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { getProductTypesList, getProductTypesListById, productTypeCreate, getProductInfo } from '../../utils/RequestHepler';

export default function TypeManager () {
  const [ typesList, setTypesList ] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [typeValue, setTypeValue] = useState<number>(-1);

  useDidShow(() => {
    fetchList(typeValue);
  })
  const fetchList = async (type_id: number) => {
    Taro.showLoading({
      title: '加载中',
    });
    const { data } = await getProductTypesListById(Number(type_id));
    Taro.hideLoading();
    setShoppingList(data);
  };
  const fetchTypesList = async () => {
    const { data } = await getProductTypesList();
    setTypesList([{type_id: -1, type_name: "全部"}, ...data, {type_id: -2, type_name: "添加"}]);
  };
  const handleTabClick = ({ value }) => {
    setTypeValue(value);
    if (value === -2) {
      setOpen(true);
      setShoppingList([]);
      return;
    } else {
      fetchList(value);
    }
  }

  const navigateTo = (type_id?: number, pro_id?: number) => {
    const action = type_id && pro_id ? 'modify' : 'add';
    if (!type_id) { // 不管是modify还是add这个字段是必有的
      return;
    }
    Taro.navigateTo({
      url: `/pages/Manager/Modify/index?type_id=${type_id}&pro_id=${pro_id}&action=${action}`
    });
  };
  const handleAdd = async () => {
    if (!value) {
      return;
    }
    Taro.showLoading({
      title: '添加中',
    });
    setOpen(false);
    console.log('value: ', value);
    await productTypeCreate(value);
    Taro.showToast({
      title: "添加成功"
    });
    fetchTypesList()
  };
  useEffect(() => {
    fetchTypesList();
    fetchList(-1);
    getProductInfo(100, 1000);
  }, []);
  useEffect(() => {
    if (!open) {
      setValue("");
    }
  }, [open]);

  const ShoppingList = () => {
    if (shoppingList.length === 0) {
      return (
        <Empty>
          <Empty.Image src="network" />
          <Empty.Description>暂无数据</Empty.Description>
          {
            typeValue !== -2 ? 
            <Button shape="round" color="danger" style={{width: "160rpx", height: "80rpx",marginTop: "48rpx"}} onClick={() => {navigateTo(typeValue)}}>
              添加
            </Button> : null
          }
        </Empty>
      )
    }
    return <View style={{padding: "20rpx"}}>
      { shoppingList.map((item) => <ShoppingItem {...item} onClick={navigateTo} />)}
    </View>
  }

  return (
    <>
      <Tabs onTabClick={handleTabClick} value={typeValue}>
        {
          typesList.map(({type_name, type_id}) => <Tabs.TabPane value={type_id} title={type_id === -2 ? <><Plus /> {type_name}</> : type_name}>{ShoppingList()}</Tabs.TabPane>)
        }
      </Tabs>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>添加种类</Dialog.Header>
        <Dialog.Content>
          <Cell.Group inset>
            <Field label="名称">
              <Input placeholder="请输入名称" value={value} onChange={(e: any) => setValue(e.detail.value)} />
            </Field>
          </Cell.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={handleAdd}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </>
  )
}
