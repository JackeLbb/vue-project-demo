// 后端管理系统页面路由

const BackendRoutes = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/views/admin/index.vue')
}

export default BackendRoutes
