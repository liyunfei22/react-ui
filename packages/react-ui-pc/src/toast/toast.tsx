import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { ToastItem } from './ToastItem'

export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading'
export type ToastPosition = 'top' | 'middle' | 'bottom'

export interface ToastMessage {
  id: number
  message: string
  type: ToastType
}

export interface ToastOptions {
  message: string
  type?: ToastType
  /** 展示时长（ms），0 表示常驻直到 clear() */
  duration?: number
  position?: ToastPosition
}

/**
 * 命令式 Toast（React 18 版）。
 * 关键差异：Vue 用 reactive 数组自动驱动渲染，React 没有响应式，
 * 这里用「模块级消息数组 + 每次变更后手动 root.render()」的方式刷新。
 * 所有 toast 共享一个挂载点与一个 root。
 */
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

  if (!root) {
    root = createRoot(container)
  }
}

function renderMessages() {
  root?.render(<ToastItem messages={messages} />)
}

function show(options: string | ToastOptions): number {
  const opts: ToastOptions = typeof options === 'string' ? { message: options } : options
  const { message, type = 'info', duration = 2000, position = 'middle' } = opts

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

export interface ToastStatic {
  (options: string | ToastOptions): number
  info: (options: string | Omit<ToastOptions, 'type'>) => number
  success: (options: string | Omit<ToastOptions, 'type'>) => number
  warning: (options: string | Omit<ToastOptions, 'type'>) => number
  error: (options: string | Omit<ToastOptions, 'type'>) => number
  loading: (options: string | Omit<ToastOptions, 'type'>) => number
  clear: () => void
}

export const Toast = show as ToastStatic

Toast.info = (o) =>
  show(typeof o === 'string' ? { message: o, type: 'info' } : { ...o, type: 'info' })
Toast.success = (o) =>
  show(typeof o === 'string' ? { message: o, type: 'success' } : { ...o, type: 'success' })
Toast.warning = (o) =>
  show(typeof o === 'string' ? { message: o, type: 'warning' } : { ...o, type: 'warning' })
Toast.error = (o) =>
  show(typeof o === 'string' ? { message: o, type: 'error' } : { ...o, type: 'error' })
Toast.loading = (o) =>
  show(typeof o === 'string' ? { message: o, type: 'loading', duration: 0 } : { ...o, type: 'loading', duration: 0 })
Toast.clear = () => {
  messages = []
  renderMessages()
}