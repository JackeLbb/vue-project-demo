import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []

const routerContext = require.context('./', true, /index\.js$/)

routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }

  const routerModule = routerContext(route)

  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)]
})

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
