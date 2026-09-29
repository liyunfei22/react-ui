# 主题定制

组件库的颜色/字号/圆角收敛在 `@react-ui/pc` 的设计令牌 `src/styles/tokens.css` 的 CSS 变量里，组件只引用变量，因此换肤只需覆盖变量。

## 覆盖主色

```css
:root {
  --rpc-color-primary: #722ed1;
}
```

## 暗色模式

```html
<html data-theme="dark">
```

## PC 与 H5 的令牌差异

| 变量 | PC（--rpc-） | H5（--rh5-） |
|---|---|---|
| `-color-primary` | `#1677ff` | `#1989fa` |
| `-color-success` | `#52c41a` | `#07c160` |
| `-font-size` | `14px` | `15px` |
| `-radius` | `6px` | `10px` |

完整令牌见 `packages/react-ui-pc/src/styles/tokens.css` 与 `packages/react-ui-h5/src/styles/tokens.css`。