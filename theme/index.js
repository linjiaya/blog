module.exports = {
  extend: '@vuepress/theme-default',
  plugins: {
    '@vuepress/plugin-medium-zoom': {
      selector: 'img'
    },
    '@vuepress/plugin-blog': {
      postsDir: 'posts'
    }
  }
};
