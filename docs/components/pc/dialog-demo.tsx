import { useState } from 'react'
import { Button, Dialog, Toast, confirm } from '@react-ui/pc'

export function BasicDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开弹窗
      </Button>
      <Dialog
        open={open}
        title="标题"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        这是弹窗内容
      </Dialog>
    </>
  )
}

export function ButtonDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        自定义按钮
      </Button>
      <Dialog
        open={open}
        title="自定义按钮"
        showClose={false}
        showCancel={false}
        confirmText="知道了"
        width="360px"
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
      >
        只有确定按钮的弹窗
      </Dialog>
    </>
  )
}

export function ConfirmDemo() {
  return (
    <Button
      type="primary"
      onClick={async () => {
        const ok = await confirm({
          title: '确认',
          message: '确定要执行该操作吗？',
          confirmText: '确定',
          cancelText: '取消',
        })
        if (ok) Toast.success('已确认')
        else Toast('已取消')
      }}
    >
      命令式确认
    </Button>
  )
}