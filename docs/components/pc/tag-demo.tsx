import { useState } from 'react'
import { Tag } from '@react-ui/pc'

export function TypeDemo() {
  return (
    <>
      <Tag>默认标签</Tag>
      <Tag type="primary">主要</Tag>
      <Tag type="success">成功</Tag>
      <Tag type="warning">警告</Tag>
      <Tag type="danger">危险</Tag>
    </>
  )
}

export function ShapeDemo() {
  return (
    <>
      <Tag type="primary">直角标签</Tag>
      <Tag type="primary" round>
        圆角标签
      </Tag>
    </>
  )
}

export function ClosableDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <>
      {visible && (
        <Tag closable onClose={() => setVisible(false)}>
          点关闭图标移除
        </Tag>
      )}
      <Tag type="primary" closable round onClose={() => console.log('close')}>
        可关闭圆角标签
      </Tag>
    </>
  )
}