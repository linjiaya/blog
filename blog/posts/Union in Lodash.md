---
title: Uniq & Union in lodash
date: 2017-11-22 18:06:28
category: Javascript
tags:
  - Lodash
  - Array
---

<!-- TOC -->

- [When you need an unique array or the union of arrays, you'll get it in this notes!](#when-you-need-an-unique-array-or-the-union-of-arrays-youll-get-it-in-this-notes)
  - [_.union & _.unionBy & \_.unionWith](#_union--_unionby--_unionwith)
  - [_.uniq & _.uniqBy & \_.uniqWith](#_uniq--_uniqby--_uniqwith)
  - [use es6 to acheive unzip method](#use-es6-to-acheive-unzip-method)

<!-- /TOC -->

# When you need an unique array or the union of arrays, you'll get it in this notes!

## _.union & _.unionBy & \_.unionWith

> return new Array for the union of arrays by `sameValueZero` comparation.

the methods of above is base on function `baseUniq`

see the defination of them!

```js
var union = baseRest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
})

var unionBy = baseRest(function(arrays) {
  var iteratee = last(arrays)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return baseUniq(
    baseFlatten(arrays, 1, isArrayLikeObject, true),
    getIteratee(iteratee, 2)
  )
})

var unionWith = baseRest(function(arrays) {
  var comparator = last(arrays)
  comparator = typeof comparator == 'function' ? comparator : undefined
  return baseUniq(
    baseFlatten(arrays, 1, isArrayLikeObject, true),
    undefined,
    comparator
  )
})
```

We could see that the common of them is making use of function `baseRest` to transform `call-comma` to `apply-array` in first step.
(我们使用 baseRest 将参数列表转化为参数数组的风格在第一步的时候)

Then in second step, using function `baseFlatten` to flat arrays.
(接下来在第二步的时候,使用 baseFlatten 去扁平化传入的数组.[[1,2,3],[4,5,6]] -> [1,2,3,4,5,6])

finally we use the core function `baseUniq` to achieve the uniq array(by `sameValueZero` comparation).
(最后使用 baseUniq 去实现元素唯一性的数组,唯一是根据 sameValueZero 进行比较的)

```js
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
    includes = arrayIncludes,
    length = array.length,
    isCommon = true,
    result = [],
    seen = result

  if (comparator) {
    isCommon = false
    includes = arrayIncludesWith
  } else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array)
    if (set) {
      return setToArray(set)
    }
    isCommon = false
    includes = cacheHas
    seen = new SetCache()
  } else {
    // 根据是否传递了自定义的迭代器,设置seen的值,这一步骤很关键,如果没有自定义迭代器,seen和result是共享内存的.
    // 所以在result的push的时候,seen跟随变化,以至于在读取seen[seenIndex]的时候就是访问result.这种切换很灵活.
    seen = iteratee ? [] : result
  }
  outer: while (++index < length) {
    var value = array[index],
      computed = iteratee ? iteratee(value) : value

    value = comparator || value !== 0 ? value : 0
    if (isCommon && computed === computed) {
      var seenIndex = seen.length
      while (seenIndex--) {
        // 遍历数组,如果数组中有值等于此次的computed.继续outer的循环,传入array的下一个元素,开始新一轮的比较.
        if (seen[seenIndex] === computed) {
          continue outer
        }
      }
      // 当自定义迭代器存在,push到seen中
      if (iteratee) {
        seen.push(computed)
      }
      // 总会push到result中.如果迭代器不存在,result === seen
      result.push(value)
    }
    // 当变量computed不等于自身的时候(NaN),在includes中使用了baseIndexOf(基于sameValueZero的比较)
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}
```

## _.uniq & _.uniqBy & \_.uniqWith

See the defination of above. they are very simple!

```js
function uniq(array) {
  return array && array.length ? baseUniq(array) : []
}
function uniqBy(array, iteratee) {
  return array && array.length ? baseUniq(array, getIteratee(iteratee, 2)) : []
}
function uniqWith(array, comparator) {
  comparator = typeof comparator == 'function' ? comparator : undefined
  return array && array.length ? baseUniq(array, undefined, comparator) : []
}
```

## use es6 to acheive unzip method

```js
function unzip(arrays) {
  var length = 0
  // 获取二维数组arrays中最长的一维数组
  var array = arrays.filter(array => {
    if (Array.isArray(array)) {
      length = Math.max(array.length, length)
      return true
    }
  })
}
```
