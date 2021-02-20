<!-- H5端页面状态：接受 -->
<template>
  <div>
    <div>
      <!-- 发布成功，等待平台审核 -->
      <div class="icon">
        <img src="../../assets/image/orderDetailDone.png" alt="" srcset="" width="110" height="110" />
      </div>
      <div class="icon-font">
        <h1>已同意</h1>
      </div>
    </div>
    <div class="content">
      <div class="title"><h1>租赁时间段：</h1></div>
      <div class="content-sub"><h2>2020/12/12 12:00 2020/12/12 18:00</h2></div>
      <div class="title"><h1>预估总收益：</h1></div>
      <div class="content-sub"><h2>200 ~ 300 元</h2></div>
      <div class="title"><h1>注意：将会有客服进行联系您</h1></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog } from 'vant'
export default {
  name: 'pushH5ResultResolve', // H5端页面（公众号模板消息点击后跳转的页面）
  components: {},
  data() {
    return {
      housingResourceID: '', // 房源ID
      favoriteID: '' // 咨询单ID
    }
  },
  computed: {},
  methods: {},
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {},
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 接收路由地址传参
    this.housingResourceID = this.$route.params.housingResourceID
    console.log(`房源ID：${this.housingResourceID}`)
  }
}
</script>
<style lang="scss" scoped>
.card {
  position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 40%;
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
  width: 45%;
  top: 45%;
  bottom: 30%;
  left: 63%;
  transform: translate(-50%, -50%);
}
.title {
  left: 5%;
}
.content {
  position: absolute;
  width: 90%;
  top: 60%;
  bottom: 10%;
  left: 55%;
  transform: translate(-50%, -50%);
   box-sizing: border-box;
}
.content-sub {
  margin-bottom: 3%;
}
</style>
