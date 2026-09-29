import { Icon } from '../icon'
import type { IconName } from '../icon'
import type { ToastMessage } from './toast'

const iconMap: Record<ToastMessage['type'], IconName> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  loading: 'loading',
}

const spinMap: Record<ToastMessage['type'], boolean> = {
  info: false,
  success: false,
  warning: false,
  error: false,
  loading: true,
}

export function ToastItem({ messages }: { messages: ToastMessage[] }) {
  return (
    <div className="rpc-toast">
      {messages.map((m) => (
        <div key={m.id} className={`rpc-toast__item rpc-toast__item--${m.type}`}>
          <Icon name={iconMap[m.type]} spin={spinMap[m.type]} />
          <span>{m.message}</span>
        </div>
      ))}
    </div>
  )
}