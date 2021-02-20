// 手机号登录页
<template>
  <div>
    <div class="login">商家端手机号登录</div>
    <!-- 手机号、验证码输入框 -->
    <div class="wechat">
      <!-- 国家代码、输入手机号，调起手机号键盘 -->
      <van-field left-icon="phone-o"  v-model="tel" type="tel" required label="" placeholder="请输入手机号" />
      <!-- 验证码 -->
      <div class="myorder_bg">
        <van-field left-icon="bag-o" v-model="verificationCode"   required label="" placeholder="请输入验证码">
          <button
            slot="button"
            :disabled="!countdown"
            v-bind:class="[countdown ? 'reg_active' : 'reg_disActive']"
            @click="getCode"
          >
            <span v-if="countdown">{{ text }}</span>
            <span v-if="!countdown">{{ text }} ({{ count }})</span>
          </button>
        </van-field>
      </div>
      <!-- 登录按钮 -->
     <div class="loginButton">
        <van-button round type="primary" size="large">登录</van-button>
     </div>
    </div>

    <!-- 分割线 -->

    <div class="divider">
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> OR </van-divider>
    </div>
    <!-- 使用微信登录 -->
    <div class="wechatLogin">
      <van-icon class-prefix="iconfont" name="weixin"  size="70" color="#07c160" @click="toWechatLogin"/>
    </div>

    <!-- 用户协议 -->
    <div class="userAgree">
      <van-checkbox icon-size="15px" v-model="userAgreeChecked">我已阅读并同意 分时租赁</van-checkbox>
      <u @click="toUserAgreement">用户协议</u>和<u @click="toPrivacyPolicy">隐私政策</u>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'phoneLogin', // 手机号登录页
  components: {},
  data() {
    return {
      // 手机号
      tel:"",
      // 验证码
      verificationCode: '',
      countdown: true,
      count: '',
      timer: null,
      text: '发送验证码',
      // 用户协议、隐私政策
      userAgreeChecked: false
    }
  },
  computed: {},
  methods: {
    // 表单提交（登录）
    onSubmit(values) {
      console.log('submit', values)
    },
    // 路由跳转【微信登录页】
    toWechatLogin() {
      this.$router.push('/WechatLogin')
    },
    // 路由跳转【用户协议页】
    toUserAgreement() {
      this.$router.push('/UserAgreement')
    },
    // 路由跳转【隐私政策页】
    toPrivacyPolicy() {
      this.$router.push('/PrivacyPolicy')
    },
    // 获取验证码
    getCode() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.countdown = false
        this.text = '重新发送'
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.countdown = true

            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {}
}
</script>
<style scoped>
.login {
  font-weight: 200px;
  font-size: 20px;
  margin-top: 100px;
  margin-left: 20%;
}
.wechat {
  width: 80%;
  position: absolute;
  top: 30%;
  bottom: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
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
.divider {
  /* font-weight: bold; */
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginButton {
  position: absolute;
  width: 90%;
  margin-top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #07c160;
}
.wechatLogin {
position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #07c160;
}
.reg_active {
  width: 100%;
  height: 10%;
  background: #07c160;
  color: #fff;
  border: none;
}
.reg_disActive {
  width: 100%;
  height: 10%;
  /* background: #07c160; */
  color: #323233;
  border: none;
}
</style>