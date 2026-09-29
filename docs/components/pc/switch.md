<script setup>
import { BasicDemo, ColorDemo, ControlledDemo, SizeDemo } from './switch-demo'
</script>

# Switch 开关

开关组件，用于在两种状态间切换。

## 基础用法

`defaultChecked` 设置非受控初始状态：

<DemoBlock title="基础用法">
  <ReactDemo :demo="BasicDemo" />
</DemoBlock>

```tsx
<Switch />
<Switch defaultChecked />
```

## 尺寸

三种尺寸：

<DemoBlock title="三种尺寸">
  <ReactDemo :demo="SizeDemo" />
</DemoBlock>

```tsx
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />
```

## 自定义颜色

通过 `activeColor` / `inactiveColor` 覆盖主题色：

<DemoBlock title="自定义颜色">
  <ReactDemo :demo="ColorDemo" />
</DemoBlock>

```tsx
<Switch activeColor="#07c160" defaultChecked />
<Switch inactiveColor="#ee0a24" />
```

## 受控与禁用

`checked` + `onChange(checked)`，以及 `disabled`：

<DemoBlock title="受控与禁用">
  <ReactDemo :demo="ControlledDemo" />
</DemoBlock>

```tsx
const [checked, setChecked] = useState(false)
<Switch checked={checked} onChange={(v) => setChecked(v)} />
<Switch disabled />
```

## API

### SwitchProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 受控：是否打开 | `boolean` | — |
| defaultChecked | 非受控：初始是否打开 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| activeColor | 打开时的颜色 | `string` | — |
| inactiveColor | 关闭时的颜色 | `string` | — |
| onChange | 值变化回调 | `(checked: boolean) => void` | — |

> `SwitchProps` 还继承了原生 `<div>` 的全部属性，可透传，并支持 `ref` 转发。