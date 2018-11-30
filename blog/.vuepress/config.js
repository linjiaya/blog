module.exports = {
  contentLoading: true,
  plugins: {
    '@vuepress/plugin-medium-zoom': {
      selector: 'img'
    },
    '@vuepress/plugin-blog': {
      postsDir: 'posts'
    },
  }
}
