<script setup>
import { ClosableDemo, ShapeDemo, TypeDemo } from './tag-demo'
</script>

# Tag 标签

用于标记和分类的小型标签。

## 基础用法

使用 `type` 控制风格：

<DemoBlock title="标签类型">
  <ReactDemo :demo="TypeDemo" />
</DemoBlock>

```tsx
<Tag>默认标签</Tag>
<Tag type="primary">主要</Tag>
<Tag type="success">成功</Tag>
<Tag type="warning">警告</Tag>
<Tag type="danger">危险</Tag>
```

## 圆角标签

<DemoBlock title="圆角标签">
  <ReactDemo :demo="ShapeDemo" />
</DemoBlock>

```tsx
<Tag type="primary" round>圆角标签</Tag>
```

## 可关闭标签

`closable` 显示关闭图标，`onClose` 处理关闭：

<DemoBlock title="可关闭标签">
  <ReactDemo :demo="ClosableDemo" />
</DemoBlock>

```tsx
<Tag closable onClose={() => setVisible(false)}>点关闭图标移除</Tag>
```

## API

### TagProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 标签风格 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` |
| round | 圆角标签 | `boolean` | `false` |
| closable | 是否可关闭 | `boolean` | `false` |
| onClose | 关闭时回调 | `(e: MouseEvent<HTMLSpanElement>) => void` | — |
| children | 标签内容 | `ReactNode` | — |

> `TagProps` 还继承了原生 `<span>` 的全部属性，可透传，并支持 `ref` 转发。