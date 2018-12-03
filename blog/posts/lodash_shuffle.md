---
title: Shuffle in lodash
date: 2017-11-22 18:20:28
tags:
  - node
# layout: layout
---

create an array of shuffle values, using a version of [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).

_.shuffle base on the method below.

use the Object.values(obj)

在对非数组的对象类型，使用差不多是Object.values()的方式，将其转成数组。然后打乱

**_.shuffle('aaabc') -> ['b', 'c', 'a', 'a', 'a']**

```js
  /**
   * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
   *
   * @private
   * @param {Array} array The array to shuffle.
   * @param {number} [size=array.length] The size of `array`.
   * @returns {Array} Returns `array`.
   */
  function shuffleSelf(array, size) {
    var index = -1,
        length = array.length,
        lastIndex = length - 1;

    size = size === undefined ? length : size;
    while (++index < size) {
      var rand = baseRandom(index, lastIndex),
          value = array[rand];

      array[rand] = array[index];
      array[index] = value;
    }
    array.length = size;
    return array;
  }
```

simple implemention. in `while` loop, change `rand` depends on `index` and function `baseRandom`.
简单的实现，在while循环中，依赖baseRandom方法和index的改变，得到随机的rand。

then swap the value of index `index` and `rand` in array.
然后交换数组中索引为index和rand对应的值。

Base on this, return an array of size length depends on the parameter `size` passed in.
在此之上，根据传入的参数size，返回一个size长度的数组
