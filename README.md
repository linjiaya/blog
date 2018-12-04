# 初步设想设计

### layout 布局

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

> Extends Post.vue

#### Tags 页面

/tags/

这个是该标签对应的分类页面.

> 可以简单的有一个相关的该分类下的文章 list.

#### Categories 页面

暂无 同 Tags

#### package.json

yorkie 是 husky 在 lerna 在 monorepo 下的解决方案.(gitHooks in package.json)
[see this](https://github.com/yyx990803/yorkie)

lint-staged(Run linters on git staged files), 正如描述一样，为了在提交的时候校验文件，同时做 git add 处理的一个库.
[see this](https://github.com/okonet/lint-staged)

commitlint 提交的时候遵循一定的规则描述(可以结合 commitizen)
[see this](https://github.com/marionebl/commitlint)
