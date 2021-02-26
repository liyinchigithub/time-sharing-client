// 咨询单页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="我的房源" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
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
        <div style="margin-top: 11%">
          <div class="card" v-for="(item, index) in housingResourceItemList" :key="index">
            <div style="margin-top: 2%; margin-left: 2%">
              <van-row @click="toHousingResourceDetails(item.id)">
                <!-- 房源单图片 -->
                <van-col span="6"><img :src="item.room.logo" alt="暂无图片" width="70" height="70" /> </van-col>
                <!-- 房源单名称、房源单状态 -->
                <van-col span="10">
                  <div style="font-size: 17px; font-size: 15px; margin-left: 5%">
                    <span>{{ item.name }}</span>
                  </div>
                  <div style="margin-top: 2%; margin-left: 2%; color: red">
                    <h2>￥{{ item.price }}</h2>
                  </div>
                </van-col>
                <!-- 房源单状态 -->
                <van-col span="5" offset="3">
                  <div
                    class="housingResourceStatus"
                    :style="{ color: item.status === 1 ? '#409EFF' : item.status === 2 ? 'red' : 'block' }"
                  >
                    <span>{{ item.status === 1 ? '有效' : item.status === 2 ? '失效' : '未知状态' }}</span>
                  </div>
                </van-col>
              </van-row>
              <van-row @click="toHousingResourceDetails(item.id)">
                <van-col span="23">
                  <!-- 可租赁时间 -->
                  <div style="margin-top: 2%; margin-left: 2%; font-size: 15px">
                    租赁时间：<span
                      ><div>{{ item.fromTime }}-{{ item.toTime }}</div></span
                    >
                  </div>
                </van-col>
              </van-row>
              <!-- 房源单创建时间 -->
              <!-- <van-row>
                <van-col span="15">
                  <div style="margin-top: 10px; font-size: 15px">
                    <span
                      >创建时间：
                      <div>{{ item.created }}</div></span
                    >
                  </div>
                </van-col>
              </van-row> -->
              <van-row @click="toHousingResourceDetails(item.id)">
                <!-- 关键标签 -->
                <div class="tags">
                  <span v-for="(tag, index) in item.tags.split(',')" :key="index">
                    <Tag color="blue"
                      ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
                    >
                  </span>
                </div>
                <!-- 标签 -->
              </van-row>
              <van-row>
                <!-- 删除按钮 -->
                <van-col span="15">
                  <div style="margin-left: 110%; margin-top: 10px; margin-bottom: 10px; font-size: 10px">
                    <van-button
                      plain
                      type="danger"
                      style="width: 90px; height: 30px"
                      @click="deleteHousingResource(item.id)"
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
import { myCustomerHousingResourceList } from '@/api/my/myHousingResource/myHousingResource.js'
import { Toast, Dialog, Notify } from 'vant'
import FormData from 'form-data' // 引入content-type为form-data
export default {
  name: '我的房源', // 咨询单页
  components: {},
  data() {
    return {
      // 列表数据
      housingResourceItemList: [], // 最终展示列表的数据
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表housingResourceItemList“）
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
    // 路由跳转（房源单详情页）
    toHousingResourceDetails(housingResourceID) {
      this.$router.push(`/housingResourceDetails/${housingResourceID}`)
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
        //     this.favoriteItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.favoriteItemList.length >= this.total) {
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
     * @method getHousingResourceItemList
     * @param page 页面初始化数据
     * @description
     * */
    getHousingResourceItemList() {
      // 请求后端数据
      var data = new FormData()
      // 请求body
      data.append('sid', '')
      data.append('rid', '')
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      myCustomerHousingResourceList(data, headers)
        .then(response => {
          console.log('response', response)
          // 请求完将数据赋值给itemList
          this.housingResourceItemList = response.rows //
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.housingResourceItemList.length >= this.total) {
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
      data.append('sid', '')
      data.append('rid', '')
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      myCustomerHousingResourceList(data, headers)
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
            this.housingResourceItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.housingResourceItemList:', JSON.stringify(this.housingResourceItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.housingResourceItemList.length >= this.total) {
            this.finished = true // 加载完毕
          }
          // // 刷新完成
          // this.isLoading = false
          // // 隐藏遮罩层
          // this.overlayShow = false
        })
        .catch(err => {})
    },
    // 删除房源
    deleteHousingResource(housingResourceID) {
      Dialog.confirm({
        title: '请确认是否删除',
        message: ''
        // theme: 'round-button'
      })
        .then(() => {
          // on confirm
          console.log(`房源ID：${housingResourceID}`)
          //  请求后端接口，删除房源
          var data = new FormData()
          // 请求body
          data.append('id', housingResourceID)
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          deleteHousingResource(data, headers)
            .then(response => {
              console.log('response', response)
              // 判断是否删除成功
              if (response.msg === '操作成功' || response.code === 0) {
                // 删除成功提示
                Notify({ type: 'primary', message: '删除成功', duration: 1200 })
                // TODO 刷新页面
                this.$router.go(0)
              } else {
                // 删除失败提示
                Notify({ type: 'warning', message: '删除失败', duration: 1200 })
              }
            })
            .catch(err => {})
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  watch: {},
  directives: {},
  created() {
   // 上拉加载(初始化数据)
    // this.getHousingResourceItemList()
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
// 标签
.tags {
  margin-top: 3%;
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
// 咨询单状态
.housingResourceStatus {
  font-size: 17px;
  font-weight: bold;
}
</style>