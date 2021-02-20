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
				meta: { title: '租客广场', keepAlive: false }
			},
			{
				path: '/release',
				name: 'Release',
				component: () => import('@/views/home/release'),
				meta: { title: '发布', keepAlive: false }
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
		path: '/about',
		name: 'About',
		component: () => import('@/views/my/about/about')
	},
	{
		path: '/businessInformation',
		name: 'BusinessInformation',
		component: () => import('@/views/my/businessInformation/businessInformation')
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
		path: '/spaceList',
		name: 'SpaceList',
		component: () => import('@/views/my/mySpace/spaceList')
	},
	{
		path: '/createSpace',
		name: 'CreateSpace',
		component: () => import('@/views/my/mySpace/createSpace')
	},
	{
		path: '/editSpace/:spaceID',
		name: 'EditSpace',
		component: () => import('@/views/my/mySpace/editSpace')
	},
	{
		path: '/spaceDetaily/:spaceID',
		name: 'SpaceDetaily',
		component: () => import('@/views/my/mySpace/spaceDetaily')
	},
	{
		path: '/createSpaceDone/:spaceID',
		name: 'CreateSpaceDone',
		component: () => import('@/views/my/mySpace/createSpaceDone')
	},
	{
		path: '/createRoom/:spaceID',
		name: 'CreateRoom',
		component: () => import('@/views/my/mySpace/createRoom')
	},
	{
		path: '/roomDetaily/:spaceID/:roomID',
		name: 'RoomDetaily',
		component: () => import('@/views/my/mySpace/roomDetaily')
	},
	{
		path: '/createRoomDone/:spaceID/:roomID',
		name: 'CreateRoomDone',
		component: () => import('@/views/my/mySpace/createRoomDone')
	},
	{
		path: '/roomList/:spaceID',
		name: 'RoomList',
		component: () => import('@/views/my/mySpace/roomList')
	},
	{
		path: '/setting',
		name: 'Setting',
		component: () => import('@/views/my/setting/setting')
	},
	{
		path: '/releaseHousing',
		name: 'ReleaseHousing',
		component: () => import('@/views/releaseHousing/releaseHousing')
	},
	{
		path: '/releaseHousingResult',
		name: 'ReleaseHousingResult',
		component: () => import('@/views/releaseHousing/releaseHousingResult')
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
	// 租户端
	{
		path: '/housingMatch',
		name: 'HousingMatch',
		component: () => import('@/views/other/housingMatch')
	},
	{
		path: '/orderUser/:housingResourceID/:spaceID/:roomID',
		name: 'OrderUser',
		component: () => import('@/views/other/orderUser')
	},
	{
		path: '/housingResourceDetailsUser/:housingResourceID/:spaceID/:roomID',
		name: 'HousingResourceDetailsUser',
		component: () => import('@/views/other/housingResourceDetailsUser')
	},
	{
		path: '/myCollection',
		name: 'MyCollection',
		component: () => import('@/views/other/myCollection')
	},
	{
		path: '/merchantsDetaily/:merchantsDetaily',
		name: 'MerchantsDetaily',
		component: () => import('@/views/other/merchantsDetaily')
	},
	{
		path: '/merchantsRoomList/:merchantsID',
		name: 'MerchantsRoomList',
		component: () => import('@/views/other/merchantsRoomList')
	},
	{
		path: '/merchantsRoomDetaily/:roomID',
		name: 'MerchantsRoomDetaily',
		component: () => import('@/views/other/merchantsRoomDetaily')
	},
	{
		path: '/myRelease/',
		name: 'MyRelease',
		component: () => import('@/views/other/myRelease')
	}
];
