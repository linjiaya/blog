<template>
  <div class="wrapper">
		<div class="site-intro">
			<div class="site-intro-img"></div>
      <div class="site-intro-placeholder"></div>
			<div class="site-intro-meta">
				<h1 :class="['intro-title', fontloaded ? 'font-loaded' : '']">EliazTray</h1>
				<p :class="['intro-subtitle', fontloaded ? 'font-loaded' : '']">it's better to burn out than to fade away</p>
			</div>
		</div>
    <!-- 主容器 -->
    <transition appear-active-class="fadeindown" appear>
      <div class="container">
        <main class="main home-page">
          <transition-group name="article-list" tag="p" class="flex">
            <e-article class="e-article"
            v-for="article in articleList" :key="article.id" v-bind="article"></e-article>
            <!-- 和article-list保持同步 -->
          <e-pagination key="pagination" class="transition"></e-pagination>
          </transition-group>
        </main>
        <e-profile></e-profile>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import eProfile from '@/components/e-profile';
import eArticle from '@/components/e-article';
import ePagination from '@/components/e-pagination';
import debug from 'debug';
debug.enable('Home.vue:');
// Const log = debug('Home.vue:')

export default {
	name: 'home',
	components: {
		eProfile,
		eArticle,
		ePagination
	},
	data() {
		return {
			test: false
		};
	},
	computed: {
		...mapState({
			fontloaded: state => state.fontLoaded,
			overHeight: state => state.overHeight,
			articleList: state => state.filterList
		})
	},
	watch: {
		$route: {
			handler(to) {
				this.fetchList(to.query);
			},
			immediate: true
		}
	},
	methods: {
		...mapActions({
			fetchList: 'fetch_articlelist'
		})
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  // -3px看到x轴左移3px了.很微小.blur 为2px是一个不错的类border写法.
  box-shadow: -3px 0 2px 0 rgba(#000, 0.6);
  transform: translate3d(0, 0, 0);
  transition: all 0.3s ease-out 0s;

  // 当侧边栏激活时
  &.side-bar-active {
    transform: translate3d(400px, 0, 0);
  }

  .site-intro {
    position: relative;
    z-index: 3;
    overflow: hidden;
    width: 100%;
    // 视口高度的一半
    height: 50vh;
    box-shadow: 0 0 2px 0 rgba(#000, 0.6);
  }

  .site-intro-img {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 1px);
    // center center 与left top在响应式布局的变换过程中还是有差异性的.
    background: url('../assets/index-bg.jpg') no-repeat center center;
    background-color: transparent;
    background-size: cover;
    // 加滤镜!这个滤镜加的很好
    filter: brightness(0.5);
  }

  .site-intro-meta {
    display: flex;
    height: 100%;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  }

  .intro-title {
    font-size: torem(64px);
  }

  .intro-title,
  .intro-subtitle {
    position: relative;
    color: #fff;
    cursor: pointer;
    font-family: 'Oswald-Regular';
    // 初始状态不可见+存在向下的偏移
    opacity: 0;
    transform: translate(0, 1rem);
    transition: all 0.5s ease-out 0s;

    // 伪元素,一条白色下划线
    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #fff;
      content: '';
      transform: scaleX(0);
      // 从右边开始变换
      // transform-origin: bottom right;
      // 从中间开始变换
      transform-origin: center;
      transition: transform 0.3s ease-out 0s;
    }
    // 鼠标悬浮后的伪类效果
    &:hover::after {
      transform: scaleX(1);
      // transform-origin: bottom left;
      transform-origin: center;
    }

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

  // 图片未加载完的动画效果
  .site-intro-placeholder {
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    width: calc(100% + 300px);
    height: 100%;
    animation: gradient-move 2.5s ease-out 0s 1;
    background:
      repeating-linear-gradient(
        -45deg,
        #444 0,
        #444 80px,
        #333 80px,
        #333 160px
      );
    background-position: center center;
    transform: translate3d(-226px, 0, 0);
  }

  @keyframes gradient-move {
    0% {
      transform: translate3d(-226px, 0, 0);
    }

    100% {
      transform: translate3d(0, 0, 0);
    }
  }
}

.container {
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: center;
  padding: torem(48px) 0 0 0;

  .main {
    width: 50%;
    order: 1;
    margin-left: torem(48px);
  }

  .e-article {
    transition: transform 1s;
  }
}

.fadeindown {
  animation: fadeindown 1s ease-out 0s;
}

.fadeOutUp {
  animation: fadeOutUp 1s ease-out 0s;
}

@keyframes fadeindown {
  0% {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}

.article-list-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.article-list-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.article-list-leave-active {
  position: absolute;
}

.flex {
  display: flex;
  flex-flow: column nowrap; // 将第一篇article的padding-top重置
  margin-top: torem(-16px);
}

.transition {
  transition: transform 1s;
}
</style>
