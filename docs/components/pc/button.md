<script setup>
import { ClickDemo, ShapeDemo, SizeDemo, StateDemo, TypeDemo } from './button-demo'
</script>

# Button 按钮

基础操作按钮，支持多种风格、尺寸与状态。

## 基础用法

使用 `type` 控制风格：

<DemoBlock title="按钮类型">
  <ReactDemo :demo="TypeDemo" />
</DemoBlock>

```tsx
<Button>默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="success">成功按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

## 尺寸

<DemoBlock title="三种尺寸">
  <ReactDemo :demo="SizeDemo" />
</DemoBlock>

## 禁用 / 加载中

<DemoBlock title="禁用与加载中">
  <ReactDemo :demo="StateDemo" />
</DemoBlock>

## 圆角 / 块级 / 朴素

<DemoBlock title="形态">
  <ReactDemo :demo="ShapeDemo" />
</DemoBlock>

## 点击事件

<DemoBlock title="点击反馈" desc="点击按钮弹出轻提示">
  <ReactDemo :demo="ClickDemo" />
</DemoBlock>

## API

### ButtonProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮风格 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| round | 圆角按钮 | `boolean` | `false` |
| block | 块级按钮 | `boolean` | `false` |
| plain | 朴素按钮 | `boolean` | `false` |
| onClick | 点击事件（禁用/加载中不触发） | `MouseEventHandler` | — |
| children | 按钮内容 | `ReactNode` | — |

> `ButtonProps` 还继承了原生 `<button>` 的全部属性（`className`、`style` 等），可透传。