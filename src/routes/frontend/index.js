// 前端页面路由

const FrontendRoutes = {
  path: '/',
  name: 'oneMap',
  component: () => import('@/views/frontend/index.vue'), // 前端home页面，
  redirect: '/oneMap/',
  children: [{
    path: '',
    name: 'oneMap',
    component: () => import('@/views/frontend/oneMap/index.vue')
  }]
}

export default FrontendRoutes
