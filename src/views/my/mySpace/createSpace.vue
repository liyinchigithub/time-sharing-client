// 创建空间
<template>
  <div>
    <!-- 顶栏、创建房间 -->
    <van-nav-bar title="创建空间" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 表单 -->
    <div class="form">
      <van-form @submit="onSubmit" @failed="failed">
        <!-- 空间名称 -->
        <van-field
          v-model="spaceName"
          name="spaceName"
          label="空间名称："
          placeholder="请填写空间名称"
          :rules="[{ required: true, message: '必填' }]"
        />
        <!-- 地区选择 -->
        <van-field
          readonly
          clickable
          name="area"
          :value="spacePosition"
          label="地区选择："
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
        <!-- 详细地址 -->
        <van-field
          v-model="spaceDetailedAddress"
          name="spaceDetailedAddress"
          label="详细地址："
          rows="5"
          type="textarea"
          maxlength="500"
          placeholder="请填写详细地址"
          :rules="[{ required: true, message: '必填' }]"
          show-word-limit
        />
        <!-- 空间logo -->
        <van-field name="spaceMerchantDetailsLogo" label="空间logo">
          <template #input>
            <van-uploader
              :after-read="afterReadLogo"
              v-model="spaceMerchantDetailsImagesLogoPre"
              :multiple="false"
              :max-count="1"
              :max-size="5 * 1024 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <!-- 商家详情图 -->
        <van-field name="spaceMerchantDetailsImages" label="商家详情图">
          <template #input>
            <van-uploader
              :after-read="afterRead"
              v-model="spaceMerchantDetailsImagesPre"
              :multiple="false"
              :max-count="10"
              :max-size="5 * 1024 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <!-- 详细介绍 -->
        <van-field
          v-model="spaceDetailedIntroduction"
          name="spaceDetailedIntroduction"
          label="详细介绍："
          rows="5"
          type="textarea"
          maxlength="1000"
          placeholder="请填写详细介绍"
          :rules="[{ required: true, message: '必填' }]"
          show-word-limit
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import area from '../../../utils/area'
import { Toast, Dialog, Notify } from 'vant'
import axios from 'axios'
import { createSpace } from '@/api/my/mySpace/mySpace.js'
export default {
  name: 'createRoom', // 创建空间
  components: {},
  data() {
    return {
      spaceName: '', // 空间名称
      spaceProvinces: '', // 省
      spaceCity: '', // 市
      spaceDistrict: '', // 区
      spaceDetailedAddress: '', // 详细地址
      spaceMerchantDetailsImagesLogoPre: [], // 空间封面,预览用（存放的是file对象）
      spaceLogo: [], // 空间封面,存放图片上传服务器后存放服务器所在的地址（存放的是file.file.path）（第一张图将作为封面）
      spaceMerchantDetailsImagesPre: [], // 空间详情图片，预览用（存放的是file对象）
      spaceMerchantDetailsImagesURL: [], // 空间详情图片，存放图片上传服务器后存放服务器所在的地址（存放的是file.file.path）（第一张图将作为封面）
      spaceDetailedIntroduction: '', // 详细介绍
      // 地区选择
      showArea: false,
      areaList: area, // 数据格式见 Area 组件文档
      spacePosition: '', // 地址选择器
      // 创建成功后的ID
      spaceID: '1' // 存储创建空间成功后的ID，用于传入查看空间页，作为路由地址参数
    }
  },
  computed: {},
  methods: {
    // 路由跳转（房间列表）
    onClickLeft() {
      this.$router.push('/spaceList')
      // this.$router.go(-1);// 返回上一页
    },
    // 地区选择
    onConfirm(values) {
      // 存储地址选择器结果
      this.spacePosition = values
        .filter(item => !!item)
        .map(item => item.name)
        .join('/')
      this.showArea = false
      // 截取省市区
      this.spaceProvinces = this.spacePosition.split('/')[0]
      this.spaceCity = this.spacePosition.split('/')[1]
      this.spaceDistrict = this.spacePosition.split('/')[2]
    },
    // 表单提交
    onSubmit(values) {
      console.log('submit', values)
      // 判断图片是否上传
      if (this.spaceLogo[0] === [] || this.spaceMerchantDetailsImagesURL === []||this.spaceLogo[0] === undefined || this.spaceMerchantDetailsImagesURL === undefined ||this.spaceLogo[0] === "" || this.spaceMerchantDetailsImagesURL === "") {
        // 警告通知
        Notify({ type: 'warning', message: '请上传图片' })
      } else {
      // 请求后端
      var data = new FormData()
      // 请求body
      data.append('name', this.spaceName) // 空间名称
      data.append('logo', this.spaceLogo[0]) // 空间logo图片
      data.append('images', this.spaceMerchantDetailsImagesURL) // 空间详情图片
      data.append('address', this.spaceDetailedAddress) // 详细地址
      data.append('description', this.spaceDetailedIntroduction) // 详细介绍
      data.append('province', this.spaceProvinces) // 省
      data.append('city', this.spaceProvinces) // 市
      data.append('district', this.spaceDistrict) // 区
      data.append('provinceId', '')
      data.append('cityId', '')
      data.append('districtId', '')
      data.append('remark', '')
      // 请求header
      var headers = { OpenID: localStorage.getItem('OpenID') }
      // 发起请求
      createSpace(data, headers)
        .then(response => {
          // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
          console.log(JSON.stringify(response))
          // 判断是否创建成功
          if (response.msg === '操作成功') {
            // 路由跳转（进入创建空间成功页）
            this.$router.push(`/createSpaceDone/${response.data.id}`) // 创建空间成功后返回空间ID，将空间ID作为路由参数进行传递
            // Notify 成功提示
            Notify({ type: 'primary', message: '创建成功', duration: 1500 })
          } else {
            // Notify 失败提示
            Notify({ type: 'warning', message: '创建失败', duration: 1500 })
          }
        })
        .catch(error => {
          console.log(error)
        })
        }
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
            console.log(this.spaceLogo)
            this.spaceLogo.push(response.data.data) // 服务器返回url赋值给roomImagesUrl用于表单提交
          }
        })
        .catch(error => {
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
            console.log('this.spaceMerchantDetailsImagesURL', response.data.data)
            this.spaceMerchantDetailsImagesURL.push(response.data.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // TODO 图片上传（限制上传大小）
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