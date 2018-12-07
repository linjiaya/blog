<template>
  <Layout>
    <div class="custom-page-post">
      <nav class="breadcrumbs">
        <ul class="rec-list is-category" v-if="categoryList.length">
          <li class="item" v-for="(category, index) in categoryList" :key="index">
            <a :href="category.path">
              #{{category.key | upper}}
            </a>
          </li>
        </ul>
        <ul class="rec-list is-tag" v-if="tagList.length">
          <li class="item" v-for="(tag, index) in tagList" :key="index">
            <a :href="tag.path">
              #{{tag.key | upper}}
            </a>
          </li>
        </ul>
      </nav>
      <Content class="post-content" />
    </div>
  </Layout>
</template>

<script>
import get from 'lodash-es/get';
export default {
	name: 'Post',
	filters: {
		upper(value) {
			return value.toUpperCase().replace('.', '');
		}
	},
	computed: {
		categoryList() {
			return Object.entries(this.$categories._metaMap).reduce((result, item) => {
				const key = item[0];
				let value = get(item[1], 'posts');
				if (value.find(post => post.path === this.$route.path)) {
					result.push({
						key,
						path: get(item[1], 'path')
					});
				}
				return result;
			}, []);
		},
		tagList() {
			return Object.entries(this.$tags._metaMap).reduce((result, item) => {
				const key = item[0];
				let value = get(item[1], 'posts');
				if (value.find(post => post.path === this.$route.path)) {
					result.push({
						key,
						path: get(item[1], 'path')
					});
				}
				return result;
			}, []);
		}
	}
};
</script>

<style src="prismjs/themes/prism-tomorrow.css">
/* https://github.com/PrismJS/prism/tree/master/themes */
</style>
<style lang="stylus" src="@parent-theme/styles/theme.styl">
</style>
<style lang="scss">
@import '../styles/theme.scss';
</style>

<style lang="scss">
.breadcrumbs {
  padding: 0 10px;
  margin-left: 50%;
  border-bottom: 1px solid rgba(114, 186, 94, 0.55);
  border-left: 1px solid rgba(114, 186, 94, 0.55);
  background-color: rgba(114, 186, 94, 0.05);
}

.rec-list {
  display: flex;
  align-items: center;
  font-size: 0.8rem;

  .item + .item {
    margin-left: 10px;
  }

  a {
    display: block;
    height: 100%;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>

