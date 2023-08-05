import layout from '../layout/index.vue'
import LoginLayout from '../layout/loginLayout.vue'

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '/',
        name: 'index',
        meta: { title: '首页' },
        component: () => import('../views/Index.vue')
      }
    ]
  },
  {
    path: '/',
    component: LoginLayout,
    hidden: true,
    children: [
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue')
      }
    ]
  },
  {
    path: '/',
    component: LoginLayout,
    hidden: true,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
      }
    ]
  },
  {
    path: '/chart',
    component: layout,
    meta: { title: '图表' },
    children: [
      {
        path: 'gen',
        name: 'genChart',
        meta: { title: '生成图表' },
        component: () => import('../views/genChart/index.vue')
      },
      {
        path: 'list',
        name: 'chartList',
        meta: { title: '图表管理' },
        component: () => import('../views/chartManagement/index.vue')
      }
    ]
  }
]

export default routes
