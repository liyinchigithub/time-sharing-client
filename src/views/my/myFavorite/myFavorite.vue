// 我的咨询单页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="我的咨询单" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
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
        <div class="list" id="list-content">
          <div
            class="card"
            v-for="(item, index) in myFavoriteItemList"
            :key="index"
            @click="toMyFavoriteDetail(item.id)"
          >
            <div style="margin-top: 10px; margin-left: 10px">
              <van-row>
                <!-- 咨询单图片（房间图片） -->
                <van-col span="6"><img :src="item.room.logo" alt="暂无图片" width="75" height="75" /> </van-col>
                <!-- 咨询单名称、咨询单状态 -->
                <van-col span="10" offset="1">
                  <div style="font-size: 17px">
                    <span>{{ item.space.name }}-{{ item.room.name }}</span>
                  </div>
                </van-col>
                <!-- 咨询单状态 -->
                <van-col span="4" offset="3">
                  <div
                    class="myFavoriteStatus"
                    :style="{ color: item.status === 1 ? '#409EFF' : item.status === 2 ? 'red' : 'block' }"
                  >
                    <span>{{ item.status === 1 ? '已同意' : item.status === 2 ? '已拒绝' : '待咨询' }}</span>
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="25">
                  <!-- 可租赁时间 -->
                  <div style="margin-top: 10px">
                    <span style="font-size: 15px">租赁时间：</span>
                    <span style="font-size: 15px; color: red">{{ item.fromTime }}至{{ item.toTime }}</span>
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <!-- 咨询单创建时间 -->
                <van-col span="15">
                  <div style="margin-top: 10px">
                    <span style="font-size: 15px">创建时间：</span>
                    <span style="font-size: 15px; color: red">{{ item.created }}</span>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
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

import { getMyFavoriteList } from '@/api/my/myFavorite/myFavorite.js'
import { Toast, Dialog, Notify } from 'vant'
import myFavoriteDetail from './myFavoriteDetail.vue'
import FormData from 'form-data' // 引入content-type为form-data
export default {
  name: 'myFavorite', // 咨询单页
  components: {},
  data() {
    return {
      // 列表数据
      myFavoriteItemList: [], // 最终数据列表
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表xxxxItemList“）
      // 下拉刷新
      isLoading: false, // 是否显示加载中
      page: 0, // 页数
      pageCount: 4, // 每页记录数
      total: 12, // 总记录数
      // 上拉加载
      loading: false, // 是否显示加载中
      finished: false, // 是否显示加载完成
      overlayShow: false // 遮罩层
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/my')
      //  this.$router.go(-1);// 返回上一页
    },
    // 路由跳转（咨询单详情页）
    toMyFavoriteDetail(favoriteID) {
      this.$router.push(`/myFavoriteDetail/${favoriteID}`)
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
        // // 请求body
        // this.page = 1 // 注意：这边需要初始化
        // this.pageCount = 4 // 注意：这边需要初始化
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getMyFavoriteList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.myFavoriteItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.myFavoriteItemList.length >= this.total) {
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
     * @method myFavoriteList
     * @param page 页面初始化数据
     * @description
     * */
    myFavoriteList() {
      // 请求后端数据
      var data = new FormData()
      // 请求body
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      getMyFavoriteList(data, headers)
        .then(response => {
          console.log('response', response)
          // 请求完将数据赋值给itemList
          this.myFavoriteItemList = response.rows //
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.myFavoriteItemList.length >= this.total) {
            // 当数据长度大于等于接口返回总数时，说明加载完成
            this.finished = true // 显示加载完成
          }
          // 刷新完成
          this.isLoading = false
          // 隐藏遮罩层
          this.overlayShow = false
        })
        .catch(err => {})
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
      getMyFavoriteList(data, headers)
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
            this.myFavoriteItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.myFavoriteItemList:', JSON.stringify(this.myFavoriteItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.myFavoriteItemList.length >= this.total) {
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
    // this.getMyFavoriteList()
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
    // 页面加载完后，调整上拉加载框的高度
    let winHeight = document.documentElement.clientHeight //视口大小
    document.getElementById('list-content').style.minHeight = winHeight - 82 + 'px'
  }
}
</script>
<style lang="scss" scoped>
.list {
  margin-top: 14%;
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
// 咨询单状态
.myFavoriteStatus {
  font-size: 17px;
  font-weight: bold;
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

// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>