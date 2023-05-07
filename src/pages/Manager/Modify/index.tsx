

import { Button, Form, Input, Picker, Popup, SafeArea, Textarea, Uploader } from "@taroify/core";
import { FormItemInstance } from "@taroify/core/form";
import { BaseEventOrig, FormProps, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { getCurrentInstance } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";

export default function ProductModify () {
  const { router } = getCurrentInstance();
  const formRef = useRef<FormItemInstance>();
  const flavorRef = useRef<FormItemInstance>();
  const thumbnailRef = useRef<FormItemInstance>();
  const picListRef = useRef<FormItemInstance>();
  const [open, setOpen] = useState(false)
  const { type_id, pro_id, action } = router?.params || {};
  const isModidy = type_id && pro_id && action === 'modify';

  const getDetailInfo = async () => {
    Taro.showLoading({
      title: '加载中',
    });

    const {data: { data: infoData}} = await Taro.request({ url: `http://112.74.189.230:8081/product/info/${type_id}/${pro_id}` })
    const { data: { data: detailData} } = await Taro.request({ url: `http://112.74.189.230:8081/product/detail/${type_id}/${pro_id}` });
    Taro.hideLoading();
    if (!infoData || !detailData) {
      return;
    }
    const mergeData = {
      ...infoData,
      ...detailData,
      thumbnail: [{url: infoData.thumbnail}],
      pic_list: []
    };
    // @ts-ignore
    formRef.current?.setValues(mergeData)
  };
  useEffect(() => {
    if (isModidy) {
      getDetailInfo();
    }
    Taro.setNavigationBarTitle({ title: isModidy ? '编辑商品' : "新增商品" });
  }, []);
  const onSubmit = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const nextData = event.detail.value;
    Taro.showLoading({
      title: "正在提交数据..."
    });
    if (isModidy) {
      await Taro.request({ 
        url: `http://112.74.189.230:8081/product/info/update/${type_id}/${pro_id}`,
        header: {
          'content-type': 'application/json'
        },
        method: "PUT",
        data: {
          discount_price: Number(nextData?.discount_price),
          price: Number(nextData?.price),
          pro_name: nextData?.pro_name,
          tag: nextData?.tag,
          selling: 1
        }
      });
      await Taro.request({ 
        url: `http://112.74.189.230:8081/product/detail/update/${type_id}/${pro_id}`,
        header: {
          'content-type': 'application/json'
        },
        method: "PUT",
        data: {
          title: nextData?.title,
          subtitle: nextData?.subtitle,
          abv: Number(nextData?.abv),
          net_content: Number(nextData?.net_content),
          package_from: nextData?.package_from,
          pro_number: nextData?.pro_number,
          producer_area: nextData?.producer_area,
          shelf_life: nextData?.shelf_life,
          specifications: Number(nextData?.specifications),
          suitable_scene: nextData?.suitable_scene,
          flavor: nextData?.flavor,
        }
      });
      Taro.showToast({
        title: "更新成功"
      });
      
    } else {
      const { data: { data: createdProId}} = await Taro.request({ 
        url: `http://112.74.189.230:8081/product/info/create/${type_id}`,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {
          discount_price: Number(nextData?.discount_price),
          price: Number(nextData?.price),
          pro_name: nextData?.pro_name,
          tag: nextData?.tag,
          thumbnail: ""
        }
      });
      await Taro.request({ 
        url: `http://112.74.189.230:8081/product/detail/create/${type_id}/${createdProId}`,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {
          title: nextData?.title,
          subtitle: nextData?.subtitle,
          abv: nextData?.abv,
          net_content: nextData?.net_content,
          package_from: nextData?.package_from,
          pro_number: nextData?.pro_number,
          producer_area: nextData?.producer_area,
          shelf_life: nextData?.shelf_life,
          specifications: nextData?.specifications,
          suitable_scene: nextData?.suitable_scene,
          flavor: nextData?.flavor
        }
      });
      Taro.showToast({
        title: "添加成功"
      });
    }
    setTimeout(() => {
      Taro.navigateBack({delta: 1});
    }, 1000);
  }

  const onUpload = (ref: any) => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      ref.current?.setValue([
        {url: tempFiles[0].path}
      ]);
    });
  };
  const Title = ({name}) => <View style={{padding: "32rpx 20rpx",color: "rgba(69,90,100,.6)",fontSize: "34rpx"}}>{name}</View>;
  return (
    <View style={{width: "100%",backgroundColor: "#fafafa"}}>
      <Form onSubmit={onSubmit} validateTrigger={"onChange"} ref={formRef}>

        <Title name="基础信息" />
        <View style={{padding: "0rpx 20rpx"}}>
          <Form.Item name="discount_price" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>现价(单位:元)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入原价" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="price" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>原价(单位:元)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入现价" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="pro_name" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>产品名称</Form.Label>
            <Form.Control>
              <Input placeholder="例如:赖鼎2021 精装" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="tag" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>标签</Form.Label>
            <Form.Control>
              <Input placeholder="例如:高端,送礼" />
            </Form.Control>
          </Form.Item>
          
          <Form.Item name="thumbnail" rules={[{ required: false, message: "请上传缩略图标签" }]} ref={thumbnailRef}>
            <Form.Label>缩略图</Form.Label>
            <Form.Control>
              <Uploader onUpload={() => {onUpload(thumbnailRef)}} />
            </Form.Control>
          </Form.Item>
        </View>
        <Title name="详情信息" />
        <View style={{padding: "0rpx 20rpx"}}>
          <Form.Item name="title" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>详情页标题</Form.Label>
            <Form.Control>
              <Textarea autoHeight placeholder="请输入详情页标题" limit={50} />
            </Form.Control>
          </Form.Item>

          <Form.Item name="subtitle" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>详情页描述</Form.Label>
            <Form.Control>
              <Textarea autoHeight placeholder="请输入详情页描述" limit={100} />
            </Form.Control>
          </Form.Item>

          <Form.Item name="pic_list" rules={[{ required: false, message: "必填项" }]} ref={picListRef}>
            <Form.Label>图片列表</Form.Label>
            <Form.Control>
              <Uploader multiple onUpload={() => {onUpload(picListRef)}} />
            </Form.Control>
          </Form.Item>
        </View>
        <Title name="商品规格" />
        <View style={{padding: "0rpx 20rpx"}}>
          <Form.Item name="pro_number" rules={[{ required: true, message: "必填项" }]}>
            <Form.Label>商品编号</Form.Label>
            <Form.Control>
              <Input placeholder="请输入商品编号" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="net_content" rules={[{ required: true, message: "必填项" }]} defaultValue={500}>
            <Form.Label>单件净含量(单位:ml)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入单件净含量" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="specifications" rules={[{ required: true, message: "必填项" }]} defaultValue={1}>
            <Form.Label>包装规格(单位:瓶)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入包装规格" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="abv" rules={[{ required: true, message: "必填项" }]} defaultValue={53}>
            <Form.Label>酒精度(单位:%vol)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入酒精度" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="shelf_life" rules={[{ required: true, message: "必填项" }]} defaultValue={0}>
            <Form.Label>保质期(单位:年)</Form.Label>
            <Form.Control>
              <Input type="number" placeholder="请输入保质期" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="suitable_scene" rules={[{ required: true, message: "必填项" }]} defaultValue={"例如:约会,商务,送礼/礼品,婚宴,纪念日,聚会,自饮等"}>
            <Form.Label>适用场景</Form.Label>
            <Form.Control>
              <Textarea autoHeight placeholder="请输入适用场景" limit={50}/>
            </Form.Control>
          </Form.Item>

          <Form.Item name="flavor" rules={[{ required: true, message: "必填项" }]} ref={flavorRef} defaultValue={"酱香型"}>
            <Form.Label>香型</Form.Label>
            <Form.Control>
              <Input readonly placeholder="点击选择香型" onClick={() => setOpen(true)} />
            </Form.Control>
          </Form.Item>
          <Popup mountOnEnter={false} open={open} rounded placement="bottom" onClose={setOpen}>
          <Picker
            onCancel={() => setOpen(false)}
            onConfirm={(newValue) => {
              flavorRef.current?.setValue(newValue)
              setOpen(false);
            }}
          >
            <Picker.Toolbar>
              <Picker.Button>取消</Picker.Button>
              <Picker.Button>确认</Picker.Button>
            </Picker.Toolbar>
            <Picker.Column>
              <Picker.Option>浓香型</Picker.Option>
              <Picker.Option>酱香型</Picker.Option>
              <Picker.Option>清香型</Picker.Option>
            </Picker.Column>
          </Picker>
        </Popup>

          <Form.Item name="package_from" rules={[{ required: true, message: "请输入包装形式" }]} defaultValue={"光瓶装"}>
            <Form.Label>包装形式</Form.Label>
            <Form.Control>
              <Input placeholder="请输入包装形式" />
            </Form.Control>
          </Form.Item>

          <Form.Item name="producer_area" rules={[{ required: true, message: "请输入产地" }]} defaultValue={"贵州"}>
            <Form.Label>产地</Form.Label>
            <Form.Control>
              <Input placeholder="请输入产地" />
            </Form.Control>
          </Form.Item>
        </View>
        <View style={{ margin: "16px" }}>
          <Button shape="round" block color="primary" formType="submit">
            提交
          </Button>
        </View>
      </Form>
      
      <SafeArea position="bottom" />
    </View>
  )
}
