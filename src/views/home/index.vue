<!-- 商家广场 -->
<template>
  <div>
    <!-- 定位icon、当前城市 -->
    <div class="currentCity" @click="toChangeCity">
      <!-- TODO 默认城市：存储微信授权后JSSDK请求用户地理位置经纬度 -->
      <h2><van-icon name="location-o" />{{ currentCity }}</h2>
    </div>
    <!-- 标签 -->
    <div class="tabs">
      <van-tabs
        v-model="active"
        animated
        swipeable
        color="#02A7F0"
        title-active-color="#409EFF"
        swipe-threshold="5"
        @change="tabsChange"
      >
        <van-tab v-for="(tab, index) in tabsList" :title="tab" :key="index">
          <!-- 列表 -->
          <div class="list1" v-for="(skeleton, index) in itemList" :title="skeleton" :key="index">
            <!-- 栅格(未加载完数据前展示) -->
            <van-skeleton title avatar :row="3" :loading="skeletonShow" />
          </div>
          <!-- 下拉刷新 -->
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <!-- 上拉加载（滚动条与底部距离小于 offset 时触发load事件） -->
            <van-list
              v-model="loading"
              :finished="finished"
              @load="onLoad"
              :offset="100"
              :immediate-check="true"
              finished-text="已到底"
            >
              <!-- 列表 -->
              <div class="list2" id="list-content">
                <!-- 卡片 -->
                <div class="card" v-for="(item, index) in itemList" :title="item" :key="index" v-show="cardShow">
                  <div @click="toTenantRequirementsDetails(index)">
                    <Card :shadow="false">
                      <div>
                        <div class="cardTile">
                          <van-row>
                            <van-col span="3"><Avatar :src="item.headImgUrl" /></van-col>
                            <van-col span="10">{{ item.username }}</van-col>
                            <!-- TODO 相对时间 -->
                            <van-col span="8" offset="3">发布于：10小时前</van-col>
                          </van-row>
                        </div>
                        <div class="cardTag">
                          <!-- TODO -->
                          <Tag color="blue" v-for="(tag, index) in tabsList" :key="index"
                            ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
                          >
                        </div>
                        <div class="cardLeasableTime">
                          <!-- TODO -->
                          <van-icon class-prefix="iconfont" name="tubiao-bingtu" />{{ item.requireTime }}
                        </div>
                        <div class="cardLocation">
                          <!-- TODO -->
                          <van-icon class-prefix="iconfont" name="dingwei1" />{{ item.requireLocation }}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="overlayShow">
      <div class="wrapper">
        <div class="block"><van-loading size="40px" color="#1989fa"></van-loading></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
/* eslint-disable */
import { PullRefresh, List, Dialog, Toast, Pagination, Notify } from 'vant'
import { getRequirementList } from '@/api/home/home.js' // 引入api
import { getCategoryList } from '@/api/common/common.js' // 引入api
import wx from 'weixin-js-sdk' // 引入微信网页SDK
import config from '../../config/index' // 引入环境配置参数
import { wxGetSignature } from '@/api/login/login.js' // 引入后端api
import { geocoder } from '@/api/common/common.js' // 引入后端api
export default {
  name: 'Home', // 首页
  data() {
    return {
      // 当前城市
      currentCity: '定位中',
      // 顶部tab集合
      tabsList: [],
      // 顶部tab，当前选中
      active: 0,
      // 栅格（加载中）
      skeletonShow: true,
      // 卡片显示
      cardShow: false,
      // 列表数据
      itemList: [],
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表xxxxItemList“）
      // 下拉刷新
      isLoading: false, // 是否显示加载中
      page: 0, // 页数
      pageCount: 4, // 每页记录数
      total: 12, // 总记录数
      overlayShow: false, // 遮罩层
      // 上拉加载
      loading: false, // 是否显示加载中
      finished: false, // 是否显示加载完成
      // 遮罩层
      overlayShow: false,
      // JSSDK参数
      appid: config.APPID,
      timestamp: '',
      nonceStr: '',
      signature: '',
      signatureUrl: '', // 签名url
      latitude: 0, // 经度
      longitude: 0 // 维度
    }
  },
  methods: {
    // 顶部标签切换，触发事件
    tabsChange() {
      console.log('当前选中tab：', this.active)
      // TODO 请求后端数据，获取列表数据并赋值给itemList
    },
    // 路由跳转（进入用户需求详情页）
    toTenantRequirementsDetails(requireID) {
      // TODO 根据当前需求单ID，查询该卡片需求单的信息参数

      // 需求单的信息参数，通过路由传入到给详情页，详情页获取参数进行展示

      // 路由跳转（进入需求详情单）
      this.$router.push({
        name: 'TenantRequirementsDetails',
        params: {
          requireID: requireID, // 租户需求单ID
          avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg', // 商家头像url
          title: 'Zsmart 智尚酒店（精品房源)', // 商家名称
          releaseDate: this.time1, // 发布时间
          LeasableTime: '2020/12/12 ~ 2020/12/13 12:00 ~ 23:00', // 可租赁时间
          tags: ['网红打卡', '安静文艺', '情侣圣地'], // 标签集合
          Location: '杭州-拱墅区' // 地址
        }
      })
      console.log('路由跳转详情页')
    },
    // 路由跳转（切换城市页） 代入当前城市ID？？？
    toChangeCity() {
      this.$router.push('/changeCity')
    },
    /**
     * @method onRefresh
     * @description 下拉刷新
     * */
    onRefresh() {
      // 显示遮罩层
      this.overlayShow = true
      setTimeout(() => {
        // 刷新页面
        this.$router.go(0)
        //   // TODO 请求后端接口，获取列表数据（默认一页X个数据） 根据当前选中tab类型请求数据
        //   var data = new FormData()
        //   // 请求body
        //   this.page = 1 // 注意：这边需要初始化
        //   this.pageCount = 4 // 注意：这边需要初始化
        //   data.append('pageNum', this.page)
        //   data.append('pageSize', this.pageCount)
        //   // 请求header
        //   var headers = { OpenID: localStorage.getItem('OpenID') }
        //   // 发起请求
        //   getRequirementList(data, headers)
        //     .then(response => {
        //       // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //       console.log(JSON.stringify(response.rows))
        //       // 存储数据
        //       this.itemList = response.rows // 列表数据
        //       this.total = response.total // 总条数
        //       this.isLoading = false // 隐藏加载中
        //       if (this.itemList.length >= this.total) {
        //         // 当数据长度大于等于接口返回总数时，说明加载完成
        //         this.finished = true // 显示加载完成
        //       }
        //       // 刷新完成
        //       this.isLoading = false
        //       // 隐藏遮罩层
        //       this.overlayShow = false
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
        // 刷新完成
        this.isLoading = false
        // 隐藏遮罩层
        this.overlayShow = false
      }, 1000)
    },
    /**
     * @method getItemList
     * @param page 页面初始化数据
     * @description
     * */
    getItemList() {
      // TODO 请求后端数据
      var data = new FormData()
      // 请求body
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      getRequirementList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 存储数据
          this.itemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.itemList.length >= this.total) {
            // 当数据长度大于等于接口返回总数时，说明加载完成
            this.finished = true // 显示加载完成
          }
          // 刷新完成
          this.isLoading = false
          // 隐藏遮罩层
          this.overlayShow = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    /**
     * @method onLoad
     * @description 上拉加载
     * */
    onLoad() {
      // 异步更新数据
      console.log('加载')
      this.page++
      var data = new FormData()
      // 请求body
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      getRequirementList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 请求完将数据赋值给itemList
          this.newData = response.rows // data1为新数据
          console.log('this.newData:', this.newData)
          this.total = response.total
          // 新旧数据累加合并(新数据每个元素放入旧数组末尾)
          this.newData.forEach(element => {
            // 遍历新加载的数据
            this.itemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.itemList:', JSON.stringify(this.itemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.itemList.length >= this.total) {
            this.finished = true // 加载完毕
          }
          // // 刷新完成
          // this.isLoading = false
          // // 隐藏遮罩层
          // this.overlayShow = false
        })
        .catch(err => {})
    }
  },
  computed: {},
  beforeCreate() {
    // 获取用户登录状态
    var isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
      this.$router.push('/login')
      // Notify 失败提示
      Notify({ type: 'warning', message: '未登录请先登录账号', duration: 2000 })
    }
  },
  created() {
    // 请求后端，获取标签数组
    getCategoryList()
      .then(response => {
        // 请求完将数据赋值给itemList
        this.tabsList = response.data //
      })
      .catch(err => {
        console.log(err)
      })
    // 上拉加载(初始化数据)
    this.getItemList()
    // 地理位置
    console.log('当前城市：', window.localStorage.getItem('currentCity'))
    if (
      window.localStorage.getItem('currentCity') === '' ||
      window.localStorage.getItem('currentCity') === undefined ||
      window.localStorage.getItem('currentCity') === null
    ) {
      this.currentCity = '杭州'
      // TODO 请求后端接口，获取默认城市，获取列表数据（默认一页X个数据） 根据当前选中tab类型请求数据
    } else {
      this.currentCity = window.localStorage.getItem('currentCity')
      // TODO 请求后端接口，获取指定城市，获取列表数据（默认一页X个数据） 根据当前选中tab类型请求数据
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
.currentCity {
  margin-top: 5%;
  margin-left: 5%;
}
.tabs {
  // margin-top: 1%;
  // bottom: 80%;
  width: 100%;
}
.list1 {
  margin-top: -10%;
  margin-bottom: 15%;
}
.list2 {
  margin-top: -5%;
  margin-bottom: 15%;
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
// 卡片标题
.cardTitle {
  margin-top: 2%;
}
// 卡片租赁时间段
.cardLeasableTime {
  margin-top: 3%;
}
// 分页
.cardLocation {
  margin-top: 4%;
}
// 卡片标签
.cardTag {
  // display: inline;
  margin-top: 5%;
  margin-left: 1%;
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
