# 06 · 构建与产物

## 目标产物

一个规范的组件库包（`@react-ui/pc`）构建后应产出：

```
dist/
├── index.js       # ESM 产物（import 用）
├── index.cjs      # CJS 产物（require 用，兼容老工具链）
├── index.css      # 聚合后的样式
└── types/         # 类型声明（编辑器智能提示）
    ├── index.d.ts
    ├── button/Button.d.ts
    ├── button/types.d.ts
    └── dialog/Dialog.d.ts ...
```

## Vite 库模式配置

`packages/react-ui-pc/vite.config.ts`：

```ts
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactUiPc',
      fileName: 'index',
      formats: ['es', 'cjs'],   // 同时产出 ESM + CJS
      cssFileName: 'index',      // 样式聚合为 index.css
    },
    rollupOptions: {
      // peer 依赖全部外部化；自动 JSX 运行时与子路径都要显式排除
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
      },
    },
  },
})
```

关键点：

1. **`external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime']`**：这些是 peerDependency，不能打进产物（否则用户项目里会出现两份 react，导致 hook 状态错乱报错）。**特别注意两点**：
   - rollup 的 `external` 是**精确匹配**的，`react-dom` 并不会自动 external 掉 `react-dom/client`，命令式组件（Toast/Dialog 的 `createRoot`）用到这个子路径，必须显式列出，否则 `react-dom` 会被打一半进包里。
   - `react/jsx-runtime`（JSX 自动运行时）也要排除——`jsx: "react-jsx"` 的编译产物会自动引用它，漏了它会导致「两份 react」。
2. **`plugins: [react()]`**：用 `@vitejs/plugin-react`（而非 Vue 的 `@vitejs/plugin-vue`）处理 JSX/TSX，负责把它编译成浏览器可运行的 JS。
3. **`formats: ['es', 'cjs']`**：现代打包器走 ESM，老 Node/工具走 CJS，双发兼容性最好。
4. **`cssFileName` + `sideEffects: ["**/*.css"]`**：样式被抽成独立文件，且声明「css 有副作用」，防止摇树误删。

## 类型声明：React 为什么用 tsc 就够了

这是 Vue/React 组件库的**分水岭**，也是最容易踩坑的地方：

| 技术栈 | 工具 | 原因 |
|---|---|---|
| Vue | `vue-tsc` | `.vue` 文件是 SFC，普通 tsc 读不懂，需要 Vue 语言服务提取 `<script setup>` 类型 |
| React | `tsc` | `.tsx` 是标准 TS，`tsc --emitDeclarationOnly` 直接可用，无需任何额外插件 |

> 实测 `vite-plugin-dts` 对 `.vue` 的支持不稳定（会退化成 `any`/泛型 shim），因此 vue-ui 放弃它改用 `vue-tsc`；而 React 的 `.tsx` 是原生的 TS，直接用官方 `tsc` 最稳。这也是 React 组件库工程化比 Vue 少一块心病的地方。

`tsconfig.build.json` 只做一件事——只发类型：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "emitDeclarationOnly": true,
    "declarationDir": "dist/types"
  },
  "include": ["src"]
}
```

## 一个隐蔽的坑：构建顺序

最终 build 脚本是：

```json
"build": "vite build && tsc -p tsconfig.build.json"
```

**为什么 vite 在前、类型生成在后？** 因为 `vite build` 默认 `emptyOutDir` 会**清空 dist 目录**。如果先 `tsc` 生成 `dist/types`，再 `vite build`，类型产物会被清空。调换顺序后 vite 先写 js/css，tsc 再往 `dist/types` 追加，互不干扰。这是初学者几乎必踩的坑。

## 验证产物

```bash
pnpm build
ls packages/react-ui-pc/dist          # index.js / index.cjs / index.css / types/
cat packages/react-ui-pc/dist/types/button/types.d.ts
# 应能看到完整的 ButtonProps 类型（extends ButtonHTMLAttributes），而非 any
```

注意一个细节：React 组件包的类型产物里，每个组件会同时有 `Button.d.ts`（组件实现）与 `types.d.ts`（Props 类型），这是 `Button.tsx` 里 `export const Button = forwardRef(...)` 与 `import type` 分离的自然结果；而 Vue 版则是 `Button.vue.d.ts`。两者都由 `index.d.ts` 汇总 re-export。