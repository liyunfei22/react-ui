# 03 · 手写一个组件（以 Button 为例）

一个组件 = 四个文件：**类型 + 实现 + 样式 + 导出**。下面以 React 版 Button 完整拆解。

## 1. 类型（`button/types.ts`）

把 Props 单独抽成 `.ts`，好处是能被 `tsc` 生成到 `dist/types` 里，用户获得完整的类型提示。React 组件 Props 通常 extends 原生元素的属性接口，这样能直接把 `onClick`、`children` 等原生属性透传出去：

```ts
import type { ButtonHTMLAttributes } from 'react'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮风格 */
  type?: ButtonType
  /** 尺寸 */
  size?: ButtonSize
  /** 是否展示加载中 */
  loading?: boolean
  /** 圆角按钮 */
  round?: boolean
  /** 块级按钮（占满一行） */
  block?: boolean
  /** 朴素按钮（浅色描边） */
  plain?: boolean
}
```

细节：`Omit<..., 'type'>` 是因为 `ButtonHTMLAttributes` 自带的 `type` 是 `"submit" | "reset" | "button"`，与本组件想定义的「风格 type」冲突，必须先剔除再重新声明。

## 2. 实现（`button/Button.tsx`）

用 `forwardRef` 转发 ref，配合「解构 props + 拼 BEM 类名 + 展开 rest」的约定：

```tsx
import { forwardRef } from 'react'
import { createNamespace } from '@react-ui/shared'
import type { ButtonProps } from './types'
import './button.css'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    round = false,
    block = false,
    plain = false,
    className,
    children,
    ...rest
  } = props

  const ns = createNamespace('rpc-button')
  const classes = [
    ns.b(),
    ns.m(type),
    ns.m(size),
    ns.is('disabled', disabled),
    ns.is('loading', loading),
    ns.is('round', round),
    ns.is('block', block),
    ns.is('plain', plain),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button ref={ref} type="button" className={classes} disabled={disabled || loading} {...rest}>
      {loading && <i className="rpc-button__loading" />}
      {children != null && <span className="rpc-button__content">{children}</span>}
    </button>
  )
})

Button.displayName = 'RpcButton'
```

几个值得注意的工程细节：

- **`forwardRef`**：React 函数组件默认拿不到 `ref`，`forwardRef<HTMLButtonElement, ButtonProps>` 让用户能拿到底层 `<button>` DOM 节点（自动化测试、聚焦、测量都依赖它）。
- **BEM 类名统一从 `createNamespace('rpc-button')` 生成**，杜绝手写字符串拼错（`ns.m('primary')` → `rpc-button--primary`）。
- **`type="button"` 硬编码**：原生 `<button>` 默认 `type="submit"`，放在表单里会误触提交，组件库必须显式声明为 `button`。
- **`disabled={disabled || loading}`**：加载中也视作禁用，把交互约束收在组件内部——与 Vue 版「禁用/加载中不派发 click」是同一语义。
- **`{...rest}` + `className` 透传**：`rest` 里剩下的 `onClick`、`style`、`aria-*` 等原生属性原样落到 DOM，`className` 单独拼进 `classes` 数组里，用户的类名与组件类名并存。
- **`displayName = 'RpcButton'`**：生产环境压缩会改函数名，显式 `displayName` 保证 React DevTools 里看到的是「RpcButton」而非一颗乱码，便于调试。

## 3. 样式（`button/button.css`）

```css
.rpc-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--rpc-radius);
  border: 1px solid transparent;
  cursor: pointer;
}
.rpc-button--primary {
  background: var(--rpc-color-primary);
  color: #fff;
}
.rpc-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

只写「结构 + 外观差异」，颜色/圆角一律引用设计令牌变量（`--rpc-*`），实现换肤能力（见第 05 章）。

## 4. 导出（`button/index.ts`）

React 没有 `withInstall`，导出就是最朴素的「具名导出 + re-export 类型」：

```ts
export { Button } from './Button'
export type * from './types'
```

## 5. 注册到入口（`src/index.ts`）

同样比 Vue 简单——没有 `install` 插件，入口只做两件事：引入令牌、全量导出：

```ts
import './styles/tokens.css'

export * from './button'
export * from './icon'
export * from './tag'
export * from './switch'
export * from './input'
export * from './loading'
export * from './dialog'
export * from './toast'
```

这就是完整链路：**类型 → 实现 → 样式 → 导出 → 入口导出**。消费者用 `import { Button } from '@react-ui/pc'` 即可，配合 `sideEffects` + ESM 具名导出天然支持按需摇树。

## Vue 版本的差异

结构完全一致（类型/实现/样式/导出四件套），只是实现用 Vue SFC（见 `vue-ui/packages/vue-ui-pc/src/button/Button.vue`）：

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@vue-ui/shared'

defineOptions({ name: 'VpcButton' })   // 组件名，用于 app.component 注册
const props = withDefaults(defineProps<ButtonProps>(), { type: 'default', size: 'medium' })
const emit = defineEmits<{ (e: 'click', evt: MouseEvent): void }>()

const ns = createNamespace('vpc-button')
const classes = computed(() => [ns.b(), ns.m(props.type), ns.is('disabled', props.disabled)])
</script>
```

关键差异对照：

| | Vue（SFC） | React（tsx） |
|---|---|---|
| 内容 | 插槽 `<slot>` | `children` |
| 事件 | `emit('click', evt)` | `onClick` 等 props 直接透传 |
| ref | 模板原生支持 | `forwardRef` 转发 |
| 组件名 | `defineOptions({ name })` | `displayName` |
| 注册 | `withInstall` + `app.use()` | 无，直接具名导出 |

两者的「工程骨架」完全一致（BEM + 令牌 + 四件套目录），只是 React 把插槽/事件/ref 这些概念全部折叠进了 props。看懂了 Vue 版再对照 React 版，能最快抓住两套心智模型的差异。