import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'MyTsLib',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'zustand'],
      output: {
        globals: {}
      }
    }
  },
  plugins: [dts()]
})
