<template>
  <div class="city">
    <CityHeader></CityHeader> //头部 <Search :list="cities"></Search> //搜索
    <List :hot="hotCity" :letter="letter" :list="cities"></List> //城市列表
    <Alphabet @chang="handleLetterChang" :list="cities"></Alphabet> //A-Z
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from './components/Header'
import Search from './components/Search'
import List from './components/List'
import Alphabet from './components/Alphabet'
export default {
  data() {
    return {
      cities: {}, // 城市列表
      hotCity: [], //热门城市
      letter: '', // A-Z

    }
  },
  components: {
    CityHeader,
    Search,
    List,
    Alphabet
  },
  methods: {
    // 请求后端获取城市数据
    getCityInfo() {
      axios.get('/api/city.json').then(this.getCityInfoSucc)
    },
    getCityInfoSucc(res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.hotCity = data.hotCities
        this.cities = data.cities
      }
      console.log(this.cities)
    },
    handleLetterChang(letter) {
      // 接受子组件传过来的
      // console.log(letter)
      this.letter = letter
    }
  },
  beforeMount() {},
  mounted(){},
  created() {},
  beforeCreate() {}
}
</script>

<style scoped lang="stylus"></style>
