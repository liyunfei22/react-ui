import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Dialog } from '../src/dialog'

describe('Dialog', () => {
  it('open 时渲染（portal 到 body）', () => {
    render(
      <Dialog open title="提示">
        内容
      </Dialog>,
    )
    expect(screen.getByText('内容')).toBeTruthy()
    expect(screen.getByText('提示')).toBeTruthy()
  })

  it('open 为 false 时不渲染', () => {
    render(<Dialog open={false}>内容</Dialog>)
    expect(screen.queryByText('内容')).toBeNull()
  })

  it('点击确定触发 onConfirm 与 onClose', () => {
    const onConfirm = vi.fn()
    render(
      <Dialog open title="提示" showCancel={false} onConfirm={onConfirm}>
        内容
      </Dialog>,
    )
    fireEvent.click(screen.getByText('确定'))
    expect(onConfirm).toHaveBeenCalled()
  })
})