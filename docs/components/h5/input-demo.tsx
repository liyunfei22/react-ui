import { useState } from 'react'
import { Input, Icon } from '@react-ui/h5'

export function BasicDemo() {
  return (
    <>
      <Input placeholder="请输入内容" />
      <Input placeholder="密码输入框" type="password" />
      <Input placeholder="数字输入框" type="number" />
    </>
  )
}

export function StateDemo() {
  return (
    <>
      <Input value="禁用状态" disabled />
      <Input value="只读状态" readOnly />
      <Input placeholder="可清空（输入后出现清空按钮）" clearable />
    </>
  )
}

export function PrefixSuffixDemo() {
  return (
    <>
      <Input prefix={<Icon name="search" />} placeholder="带前缀图标" />
      <Input suffix="元" placeholder="带后缀" />
      <Input prefix={<Icon name="info" />} suffix="%" placeholder="前后缀" />
    </>
  )
}

export function ControlledDemo() {
  const [value, setValue] = useState('')
  return (
    <>
      <Input value={value} onChange={(v) => setValue(v)} placeholder="受控输入" />
    </>
  )
}