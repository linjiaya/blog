<template>
  <Layout>
    <div class="post-category">
      <h1>Posts About {{categoryName}}</h1>
      <p class="mr-30">
        <input class="filter bottom-subscribe" type="text" placeholder="filter..." v-model.lazy="search">
      </p>
      <ul class="grid-category">
        <li class="category-item" v-for="(post, index) in posts" :key="index">
          <router-link class="category-item-a" :to="post.path" >
            <h2>{{post.frontmatter.title}}</h2>
            <h3>{{post.frontmatter.description}}</h3>
            <!-- TODO: use the `localstorage` to cache the key -->
            <!-- <span>是否阅读： 已读</span> -->
            <!-- TODO: 通过 ga(Google Analysis)获取每个界面的UV，通过提供的API获取相应的文章阅读数目 -->
            <!-- <span>pv: 1099</span> -->

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
import get from 'lodash-es/get'
export default {
  name: 'Category',
  data() {
    return {
      search: ''
    }
  },
  computed: {
    posts() {
      return get(this.$category, 'posts', [])
    },
    categoryName() {
      return this.$title.split('|')[0].trim()
    }
  },
  watch: {
    search() {
      // 调用查询能力
    }
  }
}
</script>

<style lang="stylus" src="@parent-theme/styles/theme.styl"></style>

<style lang="scss">
@import '../styles/theme.scss';
</style>

<style lang="scss" scoped>
.post-category {
  max-width: 74rem;
  margin: 0 auto;

  h1 {
    margin-top: 0.4em;
    margin-bottom: 0.2em;
    color: var(--green1);
    font-size: 3.7em;
    font-style: italic;
    font-weight: 200;
    text-align: center;
  }

  .grid-category {
    display: grid;
    padding: 30px 0;
    grid-template-columns: 1fr 1fr 1fr;
  }

  h2 {
    margin-bottom: 1rem;
    color: #4aae9b;
    font-size: 1.4rem;
    line-height: 1.2;
    text-align: center;
  }

  h3 {
    color: #93a791;
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    word-break: normal;
  }
}

.category-item {
  margin: 1rem 0.7rem;
  background: linear-gradient(135deg, #41b883 10px, rgba(0, 0, 0, 0.01) 0);
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.category-item-a {
  display: flex;
  min-height: 200px;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1.25rem;
  border-radius: 3px;
  box-shadow: 1px 1px 15px rgba(67, 38, 100, 0.15);
}

input.filter {
  width: 500px;
  max-width: 100%;
  margin-bottom: 2.2rem;
}

input.bottom-subscribe {
  display: block;
  height: 2.5em;
  margin: 0 auto;
  border-width: 2px;
  border-style: solid;
  border-color: #6db65b;
  background: #fcfcfc;
  border-radius: 8px;
  color: #555;
  font-size: 17px;
  text-align: center;
  transition: box-shadow 0.45s, border-color 0.45s ease-in-out;
}

input:focus {
  border-color: var(--subtle);
  box-shadow: 0 0 5px var(--subtle);
  outline: 0;
}

.mr-30 {
  margin-top: 30px;
}
</style>
