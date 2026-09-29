import { useState } from 'react'
import { Switch, Toast } from '@react-ui/pc'

export function BasicDemo() {
  return (
    <>
      <Switch />
      <Switch defaultChecked />
    </>
  )
}

export function SizeDemo() {
  return (
    <>
      <Switch size="small" defaultChecked />
      <Switch size="medium" defaultChecked />
      <Switch size="large" defaultChecked />
    </>
  )
}

export function ColorDemo() {
  return (
    <>
      <Switch activeColor="#07c160" defaultChecked />
      <Switch inactiveColor="#ee0a24" />
    </>
  )
}

export function ControlledDemo() {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Switch
        checked={checked}
        onChange={(v) => {
          setChecked(v)
          Toast.success(v ? '已开启' : '已关闭')
        }}
      />
      <Switch disabled />
      <Switch disabled checked />
    </>
  )
}