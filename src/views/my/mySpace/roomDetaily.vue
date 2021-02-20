// 房间详情页
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
      <!-- 房间图片（轮播图） -->
      <div class="Mine-categories-swipe">
        <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000">
          <van-swipe-item v-for="(url, index) in roomImages" :key="index">
            <img v-lazy="url" @click="getImg(roomImages, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 房间名称 -->
      <div class="roomName">
        {{ roomName }}
      </div>
      <!-- 分割线 -->
      <div class="flag"><img src="../../../assets/image/flag.png" alt="" width="20px" height="20px" />房间介绍</div>
      <!-- 房间介绍 -->
      <div class="card" v-html="roomDescription"></div>
      <div class="flag"><img src="../../../assets/image/flag.png" alt="" width="20px" height="20px" />设施服务</div>
      <!-- 设施服务 -->
      <div class="card" v-html="roomServices"></div>
      <div class="flag"><img src="../../../assets/image/flag.png" alt="" width="20px" height="20px" />预定须知</div>
      <!-- 预订须知 -->
      <div class="card" v-html="roomNotice"></div>
      <br />
      <br />
    </div>
    <!-- 遮罩层 -->
    <div>
      <van-overlay :show="overlayShow">
        <div class="wrapper">
          <div class="block">该空间已下线</div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, ImagePreview } from 'vant'
import wx from 'weixin-js-sdk'
import config from '../../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
import { getRoomDetail } from '@/api/my/mySpace/room/roomList.js' // 引入后端api
export default {
  name: 'roomDetaily', // 创建房间详情
  components: {},
  data() {
    return {
      // 房间基本信息
      roomID: 1, // 房间ID
      roomAffiliatedBusinessesID: 1, // 房间所属商家ID
      roomAffiliatedSpaceID: 1, // 房间所属商家空间ID
      roomAffiliatedSpaceName: '', // 房间所属商家空间名称
      roomName: '', // 房间名称
      roomLogo: [], // 房间logo图片
      roomImages: [], // 图片组(注意：这边后端返回图片是字符串用逗号隔开并且有反斜杠，需要去掉反斜杠并转成数组)
      roomDescription: '', // 房间介绍
      roomServices: '', // 设施服务
      roomNotice: '', // 预订须知
      roomDetailedAddress: '', // 房间间地址
      roomStatus: 1, // 房间状态
      roomImages: [], // 房间图片
      // 顶栏按钮
      isLike: false, // 是否收藏
      likeo: true, // 收藏icon变化控制
      like: false, // 收藏icon变化控制
      clipboard: '', // 剪贴板
      overlayShow: false, // 遮罩层
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      nonceStr: '',
      signature: '',
      signatureUrl: '' // 签名url // 签名url
    }
  },
  computed: {},
  methods: {
    // 路由跳转（房间列表）
    onClickLeft() {
      console.log('this.spaceID:', this.spaceID)
      //  this.$router.push(`/roomList/${this.spaceID}`)
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

    // 接收路由地址传参
    this.spaceID = this.$route.params.spaceID
    console.log(`空间ID：${this.spaceID}`)
    this.roomID = this.$route.params.roomID
    console.log(`房间ID：${this.roomID}`)

    // 请求后端，获取房间详情页
    var FormData = require('form-data')
    var data = new FormData()
    // 请求body
    data.append('id', this.roomID)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    getRoomDetail(data, headers).then(response => {
      console.log(JSON.stringify(response.data))
      if (response.msg !== '操作成功' || response.code !== 0) {
        // Notify 失败提示
        Notify({ type: 'warning', message: '获取空间详情失败', duration: 2000 })
        console.log(JSON.stringify(response.data))
      } else {
        console.log(JSON.stringify(response.data))
        // 存储数据
        this.roomID = response.data.id // 房间详情页，房间ID
        this.roomAffiliatedBusinessesID = response.data.bid // 房间所属商家ID
        this.roomAffiliatedSpaceID = response.data.sid // 房间所属商家空间ID
        this.roomAffiliatedSpaceName = response.data.spaceName // 房间所属商家空间名称
        this.roomName = response.data.name // 房间名称
        this.roomLogo.push(response.data.logo) // 房间logo图片
        this.roomImages = response.data.images.replace('\\', '').split(',') // 图片组(注意：这边后端返回图片是字符串用逗号隔开并且有反斜杠，需要去掉反斜杠并转成数组)
        this.roomDescription = response.data.description // 房间介绍
        this.roomServices = response.data.services // 设施服务
        this.roomNotice = response.data.notice // 预订须知
        this.roomDetailedAddress = response.data.address // 房间间地址
        this.roomStatus = response.data.status // 房间状态
        // 判断商家房间状态
        if (this.roomStatus !== 1) {
          // 显示已下线
          this.overlayShow = true
        } else {
          // 不显示已下线
          this.overlayShow = false
        }
      }
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
    document.body.style.backgroundColor = '#F5F5F5'
  }
}
</script>
<style lang="scss" scoped>
.roomInfo {
  margin-top: 12%;
}
.roomName {
  color: black;
  font-size: 30px;
  margin-left: 6%;
  margin-right: 3%;
  margin-top: 5%;
  margin-bottom: 10%;
}
.flag {
  color: black;
  font-size: 26px;
  margin-left: 6%;
  margin-right: 3%;
  margin-top: 5%;
  font-family: '黑体';
}
.card {
  // position: absolute;
  font-size: 7px;
  width: 96%;
  margin-left: 15%;
  margin-top: 40%;
  background-color: rgb(255, 255, 255);
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

.card {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ffffff;
  padding: 10px;
  margin: 5px;
  font-family: arial;
  font-size: 12px;
  border-radius: 3px;
  line-height: 20px;
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