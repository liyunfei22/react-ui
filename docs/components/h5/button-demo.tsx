import { Button, Toast } from '@react-ui/h5'

export function TypeDemo() {
  return (
    <>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </>
  )
}

export function SizeDemo() {
  return (
    <>
      <Button size="small">小按钮</Button>
      <Button size="medium">中按钮</Button>
      <Button size="large">大按钮</Button>
    </>
  )
}

export function StateDemo() {
  return (
    <>
      <Button disabled>禁用</Button>
      <Button type="primary" loading>
        加载中
      </Button>
    </>
  )
}

export function ShapeDemo() {
  return (
    <>
      <Button round>圆角按钮</Button>
      <Button plain>朴素按钮</Button>
      <Button block>块级按钮（占满一行）</Button>
    </>
  )
}

export function ClickDemo() {
  return (
    <Button type="primary" onClick={() => Toast.success('点击了按钮')}>
      点我
    </Button>
  )
}