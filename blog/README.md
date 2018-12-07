---
home: true
actionText: Get Started →
footer: ''
---

# 初步设想设计

[Wow Desgin](https://ktquez.com/en/)

[Theme Search](https://github.com/search?q=vuepress+theme)

### layout 布局 3

`theme` 文件夹下的组件是自定义的 theme 主题。 当 `markdown` 中的 `frontMatter` 中定义 layout 的时候。例如

```markdown
---
layout: Post
---
```

则此 markdown 将采用 theme -> layouts -> Post.vue 作为其布局组件，如果没有找到，则去当前主题继承的主题中查找.

### 首页

Home 主页需要重新编排。做一个比较具有特色的风格

- 分类列表，类似 alligator.io 首页的模式
- 搜索 🔍 功能，利用 headers-plugin 提供服务
- recentPost list(卡片 List？)
- 背景做一个组件。 动态的，可以是 canvas 粒子绘制背景 or 动漫背景图?

#### Post 页面

这个是一般的 文章页面的布局, `permanlink` :/year/:month/:day/:slug , 日期 + 蛞蝓化标题

- TOC Headers 列表，有插件提供
- 摘注 `$page.excerpt` 提供 => 组件
- 代码高亮 (css 配置)， 代码抽取已经经过 markdown-it 处理过了 => 选一个 Ok 的 风格
- 其他 markdown-it-xxx plugin 的能力

#### Tag 页面

/tag/:slug

风格如下
<img :src="$withBase('/tag.png')" alt="foo">

> Extends Post.vue

#### Tags 页面

/tag/

这个是该标签对应的分类页面.

#### Categories 页面

/category/

category 从维度来讲是主分类，tags 进行辅助分类

#### feature

- [ ] frontMatter generator. Auto generate author, title, tags, categories.
- [ ] live Demo. Sometimes An article may use the code to preview.
- [ ] pageSize & readTime.

#### UI improvement

- [ ] The categories list such as the magic sidebar in Mac.
- [ ] 阅读书籍的翻页效果
- [ ] scrollbar improvement
- [ ] https://codepen.io/joshuaward/pen/aQXLPa
