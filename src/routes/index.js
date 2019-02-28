import Vue from 'vue'
import Router from 'vue-router'
import FrontendRoutes from './frontend/index.js'
import BackendRoutes from './backend/index.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    FrontendRoutes,
    BackendRoutes
  ]
})
