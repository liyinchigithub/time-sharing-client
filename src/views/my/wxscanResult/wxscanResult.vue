 
// 微信扫一扫结果页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="扫描结果" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div class="result">二维码扫码结果：</div>
    <div class="result">{{ this.wxscanResult }}</div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast } from 'vant'
import axios from 'axios'
export default {
  name: 'wxscanResult', // 微信扫一扫结果页
  components: {},
  data() {
    return {
      wxscanResult: '' //
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回我的页面）
    onClickLeft() {
      this.$router.go(-1) // 返回上一页
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {},
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 接收路由地址参数（扫一扫结果内容）
    this.wxscanResult = this.$route.params.wxscanResultContent
  }
}
</script>
<style scoped>
.result {
  font-weight: 200px;
  font-size: 20px;
  margin-top: 15%;
  margin-bottom: 15%;
  margin-left: 10%;
}
</style>
