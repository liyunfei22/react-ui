import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tag } from '../src/tag'

describe('Tag', () => {
  it('渲染内容与类型', () => {
    const { container } = render(<Tag type="primary">标签</Tag>)
    expect(screen.getByText('标签')).toBeTruthy()
    expect((container.firstChild as HTMLElement).className).toContain('rpc-tag--primary')
  })

  it('closable 时点击关闭触发 onClose', () => {
    const onClose = vi.fn()
    render(
      <Tag closable onClose={onClose}>
        标签
      </Tag>,
    )
    const close = document.querySelector('.rpc-tag__close') as HTMLElement
    fireEvent.click(close)
    expect(onClose).toHaveBeenCalled()
  })
})