import { createNamespace } from '@react-ui/shared'
import type { LoadingProps } from './types'
import './loading.css'

export function Loading(props: LoadingProps) {
  const { loading = true, text = '', children, className, ...rest } = props

  const ns = createNamespace('rpc-loading')
  const standalone = children == null
  const classes = [ns.b(), standalone ? 'is-fullscreen' : '', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      {children != null && <div className="rpc-loading__content">{children}</div>}
      {loading && (
        <div className="rpc-loading__overlay">
          <div className="rpc-loading__spinner">
            <i className="rpc-loading__icon" />
            {text && <span className="rpc-loading__text">{text}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

Loading.displayName = 'RpcLoading'