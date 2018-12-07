<template>
  <Layout>
  <div class="post-category">
    <ul>
      <li class="category-item" v-for="(post, index) in posts" :key="index">
        <router-link class="category-item-a" :to="post.path" >
          <span>title: {{post.title}}</span>
          <!-- TODO: use the description of frontmatter, but if not specialfied, the default value should be set to the first two lines of the article -->
          <span>description: {{post.frontmatter.description}}</span>
          <!-- TODO: use the `localstorage` to cache the key -->
          <span>是否阅读： 已读</span>
          <!-- TODO: 通过 ga(Google Analysis)获取每个界面的UV，通过提供的API获取相应的文章阅读数目 -->
          <span>pv: 1099</span>

        </router-link>
      </li>
    </ul>
    <ul>
      <li v-for="(post, index) in posts" :key="index">
        <!-- 通过给content设置page-key,可以渲染出这个post的内容 -->
        <!-- <Content class="post-content" :page-key="post.key"></Content> -->
      </li>
    </ul>
  </div>
  </Layout>
</template>

<script>
import get from 'lodash-es/get';
export default {
	name: 'Category',
	computed: {
		posts() {
			return get(this.$category, 'posts', []);
		}
	}
};
</script>

<style lang="stylus" src="@parent-theme/styles/theme.styl"></style>

<style lang="scss">
@import '../styles/theme.scss';
</style>

<style lang="scss" scoped>
.category-item {
  width: 20rem;
  margin: 10px;
  // height: 10rem;
  border: 1px solid #ccc;
  box-shadow: 0 0 4px rgba(#000, 0.4);
}

.category-item-a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
</style>
