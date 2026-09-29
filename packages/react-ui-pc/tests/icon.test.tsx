import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Icon } from '../src/icon'

describe('Icon', () => {
  it('渲染图标与 svg', () => {
    const { container } = render(<Icon name="check" />)
    expect(container.querySelector('svg')).toBeTruthy()
    expect((container.firstChild as HTMLElement).className).toContain('rpc-icon')
  })

  it('spin 生成旋转修饰类', () => {
    const { container } = render(<Icon name="loading" spin />)
    expect((container.firstChild as HTMLElement).className).toContain('rpc-icon--spin')
  })
})