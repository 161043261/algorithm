// ==================== reduce ==================== //
Array.prototype.reduce_ = function (fn, initialValue) {
  const arr = this.slice(); // shallowClone
  let pre = initialValue,
    idx = 0;

  if (!pre) {
    for (let i = 0; i < arr.length; i++) {
      if (i in arr /** arr[i] !== undefined */) {
        pre = arr[i];
        idx = i + 1;
        break;
      }
    }
  }

  for (let i = idx; i < arr.length; i++) {
    if (i in arr) {
      // previousValue (pre), currentValue, currentIndex, array
      pre = fn.call(undefined, pre, arr[i], i, arr);
    }
  }

  return pre;
};

const arr = [1, 2, 3, 4, 5];

const ret = arr.reduce_((pre, cur) => pre + cur, 0);
console.log("reduce ret", ret); // 15

const ret2 = arr.reduce_((pre, cur) => pre + cur, 7);
console.log("reduce ret2", ret2); // 22

// ==================== map ==================== //
Array.prototype.map_ = function (fn, ctx) {
  const arr = this.slice();

  const mappedArr = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      // value, index, array
      mappedArr[i] = fn.call(ctx, arr[i], i, arr);
    }
  }
  return mappedArr;
};

const ret3 = arr.map_((item) => item * item);
console.log("map ret3", ret3); // [ 1, 4, 9, 16, 25 ]

// ==================== filter ==================== //
Array.prototype.filter_ = function (fn, ctx) {
  let arr = this.slice();
  const filteredArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      // value, index, array
      if (fn.call(ctx, arr[i], i, arr)) {
        filteredArr.push(arr[i]);
      }
    }
  }
  return filteredArr;
};

const ret4 = arr.filter_((item) => item % 2);
console.log("filter ret4", ret4); // [ 1, 3, 5 ]

// ==================== some ==================== //
Array.prototype.some_ = function (fn) {
  let ret = false;
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      ret = true;
      break;
    }
  }
  return ret;
};

const ret5 = arr.some_((item) => item > 3);
console.log("some ret5", ret5); // true

export default {};
