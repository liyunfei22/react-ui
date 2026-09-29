import type { HTMLAttributes, MouseEvent } from 'react'

export type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** 标签风格 */
  type?: TagType
  /** 圆角标签 */
  round?: boolean
  /** 是否可关闭 */
  closable?: boolean
  /** 关闭时回调 */
  onClose?: (e: MouseEvent<HTMLSpanElement>) => void
}