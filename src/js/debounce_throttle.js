/* eslint-disable @typescript-eslint/no-unused-vars */
// debounce 防抖, 只执行最后一次
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}

// throttle 节流, 只执行第一次
function throttle(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn.call(this, ...args);
      timer = null;
    }, delay);
  };
}

export default {}
