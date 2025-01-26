import { defineConfig } from 'vite'
import { resolve as rs } from 'path'
import dts from 'vite-plugin-dts'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import nodeExternals from 'rollup-plugin-node-externals'

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: rs(__dirname, 'src/index.ts'),
      name: 'react-ascii',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    sourcemap: mode === 'development',
    minify: mode !== 'development',
    rollupOptions: {
      // external: [
      //   'react',
      //   'zustand',
      //   'path',
      //   'process',
      //   'fs',
      //   'node:path',
      //   'node:process',
      //   'node:fs'
      // ],
      output: {},
      plugins: [nodeExternals({ peerDeps: true, devDeps: true })]
    }
  },
  resolve: {
    alias: {
      '@': rs(__dirname, './src')
    }
  },
  plugins: [dts()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}))
