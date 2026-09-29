import { createNamespace } from '@react-ui/shared'
import type { LoadingProps } from './types'
import './loading.css'

export function Loading(props: LoadingProps) {
  const { loading = true, text = '', children, className, ...rest } = props

  const ns = createNamespace('rh5-loading')
  const standalone = children == null
  const classes = [ns.b(), standalone ? 'is-fullscreen' : '', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children != null && <div className="rh5-loading__content">{children}</div>}
      {loading && (
        <div className="rh5-loading__overlay">
          <div className="rh5-loading__spinner">
            <i className="rh5-loading__icon" />
            {text && <span className="rh5-loading__text">{text}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

Loading.displayName = 'Rh5Loading'