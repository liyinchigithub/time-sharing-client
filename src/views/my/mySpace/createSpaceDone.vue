// 创建空间完成
<template>
  <div>
    <!-- 发布成功，等待平台审核 -->
    <div class="icon">
      <img src="../../../assets/image/releaseHousingResult.png" alt="" srcset="" width="110" height="110" />
    </div>
    <div class="icon-font">
      <h1>创建成功</h1>
    </div>
    <!-- 查看空间按钮 -->
    <div class="continue-to-release">
      <van-button type="info" size="normal" @click="viewSpace" style="width: 130px">查看空间</van-button>
    </div>
    <!-- 创建房间按钮 -->
    <div class="to-home">
      <van-button type="info" size="normal" @click="toCreateRoom" plain style="width: 130px">创建房间</van-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
export default {
  name: 'createSpaceDone', // 创建空间完成
  components: {},
  data() {
    return {
      spaceID: '' // 空间完成页，空间ID
    }
  },
  computed: {},
  methods: {
    // 路由跳转（查看空间)
    viewSpace() {
      this.$router.push(`/spaceDetaily/${this.spaceID}`)
    },
    // 路由跳转（创建房间）
    toCreateRoom() {
      this.$router.push(`/createRoom/${this.spaceID}`)
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
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 接收路由地址传参
    this.spaceID = this.$route.params.spaceID
    console.log(`空间ID：${this.spaceID}`)
  }
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