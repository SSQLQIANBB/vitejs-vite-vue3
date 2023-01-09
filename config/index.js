import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode, ssrBuild }) => {
  // if (command === 'serve') {}

  const env = loadEnv(mode, process.cwd(), '')

  return {
    // root: '',
    // base: '', // vite build --base=/my/public/path/
    // mode: '', // --mode=staging
    // plugins: [], // 插件 (Plugin | Plugin[] | Promise<Plugin | Plugin[]>)[]
    publicDir: 'public',
    define: {
      // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
      _APP_ENV_: env.KEY
    }
  }
})
