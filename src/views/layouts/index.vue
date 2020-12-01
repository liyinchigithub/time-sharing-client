<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [
        {
          title: '商家广场',
          to: {
            name: 'Home'
          },
          icon: 'wap-home-o'
        },
        {
          title: '房源匹配',
          to: {
            name: 'HousingMatch' // 注意大小写，与src\router\router.config.js name一致
          },
          icon: 'aim'
        },
        {
          title: '我的',
          to: {
            name: 'My'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  components: {
    TabBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
