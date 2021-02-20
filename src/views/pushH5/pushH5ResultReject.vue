<!-- H5端页面状态:拒绝 -->
<template>
  <div>
    <div>
      <div class="icon">
        <img src="../../assets/image/H5HasEnded.png" alt="" srcset="" width="110" height="110" />
      </div>
      <div class="icon-font">
        <h1>已结束</h1>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog } from 'vant'
export default {
  name: 'pushH5ResultReject', // H5端页面（公众号模板消息点击后跳转的页面）
  components: {},
  data() {
    return {}
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
  width:45%;
  top: 45%;
  bottom: 30%;
  left: 63%;
  transform: translate(-50%, -50%);
}

</style>
