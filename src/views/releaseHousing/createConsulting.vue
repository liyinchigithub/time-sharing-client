// 创建咨询单页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="创建咨询单页" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 表单 -->
    <van-form class="form" @submit="onSubmit" @failed="failed">
      <!-- 空间 -->
      <van-field
        v-model="spaceCurrentSelectName"
        name="space"
        label="空间"
        placeholder="请选择选择关联空间"
        :rules="[{ required: true, message: '必填' }]"
        @click="SpacePicker"
        readonly
      />
      <!-- 房间 -->
      <van-field
        v-model="roomCurrentSelectName"
        name="room"
        label="房间"
        placeholder="请选择房间"
        :rules="[{ required: true, message: '必填' }]"
        @click="RoomPicker"
        readonly
      />

      <!-- 租赁时间段 开始时间-结束时间 -->
      <van-cell
        title="租赁日期"
        :value="date"
        @click="showCalendarDate = true"
        is-link
        :min-date="minDate"
        :max-date="maxDate"
      />
      <van-cell title="租赁开始时间" :value="startTime" is-link @click="PopupStartTime" />
      <van-cell title="租赁结束时间" :value="endTime" is-link @click="PopupEndTime" />
      <!-- 关键标签 -->
      <!-- <van-checkbox-group v-model="tagsSelectResult">
        <van-cell-group title="请选择关键标签">
          <van-cell v-for="(item, index) in tags" clickable :key="item" :title="`${item}`" @click="toggle(index)">
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group> -->
      <!-- 价格范围（元/时） -->
      <van-field
        id="priceRange"
        v-model="priceRange"
        type="digit"
        label="价格（元/时）"
        placeholder="请输入"
        :rules="[{ required: true, message: '必填' }]"
      />
      <!-- 售卖价格（元/时) -->
      <van-field
        id="sellingPrice"
        v-model="sellingPrice"
        type="digit"
        label="售卖价格（元/时)"
        placeholder="请输入"
        :rules="[{ required: true, message: '必填' }]"
      />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        v-model="mobile"
        type="tel"
        label="手机号"
        placeholder="请输入"
        :rules="[{ required: true, message: '必填' }]"
      />
      <!-- 咨询单介绍 -->
      <van-field
        v-model="description"
        name="description"
        label="咨询单介绍"
        rows="4"
        type="textarea"
        maxlength="5000"
        placeholder="请填写"
        :rules="[{ required: true, message: '必填' }]"
        show-word-limit
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"> 提交 </van-button>
      </div>
     
    </van-form>
    <!-- 日历 -->
    <van-calendar
      v-model="showCalendarDate"
      type="range"
      @confirm="onConfirm"
      color="#409EFF"
      :min-date="minDate"
      :max-date="maxDate"
      confirm-disabled-text="请选择租赁日期"
    />
    <!-- 入店时间 -->
    <van-popup v-model="showPopupStartTime" position="bottom" :style="{ height: '50%' }" round>
      <van-datetime-picker
        v-model="startTime"
        type="time"
        title="选择租赁入店当天时间"
        :min-hour="1"
        :max-hour="24"
        @confirm="PopupStartTimeConfirm"
        @cancel="PopupStartTimeCancel"
    /></van-popup>
    <van-popup v-model="showPopupEndTime" position="bottom" :style="{ height: '50%' }" round>
      <!-- 离店时间 -->
      <van-datetime-picker
        v-model="endTime"
        type="time"
        title="选择租赁离店当天时间"
        :min-hour="1"
        :max-hour="24"
        @confirm="PopupEndTimeConfirm"
        @cancel="PopupEndTimeCancel"
      />
    </van-popup>
    <van-popup v-model="showSpacePicker" position="bottom" :style="{ height: '50%' }" round>
      <!-- 空间选择器 -->
      <van-picker
        title="请选择空间"
        show-toolbar
        :columns="spaceColumns"
        @confirm="onConfirmSpace"
        @cancel="onCancelSpace"
        @change="onChangeSpace"
      />
    </van-popup>
    <van-popup v-model="showRoomPicker" position="bottom" :style="{ height: '50%' }" round>
      <!-- 房间选择器 -->
      <van-picker
        title="请选择房间"
        show-toolbar
        :columns="roomColumns"
        @confirm="onConfirmRoom"
        @cancel="onCancelRoom"
        @change="onChangeRoom"
      />
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify, Calendar, DatetimePicker, Popup } from 'vant'
import { createFavorite } from '@/api/favorite/favorite.js'
import { getSpaceList } from '@/api/my/mySpace/mySpace.js'
import { getRoomList } from '@/api/my/mySpace/room/roomList.js'
import { getCategoryList } from '@/api/common/common.js'
export default {
  name: 'createFavorite', // 创建咨询单页
  components: {},
  data() {
    return {
      favoriteID: '', // 咨询单ID
      space: '', // 空间
      room: '', // 房间
      mobile: '', // 发送短信手机号
      description: '', //咨询单说明
      sellingPrice: '', // 住户每小时收益，单位分
      priceRange: '', // 销售每小时价格，单位分
      date: '', // 入店日期-离店日期 yyyy-MM-dd-yyyy-MM-dd
      startDate: '', // 入店日期 yyyy-MM-dd
      endDate: '', // 离店日期 yyyy-MM-dd
      showCalendarDate: false, // 日历显示
      startTime: '', // 入店时间
      endTime: '', // 离店时间
      showPopupStartTime: false, // 入店时间选择器控制
      showPopupEndTime: false, // 离店时间选择器控制
      minDate: new Date(2021, 0, 1),
      maxDate: new Date(2050, 1, 31),
      // 空间选择器list
      spaceColumns: [],
      // 房间选择器list
      roomColumns: [],
      // 商户空间数据
      spaceItemList: [],
      // 空间的房间数据
      roomItemList: [],
      // 当前选中空间名称
      spaceCurrentSelectName: '',
      // 当前选中空间索引
      spaceCurrentSelectIndex: 1,
      // 当前选中房间名称
      roomCurrentSelectName: '',
      // 当前选中房间索引
      roomCurrentSelectIndex: 1,
      // 空间选择器
      showSpacePicker: false,
      // 房间选择器
      showRoomPicker: false
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回租客广场列表）
    onClickLeft() {
      this.$router.push('/home')
      // this.$router.go(-1);// 返回上一页
    },
    // 发布咨询单（表单提交） 说明：1，房源需要关联房间，房间需要关联空间。 三者关系：空间 - 房间 - 房源
    onSubmit(values) {
      // TODO 请求后端创建咨询单接口
      //  请求后端，获取房间列表
      var data = new FormData()
      // 请求body
      data.append('sid', this.spaceCurrentSelectSpaceID)
      data.append('rid', this.roomCurrentSelectRoomID)
      data.append('mobile', this.mobile)
      data.append('price', this.priceRange) // 销售每小时价格，单位分
      data.append('description', this.description) // 咨询单说明
      data.append('income', this.sellingPrice) // 住户每小时收益，单位分
      data.append('fromTime', `${this.startDate} ${this.startTime}`)
      data.append('toTime', `${this.endDate} ${this.endTime}`)
      data.append('tags', this.tagsSelectResult)
      data.append('remark', '')
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      createFavorite(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response.data))
          //
          if (response.msg === '操作成功' || response.code === 0) {
            // 成功提示
            Notify({ type: 'primary', message: '发布成功', duration: 1200 })
            this.$router.push('createFavoriteResult')
          } else {
            // 失败提示
            Notify({ type: 'warning', message: '发布失败', duration: 1200 })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Notify 失败提示
    failed() {
      Notify({ type: 'warning', message: '请填写完整', duration: 1200 })
    },
    // 日历（格式化）
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    // 日历
    onConfirm(date) {
      const [start, end] = date
      this.showCalendarDate = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
      // 存储开始日期
      this.startDate = this.formatDate(start)
      // 存储结束日期
      this.endDate = this.formatDate(end)
    },
    // 入店当天时间显示
    PopupStartTime() {
      this.showPopupStartTime = true
    },
    // 离店当天时间显示
    PopupEndTime() {
      this.showPopupEndTime = true
    },
    // 入店当天时间选择器，确定按钮事件
    PopupStartTimeConfirm(value) {
      this.showPopupStartTime = false
      // 当前选中的时间
      this.startTime = value
      console.log('this.startTime', this.startTime)
    },
    // 离店当天时间选择器，取消按钮事件
    PopupStartTimeCancel() {
      this.showPopupStartTime = false
    },
    // 入店当天时间选择器，确定按钮事件
    PopupEndTimeConfirm(value) {
      this.showPopupEndTime = false
      // 当前选中的时间
      this.endTime = value
      console.log('this.endTime', this.endTime)
    },
    // 离店当天时间选择器，取消按钮事件
    PopupEndTimeCancel() {
      this.showPopupEndTime = false
    },
    // 显示空间选择器
    SpacePicker() {
      if (this.spaceColumns === []) {
        Toast.fail('请先新建空间')
      } else {
        this.showSpacePicker = true
      }
    },
    // 显示房间选择器
    RoomPicker() {
      // 判断当前选中空间是否为空，如果为空，提示选择空间
      if (this.spaceCurrentSelectName === '') {
        Toast.fail('请选择空间')
      } else {
        // 判断空间下是否有房间，没有房间提示先新建房间
        if (this.roomColumns === []) {
          Toast.fail('该空间没有房间数据，请先新建房间')
        } else {
          // 初始化房间选择器已有的数据，避免每次展开不断累加数据
          this.roomColumns = []
          //  请求后端，获取空间列表
          var data = new FormData()
          // 请求body
          data.append('pageNum', 1)
          data.append('pageSize', 1000)
          data.append('sid', this.spaceCurrentSelectSpaceID) // TODO sid undefined
          // 请求header
          var headers = { OpenID: localStorage.getItem('OpenID') }
          // 发起请求
          getRoomList(data, headers)
            .then(response => {
              // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
              console.log(JSON.stringify(response.rows))
              // 存储数据
              this.roomItemList = response.rows // 列表数据
              this.roomTotal = response.total // 总条数
              // 遍历房间名称
              var array = response.rows
              for (let index = 0; index < array.length; index++) {
                const element = array[index]
                this.roomColumns.push(element.name)
              }
            })
            .catch(error => {
              console.log(error)
            })
          // 显示房间选择器（房间选择器有数据才显示）
          this.showRoomPicker = true
        }
      }
    },
    // 空间选择器，确定按钮事件
    onConfirmSpace(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`)
      // 根据当前选中索引号，匹配spaceColumns具体元素对象
      this.spaceCurrentSelectSpaceID = this.spaceItemList[index].id
      Toast(`当前值ID：${this.spaceItemList[index].id}`)
      // TODO 根据索引获取数组对应元素中的ID
      this.spaceCurrentSelectName = value
      this.spaceCurrentSelectIndex = index
      // 隐藏空间选择器
      this.showSpacePicker = false
      // TODO 请求后端，根据选择的空间ID，获取所有房间信息。

      // 赋值给roomColumns
    },
    // 空间选择器，发生改变按钮事件
    onChangeSpace(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`)
      // TODO 请求后端，根据选择的空间ID，获取所有房间信息。

      // 赋值给roomColumns
    },
    // 空间选择器，取消按钮事件
    onCancelSpace() {
      this.showSpacePicker = false
    },
    // 房间选择器，确定按钮事件
    onConfirmRoom(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`)
      this.roomCurrentSelectRoomID = this.roomItemList[index].id
      this.roomCurrentSelectName = value
      this.roomCurrentSelectIndex = index
      // 隐藏房间选择器
      this.showRoomPicker = false
    },
    // 房间选择器，发生改变按钮事件
    onChangeRoom(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`)
    },
    // 房间选择器，取消按钮事件
    onCancelRoom() {
      this.showRoomPicker = false
    },
    // 富文本编辑器
    updateData(e = '') {
      // this.description = e
      console.info(e)
    }
  },
  watch: {
    // 监听空间选择器，当前选中值是否发生改变
    spaceCurrentSelectName() {
      // 判断是否首次进来未选中到选中某个值，如果是首次进来，空间默认选中值为空，就不清空房间相关数据，如果空间非空，说明上一次可能选中过已获取过房间数据故就要清空房间相关数据
      if (this.spaceCurrentSelectName !== '') {
        // 当前选中空间值发生改变的话
        this.roomCurrentSelectName = '' // 清空当前选中房间
        this.roomItemList = [] // 清空当前空间下所有房间列表roomItemList
        this.roomColumns = [] // 清空当前空间下所有房间列表选择器选项
        // TODO 请求后端，重新获取新的选择器数据
        this.$options.methods.RoomPicker()
      }
    }
  },
  directives: {},
  created() {
    // 请求后端，获取当前商家所有空间列表
    var data = new FormData()
    // 请求body
    data.append('pageNum', 1)
    data.append('pageSize', 1000)
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    // 发起请求
    getSpaceList(data, headers)
      .then(response => {
        // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
        console.log(JSON.stringify(response.rows))
        // 存储数据
        this.spaceItemList = response.rows // 该商家所有空间列表数据
        // this.roomTotal = response.total // 总条数
        // 遍历空间名称
        var array = response.rows
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          this.spaceColumns.push(element.name) // 注意：spaceColumns仅有存放空间name值，而不是完整的spaceItemList
        }
      })
      .catch(error => {
        console.log(error)
      })

    // 请求后端，获取标签数组
    getCategoryList()
      .then(response => {
        // 请求完将数据赋值给itemList
        this.tags = response.data //
      })
      .catch(err => {
        console.log(err)
      })
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
    // Vue给单独页面添加背景图片
    document.body.style.backgroundImage = '../../assets/image/createFavoriteBG.png'
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.form {
  margin-top: 15%;
}
</style>