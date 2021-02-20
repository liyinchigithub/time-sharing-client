<!-- H5端页面状态 -->
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="咨询单" :fixed="true" :border="true" />
    <!-- 标题 -->
    <div style="margin-left: 7%; margin-right: 10%; margin-top: 15%; width: 90%">
      <h1>尊敬的租户，针对当前房源，您可以选择分时租赁~</h1>
    </div>
    <!-- 房源卡片 -->
    <div>
      <div class="card">
        <div>
          <!-- 空间名称 -->
          <div class="spaceName">
            <van-row>
              <van-col span="20"
                ><h2>{{ spaceName }}</h2></van-col
              >
            </van-row>
          </div>
          <div class="">
            <!-- TODO 房间logo -->
            <van-row>
              <van-col span="4">
                <img id="roomLogo" :src="roomLogo" width="114px" height="104px" alt="暂无图片"
              /></van-col>
              <van-col span="15" offset="5">
                <!-- TODO 房间标题 -->
                <div id="roomName" style="margin-bottom: 2%">
                  <h2>{{ roomName }}</h2>
                </div>
                <!-- TODO 房源标签 -->
                <div id="housingTags" class="tags">
                  <div class="cardTag" v-for="(tag, index) in housingTags" :key="index">
                    <Tag color="blue"
                      ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
                    >
                  </div>
                </div>
                <van-row> </van-row>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 租赁时间段 -->
    <div>
      <div class="title"><h1>可设置租赁时间段：</h1></div>
      <div class="content-sub">
        <span @click="LeasableTimeStartDateShowPopup">开始日期:{{ LeasableTimeStartDate }}</span
        ><br />
        <span @click="LeasableTimeStartTimeShowPopup">开始时间:{{ LeasableTimeStartTime }}</span>
      </div>
      <div class="content-sub">
        <span @click="LeasableTimeEndDateShowPopup">结束日期:{{ LeasableTimeEndDate }}</span
        ><br />
        <span @click="LeasableTimeEndTimeShowPopup">结束时间:{{ LeasableTimeEndTime }}</span>
      </div>
      <!-- 弹出层，可租赁时间，开始日期 -->
      <van-popup v-model="LeasableTimeStartDateShow" round position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          @confirm="confirmLeasableTimeStartDate"
          @cancel="cancel"
          @change="rule"
          v-model="currentLeasableTimeStartDate"
          type="date"
          title="选择开始日期"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
        />
      </van-popup>
      <!-- 弹出层，可租赁时间，开始时间 -->
      <van-popup v-model="LeasableTimeStartTimeShow" round position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          @confirm="confirmLeasableTimeStartTime"
          @cancel="cancel"
          v-model="currentLeasableTimeStartTime"
          type="time"
          title="选择开始时间"
          :min-hour="10"
          :max-hour="20"
        />
      </van-popup>
      <!-- 弹出层，可租赁时间，结束日期 -->
      <van-popup v-model="LeasableTimeEndDateShow" round position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          @confirm="confirmLeasableTimeEndDate"
          @cancel="cancel"
          @change="rule"
          v-model="currentLeasableTimeEndDate"
          type="date"
          title="选择结束日期"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
        />
      </van-popup>
      <!-- 弹出层，可租赁时间，结束时间 -->
      <van-popup v-model="LeasableTimeEndTimeShow" round position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          @confirm="confirmLeasableTimeEndTime"
          @cancel="cancel"
          v-model="currentLeasableTimeEndTime"
          type="time"
          title="选择结束时间"
          :min-hour="10"
          :max-hour="20"
        />
      </van-popup>
    </div>
    <!-- 每小时收入 -->
    <div>
      <div class="title"><h1>每小时收入：</h1></div>
      <div class="content"><span>20~30 h</span></div>
    </div>
    <!-- 说明 -->
    <div>
      <div class="title"><h1>说明：</h1></div>
      <div class="content">
        <p>
          <span>{{ instructions }}</span>
        </p>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <van-row>
        <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" style="width: 20%" @click="reject">
          拒绝
        </van-button>
        <van-button type="info" style="width: 78%; margin-left: 1%" @click="resolve">是，我要租赁</van-button>
      </van-row>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="overlayShow">
      <div class="wrapper">
        <div class="block"><van-loading size="40px" color="#1989fa"></van-loading></div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Toast, Dialog, DatetimePicker } from 'vant'
/* eslint-disable */
export default {
  name: 'about', // H5端页面（公众号模板消息点击后跳转的页面）
  components: {},
  data() {
    return {
      housingResourceID: '1', // 房源ID
      favoriteID: '', // 咨询单ID
      spaceName: '东方大酒店', // 空间名称
      roomLogo:
        'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源图片
      roomName: '豪华精品房间特价房推荐房', // 房间标题
      housingTags: ['网红打卡', '美食', '夕阳', '商务'], // 房源标签
      instructions: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida
            dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra
            vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.`,
      // 遮罩层
      overlayShow: false,
      // 文本显示
      LeasableTimeStartDate: this.GMTToStr(new Date()), // 可租赁时间，开始日期
      LeasableTimeStartTime: '', // 可租赁时间，开始时间
      LeasableTimeEndDate: this.GMTToStr(new Date()), // 可租赁时间，结束日期
      LeasableTimeEndTime: '', // 可租赁时间，结束时间
      // 日期时间选择器选择结果
      currentLeasableTimeStartDate: new Date(), // 可租赁时间，开始日期
      currentLeasableTimeStartTime: '', // 可租赁时间，开始时间
      currentLeasableTimeEndDate: new Date(), // 可租赁时间，结束日期
      currentLeasableTimeEndTime: '', // 可租赁时间，结束时间
      minDate: new Date(2020, 11, 1), // 1月份索引从0开始，日索引从1开始
      maxDate: new Date(2020, 11, 31), //
      LeasableTimeStartDateShow: false, //弹出层
      LeasableTimeStartTimeShow: false, //弹出层
      LeasableTimeEndDateShow: false, //弹出层
      LeasableTimeEndTimeShow: false //弹出层
    }
  },
  computed: {},
  methods: {
    // 拒绝按钮事件
    reject() {
      // 弹窗确认
      Dialog.confirm({
        title: '请确认是否拒绝？',
        message: ''
      })
        .then(() => {
          // 显示遮罩层
          this.overlayShow = true
          setTimeout(() => {
            // TODO 请求后端接口
            console.log('reject')

            // 隐藏遮罩层
            this.overlayShow = false
            // 路由跳转（pushH5Result）
            this.$router.push('/pushH5ResultReject')
          }, 1000)
        })
        .catch(() => {
          // on cancel
        })
    },
    // 我要租赁按钮事件
    resolve() {
      // 显示遮罩层
      this.overlayShow = true
      setTimeout(() => {
        // TODO 请求后端接口
        console.log('resolve')

        // 隐藏遮罩层
        this.overlayShow = false
        // 路由跳转（pushH5Result）
        this.$router.push(`/pushH5ResultResolve/${this.housingResourceID}`)
      }, 1000)
    },
    // 弹出层控制，可租赁时间，开始日期
    LeasableTimeStartDateShowPopup() {
      this.LeasableTimeStartDateShow = true
    },
    // 弹出层控制，可租赁时间，开始时间
    LeasableTimeStartTimeShowPopup() {
      this.LeasableTimeStartTimeShow = true
    },
    // 弹出层控制，可租赁时间，结束日期
    LeasableTimeEndDateShowPopup() {
      this.LeasableTimeEndDateShow = true
    },
    // 弹出层控制，可租赁时间，结束时间
    LeasableTimeEndTimeShowPopup() {
      this.LeasableTimeEndTimeShow = true
    },
    // 选择器格式化日期显示
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    },
    // 确认
    confirmLeasableTimeStartDate() {
      this.LeasableTimeStartDateShow = false // 隐藏底部弹出层
      // GMT转格式
      this.LeasableTimeStartDate = this.$options.methods.GMTToStr(this.currentLeasableTimeStartDate) // 可租赁时间，开始日期
    },
    // 确认
    confirmLeasableTimeStartTime() {
      this.LeasableTimeStartTimeShow = false // 隐藏底部弹出层
      // GMT转格式
      this.LeasableTimeStartTime = this.currentLeasableTimeStartTime // 可租赁时间，开始日期
    },
    // 确认
    confirmLeasableTimeEndDate() {
      this.LeasableTimeEndDateShow = false // 隐藏底部弹出层
      //GMT转格式
      this.LeasableTimeEndDate = this.$options.methods.GMTToStr(this.currentLeasableTimeEndDatee) // 可租赁时间，结束日期
    },
    // 确认
    confirmLeasableTimeEndTime() {
      this.LeasableTimeEndTimeShow = false // 隐藏底部弹出层
      // GMT转格式
      this.LeasableTimeEndTime = this.currentLeasableTimeEndTime // 可租赁时间，结束日期
    },
    // 取消
    cancel() {
      this.LeasableTimeStartDateShow = false // 隐藏底部弹出层
      this.LeasableTimeEndDateShow = false // 隐藏底部弹出层
      this.LeasableTimeEndDateShow = false // 隐藏底部弹出层
      this.LeasableTimeEndTimeShow = false // 隐藏底部弹出层
    },
    // GMT转格式
    GMTToStr(time) {
      let date = new Date(time)
      let Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      return Str
    },
    // 开始日期与结束日期判断
    rule() {
      // 结束日期不能早于开始日期！
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
<style lang="scss" scoped>
.card {
  // position: absolute;
  width: 98%;
  margin-left: 2%;
  margin-top: 5%;
  margin-bottom: 5%;
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
.icon {
  position: absolute;
  width: 50%;
  top: 30%;
  bottom: 30%;
  left: 62%;
  transform: translate(-50%, -50%);
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.spaceName {
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
}
.tag {
  margin-top: 1%;
  margin-bottom: 1%;
}
.cardTag {
  display: inline;
  // margin-left: 1%;
}

.title {
  font-size: 10px;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 2%;
  width: 95%;
}
.content {
  font-size: 20px;
  margin-left: 5%;
  margin-bottom: 5%;
  width: 95;
}
p {
  margin: 0px;
  font-size: 20px;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'kern' 1;
  -webkit-font-feature-settings: 'kern';
  -moz-font-feature-settings: 'kern';
  -moz-font-feature-settings: 'kern=1';
  font-kerning: normal;
}
.buttom {
  margin-left: 1%;
  margin-top: 60%;
}
.content-sub {
  font-size: 20px;
  margin-left: 13%;
  margin-top: 3%;
  margin-bottom: 3%;
}
</style>