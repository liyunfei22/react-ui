import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from '../src/loading'

describe('Loading', () => {
  it('loading 时显示遮罩与文案', () => {
    const { container } = render(<Loading loading text="加载中" />)
    expect(container.querySelector('.rpc-loading__overlay')).toBeTruthy()
    expect(screen.getByText('加载中')).toBeTruthy()
  })

  it('非 loading 时不显示遮罩', () => {
    const { container } = render(<Loading loading={false} text="加载中" />)
    expect(container.querySelector('.rpc-loading__overlay')).toBeNull()
  })
})