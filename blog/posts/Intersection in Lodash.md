---
title: Take & Intersection in lodash
date: 2017-11-22 18:15:28
category: Javascript
tags:
  - Lodash
  - Array
---

# When you need take subset of an array from left or right and in special situation!

> 当你需要一个数组切片,从左开始或者从右开始,并且可以使用一个特定的判断函数.

<!-- TOC -->

- [When you need take subset of an array from left or right and in special situation!](#when-you-need-take-subset-of-an-array-from-left-or-right-and-in-special-situation)
  - [_.take & _.takeWhile & _.takeRight & _.takeRightWhile 的实现](#_take--_takewhile--_takeright--_takerightwhile的实现)
  - [_.interSection & _.interSectionBy & \_.interSectionWith](#_intersection--_intersectionby--_intersectionwith)

<!-- /TOC -->

## _.take & _.takeWhile & _.takeRight & _.takeRightWhile 的实现

> 创建数组切片,从 Array 数组(right:的最后一个元素)开始提取 n 个元素.

> 创建数组切片,从 Array 数组(right:的最后一个元素)开始提取元素,直到 predicate 返回假值.

take 和 takeRight 的方法都是基于 baseSlice 实现的,这很容易想到.

takeWhile 和 takeRightWhile 是基于 baseWhile 实现的.看下 baseWhile 的具体定义.

```js
/**
 * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
 * without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
function baseWhile(array, predicate, isDrop, fromRight) {
  var length = array.length,
    index = fromRight ? length : -1

  while (
    (fromRight ? index-- : ++index < length) &&
    predicate(array[index], index, array)
  ) {}

  return isDrop
    ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length)
    : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
}
```

`baseWhile` function has four params, the explain for params is above.

> good use! see below

use a `while` statement to acheive a cleaner effect.

- the initial values and changes of `index` variable depends on the `fromRight` parameter
- until predicate function (iteratee function) returns `false`

**attention** drop 和 takeRight，dopRight 和 take 的内部实现完全一样，只是表示的语义不同.

## _.interSection & _.interSectionBy & \_.interSectionWith

> create an array of unique values that are included in given arrays using `sameValueZero`

> 创建一个唯一值的数组，使用 sameValueZero 的方式进行判断，返回值的顺序和引用由第一个数组决定。

the defination of methods above is base on funtion `baseIntersection`.

```js
/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(arrays, iteratee, comparator) {
  var includes = comparator ? arrayIncludesWith : arrayIncludes,
    length = arrays[0].length,
    othLength = arrays.length,
    othIndex = othLength,
    caches = Array(othLength),
    maxLength = Infinity,
    result = []

  while (othIndex--) {
    var array = arrays[othIndex]
    if (othIndex && iteratee) {
      array = arrayMap(array, baseUnary(iteratee))
    }
    maxLength = nativeMin(array.length, maxLength)
    caches[othIndex] =
      !comparator && (iteratee || (length >= 120 && array.length >= 120))
        ? new SetCache(othIndex && array)
        : undefined
  }
  array = arrays[0]

  var index = -1,
    seen = caches[0]

  outer: while (++index < length && result.length < maxLength) {
    // 对arrays[0]进行遍历,array是一个二维数组[[1,2,3],[2,3],[3,4]]
    var value = array[index],
      computed = iteratee ? iteratee(value) : value

    value = comparator || value !== 0 ? value : 0
    // 根据数组的长度是否大于120,决定是否使用缓存
    // 如果最终存放的数组result中没有当前值,就进入内层循环
    if (
      !(seen
        ? cacheHas(seen, computed)
        : includes(result, computed, comparator))
    ) {
      othIndex = othLength
      while (--othIndex) {
        // 这里也需要做判断,判断是否需要使用缓存
        var cache = caches[othIndex]
        if (
          !(cache
            ? cacheHas(cache, computed)
            : includes(arrays[othIndex], computed, comparator))
        ) {
          // 如果同级的别的数组中没有该元素,就跳出循环重新来过.
          // index++
          continue outer
        }
      }
      if (seen) {
        seen.push(computed)
      }
      // 如果每个数组中都有该值,就往result中push
      result.push(value)
    }
  }
  return result
}
```

**`By` makes use of the parameter `iteratee`.**

**`with` makes use of the parameter `comparator`.**

在求数组的交集的时候,是将整个输入参数传递做处理的.和`_.union`有区别.
