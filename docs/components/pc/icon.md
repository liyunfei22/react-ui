<script setup>
import { BasicDemo, SizeColorDemo, SpinDemo } from './icon-demo'
</script>

# Icon 图标

内置 SVG 图标集，基于 `currentColor` 渲染，尺寸与颜色均可配置。

## 基础用法

通过 `name` 指定图标：

<DemoBlock title="内置图标">
  <ReactDemo :demo="BasicDemo" />
</DemoBlock>

```tsx
<Icon name="check" />
<Icon name="close" />
<Icon name="search" />
<Icon name="info" />
<Icon name="success" />
<Icon name="warning" />
<Icon name="error" />
<Icon name="loading" />
<Icon name="arrow-right" />
```

## 尺寸与颜色

`size` 支持 `number`（px）或 `string`（em/px 等），`color` 默认为 `currentColor`：

<DemoBlock title="尺寸与颜色">
  <ReactDemo :demo="SizeColorDemo" />
</DemoBlock>

```tsx
<Icon name="success" size="32px" />
<Icon name="success" size="32px" color="#07c160" />
<Icon name="error" size="32px" color="#ee0a24" />
```

## 旋转动画

`spin` 用于加载类图标，实现旋转动画：

<DemoBlock title="旋转动画">
  <ReactDemo :demo="SpinDemo" />
</DemoBlock>

```tsx
<Icon name="loading" size="32px" spin />
```

## API

### IconProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名 | `'check' \| 'close' \| 'search' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'loading' \| 'arrow-right'` | — |
| size | 尺寸，number 为 px，string 可传 em/px 等 | `number \| string` | `'1em'` |
| color | 颜色，默认继承 currentColor | `string` | — |
| spin | 是否旋转（用于 loading） | `boolean` | `false` |
| className | 自定义类名 | `string` | — |
| style | 自定义样式 | `CSSProperties` | — |