---
title: StyleLint in .vue
date: 2017-12-09 23:48:40
category: Linter
tags:
  - Stylelint
  - Vue.js
---

# [Stylelint](https://stylelint.io/)

> 个人理解上 stylelint 是一个 css 代码 linter 的工具，可以结合 nodejs 和 cli 进行使用。继 csslinter 等 linter 之后，具有插件化的功能，同 postcss 的插件，webpack 等都可以较好的集成进去。

如果说 js 的代码检测和规范工具在 jslint，jshint 之后，你肯定听说过 eslint。同 eslint 对 js 代码校验规则一样，stylelint 也有一套类似的处理系统.

**TL;DR**

1.使用`vue-cli`初始化一个工程 2.`npm i stylelint stylelint-config-standard -D` 3.在工程的根目录下建立`stylelint.config.js`文件，将以下内容复制进去。

```js
module.exports = {
  extends: 'stylelint-config-standard',
  rules: {}
}
```

4.打开 package.json 在 scripts 中插入

```js
"scripts": {
    // 表示对所有的.vue文件使用自定义的syntax去parse，自定义的syntax module就是postcss-html，并且使用--fix自动修复选项，去修复一些可以修复的规则。
  "lintcss:fix": "stylelint **/*.vue --custom-syntax postcss-html --fix"
}
```

5.控制台执行 `npm run lintcss:fix`，在控制台看输出，能够修改的都会被修改（比如大写的 16 进制颜色会被转成小写），不能被修改的就需要手动修改问题，根据提示修改即可.

## 生效

建议是本地安装，每个项目都重新安装一遍。

```bash
npm i stylelint -D
```

因为不是全局安装(`-g`安装)，所以一般调用的话需要借助`npm scripts`,如果这个没玩过,先去查阅相关资料.

```js
// in package.json

···
···

{
  "scripts": {
    "lintcss": "stylelint **/*.css -s scss"
  }
}

···

```

**_先说一个大的前提，很重要._**

- stylelint 自动忽略`node_modules`和`bower_modules`下的 linter 校验.
- stylelint 对文件名为 css，.scss, .sass 等具有后缀的文件自动采用相关的 syntax 去解析，比如 css 是使用 css，scss 使用 scss.如果你想要对.css 文件采用 scss 的语法去 linter，就如上面你说些，使用`-s`或者`--syntax`的选项去重新指定加载的`syntax`.
- stylelint 不能以文件夹作为 stdin（不能 src/，需要指定为 src/\*.scss），也没有指定后缀名(eslint 中--ext 的功能)。如在 eslint 中使用`eslint -ext .js,.vue` 就可以对指定类型的文件进行 linter

## 规则

一般需要在项目根目录建立一个有关 stylelint 的配置文件

- a `stylelint` property in package.json
- a `.stylelintrc` file
- a `stylelint.config.js` file exporting a JS object

对比 eslint，eslint 有.eslintrc.js

bebel 用的就是`.babelrc`

所以 stylelint 我习惯上使用在根目录建立一个`stylelint.config.js`的文件，以 module.exports 的方式，输出一些配置规则。

看下我工程中的配置。下面的`stylelint-config-standard`，`stylelint-order`需要安装。

```js
module.exports = {
  "extends": "stylelint-config-standard",
  "plugins": [
    "stylelint-order"
  ],
  "rules": {
    "order/order": [
      "declarations",
      "custom-properties",
      "dollar-variables",
      "rules",
      "at-rules"
    ],

    ····
    ····
  }
}

```

一般`extends`是去继承一个规则，一般使用的是`stylelint-config-standard`这个库，这个库是官方推荐，也是很多大公司，比如 facebook，google 就是使用这套 css 规则.

这里我使用了一个排序的插件，等会再说。是针对 css 属性的位置书写生效的.

## 在编辑器中使用 stylelint

刚刚写的都是基本的配置和一个介绍，是保证你能够在感知一个 stylelint 是一个什么东西的前提下写的。

如果想要在编辑器中使用 stylelint，如`vscode`,就很简单，

1.在插件库中查找 stylelint 2.根据插件的提示，修改一些用户设置。但我测试，在我现在的版本是不需要这些配置都可以生效的。 3.想在特殊的语言块中使用 stylelint，比如 vue 文件中，加上如下的设置即可.

```js
// 用户设置文件中. 文件->首选项->用户设置
// 让stylelint在vue组件中支持.
    "stylelint.additionalDocumentSelectors": [
        "vue"
    ]

```

stylelint 会根据根目录中`stylelint.config.js`中的规则设置，去 linter 所有的.vue 文件，提示相关的语法错误.

这样在 coding 的时候就已经具有了自动提示错误的功能了.

## 自动修正

想象一下，eslint 有--fix，同理 stylelint 也有--fix 选项，不过 stylelint 的--fix 只能修复一些问题，像大括号前面必须要有空格这些是不会自动帮你 fix 掉的，需要手动 fix（官方文档说的也很清楚）

那这些都是对.css 或者.scss，或者.sss 等文件进行--fix，但是如果一个特殊的文件，如果也需要 stylelint 去 linter，需要怎么做，官方文档说的也很明白，使用 pre-processor，先使用预处理器对对应的文件进行--custom-syntax 的 parse 处理。

[解析非标准的语法](https://stylelint.io/user-guide/css-processors/#parsing-non-standard-syntax)

[相关讨论 1](https://github.com/vuejs-templates/webpack/issues/836)

[相关讨论 2](https://github.com/vuejs-templates/webpack/pull/842)

**看了相关的 issue，大概上（从今天算）下个版本（vue-cli 下的 webpack 的新模板）应该会集成 stylelint 的相关设置。**

所以对 vue 文件的处理是

```js
// package.json
{
  "scripts": {
    // 表示对所有的.vue文件使用自定义的syntax去parse，自定义的syntax module就是postcss-html，并且使用--fix自动修复选项，去修复一些可以修复的规则。
    "lintcss:fix": "stylelint **/*.vue --custom-syntax postcss-html --fix"
  }
}
```

这个`postcss-html`模块前几天已经被 built in stylelint,也就是已经内建了，所以安装 stylelint 的时候不需要安装 postcss-html,这个 postcss-html 的作用就是解析非标准的语法，比如 markdown 和 vue 之类的，

## 使用相关插件

在继承`stylelint-config-standard`的之后,已经具有一些 css 规则，但是比如我会对 css 的抒写属性的顺序有要求，这个时候需要启用对 css 属性顺序的检测（属性顺序由自己定义），主要是使用一个叫做`stylelint-order`的插件,具体的配置如下。

先 `npm i stylelint-order -D` (已经安装`stylelint`,`stylelint-config-standard`的前提)

```js
// 我项目工程的完整配置，order是使用style-order的推荐属性顺序。
module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-order'],
  rules: {
    'order/order': [
      'declarations',
      'custom-properties',
      'dollar-variables',
      'rules',
      'at-rules'
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'float',
      'clear',
      'display',
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'flex-flow',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-content',
      'align-items',
      'align-self',
      'order',
      'grid',
      'grid-template-rows',
      'grid-template-columns',
      'grid-template-areas',
      'grid-auto-rows',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-column-gap',
      'grid-row-gap',
      'grid-template',
      'grid-template-rows',
      'grid-template-columns',
      'grid-template-areas',
      'grid-gap',
      'grid-row-gap',
      'grid-column-gap',
      'grid-area',
      'grid-row-start',
      'grid-row-end',
      'grid-column-start',
      'grid-column-end',
      'grid-column',
      'grid-column-start',
      'grid-column-end',
      'grid-row',
      'grid-row-start',
      'grid-row-end',
      'table-layout',
      'empty-cells',
      'caption-side',
      'border-collapse',
      'border-spacing',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'ruby-align',
      'ruby-merge',
      'ruby-position',
      'box-sizing',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'border',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-color',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-image',
      'border-image-source',
      'border-image-slice',
      'border-image-width',
      'border-image-outset',
      'border-image-repeat',
      'border-top',
      'border-top-width',
      'border-top-style',
      'border-top-color',
      'border-top',
      'border-right-width',
      'border-right-style',
      'border-right-color',
      'border-bottom',
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color',
      'border-left',
      'border-left-width',
      'border-left-style',
      'border-left-color',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'outline',
      'outline-width',
      'outline-color',
      'outline-style',
      'outline-offset',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'color',
      'background',
      'background-image',
      'background-position',
      'background-size',
      'background-repeat',
      'background-origin',
      'background-clip',
      'background-attachment',
      'background-color',
      'background-blend-mode',
      'isolation',
      'clip-path',
      'mask',
      'mask-image',
      'mask-mode',
      'mask-position',
      'mask-size',
      'mask-repeat',
      'mask-origin',
      'mask-clip',
      'mask-composite',
      'mask-type',
      'filter',
      'box-shadow',
      'opacity',
      'visibility',
      'overflow',
      'overflow-x',
      'overflow-y',
      'vertical-align',
      'columns',
      'columns-width',
      'columns-count',
      'column-rule',
      'column-rule-width',
      'column-rule-style',
      'column-rule-color',
      'column-fill',
      'column-span',
      'column-gap',
      'orphans',
      'writing-mode',
      'text-combine-upright',
      'unicode-bidi',
      'text-orientation',
      'direction',
      'text-rendering',
      'font-feature-settings',
      'font-language-override',
      'font',
      'font-style',
      'font-variant',
      'font-weight',
      'font-stretch',
      'font-size',
      'font-family',
      'line-height',
      'text-overflow',
      'white-space',
      'overflow-wrap',
      'word-wrap',
      'word-break',
      'line-break',
      'hyphens',
      'text-align',
      'text-align-last',
      'text-justify',
      'font-synthesis',
      'font-size-adjust',
      'letter-spacing',
      'font-kerning',
      'word-spacing',
      'text-transform',
      'quotes',
      'tab-size',
      'text-indent',
      'text-emphasis',
      'text-emphasis-style',
      'text-emphasis-color',
      'text-emphasis-position',
      'text-decoration',
      'text-decoration-color',
      'text-decoration-style',
      'text-decoration-line',
      'text-underline-position',
      'text-shadow',
      'image-rendering',
      'image-orientation',
      'image-resolution',
      'shape-image-threshold',
      'shape-outside',
      'shape-margin',
      'transform-style',
      'transform',
      'transform-box',
      'transform-origin',
      'perspective',
      'perspective-origin',
      'backface-visibility',
      'transition',
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-fill-mode',
      'animation-play-state',
      'scroll-behavior',
      'scroll-snap-type',
      'scroll-snap-destination',
      'scroll-snap-coordinate',
      'resize',
      'cursor',
      'touch-action',
      'caret-color',
      'ime-mode',
      'object-fit',
      'object-position',
      'content',
      'counter-reset',
      'counter-increment',
      'will-change',
      'pointer-events',
      'z-index',
      'all',
      'page-break-before',
      'page-break-after',
      'page-break-inside',
      'widows'
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['define-mixin', 'mixin', 'function', 'return']
      }
    ],
    // 冒号后面必须有一个空格
    // "declaration-colon-space-after": "always",
    'selector-list-comma-newline-after': null
  }
}
```

这样我的 css，scss 抒写的属性规则就按照我的规则设置那样，顺序出现错误会帮助提示出来，然后使用--fix 的时候自动校正为我设置的顺序规则。

大概就是这样了,挺有用的一个 linter 工具.还有结合在 postcss 或者 webpack 中具体读者可以自己研究一下啦~
