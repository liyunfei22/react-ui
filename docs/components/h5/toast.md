<script setup>
import { BasicDemo, LoadingDemo, PositionDemo, TypeDemo } from './toast-demo'
</script>

# Toast 轻提示

命令式轻提示，无需挂载组件，直接调用方法在页面中间短暂展示信息。

## 基础用法

`Toast(message)` 或 `Toast({ message, ... })`：

<DemoBlock title="文字提示">
  <ReactDemo :demo="BasicDemo" />
</DemoBlock>

```tsx
Toast('提示信息')
Toast({ message: '自定义时长', duration: 3000 })
```

## 提示类型

内置 4 种类型（`loading` 常驻，见下节）：

<DemoBlock title="提示类型">
  <ReactDemo :demo="TypeDemo" />
</DemoBlock>

```tsx
Toast.info('信息提示')
Toast.success('操作成功')
Toast.warning('警告提示')
Toast.error('错误提示')
```

## 加载中

`Toast.loading` 常驻展示，需手动调用 `Toast.clear()` 关闭：

<DemoBlock title="加载中">
  <ReactDemo :demo="LoadingDemo" />
</DemoBlock>

```tsx
Toast.loading('加载中...')
setTimeout(() => Toast.clear(), 3000)
```

## 展示位置

通过 `position` 控制展示位置：

<DemoBlock title="展示位置">
  <ReactDemo :demo="PositionDemo" />
</DemoBlock>

```tsx
Toast({ message: '顶部提示', position: 'top' })
Toast({ message: '中间提示', position: 'middle' })
Toast({ message: '底部提示', position: 'bottom' })
```

## API

### Toast

| 方法 | 说明 | 参数 |
| --- | --- | --- |
| Toast | 展示提示，返回唯一 id | `string \| ToastOptions` |
| Toast.info | 信息提示 | `string \| Omit<ToastOptions, 'type'>` |
| Toast.success | 成功提示 | `string \| Omit<ToastOptions, 'type'>` |
| Toast.warning | 警告提示 | `string \| Omit<ToastOptions, 'type'>` |
| Toast.error | 错误提示 | `string \| Omit<ToastOptions, 'type'>` |
| Toast.loading | 加载提示（常驻） | `string \| Omit<ToastOptions, 'type'>` |
| Toast.clear | 关闭所有提示 | `() => void` |

### ToastOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 提示内容 | `string` | — |
| type | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error' \| 'loading'` | `'info'` |
| duration | 展示时长（ms），0 表示常驻直到 clear() | `number` | `2000` |
| position | 展示位置 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |