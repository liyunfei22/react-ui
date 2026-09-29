# 02 · 从 0 搭建骨架

以 `react-ui` 为例，完整还原一个 React 组件库仓库的初始化过程。

## 1. 初始化 monorepo

```bash
mkdir react-ui && cd react-ui
git init
```

创建 `pnpm-workspace.yaml`：

```yaml
packages:
  - 'packages/*'
  - 'docs'
```

创建根 `package.json`（私有，只放脚本与公共工具）：

```json
{
  "name": "react-ui",
  "version": "0.0.1",
  "private": true,
  "packageManager": "pnpm@10.21.0",
  "scripts": {
    "build": "pnpm -r --filter './packages/*' run build",
    "test": "pnpm -r --filter './packages/*' run test",
    "docs:dev": "pnpm --filter docs run dev",
    "docs:build": "pnpm --filter docs run build"
  }
}
```

## 2. pnpm 依赖提升

新建 `.npmrc`：

```ini
shamefully-hoist=true
```

**为什么？** pnpm 默认把每个包依赖严格隔离在各自的 `node_modules`，而 VitePress、某些 CLI 工具「假定依赖平铺在根 node_modules」。不开启提升会导致 VitePress 找不到依赖报错。这是 pnpm 搭组件库最常见的坑之一。

## 3. 公共 tsconfig

`tsconfig.base.json`（所有包 extends 它）：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "declaration": true
  }
}
```

要点：

- `jsx: "react-jsx"`：**React 专属**。这是 React 17+ 的「自动 JSX 运行时」，编译产物会自动 `import { jsx } from 'react/jsx-runtime'`，无需在每个文件手写 `import React from 'react'`。
- `moduleResolution: "Bundler"`：贴近打包器解析规则。
- `verbatimModuleSyntax`：配合 `export type` 精确导出类型（组件包的 `export type * from './types'` 依赖它）。

## 4. shared 包（内部工具）

`packages/shared` 不产出 dist，直接发布源码供 workspace 内部引用：

```json
{
  "name": "@react-ui/shared",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": { ".": { "types": "./src/index.ts", "import": "./src/index.ts" } },
  "peerDependencies": { "react": "^18.3.0" }
}
```

> 注意：`main` 指向 `.ts` 源码是 monorepo 内部包的常见做法（「源码即包」），Vite/tsc 会直接编译它。这类包不会发布到 npm，真正发布的是 pc / h5 两个组件包。

`shared/src` 里只有两个模块——一个是框架无关的 BEM 生成器，一个是 React 专属 hook：

```
packages/shared/src/
├── createNamespace.ts        # BEM 类名生成（与 vue-ui 完全一致）
├── useControllableState.ts   # 受控 / 非受控二合一的 state hook（React 专属）
└── index.ts
```

`useControllableState` 是 React 滑向「受控组件」范式后的标配工具（Vue 的 `withInstall` 在这里没有对应物，因为 React 没有插件安装机制）：

```ts
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
) {
  const [uncontrolled, setUncontrolled] = useState<T>(defaultValue)
  const isControlled = controlled !== undefined
  const value = (isControlled ? controlled : uncontrolled) as T

  const setValue = (next: T) => {
    if (!isControlled) setUncontrolled(next)
    onChange?.(next)
  }
  return [value, setValue] as const
}
```

## 5. 组件包的 package.json

`packages/react-ui-pc/package.json` 的关键字段：

```json
{
  "name": "@react-ui/pc",
  "type": "module",
  "main": "./dist/index.cjs",              // CJS 入口
  "module": "./dist/index.js",             // ESM 入口
  "types": "./dist/types/index.d.ts",      // 类型入口
  "exports": {
    ".": {
      "types": "./dist/types/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./style.css": "./dist/index.css"
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": { "react": "^18.3.0", "react-dom": "^18.3.0" },
  "dependencies": { "@react-ui/shared": "workspace:*" }
}
```

逐字段解释：

- `main` / `module` / `types` 三件套让各种工具链都能找到入口。
- `exports` 用**条件导出**按环境给不同入口（types 给编辑器、import 给 ESM、require 给 CJS）。
- `sideEffects: ["**/*.css"]` 告诉打包器「除了 css，其余都可安全摇树」——否则 `import { Button }` 时 css 会被 tree-shaking 误删。
- `peerDependencies`：声明「我依赖宿主项目提供 react / react-dom」，构建包不会把它们打进去（见第 06 章的 `external`）。**注意 React 要声明两个 peer**：`react` 与 `react-dom` 是分开的包，缺一不可。
- `files: ["dist"]`：发布时只带 `dist` 目录，避免把源码/配置一起打上 npm。

## 6. 结果

此时目录结构已就绪，`pnpm install` 后即可开始写组件。下一步拆解「手写一个组件」的完整链路。