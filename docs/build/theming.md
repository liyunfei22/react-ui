# 05 · 设计令牌与主题定制

## 为什么用 CSS 变量

主流组件库（antd v5、Element Plus、Vant、antd-mobile）最终都把主题收敛到 **CSS 自定义变量（Design Tokens）**。核心收益：

- **换肤不动源码**：组件只引用变量，改主题只需覆盖变量。
- **运行时切换**：暗色模式一行 `data-theme` 就能整体切换，无需重新编译。
- **多端皮肤**：同一套组件结构，换成不同的变量值就成了另一套视觉（本项目 pc vs h5 即如此）。

## 令牌如何组织

`packages/react-ui-pc/src/styles/tokens.css`：

```css
:root {
  --rpc-color-primary: #1677ff;
  --rpc-color-primary-light: #e8f3ff;
  --rpc-color-success: #52c41a;
  --rpc-color-warning: #faad14;
  --rpc-color-danger: #ff4d4f;

  --rpc-text-color: #303133;
  --rpc-border-color: #dcdfe6;
  --rpc-bg-color: #ffffff;
  --rpc-bg-color-mask: rgba(0, 0, 0, 0.45);

  --rpc-font-size: 14px;
  --rpc-radius: 6px;
}

[data-theme='dark'] {
  --rpc-color-primary: #4096ff;
  --rpc-color-primary-light: #17263f;
  --rpc-bg-color: #141414;
}
```

组件的 `.css` 里**从不写死颜色**：

```css
.rpc-button--primary { background: var(--rpc-color-primary); }
```

于是：

```css
/* 使用者换主色 */
:root { --rpc-color-primary: #722ed1; }
/* 切换暗色 */
document.documentElement.dataset.theme = 'dark'
```

> antd v5 的 Token 系统思路与此同源，但实现更重：它是「种子变量 → 派生变量 → 组件变量」三层 Token，用 **CSS-in-JS（`@ant-design/cssinjs`）在运行时算**，再注入到 `<style>` 标签。本项目只做「纯 CSS 变量」这一层，零依赖、可运行时切换，作为理解 antd Token 机制的简化原型。

## 类名前缀：为什么要有命名空间

BEM 块名统一带上前缀（`rpc-button`、`rh5-button`、`vpc-button`、`vh5-button`），避免与宿主项目的样式冲突。生成器见 `shared/createNamespace.ts`（与 vue-ui 完全一致的框架无关实现）：

```ts
createNamespace('rpc-button')
// .b() -> 'rpc-button'
// .e('icon') -> 'rpc-button__icon'
// .m('primary') -> 'rpc-button--primary'
// .is('disabled', true) -> 'rpc-button--disabled'（状态条件拼接）
```

## PC 与 H5：一套结构，两套令牌

两个包共享同样的组件源码结构，只是**变量名前缀和默认值不同**：

| 令牌 | PC（--rpc-） | H5（--rh5-） |
|---|---|---|
| 主色 | `#1677ff` | `#1989fa` |
| 成功色 | `#52c41a` | `#07c160`（微信绿） |
| 字号 | `14px` | `15px` |
| 圆角 | `6px` | `10px` |

移动端额外做了触控适配（更大的字号、更圆润的圆角、更大的点击热区），见 `react-ui-h5` 各组件 css。真实世界的 antd-mobile 还引入了大量移动端专属组件（Cell、NavBar、TabBar…），本项目聚焦核心 8 组件，把「如何分端」的机制讲清楚即可。

## 主题定制的边界

本项目选「纯 CSS 变量」而非 SCSS/Less/CSS-in-JS，理由：零预处理依赖、更易理解、可运行时切换。但真实库各有取舍——antd v5 用 CSS-in-JS 做 Token 系统、antd-mobile 用 Less 源码 + CSS 变量做主题定制、Element Plus 用 SCSS 编译出变量。本质殊途同归：**把样式决策从组件实现中解耦出来**。