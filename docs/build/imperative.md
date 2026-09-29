# 04 · 函数式组件挂载（Toast / Dialog）

Button、Input 这类「声明式组件」写在 JSX 里即可。但 Toast、`Dialog.confirm` 这类要 **命令式调用**（`Toast.success('提示')`）的组件，没有 JSX 可写——它们靠**运行时动态挂载**实现。这是组件库最有含金量的一环。

## 核心思想：手动创建一个根实例挂到 body

无论 Vue 还是 React，都遵循同一条路线：

```
创建容器 div → append 到 body → 把组件渲染进去 → 定时/手动卸载
```

### React 版（createRoot）

`packages/react-ui-pc/src/toast/toast.tsx` 的实现：

```tsx
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { ToastItem } from './ToastItem'

let messages: ToastMessage[] = []
let root: Root | null = null
let container: HTMLElement | null = null
let seed = 0

function ensureContainer(position: ToastPosition) {
  if (!container) {
    container = document.createElement('div')
    container.className = 'rpc-toast-container'
    document.body.appendChild(container)
  }
  container.dataset.position = position
  if (!root) root = createRoot(container)
}

function renderMessages() {
  root?.render(<ToastItem messages={messages} />)
}

function show(options: string | ToastOptions): number {
  const { message, type = 'info', duration = 2000, position = 'middle' } = normalize(options)
  ensureContainer(position)
  const id = ++seed
  messages.push({ id, message, type })
  renderMessages()
  if (duration > 0) {
    setTimeout(() => {
      messages = messages.filter((m) => m.id !== id)
      renderMessages()
    }, duration)
  }
  return id
}
```

关键设计：

1. **共享单例**：所有 toast 共用一个容器和一个 `root`，用模块级数组驱动渲染，而不是「每条消息一个 root」（那会造成 DOM 碎片与性能浪费）。
2. **React 没有响应式**：Vue 的 `reactive` 数组 push/splice 会自动重渲染；React 里 `messages` 只是个普通数组，`push` 后必须**手动 `root.render()`** 才能刷新 UI——命令式 API 每次变更数据后都要再渲染一遍。

对比总结（也是学习价值所在）：

| | Vue | React |
|---|---|---|
| 挂载 | `createApp().mount()` | `createRoot().render()` |
| 更新 | 响应式数组自动更新 | 手动 `root.render()` 重渲染 |
| 卸载 | `app.unmount()` | `root.unmount()` |

## 弹窗类组件的额外两件事

`Dialog` / `Dialog.confirm` 除了挂载，还要处理：

1. **渲染到 body 顶层**：避免被父容器 `overflow: hidden` / `transform` 裁剪。Vue 用 `<Teleport to="body">`，React 用 `createPortal(component, document.body)`——两者等价。见 `packages/react-ui-pc/src/dialog/Dialog.tsx`：

```tsx
if (!open) return null
return createPortal(
  <div className="rpc-dialog__wrapper">{/* 遮罩 + 弹窗内容 */}</div>,
  document.body,
)
```

2. **关闭后的销毁**：`Dialog.confirm` 是「每次调用一个独立实例」，返回 Promise。确认/取消后要卸载并移除容器，否则内存泄漏。见 `confirm.tsx`：

```tsx
function confirm(options: ConfirmOptions | string): Promise<boolean> {
  return new Promise((resolve) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    let settled = false

    const finish = (result: boolean) => {
      if (settled) return
      settled = true
      resolve(result)
      setTimeout(() => {       // 延迟到下一拍再卸载，避免在点击事件处理中同步 unmount
        root.unmount()
        container.remove()
      })
    }

    root.render(
      <Dialog open onConfirm={() => finish(true)} onCancel={() => finish(false)} onClose={() => finish(false)}>
        {opts.message}
      </Dialog>,
    )
  })
}
```

这里 `finish` 里的 `settled` 防重入守卫很重要：用户点「确定」可能同时触发 `onConfirm` 和 `onClose`（组件内部 confirm 后也 close），两次回调都要 resolve。加 `if (settled) return` 能保证 Promise 只 resolve 一次——这是命令式弹窗最容易踩的坑。

React 与 Vue 在此的两处差异：

- **受控开关改用 `open` + 回调**：React 的 Dialog 用 `open` prop 控制显隐（无 `v-model`），`confirm` 里直接 `<Dialog open ...>` 恒显，关闭靠 `onClose` 回调驱动 `finish`；Vue 版则内聚为 `v-model`。
- **退场动画**：React 版没内置退出动画（生产可引入 `react-transition-group` / `framer-motion`），所以 `setTimeout` 卸载只是「下一拍」，不含动画时长；Vue 版通常配 `<Transition>` 等待 `200ms` 动画结束。

## 小结

函数式组件的本质是「**把声明式组件包装成命令式 API**」：命令式 API 只负责管理容器生命周期与数据，真正的 UI 仍由普通的声明式组件（`ToastItem`、`Dialog`）渲染。这套模式在 antd 的 `message.xxx` / `Modal.confirm`、antd-mobile 的 `Toast.show` / `Dialog.confirm` 中一脉相承，二者都是 `createRoot` 动态挂载。