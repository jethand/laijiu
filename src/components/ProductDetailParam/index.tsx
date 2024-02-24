import { Cell, Field, Form, Input } from "@taroify/core";

export default function ProductDetailParam (props: any) {
  const { data } = props;
  const FieldItem = ({title, value}) => (
    <Field
      name='text'
      label={{ align: "left", children: title }}
    >
      <Input placeholder={value} readonly />
    </Field>
  );

  const config = [
    { title: "单件净含量", value: `${data.net_content}ml` },
    { title: "包装规格", value: `${data.specifications}瓶/箱` },
    { title: "酒精度", value: `${data.abv}%vol` },
    { title: "保质期", value: data.shelf_life },
    { title: "适应场景", value: data.suitable_scene },
    { title: "香型", value: data.flavor || '酱香型' },
    { title: "包装形式", value: data.package_from },
    { title: "产地", value: data.producer_area },
  ];
  return (
    <Form>
      <Cell.Group inset>
        {
          config.map((item: any, index: number) => <FieldItem key={index} {...item} />)
        }
      </Cell.Group>
    </Form>
  )
}
