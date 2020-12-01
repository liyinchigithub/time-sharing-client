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
  },{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login')
  },{
    path: '/phoneLogin',
    name: 'PhoneLogin',
    component: () => import('@/views/login/phoneLogin')
  },{
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register')
  },{
    path: '/wechatLogin',
    name: 'WechatLogin',
    component: () => import('@/views/login/wechatLogin')
  },{
    path: '/wechatLoginOther',
    name: 'WechatLoginOther',
    component: () => import('@/views/login/wechatLoginOther')
  },{
    path: '/about',
    name: 'About',
    component: () => import('@/views/my/about/about')
  },{
    path: '/changeCity',
    name: 'ChangeCity',
    component: () => import('@/views/merchantsSquare/changeCity')
  },{
    path: '/clientBusinessDetails',
    name: 'ClientBusinessDetails',
    component: () => import('@/views/merchantsSquare/clientBusinessDetails')
  },{
    path: '/requirementRelease',
    name: 'RequirementRelease',
    component: () => import('@/views/merchantsSquare/requirementRelease')
  },{
    path: '/requirementReleaseSuccess',
    name: 'RequirementReleaseSuccess',
    component: () => import('@/views/merchantsSquare/requirementReleaseSuccess')
  },{
    path: '/collection',
    name: 'Collection',
    component: () => import('@/views/my/collection/collection')
  },{
    path: '/iRelease',
    name: 'IRelease',
    component: () => import('@/views/my/iRelease/iRelease')
  },{
    path: '/confirmationMessage',
    name: 'CnfirmationMessage',
    component: () => import('@/views/my/message/confirmationMessage')
  },{
    path: '/message',
    name: 'Message',
    component: () => import('@/views/my/message/message')
  },{
    path: '/myOrder',
    name: 'MyOrder',
    component: () => import('@/views/my/myOrder/myOrder')
  },{
    path: '/orderDetailObligation',
    name: 'OrderDetailObligation',
    component: () => import('@/views/my/myOrder/orderDetailObligation')
  },{
    path: '/orderDetailToBeUsed',
    name: 'OrderDetailToBeUsed',
    component: () => import('@/views/my/myOrder/orderDetailToBeUsed')
  },{
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/my/setting/setting')
  }
]
