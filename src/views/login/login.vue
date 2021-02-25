// 登录页
<template >
  <div>
    <div class="wxlogin">
      <div class="oreal-hra-content">
        <div class="login">租客端登录</div>
        <!-- 注册/登录 -->
        <div class="wechatAuthor">
          <van-button round size="large" plain type="primary" style="width: 320px" @click="toWechatLogin"
            ><img src="../../assets/image/wechat.png" width="22px" height="22px" />
            <span style="font-size: 22px">微信登录</span></van-button
          >
        </div>
        <!-- 用户协议 -->
        <div class="userAgree">
          <van-checkbox icon-size="15px" v-model="userAgreeChecked">我已阅读并同意 分时租赁</van-checkbox>
          <u @click="toUserAgreement">用户协议</u>和<u @click="toPrivacyPolicy">隐私政策</u>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import common from '../../utils/common'
import { Toast, Dialog,Notify } from 'vant'
import config from '../../config/index' // 引入环境配置参数
export default {
  name: 'login', // 登录页
  components: {},
  data() {
    return {
      userAgreeChecked: false // 用户协议、隐私政策
      // appid: config.APPID, // 微信公众号APPID
      // secret: '' // 微信公众号APP秘钥
    }
  },
  computed: {},
  methods: {
    // 路由跳转【注册页】
    toRegister() {
      this.$router.push('/Register')
    },
    // 路由跳转【微信登录页】
    toWechatLogin() {
      if (this.userAgreeChecked === false) {
        Dialog.alert({
          title: '',
          message:
            '尊敬的用户，您需要阅读并同意用户协议才能开始使用，请勾选"用户协议"和"隐私协议"，表示您已阅读并同意协议',
          theme: 'round-button',
          confirmButtonColor: '#409EFF'
        }).then(() => {
          // on close
        })
      } else {
        // 判断是否勾选用户协议和隐私政策
        /**
         * @description 前端请求微信开放平台（微信登录授权接口，回调code）
         * @param appid 微信公众号appid
         * @param redirect_url 微信授权流程，获取code回调地址
         * */
        // 用户触发发起授权链接
        var appid = config.APPID
        var redirect_uri = encodeURIComponent(`https://pms.bchat.top/#/middle/1`) // code回调地址（vue mode bash要带#），注意：这边回调地址和商家端一致不要引用.
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        // this.$router.push('/home') // 产品看时使用

        // 请求后端接口，判断新老用户（是否需要绑定）
        // TODO 已获取授权成功（是老用户进入首页）
        // var isOldUser = true
        // if (isOldUser) {
        //   this.$router.push('/home')
        // } else {
        //   // TODO 不是老用户，进行微信登录授权，绑定手机号
        //   this.$router.push('/registerInfo')
        // }

        // TODO 用户如果拒绝授权处理
        // this.$router.push('/home')
      }
    },
    // 路由跳转【用户协议页】
    toUserAgreement() {
      this.$router.push('/UserAgreement')
    },
    // 路由跳转【隐私政策页】
    toPrivacyPolicy() {
      this.$router.push('/PrivacyPolicy')
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.wxlogin {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  background: url('../../assets/image/login.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  // z-index: 1000000011;

  
}
.login {
  color: #ffffff;
  font-weight: 200px;
  font-size: 20px;
  margin-top: -240%;
  margin-left: -100%;
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
  left: 55%;
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