<!-- 房源匹配 -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h2 class="demo-home__desc">房源匹配</h2>
      <!-- 当前城市 -->
      <!-- 标签 -->
      <!-- 筛选条件 -->
      <!-- 列表 -->
      <!-- 卡片 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name:"housingMatch",
  data() {
    return {}
  },

  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
