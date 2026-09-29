import { useState } from 'react'
import { Loading, Switch } from '@react-ui/pc'

export function StandaloneDemo() {
  return (
    <>
      <Loading />
      <Loading text="加载中..." />
    </>
  )
}

export function WrapDemo() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span>切换加载状态：</span>
        <Switch checked={loading} onChange={setLoading} />
      </div>
      <Loading loading={loading} text="加载中...">
        <div
          style={{
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ececec',
            borderRadius: '4px',
            color: '#969799',
          }}
        >
          这里是包裹的内容
        </div>
      </Loading>
    </>
  )
}