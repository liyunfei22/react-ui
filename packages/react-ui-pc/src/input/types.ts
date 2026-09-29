import type { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix' | 'size'> {
  /** 受控值 */
  value?: string
  /** 非受控初始值 */
  defaultValue?: string
  /** 是否可一键清空 */
  clearable?: boolean
  /** 前缀内容 */
  prefix?: ReactNode
  /** 后缀内容 */
  suffix?: ReactNode
  /** 输入变化回调 */
  onChange?: (value: string, event?: ChangeEvent<HTMLInputElement>) => void
  /** 清空回调 */
  onClear?: () => void
}