import type { CSSProperties } from 'react'

export type IconName =
  | 'check'
  | 'close'
  | 'search'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'loading'
  | 'arrow-right'

export interface IconProps {
  /** 图标名（内置 SVG 图标集） */
  name: IconName
  /** 尺寸：number 为 px，string 可传 em/px 等 */
  size?: number | string
  /** 颜色，默认继承 currentColor */
  color?: string
  /** 是否旋转（用于 loading） */
  spin?: boolean
  className?: string
  style?: CSSProperties
}