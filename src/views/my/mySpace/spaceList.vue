// 我的空间
<template>
  <div>
    <!-- 顶栏、创建空间 -->
    <van-nav-bar
      title="我的空间"
      left-arrow
      @click-left="onClickLeft"
      right-text="创建空间"
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
        <!-- 列表 -->
        <div class="spaceItemList">
          <div class="card" v-for="(item, index) in spaceItemList" :key="index">
            <div style="margin-top: 10px; margin-left: 10px">
              <van-row @click="toSpaceDetaily(item.id)">
                <!-- 空间logo图 -->
                <van-col span="6"><img :src="item.logo" alt="暂无图片" width="75" height="75" /> </van-col>
                <!-- 空间名称 -->
                <van-col span="10" offset="1">
                  <div style="font-size: 17px">
                    <span>{{ item.name }}</span>
                  </div>
                </van-col>
                <!-- 空间绑定的房间数量 -->
                <van-col span="6" offset="1">
                  <div>
                    <h4>房间数量：{{ item.id }}</h4>
                  </div>
                </van-col>
              </van-row>
              <van-row @click="toSpaceDetaily(item.id)">
                <van-col span="25">
                  <!-- 空间的省市区位置展示 -->
                  <div style="margin-top: 10px">
                    <span style="font-size: 15px">
                      <van-icon class-prefix="iconfont" name="dingwei1" />{{ item.province }}{{ item.city
                      }}{{ item.district }}</span
                    >
                  </div>
                </van-col>
              </van-row>
              <van-row style="margin-left: 20%; margin-top: 10px; margin-bottom: 10px">
                <!-- 删除 -->
                <van-col span="8" @click="deleteSpace(item.id)"
                  ><van-button round plain type="danger" style="height: 40px">删除空间</van-button></van-col
                >
                <!-- 编辑空间 -->
                <van-col span="8" @click="editSpace(item.id)"
                  ><van-button round plain type="info" style="height: 40px">编辑空间</van-button></van-col
                >
                <!-- 查看房间 -->
                <van-col span="8" @click="viewRoom(item.id)"
                  ><van-button round plain type="info" style="height: 40px">查看房间</van-button></van-col
                >
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
import { Toast, Dialog, Notify } from 'vant'
import axios from 'axios'
import { getSpaceList, deleteSpace } from '@/api/my/mySpace/mySpace.js'
import FormData from 'form-data' // 引入content-type为form-data
/* eslint-disable */
export default {
  name: 'mySpace', // 我的空间
  components: {},
  data() {
    return {
      // 咨询单列表数据
      spaceItemList: [],
      newData: [], // 上拉新加载的新数据（遍历放进“最终数据列表ItemList”）
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
    // 路由跳转（创建空间）
    onClickRight() {
      this.$router.push('/createSpace')
    },
    // 路由跳转（创建空间）
    toSpaceDetaily(id) {
      this.$router.push(`/spaceDetaily/${id}`)
    },
    // 删除空间
    deleteSpace(id) {
      Dialog.confirm({
        title: '请确认是否删除',
        message: ''
        // theme: 'round-button'
      })
        .then(() => {
          // on confirm
          //  请求后端，删除空间
          var data = new FormData()
          // 请求body
          data.append('id', id)
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          // 发起请求
          deleteSpace(data, headers)
            .then(response => {
              // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
              console.log(JSON.stringify(response))
              if (response.msg === '操作成功' || response.code === 0) {
                // 删除成功提示
                // Notify({ type: 'primary', message: '刷新中', duration: 1200 })
                // 刷新页面
                this.$router.go(0)
              } else {
                // 删除成功提示
                Notify({ type: 'warning', message: '删除失败', duration: 1200 })
              }
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {
          // on cancel
        })
    },
    // 编辑空间（传入空间ID）
    editSpace(id) {
      this.$router.push(`/editSpace/${id}`)
    },
    // 查看房间（传入空间ID）
    viewRoom(id) {
      this.$router.push(`/roomList/${id}`)
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
        // //  请求后端，获取空间详情页
        // var data = new FormData()
        // // 请求body
        // this.page = 1;// 注意：这边需要初始化
        // this.pageCount = 4;// 注意：这边需要初始化
        // data.append('pageNum', this.page)
        // data.append('pageSize', this.pageCount)
        // // 请求header
        // var headers = { OpenID: localStorage.getItem('OpenID') }
        // // 发起请求
        // getSpaceList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.spaceItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.spaceItemList.length >= this.total) {
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
      //  请求后端，获取空间详情页
      var data = new FormData()
      // 请求body
      data.append('pageNum', this.page)
      data.append('pageSize', this.pageCount)
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      getSpaceList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 存储数据
          this.spaceItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.spaceItemList.length >= this.total) {
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
      getSpaceList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 请求完将数据赋值给itemList
          this.newData = response.rows // data1为新数据
          console.log('this.newData:', this.newData)
          this.total = response.total
          // 新旧数据累加合并(新数据每个元素放入旧数组末尾)
          this.newData.forEach(element => {
            // 遍历新加载的数据
            this.spaceItemList.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.spaceItemList:', JSON.stringify(this.spaceItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.spaceItemList.length >= this.total) {
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
    // 上拉加载(初始化数据)
    // this.getItemList()
  },
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  },
  destroyed() {
    // 页面销毁，初始化数据
  }
}
</script>

<style lang="scss" scoped>
// 列表
.spaceItemList {
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
// 遮罩
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>