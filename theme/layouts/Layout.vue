<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    ref="container"
  >
		<!-- 头部 -->
    <AppHeader
      v-if="true"
    />

		<!-- 正文 -->
    <slot>
			<Home v-if="$frontmatter.home"></Home>
      <Content v-else-if="$page.key" :page-key="$page.key"></Content>
    </slot>

		<!-- back-to-top -->
  </div>
</template>

<script>
import Vue from 'vue';
import nprogress from 'nprogress';

export default {
	computed: {
		pageClasses() {
			const userPageClass = this.$page.frontmatter.pageClass;
			return [
				userPageClass
			];
		}
	},

	mounted() {
		// Configure progress bar
		nprogress.configure({showSpinner: false});

		this.$router.beforeEach((to, from, next) => {
			if (to.path !== from.path && !Vue.component(to.name)) {
				nprogress.start();
			}
			next();
		});

		this.$router.afterEach(() => {
			nprogress.done();
		});
	},

	methods: {
		// Side swipe
		onTouchStart(e) {
			this.touchStart = {
				x: e.changedTouches[0].clientX,
				y: e.changedTouches[0].clientY
			};
		},

		onTouchEnd(e) {
			const dx = e.changedTouches[0].clientX - this.touchStart.x;
			const dy = e.changedTouches[0].clientY - this.touchStart.y;
			if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
				if (dx > 0 && this.touchStart.x <= 80) {
					this.toggleSidebar(true);
				} else {
					this.toggleSidebar(false);
				}
			}
		}
	}
};
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus" src="@parent-theme/styles/theme.styl"></style>
<style lang="scss">
@import '../styles/theme.scss';
@import url('https://fonts.googleapis.com/css?family=Cookie');

@font-face {
  font-family: 'Oswald-Regular';
  src: url('/Oswald-Regular.ttf');
}

.font-cookie {
  font-family: 'Cookie', cursive;
  font-style: italic;
  font-weight: 400;
}

.custom-font {
  font-family: 'Oswald-Regular', cursive;
  font-weight: 200;
}
</style>
