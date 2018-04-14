// @flow
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CHANGE_FONTLOAD = 'change_fontload'
const CHANGE_OVERHEIGHT = 'change_overheight'
const FETCH_ARTICLELIST = 'fetch_articlelist'
const GET_FILTERLIST = 'get_filterlist'
const FETCH_ARTICLE = 'fetch_article'
const READ_ARTICLE = 'read_article'

export default new Vuex.Store({
  state: {
    // 字体是否加载完毕
    fontLoaded: false,
    // 是否滑过背景图.
    overHeight: false,
    // 显示的文章列表, 用于后台的接口.数据库用mongodb,直接存储(存储tag, category)会比较方便
    articleList: [],
    filterList: [],
    articleReaded: [],
    // 当前文章, 前一个文章的id
    // 下一篇文章的id
    currentArticle: {
      prev: 'id',
      next: 'id'
    }
  },
  mutations: {
    // 加载完字体的状态改变
    [CHANGE_FONTLOAD](state, payload) {
      state.fontLoaded = payload
    },
    // 是否超过bg高度
    [CHANGE_OVERHEIGHT](state, payload) {
      state.overHeight = payload
    },
    // 从服务器获取到最新的文章列表.
    [FETCH_ARTICLELIST](state, articleList) {
      state.articleList = articleList
    },
    /**
     * @description 根据tag, category得到filterList
     *
     * @param {any} state
     * @param {any} payload
     */
    [GET_FILTERLIST](state, payload) {
      let filterList = []
      const { tag, category } = payload
      const getFilterList = (articleList, key) => name => {
        console.log(name)
        const names = name.split(',')
        return articleList.filter(article =>
          names.every(name => article[key].indexOf(name) > -1)
        )
      }
      const getFilterListByTag = getFilterList(state.articleList, 'tags')
      const getFilterListByCategory = getFilterList(
        state.articleList,
        'categories'
      )
      if (tag && category) {
        // 获取标签和归属类型分类两种都符合的articleList
        filterList = getFilterList(getFilterListByTag(tag), 'categories')(
          category
        )
      } else if (tag && !category) {
        // 获取以标签分类的articleList
        filterList = getFilterListByTag(tag)
      } else if (!tag && category) {
        // 获取以归属类型分类的articleList
        filterList = getFilterListByCategory(category)
      } else {
        filterList = state.articleList
      }
      state.filterList = filterList
    },
    [FETCH_ARTICLE](state, article) {
      state.currentArticle = article
    },
    /**
     * @description 往已经阅读的article中存放
     *
     * @param {any} state
     * @param {any} article
     */
    [READ_ARTICLE](state, article) {
      state.articleReaded = state.articleReaded.concat(article)
    }
  },
  actions: {
    [CHANGE_FONTLOAD]({ commit }, payload) {
      commit(CHANGE_FONTLOAD, payload)
    },
    [CHANGE_OVERHEIGHT]({ commit }, payload) {
      commit(CHANGE_OVERHEIGHT, payload)
    },
    async [FETCH_ARTICLELIST](store, payload) {
      let articleList = []
      setTimeout(() => {
        articleList = [
          {
            id: '1',
            title: '关于npm随手记录的知识点',
            meta:
              'NPM下的各个文件夹的含义 dist: 用来放UMD版本的文件 lib: 是package.json中的main指向的入口，使用npm就会调用这个文件夹 src: 源码 lib相比src唯一的作用就是使用babel和webpack进行了转码，因为大多数的build过程不会执行babel的转码，所以lib有更好的兼容性。 Difference between lib and dist folders when packaging library using webpack?          ',
            // todo: 把它换成时间戳,便于排序.前端直接formatter日期就好.在视图层做转换
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['npm', 'webpack'],
            categories: ['js']
          },
          {
            id: '2',
            title: '使用VSCode调试Webpack',
            meta:
              '目标使用VSCode来调试经过Webpack打包和Babel转义之后的代码。 步骤准备工作 安装Debugger for Chrome这个VSCode的插件 Chrome 操作 新建一个launch.json，可参考此篇文章 重点来了，如何配置launch.json 先把我的配置放上来 1234567891011121314151617181920212223{ // 使用 IntelliSense 了解相关属性。 // 悬停以查看现有属性的描述。 // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['vscode', 'webpack'],
            categories: ['js', 'tool']
          },
          {
            id: '3',
            title: '弱渣的常用git命令',
            meta:
              '作为一个基本上只会push和pull的还依赖于SourceTree的git弱渣，随手记录一下自己使用过的git命令，让自己以后找起来更方便🙄 修正最后一个 commit 消息 场景：你在最后一条 commit 消息里有个笔误，已经执行了 git commit -m "Fxies bug #42"，但在 git push 之前你意识到消息应该是 “Fixes bug #42″。 方法: git commit --amend 或 git commit --amend -m "Fixes bug #42" 原理: git commit --amend...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['git'],
            categories: ['git']
          },
          {
            id: '4',
            title: '关于npm随手记录的知识点',
            meta:
              'NPM下的各个文件夹的含义 dist: 用来放UMD版本的文件 lib: 是package.json中的main指向的入口，使用npm就会调用这个文件夹 src: 源码 lib相比src唯一的作用就是使用babel和webpack进行了转码，因为大多数的build过程不会执行babel的转码，所以lib有更好的兼容性。 Difference between lib and dist folders when packaging library using webpack?          ',
            // todo: 把它换成时间戳,便于排序.前端直接formatter日期就好.在视图层做转换
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['npm', 'webpack'],
            categories: ['js']
          },
          {
            id: '5',
            title: '使用VSCode调试Webpack',
            meta:
              '目标使用VSCode来调试经过Webpack打包和Babel转义之后的代码。 步骤准备工作 安装Debugger for Chrome这个VSCode的插件 Chrome 操作 新建一个launch.json，可参考此篇文章 重点来了，如何配置launch.json 先把我的配置放上来 1234567891011121314151617181920212223{ // 使用 IntelliSense 了解相关属性。 // 悬停以查看现有属性的描述。 // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['vscode', 'webpack'],
            categories: ['js', 'tool']
          },
          {
            id: '6',
            title: '弱渣的常用git命令',
            meta:
              '作为一个基本上只会push和pull的还依赖于SourceTree的git弱渣，随手记录一下自己使用过的git命令，让自己以后找起来更方便🙄 修正最后一个 commit 消息 场景：你在最后一条 commit 消息里有个笔误，已经执行了 git commit -m "Fxies bug #42"，但在 git push 之前你意识到消息应该是 “Fixes bug #42″。 方法: git commit --amend 或 git commit --amend -m "Fixes bug #42" 原理: git commit --amend...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['git'],
            categories: ['git']
          },
          {
            id: '7',
            title: '关于npm随手记录的知识点',
            meta:
              'NPM下的各个文件夹的含义 dist: 用来放UMD版本的文件 lib: 是package.json中的main指向的入口，使用npm就会调用这个文件夹 src: 源码 lib相比src唯一的作用就是使用babel和webpack进行了转码，因为大多数的build过程不会执行babel的转码，所以lib有更好的兼容性。 Difference between lib and dist folders when packaging library using webpack?          ',
            // todo: 把它换成时间戳,便于排序.前端直接formatter日期就好.在视图层做转换
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['npm', 'webpack'],
            categories: ['js']
          },
          {
            id: '8',
            title: '使用VSCode调试Webpack',
            meta:
              '目标使用VSCode来调试经过Webpack打包和Babel转义之后的代码。 步骤准备工作 安装Debugger for Chrome这个VSCode的插件 Chrome 操作 新建一个launch.json，可参考此篇文章 重点来了，如何配置launch.json 先把我的配置放上来 1234567891011121314151617181920212223{ // 使用 IntelliSense 了解相关属性。 // 悬停以查看现有属性的描述。 // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['vscode', 'webpack'],
            categories: ['js', 'tool']
          },
          {
            id: '9',
            title: '弱渣的常用git命令',
            meta:
              '作为一个基本上只会push和pull的还依赖于SourceTree的git弱渣，随手记录一下自己使用过的git命令，让自己以后找起来更方便🙄 修正最后一个 commit 消息 场景：你在最后一条 commit 消息里有个笔误，已经执行了 git commit -m "Fxies bug #42"，但在 git push 之前你意识到消息应该是 “Fixes bug #42″。 方法: git commit --amend 或 git commit --amend -m "Fixes bug #42" 原理: git commit --amend...',
            ctime: '2017/05/21',
            utime: '2018/03/25',
            tags: ['git'],
            categories: ['git']
          }
        ]
        store.commit(FETCH_ARTICLELIST, articleList)
        // 根绝payload生成filterList
        store.commit(GET_FILTERLIST, payload)
      }, 100)
    },
    // todo: 获取具体article根据id
    async [FETCH_ARTICLE]({ commit, getters }, id) {
      // 先判断article是否阅读过.
      const article = getters.getArticleById(id)
      if (!article.length) {
        const post = await Promise.resolve('this is article')
        commit(FETCH_ARTICLE, post)
        commit(READ_ARTICLE, post)
      } else {
        commit(FETCH_ARTICLE, article)
      }
    }
  },
  getters: {
    fontLoaded(state) {
      return state.fontLoaded
    },
    getArticleById: state => id => {
      return state.articleReaded.filter(article => article.id === id)
    }
  }
})
