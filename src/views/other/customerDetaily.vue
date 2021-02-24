// 商家详情
<template>
  <div>
    <!-- 顶栏-->
    <van-nav-bar title="商家详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true">
      <template #right>
        <div style="margin-right: 10px; margin-top: 10px">
          <van-icon name="like-o" size="30" v-show="likeo" @click="toCollecting" />
          <van-icon name="like" size="30" v-show="like" @click="cancelCollecting" />
        </div>
      </template>
    </van-nav-bar>
    <div class="customerInfo">
      <!-- 房间图片 -->
      <div>
        <van-swipe :autoplay="3000" :width="400" :height="300">
          <van-swipe-item v-for="(url, index) in customerHeadimgurl" :key="index">
            <img v-lazy="url" @click="getImg(customerHeadimgurl, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 商家卡片 -->
      <div class="card">
        <!-- 商家名称 -->
        <div class="customerName">
          {{ customerName }}
        </div>
        <div class="customerAddress"><van-icon name="location-o" />{{ customerAddress }}</div>
      </div>
      <!-- 商家房间列表（仅显示最新前个房间） -->
      <div style="margin-top: 35%">
        <div class="roomList" v-for="(item, index) in roomList" :key="index">
          <!-- TODO 路由跳转(房间详情) -->
          <van-row @click="toRoomDetails(item.roomID)">
            <!-- 房间图片 -->
            <van-col span="6"><img :src="item.roomImage" alt="暂无图片" width="80" height="80" /> </van-col>
            <!-- 房间名称 -->
            <van-col span="16">
              <div style="margin-left: 5%; margin-top: 5%; font-size: 20px">
                <div style="">{{ item.roomName }}</div>
              </div>
              <!-- 该房源未来一周有X个分时租赁房源 -->
              <div style="margin-top: 10px; margin-left: 10px; color: red">
                该房源未来一周有 {{ item.housingResourceNum }}个分时租赁房源
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 查看更多 -->
      <div class="viewMore">
        <van-button round type="info" size="large" @click="viewMore">查看更多</van-button>
      </div>
      <!-- 商家介绍 -->
      <div style="margin-left: 10%; margin-top: 10%"><h2>商家介绍</h2></div>
      <div class="customerIntroduction">
        作为嘉定区地标性建筑，宾馆拥有北欧风格的建筑群和2100平米的屋顶花园，环境优美闹中取静，是国家金叶级绿色旅游饭店，宾馆外场树木葱郁，绿草如茵，绿化率达到40%以上，停车场可容纳350余辆轿车停放，300余平方米的广场可举办多种形式的露天活动。
      </div>
      <!-- 详细介绍 -->
      <div style="margin-left: 10%; margin-top: 5%"><h2>详细介绍</h2></div>
      <div class="detailedIntroduction">
        作为嘉定区地标性建筑，宾馆拥有北欧风格的建筑群和2100平米的屋顶花园，环境优美闹中取静，是国家金叶级绿色旅游饭店，宾馆外场树木葱郁，绿草如茵，绿化率达到40%以上，停车场可容纳350余辆轿车停放，300余平方米的广场可举办多种形式的露天活动。
      </div>
    </div>
    <!-- 遮罩层 -->
    <div>
      <van-overlay :show="OverlayShow">
        <div class="wrapper">
          <div class="block">该商家已下线</div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, ImagePreview, Overlay } from 'vant'
import wx from 'weixin-js-sdk'
import config from '../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
export default {
  name: 'customerDetaily', // 商家详情
  components: {},
  data() {
    return {
      OverlayShow: true, // 遮罩层
      customerID: '', // 商家ID
      customerName: 'Zsmart精品名宿（杭州西湖断桥店）', // 商家名称
      customerAddress: '杭州市西湖区西湖断桥风景区', // 商家地址
      customerHeadimgurl: [
        'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__0404f2847090f08d68915475d16eeeaa.png'
      ], // 商家头像
      roomList: [], // 商家的房间列表
      // 顶栏
      isLike: false, // 是否收藏
      // 顶栏收藏icon变化控制
      likeo: true,
      like: false,
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
    // 路由跳转（收藏商家列表）
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
    getImg(customerHeadimgurl, index) {
      ImagePreview({
        images: customerHeadimgurl,
        closeable: true,
        showIndex: true,
        loop: false, //是否循环播放
        startPosition: index
      })
    },
    // 路由跳转（房间详情）
    toRoomDetails(roomID) {
      this.$router.push(`/roomDetaily/${roomID}`)
    },
    // 查看更多
    viewMore() {
      //TODO 路由跳转（该商家下的房间列表）
      this.$router.push(`/customerRoomList/${this.customerID}`)
    }
  },
  watch: {},
  created() {
    // TODO 请求后端，判断商家状态是否下线
    var customerStatus = false
    if (customerStatus) {
      this.OverlayShow = false
    }
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
            title: that.customerName, // 分享标题
            desc: that.SpaceDetailedIntroduction, // 分享描述
            link: that.signatureUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.customerHeadimgurl[0], // 分享图标
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

    // TODO 请求后端，获取该商家ID信息

    // TODO 请求后端，获取该商家商家房间列表（仅保留前三个遍历数组获取前三个索引值）
    this.roomList = [
      {
        roomID: 1,
        roomName: '房间名称1',
        roomImage:
          'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg',
        housingResourceNum: 3 // 房间房源数量
      },
      {
        roomID: 2,
        roomName: '房间名称2',
        roomImage:
          'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg',
        housingResourceNum: 3 // 房间房源数量
      },
      {
        roomID: 3,
        roomName: '房间名称3',
        roomImage:
          'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg',
        housingResourceNum: 4 // 房间房源数量
      }
    ]
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
    // 接收路由地址传参
    this.customerID = this.$route.params.customerID
    console.log(`商家ID：${this.customerID}`)
  }
}
</script>
<style lang="scss" scoped>
.customerName {
  color: black;
  font-size: 20px;
  margin-top: 5%;
  margin-left: 10%;
}
.customerAddress {
  font-size: 15px;
  color: black;
  margin-top: 5%;
  margin-left: 10%;
  margin-bottom: 6%;
}
.card {
  position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: -10%;
  background-color: #ffffff;
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

.roomList {
  color: black;
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 5%;
  background-color: #ffffff;
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

.viewMore {
  width: 200px;
  //  position: absolute;
  display: block;
  margin: 0 auto;
}
.customerIntroduction {
  color: black;
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
  background-color: #ffffff;
  border-width: 1px;
  /* 边线 */
  border-style: solid;
  border-color: rgb(255, 255, 255);
  /* 圆角 */
  // border-radius: 20px;
  /* 背景 */
  /* background:#eee; */
  /* 卡片内部间距，单位 px */
  padding: 5px;
}
.detailedIntroduction {
  color: black;
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
  background-color: #ffffff;
  border-width: 1px;
  /* 边线 */
  border-style: solid;
  border-color: rgb(255, 255, 255);
  /* 圆角 */
  // border-radius: 20px;
  /* 背景 */
  /* background:#eee; */
  /* 卡片内部间距，单位 px */
  padding: 5px;
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  font-size: 20px;
  color: #ffffff;
  width: 120px;
  height: 120px;
  // background-color: #ffffff;
}
</style> 