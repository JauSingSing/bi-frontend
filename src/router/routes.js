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
  }
]

export default routes
