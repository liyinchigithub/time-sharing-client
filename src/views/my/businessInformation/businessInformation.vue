// 商家信息页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="商家信息" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div class="merchantsInfo">
      <!-- 商家名称 -->

      <!-- 所在城市 -->

      <!-- 其他信息等待定 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
export default {
  name: 'businessInformation', // 商家信息页
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/home');
      // this.$router.go(-1);// 返回上一页
    }
  },
  watch: {},
  directives: {},
  mounted(){},
  beforeMount(){},
  created() {},
  beforeCreate() {
    // 获取用户登录状态
    var isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
      this.$router.push('/login')
      // Notify 失败提示
      Notify({ type: 'warning', message: '未登录请先登录账号', duration: 2000 })
    }
  }
}
</script>
<style lang="scss" scoped>
.merchantsInfo {
  margin-top: 15%;
}
.card {
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 15%;
  background-color: rgba(255, 255, 255, 0.753);
  border-width: 1px;
  /* 边线 */
  border-style: solid;
  border-color: rgb(255, 255, 255);
  /* 圆角 */
  border-radius: 20px;
  /* 背景 */
  /* background:#eee; */
  /* 卡片内部间距，单位 px */
  padding: 5px;
}
</style>