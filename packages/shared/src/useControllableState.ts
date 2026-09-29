import { useState } from 'react'

/**
 * 受控 / 非受控二合一的状态 hook（React 组件库的通用模式）。
 *
 * - 传入 `controlled` 即为受控：值由外部决定，变化通过 onChange 通知外部；
 * - 不传则为非受控：内部自己维护状态。
 *
 * 用法：
 *   const [value, setValue] = useControllableState(checked, defaultChecked, onChange)
 */
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue)
  const isControlled = controlled !== undefined
  const value = (isControlled ? controlled : uncontrolled) as T

  const setValue = (next: T) => {
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
  }

  return [value, setValue] as const
}