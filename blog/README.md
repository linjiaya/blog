---
home: true
---

# RoadMap

[Theme Search](https://github.com/search?q=vuepress+theme)

### 首页

- [ ] 搜索 🔍 功能
- [ ] 背景做一个组件。 动态的，可以是 canvas 粒子绘制背景 or 动漫背景图

#### Post 页面

这个是一般的 文章页面的布局, `permanlink` :/year/:month/:day/:slug , 日期 + 蛞蝓化标题

- [ ] TOC Headers 列表，有插件提供
- [ ] 摘注 `$page.excerpt` 提供 => 组件
- [x] 代码高亮 (css 配置)， 代码抽取已经经过 markdown-it 处理过了 => 选一个 Ok 的 风格(后期再更换)

#### feature

- [x] post description. if provide `frontmatter.desciption`, it will be used. else extract the 60 words of Post as description.
- [ ] pageSize & readTime of per Post.
- [ ] frontMatter generator. Auto generate author, title, tags, categories.
- [ ] live Demo. Sometimes An article may use the code to preview.

#### UI improvement

- [ ] The categories list such as the magic sidebar in Mac.
- [ ] 阅读书籍的翻页效果
- [ ] scrollbar improvement.
- [ ] https://codepen.io/joshuaward/pen/aQXLPa
