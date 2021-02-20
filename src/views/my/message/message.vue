// 消息页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="我的消息" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 列表 -->
    <div class="messageItemList">
      <!-- 顶部tab -->
      <van-tabs v-model="active" title-active-color="#409EFF" color="#02A7F0">
        <!-- 咨询单回执 -->
        <van-tab title="咨询单回执">
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
              <div>
                <div
                  class="card"
                  v-for="(item, index) in messageItemList"
                  :key="index"
                  @click="toMessageDetailsType1(item.id, item.messageType)"
                >
                  <div style="margin-top: 10px; margin-left: 10px">
                    <van-row>
                      <!-- 咨询单图片 -->
                      <van-col span="6"><img :src="item.image" alt="暂无图片" width="75" height="75" /> </van-col>
                      <!-- 咨询单名称、咨询单状态 -->
                      <van-col span="12" offset="1">
                        <div style="font-size: 17px">
                          <span>{{ item.name }}</span>
                        </div>
                      </van-col>
                      <!-- 咨询单状态 -->
                      <van-col span="4" offset="1">
                        <div
                          class="messageStatus"
                          :style="{ color: item.status === 1 ? '#409EFF' : item.status === 2 ? 'red' : 'block' }"
                        >
                          <span>{{ item.status === 1 ? '有效' : item.status === 2 ? '失效' : '未知状态' }}</span>
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="25">
                        <!-- 可租赁时间 -->
                        <div style="margin-top: 10px">
                          <span style="font-size: 15px">租赁时间：</span><br />
                          <span style="font-size: 15px">{{ item.leasableTime }}</span>
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <!-- 咨询单创建时间 -->
                      <van-col span="18">
                        <div style="margin-top: 10px">
                          <span style="font-size: 15px">创建时间：</span><br />
                          <span style="font-size: 15px">{{ item.createTime }}</span>
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 预订订单 -->
        <van-tab title="预订订单">
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
              <div class="card">
                <!-- TODO -->
                预订订单
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <!-- 房源推送 -->
        <van-tab title="房源推送">
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
              <div class="card">
                <!-- TODO -->
                房源推送
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
import { Toast, Dialog, Notify } from 'vant'
import { getMessageList } from '@/api/my/myMessage/myMessage.js'
export default {
  name: 'message', // 消息页
  components: {},
  data() {
    return {
      // 顶部tab当前选中
      active: 0,
      // 咨询单列表数据
      messageItemList: [],
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表itemList“）
      // 下拉刷新
      isLoading: false, // 是否显示加载中
      page: 0, // 页数
      pageCount: 4, // 每页记录数
      total: 12, // 总记录数
      overlayShow: false, // 遮罩层
      // 上拉加载
      loading: false, // 是否显示加载中
      finished: false // 是否显示加载完成
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/my')
      //  this.$router.go(-1);// 返回上一页
    },
    // 路由跳转（消息详情页-咨询单回执）
    toMessageDetailsType1(id, messageType) {
      this.$router.push(`/messageDetailsType1/${id}`)
    },
    // 路由跳转（消息详情页-预订订单）
    toMessageDetailsType2(id, messageType) {
      this.$router.push(`/messageDetailsType1/${id}`)
    },
    // 路由跳转（消息详情页-房源推送）
    toMessageDetailsType2(id, messageType) {
      this.$router.push(`/messageDetailsType1/${id}`)
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
        // // TODO 请求后端接口，获取列表数据（默认一页X个数据） 根据当前选中tab类型请求数据
        // var data = new FormData()
        // this.page = 1 // 注意：这边需要初始化
        // this.pageCount = 4 // 注意：这边需要初始化
        // // 请求body
        // data.append('sid', this.spaceID)
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getMessageItemList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getMessageList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.messageItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.messageItemList.length >= this.total) {
        //       // 当数据长度大于等于接口返回总数时，说明加载完成
        //       this.finished = true // 显示加载完成
        //     }
        //     // 刷新完成
        //     this.isLoading = false
        //     // 隐藏遮罩层
        //     this.overlayShow = false
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        // 刷新完成
        this.isLoading = false
        // 隐藏遮罩层
        this.overlayShow = false
      }, 1000)
    },
    /**
     * @method getMessageItemList
     * @param page 页面初始化数据
     * @description
     * */
    getItemList() {
      // TODO 请求后端数据(根据当前选中的tab type请求不同消息类型数据)
      var data = new FormData()
      // 请求body
      data.append('sid', this.spaceID)
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      getRoomList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 存储数据
          this.messageItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.messageItemList.length >= this.total) {
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
      getMessageItemList(data, headers)
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
            this.messageItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.messageItemList:', JSON.stringify(this.messageItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.messageItemList.length >= this.total) {
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
  watch: {},
  directives: {},
  created() {
    // 上拉加载(初始化数据)
    // this.getItemList()
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
    // TODO 请求后端 拉取该商家所有"咨询单回执"列表数据
    // TODO 请求后端 拉取该商家所有"预订订单"列表数据
    // TODO 请求后端 拉取该商家所有"房源推送"列表数据
  }
}
</script>
<style lang="scss" scoped>
.messageItemList {
  // position: absolute;
  width: 100%;
  margin-top: 13%;
}
.card {
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 2%;
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
img {
  margin-left: 3%;
  margin-top: 1%;
  width: 95%;
  height: 95%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.messageStatus {
  font-size: 17px;
  font-weight: bold;
}
</style>