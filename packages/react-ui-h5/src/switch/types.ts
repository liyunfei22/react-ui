import type { HTMLAttributes } from 'react'

export type SwitchSize = 'small' | 'medium' | 'large'

export interface SwitchProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 受控：是否打开 */
  checked?: boolean
  /** 非受控：初始是否打开 */
  defaultChecked?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 尺寸 */
  size?: SwitchSize
  /** 打开时的颜色 */
  activeColor?: string
  /** 关闭时的颜色 */
  inactiveColor?: string
  /** 值变化回调 */
  onChange?: (checked: boolean) => void
}