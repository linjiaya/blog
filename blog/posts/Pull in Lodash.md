---
title: Pull in lodash
date: 2017-11-22 18:10:28
category: Javascript
tags:
  - Lodash
  - Array
---

# Array

<!-- TOC -->

- [Array](#array)
  - [join (array, seperator)](#join-array-seperator)
  - [pull (array, [values]), mutate Array](#pull-array-values-mutate-array)

<!-- /TOC -->

## join (array, seperator)

当 array 不存在时,返回 '';
join 的实现内部很简单,调用原生数组的 join 方法. nativeJoin.call(array, seperator)去实现\_.join(array, seperator)

## pull (array, [values]), mutate Array

- pull(array, [values])
- pullAll(array, values: Array)
- pullAllBy(array, values: Array, [iteratee]: (Array|Function|Object|string))
- pullAllWith(array, values: Array, [comparator]: Function)

**注意**

[samevalueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)

移除给定数值,或者数组中元素中相同的值(使用 sameValueZero 作为评定标准) , sameValueZero 和 samevalue 中 NaN 是等于 NaN 的
而严格等于和 samevalue 以及 samevalueZero 的区别在于对 NaN 和 zero(+0, -0)的评断不同.

区别:

- samevalue 中+0 和-0 比较是 false,严格等于和 samevaluezero 中是 true.
- 严格等于中 NaN 和 NaN 比较返回 false,而 samevalue 和 samevaluezero 中是 true.

  更想要的说明的是从数组中移除给定值,而简单的 indexOf 是依赖 sameValue 标准的,无法过滤出 NaN.

  具体实现:四个方法都是基于内部的 basePullAll 实现的.See [function basePullAll()](https://github.com/lodash/lodash/blob/4.16.1/lodash.js#L3753)
  看完这个 basePullAll 的实现,基本就明白了实现的整个过程.

  看以下几点.

- pull 是基于 pullAll 的,将 pullAll 的参数 rest 化,就是 pull 的实现了.使用了 baseRest(pullAll)
- 在不传入 iteratee(自定义的迭代器)和 comparator(自定义的比较方法)时,也就是使用 pull 和 pullAll 方法的时候

  前文提到了, 是基于 sameValueZero 的处理. 其实内部是用 baseIndexOf 的实现(\_.indexOf 以此实现)

  可以看出 baseIndexOf 在根据严格等于自身的条件下,分为了不是 NaN 时的 strictIndexOf,和是 NaN 值时使用的 baseFindIndex.
  在 baseFindIndex 中传入 predicate 为 baseIsNaN 的 function,这样一来就很明了了.
  其实 lodash 的内部实现就是使用了很多 baseMethod 方式,进行依赖参数定义的函数调用.

- pullAllBy 是 basePullAll 传入了 iteratee 的情形
- pullAllWith 是 basePullAll 不传入 iteratee,传入 comparator 的情形.

  当理解完 pull 这四个方法,从数组中移除元素,也看了 baseRest,baseIndexOf,baseFindIndex,arrayMap,baseUnary,还有更底层的 iteratee, baseInteratee,getInetratee 的之类的方法,大致对于 loadash 在方法上的实现
  有了一定层次的理解.我觉得理解 loadash 对于迭代器的实现,还是很强的.可以是 function,number,string 之类的都是可以的.
  有一个 var computed = iteratee ? iteratee(value) : value 的代码经常看到,这里面做了很多处理.
  如果传入的是字符串,会被处理成 property(value),而这个 property 又被处理了一下,最终差不多是根据迭代的 value 去取键为 property 中 value 的值.这样说很晕,看代码就能明白.
