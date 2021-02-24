// 中间页
<template>
  <div>
    <!-- 栅格 -->
    <div class="wx-login-loading">
      <van-skeleton title avatar :row="5" />
      <van-skeleton title avatar :row="5" />
      <van-skeleton title avatar :row="5" />
      <van-skeleton title avatar :row="5" />
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="OverlayShow" @click="show = false" />
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Skeleton, Notify } from 'vant'
import { wxGetWXCode } from '@/api/login/login.js' // 引入后端api
import { getUserInfo } from '@/api/my/userinfo/userinfo.js'
import config from '../../config/index' // 引入环境配置参数
export default {
  name: 'middle', // 中间页（loading页）
  components: {},
  data() {
    return {
      OverlayShow: false
    }
  },
  computed: {},
  methods: {},
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {
    // 显示遮罩层
    this.OverlayShow = true
    //
    Notify({
      type: 'primary',
      message: '登录中',
      duration: 2000
    })

    // TODO 创建组件时，加载第1页数据
    this.$options.methods.getroadList

    // 微信授权登录，截取回调地址code参数，拦截回调redirect_uri的code(指定的url页面中去截取url上拼接的code 发给自己的服务器)
    const getUrlParam = name => {
      // 给定URL参数名称取得对应的参数
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      if (reg.test(location.search.substr(1))) {
        return decodeURIComponent(RegExp.$2)
      } else if (reg.test(location.hash.substr(location.hash.indexOf('?') + 1))) {
        return decodeURIComponent(RegExp.$2)
      } else {
        return ''
      }
    }
    // 拦截回调redirect_uri的code
    var code = getUrlParam('code')
    console.log('获取到的code值', code)
    // 向后端接口/code 发起请求（后端获取到access_token返回用户信息给前端，access_token一般不给前端）
    wxGetWXCode(code)
      .then(response => {
        // 判断是否登录成功
        console.log('response.data', response)
        if (response.msg !== '操作成功' || response.code !== 0) {
          // 出现errcode说明没有获取到userinfo
          // alert(JSON.stringify(response.data))
          // alert(JSON.stringify(response.msg))
          // alert(JSON.stringify(response.code))
          // Notify 失败提示
          Notify({ type: 'warning', message: '微信授权登录失败，请联系管理员', duration: 2000 })
          alert(JSON.stringify(response))
          this.$router.push('/login')
        } else {
          console.log(`用户信息：${JSON.stringify(response.data)}`)
          // 存储用户信息data至vuex state中（Action 通过 store.dispatch 方法触发） 遇到问题：用户一刷新vuex 数据全部没了，所以我改成存储到
          this.$store.dispatch('setWxUserinfo', response.data)
          // 存储用户信息userinfo、openid至localStorage
          localStorage.setItem('wxUserinfo', JSON.stringify(response.data)) // cookie、locationStorage、localStorage必须都是字符串
          localStorage.setItem('OpenID', response.data.openId) // cookie、locationStorage、localStorage必须都是字符串
          // 存储用户登录状态
          localStorage.setItem('isLogin', 'yes')
          // TODO 请求后端接口，判断是否注册（）
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          // 判断是否租客端
          if (this.$route.query.isCustomer) {
            // 是租客端
            // 发起请求
            getUserInfoCustomer(headers)
              .then(getUserInfoResponse => {
                console.log(JSON.stringify(getUserInfoResponse))
                // alert(getUserInfoResponse.hasOwnProperty('data'))
                // 未注册（路由跳转进入注册页=>完善手机页）通过判断响应body是否包含data，包含data说明已注册绑定手机号
                if (!getUserInfoResponse.hasOwnProperty('data')) {
                  this.$router.push('/register')
                } else {
                  console.log(JSON.stringify(getUserInfoResponse))
                  // 已注册（提交商家名称和联系方式）,路由跳转（首页）
                  // this.$router.push('/home')// 这边使用路由跳转，url会显示回调code参数，后续路由跳转仍带着这个参数
                  window.location.href = `${config.baseUrl}/#/home` // 注意：这边使用路径是含customer，不用${config.baseUrl}
                }
              })
              .catch(error => {
                console.log(error)
                alert(error)
              })
          } else {
            // 不是租客端
            // 发起请求
            getUserInfo(headers)
              .then(getUserInfoResponse => {
                console.log(JSON.stringify(getUserInfoResponse))
                // alert(getUserInfoResponse.hasOwnProperty('data'))
                // 未注册（路由跳转进入注册页=>完善手机页）通过判断响应body是否包含data，包含data说明已注册绑定手机号
                if (!getUserInfoResponse.hasOwnProperty('data')) {
                  this.$router.push('/register')
                } else {
                  console.log(JSON.stringify(getUserInfoResponse))
                  // 已注册（提交商家名称和联系方式）,路由跳转（首页）
                  // this.$router.push('/home')// 这边使用路由跳转，url会显示回调code参数，后续路由跳转仍带着这个参数
                  window.location.href = `https://pms.bchat.top/#/home`
                }
              })
              .catch(error => {
                console.log(error)
                alert(error)
              })
          }
        }
      })
      .catch(err => {
        console.log(err)
        // 如果授权失败
        // Notify 失败提示
        Notify({ type: 'warning', message: '登录超时,请重新登录', duration: 2000 })
        alert(err)
        // 路由跳转登录页
        // this.$router.push('/login')
      })
  },
  beforeMount() {},
  mounted() {},
  destroyed() {
    // 隐藏遮罩层
    this.OverlayShow = false
  }
}
</script>
<style scoped>
.login {
  font-weight: 200px;
  font-size: 20px;
  margin-top: 20%;
  margin-left: 20%;
}
.wechatAuthor {
  position: absolute;
  top: 40%;
  bottom: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.usePhoneLogin {
  border-width: 0px;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 99px;
  height: 20px;
  display: flex;
  font-family: 'PingFangSC-Thin', 'PingFang SC Thin', 'PingFang SC';
  font-weight: 200;
  font-style: normal;
  font-size: 14px;
}
/* 没有账号，前往 */
.register {
  font-size: 20px;
  border-width: 0px;
  position: absolute;
  top: 54%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 230px;
  height: 25px;
  display: flex;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  font-weight: 650;
  font-style: normal;
}
/* 没有账号，前往“注册” */
.register2 {
  color: rgb(70, 179, 241);
  font-size: 21px;
  border-width: 0px;
  position: absolute;
  top: 54%;
  left: 69%;
  transform: translate(-50%, -50%);
  height: 25px;
  display: flex;
  font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
  font-weight: 650;
  font-style: normal;
}
.userAgree {
  border-width: 0px;
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 17px;
  display: flex;
  font-family: 'PingFangSC-Regular', 'PingFang SC';
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
/* 引入第三方或自定义的字体图标样式 */
</style>