// 注册信息(首次登录,租客端微信授权后，进行绑定手机)
<template>
  <div>
    <div class="info">为了商家更好的联系您，请完善信息</div>
    <!-- 头像上传 -->
    <div class="userIcon">
      <!-- <van-uploader :after-read="afterReadLogo" accept="image/*" style="width: 88px; height: 88px">
        <img src="../../assets/image/evaluate.png" style="width: 100%; height: 100%"
      /></van-uploader>
      <div class="img-box">
        <img class="image" :src="customerUploadImages" v-show="isShowCustomerThumbnail" />
      </div> -->
    </div>
    <!-- 表单 -->
    <div class="registerForm">
      <van-form @submit="onSubmit" @failed="failed">
        <!-- 头像图片 -->
        <van-field name="Logo" label="头像">
          <template #input>
            <van-uploader
              v-model="customerUploadImagesPre"
              :after-read="afterReadLogo"
              :multiple="false"
              :max-count="1"
              :max-size="5 * 1024 * 1024"
              @oversize="onOversize"
            />
          </template>
        </van-field>
        <van-field
          v-model="customerNickname"
          name="customerNickname"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ required: true, message: '昵称不能为空' }]"
        />
        <van-field
          v-model="customerEmail"
          type="text"
          name="customerEmail"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ required: true, message: '邮箱不能为空' }]"
        />
        <van-field
          v-model="customerWechat"
          type="text"
          name="customerWechat"
          label="微信号"
          placeholder="请输入微信号"
          :rules="[{ required: true, message: '微信号不能为空' }]"
        />
        <div style="margin-top: 60%">
          <van-button round block type="info" native-type="submit"> 进入 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast } from 'vant'
import { modifyCustomerInformation } from '@/api/register/register.js'
import axios from 'axios'
export default {
  name: 'registerInfo', // 注册信息
  components: {},
  data() {
    return {
      customerNickname: '', // 名称
      customerEmail: '', // 邮箱
      customerWechat: '', // 微信号
      // 头像上传
      isShowCustomerThumbnail: false, // 是否显示文件上传缩略图
      customerImageName: '', // 文件上传 缩略图文件名称
      customerUploadImagesPre: [], // 图片预览地址
      customerUploadImages: [] // 图片地址
    }
  },
  computed: {},
  methods: {
    // 表单提交（登录）
    onSubmit(values) {
      console.log('submit', values)
      if (
        this.customerUploadImages[0] === [] ||
        this.customerUploadImages[0] === '' ||
        this.customerUploadImages[0] === undefined
      ) {
        // 警告通知
        Notify({ type: 'warning', message: '请上传图片' })
      } else {
        //  TODO 请求后端修改用户信息
        //  请求后端，获取空间列表
        var data = new FormData()
        // 请求body
        data.append('nickname', values.customerNickname)
        data.append('email', values.customerEmail)
        data.append('wechat', values.customerWechat)
        data.append('headimgurl', this.customerUploadImages[0])
        // 请求header
        var headers = { OpenID: localStorage.getItem('OpenID') }
        // 发起请求
        modifyCustomerInformation(data, headers)
          .then(response => {
            // 注意：这边要使用箭头函数，因为在页面created时候，会调用一次getSpaceList请求，created使用data参数必须是箭头函数，否则报错undefined
            console.log(JSON.stringify(response.rows))
            // 判断空间下是否有房间，没有房间提示先新建房间
            if (response.msg === '操作成功' || response.code === 0) {
              // TODO 完善信息保存成功后，进入首页
              Toast.fail('保存成功')
              this.$router.push('/home')
            } else {
              Toast.fail('保存失败')
            }
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    // 图片上传
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
            console.log('this.customerUploadImages', response.data.data)
            this.customerUploadImages.push(response.data.data)
          }
        })
        .catch(error => {
          // 这边要用箭头函数，才可以this引用上下文
          console.log(error)
        })
    },
    // 获取当前日期时间
    getTime() {
      var t = new Date()
      var y = t.getFullYear()
      var m = t.getMonth() + 1
      var d = t.getDate()
      var h = t.getHours()
      var min = t.getMinutes()
      var s = t.getSeconds()
      return `${y}-${m}-${d}-${h}-${m}-${s}`
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
  beforeCreate() {},
  created() {},
  mounted() {
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  }
}
</script>
<style scoped>
.info {
  font-weight: 200px;
  font-size: 20px;
  margin-top: 15%;
  margin-bottom: 15%;
  margin-left: 10%;
}
.userIcon {
  font-weight: 200px;
  font-size: 20px;
  top: 20%;
  margin-left: 40%;
  margin-bottom: 15%;
}
.registerForm {
  font-weight: 200px;
  font-size: 20px;
  width: 90%;
  position: absolute;
  top: 40%;
  margin-bottom: 15%;
  bottom: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>