<script setup>
import { BasicDemo, ControlledDemo, PrefixSuffixDemo, StateDemo } from './input-demo'
</script>

# Input 输入框

基础输入框，支持受控 / 非受控、清空、前后缀等能力。

## 基础用法

使用 `placeholder` 与 `type`：

<DemoBlock title="基础用法">
  <ReactDemo :demo="BasicDemo" />
</DemoBlock>

```tsx
<Input placeholder="请输入内容" />
<Input placeholder="密码输入框" type="password" />
```

## 状态

`disabled` 禁用、`readOnly` 只读、`clearable` 一键清空：

<DemoBlock title="禁用 / 只读 / 可清空">
  <ReactDemo :demo="StateDemo" />
</DemoBlock>

```tsx
<Input value="禁用状态" disabled />
<Input value="只读状态" readOnly />
<Input placeholder="可清空" clearable />
```

## 前缀与后缀

通过 `prefix` / `suffix` 扩展前后内容：

<DemoBlock title="前缀与后缀">
  <ReactDemo :demo="PrefixSuffixDemo" />
</DemoBlock>

```tsx
<Input prefix={<Icon name="search" />} placeholder="带前缀图标" />
<Input suffix="元" placeholder="带后缀" />
```

## 受控组件

`value` + `onChange(value, event)`：

<DemoBlock title="受控输入">
  <ReactDemo :demo="ControlledDemo" />
</DemoBlock>

```tsx
const [value, setValue] = useState('')
<Input value={value} onChange={(v) => setValue(v)} placeholder="受控输入" />
```

## API

### InputProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | — |
| defaultValue | 非受控初始值 | `string` | `''` |
| type | 输入框类型 | `string` | `'text'` |
| placeholder | 占位文案 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| clearable | 是否可一键清空 | `boolean` | `false` |
| prefix | 前缀内容 | `ReactNode` | — |
| suffix | 后缀内容 | `ReactNode` | — |
| onChange | 输入变化回调 | `(value: string, event?: ChangeEvent<HTMLInputElement>) => void` | — |
| onClear | 清空回调 | `() => void` | — |

> `InputProps` 还继承了原生 `<input>` 的全部属性（`className`、`style`、`maxLength` 等），可透传，并支持 `ref` 转发。