import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Post from './views/Post.vue';

Vue.use(Router);

export default new Router({
	routes: [
		// Home.vue

		// 默认按创建时间分类
		// /?p=1
		// 按标签分类
		// /?tag=vue,js&&p=1
		// 按文件夹类别分类,可以是js.css
		// /?category=js&&page=1
		// 标签+分类
		// /?category=js&&tag=vue&&p=1
		{
			path: '/',
			name: 'home',
			component: Home
		},
		// Post.vue, 文章主界面
		// post/:id
		{
			path: '/post/:id',
			name: 'post',
			component: Post
		}
	]
});
