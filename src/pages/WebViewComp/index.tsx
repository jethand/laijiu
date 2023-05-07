import { View, WebView } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { getCurrentInstance } from "@tarojs/taro";
import { useEffect } from "react";

export default function WebViewComponent () {
  const { router } = getCurrentInstance();
  const { url = '', title = '' } = router?.params || {};
  useEffect(() => {
    Taro.setNavigationBarTitle({ title });
  }, [])
  return (
    <View style={{height: "100%"}}>
      <WebView src={url}></WebView>
    </View>
  )
}
