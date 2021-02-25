<!-- 房源匹配 -->
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="房源匹配" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 定位icon、当前城市 -->
    <div class="currentCity" @click="toChangeCity">
      <!-- TODO 默认城市：存储微信授权后JSSDK请求用户地理位置经纬度 -->
      <h2><van-icon name="location-o" />{{ currentCity }}</h2>
    </div>
    <!-- 下拉菜单 -->
    <div>
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item v-model="value" :options="option" />
        <!-- 下拉菜单：我的发布 -->
        <van-dropdown-item title="我的发布" ref="itemMyRelearse">
          <div>
            <div>
              <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="card" v-for="(item, index) in myRelease" :key="index">
                  <div style="margin-top: 2%; margin-left: 2%">
                    <van-checkbox :name="item.id" @click="checkboxResult"></van-checkbox>
                    <van-row>
                      <!-- 需求单地址 -->
                      <van-col span="10">
                        <div style="font-size: 17px; font-size: 15px; margin-left: 5%">
                          <span>{{ item.address }}</span>
                        </div>
                      </van-col>
                    </van-row>
                    <van-row>
                      <van-col span="20">
                        <!-- 可租赁时间 -->
                        <div style="margin-top: 2%; margin-left: 2%; font-size: 15px">
                          租赁时间段：<span
                            ><div>{{ item.leasableTime }}</div></span
                          >
                        </div>
                      </van-col>
                    </van-row>
                    <van-row> </van-row>
                  </div>
                </div>
              </van-checkbox-group>
            </div>
          </div>
          <div style="padding: 5px 16px">
            <van-button type="info" block round @click="onConfirmMyRelearse"> 确定 </van-button>
          </div>
          <div style="padding: 5px 16px">
            <van-button type="default" block round @click="onClearMyRelearse"> 全选/反选 </van-button>
          </div>
        </van-dropdown-item>
        <!-- 下拉菜单：筛选 -->
        <van-dropdown-item title="筛选" ref="itemScreening">
          <!-- 筛选租赁时间 -->
          <div class="lease-time-title">租赁时间</div>
          <div class="lease-time">
            <van-cell-group>
              <!-- 开始时间 -->
              <van-cell title="开始时间" :value="this.GMTToStr(startTimeValue)" @click="setStartTimeValue" />
              <!-- 结束时间 -->
              <van-cell title="结束时间" :value="this.GMTToStr(endTimeValue)" @click="setEndTimeValue" />
            </van-cell-group>
          </div>
          <!-- 标签 -->
          <div class="lease-time-title">标签</div>
          <div class="screening-tags">
            <Tag
              v-for="(tag, index) in tags"
              :key="index"
              :checkable="checkable"
              :checked="checked"
              :name="tag"
              color="blue"
              @on-change="tagCheckableChange"
              ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
            >
          </div>
          <div style="padding: 5px 16px">
            <van-button type="info" block round @click="onConfirmScreening"> 确定 </van-button>
          </div>
          <div style="padding: 5px 16px">
            <van-button type="default" block round @click="onClearScreening"> 重置 </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>

    <!-- 列表 -->
    <div>
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
            <div class="card" v-for="(item, index) in housingMatchItemList" :key="index">
              <div style="margin-top: 2%; margin-left: 2%">
                <van-row @click="toHousingResourceDetails(item.id)">
                  <!-- 房源单图片 -->
                  <van-col span="6"><img :src="item.image" alt="暂无图片" width="75" height="75" /> </van-col>
                  <!-- 房源单名称、房源单状态 -->
                  <van-col span="10">
                    <div style="font-size: 17px; font-size: 15px; margin-left: 5%">
                      <span>{{ item.name }}</span>
                    </div>
                    <div style="margin-top: 2%; margin-left: 2%; color: red">
                      <h2>￥{{ item.prices }}</h2>
                    </div>
                  </van-col>
                  <!-- 房源单状态 -->
                  <van-col span="5" offset="3">
                    <div
                      class="housingMatchStatus"
                      :style="{ color: item.status === 1 ? '#409EFF' : item.status === 2 ? 'red' : 'block' }"
                    >
                      <span>{{ item.status === 1 ? '有效' : item.status === 2 ? '失效' : '未知状态' }}</span>
                    </div>
                  </van-col>
                </van-row>
                <van-row @click="toHousingResourceDetails(item.id)">
                  <van-col span="20">
                    <!-- 可租赁时间 -->
                    <div style="margin-top: 2%; margin-left: 2%; font-size: 15px">
                      租赁时间段：<span
                        ><div>{{ item.leasableTime }}</div></span
                      >
                    </div>
                  </van-col>
                </van-row>
                <van-row>
                  <!-- 关键标签 -->
                  <div class="tags">
                    <span v-for="(tag, index) in item.tags" :key="index">
                      <Tag color="blue"
                        ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
                      >
                    </span>
                  </div>
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
    <!-- 下拉菜单：筛选 开始时间选择器 -->
    <van-popup v-model="showPopupTimeStart" position="bottom" :style="{ height: '50%' }" round>
      <van-datetime-picker
        v-model="startTimeValue"
        type="datetime"
        title="选择结束时间"
        @confirm="PopupTimeStartConfirm"
        @cancel="PopupTimeStartCancel"
    /></van-popup>
    <!-- 下拉菜单：筛选 结束时间选择器 -->
    <van-popup v-model="showPopupTimeEnd" position="bottom" :style="{ height: '50%' }" round>
      <van-datetime-picker
        v-model="endTimeValue"
        type="datetime"
        title="选择结束时间"
        @confirm="PopupTimeEndConfirm"
        @cancel="PopupTimeEndCancel"
      />
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, DropdownMenu, DropdownItem, Popup } from 'vant'
import { getMerchantsHousingResourceList } from '@/api/my/myHousingResource/myHousingResource.js'
export default {
  name: 'housingMatch', // 房源匹配
  data() {
    return {
      // 当前城市
      currentCity: '杭州',
      // 下拉菜单：筛选
      startTimeValue: new Date(),
      endTimeValue: new Date(),
      showPopupTimeStart: false,
      showPopupTimeEnd: false,
      tags: ['标签1', '标签2', '标签3', '标签4', '标签5', '标签6', '标签7', '标签8', '标签9'], // 待选的标签
      tagsCheckable: [], // 选中的标签
      checked: false, // 选中的状态
      checkable: true, // 开启tag可被选中
      // 下拉菜单：全部
      value: 0,
      option: [{ text: '全部', value: 0 }],
      // 下拉菜单：我的发布
      myRelease: [
        {
          id: '1', // 需求单ID
          address: 'X市X区第一大街1号', // 需求单地址
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 需求单标签
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 需求单可租赁时间段
          createTime: '2020/12/12 12:22' // 需求单创建时间
        },
        {
          id: '2', // 需求单ID
          address: 'X市X区第一大街1号', // 需求单地址
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 需求单标签
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 需求单可租赁时间段
          createTime: '2020/12/12 12:22' // 需求单创建时间
        }
      ],
      result: [], // 复选框
      // 房源列表
      housingMatchItemList: [
        {
          id: '1', // 房源单ID
          name: '第一页-1', // 房源单名称
          prices: '233', // 房源价格
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 房源标签
          image:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源单图片
          status: '有效', // 房源单状态
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 房源单可租赁时间段
          createTime: '2020/12/12 12:22' // 房源单创建时间
        },
        {
          id: '2', // 房源单ID
          name: '第一页-2', // 房源单名称
          prices: '300', // 房源价格
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 房源标签
          image:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源单图片
          status: '有效', // 房源单状态
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 房源单可租赁时间段
          createTime: '2020/12/12 12:22' // 房源单创建时间
        },
        {
          id: '3', // 房源单ID
          name: '第一页-3', // 房源单名称
          prices: '300', // 房源价格
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 房源标签
          image:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源单图片
          status: '有效', // 房源单状态
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 房源单可租赁时间段
          createTime: '2020/12/12 12:22' // 房源单创建时间
        },
        {
          id: '4', // 房源单ID
          name: '第一页-4', // 房源单名称
          prices: '300', // 房源价格
          tags: ['网红打卡', '安静文艺', '网红打卡'], // 房源标签
          image:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源单图片
          status: '有效', // 房源单状态
          leasableTime: '2020/12/12  ~2020/12/12 12:00 ~ 14:00', // 房源单可租赁时间段
          createTime: '2020/12/12 12:22' // 房源单创建时间
        }
      ],
      newData: [], // 上拉新加载的新数据（遍历放进”最终数据列表housingMatchItemList“）
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
  methods: {
    // 下拉菜单项：我的发布 确定
    onConfirmMyRelearse() {
      this.$refs.itemMyRelearse.toggle()
      // TODO 请求后端，获取需求信息
    },
    // 下拉菜单项：我的发布 清空（反选）
    onClearMyRelearse() {
      this.$refs.checkboxGroup.toggleAll()
      //
      console.log('toggleAll checkedResult', this.result)
    },
    // 下拉菜单项：筛选 确定
    onConfirmScreening() {
      this.$refs.itemScreening.toggle()
    },
    // 下拉菜单项：筛选 重置
    onClearScreening() {
      this.startTimeValue = this.GMTToStr(new Date())
      this.endTimeValue = this.GMTToStr(new Date())
      // TODO
      this.tagsCheckable = [] // 清空标签选中数组
    },
    // 路由跳转（切换城市页）
    toChangeCity() {
      this.$router.push('/changeCity')
    },
    // 路由跳转（返回首页）
    onClickLeft() {
      this.$router.push('/my')
      // this.$router.go(-1);// 返回上一页
    },
    // 路由跳转（房源单详情页）
    toHousingResourceDetails(housingResourceID) {
      this.$router.push(`/housingResourceDetailsUser/${housingResourceID}`)
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
          // TODO 请求后端接口，删除房源

          // 删除成功提示
          Notify({ type: 'primary', message: '删除成功', duration: 1200 })
          // TODO 刷新页面
        })
        .catch(() => {
          // on cancel
        })
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
        // getMerchantsHousingResourceList(data, headers)
        //   .then(response => {
        //     // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
        //     console.log(JSON.stringify(response.rows))
        //     // 存储数据
        //     this.housingMatchItemList = response.rows // 列表数据
        //     this.total = response.total // 总条数
        //     this.isLoading = false // 隐藏加载中
        //     if (this.housingMatchItemList.length >= this.total) {
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
      getMerchantsHousingResourceList(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getRoomList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.rows))
          // 存储数据
          this.housingMatchItemList = response.rows // 列表数据
          this.total = response.total // 总条数
          this.isLoading = false // 隐藏加载中
          if (this.housingMatchItemList.length >= this.total) {
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
      getMerchantsHousingResourceList(data, headers)
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
            this.itemLihousingMatchItemListst.push(element) // 每个新加载数据，放入旧数据中（旧数据末尾）
            console.log('element:', JSON.stringify(element))
            console.log('this.housingMatchItemList:', JSON.stringify(this.housingMatchItemList))
          })

          // 加载中
          this.loading = false
          // 数据全部加载完成（当列表数据大于接口返回总数据时，显示加载完成）
          if (this.housingMatchItemList.length >= this.total) {
            this.finished = true // 加载完毕
          }
          // // 刷新完成
          // this.isLoading = false
          // // 隐藏遮罩层
          // this.overlayShow = false
        })
        .catch(err => {})
    },
    // 显示开始时间选择器
    setStartTimeValue() {
      this.showPopupTimeStart = true
    },
    // 显示结束时间选择器
    setEndTimeValue() {
      this.showPopupTimeEnd = true
    },
    // 开始时间选择器，确定按钮事件
    PopupTimeStartConfirm(value) {
      // 收齐时间选择器
      this.showPopupTimeStart = false
      // 当前选中的时间
      this.timeStart = value
      console.log('this.timeStart', this.timeStart)
    },
    // 开始时间选择器，取消按钮事件
    PopupTimeStartCancel() {
      this.showPopupTimeStart = false
    },
    // 结束时间选择器，确定按钮事件
    PopupTimeEndConfirm(value) {
      // 收齐时间选择器
      this.showPopupTimeEnd = false
      // 当前选中的时间
      this.timeEnd = value
      console.log('this.timeEnd', this.timeEnd)
    },
    // 结束时间选择器，取消按钮事件
    PopupTimeEndCancel() {
      this.showPopupTimeEnd = false
    },
    // GMT转普通格式
    GMTToStr(time) {
      let date = new Date(time)
      let Str =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds()
      return Str
    },
    // 选中标签，放入tagsCheckable数组中
    tagCheckableChange(checked, name) {
      // 被选中时，放入数组中
      switch (checked) {
        case true:
          this.tagsCheckable.push(name)
          break
        default:
          this.tagsCheckable.pop(name)
          break
      }
      console.log(' this.tagsCheckable', JSON.stringify(this.tagsCheckable))
    },
    //
    checkboxResult() {
      console.log('checkResult', this.result)
    }
  },
  computed: {},
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#FFFFFF'
  },
  created() {
    // 上拉加载(初始化数据)
    // this.getItemList()
    // 地理位置
    console.log(window.localStorage.getItem('currentCity'))
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
  beforeCreate() {
    // 获取用户登录状态
    var isLogin = localStorage.getItem('isLogin')
    if (isLogin !== 'yes' || isLogin === undefined || isLogin === '' || isLogin === '') {
      this.$router.push('/login')
      // Notify 失败提示
      Notify({ type: 'danger', message: '未登录请先登录账号', duration: 2000 })
    }
  }
}
</script>
<style lang="scss" scoped>
.currentCity {
  margin-top: 5%;
  margin-left: 5%;
}
// 卡片
.card {
  // position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 5%;
  background-color: rgba(255, 255, 255, 0.753);
  border-width: 1px;
  /* 边线 */
  border-style: solid;
  border-color: gainsboro;
  /* 圆角 */
  border-radius: 20px;
  /* 背景 */
  background: rgb(255, 255, 255);
  /* 卡片内部间距，单位 px */
  padding: 5px;
}
.lease-time-title {
  font-family: 'Courier New', Courier, monospace;
  font-size: 17px;
  margin-left: 5%;
  margin-top: 5%;
  font-weight: bold;
}
.lease-time {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 5%;
}
// 标签
.tags {
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
}
// 标签
.screening-tags {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 5%;
}
// 图片
img {
  margin-left: 3%;
  margin-top: 1%;
  width: 95%;
  height: 95%;
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
