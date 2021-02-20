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
  name: 'AppLayout',// 底栏tabbar的父组件
  data() {
    return {
      tabbars: [
        {
          title: '租客广场',
          to: {
            name: 'Home'
          },
          icon: 'wap-home-o'
        },
        {
          title: '发布',
          to: {
            name: 'Release' // 注意大小写，与src\router\router.config.js name一致
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
      // TODO 判断是否点击了底部tabbar发布按钮（子组件触发父组件事件），显示底部弹窗

    }
  }
}
</script>
