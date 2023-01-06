<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import ImgRaw from '/vite.svg?raw' // 文件
import Img from '/vite.svg?url' // url
import inline from './styles/inline.module.css?inline'; // 禁用css

console.log('url-IMG', Img)

/**
 * 功能
 */


// 使用 import.meta.glob 访问文件
const modules = import.meta.glob('./styles/*.css');

// for(let path in modules) {
//   modules[path]().then(m => {
//     console.log(path, m);
//   })
// }

const jsModules = import.meta.glob('./utils/*.js', 
{ 
  eager: true, // 直接引入所有的模块（例如依赖于这些模块中的副作用首先被应用）
  // as: 'raw', //  以字符串形式导入资源 url: 以url形式引入
})

console.log(jsModules);

// 多匹配模式 const modules = import.meta.glob(['./dir/*.js', './another/*.js'])

// 只想要导入模块中的部分内容，那么可以利用 import 选项。 const modules = import.meta.glob('./utils/*.js', { import: 'a', })

// 使用 query 选项来提供对导入的自定义查询，以供其他插件使用


/**
 * Reflect
 */
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    // console.log(target)
    return target[prop] // (*) target = user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};
console.log('name', admin.name)

</script>

<template>
  <div>
    <p :class="inline.red" >css-module-inline</p>
    <!-- <a href="https://vitejs.dev" target="_blank">
      <img :src="Img" class="logo" alt="Vite logo" />
    </a> -->
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
