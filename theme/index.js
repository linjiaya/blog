module.exports = {
  extend: '@vuepress/theme-default',
  plugins: {
    '@vuepress/plugin-medium-zoom': {
      selector: 'img'
    },
    '@vuepress/plugin-blog': {
      postsDir: 'posts'
    },
    '@vuepress/last-updated': {
      transformer: (timestamp, lang) => {
        const dayjs = require('dayjs');
        // 变量注入到 $page.lastUpdated
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    '@vuepress/pwa': {
      serviceWorker: true,
      // popupComponent: 'MySWUpdatePopup'
      updatePopup: true,
    },
  },
};
