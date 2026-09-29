import { describe, expect, it, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Input } from '../src/input'

describe('Input', () => {
  it('输入触发 onChange', () => {
    const onChange = vi.fn()
    const { container } = render(<Input defaultValue="" onChange={onChange} />)
    fireEvent.change(container.querySelector('input')!, { target: { value: 'abc' } })
    expect(onChange).toHaveBeenCalledWith('abc', expect.anything())
  })

  it('clearable 时点击清空按钮', () => {
    const onChange = vi.fn()
    const { container } = render(<Input value="内容" clearable onChange={onChange} />)
    fireEvent.click(container.querySelector('.rh5-input__clear')!)
    expect(onChange).toHaveBeenCalledWith('')
  })
})