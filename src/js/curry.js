// 函数柯里化: 将多参数转换为单参数函数

/**
 *
 * @param {function} fn
 */
function curry(fn) {
  // fn.length 函数的形参列表的长度
  if (fn.length <= 1) return fn;
  const generator = (...args) => {
    if (fn.length === args.length) {
      return fn(...args);
    } else {
      return (...args2) => {
        return generator(...args, ...args2);
      };
    }
  };
  return generator;
}

function fn(a, b, c, d) {
  return a + b + c + d;
}

const curryFn = curry(fn);
console.log("curry", curryFn(1)(2)(3)(4)); // 10
