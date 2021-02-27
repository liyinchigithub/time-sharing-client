 
// 我的-设置-完善商家信息（和注册绑定手机号后跳转完善信息registerInfo页面内容一样）
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <div class="info">请完善商家信息</div>
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
        <!-- 房间图片（第一张图将作为封面） -->
        <van-field name="Logo" label="商家头像">
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
          v-model="customerUsername"
          name="customerUsername"
          label="商家名称"
          placeholder="请输入商家名称"
          :rules="[{ required: true, message: '商家名称不能为空' }]"
          maxlength="15"
        />
        <van-field
          v-model="customerTel"
          type="tel"
          name="customerTel"
          label="联系方式"
          placeholder="请输入联系方式"
          :rules="[{ required: true, message: '联系方式不能为空' }]"
        />
        <div style="margin-top: 60%">
          <van-button round block type="info" native-type="submit"> 保存 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast } from 'vant'
import { modifyCustomerInformation } from '@/api/register/register.js'
import { getUserInfo } from '@/api/my/userinfo/userinfo.js'
import axios from 'axios'
export default {
  name: 'setting', // 注册信息
  components: {},
  data() {
    return {
      customerUsername: '', // 商户名称
      customerTel: '', // 商户手机
      // 头像上传
      isShowCustomerThumbnail: false, // 是否显示文件上传缩略图
      customerImageName: '', // 文件上传 缩略图文件名称
      customerUploadImagesPre: [], // 图片预览地址
      customerUploadImages: '' // 图片地址
    }
  },
  computed: {},
  methods: {
    // 表单提交（登录）
    onSubmit(values) {
      console.log('submit', values)
       if (
        this.customerUploadImages === [] ||
        this.customerUploadImage === '' ||
        this.customerUploadImages === undefined
      ) {
        // 警告通知
        Notify({ type: 'warning', message: '请上传图片' })
      } else {
      //  TODO 请求后端修改用户信息
      //  请求后端，获取空间列表
      var data = new FormData()
      // 请求body
      data.append('phone', values.customerTel)
      data.append('name', values.customerUsername)
      data.append('headimgurl', this.customerUploadImages)
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
            this.customerUploadImages = response.data.data
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
    },
    // 路由跳转（返回商家广场列表）
    onClickLeft() {
      this.$router.push('/my')
      // this.$router.go(-1);// 返回上一页
    }
  },
  watch: {},
  directives: {},
  beforeCreate() {},
  created() {
    // 请求后端，根据请求头openID获取商家信息
    // 请求header
    var headers = { OpenID: localStorage.getItem('OpenID') }
    // 发起请求
    getUserInfo(headers)
      .then(response => {
        console.log(JSON.stringify(response.data))
        if (response.msg !== '操作成功' || response.code !== 0) {
          // Notify 失败提示
          Notify({ type: 'warning', message: '获取用户信息失败', duration: 2000 })
          console.log(JSON.stringify(response.data))
        } else {
          console.log(JSON.stringify(response.data))
          // Notify 成功提示
          // 存储数据
          // this.searchValue = response.data.searchValue //
          // this.createBy = response.data.createBy //
          // this.createTime = response.data.createTime //
          // this.updateBy = response.data.updateBy //
          // this.updateTime = response.data.updateTime //
          // this.remark = response.data.remark //
          // this.params = response.data.params //
          // this.id = response.data.id //
          this.customerUsername = response.data.name // 商家名称
          this.customerTel = response.data.phone // 商家联系方式
          // this.customerTel = response.data.mobile // 商家联系方式
          // this.unionid = response.data.unionid //
          // this.openid = response.data.openid //
          // this.sex = response.data.sex //
          // this.country = response.data.country //
          // this.province = response.data.province //
          // this.language = response.data.language //
          this.customerUploadImagesPre.push({ url: response.data.headimgurl }) // 商家头像(注意：这边是对象格式)
          this.customerUploadImages = response.data.headimgurl
          // this.subscribe = response.data.subscribe //
          // this.subscribeTime = response.data.subscribeTime //
          // this.subscribed = response.data.subscribed //
          // this.unsubscribed = response.data.unsubscribed //
          // this.status = response.data.status // 商家状态
          // this.created = response.data.created //
          // this.modified = response.data.modified //
          // 判断商家空间状态
          if (this.spaceStatus !== 3) {
            // 显示已下线
            this.overlayShow = true
          } else {
            // 不显示已下线
            this.overlayShow = false
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
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
