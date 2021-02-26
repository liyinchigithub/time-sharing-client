// 收藏详情页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="咨询单详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 咨询单表单 -->
    <div class="form">
      <!-- 图片（轮播图） -->
      <div class="Mine-categories-swipe">
        <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000">
          <van-swipe-item v-for="(url, index) in favoriteImage" :key="index">
            <img v-lazy="url" @click="getImg(favoriteImage, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 咨询单信息 -->
      <div class="card">
        <!-- 空间名称 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>空间名称：{{ spaceName }}</div>
        </div>
        <!-- 房间名称 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>房间名称：{{ roomName }}</div>
        </div>
        <!-- 租赁时间范围 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>租赁时间范围：{{ LeasableTime }}</div>
        </div>
        <!-- 租赁时间范围 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>价格范围(元/时)：{{ priceRange }}</div>
        </div>
        <!-- 售卖价格(元/时) -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>售卖价格(元/时)：{{ sellingPrice }}</div>
        </div>
        <!-- 手机号 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>手机号：{{ mobile }}</div>
        </div>
        <!-- 创建时间 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <div>创建时间：{{ favoriteCreated }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, ImagePreview } from 'vant'
import { getMyFavoriteLis, favoriteAddSpace, favoriteAddRoom, favoriteDelete } from '@/api/my/myFavorite/myFavorite.js'
import FormData from 'form-data' // 引入content-type为form-data
export default {
  name: 'myFavoriteDetail', // 我的收藏详情页
  components: {},
  data() {
    return {
      favoriteID: '', // 咨询单ID
      favoriteName: '', // 咨询单名称
      favoriteImage: '', // 咨询单图片(房间图片)
      favoriteStatus: '', // 咨询单状态（1已同意、2已拒绝、3已失效）
      LeasableTime: '', // 咨询单可租赁时间段
      favoriteCreated: '', // 咨询单创建时间
      spaceName: '', // 空间
      roomName: '', // 房间
      priceRange: 0, // 价格范围
      sellingPrice: 0, // 售卖价格
      mobile: '', //手机号
      description: '', // 咨询单介绍
      tags: '', // 标签
      spaceObject: '', // 咨询单关联的空间信息
      roomObject: '' // 咨询单关联的房间信息
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回我的收藏页）
    onClickLeft() {
      this.$router.push('/myFavorite')
      //  this.$router.go(-1);// 返回上一页
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
    this.favoriteID = this.$route.params.favoriteID
    console.log(`咨询单ID：${this.favoriteID}`)
    // TODO 请求后端接口，咨询单ID查询咨询单信息
    var data = new FormData()
    // 请求body
    data.append('id', this.favoriteID)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    getFavoriteDetail(data, headers)
      .then(response => {
        this.favoriteImage = response.data.room.images.split(',')
        this.spaceName = response.data.space.name // 空间名称
        this.roomName = response.data.room.name // 房间名称
        this.priceRange = response.data.price // 价格范围
        this.sellingPrice = response.data.income // 售卖价格
        this.mobile = response.data.mobile // 手机号
        this.description = response.data.description // 手机号
        this.favoriteStatus = response.data.status //
        this.LeasableTime = `${response.data.fromTime} 至 ${response.data.toTime}` // 房源时间段（可租赁时间段）
        this.favoriteCreated = response.data.created // 创建时间
        this.tags = response.tags.split(',') // 关键标签
        this.spaceObject = response.data.space // 咨询单关联的空间信息
        this.roomObject = response.data.room // 咨询单关联的房间信息
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
    document.body.style.backgroundColor = '#F5F5F5'
  }
}
</script>
<style lang="scss" scoped>
.form {
  margin-top: 15%;
}
.card {
  color: black;
  font-size: 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
  border-radius: 12px;
  background-clip: padding-box;
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