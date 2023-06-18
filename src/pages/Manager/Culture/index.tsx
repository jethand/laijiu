import { Timeline, Image, Button, Dialog, Cell, Form, Radio, Uploader, Textarea, ConfigProvider } from "@taroify/core"
import { BaseEventOrig, FormProps, Video, View } from "@tarojs/components"
import {PhotoOutlined, VideoOutlined } from "@taroify/icons"
import Taro from "@tarojs/taro"
import { useEffect, useRef, useState } from "react";
import { FormItemInstance } from "@taroify/core/form";

export default function Culture() {
  const itemRef = useRef<FormItemInstance>();
  const formRef =useRef<FormItemInstance>();
  const [cultureList, setCultureList] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number|null>(null);
  const [defaultValues, setDefaultValues] = useState<any>({});
  const fetchCultureList = async () => {
    const {data: { data}} = await Taro.request({ url: `https://112.74.189.230/api/culture/list` })
    setCultureList(data);
  };

  useEffect(() => {
    fetchCultureList();
  }, []);
  const upload = async (path) => {
    const {data} = await Taro.uploadFile({
      url: "https://112.74.189.230/api/assets/upload",
      filePath: path,
      name: "key"
    });
    const { data: {fileUrl}} = JSON.parse(data);
    return `https://112.74.189.230/api/www/static/${fileUrl}`;
  };
  const onSubmit = async (event: BaseEventOrig<FormProps.onSubmitEventDetail>) => {
    const { title, type, res }: any = event.detail.value;
    Taro.showLoading({
      title: '正在上传资源',
    });
    const waitUploadList = res.filter((item: any) => item.from === "upload");
    let nextAssets = res.filter((item: any) => item.from === undefined);
    if (waitUploadList.length) {
      const requestList = waitUploadList.map(async (item: any) => await upload(item.url));
      const assets = await Promise.all(requestList);
      nextAssets = nextAssets.concat(assets.map((url) => ({url})));
    }

    const url = activeId === null ? "culture/create" : `culture/update/${activeId}`;
    const {data} = await Taro.request(
      {
        url: `https://112.74.189.230/${url}`,
        header: {
          'content-type': 'application/json'
        },
        method: "POST",
        data: {
          title,
          type,
          images: type === 1 ? nextAssets : [],
          videos: type === 2 ? nextAssets : []
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
        from: "upload"
      },
    ]);
    const {data} = await Taro.uploadFile({
      url: "https://112.74.189.230/assets/upload",
      filePath: tempFiles[0].path,
      name: "key"
    });
  };
  const onEdit = (id: number|null) => {
    const target = cultureList.find((item) => item.id === id);
    if (id !== null && !id) {
      return;
    }
    setDefaultValues(id === null ? {} : {...target, res: JSON.parse(target.images || target.videos)})
    setOpen(true);
    setActiveId(id);
  };
  const ImageItem = ({title, images, onClick}) => (
    <Timeline.Item onClick={onClick}>
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
            JSON.parse(images).map(({url}) => <Image src={url} style={{width:42,height:42}} mode="aspectFit" />)
          }
        </View>
        </Timeline.Content>
      </Timeline.Item>
  );
  const VideoItem = ({ title, videos, onClick}) => (
    <Timeline.Item onClick={onClick}>
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
    {
      open ?(
        <Dialog open={open} onClose={setOpen}>
          <Dialog.Header>{activeId === null ? "发布新动态" : "编辑动态"}</Dialog.Header>
          <Dialog.Content>
          <ConfigProvider
            theme={{
              formLabelWidth: "32px",
            }}
          >
            <Form onSubmit={onSubmit} ref={formRef} defaultValues={defaultValues}>
              <Cell.Group inset>
                <Form.Item name="title" rules={[{ required: true, message: "必填项" }]}>
                  <Form.Label>标题</Form.Label>
                  <Form.Control>
                    <Textarea style={{ height: "68px" }} limit={200} placeholder="请输入标题" />
                  </Form.Control>
                </Form.Item>
                <Form.Item name="type" rules={[{ required: true, message: "必填项" }]}>
                  <Form.Label>类型</Form.Label>
                  <Form.Control>
                    <Radio.Group direction="horizontal">
                      <Radio name={1}>图片</Radio>
                      <Radio name={2}>视频</Radio>
                    </Radio.Group>
                  </Form.Control>
                </Form.Item>
                <Form.Item name={"res"} rules={[{ required: activeId  === null ?  true : false, message: "必填项" }]} ref={itemRef}>
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
          </ConfigProvider>
          </Dialog.Content>
        </Dialog>
      ) : null
    }
      
      <Timeline>
        <Timeline.Item>
        <Timeline.Content align="center">现在</Timeline.Content>
        <Timeline.Content align="center"><Button onClick={() => {onEdit(null)}}>新增一条</Button></Timeline.Content>
        </Timeline.Item>
        {
          cultureList.map((item) => {
            if (item.type === 1) {
              return <ImageItem {...item} onClick={() => {onEdit(item.id)}}></ImageItem>
            } else if (item.type === 2) {
              return <VideoItem {...item} onClick={() => {onEdit(item.id)}}></VideoItem>
            }
            return null;
          })
        }
      </Timeline>
    </>
    
  )
}