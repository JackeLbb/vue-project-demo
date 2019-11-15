// news/index.js
export default [
  {
    path: '/product',
    component: () => import(/* webpackChunkName */ '@/views/product/index.vue')
  }
]
