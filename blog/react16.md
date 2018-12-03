---
title: React v16版本新变化
description: React 过程学习笔记
date: 2017-11-25 18:20:28
tags:
  - node
# layout: layout
---

# React16.2

近段时间零碎弄了很多东西,webpack,parcel,poi,vue等等,对工程化自动化的前端体系有了更深一步的了解.这些构建工具的掌握与使用都是需要消耗时间和精力的.

重读的思路没有针对源码.也不能说重读,可以说整个是重新在学习.上次用react的时候还是16年的时候,今年已经是17年底了.倒是vue用的越来越炉火纯青了(吹个逼也不会死ha)

话说,新的文档的UI现在都是这种风格了.挺友好的.更像是一个引导学习和深入的那种设计,类似poi,webpack和react还有vue,文档写的越好.感觉读起来的思路更清晰.以致于在高级指引的章节都能学习到一些新的东西.

## jsx

- jsx放心使用用户输入,在编译成js语法前,已经做了处理,防xss之类的.

- jsx中使用大括号赋值.表达式才能传递number类型,同vue一样.

- jsx属性的camelCase, className, htmlFor

- jsx的点表示法,(为了从模块中导出多个组件)

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

如文档中说的一样,点表示法也是变量,使用点表示法时,变量名称大小写都Ok,但是还是建议都是大写表示,符合规范.

- jsx编译后会转换成React.createElement,这也是我们每次import的时候都需要`import React, { Component } from 'react'`

- 运行时选择类型

不能使用表达式作为react元素的标签,所以需要将表达式赋值给变量,去操作即可.[运行时选择类型](https://doc.react-china.org/docs/jsx-in-depth.html#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E9%80%89%E6%8B%A9%E7%B1%BB%E5%9E%8B)

- 属性

默认为True, 这是和vue是一样的

`<date name></date>` -> `<date name={true}></date>`

## 元素

元素是最小的react单位了.

元素是组成组件的原子.

## 组件

组件必须像纯函数一样使用props.即不能修改props.props只应该是只读的.

构成组件的方式

- class类声明的方式, `class Hello extends React.component`

- 函数方式 function Hello (props) { return (<div>Hello</div>) }

当然只有简单的组件才会使用函数方式声明.因为不继承react.component,所以不具有生命周期也state,只有单纯的props,这就是一个`无状态组件`.

## state

简单理解,当组件内部的状态需要组件自身维护时,而衍生的一个特有属性.react通过setState的方式异步去更新值,因为只有setState的方式才能触发react重绘.对比vue而言,只有更新了data属性声明或使用了this.$set方式声明的变量,才会引起附件自身的rerender,同时订阅更新相关组件.

状态的更新是一种浅合并. 只更新重新赋值的属性而已.

拥有了state的组件就是一个有状态的组件了.

## 事件处理

在react中的事件处理和dom很像.(在vue里面其实也是,可以说基本一样,额外添加的自定义事件就是用了处理组件间的通信)

事件绑定属性的命名使用camelCase,(原生是纯小写).

传递函数作为事件处理函数,为什么是这样,因为我们定义的函数时react底层封装处理之后的回调引用.等react将event事件包装(SyntheticEvent)再经过别的处理之后,调用我们传递过去的函数引用,执行函数.

最好是在constructor中对所有的事件处理函数进行bind绑定.尽可能避免在render函数中去绑定,因为每一次rerender都会重新生成匿名函数,也不方便管理.所以使用属性初始化构造器或者constructor中绑定事件上下文是一个目前合适的选择.

我在[react-china上的讨论](http://react-china.org/t/topic/16852/8)

## 条件渲染

使用if和条件运算符来进行元素的动态渲染.

值得注意的是&&运算符中只有Boolean的false,undefined和null这三个假值才不会做任何的渲染.""(falsy)渲染为空文本, 0(falsy)会渲染为0.因为不是if的判断,是因为使用的是`与`运算符,所以当为0时短路,返回值为0.渲染就为0了.这是非常值得注意的地方.

render时返回null可以什么内容不渲染.但是这个组件的生命周期依旧会被触发,比如componentWillUpdate, componentDidUpdate..

## 受控组件 & 非受控组件

我们通过使react变成一种单一数据源的状态来结合二者。React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由React控制的输入表单元素称为“受控组件”。

非受控组件就是不由react控制,(类似原生dom的行为).

简单情况下用非受控组件(应用代码层次),根据喜好抉择.

## 状态提升

这个是重点了,在没有引入redux这种状态管理库之前,几个组件共用状态时需要提升状态到父组件,才能进行数据的通信.这就是状态提升.

大型应用,可能一个状态的维护牵涉很多组件,不用redux进行管理的话,每可能引入一个新状态,可能需要维护十几个组件的编写.这是非常不便利的.

## React理念

我觉得这是构思一个组件如何开发的mini版本.十分贴切.跟着动下脑子就可以了.

## 使用propTypes检查类型

React.propTypes在16已经被弃用,现在需要手动导入库`prop-types`

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
}
```

引入一个库,把库直接声明在类上,库里面应该是有语法转换,类似superAgent中的处理.这里面的类型比vue里面你的props要多一些,比如指定元素类型的数组.像vue的话需要手动实现,但是react的prop-types库已经提供了相关实现了.

使用defaultProps对props定义初始值.

propTypes的类型检测发生在props变更之后,也就是说初始化和之后的赋值都会被检测.

## Flow & TypeScript

使用Flow和Ts来代替propTypes.这么啥好说的,玩过Flow和Ts都知道

## refs

现在版本的refs是通过注册一个回调事件将元素绑定到实例上,回调参数是dom元素挂载到节点之后返回的dom的值

`<div ref="div1"> </div>`
以前的做法`this.refs.div1`通过访问refs中注册在标签上的值来访问对应注册的节点.(Vue里面则是this.$refs)

ref回调的时机.

这个timing很重要,ref回调会在`componentDidMount` 和`componentDidUpdate`前执行,意味着在组件初次挂载时的`componentDidMount`可以访问到ref节点,也可以在组件中的条件渲染时,在`componentDidUpdate`中访问到回调完成时赋值给组件内部变量的dom.

ref不能再函数式组件上使用.很简单啊.函数式组件没有实例啊,没有实例如何去访问实例呢?

特殊地,在父组件需要访问子组件的节点时(自动获取焦点),在vue里面目前也是这样做的(一般ui库,通过mixin注入prop中,然后都是通过父节点去获取子组件的挂载input实例的节点)

具体看[对父组件暴露节点](https://doc.react-china.org/docs/refs-and-the-dom.html#%E5%AF%B9%E7%88%B6%E7%BB%84%E4%BB%B6%E6%9A%B4%E9%9C%B2-dom-%E8%8A%82%E7%82%B9)

利用props传递,可进行深层次的节点传递.

还有一个注意点,当ref节点没有被渲染时访问的是undefined,当被渲染过,之后重渲染时,会将其置为null.

以及[ref注意](https://doc.react-china.org/docs/refs-and-the-dom.html#%E6%B3%A8%E6%84%8F)

在`render`时会绑定一次回调函数,这个时候是null,在`componentDidMount`时才会有具体的值(实例或者dom节点).

## 生命周期

我觉得一个组件开发的话对生命周期的理解尤为重要,试着想几个问题

这些东西(大部分的周期)都可以通过chrome浏览器中的`performance`中的`User Timing`看到

从组件自身出发, 思考:

- 一个组件由初次渲染挂载到界面会经过哪几个生命周期
- 一个组件在setState之后,rerender时又会经过哪几个生命周期

从父子组件出发, 思考:

- 父组件初次渲染时,子组件的生命周期和父组件的声明周期的执行顺序.
- 父组件重渲染时,同上

从全局出发, 思考:

- 根组件App挂载所有组件时,各个组件大体上的生命周期
- 根组件的状态变换时,rerender时生命周期的变化

如果能够弄清上面的过程(vue也是类似 beforeCreated -> created -> mounted -> beforeDestroy,  beforeUpdate -> update),对于react的进一步学习是有很大的裨益的.

### 答案

- `组件自身`

初始渲染时:

`componentWillMount -> render -> componentDidMount`, 如果要移除时,触发`componentWillUnmount`

状态更新时:

`componentWillReceiveProps -> shouldComponentUpdate[返回true] -> componentWillUpdate -> Rerender -> componentDidUpdate`

- `父子组件`

遵循洋葱圈模型, 父组件的render之前的钩子先触发,render子组件时,走子组件的流程.等子组件自身的周期走完触发`componentDidMount`之后再走父组件的`compoenntDidMount`

父组件A,子组件B

初次渲染时

`componentWillMount(A) -> render(A) -> componentWillMount(B) -> render(B) -> componentDidMount(B) -> componentDidMount(A)`

父组件中的状态更新时

`componentWillReceiveProps(A) -> shouldComponentUpdate[返回true](A) -> componentWillUpdate(A) -> Rerender(A) -> componentWillReceiveProps(B) -> shouldComponentUpdate[返回true](B) -> componentWillUpdate(B) -> Rerender(B) -> componentDidUpdate(B) -> componentDidUpdate(A)`

- App挂载其下所有子组件时

没有考证!!

这些并列的组件不需要明确的先后返回.从设计上触发必须是这样的.谁快谁写返回.

**会不会同级组件A2的componentWillMount钩子还没触发时,A1的compoenntDidMount已经触发了呢?**

我觉得是不会的,好比看成是生命周期的递归一样.只有所有组件的

## FragMents

vue里面的template, 一个不占据任何dom节点的的包装结构.

## [Portals](https://doc.react-china.org/docs/portals.html)

这个很关键啊,看了官方文档的实践之后,理解进了一步.

我的理解是一句话,让你的真实节点可以渲染在dom树的任意位置,但是你的react dom只会在你书写的组件的位置.然后react中的事件触发遵循的是react dom的结构(捕获和冒泡),不是真实的dom节点.

这就可以像模态框那样跳出react数的位置,模态框的根节点是注册在body节点末尾的位置的.

我曾经一直以为react dom树和真实的dom树是一样的.终于知道了这样设计的目的了.

## [Error Boundaries](https://doc.react-china.org/docs/error-boundaries.html)

错误边界处理.由`componentDidCatch`捕获

- 捕获由*类声明方式*生成的子组件产生的异常. 函数式组件无法捕获

以下异常无法捕获

- 异步代码, setTimeout和requestAnimationFrame
- 服务端渲染
- 事件处理函数(用try catch)
