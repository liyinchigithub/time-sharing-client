/**
 * 基础路由
 * @type { *[] }
 */
/* eslint-disable */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '商家广场',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '商家广场', keepAlive: false }
      },
      {
        path: '/housingMatch',
        name: 'HousingMatch',
        component: () => import('@/views/home/housingMatch'),
        meta: { title: '房源匹配', keepAlive: false }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/home/my'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  }
]
