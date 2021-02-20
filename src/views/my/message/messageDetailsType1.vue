// 消息详情页（咨询单回执）
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="消息详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 消息类型：咨询单回执 -->
    <div class="card">
      <div>
        <div class="cardRow"><span>【消息类型】：咨询单回执</span></div>
        <div class="cardRow"><span>【发送时间】：2020/12/12 12:23</span></div>
        <div class="cardRow"><span>【来源用户】：1762389923</span></div>
        <div class="cardRow"><span>【咨询结果】：同意</span></div>
        <div class="cardRow"><span>【租赁时间段】：</span></div>
        <div class="cardRowValue"><span>2020/12/12 12:00~2020/12/12 18:00</span></div>
        <div class="cardRow"><span>【预估总收益】：200 ~ 300 元</span></div>
      </div>
    </div>
    <div style="margin-left: 40px; margin-top: 40px; margin-bottom: 10px; font-size: 20px">关联房源</div>
    <div class="card2">
      <!-- TODO -->
      <van-row>
        <van-col span="8" class="col">
          <img
            src="https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg"
            alt="暂无图片"
            width="100px"
            height="100px"
          />
        </van-col>
        <van-col span="10" class="col">
          <!-- 关联房源名称 -->
          {{ associatedHousingResourceName }}</van-col
        >
        <van-col span="11" class="col">
          <!-- 关联房源 -->
          <div style="color: red; font-size: 20px">{{ associatedHousingResourcePrice }}</div></van-col
        >
      </van-row>
      <van-row>
        <van-col span="25" class="col">
          <!-- 关联房源租赁时间段 -->
          【租赁时间段】
        </van-col>
        <van-col span="25" class="col">
          {{ associatedHousingLeasableTime }}
        </van-col>

        <van-col span="25" class="col">
          <!-- 关联房源标签 -->
          <div class="cardTag" v-for="(tag, index) in associatedHousingResourceTags" :key="index">
            <!-- <van-icon class-prefix="iconfont" name="youhui" style="color: bule" /> -->
              <Tag color="blue"><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog,Notify } from 'vant'
export default {
  name: 'messageDetails', // 消息详情页（咨询单回执）
  components: {},
  data() {
    return {
      favoriteID: '', // 咨询单回执ID
      messageType: '', // 消息类型
      messageSendDateTime: '', // 发送时间
      messageType: '', // 咨询结果
      CorrelationPropertiesID: '', // 咨询单回执ID，关联房源ID
      LeasableTime: '', // 租赁时间段
      estimateTheTotalRevenue: '', // 预估总收益
      // 关联房源信息
      associatedHousingResourceName: '精品房间', // 关联房源名称
      associatedHousingResourcePrice: '100', // 关联房源价格
      associatedHousingLeasableTime: '2020/12/12 ~2020/12/12 12:00 ~ 14:00', // 关联房源租赁时间段
      associatedHousingResourceTags: ['网红打卡', '约约圣地'] // 关联房源标签
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/message');
      //  this.$router.go(-1);// 返回上一页
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
    this.favoriteID = this.$route.params.favoriteID
    console.log(`咨询单回执ID：${this.favoriteID}`)
  }
}
</script>
<style lang="scss" scoped>
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
.card2 {
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 5%;
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
.cardRow {
  margin-top: 10px;
  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 15px;
}
.cardRowValue {
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
  font-size: 15px;
}
.col {
  font-size: 15px;
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.cardTag {
  margin-top: 5px;
  margin-bottom: 5px;
}
img {
  margin-left: 3%;
  margin-top: 1%;
  width: 95%;
  height: 95%;
}
</style>