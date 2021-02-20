const state = {
	token: '我是token', //
	userName: '测试用户名', //
	wxUserinfo: {}, // 微信用户信息
	isLogin: false, // 是否已完成微信授权登录
};
const mutations = {
	SET_USER_NAME(state, name) {
		state.userName = name;
	},
	SET_TOKEN(state, token) {
		state.token = token;
	},
	SET_WX_USERINFO(state, wxUserinfo) {
		state.wxUserinfo = wxUserinfo;
	},
	SET_IS_LOGIN(state, isLogin) {
		state.isLogin = isLogin;
	}
};
const actions = {
	// 设置name
	setUserName({ commit }, name) {
		commit('SET_USER_NAME', name);
	},
	// 设置token
	setToken({ commit }, token) {
		commit('SET_TOKEN', token);
	},
	// 设置微信用户信息
	setWxUserinfo({ commit }, wxUserinfo) {
		commit('SET_WX_USERINFO', wxUserinfo);
	},
	// 设置是否已完成微信授权登录
	setIsLogin({ commit }, isLogin) {
		commit('SET_IS_LOGIN', isLogin);
	},
};
export default {
	state,
	mutations,
	actions
};
