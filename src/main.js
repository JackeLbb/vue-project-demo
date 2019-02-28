import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js' // vue-router
import store from './stores/store' // vuex
import 'normalize.css/normalize.css' // 样式初始化 resets
import ElementUI from '@/config/element-ui.js'
import '@/assets/style/index.scss' // 全局公用样式
import '@/utils/dateFormatter.js'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
