import { Button, Toast } from '@react-ui/h5'

export function BasicDemo() {
  return (
    <>
      <Button onClick={() => Toast('提示信息')}>文字提示</Button>
      <Button type="primary" onClick={() => Toast({ message: '自定义时长', duration: 3000 })}>
        3 秒提示
      </Button>
    </>
  )
}

export function TypeDemo() {
  return (
    <>
      <Button onClick={() => Toast.info('信息提示')}>信息</Button>
      <Button type="primary" onClick={() => Toast.success('操作成功')}>
        成功
      </Button>
      <Button type="warning" onClick={() => Toast.warning('警告提示')}>
        警告
      </Button>
      <Button type="danger" onClick={() => Toast.error('错误提示')}>
        错误
      </Button>
    </>
  )
}

export function LoadingDemo() {
  return (
    <>
      <Button
        onClick={() => {
          Toast.loading('加载中...')
          setTimeout(() => Toast.clear(), 3000)
        }}
      >
        显示加载
      </Button>
      <Button onClick={() => Toast.clear()}>立即关闭</Button>
    </>
  )
}

export function PositionDemo() {
  return (
    <>
      <Button onClick={() => Toast({ message: '顶部提示', position: 'top' })}>顶部</Button>
      <Button onClick={() => Toast({ message: '中间提示', position: 'middle' })}>中间</Button>
      <Button onClick={() => Toast({ message: '底部提示', position: 'bottom' })}>底部</Button>
    </>
  )
}