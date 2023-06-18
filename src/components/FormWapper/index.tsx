import { Form } from "@taroify/core"
import { forwardRef } from "react"

export default forwardRef((props: any, ref) => {
  return (
    <Form ref={ref} {...props}>
      {props.children}
    </Form>
  )
})
