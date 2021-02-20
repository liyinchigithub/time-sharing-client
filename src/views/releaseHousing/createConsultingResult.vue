// 发布结果页
<template>
  <div>
    <!-- 发布成功，等待平台审核 -->
    <div class="icon">
      <img src="../../assets/image/releaseHousingResult.png" alt="" srcset="" width="110" height="110" />
    </div>
    <div class="icon-font">
      <h1>发布成功</h1>
    </div>
    <!-- 继续发布按钮 -->
    <div class="continue-to-release">
      <van-button type="info" size="normal" @click="continueToRelease" style="width: 130px">继续发布</van-button>
    </div>
    <!-- 回到首页 -->
    <div class="to-home">
      <van-button type="info" size="normal" @click="toHome" plain style="width: 130px">回到首页</van-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import {  Notify } from 'vant'
export default {
  name: 'releaseHousingResult', // 发布结果页(咨询单)
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    // 路由跳转（继续发布)
    continueToRelease() {
      this.$router.push('/createFavorite')
    },
    // 路由跳转（回到首页）
    toHome() {
      this.$router.push('/home')
    }
  },
  watch: {},
  directives: {},
  created() {},
  beforeCreate() {
    // 获取用户登录状态
    var isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
      this.$router.push('/login')
      // Notify 失败提示
      Notify({ type: 'warning', message: '未登录请先登录账号', duration: 2000 })
    }
  },
  mounted() {},
  beforeMount() {}
}
</script>
<style scoped>
.icon {
  position: absolute;
  width: 50%;
  top: 30%;
  bottom: 30%;
  left: 62%;
  transform: translate(-50%, -50%);
}
.icon-font {
  position: absolute;
  width: 50%;
  top: 45%;
  bottom: 30%;
  left: 63%;
  transform: translate(-50%, -50%);
}
.continue-to-release {
  position: absolute;
  width: 50%;
  top: 55%;
  bottom: 30%;
  left: 40%;
  transform: translate(-50%, -50%);
}
.to-home {
  position: absolute;
  width: 50%;
  top: 55%;
  bottom: 30%;
  left: 80%;
  transform: translate(-50%, -50%);
}
</style>