---
title: Each in lodash
date: 2017-11-22 18:20:28
category: Javascript
tags:
  - Lodash
  - Array
---

Iterates over elements of `collection` and invoke `iteratee` for each element.

iteratee function may exit iteration by explictly returning false
遍历一个集合，如果自定义的迭代函数,如果迭代函数返回 false,则终止遍历过程.

基于数组的遍历和对象的遍历,数组的遍历使用的是 arrayEach,对象则是 baseEach.

```js
var baseEach = createBaseEach(baseForOwn)
/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection
    }
    // 是否是类数组对象,是的话,调用eachFunc去处理collection
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee)
    }
    var length = collection.length,
      index = fromRight ? length : -1,
      iterable = Object(collection)
    // 很常见的写法了.根据fromRigth,决定从左还是从右遍历.一个漂亮的while loop
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break
      }
    }
    return collection
  }
}
```
