# 08 · 版本与发布

## 发布前检查清单

- [ ] `dist/` 产物齐全：`index.js` / `index.cjs` / `index.css` / `types/`
- [ ] `types` 指向正确的 `dist/types/index.d.ts`，且类型准确（非 `any`）
- [ ] `sideEffects` 声明正确（避免 css 被摇树删掉）
- [ ] `peerDependencies` 声明宿主框架（**react 与 react-dom 两个都要**），且 `build.rollupOptions.external` 已排除它们（连同 `react-dom/client`、`react/jsx-runtime`）

## 版本管理：changesets

monorepo 中多个包各自发版，手动改版本号极易错漏，主流用 [changesets](https://github.com/changesets/changesets)：

```bash
pnpm add -Dw @changesets/cli
pnpm changeset init          # 生成 .changeset/ 目录
```

发版流程：

```bash
# 1. 开发时记录变更
pnpm changeset               # 交互式选择要发版的包 + 版本（patch/minor/major）

# 2. 提交 .changeset/*.md 一起合入

# 3. 发布时：统一升版本 + 生成 changelog
pnpm changeset version

# 4. 构建 + 发布
pnpm build
pnpm changeset publish
```

## 发布到 npm

scope 名（`@react-ui/`）必须是你**拥有**的 npm 组织或用户名：

```bash
npm publish --access public     # scope 包默认私有，需 --access public
```

如果只是内部使用，可发布到私有源（如 Verdaccio / 公司 npm 私服）：

```bash
# .npmrc
registry=https://npmmirror.com/    # 或公司私服地址
```

> 本学习项目的 `@react-ui/*`、`@vue-ui/*` 是占位 scope，真实发布前请换成自己拥有的组织名。

## 消费者如何用（对照快速开始）

```bash
npm install @react-ui/pc react react-dom
```

```tsx
import { createRoot } from 'react-dom/client'
import { Button, Toast } from '@react-ui/pc'
import '@react-ui/pc/style.css'

createRoot(document.getElementById('root')!).render(
  <Button type="primary" onClick={() => Toast.success('ok')}>点我</Button>,
)
```

> 注意与 Vue 的差异：React 没有 `app.use()`，不需要全量注册；样式入口 `@react-ui/pc/style.css` 需显式 import（React 组件不负责自动注入样式）。

## 产物质量自检

顺带推荐两件事（本教程项目未展开，但有条件一定要做）：

1. **`npm pack` 试包**：`npm pack` 会打出将要发布的 tarball，解包后确认 `dist/` 与 `package.json` 的 `files` 白名单（本项目已配 `files: ["dist"]`）一致、没有多余文件。
2. **`attw` 检查**：`npx @arethetypeswrong/cli --pack` 能检查各入口（types/import/require）配置是否有问题，是发布前最值得跑的体检。

## 小结

组件库发布 = 「产物正确」 × 「版本有序」 × 「入口完备」。前两者分别靠 `sideEffects`/`external`/`peerDependencies` 和 changesets 保证，第三者靠三件套（main/module/types）+ 条件导出 `exports` 兜底。把这套「体检清单」跑通，才算真正能交付给他人的组件库。