<script setup>
import { StandaloneDemo, WrapDemo } from './loading-demo'
</script>

# Loading 加载

加载状态提示，可独立使用，也可包裹内容展示遮罩。

## 独立使用

无 `children` 时独立展示：

<DemoBlock title="独立使用">
  <ReactDemo :demo="StandaloneDemo" />
</DemoBlock>

```tsx
<Loading />
<Loading text="加载中..." />
```

## 包裹内容

传入 `children` 时以遮罩覆盖内容，`loading` 控制显隐：

<DemoBlock title="包裹内容">
  <ReactDemo :demo="WrapDemo" />
</DemoBlock>

```tsx
const [loading, setLoading] = useState(false)

<Loading loading={loading} text="加载中...">
  <div>这里是包裹的内容</div>
</Loading>
```

## API

### LoadingProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否加载中 | `boolean` | `true` |
| text | 加载文案 | `string` | `''` |
| children | 包裹的内容，传入后以遮罩覆盖 | `ReactNode` | — |

> `LoadingProps` 还继承了原生 `<div>` 的全部属性，可透传。