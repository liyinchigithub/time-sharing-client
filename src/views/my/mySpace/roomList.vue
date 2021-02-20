// 房间列表
<template>
  <div>
    <!-- 顶栏、创建房间 -->
    <van-nav-bar
      title="我的房间"
      left-arrow
      @click-left="onClickLeft"
      right-text="创建房间"
      @click-right="onClickRight"
      :fixed="true"
      :border="true"
    />
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
        <div class="roomItemList">
          <div class="card" v-for="(item, index) in roomItemList" :key="index">
            <div style="margin-top: 5%; margin-left: 5%">
              <van-row @click="toRoomDetails(item.id)">
                <!-- 房间单图片 -->
                <van-col span="6"><img :src="item.logo" alt="暂无图片" width="80" height="80" /> </van-col>
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
                    <van-button plain type="danger" style="width: 90px; height: 40px" @click="toDeleteRoom(item.id)"
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
import { Toast, Dialog, Notify } from 'vant'
import { getRoomList, deleteRoom } from '@/api/my/mySpace/room/roomList.js'
import FormData from 'form-data' // 引入content-type为form-data
export default {
  name: 'roomList', // 房间列表
  components: {},
  data() {
    return {
      spaceID: 1, // 当前房间列表，所属空间的空间ID（存储当前列表所有房间所属空间）
      // 咨询单列表数据
      roomItemList: [],
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表ItemList“）
      // 下拉刷新
      isLoading: false, // 是否显示加载中
      page: 0, // 页数
      pageCount: 4, // 每页记录数
      total: 12, // 总记录数
      // 上拉加载
      loading: false, // 是否显示加载中
      finished: false, // 是否显示加载完成
      // 遮罩层
      overlayShow: false // 遮罩层
    }
  },
  computed: {},
  methods: {
    // 路由跳转（我的空间列表）
    onClickLeft() {
      this.$router.push('/spaceList')
      // this.$router.go(-1);// 返回上一页
    },
    // 路由跳转（创建房间）
    onClickRight() {
      this.$router.push(`/createRoom/${this.spaceID}`)
    },
    // 删除房间
    toDeleteRoom(roomID) {
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
          //  请求后端接口，删除房间
          var FormData = require('form-data')
          var data = new FormData()
          // 请求body
          data.append('id', roomID)
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          deleteRoom(data, headers).then(response => {
            console.log(JSON.stringify(response.data))
            if (response.msg === '操作成功' || response.code === 0) {
              // 刷新页面
              this.$router.go(0)
            } else {
              // Notify 失败提示
              Notify({ type: 'warning', message: '获取空间详情失败', duration: 2000 })
            }
          })
          // 刷新页面
        })
        .catch(() => {
          // on cancel
        })
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
        // //  请求后端接口，获取列表数据（默认一页X个数据） 根据当前选中tab类型请求数据
        // var data = new FormData()
        // // 请求body
        // this.page = 1 // 注意：这边需要初始化
        // this.pageCount = 4 // 注意：这边需要初始化
        // data.append('sid', this.spaceID)
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getRoomList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.roomItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.roomItemList.length >= this.total) {
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
     * @method roomList
     * @param page 页面初始化数据
     * @description
     * */
    roomList() {
      //  请求后端，获取空间列表
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
          this.roomItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.roomItemList.length >= this.total) {
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
          // 请求完将数据赋值给itemList
          this.newData = response.rows // data1为新数据
          console.log('this.newData:', this.newData)
          this.total = response.total
          // 新旧数据累加合并(新数据每个元素放入旧数组末尾)
          this.newData.forEach(element => {
            // 遍历新加载的数据
            this.roomItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.roomItemList:', JSON.stringify(this.roomItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.roomItemList.length >= this.total) {
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
    // 接收路由地址传参
    this.spaceID = this.$route.params.spaceID
    console.log(`空间ID：${this.spaceID}`)
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  },
  destroyed() {

  }
}
</script>
<style lang="scss" scoped>
// 列表
.roomItemList {
  margin-top: 13%;
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