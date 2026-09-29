import { describe, expect, it } from 'vitest'
import { act } from '@testing-library/react'
import { Toast } from '../src/toast'

describe('Toast', () => {
  it('命令式调用后挂载到 body', async () => {
    await act(async () => {
      Toast('hello')
    })
    expect(document.querySelectorAll('.rpc-toast__item').length).toBeGreaterThan(0)
  })

  it('clear 后清空所有提示', async () => {
    await act(async () => {
      Toast('a')
      Toast.success('b')
    })
    await act(async () => {
      Toast.clear()
    })
    expect(document.querySelectorAll('.rpc-toast__item').length).toBe(0)
  })
})