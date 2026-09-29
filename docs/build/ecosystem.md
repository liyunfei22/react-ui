# 09 · 主流库架构对照

本项目是对标主流组件库的「微缩版」。对照四个参考库，帮助你从「能跑」走向「能用」。本教程聚焦 React 一侧，因此重点看 **antd** 与 **antd-mobile**，Element Plus / Vant 作为 Vue 侧的镜像参考。

## 一览表

| | Element Plus | Vant | antd | antd-mobile |
|---|---|---|---|---|
| 框架 | Vue 3（PC） | Vue 3（移动端） | React（PC） | React（移动端） |
| 类名前缀 | `el-` | `van-` | `ant-` | `adm-` |
| 样式方案 | SCSS + CSS 变量 | Less + CSS 变量 | CSS-in-JS（Token） | Less + CSS 变量 |
| 函数式 API | `ElMessage` / `ElMessageBox` | `showToast` / `showDialog` | `message.xxx` / `Modal.confirm` | `Toast.show` / `Dialog.confirm` |
| 挂载方式 | `createApp` | `createApp` | `createRoot` | `createRoot` |
| monorepo | pnpm workspace | pnpm workspace | pnpm workspace（pnpm） | pnpm workspace |

**本项目对应的位置**：`@react-ui/pc` ↔ antd、`@react-ui/h5` ↔ antd-mobile、`@vue-ui/pc` ↔ Element Plus、`@vue-ui/h5` ↔ Vant。

## React 侧两个参考库意味着什么

- **antd（PC）**：本项目 `@react-ui/pc` 的模板。最容易看懂的对照点有三个——`--rpc-color-primary: #1677ff` 就取自 antd 的品牌主色；`Dialog.confirm` / `message.xxx` 用的是 `createRoot` + `createPortal`（本项目完全同构）；antd v5 的 CSS-in-JS Token 系统是本项目「纯 CSS 变量」令牌的「重装版」。
- **antd-mobile（H5）**：本项目 `@react-ui/h5` 的模板。移动端配色（`--rh5-color-primary: #1989fa`、成功色微信绿 `#07c160`）、更大圆角（`10px`）、触控热区，都直接对齐 antd-mobile / Vant 的移动端规范。它的 `Toast.show` / `Dialog.confirm` 同样是 `createRoot` 挂载。

## 它们比本项目多做（但方向一致)的事

1. **按组件分包 + 自动按需引入**
   - antd 每个组件可独立 `import { Button } from 'antd'` 且靠 `babel-plugin-import`（v4）/ ESM 摇树（v5）做到按需；
   - 本项目用 `sideEffects` + ESM 具名导出已具备 tree-shaking 基础，但未拆到组件级物理包。

2. **更完整的组件层级**
   - 本项目只有 8 个核心组件；真实库还有几十上百个，并分成「通用/布局/导航/数据录入/数据展示/反馈」等类别。

3. **主题系统更深**
   - antd v5 的 Token 是「种子变量 → 派生变量 → 组件变量」三层，用 CSS-in-JS 在运行时算，再注入 `<style>`；
   - 本项目只做了一层 CSS 变量，但「令牌与组件解耦」的思想一致。

4. **无障碍与国际化**
   - 真实库有完整 ARIA 支持（本项目 Dialog 加了 `role="dialog"` / `aria-modal="true"`、Switch 加了 `role="switch"` / `aria-checked`）与 i18n 文案（如 antd 的 `ConfigProvider` locale）。

5. **工程化细节**
   - 真实库配 husky + lint-staged + commitlint + CI 发布流水线 + 单测覆盖率门禁。

## VitePress 里桥接 React 的额外一环

对照 Vue 库，React 库的文档站有一个独有机制：VitePress 是 Vue 的产物，要用它渲染 React demo，得搭一座桥。本项目 `docs/.vitepress/theme/ReactDemo.vue` 在 `onMounted` 里 `createRoot` 挂载由 `props.demo` 传入的 React 组件：

```vue
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

const props = defineProps<{ demo: ComponentType }>()
const el = ref<HTMLDivElement>()
let root: Root | null = null

const render = () => {
  if (!el.value) return
  if (!root) root = createRoot(el.value)
  root.render(createElement(props.demo))
}
onMounted(render)
onBeforeUnmount(() => root?.unmount())
</script>

<template><div ref="el" class="react-demo" /></template>
```

配合 `docs/.vitepress/config.mts` 里的 `vite.plugins: [react()]`（`@vitejs/plugin-react`）编译 JSX，就能在 Vue 驱动的 VitePress 里无缝内嵌 React 用例——这正是「命令式挂载」技能在真实项目里的第二个用武之地（第一个是 Toast/Dialog）。

## 读真实源码的推荐路径

想继续深入，建议按这个顺序读源码，会非常顺（因为本项目就是照着这个结构搭的）：

1. **选一个组件**：先在 antd 找 `components/button/`，对比项目里的 `button/`，体会「四文件结构」（antd 每个组件目录同样有 `Button.tsx` + `index.tsx` + `style/`）。
2. **看命令式挂载**：追 antd `message.xxx` 从 API 到 `render`（内部走 `createRoot`）的完整链路，对比本项目 `toast.tsx`。
3. **看受控/非受控合流**：antd 大量组件都是「受控 + 非受控二选一」，其内部实现即本项目 `shared/useControllableState.ts` 的原型。
4. **看主题**：antd v5 `@ant-design/cssinjs` 如何在运行时从种子 Token 算出组件 Token，对比本项目 `styles/tokens.css` 的静态 CSS 变量。

## 一句话总结

所有成熟组件库共享同一套骨架：**monorepo 组织代码、BEM 组织样式、令牌解耦主题、函数式 API 突破声明式边界、ESM+CJS+d.ts 标准化产物**。React 侧再多两个专属心法：**`createRoot` 命令式挂载**与**受控/非受控二合一**。本项目用最小可用规模复刻了这套骨架——把它吃透，再看任何一个真实组件库都会是「似曾相识」。