import { forwardRef } from 'react'
import { createNamespace } from '@react-ui/shared'
import type { ButtonProps } from './types'
import './button.css'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    round = false,
    block = false,
    plain = false,
    className,
    children,
    ...rest
  } = props

  const ns = createNamespace('rpc-button')
  const classes = [
    ns.b(),
    ns.m(type),
    ns.m(size),
    ns.is('disabled', disabled),
    ns.is('loading', loading),
    ns.is('round', round),
    ns.is('block', block),
    ns.is('plain', plain),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type="button" className={classes} disabled={disabled || loading} {...rest}>
      {loading && <i className="rpc-button__loading" />}
      {children != null && <span className="rpc-button__content">{children}</span>}
    </button>
  )
})

Button.displayName = 'RpcButton'