import type { ButtonHTMLAttributes } from 'react'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮风格 */
  type?: ButtonType
  /** 尺寸 */
  size?: ButtonSize
  /** 是否展示加载中 */
  loading?: boolean
  /** 圆角按钮 */
  round?: boolean
  /** 块级按钮（占满一行） */
  block?: boolean
  /** 朴素按钮（浅色描边） */
  plain?: boolean
}