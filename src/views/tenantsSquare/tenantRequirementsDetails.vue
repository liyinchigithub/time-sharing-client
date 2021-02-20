// 租客需求详情页
<template>
  <div>
    <!-- 顶栏 -->
    <van-nav-bar title="租客详情" left-arrow @click-left="onClickLeft" :fixed="true" :border="true" />
    <!-- 租客信息 -->
    <Card :shadow="false" class="card">
      <div>
        <div class="cardTile">
          <!-- TODO -->
          <van-row>
            <van-col span="4"><Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" /></van-col>
          </van-row>
          <!-- TODO -->
          <van-row class="cardTitle">
            <van-col span="10">我是租户名称</van-col>
            <!-- 发布时间 -->
            <van-col span="7" offset="5">{{ releaseDate }}</van-col>
          </van-row>
        </div>
        <div class="cardTag" v-for="(tag, index) in tags" :key="index">
          <!-- TODO -->
          <Tag color="blue"><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag>
        </div>
        <div class="cardLeasableTime">
          <!-- TODO -->
          <van-icon class-prefix="iconfont" name="tubiao-bingtu" />2020/12/12 ~ 2020/12/13 12:00 ~ 23:00
        </div>
        <div class="cardLocation">
          <!-- TODO -->
          <van-icon class-prefix="iconfont" name="dingwei1" />杭州-拱墅区
        </div>
      </div>
    </Card>

    <!-- 我的房源（展示当前商户所有未过期有效房源） -->
    <div>
      <div class="likeHouseTitle">我的房源</div>

      <!-- 我的房源列表 -->
      <div v-for="(item, index) in list" :key="index">
        <!-- <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> </van-divider> -->
        <div class="likeHouseList">
          <Card>
            <div class="likeHouseSub">
              <!-- 图片 -->
              <van-row>
                <van-col span="7">
                  <img id="housingImageUrl" :src="item.housingImageUrl" width="150px" height="150px" alt="暂无图片"
                /></van-col>
                <van-col span="15" offset="2">
                  <!-- TODO 房源名称 -->
                  <div id="housingName">{{ item.housingName }}</div>
                  <!-- TODO 房源标签 -->
                  <div id="housingTags" style="margin-top: 1%; margin-bottom: 1%">
                    <div class="cardTag" v-for="(tag, index) in item.housingTags" :key="index">
                      <Tag color="blue"
                        ><van-icon class-prefix="iconfont" name="youhui" style="color: bule" />{{ tag }}</Tag
                      >
                    </div>
                  </div>
                  <van-row>
                    <van-col span="4">
                      <!-- 房源价格、删除价格 -->
                      <van-row type="flex">
                        <van-col span="20">
                          <div style="color: red; font-size: 20px; margin-top: 10px; margin-bottom: 10px">
                            ￥{{ item.housingPrices }}
                          </div>
                        </van-col>
                        <!-- <van-col span="10">
                        <div style="font-size: 20px;margin-top: 40px;margin-bottom: 10px">
                          <del>￥{{ item.housingDelPrices }} </del>
                        </div>
                      </van-col> -->
                      </van-row>
                    </van-col>
                    <van-col span="12" offset="11">
                      <!-- 推荐他 -->
                      <div>
                        <!-- TODO 微信公众号消息模板推送 -->
                        <van-button
                          round
                          type="info"
                          style="width: 110px; height: 30px; margin-top: 10px; margin-bottom: 10px"
                          @click="recommendedMessage"
                          >推荐他</van-button
                        >
                      </div></van-col
                    >
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { Toast, Dialog, Notify } from 'vant'
export default {
  name: 'tenantRequirementsDetails', // 租客需求详情页
  components: {},
  data() {
    return {
      // 顶部详情字段
      requireID: '', // 租户需求单ID
      avatar: '', // 租户头像url
      title: '', // 租户名称
      releaseDate: '', // 发布时间
      LeasableTime: '', // 可租赁时间
      tags: [], // 标签集合
      Location: '', // 地址
      // 底部“我的房源”列表字段
      list: [
        {
          housing: '20201111', // 房源ID
          housingName: 'Zsmart 智尚酒店（精品房源)', // 房源ID
          housingPrices: 200, // 房源价格
          housingDelPrices: 400, // 房源删除价格
          housingImageUrl:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源图片
          housingTags: ['网红打卡', '美食', '夕阳', '商务']
        },
        {
          housing: '20201112', // 房源ID
          housingName: 'Zsmart 智尚酒店（精品房源)2', // 房源ID
          housingPrices: 200, // 房源价格
          housingDelPrices: 400, // 房源删除价格
          housingImageUrl:
            'https://axure-file.lanhuapp.com/fd338631-e93d-4ffd-a7f8-2a443b9f7825__9e2a0f3097e561c1f8397b00dc17d7ef.jpg', // 房源图片
          housingTags: ['网红打卡', '美食']
        }
      ]
    }
  },
  props: {
    text: ''
  },
  computed: {},
  methods: {
    // 路由跳转（返回租客广场列表）
    onClickLeft() {
      this.$router.push('/home')
      // this.$router.go(-1);// 返回上一页
    },
    // 推荐他（调用微信公众号模板消息）
    recommendedMessage() {
      // TODO
      // 显示loading
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      setTimeout(() => {
        // 隐藏loading
        Toast.loading({
          message: '加载中...',
          forbidClick: false
        })
        // 提示“推送成功”
        Notify({ type: 'primary', message: '推送成功', duration: 1200 })
      }, 1000)
    }
  },
  watch: {},
  directives: {},
  created() {
    // 接收路由传参
    this.requireID = this.$route.params.requireID // 租户需求单ID
    this.avatar = this.$route.params.avatar // 租户头像url
    this.title = this.$route.params.title // 租户名称
    this.releaseDate = this.$route.params.releaseDate // 发布时间
    this.LeasableTime = this.$route.params.LeasableTime // 可租赁时间
    this.tags = this.$route.params.tags // 标签集合
    this.Location = this.$route.params.Location // 地址

    console.log({
      requireID: this.requireID,
      avatar: this.avatar,
      title: this.title,
      releaseDate: this.releaseDate,
      LeasableTime: this.LeasableTime,
      tags: this.tags,
      Location: this.Location
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
    // Vue给单独页面添加背景色
    document.body.style.backgroundColor = '#F5F5F5'
  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 95%;
  margin-top: 15%;
  margin-left: 2.5%;
  margin-bottom: 1%;
  // background: inherit;
  background-color: rgba(255, 255, 255, 1);
  // border-width: 1px;
  // 边线
  // border-style: solid;
  // 圆角
  border-radius: 17px;
  // 卡片内部间距，单位 px
  // background:#eee;
  // 卡片内部间距，单位 px
  padding: 5px;
}

.cardTitle {
  margin-top: 2%;
  margin-bottom: 4%;
}

.cardLeasableTime {
  margin-top: 3%;
}
.cardLocation {
  margin-top: 4%;
}
.cardTag {
  display: inline;
  // margin-left: 1%;
}
body {
  background: rgb(84, 147, 189);
  background-size: 6.4rem;
  width: 6.4rem;
  height: auto;
}

.likeHouseList {
  // position: absolute;
  // top: 70%;
  // width: 96%;
  // // bottom: 80%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // // 圆角
  // // background-color: rgba(255, 255, 255, 1);
  // border-width: 5px;
  // // 边线
  // // border-style: solid;
  // // 圆角
  // border-radius: 17px;
  // // 卡片内部间距，单位 px
  // background: rgba(255, 255, 255, 1);
  // // 卡片内部间距，单位 px
  // padding: 5px;
}
.likeHouseSub {
  margin-top: 5%;
  margin-left: 5%;
  margin-bottom: 5%;
}
.likeHouseTitle {
  font-size: 20px;
  bottom: 10%;
  margin-top: 10%;
  margin-left: 10%;
}
img {
  margin-left: 3%;
  margin-top: 1%;
  width: 95%;
  height: 95%;
}
</style>