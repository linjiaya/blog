---
title: 重读vue-loader文档
date: 2017-12-06 11:46:17
category: Vue.js
---

# 重读 vue-loader 文档

> 今天要开启新的项目,想着脚手架页升级到 2.9.2 了,就准备试用一波,初始化完成后,发现配置有所删减和更新.对着文档重新翻阅了一遍.大致讲一讲和上一次看的差异性和收获.

## [Src imports](https://vue-loader.vuejs.org/en/start/spec.html)

将.vue 文件分解.可以通过 src 属性引用已经编写好的块状代码,如 html 块,css 块,js 块.这个功能有点类似 nunjucks 中 extends,只不过他不是继承,只是引用一些共用的代码块.(模板),这对于 css 和 html 的友好性应该比定制化的 js 要强.

src 进口可以用于自定义块([Custom Block](https://vue-loader.vuejs.org/en/configurations/custom-blocks.html)).

## [Custom Blocks](https://vue-loader.vuejs.org/en/configurations/custom-blocks.html)

自定义块的作用是定义一些非 template,script 以及 css 之外的块,块一般用作被自定义的 loader 解析.一般是 docs 块,用于书写该组件的说明文档.文档中采用的是使用`raw-loader`去解析自定义块.转成纯文本,然后提取到一个说明文档中.这个功能还有点作用,做项目的组件介绍的时候的确很有用!

自定义块除了这种功能,还有运行时可用的效果.什么意思,就是在 A 组件中定义了 docs 的块,在 B 组件中就可以拿到 docs 块被自己定义的 loader 解析之后的值.具体可以看文档的操作,值得一试.

## 深度选择器

如果希望 scoped 中的样式选择是深度的,可以使用`.a >>> .b`的语法.

先说一下 postcss 对 scoped 的真实处理.

```js
<style scoped lang="scss">
  .a{
    color: green;
    .b{
      color: red
    }
  }
</style>
```

在组件中经过 postcss 处理之后,假设作用的组件的每个节点都会被打上一个相同的 data-v-656039f0 标记.那么实际上 css 编译为

```js
// 实际的效果.
.a[data-v-656039f0] {
  color: green;
}

.a .b[data-v-656039f0] {
  color: red;
}
```

所以当我们想要通过.a 去控制属于里面的.b 时,在 scoped 中并不是我们想要的.

```js
.a[data-v-656039f0] {
  color: green;
}
// 我们想要的效果
.a[data-v-656039f0] .b{
  color: red
}
```

但是动态渲染的内容是不会被打上 data-v-656039f0 标记的(postcss 是后处理,没办法对动态生成的内容做操作).

所以我们需要深度选择器,就是`.a >>> .b`

这样就能编译为我们要的 css 了.

```js
// 我们想要的效果
.a[data-v-656039f0] .b{
  // custom
}
```

这个场景是之前一直需要的,虽然之前有上述的方式解决,既然提供了深度选择器,就可以直接使用了.

## loading global setting file

加载全局的 css 配置，在我们写 scss 时，经常想把一些 variable 定义在一个文件，还有一些通用的函数，这个时候不想在每个 vue 组件(通常是业务组件)中都去引用这个一样的定义文件，所以我们需要一个类似 webpack 的 global 设置的东西.去加载这个文件.

像 sass 使用的就是`sass-resources-loader`,在 vue-cli 搭建的环境中，loader 是被抽取在 util.js 中做统一处理的.

```js
{
  loader: 'sass-resources-loader',
  options: {
    resources: path.resolve(__dirname, '../src/assets/scss/mixin.scss')
  }
}
```

把需要自动加载的配置文件存放进去即可。（已经测试过了，有效果。）

## css module

这个就是通过一个变量能够直接访问到定义的 css 样式类名,通过 js 可以访问到这个特殊的模块 id.这个据文档介绍说是模拟 css scoped 的替代方案.

就我个人感觉,实用程度和我直接使用 scoped 操作没什么很大区别.

## [postcss](https://github.com/postcss/postcss)

这个之前有用过,对具体的功能配置,还是要熟悉一下 postcss 的开发和认知.这个可以补一下~

在 loader 的环节,比如使用 postcss-cssnext,使用 sugarss,

## [hotReload](https://vue-loader.vuejs.org/en/features/hot-reload.html)

对于热重载不陌生了,这次主要是更新将以前通过 node 方式启动 express 服务,然后利用 webpack-dev-server,hot-middle-ware 等中间件作为开发环境的配置转成了单独使用 webpack-dev-server 作为开发环境的启动,将 webpack.dev.conf.js(开发环境配置)作为配置项的方式.

hotReload 此次也更新为可配置的,可以手动关闭.当然在 ssr 的环境,生产环境时,默认的 hotReload 是禁用的.

## cacheBusting

缓存无效化,将 hash 关闭之后,有利于帮助源码调试.

但是具体的效果我没有在哪里可以看到,待实践.

## esModule

关于默认的导出是 es module 的导出方式..具体看[V13.0.0](https://github.com/vuejs/vue-loader/releases/tag/v13.0.0)

在新的 vue-loader 版本,esModule 默认是 true 的,为了打包更小的体积(配合 webpack3),在高版本的动态导入不需要使用`.default`,因为 vue-loader 已经帮忙做处理了.

![](/blog/image/重读vue-loader文档_1.png)

观察 vue-loader 对.vue 文件的处理,还是能看出蛮多东西的.
