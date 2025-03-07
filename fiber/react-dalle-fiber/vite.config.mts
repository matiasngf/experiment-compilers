import { resolve as rs } from 'path'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-jscad-fiber',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
          // 'react-reconciler': 'ReactReconciler'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': rs(__dirname, './src')
    }
  },
  plugins: [dts()]
})
