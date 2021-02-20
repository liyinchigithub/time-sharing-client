// 房间详情
<template>
  <div>
    <!-- 顶栏、创建房间 -->
    <van-nav-bar title="房间详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true">
      <template #right>
        <div style="margin-right: 10px; margin-top: 10px">
          <van-icon name="like-o" size="30" v-show="likeo" @click="toCollecting" />
          <van-icon name="like" size="30" v-show="like" @click="cancelCollecting" />
        </div>
      </template>
    </van-nav-bar>
    <div class="roomInfo">
      <!-- 房间图片 -->
      <div>
        <van-swipe :autoplay="3000" :width="300" :height="200">
          <van-swipe-item v-for="(url, index) in roomImages" :key="index">
            <img v-lazy="url" @click="getImg(roomImages, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 房间价格 -->
      <div class="price">
        <h1 style="color: red">￥{{ roomPrice }}</h1>
        <h1>
          <!-- <del>￥{{ roomPriceDel }}</del> -->
        </h1>
      </div>

      <!-- 房间名称 -->
      <div class="roomName">
        {{ roomName }}
      </div>
      <!-- - 精选房源- -->
      <div style="text-align: center; font-size: 20px; color: red">- 精选房源-</div>
      <div>
        <van-tabs v-model="active" swipeable loading type="card" color="#409EFF">
          <van-tab v-for="(item, index) in tabList" :key="index" :title="item">
            <br />
            <!-- 房源数据 -->
            <Table :columns="columns1" :row="row" :data="data1" stripe @on-row-click="toBook(row,index)"></Table>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 分割线 -->
      <van-divider content-position="left" :style="{ color: 'black', borderColor: 'white', padding: '0 16px' }"
        ><div class="flag"><img src="../../assets/image/flag.png" alt="" width="20px" height="20px" />房间位置</div>
      </van-divider>
      <!-- 房间位置 -->
      <div class="border">
        <div class="content">{{ roomAddress }}</div>
      </div>
      <!-- 分割线 -->
      <van-divider content-position="left" :style="{ color: 'black', borderColor: 'white', padding: '0 16px' }"
        ><div class="flag"><img src="../../assets/image/flag.png" alt="" width="20px" height="20px" />房间介绍</div>
      </van-divider>
      <!-- 房间介绍 -->
      <div class="border">
        <div class="content">{{ roomIntroduced }}</div>
      </div>
      <!-- 分割线 -->
      <van-divider content-position="left" :style="{ color: 'black', borderColor: 'white', padding: '0 16px' }"
        ><div class="flag"><img src="../../assets/image/flag.png" alt="" width="20px" height="20px" />设施服务</div>
      </van-divider>
      <!-- 设施服务 -->
      <div class="border">
        <div class="content" v-html="facilityService"></div>
      </div>
      <!-- 分割线 -->
      <van-divider content-position="left" :style="{ color: 'black', borderColor: 'white', padding: '0 16px' }"
        ><div class="flag"><img src="../../assets/image/flag.png" alt="" width="20px" height="20px" />预定须知</div>
      </van-divider>
      <!-- 预订须知 -->
      <div class="border">
        <div class="content">{{ attention }}</div>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, ImagePreview } from 'vant'
import wx from 'weixin-js-sdk'
import config from '../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
export default {
  name: 'roomDetaily', //房间详情（商家房间列表跳转）
  components: {},
  data() {
    return {
      // 房间详情页字段
      spaceID: '1', // 空间完成页，空间ID
      roomID: '1', // 房间ID
      roomName: '精品酒店特价房间，豪华双人间套餐福利', //房间名称
      roomAddress: '杭州市西湖区西湖断桥风景区', //房间位置
      roomPrice: 200,
      roomPriceDel: 400,
      roomImages: [
        'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__0404f2847090f08d68915475d16eeeaa.png'
      ], // 房间图片（第一张图为logo）
      roomIntroduced:
        '这是今晚的特价房间，赶紧预订吧这是今晚的特价房间，赶紧预订吧这是今晚的特价房间，赶紧预订吧这是今晚的特价房间，赶紧预订吧这是今晚的特价房间，赶紧预订吧', // 房间介绍
      facilityService: '<div>1.空调</div><div>2.冰箱</div><div>3.洗衣机</div><div>4.热水器</div> ', // 设施服务
      attention:
        '预订后，请联系客服进行支付费用，具体情况请联系客服进行了解,预订后，请联系客服进行支付费用，具体情况请联系客服进行了解预订后，请联系客服进行支付费用，具体情况请联系客服进行了解', // 预订须知
      isLike: false, // 是否收藏
      // 顶栏收藏icon变化控制
      likeo: true,
      like: false,
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      nonceStr: '',
      signature: '',
      signatureUrl: '', // 签名url // 签名url
      // 当前选中
      active: 0,
      // 精选房源tab
      tabList: ['01-18', '01-19', '01-20', '01-21', '01-22'],
      // 精选房源表格列字段
      columns1: [
        {
          title: '入住时间',
          key: 'CheckInTime',
           width: 110,
        },
        {
          title: '退房时间',
          key: 'CheckOutTime',
          width: 110,
        },
        {
          title: '价格',
          key: 'price',
           width: 110,
        },
        {
          title: '预订',
          key: 'book',
           width: 70,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    color:"blue"
                  }
                },
                '预订'
              ),
            ])
          }
        }
      ],
      data1: [
        {
          CheckInTime: '2021-10-03',
          CheckOutTime: '2021-10-03',
          price: '300',
          book: '预订'
        },
        {
          CheckInTime: '2021-10-03',
          CheckOutTime: '2021-10-03',
          price: '300',
          book: '预订'
        },
        {
          CheckInTime: '2021-10-03',
          CheckOutTime: '2021-10-03',
          price: '300',
          book: '预订'
        }
      ],
      row:""
    }
  },
  computed: {},
  methods: {
    // 路由跳转（房间列表）
    onClickLeft() {
      this.$router.go(-1)
    },
    // 收藏
    toCollecting() {
      this.likeo = false // 空心
      this.like = true // 实心
      this.isLike = true // 收藏
      // 获取用户登录状态
      var isLogin = localStorage.getItem('isLogin')
      if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
        this.$router.push('/login')
        // Notify 失败提示
        Notify({ type: 'warning', message: '未登录请先登录账号', duration: 2000 })
      } else {
        console.log('收藏')
        // TODO 请求后端接口
      }
    },
    // 取消收藏
    cancelCollecting() {
      this.likeo = true // 空心
      this.like = false // 实心
      this.isLike = false // 不收藏

      // 获取用户登录状态
      var isLogin = localStorage.getItem('isLogin')
      if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
        this.$router.push('/login')
        // Notify 失败提示
        Notify({ type: 'warning', message: '未登录请先登录账号', duration: 2000 })
      } else {
        console.log('不收藏')
        // TODO 请求后端接口
      }
    },
    // 点击图片，进入图片预览事件
    getImg(roomImages, index) {
      ImagePreview({
        images: roomImages,
        closeable: true,
        showIndex: true,
        loop: false, //是否循环播放
        startPosition: index
      })
    },
    // 预订
    toBook(row, index) {
      console.log('index:',index)
      // 路由跳转
      this.$router.push(`/orderUser/${this.housingResourceID}/${this.spaceID}/${this.roomID}`)
    }
  },
  watch: {},
  directives: {},
  created() {
    //  JSSDK 调用微信分享接口
    var that = this
    console.log('toShareWeChat that.signatureUrl', window.location.href)
    // GET 请求后端进行签名,存储签名参数
    wxGetSignature({ url: window.location.href })
      .then(response => {
        console.log(`wxGetSignature response：${JSON.stringify(response)}`)
        // 存储签名信息
        localStorage.setItem('wxSignature', JSON.stringify(response.data))
        that.timestamp = response.data.timestamp
        that.nonceStr = response.data.nonceStr
        that.signature = response.data.signature
        //  JSSDK 配置、初始化（调用函数）
        wx.config({
          debug: false,
          appId: config.APPID,
          timestamp: that.timestamp,
          nonceStr: that.nonceStr,
          signature: that.signature,
          jsApiList: [
            'checkJsApi', // 检查api
            'updateAppMessageShareData', // 分享
            'updateTimelineShareData', // 分享
            // 'onMenuShareTimeline', // （即将废弃）
            // 'onMenuShareAppMessage',// （即将废弃）
            // 'onMenuShareQQ',// （即将废弃）
            'onMenuShareWeibo', // 分享至微博
            'hideMenuItems',
            'chooseImage',
            'getLocation' // 地理位置
          ]
        })
        // wx.config信息验证后会执行wx.ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function () {
          // 检查配置结果
          wx.checkJsApi({
            jsApiList: [
              'updateAppMessageShareData', // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
              'updateTimelineShareData' // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            // 成功
            success: function (res) {
              // alert(res.checkResult)
              if (res.checkResult == false) {
                Dialog({
                  message: '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！'
                })
                return
              }
            }
          })

          // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
          wx.updateAppMessageShareData({
            title: that.roomName, // 分享标题
            desc: that.SpaceDetailedIntroduction, // 分享描述
            link: that.signatureUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.roomLogo, // 分享图标
            success: function () {
              // 设置成功
              console.log('JSSDK正常，可进行分享')
            },
            // 失败
            fail: function (res) {
              // Toast.fail('登录超时，请重新登录')
              // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
              // setTimeout(() => {
              //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
              // }, 1500)
              console.log('fail res', res)
            },
            // 取消
            cancel: function (res) {
              Dialog({
                message: '取消分享'
              })
            }
          })

          wx.updateTimelineShareData({
            title: that.roomName, // 分享标题
            link: that.signatureUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.roomLogo, // 分享图标
            success: function () {
              // 设置成功
              console.log('JSSDK正常，可进行分享')
            },
            // 失败
            fail: function (res) {
              // Toast.fail('登录超时，请重新登录')
              // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
              // setTimeout(() => {
              //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
              // }, 1500)
              console.log('fail res', res)
            },
            // 取消
            cancel: function (res) {
              Dialog({
                message: '取消分享'
              })
            }
          })
        })
        // wx.config信息验证后会执行wx.error方法
        wx.error(function (res) {
          // wx.config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          // Toast.fail('登录超时，请重新登录')
          // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
          // setTimeout(() => {
          //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
          // }, 1500)
          //
          console.log('that.signatureUrl', that.signatureUrl)
          console.log('fail res', res)
        })
      })
      .catch(err => {
        console.log(err)
        // 如果授权失败
        // Notify 失败提示
        // Toast.fail('登录超时，请重新登录')
        // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
        // setTimeout(() => {
        //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
        // }, 1500)
        console.log('登录超时，请重新登录', err)
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

    // 当前页面域名
    this.signatureUrl = window.location.href

    // 当前页面域名
    this.signatureUrl = window.location.href
    console.log('beforeCreate this.signatureUrl', this.signatureUrl)
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#FFFFFF'
    // 接收路由地址传参
    this.roomID = this.$route.params.roomID
    console.log(`房间ID：${this.roomID}`)
  }
}
</script>
<style lang="scss" scoped>
.roomInfo {
  margin-top: 12%;
}
.flag {
  font-size: 20px;
  color: black;
}
.card {
  width: 98%;
  margin-left: 1%;
  margin-top: 4%;
  margin-bottom: 1%;
  // background: inherit;
  background-color: rgba(255, 255, 255, 1);
  // border-width: 1px;
  // 边线
  // border-style: solid;
  // 圆角
  border-radius: 17px;
  // 卡片内部间距，单位 px
  // background:#eee;
  // 卡片内部间距，单位 px
  padding: 5px;
}
.img {
  margin-left: 2%;
  margin-top: 2%;
  width: 96%;
  height: 50%;
}
.price {
  margin-left: 10%;
  margin-top: 3%;
  // width: 96%;// 这个属性会导致页面横向过大
  height: 50%;
}
.roomName {
  color: black;
  font-size: 20px;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 5%;
  margin-bottom: 10%;
}
.content {
  font-family: 'Times New Roman';
  font-size: 15px;
  color: black;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  // width: 98%; // 这个属性会导致页面横向过大
  height: 30%;
}
.border {
  margin: 0 auto;
  width: 95%;
  height: 95%;
  border: 2px solid rgb(248, 245, 245);
  border-radius: 30px;
  text-align: left;
}
</style> 