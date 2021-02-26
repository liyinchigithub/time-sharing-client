// 我的发布（需求单列表）
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="我的发布" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />

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
        <br />
        <br />
        <!-- 列表 -->
        <div class="card" v-for="(item, index) in myReleaseItemList" :key="index">
          <div>
            <van-row @click="toMyReleaseRequireDetail(item.id)">
              <!-- 需求单-地址 -->
              <van-col span="10">
                <div style="margin-left: 15px; margin-top: 5px; color: block; font-size: 16px">
                  <span><van-icon name="location-o" />{{ item.requireOrderAddress }}</span>
                </div>
              </van-col>
              <van-col span="5" offset="8">
                <!-- 订单状态 -->
                <div style="margin-top: 5px">
                  <h2>{{ item.requireOrderStatus }}</h2>
                </div>
              </van-col>
            </van-row>
            <van-row>
              <div style="margin-left: 5px">
                <van-col span="25">
                  <van-row @click="toMyReleaseRequireDetail(item.id)">
                    <!-- 关键标签 -->
                    <div class="tags">
                      <span v-for="(tag, index) in item.tags" :key="index">
                        <Tag color="blue"><van-icon class-prefix="iconfont" name="youhui" />{{ tag }}</Tag>
                      </span>
                    </div>
                  </van-row>
                  <van-row @click="toMyReleaseRequireDetail(item.id)">
                    <!-- 需求单-需求时间 -->
                    <div style="margin-left: 15px; margin-top: 8px; font-size: 17px">
                      <van-col span="25">
                        <span>需求时间：{{ item.requireOrderCreateTime }}</span></van-col
                      >
                    </div>
                  </van-row>
                  <van-row>
                    <!-- 需求单-发布时间 -->
                    <div style="margin-left: 15px; margin-top: 8px; font-size: 17px">
                      <van-row>
                        <van-col span="22" @click="toMyReleaseRequireDetail(item.id)"
                          ><span>发布时间：{{ item.requireOrderCreateTime }}</span></van-col
                        >
                        <van-col span="15" offset="20"
                          ><span
                            v-show="item.requireOrderStatus === '进行中' ? true : false"
                            style="color: red; font-size: 20px"
                            @click="requireOrderCancel"
                            >取消</span
                          ></van-col
                        >
                      </van-row>
                    </div>
                  </van-row>
                </van-col>
              </div>
            </van-row>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <!-- 遮罩层 -->
    <van-overlay :show="overlayShow">
      <div class="wrapper">
        <div class="block">
          <van-loading size="40px" color="#1989fa"> </van-loading>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
import { getOrderList } from '@/api/my/myOrder/myOrder.js'
export default {
  name: 'myRelease', // 我的订单
  components: {},
  data() {
    return {
      // 列表数据
      myReleaseItemList: [],
      // 是否显示取消按钮
      showCancel: true,
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表ItemList“）
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
      overlayShow: false
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/my')
      // this.$router.go(-1);// 返回上一页
    },
    // 路由跳转（订单详情页）
    toMyReleaseRequireDetail(requireID) {
      this.$router.push(`/myReleaseRequireDetails/${requireID}`)
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
        // this.page = 1 // 注意：这边需要初始化
        // this.pageCount = 4 // 注意：这边需要初始化
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getReleaseList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.myReleaseItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.myReleaseItemList.length >= this.total) {
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
      getReleaseList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 存储数据
          this.myReleaseItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.myReleaseItemList.length >= this.total) {
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
      getRoomList(data, headers)
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
            this.myReleaseItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.myReleaseItemList:', JSON.stringify(this.myReleaseItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.myReleaseItemList.length >= this.total) {
            this.finished = true // 加载完毕
          }
          // // 刷新完成
          // this.isLoading = false
          // // 隐藏遮罩层
          // this.overlayShow = false
        })
        .catch(err => {})
    },
    // 需求单取消
    requireOrderCancel() {
      Dialog.confirm({
        title: '',
        message: '是否取消'
      })
        .then(() => {
          // TODO 请求后端，取消需求单接口

          // 刷新页面
          location.reload()
          // 显示遮罩层
          this.overlayShow = true
          // 隐藏遮罩层
          setTimeout(() => {
            this.overlayShow = false
          }, 1000)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
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
  }
}
</script>
<style scoped>
.tabs {
  margin-top: 12%;
}

.card {
  /* position: absolute; */
  width: 96%;
  margin-left: 2%;
  margin-top: 3%;
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

/* 遮罩层loading */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* 标签 */
.tags {
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}
</style>