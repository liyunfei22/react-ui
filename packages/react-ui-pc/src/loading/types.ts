import type { HTMLAttributes, ReactNode } from 'react'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  /** 是否加载中 */
  loading?: boolean
  /** 加载文案 */
  text?: string
  children?: ReactNode
}