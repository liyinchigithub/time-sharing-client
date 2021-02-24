<template>
  <div>
    <!-- 传参形式 -->
    <!-- <van-tabbar fixed route v-model="active" @change="handleChange">
      <van-tabbar-item v-for="(item, index) in data" :to="item.to" :icon="item.icon" :key="index">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar> -->
    <!-- 写死形式 -->
    <van-tabbar v-model="active" @change="handleChange">
      <van-tabbar-item to="/home" icon="wap-home-o">商家广场</van-tabbar-item>
      <van-tabbar-item icon="aim" @click="dialogIsShow">房源匹配</van-tabbar-item>
      <van-tabbar-item to="/My" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部弹窗 -->
    <van-popup v-model="dialogShow" round closeable position="bottom" :style="{ height: '30%' }">
      <div>
        <div class="popup1-1" @click="toReleaseHousing">
          <img src="../assets/image/releaseHousing.png" width="100" height="100" alt="" srcset="" />
        </div>
        <div class="popup1-2" @click="toReleaseHousing">发布房源</div>
        <div class="popup2-1" @click="toCreateFavorite">
          <img src="../assets/image/releaseHousing.png" width="100" height="100" alt="" srcset="" />
        </div>
        <div class="popup2-2" @click="toCreateFavorite">创建咨询单</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  // 子组件接收父组件传递过来的值
  props: {
    defaultActive: {
      type: Number,
      default: 0
    },
    // 传值属性
    data: {
      type: Array, // 限制传递类型
      default: () => {
        // 默认值
        return []
      }
    }
  },
  data() {
    return {
      active: this.defaultActive,
      dialogShow: false
    }
  },
  methods: {
    //
    handleChange(value) {
      this.$emit('change', value)
      // 存储当前tabbar选中值
      window.localStorage.setItem('tabCurrentActive', value)
    },
    // 底部弹出层显示
    dialogIsShow() {
      this.dialogShow = true
    },
    // 路由跳转（发布房源页）
    toReleaseHousing() {
      this.$router.push('/releaseHousing')
    },
    // 路由跳转（创建咨询单页）
    toCreateFavorite() {
      this.$router.push('/createFavorite')
    }
  },
  computed: {
    CurrentActive() {
      // TODO 存储当前选中tab值到locationStorage
    }
  },
  beforeCreate() {},
  created() {
    // 获取当前选中tab值到locationStorage
    var tabCurrentActive = window.localStorage.getItem('tabCurrentActive')
    // 判断是否首次加载页面
    if (tabCurrentActive !== undefined || tabCurrentActive !== '' || tabCurrentActive !== null) {
      // 非首次加载页面，读取localStorage上一次选中tabbar
      this.active = parseInt(window.localStorage.getItem('tabCurrentActive'))
    }
  },
  beforeMount() {
    // 获取当前选中tab值到locationStorage
    var tabCurrentActive = window.localStorage.getItem('tabCurrentActive')
    if (tabCurrentActive === null) {
      // 首次加载页面
      this.active = 0
    }
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.popup1-1 {
  position: absolute;
  width: 50%;
  top: 40%;
  left: 43%;
  transform: translate(-50%, -50%);
}
.popup1-2 {
  font-size: 30px;
  position: absolute;
  width: 50%;
  top: 78%;
  left: 38%;
  transform: translate(-50%, -50%);
}
.popup2-1 {
  position: absolute;
  width: 46%;
  top: 40%;
  left: 78%;
  transform: translate(-50%, -50%);
}
.popup2-2 {
  font-size: 30px;
  position: absolute;
  width: 50%;
  top: 78%;
  left: 75%;
  transform: translate(-50%, -50%);
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
