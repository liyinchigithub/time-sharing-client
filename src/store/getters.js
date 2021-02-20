const getters = {
  userName: state => state.app.userName,
  token: state => state.app.token,
  wxUserinfo: state => state.app.wxUserinfo, // 获取微信用户信息
  isLogin: state => state.app.isLogin, // 是否登录

}
export default getters
