import type { CSSProperties } from 'react'
import { createNamespace } from '@react-ui/shared'
import { icons } from './icons'
import type { IconProps } from './types'
import './icon.css'

export function Icon(props: IconProps) {
  const { name, size = '1em', color, spin = false, className, style } = props

  const ns = createNamespace('rpc-icon')
  const iconStyle: CSSProperties = {
    fontSize: typeof size === 'number' ? `${size}px` : size,
    ...(color ? { color } : {}),
    ...style,
  }

  return (
    <i
      className={[ns.b(), ns.is('spin', spin), className].filter(Boolean).join(' ')}
      style={iconStyle}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
        {(icons[name] ?? []).map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
    </i>
  )
}

Icon.displayName = 'RpcIcon'