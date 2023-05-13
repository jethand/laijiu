import { Timeline, Image, Button, Dialog, Cell, Form, Radio, Uploader } from "@taroify/core"
import { BaseEventOrig, FormProps, Input, Video, View } from "@tarojs/components"
import {PhotoOutlined, VideoOutlined } from "@taroify/icons"
import Taro from "@tarojs/taro"
import { useEffect, useRef, useState } from "react";
import { FormItemInstance } from "@taroify/core/form";

export default function Culture() {
  const itemRef = useRef<FormItemInstance>()
  const [cultureList, setCultureList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const fetchCultureList = async () => {
    const {data: { data}} = await Taro.request({ url: `http://112.74.189.230:8081/culture/list` })
    setCultureList(data);
  };

  useEffect(() => {
    fetchCultureList();
  }, []);
  const upload = async (path) => {
    const {data} = await Taro.uploadFile({
      url: "http://112.74.189.230:8081/assets/upload",
      filePath: path,
      name: "key"
    });
    const { data: {fileUrl}} = JSON.parse(data);
    return `http://112.74.189.230:8081/www/static/${fileUrl}`;
  };
  const onSubmit = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { title, type, res }: any = event.detail.value;
    Taro.showLoading({
      title: '正在上传资源',
    });
    const requestList = res.map(async (item: any) => await upload(item.url));
    const assets = await Promise.all(requestList)
    const {data} = await Taro.request(
      {
        url: `http://localhost:8361/culture/create`,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {
          title,
          type,
          images: assets,
          videos: assets
        }
    });
    if (data.data) {
      Taro.showToast({
        title: '操作成功',
      });
    } else {
      Taro.showToast({
        title: "操作失败",
      })
    }
    setOpen(false);
    fetchCultureList();
  };
  const onUpload = async () => {
    const { tempFiles } = await Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    });
    itemRef.current?.setValue([
      ...(itemRef.current?.getValue() ? [...itemRef.current?.getValue()] : []),
      {
        url: tempFiles[0].path,
        type: tempFiles[0].type,
        name: tempFiles[0].originalFileObj?.name,
      },
    ]);
    
  };
  const ImageItem = ({title, images}) => (
    <Timeline.Item>
        <Timeline.Content align="center">4.16</Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot>
            <PhotoOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content direction="column" align="start">
        <View>{title.slice(0,6) + '...'}</View>
        <View>
          {
            JSON.parse(images).map(({url}) => <Image src={url} style={{width:42,height:42}}/>)
          }
        </View>
        </Timeline.Content>
      </Timeline.Item>
  );
  const VideoItem = ({ title, videos}) => (
    <Timeline.Item>
        <Timeline.Content direction="column" align="end">
          <View>{title.slice(0,6) + '...'}</View>
          {
            JSON.parse(videos).map(({url}) => <Video src={url} style={{width:100,height:40}} controls={false} />)
          }
          
        </Timeline.Content>
        <Timeline.Separator>
          <Timeline.Connector />
          <Timeline.Dot>
            <VideoOutlined size="24" />
          </Timeline.Dot>
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content align="center">4.13</Timeline.Content>
      </Timeline.Item>
  )
  return (
    <>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Header>发布新动态</Dialog.Header>
        <Dialog.Content>
          <Form onSubmit={onSubmit}>
            <Cell.Group inset>
              <Form.Item name="title" rules={[{ required: true, message: "必填项" }]}>
                <Form.Label>标题</Form.Label>
                <Form.Control>
                  <Input placeholder="输入标题" />
                </Form.Control>
              </Form.Item>
              <Form.Item name="type" rules={[{ required: true, message: "必填项" }]}>
                <Form.Label>类型</Form.Label>
                <Form.Control>
                  <Radio.Group direction="vertical">
                    <Radio name={1}>图片</Radio>
                    <Radio name={2}>视频</Radio>
                  </Radio.Group>
                </Form.Control>
              </Form.Item>
              <Form.Item name={"res"} rules={[{ required: true, message: "必填项" }]} ref={itemRef}>
                <Form.Label>上传</Form.Label>
                <Form.Control>
                  <Uploader multiple maxFiles={9} onUpload={onUpload} />
                </Form.Control>
              </Form.Item>
            </Cell.Group>
            <View style={{ margin: "16px" }}>
              <Button shape="round" block color="primary" formType="submit">
                提交
              </Button>
            </View>
          </Form>
        </Dialog.Content>
      </Dialog>
      <Timeline>
        <Timeline.Item>
        <Timeline.Content align="center">现在</Timeline.Content>
        <Timeline.Content align="center"><Button onClick={() => {setOpen(true);}}>新增一条</Button></Timeline.Content>
        </Timeline.Item>
        {
          cultureList.map((item) => {
            if (item.type === 1) {
              return <ImageItem {...item}></ImageItem>
            } else if (item.type === 2) {
              return <VideoItem {...item}></VideoItem>
            }
            return null;
          })
        }
      </Timeline>
    </>
    
  )
}