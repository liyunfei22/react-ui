import { forwardRef } from 'react'
import type { MouseEvent } from 'react'
import { createNamespace } from '@react-ui/shared'
import { Icon } from '../icon'
import type { TagProps } from './types'
import './tag.css'

export const Tag = forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const { type = 'default', round = false, closable = false, onClose, className, children, ...rest } = props

  const ns = createNamespace('rh5-tag')
  const classes = [ns.b(), ns.m(type), ns.is('round', round), className].filter(Boolean).join(' ')

  const handleClose = (e: MouseEvent<HTMLSpanElement>) => onClose?.(e)

  return (
    <span ref={ref} className={classes} {...rest}>
      <span className="rh5-tag__content">{children}</span>
      {closable && (
        <span className="rh5-tag__close" onClick={handleClose}>
          <Icon name="close" />
        </span>
      )}
    </span>
  )
})

Tag.displayName = 'Rh5Tag'