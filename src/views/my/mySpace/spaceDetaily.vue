// 空间详情页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="空间详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true">
      <template #right>
        <div style="margin-right: 10px; margin-top: 10px">
          <van-icon name="like-o" size="30" v-show="likeo" @click="toCollecting" />
          <van-icon name="like" size="30" v-show="like" @click="cancelCollecting" />
        </div>
      </template>
    </van-nav-bar>
    <div class="spaceInfo">
      <!-- 空间图片（轮播图） -->
      <div class="Mine-categories-swipe">
        <van-swipe class="my-swipe" indicator-color="white" :autoplay="2000">
          <van-swipe-item v-for="(url, index) in spaceImages" :key="index">
            <img v-lazy="url" @click="getImg(spaceImages, index)" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 空间信息 -->
      <div class="card">
        <!-- 空间名称 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <h2>{{ spaceName }}</h2>
        </div>
        <!-- 空间地址 -->
        <div style="margin-left: 10px; margin-top: 10px; margin-bottom: 10px">
          <h3>
            <van-icon class-prefix="iconfont" name="dingwei1" />{{ spaceProvinces }}{{ spaceCity }}{{ spaceDistrict }}
          </h3>
          <h3>{{ spaceDetailedAddress }}</h3>
        </div>
      </div>
      <!-- 空间的房间列表  -->
      <div class="spacesRoomItemList">
        <div class="card" v-for="(item, index) in spacesRoomItemList" :key="index">
          <div style="margin-top: 10px; margin-left: 10px">
            <van-row @click="toRoomDetails(item.id)">
              <!-- 房间单图片 -->
              <van-col span="6"><img :src="item.logo" alt="暂无图片" width="75" height="75" /> </van-col>
              <!-- 房间名称 -->
              <van-col span="11">
                <div>
                  <h2>{{ item.name }}</h2>
                </div>
                <div style="width: 200px; margin-top: 10px; margin-left: 10px">
                  该房源未来一周有{{ item.houseNum }}个分时租赁房源
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <van-pagination
        v-model="currentPage"
        :total-items="total"
        :items-per-page="itemsPerPage"
        :show-page-size="showPageSize"
        @change="roomList"
      />
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
import { Toast, Dialog, Notify, ImagePreview, Pagination } from 'vant'
import config from '../../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
import { getSpaceDetail } from '@/api/my/mySpace/mySpace.js' // 引入后端api
import { getRoomList } from '@/api/my/mySpace/room/roomList.js' // 引入后端api
import Clipboard from 'clipboard' // 复制剪贴板
import FormData from 'form-data' // 引入content-type为form-data
import axios from 'axios'
export default {
  name: 'spaceDetaily', // 空间详情
  components: {},
  data() {
    return {
      // 空间基本信息
      spaceStatus: 1, // 空间状态
      spaceAffiliatedBusinessesID: 1, // 空间所属商家空间ID
      spaceID: 1, // 空间详情页，空间ID
      spaceName: 'Zsmart精品名宿（杭州西湖断桥店）', // 空间名称
      spaceProvinces: '', // 省
      spaceCity: '', // 市区
      spaceDistrict: '', // 区
      spaceDetailedAddress: '西湖区西湖断桥风景区', // 详细地址
      spaceLogo: [], // 空间logo
      spaceImages: [], // 商家详情图
      spaceDescription: '这是空间介绍', // 详细介绍
      // 顶栏按钮
      isLike: false, // 是否收藏
      likeo: true, // 收藏icon变化控制
      like: false, // 收藏icon变化控制
      options: [
        { name: '微信好友', icon: 'wechat' },
        { name: '微信朋友圈', icon: 'wechat' },
        { name: '复制链接', icon: 'link' }
      ],
      clipboard: '', // 剪贴板
      overlayShow: false, // 遮罩层
      // 空间的房间列表
      spacesRoomItemList: [],
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      nonceStr: '',
      signature: '',
      signatureUrl: '', // 签名url // 签名url
      // vant分页
      currentPage: 1, // 当前选中页码
      total: 0, // 总行数
      itemsPerPage: 3, // 每页记录数
      showPageSize: 5 // 向前向后中间显示的页数
    }
  },
  computed: {},
  methods: {
    // 路由跳转（房间列表）
    onClickLeft() {
      // this.$router.push('/spaceList')
      this.$router.go(-1) // 返回上一页
    },
    // 路由跳转（房间详情页）
    toRoomDetails(roomID) {
      this.$router.push(`/roomDetaily/${this.spaceID}/${roomID}`)
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
    //
    roomList() {
      //  请求后端，获取该空间下房间列表
      var data = new FormData()
      // 请求body
      data.append('sid', this.spaceID)
      data.append('pageNum', this.currentPage)
      data.append('pageSize', this.itemsPerPage)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      getRoomList(data, headers)
        .then(response => {
          console.log(JSON.stringify(response.rows))
          if (response.code !== 0) {
            // Notify 失败提示
            Notify({ type: 'warning', message: '获取房间详情失败', duration: 2000 })
            console.log(JSON.stringify(response.rows))
          } else {
            console.log(JSON.stringify(response.rows))
            // 存储数据(返回的原因是created调用函数方法不能使用this引导data参数)
            this.spacesRoomItemList = response.rows // 页数据
            this.total = response.total // 所有总数据
          }
        })
        .catch(error => {
          console.log(error)
        })
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
    // 页面发生改变时,调用一次roomList方法，入参为当选中页码前页
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
            title: that.spaceName, // 分享标题
            desc: that.spaceDescription, // 分享描述
            link: that.signatureUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.spaceLogo, // 分享图标
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
            title: that.spaceName, // 分享标题
            link: that.signatureUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.spaceLogo, // 分享图标
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
          // setTimeout(() => {
          //   that.$router.push('/login')
          // }, 1500)
          console.log('that.signatureUrl', that.signatureUrl)
          console.log('fail res', res)
        })
      })
      .catch(err => {
        console.log(err)
        // 如果授权失败
        // Toast.fail('登录超时，请重新登录')
        // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
        // setTimeout(() => {
        //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
        // }, 1500)
        console.log('登录超时，请重新登录', err)
      })

    // 接收路由地址传参（空间ID）
    that.spaceID = that.$route.params.spaceID
    console.log(`空间ID：${that.spaceID}`)
    //  请求后端，获取空间详情页
    var data = new FormData()
    // 请求body
    data.append('id', that.spaceID)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    getSpaceDetail(data, headers)
      .then(response => {
        console.log(JSON.stringify(response.data))
        if (response.msg !== '操作成功' || response.code !== 0) {
          // Notify 失败提示
          Notify({ type: 'warning', message: '获取空间详情失败', duration: 2000 })
          console.log(JSON.stringify(response.data))
        } else {
          console.log(JSON.stringify(response.data))
          // 存储数据
          that.spaceStatus = response.data.status // 空间状态
          that.spaceAffiliatedBusinessesID = response.data.bid // 空间所属商家空间ID
          that.spaceID = response.data.id // 空间详情页，空间ID
          that.spaceName = response.data.name // 空间名称
          that.spaceDescription = response.data.description // 空间介绍
          that.spaceLogo.push(response.data.logo) // logo图片
          that.spaceImages = response.data.images.replace('\\', '').split(',') // 图片组(注意：这边后端返回图片是字符串用逗号隔开并且有反斜杠，需要去掉反斜杠并转成数组)
          that.spaceProvinces = response.data.province // 省
          that.spaceCity = response.data.city // 市区
          that.spaceDistrict = response.data.district // 区
          that.spaceDetailedAddress = response.data.address // 空间地址
          // 判断商家空间状态
          if (that.spaceStatus !== 1) {
            // 显示已下线
            that.overlayShow = true
          } else {
            // 不显示已下线
            that.overlayShow = false
          }
        }
      })
      .catch(error => {
        console.log(error)
      })

    // 请求后端，获取空间所有房间列表
    // this.$options.methods.roomList() // 注意：created调用methods某个函数，该函数中就不能使用this来引用data的参数
    //  请求后端，获取该空间下房间列表
    var data = new FormData()
    // 请求body
    data.append('sid', that.spaceID)
    data.append('pageNum', 1)
    data.append('pageSize', that.itemsPerPage)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    getRoomList(data, headers)
      .then(response => {
        console.log(JSON.stringify(response.rows))
        if (response.code !== 0) {
          // Notify 失败提示
          Notify({ type: 'warning', message: '获取房间详情失败', duration: 2000 })
          console.log(JSON.stringify(response.rows))
        } else {
          console.log(JSON.stringify(response.rows))
          // 存储数据(返回的原因是created调用函数方法不能使用this引导data参数)
          that.spacesRoomItemList = response.rows // 页数据
          that.total = response.total // 所有总数据
        }
      })
      .catch(error => {
        console.log(error)
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
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 当前页面域名
    this.signatureUrl = window.location.href
    console.log('beforeCreate this.signatureUrl', this.signatureUrl)
  },
  beforeMount() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.spaceInfo {
  margin-top: 12%;
}
.card {
  // position: absolute;
  width: 94%;
  margin-left: 2%;
  margin-top: 5%;
  margin-bottom: 2%;
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

.block {
  font-size: 20px;
  color: #ffffff;
  width: 120px;
  height: 120px;
  // background-color: #ffffff;
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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