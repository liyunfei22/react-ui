import { forwardRef } from 'react'
import type { ChangeEvent } from 'react'
import { createNamespace, useControllableState } from '@react-ui/shared'
import { Icon } from '../icon'
import type { InputProps } from './types'
import './input.css'

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    value,
    defaultValue = '',
    type = 'text',
    placeholder,
    disabled = false,
    readOnly = false,
    clearable = false,
    prefix,
    suffix,
    onChange,
    onClear,
    className,
    ...rest
  } = props

  const [val, setVal] = useControllableState(value, defaultValue)

  const ns = createNamespace('rpc-input')
  const classes = [ns.b(), ns.is('disabled', disabled), className].filter(Boolean).join(' ')

  const showClear = clearable && !!val && !disabled && !readOnly

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setVal(next)
    onChange?.(next, e)
  }

  const handleClear = () => {
    setVal('')
    onChange?.('')
    onClear?.()
  }

  return (
    <div className={classes}>
      {prefix != null && <span className="rpc-input__prefix">{prefix}</span>}
      <input
        ref={ref}
        className="rpc-input__inner"
        type={type}
        value={val}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={handleChange}
        {...rest}
      />
      {showClear && (
        <span className="rpc-input__clear" onClick={handleClear}>
          <Icon name="close" />
        </span>
      )}
      {suffix != null && <span className="rpc-input__suffix">{suffix}</span>}
    </div>
  )
})

Input.displayName = 'RpcInput'