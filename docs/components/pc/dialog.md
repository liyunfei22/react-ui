<script setup>
import { BasicDemo, ButtonDemo, ConfirmDemo } from './dialog-demo'
</script>

# Dialog 弹窗

模态弹窗，基于 `createPortal` 渲染到 `body`，通过 `open` 控制显隐。

## 基础用法

传入 `open`、`title`，并处理 `onClose` / `onConfirm` / `onCancel` 回调：

<DemoBlock title="基础弹窗">
  <ReactDemo :demo="BasicDemo" />
</DemoBlock>

```tsx
const [open, setOpen] = useState(false)

<Dialog
  open={open}
  title="标题"
  onClose={() => setOpen(false)}
  onConfirm={() => setOpen(false)}
  onCancel={() => setOpen(false)}
>
  这是弹窗内容
</Dialog>
```

## 自定义按钮

可隐藏关闭 / 取消按钮，并自定义按钮文字与宽度：

<DemoBlock title="自定义按钮">
  <ReactDemo :demo="ButtonDemo" />
</DemoBlock>

```tsx
<Dialog
  open={open}
  title="自定义按钮"
  showClose={false}
  showCancel={false}
  confirmText="知道了"
  width="360px"
  onClose={() => setOpen(false)}
>
  只有确定按钮的弹窗
</Dialog>
```

## 命令式确认框

`confirm` 返回 Promise，resolve `true` 表示确定，`false` 表示取消/关闭：

<DemoBlock title="命令式确认框">
  <ReactDemo :demo="ConfirmDemo" />
</DemoBlock>

```tsx
const ok = await confirm({
  title: '确认',
  message: '确定要执行该操作吗？',
})
if (ok) Toast.success('已确认')
```

## API

### DialogProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| title | 标题 | `ReactNode` | — |
| width | 宽度 | `string` | `'420px'` |
| showClose | 是否显示右上角关闭按钮 | `boolean` | `true` |
| showConfirm | 是否显示确定按钮 | `boolean` | `true` |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| confirmText | 确定按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| closeOnClickOverlay | 点击遮罩是否关闭 | `boolean` | `true` |
| onClose | 关闭回调 | `() => void` | — |
| onConfirm | 确定回调 | `() => void` | — |
| onCancel | 取消回调 | `() => void` | — |
| children | 弹窗内容 | `ReactNode` | — |

### confirm

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| options | 确认框配置，或直接传提示文案 | `ConfirmOptions \| string` |
| 返回值 | 确定 resolve true，取消/关闭 resolve false | `Promise<boolean>` |

### ConfirmOptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| message | 内容 | `string` | — |
| confirmText | 确定按钮文字 | `string` | `'确定'` |
| cancelText | 取消按钮文字 | `string` | `'取消'` |
| width | 宽度 | `string` | — |