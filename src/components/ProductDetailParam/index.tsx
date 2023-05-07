import { Cell, Field, Form, Input } from "@taroify/core";
export default function ProductDetailParam (props: any) {
  const { data } = props;
  const FieldItem = ({title, value}) => (
    <Field
      name="text"
      label={{ align: "left", children: title }}
    >
      <Input placeholder={value} readonly/>
    </Field>
  );

  const mockData = [
    { title: "商品编号", value: data.pro_number },
    { title: "单件净含量", value: `${data.net_content}ml` },
    { title: "包装规格", value: `${data.specifications}瓶` },
    { title: "酒精度", value: `${data.abv}%vol` },
    { title: "保质期", value: Number(data.shelf_life) === 0 ? '长期保存': data.shelf_life + '年' },
    { title: "适应场景", value: data.suitable_scene },
    { title: "香型", value: data.flavor || '酱香型' },
    { title: "酒精度", value: "50度及以上" },
    { title: "包装形式", value: data.package_from },
    { title: "产地", value: data.producer_area },
  ];
  return (
    <Form>
      <Cell.Group inset>
        {
          mockData.map((item) => <FieldItem {...item} />)
        }
      </Cell.Group>
    </Form>
  )
}
