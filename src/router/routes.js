import layout from '../layout/index.vue'

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
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'genChart',
        name: 'genChart',
        meta: { title: '生成图表' },
        component: () => import('../views/genChart/index.vue')
      }
    ]
  }
]

export default routes
