import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Switch } from '../src/switch'

describe('Switch', () => {
  it('点击切换并触发 onChange', () => {
    const onChange = vi.fn()
    const { container } = render(<Switch defaultChecked={false} onChange={onChange} />)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('禁用时不触发 onChange', () => {
    const onChange = vi.fn()
    const { container } = render(<Switch defaultChecked={false} disabled onChange={onChange} />)
    fireEvent.click(container.firstChild as HTMLElement)
    expect(onChange).not.toHaveBeenCalled()
  })
})