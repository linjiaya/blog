<template>
  <header class="e-header">
    <div class="read-progress"></div>
    <!-- 替换为tag搜索. -->
    <!-- <div class="header-sidebar-menu" :class="{'is-slide': overHeight}">
      <e-svg name="s-arrow-right" :size="24"></e-svg>
    </div> -->
    <router-link to="/" v-if="!overHeight">
      <a class="home-link">eliaztray.cn</a>
    </router-link>
  </header>
</template>

<script>
import eSvg from '@/components/e-svg';
import {mapState} from 'vuex';
export default {
	name: 'e-header',
	data() {
		return {

		};
	},
	components: {
		// eslint-disable
		eSvg
	},
	// 组件挂载阶段
	mounted() {},
	computed: {
		...mapState({
			overHeight: state => state.overHeight
		})
	}
};
</script>

<style lang="scss">
.e-header {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: torem(56px);
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-out 0s;

  &.side-bar-active {
    transform: translate3d(400px, 0, 0);
  }

  .header-sidebar-menu {
    position: absolute;
    z-index: 21;
    top: 50%;
    left: 1rem;
    width: torem(28px);
    height: torem(28px);
    border: 2px solid #fff;
    color: #fff;
    cursor: pointer;
    text-align: center;
    transform: translate(0, -50%);

    &:hover {
      background: #fff;
      color: #000;
    }

    &.is-slide {
      border: 2px solid #000;
      background: #fff;
      color: #000;

      &:hover {
        background: #000;
        color: #fff;
      }
    }
  }

  .arrow-right {
    // 后期换成svg吧.写一个如此的费力.东调西调的
    position: relative;
    display: inline-block;
    width: torem(10px);
    height: torem(10px);
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    border-radius: 1px;
    // 发现transform是从右边执行变换效果的.
    transform: translate(-2px, 2px) rotate(-45deg);
    transform-origin: center;
  }

  .home-link {
    position: absolute;
    top: 50%;
    right: torem(40px);
    color: #fff;
    cursor: pointer;
    font-family: 'Oswald-Regular';
    font-size: torem(22px);
    transform: translate(0, -50%);

    &:hover {
      color: var(--theme-color);
    }
  }
}
</style>
