 
// 微信扫一扫结果页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div class="result">
      {{wxscanResult}}
    </div>
   
  </div>
</template>

<script>
/* eslint-disable */
import { Toast } from 'vant'
import { modifyCustomerInformation } from '@/api/register/register.js'
import { getUserInfo } from '@/api/my/userinfo/userinfo.js'
import axios from 'axios'
export default {
  name: 'wxscanResult', // 微信扫一扫结果页
  components: {},
  data() {
    return {
      wxscanResult: '', // 
    }
  },
  computed: {},
  methods: {
   
    // 路由跳转（返回我的页面）
    onClickLeft() {
      this.$router.go(-1);// 返回上一页
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {
    this.wxscanResult=this.$route.params.wxscanResult;
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  }
}
</script>
<style scoped>
.info {
  font-weight: 200px;
  font-size: 20px;
  margin-top: 15%;
  margin-bottom: 15%;
  margin-left: 10%;
}
.userIcon {
  font-weight: 200px;
  font-size: 20px;
  top: 20%;
  margin-left: 40%;
  margin-bottom: 15%;
}
.registerForm {
  font-weight: 200px;
  font-size: 20px;
  width: 90%;
  position: absolute;
  top: 40%;
  margin-bottom: 15%;
  bottom: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
