// news/index.js
export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName */ '@/views/news/index.vue')
  }
]
