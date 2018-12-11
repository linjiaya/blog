const {path} = require('@vuepress/shared-utils')

module.exports = {
  extend: '@vuepress/theme-default',
  plugins: {
    '@vuepress/plugin-medium-zoom': {
      selector: '.post-content img'
    },
    '@vuepress/plugin-blog': {
      postsDir: 'posts'
    },
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs')
        // 变量注入到 $page.lastUpdated
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    '@vuepress/pwa': {
      serviceWorker: true,
      // 因为下面这个配置的逗号未添加，找错找了2小时:(
      popupComponent: 'MySWUpdatePopup',
      updatePopup: true
    },
    '@vuepress/register-components': {
      // FIXME: 这里发布为npm包时要注意修改为layouts,因为现在的执行目录是根目录
      componentsDir: path.resolve('theme/layouts')
    }
  }
}
