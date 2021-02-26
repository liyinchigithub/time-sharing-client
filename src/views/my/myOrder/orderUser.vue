// 订单详情
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 订单状态（待付款、待使用、已完成、已取消） -->
    <div class="orderStatus">
      <!-- 等待付款 -->
      <div id="waitForPayment" v-show="waitForPayment">
        <!-- 订单状态不同状态icon -->
        <div style="margin-top: 25px; margin-bottom: 10px; width: 300px">
          <van-row>
            <van-col span="3"
              ><img
                src="../../assets/image/orderDetailWaitForPayment.png"
                alt="暂无图片"
                :width="iconStatusWidth"
                :height="iconStatusWidth"
            /></van-col>
            <van-col span="9" offset="1"> <h1>等待付款</h1></van-col>
          </van-row>
        </div>
        <h2>
          需付款：<span style="color: red">￥{{ orderInfo.orderAmount }} 元</span>
          <div style="margin-top: 20px">
            <!-- TODO 倒计时 -->
            <h4><span style="color: red">15：09：23</span> 后订单取消</h4>
          </div>
        </h2>
      </div>
      <!-- 待使用 -->
      <div id="toBeUsed" v-show="toBeUsed">
        <!-- 订单状态不同状态icon -->
        <div style="margin-top: 25px; margin-bottom: 10px; width: 300px">
          <van-row>
            <van-col span="3"
              ><img
                src="../../assets/image/orderDetailtoDoUsed.png"
                alt="暂无图片"
                :width="iconStatusWidth"
                :height="iconStatusWidth"
            /></van-col>
            <van-col span="9" offset="1"> <h1>待使用</h1></van-col>
          </van-row>
        </div>
      </div>
      <!-- 已完成 -->
      <div id="done" v-show="done">
        <!-- 订单状态不同状态icon -->
        <div style="margin-top: 25px; margin-bottom: 10px; width: 300px">
          <van-row>
            <van-col span="3"
              ><img
                src="../../assets/image/orderDetailDone.png"
                alt="暂无图片"
                :width="iconStatusWidth"
                :height="iconStatusWidth"
            /></van-col>
            <van-col span="9" offset="1"> <h1>已完成</h1></van-col>
          </van-row>
        </div>
      </div>

      <!-- 已取消 -->
      <div id="canceled" v-show="canceled">
        <!-- 订单状态不同状态icon -->
        <div style="margin-top: 25px; margin-bottom: 10px; width: 300px">
          <van-row>
            <van-col span="3"
              ><img
                src="../../assets/image/orderDetailCancel.png"
                alt="暂无图片"
                :width="iconStatusWidth"
                :height="iconStatusWidth"
            /></van-col>
            <van-col span="9" offset="1"> <h1>已取消</h1></van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div></div>
    <!-- 二维码 -->
    <div class="qrImage">
      <img :src="qrImageUrl" width="200px" height="200px" />
      <div class="qrImagekefu">扫码联系客服付款</div>
    </div>
    <!-- 酒店信息 -->
    <div class="card">
      <div>
        <van-row>
          <div style="margin-left: 8px; margin-top: 15px">
            <!-- 房间logo -->
            <van-col span="9">
              <img id="housingImageUrl" :src="orderInfo.housingImageUrl" width="114px" height="104px" alt="暂无图片"
            /></van-col>
          </div>
          <div style="margin-left: 28px; margin-top: 15px">
            <van-col span="15">
              <!-- 房间名称 -->
              <van-row>
                <van-col span="23"
                  ><h3>{{ orderInfo.housingName }}</h3></van-col
                >
              </van-row>
              <van-row>
                <!-- 房源价格 -->
                <div style="margin-top: 35px">
                  <van-col span="23">
                    <h1 style="color: red">￥{{ orderInfo.housingPrices }}</h1></van-col
                  >
                </div>
              </van-row>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <!-- 租赁时间段 -->
          <div style="margin-left: 20px; margin-top: 10px">
            <h3>租赁时间段:</h3>
            <h3>{{ orderInfo.LeasableTime }}</h3>
          </div>
        </van-row>
      </div>
    </div>
    <!-- 订单信息 -->
    <div class="card2">
      <!-- 订单编号 -->
      <div style="margin-top: 20px; margin-left: 20px">
        <h2>订单编号：{{ orderInfo.orderNum }}</h2>
      </div>
      <!-- 下单时间 -->
      <div style="margin-top: 20px; margin-left: 20px">
        <h2>下单时间：{{ orderInfo.orderCreateTime }}</h2>
      </div>
    </div>
    <!-- 确认核销（判断当前订单状态，如果是等待付款，就不显示按钮） -->
    <div class="ConfirmTheCancelAfterVerification" v-show="isShowConfirmTheCancelAfterVerification">
      <van-button style="width: 250px" round type="info">确认核销</van-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
export default {
  name: 'orderDetail', // 订单详情
  components: {},
  data() {
    return {
      // 控制订单状态不同状态icon
      waitForPayment: true, // 待付款
      toBeUsed: false, // 待使用
      done: false, // 已完成
      canceled: false, // 已取消
      // 状态icon大小
      iconStatusWidth: '40px',
      iconStatusHeight: '40px',
      // 控制确认核销按钮显示
      isShowConfirmTheCancelAfterVerification: true,
      // 订单信息
      orderInfo: {
        orderID: '234234', // 订单ID
        orderNum: '2342545234234', // 订单编号
        orderCreateTime: '2020/12/12 12:23', // 订单下单时间（创建时间）
        LeasableTime: '2020/12/12  12:00  ~2020/12/12  14:00', // 可租赁时间段（可租赁时间范围）
        orderAmount: '2323', // 订单需付金额
        orderStatus: '待付款',
        userLogo: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        userName: '张大明',
        housing: '20201112', // 房源ID
        housingName: 'Zsmart 智尚酒店（精品房源)', // 房源ID
        housingPrices: 200, // 房源价格
        housingDelPrices: 400, // 房源删除价格
        housingImageUrl:
          'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg' // 房源图片
      },
      qrImageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      // 房源信息
      housingResourceID: '',
      spaceID: '',
      roomID: ''
      //
    }
  },
  computed: {},
  methods: {
    // 路由跳转（返回我的订单页）
    onClickLeft() {
      // this.$router.push('/myOrder');
      this.$router.go(-1) // 返回上一页
    }
  },
  watch: {},
  directives: {},
  created() {
    // TODO 请求后端，根据房源ID生成订单并获取订单信息
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
    // 获取路由地址参数
    this.orderID = this.$route.params.orderID
    console.log(`订单ID:${this.orderID}`)
    // TODO 查询订单的状态(控制显示不同订单状态icon)

    // TODO 查询订单的状态（控制显示确认核销按钮）
    if (this.orderInfo.orderStatus === '待付款') {
      this.isShowConfirmTheCancelAfterVerification = false
    }
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
    // 接收路由地址传参
    this.housingResourceID = this.$route.params.housingResourceID // 房源单生成订单
    console.log(`房源ID：${this.housingResourceID}`)
    this.spaceID = this.$route.params.spaceID
    console.log(`空间ID：${this.spaceID}`)
    this.roomID = this.$route.params.roomID
    console.log(`房间ID：${this.roomID}`)
  },
  beforeMount() {}
}
</script>
<style scoped>
.orderStatus {
  /* width: 100%; // 这个属性会导致页面横向过大*/
  margin-left: 65%;
  margin-top: 35%;
  position: absolute;
  /* height: 20%; */
  transform: translate(-50%, -50%);
}
.qrImage {
  align-self: center;
  margin-top: 85%;
  margin-left: 50%;
  position: absolute;  /* 绝对位置 */
  /* height: 20%; */
  transform: translate(-50%, -50%);  /* 绝对位置 */
}
.qrImagekefu {
  align-self: center;
  margin-left: 20%;
  font-size: 12px;
}
.card {
  position: absolute;
  width: 96%;
  margin-left: 2%;
  margin-top: 120%;
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
.card2 {
  width: 96%;
  height: 20%;
  margin-left: 2%;
  margin-top:170%;
  background-color: rgba(255, 255, 255, 0.753);
  border-width: 1px;
  border-style: solid; /* 边线 */
  position: absolute; /* 绝对位置 */
  border-color: rgb(255, 255, 255); /* 绝对位置 */
  border-radius: 20px;  /* 圆角 */
  /* 背景 */
  /* background:#eee; */
  /* 卡片内部间距，单位 px */
  padding: 5px;
}

.ConfirmTheCancelAfterVerification {
  margin-left: 50%;
  margin-top: 155%;
  margin-bottom: 25%;
  position: absolute;  /* 绝对位置 */
  transform: translate(-50%, -50%);  /* 绝对位置 */
}
</style>