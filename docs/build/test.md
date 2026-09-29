# 07 · 组件测试

组件库是给成千上万人复用的基础设施，测试比普通业务代码更重要。本项目统一用 **Vitest**（快、与 Vite 同源、配置零成本）。

## 环境准备

- Vue：`@vue/test-utils`（官方测试工具）
- React：`@testing-library/react` + jsdom

在包根目录放 `vitest.config.ts`：

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',   // 模拟 DOM
    globals: true,          // 免 import describe/it/expect
  },
})
```

`package.json` 的脚本：`"test": "vitest run"`。

## 测试策略

每个组件至少两类用例：

1. **smoke（渲染冒烟）**：能挂载、能渲染出正确类名与内容。
2. **关键交互**：可点击的事件、受控组件的状态变化、显隐切换。

## React 示例（@testing-library/react）

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/button'

describe('Button', () => {
  it('渲染默认按钮及其内容', () => {
    render(<Button>确定</Button>)
    const btn = screen.getByRole('button', { name: '确定' })
    expect(btn).toBeTruthy()
    expect(btn.className).toContain('rpc-button')
  })

  it('点击触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>确定</Button>)
    fireEvent.click(screen.getByText('确定'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('禁用时不触发 onClick', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>确定</Button>)
    fireEvent.click(screen.getByText('确定'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
```

与 Vue 版（`mount` + `trigger` + `emitted`）的对照：React 测试图书馆推荐**从用户视角断言**——用 `getByRole`/`getByText` 找元素，用 `fireEvent`（或 `@testing-library/user-event`）模拟交互，用 `vi.fn()` 断言回调被调。它不关心内部实现，只关心「用户看到什么、做了什么」。

## 函数式组件的测试难点

Toast/Dialog 挂到 `body` 而非渲染树根部，测试需直接断言 `document.body`，且要注意**异步与清理**：

```tsx
import { Toast } from '../src/toast'

it('Toast 挂载到 body', () => {
  Toast.success('hello')
  const items = document.querySelectorAll('.rpc-toast__item')
  expect(items.length).toBe(1)
  Toast.clear()  // 测完清理，避免污染下一个用例
})
```

要点：命令式组件测试后务必 `clear()`/`unmount`，因为它们在 body 上是全局持久的。对于 `confirm` 这种返回 Promise 的，还要用 `act` 包裹或用 `await` 等它落定：

```tsx
import { act } from '@testing-library/react'
import { confirm } from '../src/dialog'

it('confirm 确定返回 true', async () => {
  let result: boolean | undefined
  await act(async () => {
    confirm('确认吗？').then((r) => (result = r))
    await Promise.resolve()            // 让 root.render 落定
  })
  fireEvent.click(screen.getByText('确定'))
  expect(result).toBe(true)
})
```

## 运行

```bash
pnpm test          # 跑所有包的测试
pnpm -r --filter './packages/*' run test
```

完整的测试用例见各组件目录（实现于任务「测试 + 端到端验证」阶段）。