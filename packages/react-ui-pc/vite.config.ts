import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactUiPc',
      fileName: 'index',
      formats: ['es', 'cjs'],
      cssFileName: 'index',
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