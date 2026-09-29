# 01 · 架构总览

## 为什么是「两个仓库 + 四个组件库」

本学习项目的目标是同时掌握 Vue 与 React 两种技术栈下的组件库工程化，因此采用镜像结构：

```
ms/
├── vue-ui/      # 仓库 1：Vue 3 技术栈
│   └── packages/
│       ├── shared/        # @vue-ui/shared：BEM 工具 + withInstall
│       ├── vue-ui-pc/     # @vue-ui/pc：PC 端，前缀 vpc
│       └── vue-ui-h5/     # @vue-ui/h5：H5 端，前缀 vh5
└── react-ui/    # 仓库 2：React 18 技术栈（结构与 vue-ui 完全对称）
    └── packages/
        ├── shared/        # @react-ui/shared：BEM 工具 + useControllableState
        ├── react-ui-pc/   # @react-ui/pc：PC 端，前缀 rpc
        └── react-ui-h5/   # @react-ui/h5：H5 端，前缀 rh5
```

本教程聚焦 `react-ui`（React 18）这一侧。`@react-ui/pc` 对标 **antd**，`@react-ui/h5` 对标 **antd-mobile**，两个包共享同一套组件源码结构，只是类名前缀与设计令牌不同。

**为什么 PC 与 H5 是「两个包」而不是一个包两套样式？**

因为它们是两个独立的产物：不同包名、不同类名前缀、不同设计令牌（配色/字号/圆角），可独立发版、独立被依赖。这是主流做法——antd（PC）与 antd-mobile（H5）本就是两个独立的库；本项目把它们收在同一个仓库里，用「一套组件结构 + 两套皮肤」的方式演示其关系。

## 单仓库内部：pnpm workspace monorepo

`react-ui` 内部是一个 pnpm workspace（见 `pnpm-workspace.yaml`）：

```yaml
packages:
  - 'packages/*'
  - 'docs'
```

包之间的依赖用 `workspace:*` 协议声明（如 `@react-ui/pc` 依赖 `@react-ui/shared`），pnpm 会把它们软链到 `node_modules`，实现「改了 shared 立刻在 pc 里生效」的开发体验。

## 每个组件包的职责划分

```
packages/react-ui-pc/
├── src/
│   ├── index.ts          # 入口：引入令牌 + 全量导出（React 无需 install 插件）
│   ├── styles/tokens.css # 设计令牌（--rpc-* 前缀）
│   └── button/           # 每个组件一个自包含目录
│       ├── Button.tsx    # 组件实现（forwardRef + displayName）
│       ├── types.ts      # Props 类型（产出 d.ts 给用户）
│       ├── button.css    # 样式（BEM + CSS 变量）
│       └── index.ts      # 导出（具名导出 + re-export 类型）
├── vite.config.ts        # 库模式构建（external react/react-dom）
├── tsconfig.build.json   # 生成 d.ts（tsc）
└── package.json          # main/module/types/exports/peerDependencies
```

**关键约定**：组件目录自包含（源码 + 类型 + 样式 + 导出），入口文件只做「引入令牌 + 导出」，风格与重构都在 `styles/tokens.css` 集中管理。这与 antd / Element Plus 的目录组织一致。

**与 Vue 版本的一个结构差异**：React 没有「插件式安装」（`app.use()` 机制），因此入口 `src/index.ts` 不需要 `install` 函数，只需要：

```ts
import './styles/tokens.css'

export * from './button'
export * from './icon'
// ...其余组件（tag / switch / input / loading / dialog / toast）
```

对应地，`@react-ui/shared` 里也没有 `withInstall`，取而代之的是 React 专属的 `useControllableState`（受控/非受控二合一 hook），加上框架无关的 `createNamespace`（BEM 类名生成）。

## 技术选型一览

| 维度 | vue-ui | react-ui | 说明 |
|---|---|---|---|
| 框架 | Vue 3.5 | React 18.3 | 组件包的 peerDependency |
| 构建 | Vite 库模式 | 同左 | 产出 ESM + CJS + CSS |
| 类型产物 | **vue-tsc** | **tsc** | Vue 的 .vue 需 vue-tsc，React 的 .tsx 用 tsc 即可 |
| 测试 | Vitest + @vue/test-utils | Vitest + @testing-library/react | 均跑在 jsdom 环境 |
| 文档 | VitePress | VitePress（+ ReactDemo 桥接） | React 侧用 ReactDemo.vue 撑起 demo |
| 样式 | 纯 CSS + CSS 变量 + BEM | 同左 | 零预处理依赖 |

React 侧的文档需要一个额外桥梁：VitePress 本身是 Vue 的产物，要渲染 React 组件用例，`docs/.vitepress/theme/ReactDemo.vue` 在 `onMounted` 里用 `createRoot` 把 React 组件挂到 div 上，并配 `@vitejs/plugin-react` 编译 JSX（详见第 09 章的对照）。

教程后续章节会逐项拆解「为什么这么选」。下一章从 0 搭骨架。