import { forwardRef } from 'react'
import type { CSSProperties } from 'react'
import { createNamespace, useControllableState } from '@react-ui/shared'
import type { SwitchProps } from './types'
import './switch.css'

export const Switch = forwardRef<HTMLDivElement, SwitchProps>((props, ref) => {
  const {
    checked,
    defaultChecked = false,
    disabled = false,
    size = 'medium',
    activeColor,
    inactiveColor,
    onChange,
    className,
    ...rest
  } = props

  // 受控/非受控二合一：传 checked 即受控，否则用内部状态
  const [value, setValue] = useControllableState(checked, defaultChecked, onChange)

  const ns = createNamespace('rpc-switch')
  const classes = [ns.b(), ns.m(size), ns.is('checked', value), ns.is('disabled', disabled), className]
    .filter(Boolean)
    .join(' ')

  // 自定义颜色覆盖主题默认色
  const color = value ? activeColor : inactiveColor
  const style: CSSProperties | undefined = color ? { backgroundColor: color } : undefined

  const handleClick = () => {
    if (!disabled) setValue(!value)
  }

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      role="switch"
      aria-checked={value}
      onClick={handleClick}
      {...rest}
    >
      <div className="rpc-switch__thumb" />
    </div>
  )
})

Switch.displayName = 'RpcSwitch'