import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { resolve } from 'path';

import legacy from '@vitejs/plugin-legacy'
// import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 命令行参数指定 vite build --base=/my/public/path/
  plugins: [
    vue(), 
    // splitVendorChunkPlugin(), // 代码分割
    {
      // rollup插件执行时机
      ...legacy({
        targets: ['defaults', 'not IE 11']
      }),
      enforce: 'pre', // vite插件之前 post: vite构建插件之后执行；默认vite插件之后执行
      apply: 'serve', // 服务模式调用 build: 生产模式调用
    }
  ],
  // 不在node_modules中的依赖将视为源码，打包为ESM,可调整为依赖并生成deps到node_modules
  // 配置optimizeDeps.include和build.commonjsOptions.include生成cjs到node_moodules
  // 依赖改变后开发模式强制重新生成新的依赖deps, vite --force
  optimizeDeps: {
    include: ['linked-dep'],
  },
  build: {
    // 库模式 lib
    // lib: {
    //   // Could also be a dictionary or array of multiple entry points
    //   entry: resolve(__dirname, 'lib/main.js'),
    //   name: 'MyLib',
    //   // the proper extensions will be added
    //   fileName: 'my-lib',
    // },
    // rollupOptions: {
    //   // 确保外部化处理那些你不想打包进库的依赖
    //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: 'Vue',
    //     },
    //   },
    // },
    watch: {}, // vite build --watch 来启用 rollup 的监听器
    // 当启用 --watch 标志时，
    // 对 vite.config.js 的改动，以及任何要打包的文件，都将触发重新构建。
    target: 'modules',
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    rollupOptions: {
      // 多页面模式
      // input: {
      //   main: resolve(__dirname, 'index.html'),
      //   nested: resolve(__dirname, 'nested/index.html'),
      // },
      output: {
        // manualChunks: 自定义分割策略 
        // 从 Vite 2.9 起，manualChunks 默认情况下不再被更改
      },
    }, // 修改rollup底层配置
  },
  /**
   * optimizeDeps.include 或 optimizeDeps.exclude 的一个典型使用场景，是当 Vite 在源码* 中无法直接发现 import 的时候。例如，import 可能是插件转换的结果。这意味着 Vite 无法在初* 始扫描时发现 import —— 只能在文件被浏览器请求并转换后才能发现。这将导致服务器在启动后立即* 重新打包。
   * include 和 exclude 都可以用来处理这个问题。如果依赖项很大（包含很多内部模块）或者是* * * CommonJS，那么你应该包含它；如果依赖项很小，并且已经是有效的 ESM，则可以排除它，让浏览器* 直* 接加载它。
   */
})
