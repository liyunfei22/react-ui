# 快速开始

## 安装

```bash
pnpm install    # 安装依赖
pnpm build      # 构建组件包（docs 引用构建产物）
pnpm docs:dev   # 启动文档站
```

## 引入组件

React 没有 Vue 那种 `app.use()` 插件式安装，直接具名导入即可（天然支持 tree-shaking）：

```tsx
import { Button, Toast } from '@react-ui/pc'
import '@react-ui/pc/style.css'

function Demo() {
  return <Button type="primary" onClick={() => Toast.success('操作成功')}>提交</Button>
}
```

## H5 端

换包名与样式路径即可，类名前缀不同：

```tsx
import { Button } from '@react-ui/h5'
import '@react-ui/h5/style.css'
```

## 区别：rpc 与 rh5 前缀

| 包 | 类名前缀 | 对标 |
|---|---|---|
| `@react-ui/pc` | `rpc-` | antd |
| `@react-ui/h5` | `rh5-` | antd-mobile |

## 为什么文档站里 demo 能是 React？

VitePress 本质是 Vue 运行时。这里的文档通过一个 **ReactDemo 桥接组件**（`docs/.vitepress/theme/ReactDemo.vue`）挂载 React 组件：在 Vue 的 `onMounted` 里 `createRoot(el).render(reactElement)`。这是「在 VitePress 里展示 React 组件」的常用手法，详见 `docs/build/component.md`。