<!-- 我的 -->
<template>
  <div>
    <div class="page">
      <div class="mrchant-user-info-background"></div>
      <div class="mrchant-user-info" @click="toSetting(id)">
        <!-- 头像信息（跳转商家信息页） -->
        <div class="mrchant-user-info-avatar" @click="toSetting(id)">
          <van-image width="90" height="90" lazy-load :src="headimgurl" fit="fill" round />
        </div>
        <!-- 商户名称 -->
        <div class="mrchant-user-info-merchants-name" @click="toSetting(id)">
          <h1>{{ name }}</h1>
        </div>
        <!-- 当前位置（跳转城市页？？？） -->
        <div class="mrchant-user-info-currentLocation">
          <h3><van-icon name="location-o" />{{ country }}{{ province }}{{ city }}</h3>
        </div>
      </div>
      <div class="cells">
        <!-- 我的消息 -->
        <van-cell title="我的消息" is-link @click="toMessage">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-row>
              <van-col span="2"
                ><img src="../../assets/image/my-message.png" alt="" srcset="" width="22px" height="22px"
              /></van-col>
              <van-col span="6" offset="1"><span class="custom-title">我的消息</span></van-col>
            </van-row>
          </template>
        </van-cell>
        <!-- 我的收藏 -->
        <van-cell title="我的收藏" is-link @click="toFavorite">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-row>
              <van-col span="2"
                ><img src="../../assets/image/my-favorite.png" alt="" srcset="" width="22px" height="22px"
              /></van-col>
              <van-col span="6" offset="1"><span class="custom-title">我的收藏</span></van-col>
            </van-row>
          </template>
        </van-cell>
        <!-- 我的发布 -->
        <van-cell title="我的发布" is-link @click="toHousingResource">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-row>
              <van-col span="2"
                ><img src="../../assets/image/my-release.png" alt="" srcset="" width="22px" height="22px"
              /></van-col>
              <van-col span="6" offset="1"><span class="custom-title">我的发布</span></van-col>
            </van-row>
          </template>
        </van-cell>
        <!-- 我的订单 -->
        <van-cell title="我的订单" is-link @click="toMyOrder">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <van-row>
              <van-col span="2"
                ><img src="../../assets/image/my-order.png" alt="" srcset="" width="22px" height="22px"
              /></van-col>
              <van-col span="6" offset="1"><span class="custom-title">我的订单</span></van-col>
            </van-row>
          </template>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口
import { getUserInfo } from '@/api/my/userinfo/userinfo.js'
import { mapGetters } from 'vuex'
import { PullRefresh, List, Dialog, Toast, Pagination, Notify } from 'vant'
import wx from 'weixin-js-sdk'
import config from '../../config/index' // 引入环境配置参数

export default {
  data() {
    return {
      // 微信用户信息(初始化数据)
      searchValue: null,
      createBy: null,
      createTime: null,
      updateBy: null,
      updateTime: null,
      remark: null,
      params: {},
      id: 1, // 商户ID
      name: '未知昵称',
      phone: '13388887777',
      mobile: '15959950529',
      unionid: null,
      openid: '',
      nickname: '',
      sex: '1',
      country: '中国',
      province: '',
      city: '',
      language: 'zh_CN',
      headimgurl: '',
      subscribe: 1,
      subscribeTime: '1610377484',
      subscribed: '2021-01-11 23:04:44',
      unsubscribed: null,
      status: 3,
      created: '2021-01-25 22:39:38',
      modified: '2021-01-25 22:39:38',
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      noncestr: '',
      signature: '',
      signatureUrl: '' // 签名url // 签名url
    }
  },
  computed: {},
  methods: {
    // 路由跳转（我的消息页）
    toMessage() {
      this.$router.push('/message')
    },
    // 路由跳转（空间管理页）
    toMySpace() {
      this.$router.push('/spaceList')
    },
    // 路由跳转（我的房源页）
    toHousingResource() {
      this.$router.push('/housingResource')
    },
    // 路由跳转（我的订单页）
    toMyOrder() {
      this.$router.push('/myOrder')
    },
    // 路由跳转（我的收藏页）
    toFavorite() {
      this.$router.push('/favorite')
    },
    // 请求数据案例
    initData() {
      // 请求后端，根据请求头openID获取商家信息
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      getUserInfo(headers)
        .then(response => {
          console.log(JSON.stringify(response.data))
          if (response.msg !== '操作成功' || response.code !== 0) {
            // Notify 失败提示
            Notify({ type: 'warning', message: '获取用户信息失败', duration: 2000 })
            console.log(JSON.stringify(response.data))
          } else {
            console.log(JSON.stringify(response.data))
            // Notify 成功提示
            // 存储数据
            this.searchValue = response.data.searchValue //
            this.createBy = response.data.createBy //
            this.createTime = response.data.createTime //
            this.updateBy = response.data.updateBy //
            this.updateTime = response.data.updateTime //
            this.remark = response.data.remark //
            this.params = response.data.params //
            this.id = response.data.id //
            this.name = response.data.name //
            this.phone = response.data.phone //
            this.mobile = response.data.mobile //
            this.unionid = response.data.unionid //
            this.openid = response.data.openid //
            this.sex = response.data.sex //
            this.country = response.data.country //
            this.province = response.data.province //
            this.city = response.data.city //
            this.language = response.data.language //
            this.headimgurl = response.data.headimgurl //
            this.subscribe = response.data.subscribe //
            this.subscribeTime = response.data.subscribeTime //
            this.subscribed = response.data.subscribed //
            this.unsubscribed = response.data.unsubscribed //
            this.status = response.data.status // 商家状态
            this.created = response.data.created //
            this.modified = response.data.modified //
            // 判断商家空间状态
            if (this.spaceStatus !== 3) {
              // 显示已下线
              this.overlayShow = true
            } else {
              // 不显示已下线
              this.overlayShow = false
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Action 通过 store.dispatch 方法触发
    doDispatch() {
      this.$store.dispatch('setUserName', '组织都在等你~')
    },
    // 路由跳转（完善信息页）
    toSetting(id) {
      this.$router.push('/setting')
    }
  },
  beforeMount() {
    // 初始化数据
    this.initData()
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 当前页面域名
    this.signatureUrl = window.location.href
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
  created() {}
}
</script>
<style lang="scss" scope>
.mrchant-user-info-background {
  background-color: rgb(211, 230, 243);
  position: absolute;
  width: 100%;
  height: 60%;
  top: 5%;
  // bottom: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.mrchant-user-info-avatar {
  height: 50%;
  margin-top: 8%;
  // bottom: 30%;
  margin-left: 6%;
}
// .mrchant-user-info {
//   height: 50%;
//   top: 10%;
//   // bottom: 30%;
//   margin-left: 70%;
//   margin-left: 30%;
//   transform: translate(-50%, -50%);
// }
.mrchant-user-info-merchants-name {
  position: absolute;
  // width: 100%; // 这个属性会导致页面横向过大
  height: 50%;
  top: 33%;
  // bottom: 30%;
  left: 53%;
  transform: translate(-50%, -50%);
}
.mrchant-user-info-currentLocation {
  position: absolute;
  // width: 100%; // 这个属性会导致页面横向过大
  height: 50%;
  top: 43%;
  // bottom: 30%;
  left: 47%;
  transform: translate(-50%, -50%);
}
.cells {
  position: absolute;
  width: 94%;
  top: 45%;
  // bottom: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-width: 1px;
  // 边线
  border-style: solid;
  border-color: #409eff;
  // 圆角
  border-radius: 20px;
  // 背景
  // background:#eee;
  // 卡片内部间距，单位 px
  padding: 10px;
}
</style>
