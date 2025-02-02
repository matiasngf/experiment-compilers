// import { defineConfig } from 'vite'
import { resolve as rs } from 'path'
// import dts from 'vite-plugin-dts'
// // import babel from 'rollup-plugin-babel'
// // import nodeExternals from 'rollup-plugin-node-externals'
// // import path from 'path'

// export default defineConfig(({ mode }) => ({
//   build: {
//     lib: {
//       entry: rs(__dirname, 'src/index.ts'),
//       name: 'react-ascii',
//       fileName: 'index',
//       formats: ['es', 'cjs']
//     },
//     emptyOutDir: false,
//     target: 'es2018',
//     // sourcemap: mode === 'development',
//     minify: mode !== 'development',
//     rollupOptions: {
//       output: {
//         globals: {
//           react: 'React',
//           'react-reconciler': 'ReactReconciler'
//         }
//       },

//       external: [
//         'react',
//         'react-reconciler',
//         // 'zustand',
//         'path',
//         'process',
//         'fs',
//         'node:path',
//         'node:process',
//         'node:fs'
//       ]
//     }
//   },
//   resolve: {
//     alias: {
//       '@': rs(__dirname, './src')
//     }
//   },
//   plugins: [
//     dts({
//       rollupTypes: true // Roll up declaration files
//     })
//     // babel({
//     //   exclude: 'node_modules/**'
//     // })
//   ]
//   // define: {
//   //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
//   // }
// }))

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-ascii',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-reconciler'],
      output: {
        globals: {
          react: 'React',
          'react-reconciler': 'ReactReconciler'
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
