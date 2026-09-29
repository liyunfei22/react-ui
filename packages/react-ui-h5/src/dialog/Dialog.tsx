import type { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { createNamespace } from '@react-ui/shared'
import { Icon } from '../icon'
import type { DialogProps } from './types'
import './dialog.css'

/**
 * 基于 createPortal 的弹窗：把 DOM 渲染到 body 下，避免被父级样式/overflow 影响。
 * 与 Vue 的 <Teleport> 等价。
 */
export function Dialog(props: DialogProps) {
  const {
    open = false,
    onClose,
    title,
    width = '420px',
    showClose = true,
    showConfirm = true,
    showCancel = true,
    confirmText = '确定',
    cancelText = '取消',
    closeOnClickOverlay = true,
    onConfirm,
    onCancel,
    className,
    children,
  } = props

  if (!open) return null

  const ns = createNamespace('rh5-dialog')

  // 只在整个 wrapper（遮罩）上命中时关闭，弹窗本身点击不触发
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOverlay && e.target === e.currentTarget) onClose?.()
  }

  return createPortal(
    <div className="rh5-dialog__wrapper" onClick={handleOverlayClick}>
      <div
        className={[ns.b(), className].filter(Boolean).join(' ')}
        style={{ width }}
        role="dialog"
        aria-modal="true"
      >
        <div className="rh5-dialog__header">
          <span className="rh5-dialog__title">{title}</span>
          {showClose && (
            <button className="rh5-dialog__close" onClick={onClose}>
              <Icon name="close" />
            </button>
          )}
        </div>
        <div className="rh5-dialog__body">{children}</div>
        {(showConfirm || showCancel) && (
          <div className="rh5-dialog__footer">
            {showCancel && (
              <button className="rh5-dialog__btn" onClick={onCancel}>
                {cancelText}
              </button>
            )}
            {showConfirm && (
              <button className="rh5-dialog__btn rh5-dialog__btn--primary" onClick={onConfirm}>
                {confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

Dialog.displayName = 'Rh5Dialog'