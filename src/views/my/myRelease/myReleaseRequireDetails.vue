// 房源详情页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="房源详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 表单 -->
    <div class="form">
      <!-- 图片（轮播图） -->
      <div class="Mine-categories-swipe">
        <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000">
          <van-swipe-item v-for="(url, index) in housingResourceImage" :key="index">
            <img v-lazy="url" @click="getImg(housingResourceImage, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 关键标签 -->
      <van-cell center title="标签" size="large"> </van-cell>
      <div class="tags">
        <span v-for="(tag, index) in tags" :key="index">
          <Tag color="blue"><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag>
        </span>
      </div>
      <!-- 空间 -->
      <van-cell center title="空间名称" :value="space" size="large" />
      <!-- 房间 -->
      <van-cell center title="房间名称" :value="room" size="large" />
      <!-- 房源售价 -->
      <van-cell center title="房源售价" :value="housingPrice" size="large" />
      <!-- 房源时间端 开始时间-结束时间 -->
      <van-cell center title="房源时间段" :value="LeasableTime" size="large" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, ImagePreview } from 'vant'
import { myCustomerHousingResourceList } from '@/api/my/myHousingResource/myHousingResource.js'
export default {
  name: 'housingResource', // 房源详情页
  components: {},
  data() {
    return {
      housingResourceID: 1,
      housingResourceImage: [],
      space: '', // 空间
      room: '', // 房间
      housingPrice: 0, // 房源售价
      LeasableTime: '', // 房源时间段（可租赁时间段）
      tags: [] // 关键标签
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回我的房源列表）
    onClickLeft() {
      // this.$router.push('/housingResource');
      this.$router.go(-1) // 返回上一页
    },
    // vant 轮播图 图片预览
    // 点击图片，进入图片预览事件
    getImg(Images, index) {
      ImagePreview({
        images: Images,
        closeable: true,
        showIndex: true,
        loop: false, //是否循环播放
        startPosition: index
      })
    }
  },
  watch: {},
  directives: {},
  created() {
    // 接收路由地址传参
    this.housingResourceID = this.$route.params.housingResourceID
    console.log(`房源单ID：${this.housingResourceID}`)
    // TODO 请求后端，获取房源详情
    var data = new FormData()
    // 请求body
    data.append('id', this.housingResourceID)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    myCustomerHousingResourceList(data, headers)
      .then(response => {
        this.housingResourceImage = response.data.space.images.split(',')
        this.space = response.data.space.name // 空间名称
        this.room = response.data.room.name // 房间名称
        this.housingPrice = response.data.price // 房源售价
        this.LeasableTime = `${response.data.fromTime}-${response.data.toTime}` // 房源时间段（可租赁时间段）
        this.tags = response.tags.split(',') // 关键标签
      })
      .catch(err => {
        console.log(err)
      })
  },
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
    document.body.style.backgroundColor = '#ffffff'
  }
}
</script>
<style lang="scss" scoped>
.form {
  margin-top: 13%;
}
.tags {
  // margin-top: 5%;
  margin-left: 5%;
  //  display: inline;
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
// 轮播图
.my-swipe .van-swipe-item {
  width: 100%;
  height: 250px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #ffffff;
  display: block;
  margin: 0 auto;
}
// 轮播图
.Mine-categories-swipe img {
  display: inline-block;
  width: 100%;
  height: 250px;
  display: block;
  margin: 0 auto;
}
</style>