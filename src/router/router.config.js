/**
 * 基础路由
 * @type { *[] }
 */
/* eslint-disable */
export const constantRouterMap = [
	{
		path: '/',
		component: () => import('@/views/layouts/index'),
		redirect: '/login',
		meta: {
			title: '登录',
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
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/login')
	},
	{
		path: '/middle',
		name: 'Middle',
		component: () => import('@/views/login/middle')
	},
	{
		path: '/phoneLogin',
		name: 'PhoneLogin',
		component: () => import('@/views/login/phoneLogin')
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/login/register')
	},
	{
		path: '/registerInfo',
		name: 'RegisterInfo',
		component: () => import('@/views/login/registerInfo')
	},
	{
		path: '/privacyPolicy',
		name: 'PrivacyPolicy',
		component: () => import('@/views/login/privacyPolicy')
	},
	{
		path: '/userAgreement',
		name: 'UserAgreement',
		component: () => import('@/views/login/userAgreement')
	},
	{
		path: '/wechatLogin',
		name: 'WechatLogin',
		component: () => import('@/views/login/wechatLogin')
	},
	{
		path: '/myFavorite',
		name: 'MyFavorite',
		component: () => import('@/views/my/myFavorite/myFavorite')
	},
	{
		path: '/myFavoriteDetail/:favoriteID',
		name: 'MyFavoriteDetail',
		component: () => import('@/views/my/myFavorite/myFavoriteDetail')
	},
	{
		path: '/wxscanResult/:wxscanResultContent',
		name: 'WxscanResult',
		component: () => import('@/views/my/wxscanResult/wxscanResult')
	},
	{
		path: '/message',
		name: 'Message',
		component: () => import('@/views/my/message/message')
	},
	{
		path: '/messageDetailsType1/:messageID',
		name: 'MessageDetailsType1',
		component: () => import('@/views/my/message/messageDetailsType1')
	},
	{
		path: '/messageDetailsType2/:messageID',
		name: 'MessageDetailsType2',
		component: () => import('@/views/my/message/messageDetailsType2')
	},
	{
		path: '/messageDetailsType3/:messageID',
		name: 'MessageDetailsType3',
		component: () => import('@/views/my/message/messageDetailsType3')
	},
	{
		path: '/housingResource',
		name: 'HousingResource',
		component: () => import('@/views/my/housingResource/housingResource')
	},
	{
		path: '/housingResourceDetails/:housingResourceID',
		name: 'HousingResourceDetails',
		component: () => import('@/views/my/housingResource/housingResourceDetails')
	},
	{
		path: '/myOrder',
		name: 'MyOrder',
		component: () => import('@/views/my/myOrder/myOrder')
	},
	{
		path: '/orderDetail/:orderID',
		name: 'OrderDetail',
		component: () => import('@/views/my/myOrder/orderDetail')
	},
	{
		path: '/myRelease',
		name: 'MyRelease',
		component: () => import('@/views/my/myRelease/myRelease')
	},
	{
		path: '/myReleaseRequireDetails/:requireID',
		name: 'MyReleaseRequireDetails',
		component: () => import('@/views/my/myRelease/myReleaseRequireDetails')
	},
	{
		path: '/setting',
		name: 'Setting',
		component: () => import('@/views/my/setting/setting')
	},
	{
		path: '/tenantRequirementsDetails/:requireInfo',
		name: 'TenantRequirementsDetails',
		component: () => import('@/views/tenantsSquare/tenantRequirementsDetails')
	},
	{
		path: '/changeCity',
		name: 'ChangeCity',
		component: () => import('@/views/tenantsSquare/changeCity')
	},
	{
		path: '/pushH5',
		name: 'PushH5',
		component: () => import('@/views/pushH5/pushH5')
	},
	{
		path: '/pushH5ResultReject',
		name: 'PushH5ResultReject',
		component: () => import('@/views/pushH5/pushH5ResultReject')
	},
	{
		path: '/pushH5ResultResolve/:housingResourceID',
		name: 'PushH5ResultResolve',
		component: () => import('@/views/pushH5/pushH5ResultResolve')
	},

];
