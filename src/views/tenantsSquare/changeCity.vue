// 切换城市页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="切换城市" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div style="margin-top: 15%">
      <!-- 搜索栏 -->
      <van-search v-model="value" show-action label="城市" placeholder="请输入搜索城市" @search="onSearch(value)">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <!-- 当前城市 -->
      <div class="current-city" v-show="isShowCurrentCity">
        <van-cell-group title="当前城市">
          <van-cell :title="currentCity" icon="location-o" />
        </van-cell-group>
      </div>
      <!-- 搜索结果（默认不展示，有搜索结果才展示） -->
      <div class="search-result" v-show="isShowSearchResult">
        <van-cell-group title="搜索结果">
          <div v-for="(citem, index) in SearchResultList" :key="index">
            <van-cell :title="citem.name" @click="chooseCity(citem)" />
          </div>
        </van-cell-group>
      </div>
      <!-- 城市列表 -->
      <div class="city-list" v-show="isShowCityList">
        <van-index-bar class="indexBar" :sticky="false" highlight-color="#AE853A">
          <van-index-anchor v-for="(item, index) in cityList" :key="index" :index="item.initial">
            <span class="indexWord">{{ item.initial }}</span>
            <van-cell
              @click="chooseCity(citem)"
              v-for="(citem, cindex) in item.list"
              :key="cindex"
              :title="citem.name"
            />
          </van-index-anchor>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Search, Dialog, Cell, CellGroup, Notify } from 'vant'
import wx from 'weixin-js-sdk'
import config from '../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
import { geocoder } from '@/api/common/common.js' // 引入后端api
/* eslint-disable */
export default {
  name: 'favoriteDetail', // 咨询单详情页
  components: {},
  data() {
    return {
      value: '', // 搜索关键字（城市）
      currentCity: '杭州', // 当前选中城市
      // 城市数据
      cityList: [
        {
          initial: 'S',
          list: [
            { code: '0001', name: '上海市宝山区' },
            { code: '0002', name: '上海市浦东新区' }
          ]
        },
        {
          initial: 'H',
          list: [
            { code: '0003', name: '杭州上城区' },
            { code: '0004', name: '杭州下城区' }
          ]
        }
      ],
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      nonceStr: '',
      signature: '',
      signatureUrl: '', // 签名url
      latitude: 0, // 经度
      longitude: 0, // 维度
      isShowSearchResult: false, // 搜索结果显示
      isShowCurrentCity: true, // 未搜索时显示
      isShowCityList: true, // 未搜索时显示
      SearchResultList: [
        {
          name: '厦门'
        },
        {
          name: '宁夏'
        }
      ] // 搜索结果
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回咨询单页）
    onClickLeft() {
      this.$router.push('/home')
      // this.$router.go(-1);// 返回上一页
    },
    onSearch() {
      // TODO 模糊匹配是否包含搜索关键字

      // 搜索结果赋值给搜索结果列表

      // 显示搜索结果
      this.isShowSearchResult = true
      // 隐藏城市列表
      this.isShowCityList = false
    },
    // 选择城市
    chooseCity(citem) {
      console.log(JSON.stringify(citem))
      //
      this.currentCity = citem.name
      // 存储至localStorage
      localStorage.setItem('currentCity', this.currentCity)
      // TODO 请求后端接口修改改商家所在城市？？？

      // 页面跳转到首页
      this.$router.push('/home')
    }
  },
  watch: {},
  directives: {},
  created() {
    // TODO  请求后端接口 获取城市list数据
    // 赋值给cityList
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
  beforeMount() {},
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 当前页面域名
    this.signatureUrl = window.location.href.split('#')[0]
    console.log(this.signatureUrl)
    // GET 请求后端进行签名,存储签名参数
    wxGetSignature({ url: window.location.href.split('#')[0] })
      .then(response => {
        console.log(`signature：${JSON.stringify(response)}`)
        // 存储签名信息
        localStorage.setItem('wxSignature', JSON.stringify(response.data))
        this.timestamp = response.data.timestamp
        this.nonceStr = response.data.nonceStr
        this.signature = response.data.signature
        //  JSSDK 配置、初始化（调用函数）
        wx.config({
          debug: false,
          appId: config.APPID,
          timestamp: this.timestamp,
          nonceStr: this.nonceStr,
          signature: this.signature,
          jsApiList: ['checkJsApi', 'getLocation']
        })
        var that = this
        // wx.config信息验证后会执行wx.ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function () {
          // 检查配置结果
          wx.checkJsApi({
            jsApiList: ['getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            // 成功
            success: function (res) {
              // alert(res.checkResult.getLocation)
              if (res.checkResult.getLocation == false) {
                Dialog({
                  message: '你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！'
                })
                return
              }
            }
          })

          // 获取当前地理位置
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            // 定位成功
            success: function (res) {
              var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed // 速度，以米/每秒计
              var accuracy = res.accuracy // 位置精度
              console.log({ latitude: latitude, longitude: longitude, speed: speed, accuracy: accuracy })
              //
              geocoder({ lat: latitude, lng: longitude })
                .then(function (response) {
                  console.log(JSON.stringify(response.data))
                  // 如果当前位置和localStorage currentCity位置一样，则不弹定位确认窗；如果不一样时，才弹定位确认窗是否使用当前定位位置
                  if (that.currentCity.indexOf(response.data.c) != -1) {
                    // 包含（说明所在城市和本地缓存城市一样），不弹定位窗
                  } else {
                    // 弹窗确认是否使用定位到的城市
                    Dialog.confirm({
                      title: `当前定位城市`,
                      message: `${response.data.p + response.data.c + response.data.d} 确认是否使用`
                    })
                      .then(() => {
                        // on confirm
                        that.currentCity = response.data.c
                        localStorage.setItem('currentCity', that.currentCity)
                      })
                      .catch(() => {
                        // on cancel
                        // 使用默认城市：杭州
                      })
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
            },
            // 定位失败
            fail: function (res) {
              Dialog({
                message: '定位失效，请手动选择'
              })
            },
            // 取消定位
            cancel: function (res) {
              Dialog({
                message: '未授权定位，请手动选择'
              })
            }
          })
        })
        // wx.wx.config信息验证后会执行wx.error方法
        wx.error(function (res) {
          // // wx.config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          // Toast.fail('登录超时，请重新登录')
          // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
          // setTimeout(() => {
          //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
          // }, 1500)
          console.log(res)
        })
      })
      .catch(err => {
        console.log(err)
        // // 如果授权失败
        // Toast.fail('登录超时，请重新登录')
        // Notify({ type: 'warning', message: '登录超时，请重新登录', duration: 2000 })
        // setTimeout(() => {
        //   that.$router.push('/login') // 注意：这边微信JSSDK重写了this
        // }, 1500)
        console.log('登录超时，请重新登录', err)
      })
  }
}
</script>
<style lang="scss" scoped>
.form {
  margin-top: 15%;
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
</style>