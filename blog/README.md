---
home: true
actionText: Get Started →
footer: MIT Licensed | Copyright © 2018-present Evan You
---

<header class="header">
  <!-- {{JSON.stringify($tags, null, 4)}} -->
</header>

<div class="tag-lists">
  <h1>这里可以打印出文章所有使用的tag 和 此分类对应的位置，同时还可以知道该分类下具有多少文章</h1>
  <li v-for="(value, key) of $tags._metaMap" :key="key">
  <a style="color:cyan" :href="value.path">{{key}}: {{value.path}}<OutboundLink /> </a>
    => <a style="color:red" v-for="(post, index) in value.posts" :key="index" :href="post.path">{{post.title}}<OutboundLink /></a>
  </li>
</div>

# 初步设想设计

[Wow Desgin](https://ktquez.com/en/)

[Theme Search](https://github.com/search?q=vuepress+theme)

### layout 布局

`theme` 文件夹下的组件是自定义的theme 主题。 当 `markdown` 中的 `frontMatter` 中定义 layout 的时候。例如

```markdown
---
layout: Post
---
```


则此 markdown 将采用 theme -> layouts -> Post.vue 作为其布局组件，如果没有找到，则去当前主题继承的主题中查找.

### 首页

Home 主页需要重新编排。做一个比较具有特色的风格

- 分类列表，类似 alligator.io首页的模式
- 搜索🔍功能，利用 headers-plugin 提供服务
- recentPost list(卡片List？)
- 背景做一个组件。 动态的，可以是canvas 粒子绘制背景 or 动漫背景图?



#### Post页面

这个是一般的 文章页面的布局, `permanlink` :/year/:month/:day/:slug , 日期 + 蛞蝓化标题



- TOC Headers列表，有插件提供
- 摘注 `$page.excerpt` 提供 => 组件
- 代码高亮 (css 配置)， 代码抽取已经经过 markdown-it 处理过了 => 选一个Ok 的 风格
- 其他 markdown-it-xxx plugin 的能力



#### Tag页面

/tag/:slug

风格如下
<img :src="$withBase('/tag.png')" alt="foo">


>  Extends Post.vue



#### Tags 页面

/tags/

这个是该标签对应的分类页面.

> 可以简单的有一个相关的该分类下的文章list.



#### Categories 页面

category从维度来讲是主分类，tags进行辅助分类


::: warning COMPATIBILITY NOTE
VuePress requires Node.js >= 8.
:::

#### frontMatter generator

- 自动生成 author, title, tags, categories

<img src="./logo.png">
