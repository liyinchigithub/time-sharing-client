// 创建房间
<template>
  <div>
    <!-- 顶栏、创建房间 -->
    <van-nav-bar title="创建房间" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 表单 -->
    <van-form class="form" @submit="onSubmit" @failed="failed">
      <!-- 房间名称 -->
      <van-field
        v-model="roomName"
        name="roomName"
        label="房间名称："
        placeholder="请填写房间名称"
        :rules="[{ required: true, message: '必填' }]"
      />
      <!-- 房间图片（第一张图将作为封面） -->
      <van-field name="roomLogo" label="房间封面">
        <template #input>
          <van-uploader
            v-model="roomImagesLogoPre"
            :after-read="afterReadLogo"
            :multiple="false"
            :max-count="1"
            :max-size="5 * 1024 * 1024"
            @oversize="onOversize"
          />
        </template>
      </van-field>
      <van-field name="roomImagesUrl" label="房间图片">
        <template #input>
          <van-uploader
            v-model="roomImagesPre"
            :after-read="afterRead"
            :multiple="false"
            :max-count="10"
            :max-size="5 * 1024 * 1024"
            @oversize="onOversize"
          />
        </template>
      </van-field>
      <!-- 房间介绍 -->
      <van-field
        v-model="roomIntroduced"
        name="roomIntroduced"
        label="房间介绍"
        rows="4"
        type="textarea"
        maxlength="5000"
        placeholder="请填写房间介绍"
        :rules="[{ required: true, message: '必填' }]"
        show-word-limit
      />
      <!-- 设施服务 -->
      <van-field
        v-model="roomFacilityService"
        name="roomFacilityService"
        label="设施服务"
        rows="4"
        type="textarea"
        maxlength="5000"
        placeholder="请填写设施服务"
        :rules="[{ required: true, message: '必填' }]"
        show-word-limit
      />
      <!-- 房间介绍 -->
      <van-field
        v-model="roomAttention"
        name="roomAttention"
        label="预订须知"
        rows="4"
        type="textarea"
        maxlength="5000"
        placeholder="请填写预订须知"
        :rules="[{ required: true, message: '必填' }]"
        show-word-limit
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"> 提交 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
import { ossupload } from '@/api/common/common.js' // 引入后端api
import { createRoom } from '@/api/my/mySpace/room/roomList.js'
import axios from 'axios'
export default {
  name: 'createRoom', // 创建房间
  components: {},
  data() {
    return {
      spaceID: 1, // 空间完成页，空间ID（路由地址传入）
      roomID: 1, // 房间ID
      roomName: '', //房间名称
      roomImagesLogoPre: [], // 房间封面，预览用（存放的是file对象）
      roomLogo: [], // 房间封面，存放图片上传服务器后存放服务器所在的地址（存放的是file.file.path）（第一张图将作为封面）
      roomImagesPre: [], // 房间详情页图片，预览用（存放的是file对象）
      roomImagesURL: [], // 房间详情页图片，存放图片上传服务器后存放服务器所在的地址（存放的是file.file.path）（第一张图将作为封面）
      roomIntroduced: '', // 房间介绍
      roomFacilityService: '', // 设施服务
      roomAttention: '' // 预订须知
    }
  },
  computed: {},
  methods: {
    // 路由跳转（房间列表）
    onClickLeft() {
      this.$router.push(`/roomList/${this.spaceID}`)
    },
    // 表单提交
    onSubmit(values) {
      console.log('submit', values)
      // 请求后端
      var data = new FormData()
      // 请求body
      data.append('sid', this.spaceID) // 房间所属空间ID
      data.append('name', this.roomName) // 房间名称
      data.append('logo', this.roomLogo[0]) // 房间logo图片
      data.append('images', this.roomImagesURL) // 房间详情图片
      data.append('description', this.roomIntroduced) // 房间介绍
      data.append('services', this.roomFacilityService) // 设施服务
      data.append('notice', this.roomAttention) // 预订须知
      data.append('remark', '')
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      createRoom(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response))
          // 判断是否创建成功
          if (response.msg === '操作成功') {
            Notify({ type: 'primary', message: '创建成功', duration: 1200 }) // Notify 成功提示
            // 存储房间ID
            this.roomID = response.data.id
            // 路由跳转（创建房间完成）
            this.$router.push(`/createRoomDone/${this.spaceID}/${this.roomID}`) // 路由跳转传参（spaceID、roomID到createRoomDone,再从createRoomDone传到roomDetaily）
          } else {
            // Notify 失败提示
            Notify({ type: 'warning', message: '创建失败', duration: 1500 })
          }
        })
        .catch(error => {
          // 这边要用箭头函数，才可以this引用上下文
          console.log(error)
        })
    },
    // 图片上传(logo)
    afterReadLogo(file) {
      console.log(file)
      console.log(file.content)
      //  请求后端文件服务器，将文件上传至服务器
      var formData = new FormData() //构造一个 FormData，把后台需要发送的参数添加
      var updateFile = this.$options.methods.dataURLtoFileFun(file.content, 'file.jpg')
      console.log('updateFile', updateFile)
      formData.append('file', updateFile)
      axios
        .post('https://pms.bchat.top/common/ossupload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          // 这边要用箭头函数，才可以this引用上下文
          // 组件状态（上传中）
          file.status = 'uploading'
          file.message = '上传中...'
          // Toast
          Toast.loading({
            message: '加载中...',
            forbidClick: true
          })
          // console.log(response);
          if (response.data.code !== 0 || response.data.msg !== '操作成功') {
            Toast.fail('提交失败，请联系管理员')
          } else {
            // 组件状态（上传中）
            file.status = 'success'
            file.message = '上传成功'
            // Toast
            Toast.success('图片上传成功')
            // 响应body返回图片存储服务器所在路径
            console.log(this.roomLogo)
            this.roomLogo.push(response.data.data) // 服务器返回url赋值给roomLogo用于表单提交
          }
        })
        .catch(error => {
          // 这边要用箭头函数，才可以this引用上下文
          console.log(error)
        })
    },
    // 图片上传
    afterRead(file) {
      console.log(file)
      console.log(file.content)
      //  请求后端文件服务器，将文件上传至服务器
      var formData = new FormData() //构造一个 FormData，把后台需要发送的参数添加
      var updateFile = this.$options.methods.dataURLtoFileFun(file.content, 'file.jpg')
      console.log('updateFile', updateFile)
      formData.append('file', updateFile)
      axios
        .post('https://pms.bchat.top/common/ossupload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          // 这边要用箭头函数，才可以this引用上下文
          // 组件状态（上传中）
          file.status = 'uploading'
          file.message = '上传中...'
          // Toast
          Toast.loading({
            message: '加载中...',
            forbidClick: true
          })
          // console.log(response);
          if (response.data.code !== 0 || response.data.msg !== '操作成功') {
            Toast.fail('提交失败，请联系管理员')
          } else {
            // 组件状态（上传中）
            file.status = 'success'
            file.message = '上传成功'
            // Toast
            Toast.success('图片上传成功')
            // 响应body返回图片存储服务器所在路径
            console.log('this.roomImagesURL', response.data.data)
            this.roomImagesURL.push(response.data.data)
          }
        })
        .catch(error => {
          // 这边要用箭头函数，才可以this引用上下文
          console.log(error)
        })
    },
    //  图片上传（限制上传大小）
    onOversize(file) {
      console.log(file)
      Toast('文件大小不能超过 10Mb')
    },
    // TODO 图片上传（限制上传格式）
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }
      return true
    },
    // 图片上传，bae64转文件对象
    dataURLtoFileFun(dataurl, filename) {
      // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    },
    // Notify 失败提示
    failed() {
      Notify({ type: 'warning', message: '请填写完整', duration: 1200 })
    }
  },
  watch: {},
  directives: {},
  created() {},
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
.form {
  margin-left: 2%;
  margin-top: 15%;
}
.card {
  position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 40%;
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
</style>