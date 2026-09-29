import { createRoot } from 'react-dom/client'
import { Dialog } from './Dialog'

export interface ConfirmOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  width?: string
}

/**
 * 命令式确认框：resolve(true) 表示确定，resolve(false) 表示取消/关闭。
 *
 * 与 Vue 版的一个差异：React 的 Dialog 用 `open` 控制（无 v-model），
 * 且没有内置退出动画（生产可引入 framer-motion / react-transition-group）。
 * 这里在关闭后下一拍卸载 root 并移除容器，避免内存泄漏。
 */
export function confirm(options: ConfirmOptions | string): Promise<boolean> {
  const opts = typeof options === 'string' ? { message: options } : options

  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    let settled = false

    const finish = (result: boolean) => {
      if (settled) return
      settled = true
      resolve(result)
      // 延迟到下一拍再卸载，避免在点击事件处理中同步 unmount
      setTimeout(() => {
        root.unmount()
        container.remove()
      })
    }

    root.render(
      <Dialog
        open
        title={opts.title}
        width={opts.width}
        showClose={false}
        confirmText={opts.confirmText ?? '确定'}
        cancelText={opts.cancelText ?? '取消'}
        onClose={() => finish(false)}
        onConfirm={() => finish(true)}
        onCancel={() => finish(false)}
      >
        <div className="rpc-dialog__message">{opts.message}</div>
      </Dialog>,
    )
  })
}