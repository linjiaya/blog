import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import hljs from 'highlightjs';

Vue.directive('highlight', {
	inserted(el) {
		if (!el.innerHTML) {
			return;
		}
		const blocks = el.querySelectorAll('pre code');
		blocks.forEach(block => {
			hljs.highlightBlock(block);
		});
	},
	update(el) {
		if (!el.innerHTML) {
			return;
		}
		const blocks = el.querySelectorAll('pre code');
		blocks.forEach(block => {
			hljs.highlightBlock(block);
		});
	}
});

Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
