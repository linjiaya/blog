<template>
  <header class="app-header">
    <div class="home-logo">
      <router-link to="/" class="category-link">
        Logo
      </router-link>
    </div>
    <ul class="category-ul" v-if="Object.keys($categories._metaMap).length">
      <li class="category-li" v-for="(value, key) of $categories._metaMap" :key="key">
      <router-link :to="value.path" class="category-link">
        {{key}}
      </router-link>
        <!-- => <a style="color:red;" v-for="(post, index) in value.posts" :key="index" :href="post.path">{{post.title}}</a> -->
      </li>
    </ul>
    <div v-else>
      default category bar
    </div>
  </header>
</template>

<script>
import get from 'lodash-es/get';
export default {
	name: 'AppHeader',
	computed: {
	}
};
</script>

<style lang="scss">
.app-header {
  display: flex;
  background: linear-gradient(to right, rgba(107, 183, 86, 0.95), #008f68);

  .category-ul {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .category-li {
    height: 3.7rem;
  }

  .category-link {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1.25rem;
    color: #fff;
    font-size: 0.9rem;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
    }

    &.router-link-exact-active {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
