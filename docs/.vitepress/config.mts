import { defineConfig } from 'vitepress'
import react from '@vitejs/plugin-react'

const comps = [
  ['button', 'Button 按钮'],
  ['icon', 'Icon 图标'],
  ['toast', 'Toast 轻提示'],
  ['dialog', 'Dialog 弹窗'],
  ['input', 'Input 输入框'],
  ['switch', 'Switch 开关'],
  ['tag', 'Tag 标签'],
  ['loading', 'Loading 加载中'],
] as const

const pcSidebar = comps.map(([name, text]) => ({ text, link: `/components/pc/${name}` }))
const h5Sidebar = comps.map(([name, text]) => ({ text, link: `/components/h5/${name}` }))

const buildSidebar = [
  ['architecture', '01 · 架构总览'],
  ['scaffold', '02 · 从 0 搭建骨架'],
  ['component', '03 · 手写一个组件'],
  ['imperative', '04 · 函数式组件挂载'],
  ['theming', '05 · 设计令牌与主题'],
  ['build', '06 · 构建与产物'],
  ['test', '07 · 组件测试'],
  ['publish', '08 · 版本与发布'],
  ['ecosystem', '09 · 主流库架构对照'],
] as const

export default defineConfig({
  title: 'react-ui',
  description: 'React 18 组件库学习项目（PC + H5 双端）',
  cleanUrls: true,
  // GitHub Pages 部署在 https://<user>.github.io/react-ui/ 子路径下，必须设置 base
  base: '/react-ui/',
  // 关键：让 VitePress 能编译 demo 里的 .tsx（JSX 语法）
  vite: {
    plugins: [react()],
  },
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'PC 组件', link: '/components/pc/button' },
      { text: 'H5 组件', link: '/components/h5/button' },
      { text: '构建教程', link: '/build/architecture' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '主题定制', link: '/guide/theming' },
          ],
        },
      ],
      '/components/': [
        { text: 'PC 组件（@react-ui/pc）', items: pcSidebar },
        { text: 'H5 组件（@react-ui/h5）', items: h5Sidebar },
      ],
      '/build/': [
        { text: '构建教程（从 0 到发布）', items: buildSidebar.map(([name, text]) => ({ text, link: `/build/${name}` })) },
      ],
    },
  },
})