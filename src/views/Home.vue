<template>
  <div class="wrapper">
		<div class="site-intro">
			<div class="site-intro-img"></div>
			<div class="site-intro-meta">
				<h1 :class="['intro-title', fontloaded ? 'font-loaded' : '']">fi3ework's Studio.</h1>
				<p :class="['intro-subtitle', fontloaded ? 'font-loaded' : '']">it's better to burn out than to fade away</p>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      fontloaded: state => state.fontLoaded
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/mixin.scss';
// @font-face {
//   font-family: "Oswald-Regular";
//   src: url("../assets/font/Oswald-Regular.ttf");
// }

.wrapper {
  position: relative;
  width: 100%;
  z-index: 1;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s ease-out 0s;
  // -3px看到x轴左移3px了.很微小.blur 为2px是一个不错的类border写法.
  box-shadow: -3px 0 2px 0 rgba(#000, 0.6);

  .site-intro {
    position: relative;
    width: 100%;
    // 视口高度的一半
    height: 50vh;
    z-index: 3;
    overflow: hidden;
    box-shadow: 0 0 2px 0 rgba(#000, 0.6);
  }

  .site-intro-img {
    position: absolute;
    width: 100%;
    height: calc(100% + 1px);
    top: 0;
    left: 0;
    z-index: -1;
    // center center 与left top在响应式布局的变换过程中还是有差异性的.
    background: url('../assets/index-bg.jpg') no-repeat center center;
    background-size: cover;
    background-color: transparent;
    // 加滤镜!这个滤镜加的很好
    filter: brightness(0.5);
  }

  .site-intro-meta {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .intro-title {
    font-size: torem(64px);
  }

  .intro-title,
  .intro-subtitle {
    font-family: 'Oswald-Regular';
    color: #fff;
    // 初始状态不可见+存在向下的偏移
    opacity: 0;
    transform: translate(0, 1rem);
    transition: all 0.5s ease-out 0s;

    // 当webfont加载完字体时.添加一个font-loaded的状态
    &.font-loaded {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  .intro-subtitle {
    font-size: torem(32px);
    transition-delay: 0.2s;
  }
}
</style>
