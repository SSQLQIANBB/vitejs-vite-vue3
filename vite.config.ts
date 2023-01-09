import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// import basicSsl from '@vitejs/plugin-basic-ssl';

import legacy from '@vitejs/plugin-legacy';
// import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vitejs-vite-vue3/', // 命令行参数指定 vite build --base=/my/public/path/
  plugins: [
    vue(),
    // splitVendorChunkPlugin(), // 代码分割
    {
      // rollup插件执行时机
      ...legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      enforce: 'pre', // vite插件之前 post: vite构建插件之后执行；默认vite插件之后执行
      apply: 'serve', // 服务模式调用 build: 生产模式调用
    },
    // basicSsl(), // ssl证书
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
    // 修改rollup底层配置
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
    },
  },
  /**
   * optimizeDeps.include 或 optimizeDeps.exclude 的一个典型使用场景，是当 Vite 在源码* 中无法直接发现 import 的时候。例如，import 可能是插件转换的结果。这意味着 Vite 无法在初* 始扫描时发现 import —— 只能在文件被浏览器请求并转换后才能发现。这将导致服务器在启动后立即* 重新打包。
   * include 和 exclude 都可以用来处理这个问题。如果依赖项很大（包含很多内部模块）或者是* * * CommonJS，那么你应该包含它；如果依赖项很小，并且已经是有效的 ESM，则可以排除它，让浏览器* 直* 接加载它。
   */

  // 如果你的 SSR 项目不能使用 ESM
  // legacy: {
  //   buildSsrCjsExternalHeuristics: true,
  // }

  publicDir: 'public', // 静态资源路径
  cacheDir: './catch-vite', // 依赖缓存文件
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(process.cwd(), '.', 'src') + '/',
      },
    ],
    // dedupe: ['vue'],
    // 扩展名
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    modules: {
      scopeBehaviour: 'global',
      localsConvention: 'camelCase',
    },
    devSourcemap: true,
  },
  // esbuild
  // esbuild: {
  //   jsxFactory: 'h',
  //   jsxFragment: 'Fragment',
  //   include: [],
  //   exclude: [],
  // },
  // 静态资源处理
  // assetsInclude: string | RegExp | (string | RegExp)[]
  logLevel: 'info', // 控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  clearScreen: true, // 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息，命令行 --clearScreen false
  envDir: 'envConfig', // .env.*文件目录
  envPrefix: 'VITE_', // 以 envPrefix 开头的环境变量会通过 import.meta.env 暴露在你的客户端源码中。
  appType: 'spa', // 应用类型

  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false, // 端口占用尝试下一个可用端口
    // https: true,
    open: 'localhost:8080',
    proxy: {},
    // 开发服务器配置cors `boolean | CorsOptions`
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
    // 指定服务器响应的 header
    headers: {},
    base: '/config', // ???
    // 定义开发调试阶段生成资产的 origin
    origin: 'localhost:8089'
  },
  // server: {
    //   watch: {
    //     ignored: ['!**/node_modules/your-package-name/**'],
    //   },
    // },
    // // 被监听的包必须被排除在优化之外，
    // // 以便它能出现在依赖关系图中并触发热更新。
    // optimizeDeps: {
    //   exclude: ['your-package-name'],
    // },
});
