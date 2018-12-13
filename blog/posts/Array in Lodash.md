---
title: the Class Array in lodash
date: 2017-11-22 18:01:28
category: Javascript
description: the Class Array in lodash, custom description
tags:
  - Lodash
  - Array
---

# lodash 中一些常用方法的介绍.

## 参数多个传入变成数组传入(call-comma -> apply-array)的形式.

> doSomthing(a,b,c) -> doSomeThing(a, [b,c])

用过 call 或者 apply,一定知道除了改变上下文,更重要的是 apply 是接收数组的参数,而 call 接收的是一个个参数.忘了用属于怎么讲了.

lodash 中通过设计了 baseRest 的这个方法,做了这种转化,里面使用了 start 还有 transform 之类的,不用管这些,其实最终还是实现我们上面说的功能.

eg.

```js
;`_.pull方法实际上是baseRest(_.pullAll)`
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  // 如果start没有定义,则从function.length - 1,即参数的个数减1.
  // 定义start就是定义一个分割点.func(caller )
  start = nativeMax(start === undefined ? func.length - 1 : start, 0)
  return function() {
    var args = arguments,
      index = -1,
      length = nativeMax(args.length - start, 0),
      array = Array(length)
    // 比如func是支持3个参数.但是实际调用的时候传了100个的话.
    // 最后参数都看成是一个数组.
    // func (a,b,c),然后overRest(func)(1,2,3,4,5,6,7)
    // => 相当于是func.apply(this,[1,2, [3,4,5,6,7]])
    // overRest就是做了这么一个功能.
    while (++index < length) {
      array[index] = args[start + index]
    }
    index = -1
    var otherArgs = Array(start + 1)
    while (++index < start) {
      otherArgs[index] = args[index]
    }
    otherArgs[start] = transform(array)
    return apply(func, this, otherArgs)
  }
}
```

> baseRest 中使用 setToString 方法,将 baseRest 的 toString 赋值为了 baseRest 方法参数中的 func 的 toString 的值
> 这也是符合实际需求的转换,毕竟 baseRest 后的函数是依赖于原函数 func 的变种

eg. \_pull.toString() 其实就是 pullAll 的方法定义,因为 var pull = baseRest(pullAll)

## 一些 Array methods 的简单实现.

- _.head === _.first, 获取数组的第一个元素. 做一些简单的判断.然后获取 array[0].

- \_.fromPairs 将数组转化成键值对,相当于 Object.entries 的逆向过程.

  [['a', '1'], ['b', 2]] -> {'a': '1', 'b': 2},具体实现是遍历 array,返回一个{ array[index][0] : array[index][1] }的对象

- \_.initial, 获取原数组中除掉最后一个元素的数组. 内部使用 baseSlice. 既然是使用 slice,则不会影响到原数组.当然这些都是浅拷贝

  baseSlice(array, 0, length - 1)

- \_.tail, 获取原数组除去第一个元素的数组.内部使用 baseSlice, baseSlise(array, 1, length)

- \_.last 获取最后一个元素, 同\_head 和 first.

- \_.nth 获取第几个元素,如果是负值,从末位开始.

- \_.reverse 基于原生的 reverse 实现.

- \_.slice 基于 baseSlice,参数什么的都会经过 无符号右移操作 >>> 处理成数值类型.在内部实现中有这样的代码.
