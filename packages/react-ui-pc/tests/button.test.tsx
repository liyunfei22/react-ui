import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/button'

describe('Button', () => {
  it('渲染内容', () => {
    render(<Button>确定</Button>)
    expect(screen.getByText('确定')).toBeTruthy()
  })

  it('type 生成对应修饰类', () => {
    const { container } = render(<Button type="primary">确定</Button>)
    expect((container.firstChild as HTMLElement).className).toContain('rpc-button--primary')
  })

  it('点击触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>确定</Button>)
    fireEvent.click(screen.getByText('确定'))
    expect(onClick).toHaveBeenCalled()
  })
})