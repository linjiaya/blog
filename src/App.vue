<template>
	<!-- 挂载在#app下面 -->
  <div class="app">
		<!-- 固定的头 -->
		<e-header></e-header>
		<!-- 侧边栏 -->
		<e-side-bar></e-side-bar>
		<!-- 返回到界面顶部 -->
		<e-go-top></e-go-top>
    <!-- 路由入口 -->
    <router-view/>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { vuedebug, fontdebug } from '@/debug'
import eHeader from '@/components/e-header'
import eSideBar from '@/components/e-side-bar'
import eGoTop from '@/components/e-go-top'

export default {
  name: 'App',
  components: {
    eHeader,
    eSideBar,
    eGoTop
  },
  created() {
    let vm = this
    // 使用webfontloader加载自定义字体
    // https://github.com/typekit/webfontloader#custom
    WebFont.load({
      custom: {
        families: ['Oswald-Regular']
      },
      loading() {
        fontdebug('loading')
      },
      active() {
        setTimeout(() => {
          // 字体加载完
          vm.change_fontload(true)
          fontdebug('font now is useable')
        }, 500)
      },
      inactive() {
        fontdebug('timeout')
        vm.change_fontload(true)
      },
      timeout: 3000
    })
  },
  mounted() {
    vuedebug('App.vue mounted')
    const body = document.querySelector('body')
    // 获取元素距离文档顶部的位置
    const headerHeight = document.querySelector('.site-intro').offsetTop + document.querySelector('.site-intro').offsetHeight
    body.addEventListener('scroll', () => {
      const topHeight = document.body.scrollTop || document.documentElement.scrollTop
      if (topHeight > headerHeight) {
        // 已经划过
      }
    }, false)
  },
  methods: {
    ...mapActions(['change_fontload'])
  }
}
</script>

<style lang="scss">
@import './assets/reset.scss';
@import './assets/index.scss';
@font-face {
  font-family: 'Oswald-Regular';
  src: url('./assets/font/Oswald-Regular.ttf');
}
</style>
