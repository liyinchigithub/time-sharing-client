// 我的收藏
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div class="tags">
      <van-tabs type="card" v-model="active" animated swipeable color="#409EFF" @change="clickTab">
        <van-tab title="商家">
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
              <!-- 列表  -->
              <div class="myCollectionItemList">
                <div class="card" v-for="(item, index) in myCollectionItemList" :key="index">
                  <div style="margin-top: 5%; margin-left: 5%">
                    <van-row @click="toCustomerDetails(item.ID)">
                      <!-- 商家图片 -->
                      <van-col span="6"><img :src="item.image" alt="暂无图片" width="80" height="80" /> </van-col>
                      <!-- 商家名称 -->
                      <van-col span="12">
                        <div style="margin-left: 2%; margin-top: 5%; font-size: 15px">
                          <div style="">{{ item.name }}</div>
                        </div>
                        <div style="margin-top: 10px; margin-left: 10px; color: red"></div>
                      </van-col>
                      <van-col span="6">
                        <div style="margin-top: 5%; font-size: 11px">
                          <div style="">房间数量：{{ item.roomNum }}</div>
                        </div>
                        <div style="margin-top: 10px; margin-left: 10px; color: red"></div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <!-- 删除按钮 -->
                      <van-col span="15">
                        <div style="margin-left: 110%; margin-top: 10px; margin-bottom: 10px; font-size: 15px">
                          <van-button
                            plain
                            type="danger"
                            style="width: 90px; height: 40px"
                            @click="deleteCustomer(item.ID)"
                            >删除</van-button
                          >
                        </div>
                      </van-col>
                    </van-row>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="房间">
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
              <!-- 列表  -->
              <div class="myCollectionItemList">
                <div class="card" v-for="(item, index) in myCollectionItemList" :key="index">
                  <div style="margin-top: 5%; margin-left: 5%">
                    <van-row @click="toRoomDetails(item.ID)">
                      <!-- 房间单图片 -->
                      <van-col span="6"><img :src="item.image" alt="暂无图片" width="80" height="80" /> </van-col>
                      <!-- 房间名称 -->
                      <van-col span="16">
                        <div style="margin-left: 5%; margin-top: 5%; font-size: 20px">
                          <div style="">{{ item.name }}</div>
                        </div>
                        <div style="margin-top: 10px; margin-left: 10px; color: red"></div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <!-- 删除按钮 -->
                      <van-col span="15">
                        <div style="margin-left: 110%; margin-top: 10px; margin-bottom: 10px; font-size: 15px">
                          <van-button plain type="danger" style="width: 90px; height: 40px" @click="deleteRoom(item.ID)"
                            >删除</van-button
                          >
                        </div>
                      </van-col>
                    </van-row>
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
import { Toast, Dialog, Notify, Tab, Tabs } from 'vant'
// import { getCollection } from '@/api/my/myollection/myollection.js'
import { getRoomList } from '@/api/my/mySpace/room/roomList.js'
import Axios from 'axios'
export default {
  name: 'myCollection', // 房间列表
  components: {},
  data() {
    return {
      // 标签选中
      active: 0,
      // 列表数据
      myCollectionItemList: [],
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表ItemList“）
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
    // 路由跳转（我的空间列表）
    onClickLeft() {
      this.$router.go(-1) // 返回上一页
    },
    // 删除商家
    deleteCustomer(customerID) {
      Dialog.confirm({
        title: '请确认是否删除',
        message: ''
        // theme: 'round-button'
      })
        .then(() => {
          // on confirm
          // 删除成功提示
          Notify({ type: 'primary', message: '删除成功', duration: 1200 })
          console.log(`商家ID：${customerID}`)
          // TODO 请求后端接口，删除收藏中商家ID

          // 刷新页面
        })
        .catch(() => {
          // on cancel
        })
    },
    // 删除房间
    deleteRoom(roomID) {
      Dialog.confirm({
        title: '请确认是否删除',
        message: ''
        // theme: 'round-button'
      })
        .then(() => {
          // on confirm
          // 删除成功提示
          Notify({ type: 'primary', message: '删除成功', duration: 1200 })
          console.log(`房间ID：${roomID}`)
          // TODO 请求后端接口，删除房间

          // 刷新页面
        })
        .catch(() => {
          // on cancel
        })
    },
    // 路由跳转（商家详情页）
    toCustomerDetails(customerID) {
      this.$router.push(`/CustomerDetaily/${customerID}`)
    },
    // 路由跳转（房间详情页）
    toRoomDetails(roomID) {
      this.$router.push(`/roomDetaily/${this.spaceID}/${roomID}`)
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
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getCollectionList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.myCollectionItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.myCollectionItemList.length >= this.total) {
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
      // 判断当前tab active
      switch (this.active) {
        case 0:
          // TODO 请求后端，获取该租户ID，所有收藏的商家列表
          var data = new FormData()
          // 请求body
          data.append('pageNum', this.page)
          data.append('pageSize', this.pageCount)
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          // 发起请求
          getCollectionList(data, headers)
            .then(response => {
              // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
              console.log(JSON.stringify(response.rows))
              // 存储数据
              this.myCollectionItemList = response.rows // 列表数据
              this.total = response.total // 总条数
              this.isLoading = false // 隐藏加载中
              if (this.myCollectionItemList.length >= this.total) {
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
          break

        default:
          // TODO 请求后端，获取该租户ID，所有收藏的房间列表
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
              // 存储数据
              this.myCollectionItemList = response.rows // 列表数据
              this.total = response.total // 总条数
              this.isLoading = false // 隐藏加载中
              if (this.myCollectionItemList.length >= this.total) {
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
          break
      }
    },
    /**
     * @method onLoad
     * @description 上拉加载
     * */
    onLoad() {
      // 异步更新数据
      console.log('加载')
      this.page++
      // TODO 请求后端数据
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
          this.myCollectionItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.myCollectionItemList.length >= this.total) {
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
    // 商家tab，点击事件
    clickTab() {
      // 判断当前选中active
      switch (this.active) {
        case 0:
          // TODO 请求后端，获取该租客ID，所有收藏的商家列表
          // 需要改成封装API
          Axios.get(`http://127.0.0.1:4343/api/mock8?page=${this.page}`).then(response => {
            this.myCollectionItemList = response.data.data.list
            console.log('this.myCollectionItemList', response.data.data.list)
          })
          break
        default:
          // TODO 请求后端，获取该租客ID，所有收藏的商家列表
          // 需要改成封装API
          Axios.get(`http://127.0.0.1:4343/api/mock8?page=${this.page}`).then(response => {
            this.myCollectionItemList = response.data.data.list
            console.log('this.myCollectionItemList', response.data.data.list)
          })
          break
      }
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
    // 接收路由地址传参
    this.spaceID = this.$route.params.spaceID
    console.log(`空间ID：${this.spaceID}`)
  }
}
</script>
<style lang="scss" scoped>
// 列表
.myCollectionItemList {
  margin-top: 2%;
}
// 卡片
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
// 标签
.tags {
  margin-top: 13%;
}
// 图片
img {
  margin-left: 3%;
  margin-top: 1%;
  width: 95%;
  height: 95%;
}
// 分页
.pagination {
  margin-top: 10%;
}
//  遮罩
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>