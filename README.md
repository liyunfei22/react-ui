# react-ui

React 18 组件库**学习项目**，一个 monorepo 装下 PC（`rpc`）+ H5（`rh5`）两个组件库，与 [vue-ui](../vue-ui) 完全对称，用于对照学习 React 生态下的组件库工程化。

## 目录结构

```
react-ui/
├── packages/
│   ├── shared/       # @react-ui/shared：BEM 工具 + useControllableState
│   ├── react-ui-pc/  # @react-ui/pc：PC 组件库（前缀 rpc，对标 antd）
│   └── react-ui-h5/  # @react-ui/h5：H5 组件库（前缀 rh5，对标 antd-mobile）
└── docs/             # VitePress 文档站（React demo 经 ReactDemo 桥接渲染）
```

## 快速开始

```bash
pnpm install        # 安装依赖
pnpm build          # 构建两个组件包
pnpm docs:dev       # 启动文档站
```

## 组件

每个包 8 个核心组件：`Button`、`Icon`、`Toast`、`Dialog`、`Input`、`Switch`、`Tag`、`Loading`。

```tsx
import { Button, Toast } from '@react-ui/pc'
import '@react-ui/pc/style.css'

<Button type="primary" onClick={() => Toast.success('ok')}>点我</Button>
```

## 文档

与 vue-ui 一致：`docs/components/` 组件使用文档 + `docs/build/` 九篇构建教程。

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `pnpm build` | 构建所有组件包 |
| `pnpm test` | 跑所有测试 |
| `pnpm docs:dev` | 本地启动文档站 |
| `pnpm docs:build` | 构建文档静态站 |