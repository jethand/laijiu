import { ActionSheet, Cell } from "@taroify/core"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { ChatOutlined, PhoneCircleOutlined, Arrow } from "@taroify/icons"
import { useState } from "react"

export default function Contact () {
  const [open, setOpen] = useState(false)
  const onCopy = () => {
    Taro.setClipboardData({
      data: "JGWBJ999"
    });
  }
  const onPhone = () => {
    setOpen(true);
  };
  const onSelect = (event: any) => {
    setOpen(false);
    Taro.makePhoneCall({
      phoneNumber: event.value
    });
  };
  return (
    <View style={{width: "100%", height: '100%'}}>
      <Cell.Group title="点击复制">
        <Cell title="微信号" onClick={onCopy} icon={<ChatOutlined />}>JGWBJ999</Cell>
        <Cell title="手机号" icon={<PhoneCircleOutlined />} rightIcon={<Arrow />} onClick={onPhone}></Cell>
      </Cell.Group>
      <ActionSheet open={open} onSelect={onSelect} onClose={setOpen} onCancel={() => setOpen(false)}>
        <ActionSheet.Action value="13901104018" name="13901104018(王)" />
        <ActionSheet.Action value="13911573328" name="13911573328(郑)" />
        <ActionSheet.Button type="cancel">取消</ActionSheet.Button>
      </ActionSheet>
    </View>
  )
}
