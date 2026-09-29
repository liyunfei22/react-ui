import type { ReactNode } from 'react'

export interface DialogProps {
  /** 是否显示 */
  open?: boolean
  /** 标题 */
  title?: ReactNode
  /** 宽度 */
  width?: string
  /** 是否显示右上角关闭按钮 */
  showClose?: boolean
  /** 是否显示确定按钮 */
  showConfirm?: boolean
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 确定按钮文字 */
  confirmText?: string
  /** 取消按钮文字 */
  cancelText?: string
  /** 点击遮罩是否关闭 */
  closeOnClickOverlay?: boolean
  /** 关闭回调 */
  onClose?: () => void
  /** 确定回调 */
  onConfirm?: () => void
  /** 取消回调 */
  onCancel?: () => void
  className?: string
  children?: ReactNode
}