import { Icon } from '@react-ui/pc'

export function BasicDemo() {
  return (
    <>
      <Icon name="check" />
      <Icon name="close" />
      <Icon name="search" />
      <Icon name="info" />
      <Icon name="success" />
      <Icon name="warning" />
      <Icon name="error" />
      <Icon name="loading" />
      <Icon name="arrow-right" />
    </>
  )
}

export function SizeColorDemo() {
  return (
    <>
      <Icon name="success" size="20px" />
      <Icon name="success" size="32px" />
      <Icon name="success" size="48px" />
      <Icon name="success" size="32px" color="#07c160" />
      <Icon name="error" size="32px" color="#ee0a24" />
      <Icon name="warning" size="32px" color="#ff976a" />
    </>
  )
}

export function SpinDemo() {
  return (
    <>
      <Icon name="loading" size="32px" spin />
      <Icon name="loading" size="32px" color="#07c160" spin />
    </>
  )
}