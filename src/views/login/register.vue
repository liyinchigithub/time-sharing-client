// 手机号注册页(首次登录，租客微信授权后，进行绑定手机号码)
<template>
  <div>
    <div class="login">为了商家更好的联系您，请完善信息</div>
    <div class="login">请完善信息</div>
    <!-- 手机号、验证码输入框 -->
    <div class="wechat">
      <!-- 国家代码、输入手机号，调起手机号键盘 -->
      <van-field
        left-icon="phone-o"
        size="large"
        v-model="mobile"
        type="tel"
        required
        label=""
        placeholder="请输入手机号"
      />
      <!-- 验证码 -->
      <div class="myorder_bg">
        <van-field
          left-icon="bag-o"
          size="large"
          v-model="verificationCode"
          required
          label=""
          placeholder="请输入验证码"
        >
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
      <!-- 开关 -->
      <div class="switch">
        <van-cell center title="保存此号码供以后授权使用">
          <template #right-icon>
            <van-switch v-model="checked" size="24" />
          </template>
        </van-cell>
      </div>
      <!-- 完成按钮 -->
      <div class="done">
        <van-button round type="info" size="large" @click="onSubmit">完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, Switch, Field, Cell, CellGroup } from 'vant'
import { getVerifyCode, bindPhone } from '@/api/register/register.js' // 引入后端api
import axios from 'axios'
export default {
  name: 'register', // 手机号注册页
  components: {},
  data() {
    return {
      // 手机号
      mobile: '',
      // 验证码
      verificationCode: '',
      countdown: true,
      count: '',
      timer: null,
      text: '发送验证码',
      // 开关
      checked: true
    }
  },
  computed: {},
  methods: {
    // 表单提交（完成）
    onSubmit() {
      // 判断手机号码输入框和验证码输入框是否为空
      if (this.mobile === '' || this.verificationCode === '') {
        // Notify 失败提示
        Notify({ type: 'warning', message: '请填写完整', duration: 2000 })
      } else {
        var data = new FormData()
        data.append('mobile', this.mobile)
        data.append('code', this.verificationCode)
        // 获取OpenID
        var headers = { OpenID: window.localStorage.getItem('OpenID') }
        bindPhone(data, headers)
          .then(response => {
            console.log(JSON.stringify(response.data))
            if (response.msg === '操作成功' || response.code === 0) {
              console.log(`绑定信息：${JSON.stringify(response.data)}`)
              // Notify 成功提示
              Notify({ type: 'success', message: '绑定成功', duration: 2000 })
              // 路由跳转（完善信息页）
              this.$router.push('/registerInfo')
            } else if (response.msg === '验证码错误' || response.code === 500) {
              // Notify 成功提示
              Notify({ type: 'warning', message: '验证码错误', duration: 2000 })
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 获取验证码
    getCode() {
      // 判断手机号码输入框是否为空
      if (this.mobile === '') {
        // 弹出填写手机号码输入提示
        Notify({ type: 'warning', message: '请输入手机号码', duration: 2000 })
      } else {
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
          // TODO 请求后端接口，像输入框手机号码发送验证码
          getVerifyCode({ mobile: this.mobile })
            .then(response => {
              // 判断是否登录成功
              console.log('response.data', response.data)
              if (response.msg !== '操作成功' || response.code !== 0) {
                // Notify 失败提示
                Notify({ type: 'warning', message: '获取验证码失败，请联系管理员', duration: 2000 })
              } else {
                console.log(`验证码信息：${JSON.stringify(response.data)}`)
                Notify({ type: 'success', message: '短信验证码,发送成功', duration: 2000 })
              }
            })
            .catch(err => {
              console.log(err)
              // Notify 失败提示
              Notify({ type: 'warning', message: '获取验证码失败，请联系管理员', duration: 2000 })
            })
        }
      }
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {
    window.location.href("https://pms.bchat.top/customer/#/register")
  },
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

.switch {
  font-size: 15px;
  position: absolute;
  width: 90%;
  margin-top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.done {
  font-size: 15px;
  position: absolute;
  width: 90%;
  margin-top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #409eff;
}
.wechatLogin {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #409eff;
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